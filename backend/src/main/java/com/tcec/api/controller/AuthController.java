package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.dto.LoginRequest;
import com.tcec.api.dto.LoginResponse;
import com.tcec.api.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** POST /api/auth/login */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest req) {

        Optional<LoginResponse> result = authService.login(req);
        if (result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid username or password"));
        }
        return ResponseEntity.ok(ApiResponse.ok("Login successful", result.get()));
    }

    /** POST /api/auth/logout */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token != null) authService.logout(token);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    /** POST /api/auth/change-password  — body: { currentPassword, newPassword } */
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @RequestBody Map<String, String> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletRequest request) {

        String token = AuthService.extractToken(authHeader);
        if (token == null || authService.getUserByToken(token).isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Not authenticated"));

        String error = authService.changePassword(token,
                body.get("currentPassword"), body.get("newPassword"), request.getRemoteAddr());
        if (error != null)
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        return ResponseEntity.ok(ApiResponse.ok("Password changed successfully", null));
    }

    /** GET /api/auth/me  — check who is logged in */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<LoginResponse>> me(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        String token = AuthService.extractToken(authHeader);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Not authenticated"));
        }
        return authService.getUserByToken(token)
                .map(u -> ResponseEntity.ok(ApiResponse.<LoginResponse>ok(
                        new LoginResponse(u.getUserId().trim(),
                                          u.getRole() == null ? "" : u.getRole().trim(),
                                          token))))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Session expired")));
    }
}
