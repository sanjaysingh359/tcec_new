package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.TblFinancial;
import com.tcec.api.service.AuthService;
import com.tcec.api.service.FinancialService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/financial")
public class FinancialController {

    private final FinancialService service;
    private final AuthService authService;

    public FinancialController(FinancialService service, AuthService authService) {
        this.service     = service;
        this.authService = authService;
    }

    /** GET /api/financial?instId=X&months=1&years=2024-2025 */
    @GetMapping
    public ResponseEntity<ApiResponse<TblFinancial>> get(
            @RequestParam String instId,
            @RequestParam String months,
            @RequestParam String years,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        return service.find(instId, months, years)
                .map(f -> ResponseEntity.ok(ApiResponse.ok(f)))
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok("No existing record", null)));
    }

    /** POST /api/financial */
    @PostMapping
    public ResponseEntity<ApiResponse<TblFinancial>> save(
            @RequestBody TblFinancial data,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletRequest request) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        TblFinancial saved = service.save(data, getClientIp(request));
        return ResponseEntity.ok(ApiResponse.ok("Saved successfully", saved));
    }

    private boolean isAuthenticated(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        return token != null && authService.getUserByToken(token).isPresent();
    }

    private String getClientIp(HttpServletRequest req) {
        String xfwd = req.getHeader("X-Forwarded-For");
        if (xfwd != null && !xfwd.isBlank()) return xfwd.split(",")[0].trim();
        return req.getRemoteAddr();
    }
}
