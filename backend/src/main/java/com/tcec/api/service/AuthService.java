package com.tcec.api.service;

import com.tcec.api.dto.LoginRequest;
import com.tcec.api.dto.LoginResponse;
import com.tcec.api.entity.MsmeUser;
import com.tcec.api.repository.MsmeUserRepository;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final MsmeUserRepository userRepo;

    // In-memory token store: token → MsmeUser
    private final Map<String, MsmeUser> tokenStore = new ConcurrentHashMap<>();

    public AuthService(MsmeUserRepository userRepo) {
        this.userRepo = userRepo;
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
