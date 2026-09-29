package com.tcec.api.config;

import com.tcec.api.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Locale;

/**
 * Decides which application (and so which database) a request belongs to:
 * <ol>
 *   <li>a signed-in request uses the application its session was opened in — a token from one
 *       application never reaches another application's data;</li>
 *   <li>otherwise (login, public calls) the {@code X-App} header chosen on the landing page;</li>
 *   <li>otherwise the default application.</li>
 * </ol>
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10)
public class AppContextFilter extends OncePerRequestFilter {

    public static final String HEADER = "X-App";

    private final AuthService authService;
    private final AppDataSourceConfig apps;

    public AppContextFilter(AuthService authService, AppDataSourceConfig apps) {
        this.authService = authService;
        this.apps = apps;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String app = authService.appForToken(AuthService.extractToken(req.getHeader("Authorization")));
        if (app == null) {
            String requested = req.getHeader(HEADER);
            app = requested == null || requested.isBlank()
                    ? AppContext.DEFAULT_APP
                    : requested.trim().toLowerCase(Locale.ROOT);
        }
        if (!apps.configuredApps().contains(app) && !"OPTIONS".equalsIgnoreCase(req.getMethod())
                && !req.getRequestURI().endsWith("/api/apps")) {
            res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
            res.setContentType("application/json;charset=UTF-8");
            res.getWriter().write("{\"success\":false,\"message\":\"This application is not available yet.\"}");
            return;
        }
        AppContext.set(app);
        try {
            chain.doFilter(req, res);
        } finally {
            AppContext.clear();
        }
    }
}
