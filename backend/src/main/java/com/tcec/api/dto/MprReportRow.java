package com.tcec.api.dto;

/**
 * One row in the MPR-AB report.
 * Each month field is "OK" if a financial record exists, else "NOT".
 * Month order = fiscal year: Apr(1)…Mar(12)
 */
public record MprReportRow(
        String userId,
        String apr, String may, String jun,
        String jul, String aug, String sep,
        String oct, String nov, String dec,
        String jan, String feb, String mar
) {}
