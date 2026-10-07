package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.dto.DataStatusRow;
import com.tcec.api.dto.InstituteItem;
import com.tcec.api.entity.MsmeUser;
import com.tcec.api.entity.TlInstitute;
import com.tcec.api.entity.UserIdMapping;
import com.tcec.api.repository.BudgetRepository;
import com.tcec.api.repository.FinancialRepository;
import com.tcec.api.repository.MsmeUserRepository;
import com.tcec.api.repository.PhysicalRepository;
import com.tcec.api.repository.PlacementRepository;
import com.tcec.api.repository.TlInstituteRepository;
import com.tcec.api.repository.UserIdMappingRepository;
import com.tcec.api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final String[] MONTH_NUMS   = {"1","2","3","4","5","6","7","8","9","10","11","12"};
    private static final String[] MONTH_LABELS = {
        "April","May","June","July","August","September",
        "October","November","December","January","February","March"
    };

    private final FinancialRepository  finRepo;
    private final PhysicalRepository   phyRepo;
    private final BudgetRepository     budRepo;
    private final PlacementRepository  plaRepo;
    private final TlInstituteRepository   instRepo;
    private final UserIdMappingRepository mappingRepo;
    private final MsmeUserRepository      userRepo;
    private final AuthService             authService;
    private final JdbcTemplate            jdbc;

    public AdminController(FinancialRepository  finRepo,
                           PhysicalRepository   phyRepo,
                           BudgetRepository     budRepo,
                           PlacementRepository  plaRepo,
                           TlInstituteRepository   instRepo,
                           UserIdMappingRepository mappingRepo,
                           MsmeUserRepository      userRepo,
                           AuthService             authService,
                           JdbcTemplate            jdbc) {
        this.finRepo     = finRepo;
        this.phyRepo     = phyRepo;
        this.budRepo     = budRepo;
        this.plaRepo     = plaRepo;
        this.instRepo    = instRepo;
        this.mappingRepo = mappingRepo;
        this.userRepo    = userRepo;
        this.authService = authService;
        this.jdbc        = jdbc;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/institutes
    // Returns all active TCEC institutes sorted by name.
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/institutes")
    public ResponseEntity<ApiResponse<List<InstituteItem>>> institutes(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader))
            return unauthorized();

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();
        Set<String> seen = new LinkedHashSet<>();
        List<InstituteItem> result = new ArrayList<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);
            String name = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);
            result.add(new InstituteItem(instId, name));
        }

        result.sort(Comparator.comparing(InstituteItem::instName, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/institutes/all — every institute (inst_id "I…") of the current
    // application, including ones with no user yet (for assigning a new user).
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/institutes/all")
    public ResponseEntity<ApiResponse<List<InstituteItem>>> allInstitutes(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isSu(authHeader)) return unauthorized();
        List<InstituteItem> result = instRepo.findAllOrdered().stream()
                .filter(t -> t.getInstId() != null && t.getInstId().trim().startsWith("I"))
                .map(t -> new InstituteItem(t.getInstId().trim(), t.getInstName() == null ? "" : t.getInstName().trim()))
                .sorted(Comparator.comparing(InstituteItem::instName, String.CASE_INSENSITIVE_ORDER))
                .toList();
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/admin/institutes — add an institute to the current application
    // Body: { instName, instAddress (optional) }. inst_id = next free "I<n>".
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/institutes")
    public ResponseEntity<ApiResponse<InstituteItem>> createInstitute(
            @RequestBody Map<String, String> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isSu(authHeader)) return unauthorized();
        String name    = body.getOrDefault("instName", "").trim();
        String address = body.getOrDefault("instAddress", "").trim();
        if (name.isEmpty())
            return ResponseEntity.badRequest().body(ApiResponse.error("Institute name is required"));
        if (name.length() > 200 || address.length() > 200)
            return ResponseEntity.badRequest().body(ApiResponse.error("Name and address can be at most 200 characters"));

        List<TlInstitute> all = instRepo.findAll();
        boolean duplicate = all.stream().anyMatch(t -> t.getInstName() != null && t.getInstName().trim().equalsIgnoreCase(name));
        if (duplicate)
            return ResponseEntity.badRequest().body(ApiResponse.error("An institute named '" + name + "' already exists"));

        int nextNo = all.stream()
                .map(t -> t.getInstId() == null ? "" : t.getInstId().trim())
                .filter(id -> id.matches("I\\d+"))
                .mapToInt(id -> Integer.parseInt(id.substring(1)))
                .max().orElse(0) + 1;
        int nextRowId = all.stream().map(TlInstitute::getId).filter(Objects::nonNull)
                .mapToInt(Integer::intValue).max().orElse(0) + 1;

        TlInstitute t = new TlInstitute();
        t.setId(nextRowId);
        t.setInstId("I" + nextNo);
        t.setInstName(name);
        t.setInstAddress(address);
        instRepo.save(t);
        return ResponseEntity.ok(ApiResponse.ok("Institute added", new InstituteItem(t.getInstId(), name)));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/data-status?instId=X&year=Y
    // Returns 12 rows (fiscal months Apr–Mar) showing which sections have data.
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/data-status")
    public ResponseEntity<ApiResponse<List<DataStatusRow>>> dataStatus(
            @RequestParam String instId,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader))
            return unauthorized();

        Set<String> finMonths = monthsWithData(finRepo.findByInstIdAndYears(instId, year)
                .stream().map(f -> f.getMonths() == null ? "" : f.getMonths().trim())
                .collect(Collectors.toList()));

        Set<String> budMonths = monthsWithData(budRepo.findByInstIdAndYears(instId, year)
                .stream().map(b -> b.getMonths() == null ? "" : b.getMonths().trim())
                .collect(Collectors.toList()));

        Set<String> phyMonths = monthsWithData(phyRepo.findByInstIdAndYears(instId, year)
                .stream().map(p -> p.getMonths() == null ? "" : p.getMonths().trim())
                .collect(Collectors.toList()));

        Set<String> plaMonths = monthsWithData(plaRepo.findByInstIdAndYears(instId, year)
                .stream().map(p -> p.getMonths() == null ? "" : p.getMonths().trim())
                .collect(Collectors.toList()));

        List<DataStatusRow> result = new ArrayList<>(12);
        for (int i = 0; i < 12; i++) {
            String m = MONTH_NUMS[i];
            result.add(new DataStatusRow(
                    m, MONTH_LABELS[i],
                    finMonths.contains(m),
                    budMonths.contains(m),
                    phyMonths.contains(m),
                    plaMonths.contains(m)
            ));
        }
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /api/admin/data?instId=X&year=Y&month=M&section=01
    // Clears one month's data for the specified section so the institute can
    // enter it again.  section: 01=Financial, 02=Budget, 03=Physical,
    // 04=Placement, 05=Significant Achievement.
    //
    // Financial / Physical / Placement have dedicated tables → the row is
    // deleted. Budget and Achievement share tbl_budget, so each clears only
    // its own fields and the row is removed only once nothing is left.
    // ─────────────────────────────────────────────────────────────────────────
    @DeleteMapping("/data")
    public ResponseEntity<ApiResponse<String>> deleteData(
            @RequestParam String instId,
            @RequestParam String year,
            @RequestParam String month,
            @RequestParam String section,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        // Clearing a submitted section is an admin-only action
        if (!isSu(authHeader))
            return unauthorized();

        try {
            switch (section) {
                case "01" -> finRepo.deleteRecord(instId, month, year);
                case "02" -> clearBudgetSection(instId, month, year);
                case "03" -> {
                    phyRepo.deleteRecord(instId, month, year);
                    // long-term course rows for the month (Physical page, legacy tbl_course_txn)
                    jdbc.update("DELETE FROM tbl_course_txn WHERE inst_id = ? AND months = ? AND years = ?",
                            instId, month, year);
                }
                case "04" -> plaRepo.deleteRecord(instId, month, year);
                case "05" -> clearAchievement(instId, month, year);
                default   -> { return ResponseEntity.badRequest()
                                       .body(ApiResponse.error("Unknown section: " + section)); }
            }
            return ResponseEntity.ok(ApiResponse.ok("Cleared successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Clear failed: " + e.getMessage()));
        }
    }

    /** Null every Budget-section field on tbl_budget; keep the Significant
     *  Achievement text. Delete the row only if that text is also empty. */
    private void clearBudgetSection(String instId, String month, String year) {
        budRepo.findByInstIdAndMonthsAndYears(instId, month, year).ifPresent(b -> {
            if (isBlank(b.getSignificant())) { budRepo.delete(b); return; }
            // Row must survive for the achievement text — blank the budget columns.
            b.setCryFwdAmt(null);  b.setCryFwdUtilDm(null);  b.setCryFwdUtilCum(null);
            b.setGiaAmt(null);     b.setGiaUtilDm(null);     b.setGiaUtilCum(null);     b.setGiaUtilBal(null);
            b.setStfStSsA(null);   b.setStfStSsB(null);      b.setStfStSsC(null);       b.setStfStSsD(null);
            b.setStfStPosA(null);  b.setStfStPosB(null);     b.setStfStPosC(null);      b.setStfStPosD(null);
            b.setBudgetTotalAmt(null); b.setBudgetTotalUtilDm(null);
            b.setBudgetTotalUtilCum(null); b.setBudgetTotalUtilBal(null);
            b.setMachineDtm(null); b.setMachineCum(null);
            b.setDetailsVisit(null); b.setShortsFall(null);
            b.setCryFwdUtilBal(BigDecimal.ZERO);   // cry_fwd_util_bal is NOT NULL
            budRepo.save(b);
        });
    }

    /** Clear only the Significant Achievement text; keep any Budget-section
     *  data. Delete the row only if no Budget data remains. */
    private void clearAchievement(String instId, String month, String year) {
        budRepo.findByInstIdAndMonthsAndYears(instId, month, year).ifPresent(b -> {
            b.setSignificant(null);
            boolean budgetData = b.getCryFwdAmt() != null || b.getGiaAmt() != null
                    || !isBlank(b.getDetailsVisit()) || !isBlank(b.getShortsFall());
            if (budgetData) budRepo.save(b);
            else            budRepo.delete(b);
        });
    }

    private static boolean isBlank(String s) { return s == null || s.isBlank(); }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/admin/users  — list all users with institute mapping
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listUsers(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isSu(authHeader)) return unauthorized();

        List<MsmeUser> users = userRepo.findAll();
        Map<String, String> mappings = new HashMap<>();
        mappingRepo.findAll().forEach(m -> {
            if (m.getInstId() != null && !m.getInstId().isBlank())
                mappings.put(m.getUserId(), m.getInstId().trim());
        });
        Map<String, String> instNames = new HashMap<>();
        instRepo.findAll().forEach(i -> instNames.put(i.getInstId(), i.getInstName()));

        List<Map<String, Object>> result = users.stream().map(u -> {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("userId", u.getUserId());
            row.put("role",   u.getRole());
            String instId = mappings.get(u.getUserId());
            row.put("instId",   instId);
            row.put("instName", instId != null ? instNames.getOrDefault(instId, instId) : null);
            return row;
        }).sorted(Comparator.comparing(r -> (String) r.get("userId"))).toList();

        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/admin/users  — create new user
    // Body: { userId, password, role, instId (optional, for IU) }
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/users")
    public ResponseEntity<ApiResponse<Void>> createUser(
            @RequestBody Map<String, String> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isSu(authHeader)) return unauthorized();

        String userId   = body.getOrDefault("userId", "").trim();
        String password = body.getOrDefault("password", "").trim();
        String role     = body.getOrDefault("role", "IU").trim();
        String instId   = body.getOrDefault("instId", "").trim();

        if (userId.isEmpty() || password.isEmpty())
            return ResponseEntity.badRequest().body(ApiResponse.error("userId and password are required"));

        if (userRepo.findByUserIdTrimmed(userId).isPresent())
            return ResponseEntity.badRequest().body(ApiResponse.error("User '" + userId + "' already exists"));

        MsmeUser user = new MsmeUser();
        user.setUserId(userId);
        user.setRole(role);
        user.setPassword(sha256(password));
        userRepo.save(user);

        if ("IU".equals(role) && !instId.isEmpty()) {
            UserIdMapping mapping = new UserIdMapping();
            mapping.setUserId(userId);
            mapping.setInstId(instId);
            mappingRepo.save(mapping);
        }
        // RU and SU: no institute mapping needed

        return ResponseEntity.ok(ApiResponse.ok("User created successfully", null));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /api/admin/users/{userId}  — update role and/or password
    // Body: { role, password (optional), instId (optional) }
    // ─────────────────────────────────────────────────────────────────────────
    @org.springframework.transaction.annotation.Transactional
    @PutMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Void>> updateUser(
            @PathVariable String userId,
            @RequestBody Map<String, String> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isSu(authHeader)) return unauthorized();

        MsmeUser user = userRepo.findByUserIdTrimmed(userId)
                .orElse(null);
        if (user == null)
            return ResponseEntity.status(404).body(ApiResponse.error("User not found"));

        String role     = body.getOrDefault("role", user.getRole()).trim();
        String password = body.getOrDefault("password", "").trim();
        String instId   = body.getOrDefault("instId", "").trim();

        // user_id is CHAR(n) (space-padded) and the entities trim it after loading, so Hibernate
        // refuses to save/delete a loaded row ("identifier altered"). Write with SQL on TRIM(user_id).
        String uid = userId.trim();
        if (password.isEmpty())
            jdbc.update("UPDATE msme_users SET role = ? WHERE TRIM(user_id) = ?", role, uid);
        else
            jdbc.update("UPDATE msme_users SET role = ?, password = ? WHERE TRIM(user_id) = ?", role, sha256(password), uid);

        // update or remove institute mapping
        if ("IU".equals(role) && !instId.isEmpty()) {
            int changed = jdbc.update("UPDATE user_id_mapping SET inst_id = ? WHERE TRIM(user_id) = ?", instId, uid);
            if (changed == 0)
                jdbc.update("INSERT INTO user_id_mapping (user_id, inst_id) VALUES (?, ?)", uid, instId);
        } else if ("SU".equals(role) || "RU".equals(role)) {
            jdbc.update("DELETE FROM user_id_mapping WHERE TRIM(user_id) = ?", uid);
        }

        return ResponseEntity.ok(ApiResponse.ok("User updated successfully", null));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /api/admin/users/{userId}
    // ─────────────────────────────────────────────────────────────────────────
    @org.springframework.transaction.annotation.Transactional
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable String userId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isSu(authHeader)) return unauthorized();

        if (userRepo.findByUserIdTrimmed(userId).isEmpty())
            return ResponseEntity.status(404).body(ApiResponse.error("User not found"));

        String uid = userId.trim();
        String me = authService.getUserByToken(AuthService.extractToken(authHeader))
                .map(u -> u.getUserId() == null ? "" : u.getUserId().trim()).orElse("");
        if (me.equalsIgnoreCase(uid))
            return ResponseEntity.badRequest().body(ApiResponse.error("You cannot delete the account you are signed in with"));

        jdbc.update("DELETE FROM user_id_mapping WHERE TRIM(user_id) = ?", uid);
        jdbc.update("DELETE FROM msme_users WHERE TRIM(user_id) = ?", uid);
        return ResponseEntity.ok(ApiResponse.ok("User deleted successfully", null));
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private boolean isAuth(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        return token != null && authService.getUserByToken(token).isPresent();
    }

    private boolean isSu(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        if (token == null) return false;
        return authService.getUserByToken(token)
                .map(u -> "SU".equals(u.getRole() == null ? "" : u.getRole().trim()))
                .orElse(false);
    }

    private static String sha256(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

    @SuppressWarnings("unchecked")
    private <T> ResponseEntity<ApiResponse<T>> unauthorized() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error("Authentication required"));
    }

    private Set<String> monthsWithData(List<String> months) {
        return new HashSet<>(months);
    }
}
