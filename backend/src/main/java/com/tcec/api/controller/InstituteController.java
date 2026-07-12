package com.tcec.api.controller;

import com.tcec.api.dto.ApiResponse;
import com.tcec.api.entity.TlInstitute;
import com.tcec.api.entity.UserIdMapping;
import com.tcec.api.repository.TlInstituteRepository;
import com.tcec.api.repository.UserIdMappingRepository;
import com.tcec.api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutes")
public class InstituteController {

    private final TlInstituteRepository instRepo;
    private final UserIdMappingRepository mappingRepo;
    private final AuthService authService;

    public InstituteController(TlInstituteRepository instRepo,
                               UserIdMappingRepository mappingRepo,
                               AuthService authService) {
        this.instRepo    = instRepo;
        this.mappingRepo = mappingRepo;
        this.authService = authService;
    }

    /**
     * GET /api/institutes
     * Returns all institutes from tl_institute (ordered by name).
     * Public — no auth required.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<TlInstitute>>> list() {
        return ResponseEntity.ok(ApiResponse.ok(instRepo.findAllOrdered()));
    }

    /**
     * GET /api/institutes/active
     * Returns only institutes that have at least one IU user mapped to them.
     * Used for the SU institute-selection dropdown.
     */
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<TlInstitute>>> active() {
        // Get all inst_ids from real TCEC institute users (userId starts with 'TCEC-')
        List<String> mappedIds = mappingRepo.findRealInstituteUsers().stream()
                .map(m -> m.getInstId())
                .filter(id -> id != null && !id.isBlank())
                .distinct()
                .sorted()
                .toList();

        // Fetch TlInstitute records for those IDs, preserve name order
        List<TlInstitute> result = mappedIds.stream()
                .map(instRepo::findByInstId)
                .filter(opt -> opt.isPresent())
                .map(opt -> opt.get())
                .sorted((a, b) -> a.getInstName().compareToIgnoreCase(b.getInstName()))
                .toList();

        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /**
     * GET /api/institutes/{instId}
     */
    @GetMapping("/{instId}")
    public ResponseEntity<ApiResponse<TlInstitute>> get(@PathVariable String instId) {
        return instRepo.findByInstId(instId)
                .map(i -> ResponseEntity.ok(ApiResponse.ok(i)))
                .orElseGet(() -> ResponseEntity.notFound()
                        .<ApiResponse<TlInstitute>>build());
    }

    /**
     * GET /api/institutes/mapping/{userId}
     * Returns the inst_id for a given login user (from user_id_mapping).
     * Used by DashboardPage to auto-resolve IU user's institute.
     */
    @GetMapping("/mapping/{userId}")
    public ResponseEntity<ApiResponse<UserIdMapping>> mapping(
            @PathVariable String userId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Authentication required"));
        }

        return mappingRepo.findByUserIdTrimmed(userId)
                .map(m -> ResponseEntity.ok(ApiResponse.ok(m)))
                .orElseGet(() -> ResponseEntity.ok(
                        ApiResponse.error("No mapping found for user: " + userId)));
    }

    private boolean isAuthenticated(String authHeader) {
        String token = AuthService.extractToken(authHeader);
        return token != null && authService.getUserByToken(token).isPresent();
    }
}
