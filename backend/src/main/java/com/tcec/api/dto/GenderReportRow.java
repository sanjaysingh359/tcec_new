package com.tcec.api.dto;

/**
 * One row in the Gender-wise Trainees Trained report.
 * Matches what GenderWiseReport.jsx expects.
 *
 * Source columns (tbl_physical):
 *   dtmMen   = men
 *   dtmWomen = ttb_dtm_women
 *   dtmTrans = transgender
 *   cumMen   = men_cum
 *   cumWomen = ttb_cum_women
 *   cumTrans = transgender_cum
 */
public record GenderReportRow(
        String  userId,
        int     target,
        int     dtmMen,
        int     dtmWomen,
        int     dtmTrans,
        int     cumMen,
        int     cumWomen,
        int     cumTrans,
        boolean noData
) {}
