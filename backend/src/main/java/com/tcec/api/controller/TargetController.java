package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.TblTrngExpTarget;
import com.tcec.api.repository.TrngExpTargetRepository;
import com.tcec.api.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/target")
public class TargetController {

    private final TrngExpTargetRepository repo;
    private final AuthService authService;

    public TargetController(TrngExpTargetRepository repo, AuthService authService) {
        this.repo = repo;
        this.authService = authService;
    }

    private boolean isAuth(String auth) {
        String token = AuthService.extractToken(auth);
        return token != null && authService.getUserByToken(token).isPresent();
    }

    /** GET /api/target/load?instId=X&year=Y */
    @GetMapping("/load")
    public ResponseEntity<ApiResponse<Map<String, Object>>> load(
            @RequestParam String instId,
            @RequestParam String year,
            @RequestHeader("Authorization") String auth) {

        if (!isAuth(auth)) return ResponseEntity.status(401)
                .body(ApiResponse.error("Unauthorized"));

        Map<String, Object> result = new HashMap<>();
        Optional<TblTrngExpTarget> opt = repo.findByInstIdAndYears(instId, year);

        if (opt.isPresent()) {
            TblTrngExpTarget t = opt.get();
            result.put("hasData", true);
            result.put("revEarnCash",  t.getRevEarnCash());
            result.put("revEarnAcc",   t.getRevEarnAcc());
            result.put("revExpCash",   t.getRevExpCash());
            result.put("revExpAcc",    t.getRevExpAcc());
            result.put("taTarget",     t.getTaTarget());
            result.put("njuTarget",    t.getNjuTarget());
            result.put("beBudget",     t.getBeBudget());
        } else {
            result.put("hasData", false);
        }

        return ResponseEntity.ok(ApiResponse.ok("OK", result));
    }

    /** POST /api/target/save */
    @PostMapping("/save")
    public ResponseEntity<ApiResponse<Void>> save(
            @RequestBody Map<String, Object> body,
            @RequestHeader("Authorization") String auth) {

        if (!isAuth(auth)) return ResponseEntity.status(401)
                .body(ApiResponse.error("Unauthorized"));

        String instId = (String) body.get("instId");
        String year   = (String) body.get("year");
        if (instId == null || year == null)
            return ResponseEntity.badRequest().body(ApiResponse.error("instId and year required"));

        TblTrngExpTarget t = repo.findByInstIdAndYears(instId, year)
                .orElseGet(() -> { TblTrngExpTarget e = new TblTrngExpTarget(); e.setInstId(instId); e.setYears(year); return e; });

        t.setRevEarnCash(intVal(body.get("revEarnCash")));
        t.setRevEarnAcc(intVal(body.get("revEarnAcc")));
        t.setRevExpCash(intVal(body.get("revExpCash")));
        t.setRevExpAcc(intVal(body.get("revExpAcc")));
        t.setIncExpCash(intVal(body.get("revEarnCash")) - intVal(body.get("revExpCash")));
        t.setIncExpAcc(intVal(body.get("revEarnAcc")) - intVal(body.get("revExpAcc")));
        int reCash = intVal(body.get("revExpCash"));
        int reCaAcc = intVal(body.get("revExpAcc"));
        t.setPerRecCash(reCash > 0 ? (intVal(body.get("revEarnCash")) * 100 / reCash) : 0);
        t.setPerRecAcc(reCaAcc > 0 ? (intVal(body.get("revEarnAcc")) * 100 / reCaAcc) : 0);
        t.setTaTarget(intVal(body.get("taTarget")));
        t.setNjuTarget(intVal(body.get("njuTarget")));
        t.setBeBudget(intVal(body.get("beBudget")));

        repo.save(t);
        return ResponseEntity.ok(ApiResponse.ok("Target saved successfully", null));
    }

    private int intVal(Object v) {
        if (v == null) return 0;
        try { return Integer.parseInt(v.toString()); } catch (Exception e) { return 0; }
    }
}
