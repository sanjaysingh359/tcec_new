package com.tcec.api.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Password expiry, same rule as the legacy application: a password is valid for
 * {@link #VALID_MONTHS} months from the user's latest row in user_old_pass_toolroom
 * (the password-history table). A password change adds a row; so does an administrator's
 * renewal, which keeps the password and only restarts the period.
 */
@Service
public class PasswordExpiryService {

    public static final int VALID_MONTHS = 3;

    /** Format the legacy application writes (and reads) in user_old_pass_toolroom."time". */
    private static final DateTimeFormatter LEGACY = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
    private static final DateTimeFormatter ISO    = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final JdbcTemplate jdbc;

    public PasswordExpiryService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /** When this user's password expires; null if the user has no history row (never expires, as in legacy). */
    public LocalDateTime expiresAt(String userId) {
        List<String> t = jdbc.queryForList(
                "SELECT \"time\" FROM user_old_pass_toolroom WHERE LOWER(TRIM(inst)) = LOWER(?) ORDER BY sno DESC LIMIT 1",
                String.class, userId.trim());
        return t.isEmpty() ? null : expiry(t.get(0));
    }

    public boolean isExpired(String userId) {
        LocalDateTime at = expiresAt(userId);
        return at != null && !at.isAfter(LocalDateTime.now());
    }

    /** Expiry of every user that has a history row, keyed by lower-case user id. */
    public Map<String, LocalDateTime> expiresAtByUser() {
        Map<String, LocalDateTime> out = new HashMap<>();
        jdbc.query("SELECT DISTINCT ON (LOWER(TRIM(inst))) LOWER(TRIM(inst)) AS inst, \"time\" AS t "
                 + "FROM user_old_pass_toolroom ORDER BY LOWER(TRIM(inst)), sno DESC",
                rs -> {
                    LocalDateTime at = expiry(rs.getString("t"));
                    if (at != null) out.put(rs.getString("inst"), at);
                });
        return out;
    }

    /**
     * Add a history row dated now, which starts a new validity period.
     * @param passwordChanged false for a renewal (same password, change counter untouched)
     */
    public void record(String userId, String passwordHash, boolean passwordChanged, String clientIp) {
        String uid = userId.trim();
        Integer changes = jdbc.queryForObject(
                "SELECT COALESCE(MAX(no_of_changes), 0) FROM user_old_pass_toolroom WHERE LOWER(TRIM(inst)) = LOWER(?)",
                Integer.class, uid);
        // the legacy table has no sequence on sno
        jdbc.update("INSERT INTO user_old_pass_toolroom (sno, inst, password, no_of_changes, \"time\", user_ip) "
                  + "VALUES ((SELECT COALESCE(MAX(sno), 0) + 1 FROM user_old_pass_toolroom), ?, ?, ?, ?, ?)",
                uid, passwordHash, (changes == null ? 0 : changes) + (passwordChanged ? 1 : 0),
                LocalDateTime.now().format(LEGACY), clientIp == null ? "" : clientIp);
    }

    private static LocalDateTime expiry(String time) {
        if (time == null || time.isBlank()) return null;
        String t = time.trim();
        for (DateTimeFormatter f : new DateTimeFormatter[] { LEGACY, ISO }) {
            try {
                return LocalDateTime.parse(t, f).plusMonths(VALID_MONTHS);
            } catch (DateTimeParseException ignored) { /* try the next format */ }
        }
        return null;
    }
}
