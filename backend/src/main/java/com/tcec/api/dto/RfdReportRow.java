package com.tcec.api.dto;

public record RfdReportRow(
        String userId,
        double tooling,
        double jobWork,
        double revTraining,
        int women,
        int sc,
        int st,
        int longTerm,
        int shortTerm,
        int ph,
        boolean noData) {}
