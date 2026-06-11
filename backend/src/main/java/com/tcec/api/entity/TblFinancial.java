package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_financial")
@DynamicInsert
@DynamicUpdate
@Getter @Setter @NoArgsConstructor
public class TblFinancial {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "financial_seq")
    @SequenceGenerator(name = "financial_seq", sequenceName = "tbl_financial_sno_seq", allocationSize = 1)
    @Column(name = "sno")
    private Integer sno;

    @Column(name = "inst_id",     length = 50)  private String instId;
    @Column(name = "months",      length = 50)  private String months;
    @Column(name = "years",       length = 125) private String years;
    @Column(name = "months_year", length = 625) private String monthsYear;

    // ── Revenue Earnings (Cash) ─────────────────────────────────────────────
    @Column(name = "rev_ear_cash_trng_target",    precision=15,scale=2) private BigDecimal revEarCashTrngTarget;
    @Column(name = "rev_ear_cash_trng_dtm",       precision=15,scale=2) private BigDecimal revEarCashTrngDtm;
    @Column(name = "rev_ear_cash_trng_cum",       precision=15,scale=2) private BigDecimal revEarCashTrngCum;
    @Column(name = "rev_ear_cash_prdtn_target")   private Integer revEarCashPrdtnTarget;
    @Column(name = "rev_ear_cash_prdtn_dtm",      precision=15,scale=2) private BigDecimal revEarCashPrdtnDtm;
    @Column(name = "rev_ear_cash_prdtn_cum",      precision=15,scale=2) private BigDecimal revEarCashPrdtnCum;
    @Column(name = "rev_ear_cash_misc_target")    private Integer revEarCashMiscTarget;
    @Column(name = "rev_ear_cash_misc_dtm",       precision=15,scale=2) private BigDecimal revEarCashMiscDtm;
    @Column(name = "rev_ear_cash_misc_cum",       precision=15,scale=2) private BigDecimal revEarCashMiscCum;
    @Column(name = "rev_ear_cash_total_target")   private Integer revEarCashTotalTarget;
    @Column(name = "rev_ear_cash_total_dtm",      precision=15,scale=2) private BigDecimal revEarCashTotalDtm;
    @Column(name = "rev_ear_cash_total_cum",      precision=15,scale=2) private BigDecimal revEarCashTotalCum;

    // ── Revenue Earnings (Accrual) ───────────────────────────────────────────
    @Column(name = "rev_ear_accrual_trng_target",    precision=15,scale=2) private BigDecimal revEarAccrualTrngTarget;
    @Column(name = "rev_ear_accrual_trng_dtm",       precision=15,scale=2) private BigDecimal revEarAccrualTrngDtm;
    @Column(name = "rev_ear_accrual_trng_cum",       precision=15,scale=2) private BigDecimal revEarAccrualTrngCum;
    @Column(name = "rev_ear_accrual_prdtn_target")   private Integer revEarAccrualPrdtnTarget;
    @Column(name = "rev_ear_accrual_prdtn_dtm",      precision=15,scale=2) private BigDecimal revEarAccrualPrdtnDtm;
    @Column(name = "rev_ear_accrual_prdtn_cum",      precision=15,scale=2) private BigDecimal revEarAccrualPrdtnCum;
    @Column(name = "rev_ear_accrual_misc_target",    precision=15,scale=2) private BigDecimal revEarAccrualMiscTarget;
    @Column(name = "rev_ear_accrual_misc_dtm",       precision=15,scale=2) private BigDecimal revEarAccrualMiscDtm;
    @Column(name = "rev_ear_accrual_misc_cum",       precision=15,scale=2) private BigDecimal revEarAccrualMiscCum;
    @Column(name = "rev_ear_accrual_total_target",   precision=15,scale=2) private BigDecimal revEarAccrualTotalTarget;
    @Column(name = "rev_ear_accrual_total_dtm",      precision=15,scale=2) private BigDecimal revEarAccrualTotalDtm;
    @Column(name = "rev_ear_accrual_total_cum",      precision=15,scale=2) private BigDecimal revEarAccrualTotalCum;

    // ── Revenue Expenditure ──────────────────────────────────────────────────
    @Column(name = "rev_exp_cash_target",    precision=15,scale=2) private BigDecimal revExpCashTarget;
    @Column(name = "rev_exp_cash_dtm",       precision=15,scale=2) private BigDecimal revExpCashDtm;
    @Column(name = "rev_exp_cash_cum",       precision=15,scale=2) private BigDecimal revExpCashCum;
    @Column(name = "rev_exp_accrual_target") private Integer revExpAccrualTarget;
    @Column(name = "rev_exp_accrual_dtm",    precision=15,scale=2) private BigDecimal revExpAccrualDtm;
    @Column(name = "rev_exp_accrual_cum",    precision=15,scale=2) private BigDecimal revExpAccrualCum;

    // ── Income vs Expenditure ────────────────────────────────────────────────
    @Column(name = "inc_exp_cash_target",    precision=15,scale=2) private BigDecimal incExpCashTarget;
    @Column(name = "inc_exp_cash_dtm",       precision=15,scale=2) private BigDecimal incExpCashDtm;
    @Column(name = "inc_exp_cash_cum",       precision=15,scale=2) private BigDecimal incExpCashCum;
    @Column(name = "inc_exp_accrual_target", precision=15,scale=2) private BigDecimal incExpAccrualTarget;
    @Column(name = "inc_exp_accrual_dtm",    precision=15,scale=2) private BigDecimal incExpAccrualDtm;
    @Column(name = "inc_exp_accrual_cum",    precision=15,scale=2) private BigDecimal incExpAccrualCum;

    // ── Percentage Recovery ──────────────────────────────────────────────────
    @Column(name = "per_rec_cash_target",    precision=15,scale=2) private BigDecimal perRecCashTarget;
    @Column(name = "per_rec_cash_dtm",       precision=15,scale=2) private BigDecimal perRecCashDtm;
    @Column(name = "per_rec_cash_cum",       precision=15,scale=2) private BigDecimal perRecCashCum;
    @Column(name = "per_rec_accrual_target", precision=15,scale=2) private BigDecimal perRecAccrualTarget;
    @Column(name = "per_rec_accrual_dtm",    precision=15,scale=2) private BigDecimal perRecAccrualDtm;
    @Column(name = "per_rec_accrual_cum",    precision=15,scale=2) private BigDecimal perRecAccrualCum;

    // ── Testing/Calibration Services (Cash) ──────────────────────────────────
    @Column(name = "test_cal_services_target") private Integer testCalServicesTarget;
    @Column(name = "test_cal_services_dtm",    precision=15,scale=2) private BigDecimal testCalServicesDtm;
    @Column(name = "test_cal_services_mon",    precision=15,scale=2) private BigDecimal testCalServicesMon;
    @Column(name = "test_cal_services_acc_target") private Integer testCalServicesAccTarget;
    @Column(name = "test_cal_services_acc_dtm",    precision=15,scale=2) private BigDecimal testCalServicesAccDtm;
    @Column(name = "test_cal_services_acc_mon",    precision=15,scale=2) private BigDecimal testCalServicesAccMon;

    // ── Consultancy (Cash/Accrual) ────────────────────────────────────────────
    @Column(name = "rev_ear_csh_bas_consult_target",  precision=15,scale=2) private BigDecimal revEarCshBasConsultTarget;
    @Column(name = "rev_ear_csh_bas_consult_dtm",     precision=15,scale=2) private BigDecimal revEarCshBasConsultDtm;
    @Column(name = "rev_ear_csh_bas_consult_cum",     precision=15,scale=2) private BigDecimal revEarCshBasConsultCum;
    @Column(name = "rev_ear_accl_bas_consult_target", precision=15,scale=2) private BigDecimal revEarAcclBasConsultTarget;
    @Column(name = "rev_ear_accl_bas_consult_dtm",    precision=15,scale=2) private BigDecimal revEarAcclBasConsultDtm;
    @Column(name = "rev_ear_accl_bas_consult_cum",    precision=15,scale=2) private BigDecimal revEarAcclBasConsultCum;

    // ── Production - Tooling ─────────────────────────────────────────────────
    @Column(name = "rev_ear_cash_prdtn_tooling_target")    private Integer revEarCashPrdtnToolingTarget;
    @Column(name = "rev_ear_cash_prdtn_tooling_dtm",       precision=15,scale=2) private BigDecimal revEarCashPrdtnToolingDtm;
    @Column(name = "rev_ear_cash_prdtn_tooling_cum",       precision=15,scale=2) private BigDecimal revEarCashPrdtnToolingCum;
    @Column(name = "rev_ear_cash_prdtn_otherjob_target")   private Integer revEarCashPrdtnOtherjobTarget;
    @Column(name = "rev_ear_cash_prdtn_otherjob_dtm",      precision=15,scale=2) private BigDecimal revEarCashPrdtnOtherjobDtm;
    @Column(name = "rev_ear_cash_prdtn_otherjob_cum",      precision=15,scale=2) private BigDecimal revEarCashPrdtnOtherjobCum;
    @Column(name = "rev_ear_accrual_prdtn_tooling_target") private Integer revEarAccrualPrdtnToolingTarget;
    @Column(name = "rev_ear_accrual_prdtn_tooling_dtm",    precision=15,scale=2) private BigDecimal revEarAccrualPrdtnToolingDtm;
    @Column(name = "rev_ear_accrual_prdtn_tooling_cum",    precision=15,scale=2) private BigDecimal revEarAccrualPrdtnToolingCum;
    @Column(name = "rev_ear_accrual_prdtn_otherjob_target") private Integer revEarAccrualPrdtnOtherjobTarget;
    @Column(name = "rev_ear_accrual_prdtn_otherjob_dtm",   precision=15,scale=2) private BigDecimal revEarAccrualPrdtnOtherjobDtm;
    @Column(name = "rev_ear_accrual_prdtn_otherjob_cum",   precision=15,scale=2) private BigDecimal revEarAccrualPrdtnOtherjobCum;

    // ── Audit ────────────────────────────────────────────────────────────────
    @Column(name = "sisi_nm", length = 500) private String sisiNm;
}
