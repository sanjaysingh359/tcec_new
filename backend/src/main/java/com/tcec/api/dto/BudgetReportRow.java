package com.tcec.api.dto;

public record BudgetReportRow(
        String  userId,
        double  cryAmt,
        double  cryUtlDm,
        double  cryUtlCum,
        double  cryBal,
        double  giaAmt,
        double  giaUtlDm,
        double  giaUtlCum,
        double  giaBal,
        boolean noData
) {}
