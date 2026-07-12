package com.tcec.api.dto;

/**
 * One row in the graphical chart response — represents one fiscal month.
 * Values match what the old JSP chart displayed:
 *   revenue/recExpdt/surplus  = Rs in lakhs (from tbl_financial)
 *   trainees/unitAssisted     = counts       (from tbl_physical)
 */
public record GraphicalChartRow(
        int    month,           // fiscal month 1=April … 12=March

        double revenue,         // rev_ear_cash_total_dtm
        double recExpdt,        // rev_exp_cash_dtm
        double surplus,         // inc_exp_cash_dtm
        int    trainees,        // ttb_dtm_total
        int    unitAssisted,    // nju_msme_no_dtm + nju_other_no_dtm

        double revenueCum,      // rev_ear_cash_total_cum
        double recExpdtCum,     // rev_exp_cash_cum
        double surplusCum,      // inc_exp_cash_cum
        int    traineesCum,     // ttb_cum_total
        int    unitAssistedCum  // nju_msme_no_cum + nju_other_no_cum
) {}
