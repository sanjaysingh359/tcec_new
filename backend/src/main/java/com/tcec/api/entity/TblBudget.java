package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_budget")
@IdClass(MonthYearInstId.class)
@Getter @Setter @NoArgsConstructor
public class TblBudget {

    @Id
    @Column(name = "inst_id", length = 50)
    private String instId;

    @Id
    @Column(name = "months", length = 50)
    private String months;

    @Id
    @Column(name = "years", length = 125)
    private String years;

    @Column(name = "months_year", length = 625)
    private String monthsYear;

    // ── Carry Forward ───────────────────────────────────────────────────────
    @Column(name = "cry_fwd_amt",      precision = 15, scale = 2) private BigDecimal cryFwdAmt;
    @Column(name = "cry_fwd_util_dm",  precision = 15, scale = 2) private BigDecimal cryFwdUtilDm;
    @Column(name = "cry_fwd_util_cum", precision = 15, scale = 2) private BigDecimal cryFwdUtilCum;
    @Column(name = "cry_fwd_util_bal", precision = 15, scale = 2) private BigDecimal cryFwdUtilBal;

    // ── GIA ─────────────────────────────────────────────────────────────────
    @Column(name = "gia_amt",      precision = 15, scale = 2) private BigDecimal giaAmt;
    @Column(name = "gia_util_dm",  precision = 15, scale = 2) private BigDecimal giaUtilDm;
    @Column(name = "gia_util_cum", precision = 15, scale = 2) private BigDecimal giaUtilCum;
    @Column(name = "gia_util_bal", precision = 15, scale = 2) private BigDecimal giaUtilBal;

    // ── Staff Strength ──────────────────────────────────────────────────────
    @Column(name = "stf_st_ss_a") private Integer stfStSsA;
    @Column(name = "stf_st_ss_b") private Integer stfStSsB;
    @Column(name = "stf_st_ss_c") private Integer stfStSsC;
    @Column(name = "stf_st_ss_d") private Integer stfStSsD;

    @Column(name = "stf_st_pos_a") private Integer stfStPosA;
    @Column(name = "stf_st_pos_b") private Integer stfStPosB;
    @Column(name = "stf_st_pos_c") private Integer stfStPosC;
    @Column(name = "stf_st_pos_d") private Integer stfStPosD;

    // ── Budget Total ────────────────────────────────────────────────────────
    @Column(name = "budget_total_amt",      precision = 15, scale = 2) private BigDecimal budgetTotalAmt;
    @Column(name = "budget_total_util_dm",  precision = 15, scale = 2) private BigDecimal budgetTotalUtilDm;
    @Column(name = "budget_total_util_cum", precision = 15, scale = 2) private BigDecimal budgetTotalUtilCum;
    @Column(name = "budget_total_util_bal", precision = 15, scale = 2) private BigDecimal budgetTotalUtilBal;

    // ── Machine ─────────────────────────────────────────────────────────────
    @Column(name = "machine_dtm", precision = 15, scale = 2) private BigDecimal machineDtm;
    @Column(name = "machine_cum", precision = 15, scale = 2) private BigDecimal machineCum;

    // ── Text fields ─────────────────────────────────────────────────────────
    @Column(name = "details_visit")  private String detailsVisit;
    @Column(name = "significant")    private String significant;
    @Column(name = "shorts_fall")    private String shortsFall;
    @Column(name = "sisi_nm")        private String sisiNm;
    @Column(name = "newtext")        private String newtext;
}
