package com.tcec.api.dto;

/**
 * One row in the Performance Analysis report.
 *
 * Targets come from tbl_trng_exp_target (annual, no month).
 * Actuals are cumulative-up-to-month from tbl_financial / tbl_physical.
 *
 *   revT  / revA  = Revenue target / actual (Rs. lakh)
 *   expT  / expA  = Rec. Expenditure target / actual
 *   surpT / surpA = Surplus (revT-expT / revA-expA)
 *   trainT/ trainA= Trainees target / actual
 *   unitT / unitA = Units Assisted target / actual
 */
public record AnalysisReportRow(
        String userId,
        double revT,   double revA,
        double expT,   double expA,
        double surpT,  double surpA,
        int    trainT, int    trainA,
        int    unitT,  int    unitA,
        boolean noData
) {}
