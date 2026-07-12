package com.tcec.api.dto;

public record DataStatusRow(
        String month,
        String label,
        boolean fin,
        boolean bud,
        boolean phy,
        boolean pla) {}
