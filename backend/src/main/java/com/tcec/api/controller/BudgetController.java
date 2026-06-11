package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.TblBudget;
import com.tcec.api.service.AuthService;
import com.tcec.api.service.BudgetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    private final BudgetService service;
    private final AuthService authService;

    public BudgetController(BudgetService service, AuthService authService) {
        this.service     = service;
        this.authService = authService;
    }

    /** GET /api/budget?instId=X&months=1&years=2024-2025 */
    @GetMapping
    public ResponseEntity<ApiResponse<TblBudget>> get(
            @RequestParam String instId,
            @RequestParam String months,
            @RequestParam String years,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        return service.find(instId, months, years)
                .map(b -> ResponseEntity.ok(ApiResponse.ok(b)))
                .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok("No existing record", null)));
    }

    /** POST /api/budget */
    @PostMapping
    public ResponseEntity<ApiResponse<TblBudget>> save(
            @RequestBody TblBudget data,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        TblBudget saved = service.save(data);
        return ResponseEntity.ok(ApiResponse.ok("Saved successfully", saved));
    }

    private boolean isAuthenticated(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        return token != null && authService.getUserByToken(token).isPresent();
    }
}
