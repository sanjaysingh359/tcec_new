package com.tcec.api.dto;

public record LoginResponse(
        String userId,
        String role,
        String token
) {}
