package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.*;
import com.tcec.api.repository.*;
import com.tcec.api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/entry")
public class EntryController {

    private final FinancialRepository  finRepo;
    private final PhysicalRepository   phyRepo;
    private final BudgetRepository     budRepo;
    private final PlacementRepository  plaRepo;
    private final TrngExpTargetRepository targetRepo;
    private final AuthService          authService;

    public EntryController(FinancialRepository  finRepo,
                           PhysicalRepository   phyRepo,
                           BudgetRepository     budRepo,
                           PlacementRepository  plaRepo,
                           TrngExpTargetRepository targetRepo,
                           AuthService          authService) {
        this.finRepo     = finRepo;
        this.phyRepo     = phyRepo;
        this.budRepo     = budRepo;
        this.plaRepo     = plaRepo;
        this.targetRepo  = targetRepo;
        this.authService = authService;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FINANCIAL
    // ═══════════════════════════════════════════════════════════════════════

    @GetMapping("/financial/load")
    public ResponseEntity<ApiResponse<Map<String, Object>>> loadFinancial(
            @RequestParam String instId, @RequestParam String month, @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        int mo = Integer.parseInt(month);

        List<TblFinancial> all = finRepo.findByInstIdAndYears(instId, year);
        List<TblFinancial> prev = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());
        Optional<TblFinancial> cur = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) == mo)
                .findFirst();

        Map<String, Object> prevCum = new LinkedHashMap<>();
        prevCum.put("cashTraining",    sumBD(prev, TblFinancial::getRevEarCashTrngDtm));
        prevCum.put("cashTooling",     sumBD(prev, TblFinancial::getRevEarCashPrdtnToolingDtm));
        prevCum.put("cashOtherJob",    sumBD(prev, TblFinancial::getRevEarCashPrdtnOtherjobDtm));
        prevCum.put("cashConsult",     sumBD(prev, TblFinancial::getRevEarCshBasConsultDtm));
        prevCum.put("cashMisc",        sumBD(prev, TblFinancial::getRevEarCashMiscDtm));
        prevCum.put("cashTesting",     sumBD(prev, TblFinancial::getTestCalServicesDtm));
        prevCum.put("accrualTraining", sumBD(prev, TblFinancial::getRevEarAccrualTrngDtm));
        prevCum.put("accrualTooling",  sumBD(prev, TblFinancial::getRevEarAccrualPrdtnToolingDtm));
        prevCum.put("accrualOtherJob", sumBD(prev, TblFinancial::getRevEarAccrualPrdtnOtherjobDtm));
        prevCum.put("accrualConsult",  sumBD(prev, TblFinancial::getRevEarAcclBasConsultDtm));
        prevCum.put("accrualMisc",     sumBD(prev, TblFinancial::getRevEarAccrualMiscDtm));
        prevCum.put("accrualTesting",  sumBD(prev, TblFinancial::getTestCalServicesAccDtm));
        prevCum.put("revExpCash",      sumBD(prev, TblFinancial::getRevExpCashDtm));
        prevCum.put("revExpAccrual",   sumBD(prev, TblFinancial::getRevExpAccrualDtm));

        Map<String, Object> existing = null;
        if (cur.isPresent()) {
            TblFinancial e = cur.get();
            existing = new LinkedHashMap<>();
            existing.put("cashTraining",    bd(e.getRevEarCashTrngDtm()));
            existing.put("cashTooling",     bd(e.getRevEarCashPrdtnToolingDtm()));
            existing.put("cashOtherJob",    bd(e.getRevEarCashPrdtnOtherjobDtm()));
            existing.put("cashConsult",     bd(e.getRevEarCshBasConsultDtm()));
            existing.put("cashMisc",        bd(e.getRevEarCashMiscDtm()));
            existing.put("cashTesting",     bd(e.getTestCalServicesDtm()));
            existing.put("accrualTraining", bd(e.getRevEarAccrualTrngDtm()));
            existing.put("accrualTooling",  bd(e.getRevEarAccrualPrdtnToolingDtm()));
            existing.put("accrualOtherJob", bd(e.getRevEarAccrualPrdtnOtherjobDtm()));
            existing.put("accrualConsult",  bd(e.getRevEarAcclBasConsultDtm()));
            existing.put("accrualMisc",     bd(e.getRevEarAccrualMiscDtm()));
            existing.put("accrualTesting",  bd(e.getTestCalServicesAccDtm()));
            existing.put("revExpCash",      bd(e.getRevExpCashDtm()));
            existing.put("revExpAccrual",   bd(e.getRevExpAccrualDtm()));
        }

        Map<String, Object> targets = buildFinancialTargets(instId, year);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("hasData", cur.isPresent());
        result.put("prevCum", prevCum);
        result.put("existing", existing);
        result.put("targets", targets);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/financial/save")
    public ResponseEntity<ApiResponse<String>> saveFinancial(
            @RequestBody Map<String, Object> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        String role = getRole(authHeader);
        String instId = str(body, "instId");
        String month  = str(body, "month");
        String year   = str(body, "year");

        Optional<TblFinancial> existingOpt = finRepo.findByInstIdAndMonthsAndYears(instId, month, year);
        if (existingOpt.isPresent() && !"SU".equals(role))
            return ResponseEntity.badRequest().body(ApiResponse.error("Data already submitted for this month"));

        // Compute cumulative from previous months + current DTM
        int mo = Integer.parseInt(month);
        List<TblFinancial> prev = finRepo.findByInstIdAndYears(instId, year).stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());

        TblFinancial e = existingOpt.orElseGet(TblFinancial::new);
        e.setInstId(instId);
        e.setMonths(month);
        e.setYears(year);
        e.setMonthsYear(month + "-" + year);

        BigDecimal cashTrngDtm    = dbd(body, "cashTraining");
        BigDecimal cashToolDtm    = dbd(body, "cashTooling");
        BigDecimal cashJobDtm     = dbd(body, "cashOtherJob");
        BigDecimal cashConsDtm    = dbd(body, "cashConsult");
        BigDecimal cashMiscDtm    = dbd(body, "cashMisc");
        BigDecimal cashTestDtm    = dbd(body, "cashTesting");
        BigDecimal accrTrngDtm    = dbd(body, "accrualTraining");
        BigDecimal accrToolDtm    = dbd(body, "accrualTooling");
        BigDecimal accrJobDtm     = dbd(body, "accrualOtherJob");
        BigDecimal accrConsDtm    = dbd(body, "accrualConsult");
        BigDecimal accrMiscDtm    = dbd(body, "accrualMisc");
        BigDecimal accrTestDtm    = dbd(body, "accrualTesting");
        BigDecimal revExpCashDtm  = dbd(body, "revExpCash");
        BigDecimal revExpAccrDtm  = dbd(body, "revExpAccrual");

        e.setRevEarCashTrngDtm(cashTrngDtm);
        e.setRevEarCashPrdtnToolingDtm(cashToolDtm);
        e.setRevEarCashPrdtnOtherjobDtm(cashJobDtm);
        e.setRevEarCshBasConsultDtm(cashConsDtm);
        e.setRevEarCashMiscDtm(cashMiscDtm);
        e.setTestCalServicesDtm(cashTestDtm);
        e.setRevEarAccrualTrngDtm(accrTrngDtm);
        e.setRevEarAccrualPrdtnToolingDtm(accrToolDtm);
        e.setRevEarAccrualPrdtnOtherjobDtm(accrJobDtm);
        e.setRevEarAcclBasConsultDtm(accrConsDtm);
        e.setRevEarAccrualMiscDtm(accrMiscDtm);
        e.setTestCalServicesAccDtm(accrTestDtm);
        e.setRevExpCashDtm(revExpCashDtm);
        e.setRevExpAccrualDtm(revExpAccrDtm);

        // Cumulative = sum of prev DTMs + current DTM
        e.setRevEarCashTrngCum(      sumBD(prev, TblFinancial::getRevEarCashTrngDtm).add(cashTrngDtm));
        e.setRevEarCashPrdtnToolingCum(sumBD(prev, TblFinancial::getRevEarCashPrdtnToolingDtm).add(cashToolDtm));
        e.setRevEarCashPrdtnOtherjobCum(sumBD(prev, TblFinancial::getRevEarCashPrdtnOtherjobDtm).add(cashJobDtm));
        e.setRevEarCshBasConsultCum( sumBD(prev, TblFinancial::getRevEarCshBasConsultDtm).add(cashConsDtm));
        e.setRevEarCashMiscCum(      sumBD(prev, TblFinancial::getRevEarCashMiscDtm).add(cashMiscDtm));
        e.setTestCalServicesMon(     sumBD(prev, TblFinancial::getTestCalServicesDtm).add(cashTestDtm));
        e.setRevEarAccrualTrngCum(   sumBD(prev, TblFinancial::getRevEarAccrualTrngDtm).add(accrTrngDtm));
        e.setRevEarAccrualPrdtnToolingCum(sumBD(prev, TblFinancial::getRevEarAccrualPrdtnToolingDtm).add(accrToolDtm));
        e.setRevEarAccrualPrdtnOtherjobCum(sumBD(prev, TblFinancial::getRevEarAccrualPrdtnOtherjobDtm).add(accrJobDtm));
        e.setRevEarAcclBasConsultCum(sumBD(prev, TblFinancial::getRevEarAcclBasConsultDtm).add(accrConsDtm));
        e.setRevEarAccrualMiscCum(   sumBD(prev, TblFinancial::getRevEarAccrualMiscDtm).add(accrMiscDtm));
        e.setTestCalServicesAccMon(  sumBD(prev, TblFinancial::getTestCalServicesAccDtm).add(accrTestDtm));
        e.setRevExpCashCum(          sumBD(prev, TblFinancial::getRevExpCashDtm).add(revExpCashDtm));
        e.setRevExpAccrualCum(       sumBD(prev, TblFinancial::getRevExpAccrualDtm).add(revExpAccrDtm));

        finRepo.save(e);
        return ResponseEntity.ok(ApiResponse.ok("Saved successfully"));
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PHYSICAL
    // ═══════════════════════════════════════════════════════════════════════

    @GetMapping("/physical/load")
    public ResponseEntity<ApiResponse<Map<String, Object>>> loadPhysical(
            @RequestParam String instId, @RequestParam String month, @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        int mo = Integer.parseInt(month);

        List<TblPhysical> all = phyRepo.findByInstIdAndYears(instId, year);
        List<TblPhysical> prev = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());
        Optional<TblPhysical> cur = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) == mo)
                .findFirst();

        Map<String, Object> prevCum = new LinkedHashMap<>();
        prevCum.put("msmeNosNju",    sumInt(prev, TblPhysical::getNjuMsmeNoDtm));
        prevCum.put("msmeValuesNju", sumBD(prev, TblPhysical::getNjuMsmeValueDtm));
        prevCum.put("otherNosNju",   sumInt(prev, TblPhysical::getNjuOtherNoDtm));
        prevCum.put("otherValuesNju",sumBD(prev, TblPhysical::getNjuOtherValueDtm));
        prevCum.put("msmeCons",      sumInt(prev, TblPhysical::getConsltMsmeDtm));
        prevCum.put("otherCons",     sumBD(prev, TblPhysical::getConsltOtherDtm));
        prevCum.put("anyOther",      sumBD(prev, TblPhysical::getAnyOtherDtm));
        prevCum.put("stmNocComp",    sumInt(prev, TblPhysical::getTaStcNccDtm));
        prevCum.put("stmNottComp",   sumInt(prev, TblPhysical::getTaStcNttDtm));
        prevCum.put("trngOther",     sumInt(prev, TblPhysical::getTaOthersDtm));
        prevCum.put("trngTotalNoc",  sumInt(prev, TblPhysical::getTrngTotalNocDtm));
        prevCum.put("trngTotalNot",  sumInt(prev, TblPhysical::getTringTotalNotDtm));
        prevCum.put("seminarsNos",   sumInt(prev, TblPhysical::getSeminarNoDtm));
        prevCum.put("seminarsPts",   sumInt(prev, TblPhysical::getSeminarParticipantsDtm));
        prevCum.put("gen",           sumInt(prev, TblPhysical::getGen));
        prevCum.put("sc",            sumInt(prev, TblPhysical::getTtbDtmSc));
        prevCum.put("st",            sumInt(prev, TblPhysical::getTtbDtmSt));
        prevCum.put("obc",           sumInt(prev, TblPhysical::getTtbDtmObc));
        prevCum.put("min",           sumInt(prev, TblPhysical::getTtbDtmMin));
        prevCum.put("men",           sumInt(prev, TblPhysical::getMen));
        prevCum.put("wmn",           sumInt(prev, TblPhysical::getTtbDtmWomen));
        prevCum.put("transgender",   sumInt(prev, TblPhysical::getTransgender));
        prevCum.put("thFail",        sumInt(prev, TblPhysical::getTenfail));
        prevCum.put("thPass",        sumInt(prev, TblPhysical::getTenpass));
        prevCum.put("twelfth",       sumInt(prev, TblPhysical::getTwelth));
        prevCum.put("iti",           sumInt(prev, TblPhysical::getIti));
        prevCum.put("diploma",       sumInt(prev, TblPhysical::getDiploma));
        prevCum.put("gradNonTech",   sumInt(prev, TblPhysical::getGraduationNontech));
        prevCum.put("gradTech",      sumInt(prev, TblPhysical::getGraduationTech));
        prevCum.put("pgNonTech",     sumInt(prev, TblPhysical::getPostgraduateNontech));
        prevCum.put("pgTech",        sumInt(prev, TblPhysical::getPostgraduateTech));
        prevCum.put("phdMhil",       sumInt(prev, TblPhysical::getPhdmhil));
        prevCum.put("a1520",         sumInt(prev, TblPhysical::getLimit1));
        prevCum.put("a2125",         sumInt(prev, TblPhysical::getLimit2));
        prevCum.put("a2630",         sumInt(prev, TblPhysical::getLimit3));
        prevCum.put("a3140",         sumInt(prev, TblPhysical::getLimit4));
        prevCum.put("above40",       sumInt(prev, TblPhysical::getAbove));
        prevCum.put("ph",            sumInt(prev, TblPhysical::getTtbDtmPh));
        prevCum.put("ltcTotal",      sumInt(prev, TblPhysical::getTaLtcDtm));

        Optional<TblTrngExpTarget> tgt = targetRepo.findByInstIdAndYears(instId, year);
        Map<String, Object> targets = new LinkedHashMap<>();
        tgt.ifPresent(t -> {
            targets.put("phyTotalNos",   t.getNjuTarget() != null ? t.getNjuTarget() : 0);
            targets.put("trngTotalNot",  t.getTaTarget()  != null ? t.getTaTarget()  : 0);
        });

        Map<String, Object> existing = null;
        if (cur.isPresent()) {
            TblPhysical p = cur.get();
            existing = new LinkedHashMap<>();
            existing.put("msmeNosNju",    intVal(p.getNjuMsmeNoDtm()));
            existing.put("msmeValuesNju", bd(p.getNjuMsmeValueDtm()));
            existing.put("otherNosNju",   intVal(p.getNjuOtherNoDtm()));
            existing.put("otherValuesNju",bd(p.getNjuOtherValueDtm()));
            existing.put("msmeCons",      intVal(p.getConsltMsmeDtm()));
            existing.put("otherCons",     bd(p.getConsltOtherDtm()));
            existing.put("anyOther",      bd(p.getAnyOtherDtm()));
            existing.put("stmNocComp",    intVal(p.getTaStcNccDtm()));
            existing.put("stmNottComp",   intVal(p.getTaStcNttDtm()));
            existing.put("trngOther",     intVal(p.getTaOthersDtm()));
            existing.put("trngTotalNoc",  intVal(p.getTrngTotalNocDtm()));
            existing.put("trngTotalNot",  intVal(p.getTringTotalNotDtm()));
            existing.put("seminarsNos",   intVal(p.getSeminarNoDtm()));
            existing.put("seminarsPts",   intVal(p.getSeminarParticipantsDtm()));
            existing.put("gen",           intVal(p.getGen()));
            existing.put("sc",            intVal(p.getTtbDtmSc()));
            existing.put("st",            intVal(p.getTtbDtmSt()));
            existing.put("obc",           intVal(p.getTtbDtmObc()));
            existing.put("min",           intVal(p.getTtbDtmMin()));
            existing.put("men",           intVal(p.getMen()));
            existing.put("wmn",           intVal(p.getTtbDtmWomen()));
            existing.put("transgender",   intVal(p.getTransgender()));
            existing.put("thFail",        intVal(p.getTenfail()));
            existing.put("thPass",        intVal(p.getTenpass()));
            existing.put("twelfth",       intVal(p.getTwelth()));
            existing.put("iti",           intVal(p.getIti()));
            existing.put("diploma",       intVal(p.getDiploma()));
            existing.put("gradNonTech",   intVal(p.getGraduationNontech()));
            existing.put("gradTech",      intVal(p.getGraduationTech()));
            existing.put("pgNonTech",     intVal(p.getPostgraduateNontech()));
            existing.put("pgTech",        intVal(p.getPostgraduateTech()));
            existing.put("phdMhil",       intVal(p.getPhdmhil()));
            existing.put("a1520",         intVal(p.getLimit1()));
            existing.put("a2125",         intVal(p.getLimit2()));
            existing.put("a2630",         intVal(p.getLimit3()));
            existing.put("a3140",         intVal(p.getLimit4()));
            existing.put("above40",       intVal(p.getAbove()));
            existing.put("ph",            intVal(p.getTtbDtmPh()));
            existing.put("ltcTotal",      intVal(p.getTaLtcDtm()));
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("hasData", cur.isPresent());
        result.put("prevCum", prevCum);
        result.put("existing", existing);
        result.put("targets", targets);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/physical/save")
    public ResponseEntity<ApiResponse<String>> savePhysical(
            @RequestBody Map<String, Object> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        String role  = getRole(authHeader);
        String instId = str(body, "instId");
        String month  = str(body, "month");
        String year   = str(body, "year");

        Optional<TblPhysical> existingOpt = phyRepo.findByInstIdAndMonthsAndYears(instId, month, year);
        if (existingOpt.isPresent() && !"SU".equals(role))
            return ResponseEntity.badRequest().body(ApiResponse.error("Data already submitted for this month"));

        int mo = Integer.parseInt(month);
        List<TblPhysical> prev = phyRepo.findByInstIdAndYears(instId, year).stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());

        TblPhysical p = existingOpt.orElseGet(TblPhysical::new);
        p.setInstId(instId); p.setMonths(month); p.setYears(year);
        p.setMonthsYear(month + "-" + year);

        // DTM
        int njuMsmeNo   = intVal(body.get("msmeNosNju"));
        int njuOtherNo  = intVal(body.get("otherNosNju"));
        int consltMsme  = intVal(body.get("msmeCons"));
        int anyOther    = 0; // stored as BigDecimal — set below
        int stcNcc      = intVal(body.get("stmNocComp"));
        int stcNtt      = intVal(body.get("stmNottComp"));
        int taOthers    = intVal(body.get("trngOther"));
        int trngNoc     = intVal(body.get("trngTotalNoc"));
        int trngNot     = intVal(body.get("trngTotalNot"));
        int semNo       = intVal(body.get("seminarsNos"));
        int semPts      = intVal(body.get("seminarsPts"));
        int gen         = intVal(body.get("gen"));
        int sc          = intVal(body.get("sc"));
        int st          = intVal(body.get("st"));
        int obc         = intVal(body.get("obc"));
        int min         = intVal(body.get("min"));
        int men         = intVal(body.get("men"));
        int wmn         = intVal(body.get("wmn"));
        int trans       = intVal(body.get("transgender"));
        int thFail      = intVal(body.get("thFail"));
        int thPass      = intVal(body.get("thPass"));
        int twelfth     = intVal(body.get("twelfth"));
        int iti         = intVal(body.get("iti"));
        int diploma     = intVal(body.get("diploma"));
        int gradNT      = intVal(body.get("gradNonTech"));
        int gradT       = intVal(body.get("gradTech"));
        int pgNT        = intVal(body.get("pgNonTech"));
        int pgT         = intVal(body.get("pgTech"));
        int phdMhil     = intVal(body.get("phdMhil"));
        int a1520       = intVal(body.get("a1520"));
        int a2125       = intVal(body.get("a2125"));
        int a2630       = intVal(body.get("a2630"));
        int a3140       = intVal(body.get("a3140"));
        int above40     = intVal(body.get("above40"));
        int ph          = intVal(body.get("ph"));
        int ltcTotal    = intVal(body.get("ltcTotal"));

        BigDecimal msmeValNju  = dbd(body, "msmeValuesNju");
        BigDecimal otherValNju = dbd(body, "otherValuesNju");
        BigDecimal otherConsBD = dbd(body, "otherCons");
        BigDecimal anyOtherBD  = dbd(body, "anyOther");

        // Set DTM
        p.setNjuMsmeNoDtm(njuMsmeNo);   p.setNjuMsmeValueDtm(msmeValNju);
        p.setNjuOtherNoDtm(njuOtherNo); p.setNjuOtherValueDtm(otherValNju);
        p.setConsltMsmeDtm(consltMsme); p.setConsltOtherDtm(otherConsBD);
        p.setAnyOtherDtm(anyOtherBD);
        p.setTaStcNccDtm(stcNcc);  p.setTaStcNttDtm(stcNtt);
        p.setTaOthersDtm(taOthers);
        p.setTrngTotalNocDtm(trngNoc); p.setTringTotalNotDtm(trngNot);
        p.setSeminarNoDtm(semNo); p.setSeminarParticipantsDtm(semPts);
        p.setGen(gen); p.setTtbDtmSc(sc); p.setTtbDtmSt(st);
        p.setTtbDtmObc(obc); p.setTtbDtmMin(min); p.setTtbDtmPh(ph);
        p.setMen(men); p.setTtbDtmWomen(wmn); p.setTransgender(trans);
        p.setTenfail(thFail); p.setTenpass(thPass); p.setTwelth(twelfth);
        p.setIti(iti); p.setDiploma(diploma);
        p.setGraduationNontech(gradNT); p.setGraduationTech(gradT);
        p.setPostgraduateNontech(pgNT); p.setPostgraduateTech(pgT);
        p.setPhdmhil(phdMhil);
        p.setLimit1(a1520); p.setLimit2(a2125); p.setLimit3(a2630); p.setLimit4(a3140);
        p.setAbove(above40);
        p.setTaLtcDtm(ltcTotal);

        // Cumulative
        p.setNjuMsmeNoCum(      sumInt(prev, TblPhysical::getNjuMsmeNoDtm)   + njuMsmeNo);
        p.setNjuMsmeValueCum(   sumBD(prev, TblPhysical::getNjuMsmeValueDtm).add(msmeValNju));
        p.setNjuOtherNoCum(     sumInt(prev, TblPhysical::getNjuOtherNoDtm)  + njuOtherNo);
        p.setNjuOtherValueCum(  sumBD(prev, TblPhysical::getNjuOtherValueDtm).add(otherValNju));
        p.setConsltMsmeCum(     sumInt(prev, TblPhysical::getConsltMsmeDtm)  + consltMsme);
        p.setConsltOtherCum(    sumInt(prev, r -> r.getConsltOtherDtm() != null ? r.getConsltOtherDtm().intValue() : 0) + (int)otherConsBD.doubleValue());
        p.setAnyOtherCum(       sumInt(prev, r -> r.getAnyOtherDtm() != null ? r.getAnyOtherDtm().intValue() : 0) + (int)anyOtherBD.doubleValue());
        p.setTaStcNccCum(       sumInt(prev, TblPhysical::getTaStcNccDtm)    + stcNcc);
        p.setTaStcNttCum(       sumInt(prev, TblPhysical::getTaStcNttDtm)    + stcNtt);
        p.setTaOthersCum(       sumInt(prev, TblPhysical::getTaOthersDtm)    + taOthers);
        p.setTrngTotalNocCumuMon(sumInt(prev, TblPhysical::getTrngTotalNocDtm) + trngNoc);
        p.setTringTotalNotCum(  sumInt(prev, TblPhysical::getTringTotalNotDtm) + trngNot);
        p.setSeminarNoCum(      sumInt(prev, TblPhysical::getSeminarNoDtm)   + semNo);
        p.setSeminarParticipantsCum(sumInt(prev, TblPhysical::getSeminarParticipantsDtm) + semPts);
        p.setGeneralCum(        sumInt(prev, TblPhysical::getGen)            + gen);
        p.setTtbCumSc(          sumInt(prev, TblPhysical::getTtbDtmSc)       + sc);
        p.setTtbCumSt(          sumInt(prev, TblPhysical::getTtbDtmSt)       + st);
        p.setTtbCumObc(         sumInt(prev, TblPhysical::getTtbDtmObc)      + obc);
        p.setTtbCumMin(         sumInt(prev, TblPhysical::getTtbDtmMin)      + min);
        p.setTtbCumPh(          sumInt(prev, TblPhysical::getTtbDtmPh)       + ph);
        p.setMenCum(            sumInt(prev, TblPhysical::getMen)            + men);
        p.setTtbCumWomen(       sumInt(prev, TblPhysical::getTtbDtmWomen)    + wmn);
        p.setTransgenderCum(    sumInt(prev, TblPhysical::getTransgender)    + trans);
        p.setTenfailCum(        sumInt(prev, TblPhysical::getTenfail)        + thFail);
        p.setTenpassCum(        sumInt(prev, TblPhysical::getTenpass)        + thPass);
        p.setTwelthCum(         sumInt(prev, TblPhysical::getTwelth)         + twelfth);
        p.setItic(              sumInt(prev, TblPhysical::getIti)            + iti);
        p.setDiplomac(          sumInt(prev, TblPhysical::getDiploma)        + diploma);
        p.setGraduationNontechc(sumInt(prev, TblPhysical::getGraduationNontech) + gradNT);
        p.setGraduationTechc(   sumInt(prev, TblPhysical::getGraduationTech)    + gradT);
        p.setPostgraduateNontechc(sumInt(prev, TblPhysical::getPostgraduateNontech) + pgNT);
        p.setPostgraduateTechc( sumInt(prev, TblPhysical::getPostgraduateTech)   + pgT);
        p.setPhdmhilc(          sumInt(prev, TblPhysical::getPhdmhil)        + phdMhil);
        p.setLimit1Cum(         sumInt(prev, TblPhysical::getLimit1)         + a1520);
        p.setLimit2Cum(         sumInt(prev, TblPhysical::getLimit2)         + a2125);
        p.setLimit3Cum(         sumInt(prev, TblPhysical::getLimit3)         + a2630);
        p.setLimit4Cum(         sumInt(prev, TblPhysical::getLimit4)         + a3140);
        p.setAbovec(            sumInt(prev, TblPhysical::getAbove)          + above40);
        p.setTaLtcCum(          sumInt(prev, TblPhysical::getTaLtcDtm)       + ltcTotal);
        p.setGeneralTtb(        sumInt(prev, TblPhysical::getGen)            + gen);

        phyRepo.save(p);
        return ResponseEntity.ok(ApiResponse.ok("Saved successfully"));
    }

    // ═══════════════════════════════════════════════════════════════════════
    // BUDGET
    // ═══════════════════════════════════════════════════════════════════════

    @GetMapping("/budget/load")
    public ResponseEntity<ApiResponse<Map<String, Object>>> loadBudget(
            @RequestParam String instId, @RequestParam String month, @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        int mo = Integer.parseInt(month);

        List<TblBudget> all = budRepo.findByInstIdAndYears(instId, year);
        List<TblBudget> prev = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());
        Optional<TblBudget> cur = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) == mo)
                .findFirst();

        Map<String, Object> prevCum = new LinkedHashMap<>();
        prevCum.put("cfCum",      sumBD(prev, TblBudget::getCryFwdUtilDm));
        prevCum.put("giaCum",     sumBD(prev, TblBudget::getGiaUtilDm));
        prevCum.put("machineCum", sumBD(prev, TblBudget::getMachineDtm));

        Optional<TblTrngExpTarget> tgt = targetRepo.findByInstIdAndYears(instId, year);
        Map<String, Object> targets = new LinkedHashMap<>();
        tgt.ifPresent(t -> targets.put("beBudget", t.getBeBudget() != null ? t.getBeBudget() : 0));

        Map<String, Object> existing = null;
        if (cur.isPresent()) {
            TblBudget b = cur.get();
            existing = new LinkedHashMap<>();
            existing.put("cfAmount",   bd(b.getCryFwdAmt()));
            existing.put("cfDtm",      bd(b.getCryFwdUtilDm()));
            existing.put("giaAmount",  bd(b.getGiaAmt()));
            existing.put("giaDtm",     bd(b.getGiaUtilDm()));
            existing.put("ssA",        intVal(b.getStfStSsA()));
            existing.put("ssB",        intVal(b.getStfStSsB()));
            existing.put("ssC",        intVal(b.getStfStSsC()));
            existing.put("ssD",        intVal(b.getStfStSsD()));
            existing.put("posA",       intVal(b.getStfStPosA()));
            existing.put("posB",       intVal(b.getStfStPosB()));
            existing.put("posC",       intVal(b.getStfStPosC()));
            existing.put("posD",       intVal(b.getStfStPosD()));
            existing.put("machineDtm", bd(b.getMachineDtm()));
            existing.put("detailVisit",b.getDetailsVisit() != null ? b.getDetailsVisit() : "");
            existing.put("sigAchiev",  b.getSignificant()  != null ? b.getSignificant()  : "");
            existing.put("shortFalls", b.getShortsFall()   != null ? b.getShortsFall()   : "");
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("hasData", cur.isPresent());
        result.put("prevCum", prevCum);
        result.put("existing", existing);
        result.put("targets", targets);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/budget/save")
    public ResponseEntity<ApiResponse<String>> saveBudget(
            @RequestBody Map<String, Object> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        String role  = getRole(authHeader);
        String instId = str(body, "instId");
        String month  = str(body, "month");
        String year   = str(body, "year");

        Optional<TblBudget> existingOpt = budRepo.findByInstIdAndMonthsAndYears(instId, month, year);
        if (existingOpt.isPresent() && !"SU".equals(role))
            return ResponseEntity.badRequest().body(ApiResponse.error("Data already submitted for this month"));

        int mo = Integer.parseInt(month);
        List<TblBudget> prev = budRepo.findByInstIdAndYears(instId, year).stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());

        TblBudget b = existingOpt.orElseGet(TblBudget::new);
        b.setInstId(instId); b.setMonths(month); b.setYears(year);
        b.setMonthsYear(month + "-" + year);

        BigDecimal cfAmt    = dbd(body, "cfAmount");
        BigDecimal cfDtm    = dbd(body, "cfDtm");
        BigDecimal giaAmt   = dbd(body, "giaAmount");
        BigDecimal giaDtm   = dbd(body, "giaDtm");
        BigDecimal macDtm   = dbd(body, "machineDtm");

        b.setCryFwdAmt(cfAmt);
        b.setCryFwdUtilDm(cfDtm);
        b.setGiaAmt(giaAmt);
        b.setGiaUtilDm(giaDtm);
        b.setMachineDtm(macDtm);
        b.setStfStSsA(intVal(body.get("ssA")));  b.setStfStSsB(intVal(body.get("ssB")));
        b.setStfStSsC(intVal(body.get("ssC")));  b.setStfStSsD(intVal(body.get("ssD")));
        b.setStfStPosA(intVal(body.get("posA"))); b.setStfStPosB(intVal(body.get("posB")));
        b.setStfStPosC(intVal(body.get("posC"))); b.setStfStPosD(intVal(body.get("posD")));
        b.setDetailsVisit((String) body.get("detailVisit"));
        b.setSignificant((String) body.get("sigAchiev"));
        b.setShortsFall((String) body.get("shortFalls"));

        BigDecimal cfCum  = sumBD(prev, TblBudget::getCryFwdUtilDm).add(cfDtm);
        BigDecimal giaCum = sumBD(prev, TblBudget::getGiaUtilDm).add(giaDtm);
        BigDecimal macCum = sumBD(prev, TblBudget::getMachineDtm).add(macDtm);

        b.setCryFwdUtilCum(cfCum);
        b.setCryFwdUtilBal(cfAmt.subtract(cfCum));
        b.setGiaUtilCum(giaCum);
        b.setGiaUtilBal(giaAmt.subtract(giaCum));
        b.setBudgetTotalAmt(cfAmt.add(giaAmt));
        b.setBudgetTotalUtilDm(cfDtm.add(giaDtm));
        b.setBudgetTotalUtilCum(cfCum.add(giaCum));
        b.setBudgetTotalUtilBal(cfAmt.subtract(cfCum).add(giaAmt.subtract(giaCum)));
        b.setMachineCum(macCum);

        budRepo.save(b);
        return ResponseEntity.ok(ApiResponse.ok("Saved successfully"));
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PLACEMENT
    // ═══════════════════════════════════════════════════════════════════════

    @GetMapping("/placement/load")
    public ResponseEntity<ApiResponse<Map<String, Object>>> loadPlacement(
            @RequestParam String instId, @RequestParam String month, @RequestParam String year,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        int mo = Integer.parseInt(month);

        List<TblPlacement> all = plaRepo.findByInstIdAndYears(instId, year);
        List<TblPlacement> prev = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());
        Optional<TblPlacement> cur = all.stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) == mo)
                .findFirst();

        Map<String, Object> prevCum = new LinkedHashMap<>();
        prevCum.put("nsqfCom",    sumInt(prev, TblPlacement::getNsqfComDm));
        prevCum.put("nsqfExe",    sumInt(prev, TblPlacement::getNsqfExDm));
        prevCum.put("nonNsqf",    sumInt(prev, TblPlacement::getNonNsqfDm));
        prevCum.put("trnCert",    sumInt(prev, TblPlacement::getPsTrnCertDm));
        prevCum.put("trnOptPlc",  sumInt(prev, TblPlacement::getPsTrnOptPlcDm));
        prevCum.put("trnRegSmrk", sumInt(prev, TblPlacement::getPsTrnRegSmprkDm));
        prevCum.put("cndPlcd",    sumInt(prev, TblPlacement::getPsCndPlcdDm));
        prevCum.put("empTrn",     sumInt(prev, TblPlacement::getPsEmpTrnDm));
        prevCum.put("cndOptHstd", sumInt(prev, TblPlacement::getPsTrnOptHstdDm));
        prevCum.put("cndOptSlfs", sumInt(prev, TblPlacement::getPsCndOptSlfsDm));
        prevCum.put("cndToBePlcd",sumInt(prev, TblPlacement::getPsCndToBeplcdDm));

        Map<String, Object> existing = null;
        if (cur.isPresent()) {
            TblPlacement pl = cur.get();
            existing = new LinkedHashMap<>();
            existing.put("nsqfCom",    intVal(pl.getNsqfComDm()));
            existing.put("nsqfExe",    intVal(pl.getNsqfExDm()));
            existing.put("nonNsqf",    intVal(pl.getNonNsqfDm()));
            existing.put("trnCert",    intVal(pl.getPsTrnCertDm()));
            existing.put("trnOptPlc",  intVal(pl.getPsTrnOptPlcDm()));
            existing.put("trnRegSmrk", intVal(pl.getPsTrnRegSmprkDm()));
            existing.put("cndPlcd",    intVal(pl.getPsCndPlcdDm()));
            existing.put("empTrn",     intVal(pl.getPsEmpTrnDm()));
            existing.put("cndOptHstd", intVal(pl.getPsTrnOptHstdDm()));
            existing.put("cndOptSlfs", intVal(pl.getPsCndOptSlfsDm()));
            existing.put("cndToBePlcd",intVal(pl.getPsCndToBeplcdDm()));
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("hasData", cur.isPresent());
        result.put("prevCum", prevCum);
        result.put("existing", existing);
        result.put("targets", Map.of());
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @PostMapping("/placement/save")
    public ResponseEntity<ApiResponse<String>> savePlacement(
            @RequestBody Map<String, Object> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuth(authHeader)) return unauthorized();
        String role  = getRole(authHeader);
        String instId = str(body, "instId");
        String month  = str(body, "month");
        String year   = str(body, "year");

        Optional<TblPlacement> existingOpt = plaRepo.findByInstIdAndMonthsAndYears(instId, month, year);
        if (existingOpt.isPresent() && !"SU".equals(role))
            return ResponseEntity.badRequest().body(ApiResponse.error("Data already submitted for this month"));

        int mo = Integer.parseInt(month);
        List<TblPlacement> prev = plaRepo.findByInstIdAndYears(instId, year).stream()
                .filter(r -> r.getMonths() != null && safeInt(r.getMonths()) < mo)
                .collect(Collectors.toList());

        TblPlacement pl = existingOpt.orElseGet(TblPlacement::new);
        pl.setInstId(instId); pl.setMonths(month); pl.setYears(year);
        pl.setYearMonths(year + "-" + month);

        int nsqfCom    = intVal(body.get("nsqfCom"));
        int nsqfExe    = intVal(body.get("nsqfExe"));
        int nonNsqf    = intVal(body.get("nonNsqf"));
        int trnCert    = intVal(body.get("trnCert"));
        int trnOptPlc  = intVal(body.get("trnOptPlc"));
        int trnRegSmrk = intVal(body.get("trnRegSmrk"));
        int cndPlcd    = intVal(body.get("cndPlcd"));
        int empTrn     = intVal(body.get("empTrn"));
        int cndOptHstd = intVal(body.get("cndOptHstd"));
        int cndOptSlfs = intVal(body.get("cndOptSlfs"));
        int cndToBePlcd= intVal(body.get("cndToBePlcd"));

        pl.setNsqfComDm(nsqfCom);    pl.setNsqfComCum( sumInt(prev, TblPlacement::getNsqfComDm)    + nsqfCom);
        pl.setNsqfExDm(nsqfExe);     pl.setNsqfExCum(  sumInt(prev, TblPlacement::getNsqfExDm)     + nsqfExe);
        pl.setNonNsqfDm(nonNsqf);    pl.setNonNsqfCum( sumInt(prev, TblPlacement::getNonNsqfDm)    + nonNsqf);
        pl.setPsTrnCertDm(trnCert);   pl.setPsTrnCertCum(sumInt(prev, TblPlacement::getPsTrnCertDm) + trnCert);
        pl.setPsTrnOptPlcDm(trnOptPlc); pl.setPsTrnOptPlcCum(sumInt(prev, TblPlacement::getPsTrnOptPlcDm) + trnOptPlc);
        pl.setPsTrnRegSmprkDm(trnRegSmrk); pl.setPsTrnRegSmprkCum(sumInt(prev, TblPlacement::getPsTrnRegSmprkDm) + trnRegSmrk);
        pl.setPsCndPlcdDm(cndPlcd);   pl.setPsCndPlcdCum(sumInt(prev, TblPlacement::getPsCndPlcdDm) + cndPlcd);
        pl.setPsEmpTrnDm(empTrn);     pl.setPsEmpTrnCum(sumInt(prev, TblPlacement::getPsEmpTrnDm)   + empTrn);
        pl.setPsTrnOptHstdDm(cndOptHstd); pl.setPsTrnOptHstdCum(sumInt(prev, TblPlacement::getPsTrnOptHstdDm) + cndOptHstd);
        pl.setPsCndOptSlfsDm(cndOptSlfs); pl.setPsCndOptSlfsCum(sumInt(prev, TblPlacement::getPsCndOptSlfsDm) + cndOptSlfs);
        pl.setPsCndToBeplcdDm(cndToBePlcd); pl.setPsCndToBeplcdCum(sumInt(prev, TblPlacement::getPsCndToBeplcdDm) + cndToBePlcd);

        plaRepo.save(pl);
        return ResponseEntity.ok(ApiResponse.ok("Saved successfully"));
    }

    // ── helpers ───────────────────────────────────────────────────────────────

    private boolean isAuth(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        return token != null && authService.getUserByToken(token).isPresent();
    }

    private String getRole(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        if (token == null) return "";
        return authService.getUserByToken(token)
                .map(u -> u.getRole() != null ? u.getRole() : "")
                .orElse("");
    }

    @SuppressWarnings("unchecked")
    private <T> ResponseEntity<ApiResponse<T>> unauthorized() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error("Authentication required"));
    }

    private static int safeInt(String s) {
        try { return Integer.parseInt(s.trim()); } catch (Exception e) { return 0; }
    }

    private static double bd(BigDecimal v) {
        return v != null ? v.doubleValue() : 0.0;
    }

    private static int intVal(Object o) {
        if (o == null) return 0;
        if (o instanceof Integer i) return i;
        if (o instanceof Number n) return n.intValue();
        try { return Integer.parseInt(o.toString().trim()); } catch (Exception e) { return 0; }
    }

    private static String str(Map<String, Object> m, String key) {
        Object v = m.get(key);
        return v != null ? v.toString().trim() : "";
    }

    private static BigDecimal dbd(Map<String, Object> m, String key) {
        Object v = m.get(key);
        if (v == null) return BigDecimal.ZERO;
        try { return new BigDecimal(v.toString().trim()); } catch (Exception e) { return BigDecimal.ZERO; }
    }

    private static <T> BigDecimal sumBD(List<T> list, Function<T, BigDecimal> getter) {
        return list.stream()
                .map(getter)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private static <T> int sumInt(List<T> list, Function<T, Integer> getter) {
        return list.stream()
                .map(getter)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();
    }

    private Map<String, Object> buildFinancialTargets(String instId, String year) {
        Map<String, Object> targets = new LinkedHashMap<>();
        targets.put("cashTotal",     0); targets.put("accrualTotal",  0);
        targets.put("revExpCash",    0); targets.put("revExpAccrual", 0);
        targets.put("perRecCash",    0); targets.put("perRecAccrual", 0);
        targets.put("cashTraining",  0); targets.put("cashTooling",   0);
        targets.put("cashOtherJob",  0); targets.put("cashConsult",   0);
        targets.put("cashMisc",      0); targets.put("accrualTraining",0);
        targets.put("accrualTooling",0); targets.put("accrualOtherJob",0);
        targets.put("accrualConsult",0); targets.put("accrualMisc",   0);

        targetRepo.findByInstIdAndYears(instId, year).ifPresent(t -> {
            targets.put("cashTotal",    t.getRevEarnCash() != null ? t.getRevEarnCash() : 0);
            targets.put("accrualTotal", t.getRevEarnAcc()  != null ? t.getRevEarnAcc()  : 0);
            targets.put("revExpCash",   t.getRevExpCash()  != null ? t.getRevExpCash()  : 0);
            targets.put("revExpAccrual",t.getRevExpAcc()   != null ? t.getRevExpAcc()   : 0);
            targets.put("perRecCash",   t.getPerRecCash()  != null ? t.getPerRecCash()  : 0);
            targets.put("perRecAccrual",t.getPerRecAcc()   != null ? t.getPerRecAcc()   : 0);
        });
        return targets;
    }
}
