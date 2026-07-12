package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.dto.DataStatusRow;
import com.tcec.api.dto.InstituteItem;
import com.tcec.api.entity.TlInstitute;
import com.tcec.api.entity.UserIdMapping;
import com.tcec.api.repository.BudgetRepository;
import com.tcec.api.repository.FinancialRepository;
import com.tcec.api.repository.PhysicalRepository;
import com.tcec.api.repository.PlacementRepository;
import com.tcec.api.repository.TlInstituteRepository;
import com.tcec.api.repository.UserIdMappingRepository;
import com.tcec.api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private final AuthService             authService;

    public AdminController(FinancialRepository  finRepo,
                           PhysicalRepository   phyRepo,
                           BudgetRepository     budRepo,
                           PlacementRepository  plaRepo,
                           TlInstituteRepository   instRepo,
                           UserIdMappingRepository mappingRepo,
                           AuthService             authService) {
        this.finRepo     = finRepo;
        this.phyRepo     = phyRepo;
        this.budRepo     = budRepo;
        this.plaRepo     = plaRepo;
        this.instRepo    = instRepo;
        this.mappingRepo = mappingRepo;
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

    // ── helpers ───────────────────────────────────────────────────────────────

    private boolean isAuth(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        return token != null && authService.getUserByToken(token).isPresent();
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
