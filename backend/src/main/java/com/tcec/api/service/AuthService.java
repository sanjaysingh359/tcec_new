package com.tcec.api.service;

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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private final MsmeUserRepository userRepo;
    private final JdbcTemplate       jdbc;

    // In-memory token store: token → MsmeUser
    private final Map<String, MsmeUser> tokenStore = new ConcurrentHashMap<>();

    /** Same policy as the legacy chnagepsw.jsp: 8–15 chars, upper + lower + digit + special, no spaces. */
    private static final Pattern PASSWORD_POLICY =
            Pattern.compile("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$");
    /** Legacy rule: a new password may not repeat any of the last 3 (user_old_pass_toolroom). */
    private static final int PASSWORD_HISTORY = 3;

    public AuthService(MsmeUserRepository userRepo, JdbcTemplate jdbc) {
        this.userRepo = userRepo;
        this.jdbc     = jdbc;
    }

    /**
     * Validate credentials and issue a bearer token.
     */
    public Optional<LoginResponse> login(LoginRequest req) {
        Optional<MsmeUser> opt = userRepo.findByUserIdTrimmed(req.userId().trim());
        if (opt.isEmpty()) return Optional.empty();

        MsmeUser user = opt.get();
        // Passwords stored as SHA-256 hex strings (fields trimmed via @PostLoad)
        String hashedInput = sha256(req.password());
        String storedPwd   = user.getPassword() == null ? "" : user.getPassword();
        if (!hashedInput.equalsIgnoreCase(storedPwd)) {
            return Optional.empty();
        }

        String token = UUID.randomUUID().toString();
        tokenStore.put(token, user);

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
        List<String> recent = jdbc.queryForList(
                "SELECT password FROM user_old_pass_toolroom WHERE TRIM(inst) = ? ORDER BY sno DESC LIMIT ?",
                String.class, userId, PASSWORD_HISTORY);
        if (recent.stream().anyMatch(h -> h != null && h.trim().equalsIgnoreCase(newHash)))
            return "New password must not be one of your last " + PASSWORD_HISTORY + " passwords.";

        user.setPassword(newHash);
        userRepo.save(user);

        // password history (legacy table has no sequence on sno)
        Integer changes = jdbc.queryForObject(
                "SELECT COUNT(*) FROM user_old_pass_toolroom WHERE TRIM(inst) = ?", Integer.class, userId);
        jdbc.update("INSERT INTO user_old_pass_toolroom (sno, inst, password, no_of_changes, \"time\", user_ip) "
                  + "VALUES ((SELECT COALESCE(MAX(sno), 0) + 1 FROM user_old_pass_toolroom), ?, ?, ?, ?, ?)",
                userId, newHash, (changes == null ? 0 : changes) + 1,
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                clientIp == null ? "" : clientIp);

        // sign out every other session of this user; keep the current one
        tokenStore.entrySet().removeIf(e -> !e.getKey().equals(token)
                && e.getValue().getUserId() != null && e.getValue().getUserId().trim().equals(userId));
        session.setPassword(newHash);
        return null;
    }

    /**
     * Invalidate a token.
     */
    public void logout(String token) {
        tokenStore.remove(token);
    }

    /**
     * Resolve a token to a user. Returns empty if invalid/expired.
     */
    public Optional<MsmeUser> getUserByToken(String token) {
        return Optional.ofNullable(tokenStore.get(token));
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
