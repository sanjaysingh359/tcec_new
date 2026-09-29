package com.tcec.api.controller;

import com.tcec.api.config.AppDataSourceConfig;
import com.tcec.api.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/** GET /api/apps — which MPR applications this server hosts and whether their database is reachable. */
@RestController
@RequestMapping("/api/apps")
public class AppController {

    private final AppDataSourceConfig apps;

    public AppController(AppDataSourceConfig apps) {
        this.apps = apps;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> list() {
        Map<String, Boolean> result = new LinkedHashMap<>();
        for (String app : apps.configuredApps()) result.put(app, apps.isAvailable(app));
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
