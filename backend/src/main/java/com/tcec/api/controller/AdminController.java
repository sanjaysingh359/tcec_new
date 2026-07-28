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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    public AdminController(FinancialRepository  finRepo,
                           PhysicalRepository   phyRepo,
                           BudgetRepository     budRepo,
                           PlacementRepository  plaRepo,
                           TlInstituteRepository   instRepo,
                           UserIdMappingRepository mappingRepo,
                           MsmeUserRepository      userRepo,
                           AuthService             authService) {
        this.finRepo     = finRepo;
        this.phyRepo     = phyRepo;
        this.budRepo     = budRepo;
        this.plaRepo     = plaRepo;
        this.instRepo    = instRepo;
        this.mappingRepo = mappingRepo;
        this.userRepo    = userRepo;
        this.authService = authService;
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
    // Deletes one month's record from the specified section table.
    // section: 01=Financial, 02=Budget, 03=Physical, 04=Placement
    // ─────────────────────────────────────────────────────────────────────────
    @DeleteMapping("/data")
    public ResponseEntity<ApiResponse<String>> deleteData(
            @RequestParam String instId,
            @RequestParam String year,
            @RequestParam String month,
            @RequestParam String section,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader))
            return unauthorized();

        try {
            switch (section) {
                case "01" -> finRepo.deleteRecord(instId, month, year);
                case "02" -> budRepo.deleteRecord(instId, month, year);
                case "03" -> phyRepo.deleteRecord(instId, month, year);
                case "04" -> plaRepo.deleteRecord(instId, month, year);
                default   -> { return ResponseEntity.badRequest()
                                       .body(ApiResponse.error("Unknown section: " + section)); }
            }
            return ResponseEntity.ok(ApiResponse.ok("Deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Delete failed: " + e.getMessage()));
        }
    }

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

        return ResponseEntity.ok(ApiResponse.ok("User created successfully", null));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /api/admin/users/{userId}  — update role and/or password
    // Body: { role, password (optional), instId (optional) }
    // ─────────────────────────────────────────────────────────────────────────
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

        user.setRole(role);
        if (!password.isEmpty()) user.setPassword(sha256(password));
        userRepo.save(user);

        // update or remove institute mapping
        Optional<UserIdMapping> existingMapping = mappingRepo.findByUserIdTrimmed(userId);
        if ("IU".equals(role) && !instId.isEmpty()) {
            UserIdMapping mapping = existingMapping.orElseGet(() -> {
                UserIdMapping m = new UserIdMapping(); m.setUserId(userId); return m;
            });
            mapping.setInstId(instId);
            mappingRepo.save(mapping);
        } else if ("SU".equals(role)) {
            existingMapping.ifPresent(mappingRepo::delete);
        }

        return ResponseEntity.ok(ApiResponse.ok("User updated successfully", null));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /api/admin/users/{userId}
    // ─────────────────────────────────────────────────────────────────────────
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable String userId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isSu(authHeader)) return unauthorized();

        if (userRepo.findByUserIdTrimmed(userId).isEmpty())
            return ResponseEntity.status(404).body(ApiResponse.error("User not found"));

        mappingRepo.findByUserIdTrimmed(userId).ifPresent(mappingRepo::delete);
        userRepo.deleteById(userId);
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
