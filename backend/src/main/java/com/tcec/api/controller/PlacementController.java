package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.TblPlacement;
import com.tcec.api.service.AuthService;
import com.tcec.api.service.PlacementService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/placement")
public class PlacementController {

    private final PlacementService service;
    private final AuthService authService;

    public PlacementController(PlacementService service, AuthService authService) {
        this.service    = service;
        this.authService = authService;
    }

    /**
     * GET /api/placement?instId=X&months=1&years=2024-2025
     * Returns existing record or empty object.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<TblPlacement>> get(
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

    /**
     * POST /api/placement
     * Insert or update placement data.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<TblPlacement>> save(
            @RequestBody TblPlacement data,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletRequest request) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        String clientIp = getClientIp(request);
        TblPlacement saved = service.save(data, clientIp);
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
