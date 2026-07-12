package com.tcec.api.dto;

/**
 * One row in the Age-wise Trainees Trained report.
 *
 * DB column → JSON key mapping:
 *   limit1 / limit1_cum → age1520  / age1520C   (Age 15-20)
 *   limit2 / limit2_cum → age2125  / age2125C   (Age 21-25)
 *   limit3 / limit3_cum → age2630  / age2630C   (Age 26-30)
 *   limit4 / limit4_cum → age3140  / age3140C   (Age 31-40)
 *   above  / abovec     → above40  / above40C   (Above 40)
 */
public record AgeReportRow(
        String  userId,
        int     target,
        int     age1520,
        int     age2125,
        int     age2630,
        int     age3140,
        int     above40,
        int     age1520C,
        int     age2125C,
        int     age2630C,
        int     age3140C,
        int     above40C,
        boolean noData
) {}
