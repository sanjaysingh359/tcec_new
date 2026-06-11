package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.TblDiInstitute;
import com.tcec.api.service.InstituteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutes")
public class InstituteController {

    private final InstituteService service;

    public InstituteController(InstituteService service) {
        this.service = service;
    }

    /** GET /api/institutes — list all institutes */
    @GetMapping
    public ResponseEntity<ApiResponse<List<TblDiInstitute>>> list() {
        return ResponseEntity.ok(ApiResponse.ok(service.findAll()));
    }

    /** GET /api/institutes/{instId} — single institute */
    @GetMapping("/{instId}")
    public ResponseEntity<ApiResponse<TblDiInstitute>> get(@PathVariable String instId) {
        return service.findByInstId(instId)
                .map(i -> ResponseEntity.ok(ApiResponse.ok(i)))
                .orElseGet(() -> ResponseEntity.notFound().<ApiResponse<TblDiInstitute>>build());
    }
}
