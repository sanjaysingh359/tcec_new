package com.tcec.api.controller;

import com.tcec.api.dto.AgeReportRow;
import com.tcec.api.dto.AnalysisReportRow;
import com.tcec.api.dto.ApiResponse;
import com.tcec.api.dto.BudgetReportRow;
import com.tcec.api.dto.CategoryReportRow;
import com.tcec.api.dto.GenderReportRow;
import com.tcec.api.dto.GraphicalChartRow;
import com.tcec.api.dto.MprReportRow;
import com.tcec.api.dto.QualificationReportRow;
import com.tcec.api.dto.RfdReportRow;
import com.tcec.api.entity.TblBudget;
import com.tcec.api.entity.TblFinancial;
import com.tcec.api.entity.TblPhysical;
import com.tcec.api.entity.TlInstitute;
import com.tcec.api.entity.UserIdMapping;
import com.tcec.api.repository.BudgetRepository;
import com.tcec.api.repository.FinancialRepository;
import com.tcec.api.repository.PhysicalRepository;
import com.tcec.api.repository.TlInstituteRepository;
import com.tcec.api.repository.TrngExpTargetRepository;
import com.tcec.api.repository.UserIdMappingRepository;
import com.tcec.api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final FinancialRepository     finRepo;
    private final PhysicalRepository      phyRepo;
    private final BudgetRepository        budRepo;
    private final TlInstituteRepository   instRepo;
    private final UserIdMappingRepository mappingRepo;
    private final TrngExpTargetRepository targetRepo;
    private final AuthService             authService;

    public ReportController(FinancialRepository     finRepo,
                            PhysicalRepository      phyRepo,
                            BudgetRepository        budRepo,
                            TlInstituteRepository   instRepo,
                            UserIdMappingRepository mappingRepo,
                            TrngExpTargetRepository targetRepo,
                            AuthService             authService) {
        this.finRepo     = finRepo;
        this.phyRepo     = phyRepo;
        this.budRepo     = budRepo;
        this.instRepo    = instRepo;
        this.mappingRepo = mappingRepo;
        this.targetRepo  = targetRepo;
        this.authService = authService;
    }

    /**
     * GET /api/reports/graphical?instId=I3&year=2025-2026
     *
     * Returns 12 rows (one per fiscal month April=1 … March=12).
     * If instId == "totalInstitutes", aggregates across ALL institutes.
     */
    @GetMapping("/graphical")
    public ResponseEntity<ApiResponse<List<GraphicalChartRow>>> graphical(
            @RequestParam String instId,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        boolean all = "totalInstitutes".equalsIgnoreCase(instId);

        // ── Fetch rows from DB ────────────────────────────────────────────────
        List<TblFinancial> finRows = all
                ? finRepo.findByYears(year)
                : finRepo.findByInstIdAndYears(instId, year);

        List<TblPhysical> phyRows = all
                ? phyRepo.findByYears(year)
                : phyRepo.findByInstIdAndYears(instId, year);

        // ── Index by month number (1–12) ──────────────────────────────────────
        // For "all institutes": group by month and sum; for single institute: just map by month
        Map<Integer, List<TblFinancial>> finByMonth = finRows.stream()
                .filter(r -> r.getMonths() != null && !r.getMonths().isBlank())
                .collect(Collectors.groupingBy(r -> parseMonth(r.getMonths())));

        Map<Integer, List<TblPhysical>> phyByMonth = phyRows.stream()
                .filter(r -> r.getMonths() != null && !r.getMonths().isBlank())
                .collect(Collectors.groupingBy(r -> parseMonth(r.getMonths())));

        // ── Build 12 rows (missing months → zeros) ───────────────────────────
        List<GraphicalChartRow> result = new ArrayList<>(12);
        for (int m = 1; m <= 12; m++) {
            List<TblFinancial> fList = finByMonth.getOrDefault(m, List.of());
            List<TblPhysical>  pList = phyByMonth.getOrDefault(m, List.of());

            double revenue      = sumBD(fList, TblFinancial::getRevEarCashTotalDtm);
            double recExpdt     = sumBD(fList, TblFinancial::getRevExpCashDtm);
            double surplus      = sumBD(fList, TblFinancial::getIncExpCashDtm);
            double revenueCum   = sumBD(fList, TblFinancial::getRevEarCashTotalCum);
            double recExpdtCum  = sumBD(fList, TblFinancial::getRevExpCashCum);
            double surplusCum   = sumBD(fList, TblFinancial::getIncExpCashCum);

            // Trainees: use tring_total_not_dtm/cum (ttb_dtm_total is always 0 in DB)
            int trainees        = sumInt(pList, TblPhysical::getTringTotalNotDtm);
            int traineesCum     = sumInt(pList, TblPhysical::getTringTotalNotCum);

            // Unit Assisted = tooling (MSME+other) + job work (MSME+other)
            int unitAssisted    = sumInt(pList, TblPhysical::getMsmeNosToolingDtm)
                                + sumInt(pList, TblPhysical::getOtherNosToolingDtm)
                                + sumInt(pList, TblPhysical::getMsmeNosOtherjobDtm)
                                + sumInt(pList, TblPhysical::getOtherNosOtherjobDtm);
            int unitAssistedCum = sumInt(pList, TblPhysical::getMsmeNosToolingCumuMon)
                                + sumInt(pList, TblPhysical::getOtherNosToolingCumuMon)
                                + sumInt(pList, TblPhysical::getMsmeNosOtherjobCumuMon)
                                + sumInt(pList, TblPhysical::getOtherNosOtherjobCumuMon);

            result.add(new GraphicalChartRow(
                    m,
                    revenue, recExpdt, surplus, trainees, unitAssisted,
                    revenueCum, recExpdtCum, surplusCum, traineesCum, unitAssistedCum
            ));
        }

        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /**
     * GET /api/reports/trainees/category?month=X&year=Y
     *
     * Returns one row per active TCEC institute (those with a TCEC-* user mapping),
     * ordered alphabetically by institute name.
     *
     * Columns:
     *   userId  = institute name
     *   target  = annual ta_target from tbl_trng_exp_target
     *   dtmGen  = total − (SC+ST+OBC+MIN)  during the month
     *   dtmSC/ST/OBC/MIN = ttb_dtm_* columns
     *   cumGen/SC/ST/OBC/MIN = ttb_cum_* columns
     *   noData  = true when no tbl_physical row exists for this month
     */
    @GetMapping("/trainees/category")
    public ResponseEntity<ApiResponse<List<CategoryReportRow>>> categoryWise(
            @RequestParam String month,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        // All active institutes (those with TCEC-* user mappings)
        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        // Pre-fetch tbl_physical for this month+year → map by instId
        List<TblPhysical> phyAll = phyRepo.findByYears(year);
        Map<String, TblPhysical> phyByInst = phyAll.stream()
                .filter(p -> month.equals(p.getMonths() == null ? null : p.getMonths().trim()))
                .collect(Collectors.toMap(
                        p -> p.getInstId() == null ? "" : p.getInstId().trim(),
                        p -> p,
                        (a, b) -> a   // keep first on duplicate
                ));

        // Pre-fetch targets for this year → map by instId
        Map<String, Integer> targetByInst = targetRepo.findByYears(year).stream()
                .collect(Collectors.toMap(
                        t -> t.getInstId() == null ? "" : t.getInstId().trim(),
                        t -> t.getTaTarget() == null ? 0 : t.getTaTarget(),
                        (a, b) -> a
                ));

        // Build one row per institute
        List<CategoryReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            // Get institute name
            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName)
                    .orElse(instId);

            TblPhysical p = phyByInst.get(instId);
            boolean noData = (p == null);

            int dtmSC  = noData ? 0 : nvl(p.getTtbDtmSc());
            int dtmST  = noData ? 0 : nvl(p.getTtbDtmSt());
            int dtmOBC = noData ? 0 : nvl(p.getTtbDtmObc());
            int dtmMin = noData ? 0 : nvl(p.getTtbDtmMin());
            int dtmTot = noData ? 0 : nvl(p.getTringTotalNotDtm());
            int dtmGen = Math.max(0, dtmTot - dtmSC - dtmST - dtmOBC - dtmMin);

            int cumSC  = noData ? 0 : nvl(p.getTtbCumSc());
            int cumST  = noData ? 0 : nvl(p.getTtbCumSt());
            int cumOBC = noData ? 0 : nvl(p.getTtbCumObc());
            int cumMin = noData ? 0 : nvl(p.getTtbCumMin());
            int cumTot = noData ? 0 : nvl(p.getTringTotalNotCum());
            int cumGen = Math.max(0, cumTot - cumSC - cumST - cumOBC - cumMin);

            int target = targetByInst.getOrDefault(instId, 0);

            result.add(new CategoryReportRow(
                    instName, target,
                    dtmGen, dtmSC, dtmST, dtmOBC, dtmMin,
                    cumGen, cumSC, cumST, cumOBC, cumMin,
                    noData
            ));
        }

        // Sort alphabetically by institute name
        result.sort(Comparator.comparing(CategoryReportRow::userId,
                String.CASE_INSENSITIVE_ORDER));

        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /**
     * GET /api/reports/trainees/gender?month=X&year=Y
     *
     * Columns (tbl_physical):
     *   dtmMen   = men
     *   dtmWomen = ttb_dtm_women
     *   dtmTrans = transgender
     *   cumMen   = men_cum
     *   cumWomen = ttb_cum_women
     *   cumTrans = transgender_cum
     */
    @GetMapping("/trainees/gender")
    public ResponseEntity<ApiResponse<List<GenderReportRow>>> genderWise(
            @RequestParam String month,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        // Index tbl_physical by instId for the requested month
        Map<String, TblPhysical> phyByInst = phyRepo.findByYears(year).stream()
                .filter(p -> month.equals(p.getMonths() == null ? "" : p.getMonths().trim()))
                .collect(Collectors.toMap(
                        p -> p.getInstId() == null ? "" : p.getInstId().trim(),
                        p -> p, (a, b) -> a));

        Map<String, Integer> targetByInst = targetRepo.findByYears(year).stream()
                .collect(Collectors.toMap(
                        t -> t.getInstId() == null ? "" : t.getInstId().trim(),
                        t -> t.getTaTarget() == null ? 0 : t.getTaTarget(),
                        (a, b) -> a));

        List<GenderReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);

            TblPhysical p  = phyByInst.get(instId);
            boolean noData = (p == null);

            result.add(new GenderReportRow(
                    instName,
                    targetByInst.getOrDefault(instId, 0),
                    noData ? 0 : nvl(p.getMen()),
                    noData ? 0 : nvl(p.getTtbDtmWomen()),
                    noData ? 0 : nvl(p.getTransgender()),
                    noData ? 0 : nvl(p.getMenCum()),
                    noData ? 0 : nvl(p.getTtbCumWomen()),
                    noData ? 0 : nvl(p.getTransgenderCum()),
                    noData
            ));
        }

        result.sort(Comparator.comparing(GenderReportRow::userId, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /**
     * GET /api/reports/trainees/qualification?month=X&year=Y
     *
     * 10 qualification columns per institute (DTM + CUM):
     *   tenfail / tenpass / twelth / iti / diploma /
     *   graduation_tech / graduation_nontech /
     *   postgraduate_tech / postgraduate_nontech / phdmhil
     */
    @GetMapping("/trainees/qualification")
    public ResponseEntity<ApiResponse<List<QualificationReportRow>>> qualificationWise(
            @RequestParam String month,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        Map<String, TblPhysical> phyByInst = phyRepo.findByYears(year).stream()
                .filter(p -> month.equals(p.getMonths() == null ? "" : p.getMonths().trim()))
                .collect(Collectors.toMap(
                        p -> p.getInstId() == null ? "" : p.getInstId().trim(),
                        p -> p, (a, b) -> a));

        Map<String, Integer> targetByInst = targetRepo.findByYears(year).stream()
                .collect(Collectors.toMap(
                        t -> t.getInstId() == null ? "" : t.getInstId().trim(),
                        t -> t.getTaTarget() == null ? 0 : t.getTaTarget(),
                        (a, b) -> a));

        List<QualificationReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);

            TblPhysical p  = phyByInst.get(instId);
            boolean noData = (p == null);

            result.add(new QualificationReportRow(
                    instName,
                    targetByInst.getOrDefault(instId, 0),
                    // DTM
                    noData ? 0 : nvl(p.getTenfail()),
                    noData ? 0 : nvl(p.getTenpass()),
                    noData ? 0 : nvl(p.getTwelth()),
                    noData ? 0 : nvl(p.getIti()),
                    noData ? 0 : nvl(p.getDiploma()),
                    noData ? 0 : nvl(p.getGraduationTech()),
                    noData ? 0 : nvl(p.getGraduationNontech()),
                    noData ? 0 : nvl(p.getPostgraduateTech()),
                    noData ? 0 : nvl(p.getPostgraduateNontech()),
                    noData ? 0 : nvl(p.getPhdmhil()),
                    // CUM
                    noData ? 0 : nvl(p.getTenfailCum()),
                    noData ? 0 : nvl(p.getTenpassCum()),
                    noData ? 0 : nvl(p.getTwelthCum()),
                    noData ? 0 : nvl(p.getItic()),
                    noData ? 0 : nvl(p.getDiplomac()),
                    noData ? 0 : nvl(p.getGraduationTechc()),
                    noData ? 0 : nvl(p.getGraduationNontechc()),
                    noData ? 0 : nvl(p.getPostgraduateTechc()),
                    noData ? 0 : nvl(p.getPostgraduateNontechc()),
                    noData ? 0 : nvl(p.getPhdmhilc()),
                    noData
            ));
        }

        result.sort(Comparator.comparing(r -> r.userId, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /**
     * GET /api/reports/trainees/age?month=X&year=Y
     *
     * 5 age-group columns per institute (DTM + CUM):
     *   limit1/cum → 15-20 | limit2/cum → 21-25 | limit3/cum → 26-30
     *   limit4/cum → 31-40 | above/abovec → Above 40
     */
    @GetMapping("/trainees/age")
    public ResponseEntity<ApiResponse<List<AgeReportRow>>> ageWise(
            @RequestParam String month,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        Map<String, TblPhysical> phyByInst = phyRepo.findByYears(year).stream()
                .filter(p -> month.equals(p.getMonths() == null ? "" : p.getMonths().trim()))
                .collect(Collectors.toMap(
                        p -> p.getInstId() == null ? "" : p.getInstId().trim(),
                        p -> p, (a, b) -> a));

        Map<String, Integer> targetByInst = targetRepo.findByYears(year).stream()
                .collect(Collectors.toMap(
                        t -> t.getInstId() == null ? "" : t.getInstId().trim(),
                        t -> t.getTaTarget() == null ? 0 : t.getTaTarget(),
                        (a, b) -> a));

        List<AgeReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);

            TblPhysical p  = phyByInst.get(instId);
            boolean noData = (p == null);

            result.add(new AgeReportRow(
                    instName,
                    targetByInst.getOrDefault(instId, 0),
                    noData ? 0 : nvl(p.getLimit1()),
                    noData ? 0 : nvl(p.getLimit2()),
                    noData ? 0 : nvl(p.getLimit3()),
                    noData ? 0 : nvl(p.getLimit4()),
                    noData ? 0 : nvl(p.getAbove()),
                    noData ? 0 : nvl(p.getLimit1Cum()),
                    noData ? 0 : nvl(p.getLimit2Cum()),
                    noData ? 0 : nvl(p.getLimit3Cum()),
                    noData ? 0 : nvl(p.getLimit4Cum()),
                    noData ? 0 : nvl(p.getAbovec()),
                    noData
            ));
        }

        result.sort(Comparator.comparing(AgeReportRow::userId, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/reports/budget?month=X&year=Y
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/budget")
    public ResponseEntity<ApiResponse<List<BudgetReportRow>>> budget(
            @RequestParam String month,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Authentication required"));

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        Map<String, TblBudget> budByInst = budRepo.findByYears(year).stream()
                .filter(b -> month.equals(b.getMonths() == null ? "" : b.getMonths().trim()))
                .collect(Collectors.toMap(
                        b -> b.getInstId() == null ? "" : b.getInstId().trim(),
                        b -> b, (a, b) -> a));

        List<BudgetReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);

            TblBudget b    = budByInst.get(instId);
            boolean noData = (b == null);

            result.add(new BudgetReportRow(
                    instName,
                    noData ? 0 : nvlBD(b.getCryFwdAmt()),
                    noData ? 0 : nvlBD(b.getCryFwdUtilDm()),
                    noData ? 0 : nvlBD(b.getCryFwdUtilCum()),
                    noData ? 0 : nvlBD(b.getCryFwdUtilBal()),
                    noData ? 0 : nvlBD(b.getGiaAmt()),
                    noData ? 0 : nvlBD(b.getGiaUtilDm()),
                    noData ? 0 : nvlBD(b.getGiaUtilCum()),
                    noData ? 0 : nvlBD(b.getGiaUtilBal()),
                    noData
            ));
        }

        result.sort(Comparator.comparing(BudgetReportRow::userId, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/reports/mpr?year=Y
    // For each active institute, shows OK/NOT for each of the 12 fiscal months.
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/mpr")
    public ResponseEntity<ApiResponse<List<MprReportRow>>> mpr(
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Authentication required"));

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        // Collect set of months that exist in tbl_financial per instId
        Map<String, Set<String>> submittedByInst = new HashMap<>();
        finRepo.findByYears(year).forEach(f -> {
            String instId = f.getInstId() == null ? "" : f.getInstId().trim();
            String mon    = f.getMonths()  == null ? "" : f.getMonths().trim();
            submittedByInst.computeIfAbsent(instId, k -> new HashSet<>()).add(mon);
        });

        List<MprReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);

            Set<String> submitted = submittedByInst.getOrDefault(instId, Set.of());
            result.add(new MprReportRow(
                    instName,
                    submitted.contains("1")  ? "OK" : "NOT",
                    submitted.contains("2")  ? "OK" : "NOT",
                    submitted.contains("3")  ? "OK" : "NOT",
                    submitted.contains("4")  ? "OK" : "NOT",
                    submitted.contains("5")  ? "OK" : "NOT",
                    submitted.contains("6")  ? "OK" : "NOT",
                    submitted.contains("7")  ? "OK" : "NOT",
                    submitted.contains("8")  ? "OK" : "NOT",
                    submitted.contains("9")  ? "OK" : "NOT",
                    submitted.contains("10") ? "OK" : "NOT",
                    submitted.contains("11") ? "OK" : "NOT",
                    submitted.contains("12") ? "OK" : "NOT"
            ));
        }

        result.sort(Comparator.comparing(MprReportRow::userId, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/reports/analysis?month=X&year=Y
    // Performance analysis: targets (annual) vs actuals (cumulative up to month)
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/analysis")
    public ResponseEntity<ApiResponse<List<AnalysisReportRow>>> analysis(
            @RequestParam String month,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Authentication required"));

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        // Cumulative-up-to-month financial row per instId
        Map<String, TblFinancial> finByInst = finRepo.findByYears(year).stream()
                .filter(f -> month.equals(f.getMonths() == null ? "" : f.getMonths().trim()))
                .collect(Collectors.toMap(
                        f -> f.getInstId() == null ? "" : f.getInstId().trim(),
                        f -> f, (a, b) -> a));

        // Cumulative-up-to-month physical row per instId
        Map<String, TblPhysical> phyByInst = phyRepo.findByYears(year).stream()
                .filter(p -> month.equals(p.getMonths() == null ? "" : p.getMonths().trim()))
                .collect(Collectors.toMap(
                        p -> p.getInstId() == null ? "" : p.getInstId().trim(),
                        p -> p, (a, b) -> a));

        // Annual targets per instId
        Map<String, com.tcec.api.entity.TblTrngExpTarget> targetByInst =
                targetRepo.findByYears(year).stream().collect(Collectors.toMap(
                        t -> t.getInstId() == null ? "" : t.getInstId().trim(),
                        t -> t, (a, b) -> a));

        List<AnalysisReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);

            TblFinancial f  = finByInst.get(instId);
            TblPhysical  p  = phyByInst.get(instId);
            var tgt = targetByInst.get(instId);
            boolean noData  = (f == null && p == null);

            // Targets from tbl_trng_exp_target (annual)
            double revT   = tgt != null && tgt.getRevEarnCash() != null ? tgt.getRevEarnCash() : 0;
            double expT   = tgt != null && tgt.getRevExpCash()  != null ? tgt.getRevExpCash()  : 0;
            int    trainT = tgt != null && tgt.getTaTarget()    != null ? tgt.getTaTarget()     : 0;
            int    unitT  = tgt != null && tgt.getNjuTarget()   != null ? tgt.getNjuTarget()    : 0;

            // Actuals from tbl_financial (cum up to month)
            double revA  = f != null ? nvlBD(f.getRevEarCashTotalCum()) : 0;
            double expA  = f != null ? nvlBD(f.getRevExpCashCum())      : 0;

            // Trainees actual from tbl_physical
            int trainA = p != null ? nvl(p.getTringTotalNotCum()) : 0;

            // Units assisted (tooling + other job) cumulative
            int unitA  = p != null
                    ? nvl(p.getMsmeNosToolingCumuMon())  + nvl(p.getOtherNosToolingCumuMon())
                    + nvl(p.getMsmeNosOtherjobCumuMon()) + nvl(p.getOtherNosOtherjobCumuMon())
                    : 0;

            result.add(new AnalysisReportRow(
                    instName,
                    revT,  revA,
                    expT,  expA,
                    revT - expT, revA - expA,
                    trainT, trainA,
                    unitT,  unitA,
                    noData
            ));
        }

        result.sort(Comparator.comparing(AnalysisReportRow::userId, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/reports/rfd?month=X&year=Y
    // RFD report: revenue from production (tooling + job-work), training,
    // and trainee bifurcation (women/SC/ST/LTC/STC/PH) — cumulative up to month.
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/rfd")
    public ResponseEntity<ApiResponse<List<RfdReportRow>>> rfd(
            @RequestParam String month,
            @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Authentication required"));

        List<UserIdMapping> mappings = mappingRepo.findRealInstituteUsers();

        Map<String, TblFinancial> finByInst = finRepo.findByYears(year).stream()
                .filter(f -> month.equals(f.getMonths() == null ? "" : f.getMonths().trim()))
                .collect(Collectors.toMap(
                        f -> f.getInstId() == null ? "" : f.getInstId().trim(),
                        f -> f, (a, b) -> a));

        Map<String, TblPhysical> phyByInst = phyRepo.findByYears(year).stream()
                .filter(p -> month.equals(p.getMonths() == null ? "" : p.getMonths().trim()))
                .collect(Collectors.toMap(
                        p -> p.getInstId() == null ? "" : p.getInstId().trim(),
                        p -> p, (a, b) -> a));

        List<RfdReportRow> result = new ArrayList<>();
        Set<String> seen = new LinkedHashSet<>();

        for (UserIdMapping m : mappings) {
            String instId = m.getInstId();
            if (instId == null || instId.isBlank() || seen.contains(instId)) continue;
            seen.add(instId);

            String instName = instRepo.findByInstId(instId)
                    .map(TlInstitute::getInstName).orElse(instId);

            TblFinancial f = finByInst.get(instId);
            TblPhysical  p = phyByInst.get(instId);
            boolean noData = (f == null && p == null);

            result.add(new RfdReportRow(
                    instName,
                    f != null ? nvlBD(f.getRevEarAccrualPrdtnToolingCum()) : 0,
                    f != null ? nvlBD(f.getRevEarAccrualPrdtnOtherjobCum()) : 0,
                    f != null ? nvlBD(f.getRevEarAccrualTrngCum()) : 0,
                    p != null ? nvl(p.getTtbCumWomen())  : 0,
                    p != null ? nvl(p.getTtbCumSc())     : 0,
                    p != null ? nvl(p.getTtbCumSt())     : 0,
                    p != null ? nvl(p.getTaLtcCum())     : 0,
                    p != null ? nvl(p.getTaStcNttCum())  : 0,
                    p != null ? nvl(p.getTtbCumPh())     : 0,
                    noData
            ));
        }

        result.sort(Comparator.comparing(RfdReportRow::userId, String.CASE_INSENSITIVE_ORDER));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    private static int nvl(Integer v) { return v == null ? 0 : v; }

    private static double nvlBD(BigDecimal v) { return v == null ? 0.0 : v.doubleValue(); }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static int parseMonth(String months) {
        try { return Integer.parseInt(months.trim()); }
        catch (NumberFormatException e) { return 0; }
    }

    @FunctionalInterface
    interface BDGetter<T> { BigDecimal get(T t); }

    @FunctionalInterface
    interface IntGetter<T> { Integer get(T t); }

    private static <T> double sumBD(List<T> list, BDGetter<T> getter) {
        return list.stream()
                .mapToDouble(r -> {
                    BigDecimal v = getter.get(r);
                    return v == null ? 0.0 : v.doubleValue();
                })
                .sum();
    }

    private static <T> int sumInt(List<T> list, IntGetter<T> getter) {
        return list.stream()
                .mapToInt(r -> {
                    Integer v = getter.get(r);
                    return v == null ? 0 : v;
                })
                .sum();
    }
}
