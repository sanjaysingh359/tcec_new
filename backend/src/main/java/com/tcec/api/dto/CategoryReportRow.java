package com.tcec.api.dto;

/**
 * One row in the Category-wise Trainees Trained report.
 * Matches what CategoryWiseReport.jsx expects.
 *
 * GEN = total trainees − (SC + ST + OBC + MIN)
 */
public record CategoryReportRow(
        String  userId,   // institute name shown in the table
        int     target,   // annual ta_target from tbl_trng_exp_target
        int     dtmGen,
        int     dtmSC,
        int     dtmST,
        int     dtmOBC,
        int     dtmMin,
        int     cumGen,
        int     cumSC,
        int     cumST,
        int     cumOBC,
        int     cumMin,
        boolean noData    // true when no tbl_physical row exists for this month
) {}
