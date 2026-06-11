package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.TblPhysical;
import com.tcec.api.service.AuthService;
import com.tcec.api.service.PhysicalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/physical")
public class PhysicalController {

    private final PhysicalService service;
    private final AuthService authService;

    public PhysicalController(PhysicalService service, AuthService authService) {
        this.service     = service;
        this.authService = authService;
    }

    /** GET /api/physical?instId=X&months=1&years=2024-2025 */
    @GetMapping
    public ResponseEntity<ApiResponse<TblPhysical>> get(
            @RequestParam String instId,
            @RequestParam String months,
            @RequestParam String years,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        return service.find(instId, months, years)
                .map(p -> ResponseEntity.ok(ApiResponse.ok(p)))
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok("No existing record", null)));
    }

    /** POST /api/physical */
    @PostMapping
    public ResponseEntity<ApiResponse<TblPhysical>> save(
            @RequestBody TblPhysical data,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        TblPhysical saved = service.save(data);
        return ResponseEntity.ok(ApiResponse.ok("Saved successfully", saved));
    }

    private boolean isAuthenticated(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        return token != null && authService.getUserByToken(token).isPresent();
    }
}
