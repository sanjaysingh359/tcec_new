package com.tcec.api.service;

import com.tcec.api.config.AppContext;
import com.tcec.api.dto.LoginRequest;
import com.tcec.api.dto.LoginResponse;
import com.tcec.api.entity.MsmeUser;
import com.tcec.api.repository.MsmeUserRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private final MsmeUserRepository    userRepo;
    private final JdbcTemplate          jdbc;
    private final PasswordExpiryService passwordExpiry;

    /** The user's password validity period is over (see {@link PasswordExpiryService}). */
    public static class PasswordExpiredException extends RuntimeException {
        public PasswordExpiredException() {
            super("Your password has expired. Please contact the administrator.");
        }
    }

    // In-memory token store: token → MsmeUser
    private final Map<String, MsmeUser> tokenStore = new ConcurrentHashMap<>();
    // token → application it was issued for (each application has its own database)
    private final Map<String, String> tokenApp = new ConcurrentHashMap<>();

    /** Same policy as the legacy chnagepsw.jsp: 8–15 chars, upper + lower + digit + special, no spaces. */
    private static final Pattern PASSWORD_POLICY =
            Pattern.compile("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$");
    /** Legacy rule: a new password may not repeat any of the last 3 (user_old_pass_toolroom). */
    private static final int PASSWORD_HISTORY = 3;

    public AuthService(MsmeUserRepository userRepo, JdbcTemplate jdbc, PasswordExpiryService passwordExpiry) {
        this.userRepo       = userRepo;
        this.jdbc           = jdbc;
        this.passwordExpiry = passwordExpiry;
    }

    /**
     * Validate credentials and issue a bearer token.
     * @throws PasswordExpiredException the user exists but the password has expired
     */
    public Optional<LoginResponse> login(LoginRequest req) {
        Optional<MsmeUser> opt = userRepo.findByUserIdTrimmed(req.userId().trim());
        if (opt.isEmpty()) return Optional.empty();

        MsmeUser user = opt.get();
        // An expired password blocks the login. As in the legacy application this is checked for
        // the user name before the password, so the user is told "expired" whatever they type.
        // Super users are let in so that somebody can always renew passwords from User Management.
        String role = user.getRole() == null ? "" : user.getRole();
        if (!"SU".equals(role) && passwordExpiry.isExpired(user.getUserId()))
            throw new PasswordExpiredException();

        // Passwords stored as SHA-256 hex strings (entity getters trim the CHAR padding)
        String hashedInput = sha256(req.password());
        String storedPwd   = user.getPassword() == null ? "" : user.getPassword();
        if (!hashedInput.equalsIgnoreCase(storedPwd)) {
            return Optional.empty();
        }

        String token = UUID.randomUUID().toString();
        tokenStore.put(token, user);
        tokenApp.put(token, AppContext.get());

        return Optional.of(new LoginResponse(
                user.getUserId(),
                user.getRole() == null ? "" : user.getRole(),
                token
        ));
    }

    /**
     * Change the logged-in user's password.
     * @return null on success, otherwise the reason it was refused (shown to the user).
     */
    @Transactional
    public String changePassword(String token, String currentPassword, String newPassword, String clientIp) {
        MsmeUser session = tokenStore.get(token);
        if (session == null) return "Your session has expired. Please log in again.";
        if (currentPassword == null || newPassword == null) return "Current and new password are required.";

        MsmeUser user = userRepo.findByUserIdTrimmed(session.getUserId()).orElse(null);
        if (user == null) return "User account not found.";
        String userId = user.getUserId().trim();

        if (!sha256(currentPassword).equalsIgnoreCase(user.getPassword() == null ? "" : user.getPassword()))
            return "Current password is incorrect.";
        if (!PASSWORD_POLICY.matcher(newPassword).matches())
            return "New password must be 8–15 characters with at least one upper-case letter, "
                 + "one lower-case letter, one digit and one special character, and no spaces.";
        if (newPassword.equals(currentPassword))
            return "New password must be different from the current password.";

        String newHash = sha256(newPassword);
        // distinct: a renewal repeats the current password in the history
        List<String> recent = jdbc.queryForList(
                "SELECT LOWER(TRIM(password)) FROM user_old_pass_toolroom WHERE TRIM(inst) = ? "
              + "GROUP BY LOWER(TRIM(password)) ORDER BY MAX(sno) DESC LIMIT ?",
                String.class, userId, PASSWORD_HISTORY);
        if (recent.stream().anyMatch(h -> h != null && h.trim().equalsIgnoreCase(newHash)))
            return "New password must not be one of your last " + PASSWORD_HISTORY + " passwords.";

        // SQL on TRIM(user_id): the loaded entity's id is trimmed, so userRepo.save(user) is refused
        jdbc.update("UPDATE msme_users SET password = ? WHERE TRIM(user_id) = ?", newHash, userId);

        // password history; also starts the next validity period
        passwordExpiry.record(userId, newHash, true, clientIp);

        // sign out every other session of this user; keep the current one
        String app = AppContext.get();
        tokenStore.entrySet().removeIf(e -> !e.getKey().equals(token)
                && app.equals(tokenApp.get(e.getKey()))
                && e.getValue().getUserId() != null && e.getValue().getUserId().trim().equals(userId));
        tokenApp.keySet().retainAll(tokenStore.keySet());
        session.setPassword(newHash);
        return null;
    }

    /**
     * Invalidate a token.
     */
    public void logout(String token) {
        if (token == null) return;
        tokenStore.remove(token);
        tokenApp.remove(token);
    }

    /**
     * Resolve a token to a user. Returns empty if invalid/expired.
     */
    public Optional<MsmeUser> getUserByToken(String token) {
        if (token == null) return Optional.empty();
        // a session is valid only inside the application it was opened in
        if (!AppContext.get().equals(tokenApp.get(token))) return Optional.empty();
        return Optional.ofNullable(tokenStore.get(token));
    }

    /** Application the token was issued for, or null for an unknown token. */
    public String appForToken(String token) {
        return token == null ? null : tokenApp.get(token);
    }

    /** SHA-256 hex of input string. */
    private static String sha256(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }

    /**
     * Extract bearer token from "Authorization: Bearer <token>" header value.
     */
    public static String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7).trim();
        }
        return null;
    }
}
