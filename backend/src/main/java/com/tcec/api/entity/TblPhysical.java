package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_physical")
@IdClass(MonthYearInstId.class)
@Getter @Setter @NoArgsConstructor
public class TblPhysical {

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

    // ── NJU MSME ────────────────────────────────────────────────────────────
    @Column(name = "nju_msme_no_target")    private Integer njuMsmeNoTarget;
    @Column(name = "nju_msme_no_dtm")       private Integer njuMsmeNoDtm;
    @Column(name = "nju_msme_no_cum")       private Integer njuMsmeNoCum;
    @Column(name = "nju_msme_value_target") private Integer njuMsmeValueTarget;
    @Column(name = "nju_msme_value_dtm",    precision=15,scale=2) private BigDecimal njuMsmeValueDtm;
    @Column(name = "nju_msme_value_cum",    precision=15,scale=2) private BigDecimal njuMsmeValueCum;

    // ── NJU Other ───────────────────────────────────────────────────────────
    @Column(name = "nju_other_no_target")    private Integer njuOtherNoTarget;
    @Column(name = "nju_other_no_dtm")       private Integer njuOtherNoDtm;
    @Column(name = "nju_other_no_cum")       private Integer njuOtherNoCum;
    @Column(name = "nju_other_value_target") private Integer njuOtherValueTarget;
    @Column(name = "nju_other_value_dtm",    precision=15,scale=2) private BigDecimal njuOtherValueDtm;
    @Column(name = "nju_other_value_cum",    precision=15,scale=2) private BigDecimal njuOtherValueCum;

    // ── Consultancy ──────────────────────────────────────────────────────────
    @Column(name = "conslt_msme_target") private Integer consltMsmeTarget;
    @Column(name = "conslt_msme_dtm")    private Integer consltMsmeDtm;
    @Column(name = "conslt_msme_cum")    private Integer consltMsmeCum;
    @Column(name = "conslt_other_target") private Integer consltOtherTarget;
    @Column(name = "conslt_other_dtm",   precision=15,scale=2) private BigDecimal consltOtherDtm;
    @Column(name = "conslt_other_cum")   private Integer consltOtherCum;

    // ── Any Other ────────────────────────────────────────────────────────────
    @Column(name = "any_other_target") private Integer anyOtherTarget;
    @Column(name = "any_other_dtm",    precision=15,scale=2) private BigDecimal anyOtherDtm;
    @Column(name = "any_other_cum")    private Integer anyOtherCum;

    // ── Training Activities ─────────────────────────────────────────────────
    @Column(name = "ta_ltc_target")     private Integer taLtcTarget;
    @Column(name = "ta_ltc_dtm")        private Integer taLtcDtm;
    @Column(name = "ta_ltc_cum")        private Integer taLtcCum;
    @Column(name = "ta_stc_ncc_target") private Integer taStcNccTarget;
    @Column(name = "ta_stc_ncc_dtm")    private Integer taStcNccDtm;
    @Column(name = "ta_stc_ncc_cum")    private Integer taStcNccCum;
    @Column(name = "ta_stc_ntt_target") private Integer taStcNttTarget;
    @Column(name = "ta_stc_ntt_dtm")    private Integer taStcNttDtm;
    @Column(name = "ta_stc_ntt_cum")    private Integer taStcNttCum;
    @Column(name = "ta_others_target")  private Integer taOthersTarget;
    @Column(name = "ta_others_dtm")     private Integer taOthersDtm;
    @Column(name = "ta_others_cum")     private Integer taOthersCum;

    // ── Seminars ─────────────────────────────────────────────────────────────
    @Column(name = "seminar_no_target")           private Integer seminarNoTarget;
    @Column(name = "seminar_no_dtm")              private Integer seminarNoDtm;
    @Column(name = "seminar_no_cum")              private Integer seminarNoCum;
    @Column(name = "seminar_participants_target") private Integer seminarParticipantsTarget;
    @Column(name = "seminar_participants_dtm")    private Integer seminarParticipantsDtm;
    @Column(name = "seminar_participants_cum")    private Integer seminarParticipantsCum;

    // ── TTB (Trainees Trained Bifurcation) ──────────────────────────────────
    @Column(name = "ttb_dtm_sc")     private Integer ttbDtmSc;
    @Column(name = "ttb_dtm_st")     private Integer ttbDtmSt;
    @Column(name = "ttb_dtm_women")  private Integer ttbDtmWomen;
    @Column(name = "ttb_dtm_obc")    private Integer ttbDtmObc;
    @Column(name = "ttb_dtm_ph")     private Integer ttbDtmPh;
    @Column(name = "ttb_dtm_min")    private Integer ttbDtmMin;
    @Column(name = "ttb_dtm_total")  private Integer ttbDtmTotal;
    @Column(name = "ttb_cum_sc")     private Integer ttbCumSc;
    @Column(name = "ttb_cum_st")     private Integer ttbCumSt;
    @Column(name = "ttb_cum_women")  private Integer ttbCumWomen;
    @Column(name = "ttb_cum_obc")    private Integer ttbCumObc;
    @Column(name = "ttb_cum_ph")     private Integer ttbCumPh;
    @Column(name = "ttb_cum_min")    private Integer ttbCumMin;
    @Column(name = "ttb_cum_total")  private Integer ttbCumTotal;

    // ── Training Totals ──────────────────────────────────────────────────────
    @Column(name = "trng_total_noc_cumu_mon") private Integer trngTotalNocCumuMon;
    @Column(name = "trng_total_noc_dtm")      private Integer trngTotalNocDtm;
    @Column(name = "tring_total_not_dtm")     private Integer tringTotalNotDtm;
    @Column(name = "tring_total_not_cum")     private Integer tringTotalNotCum;
    @Column(name = "general_ttb")             private Integer generalTtb;
    @Column(name = "general_cum")             private Integer generalCum;

    // ── Gender Bifurcation ───────────────────────────────────────────────────
    @Column(name = "gen")         private Integer gen;
    @Column(name = "men")         private Integer men;
    @Column(name = "transgender") private Integer transgender;
    @Column(name = "gen_cum")         private Integer genCum;
    @Column(name = "men_cum")         private Integer menCum;
    @Column(name = "transgender_cum") private Integer transgenderCum;

    // ── Education Bifurcation ───────────────────────────────────────────────
    @Column(name = "tenfail")         private Integer tenfail;
    @Column(name = "tenpass")         private Integer tenpass;
    @Column(name = "twelth")          private Integer twelth;
    @Column(name = "graduation")      private Integer graduation;
    @Column(name = "pg")              private Integer pg;
    @Column(name = "tenfail_cum")     private Integer tenfailCum;
    @Column(name = "tenpass_cum")     private Integer tenpassCum;
    @Column(name = "twelth_cum")      private Integer twelthCum;
    @Column(name = "graduation_cum")  private Integer graduationCum;
    @Column(name = "pg_cum")          private Integer pgCum;

    // ── Age Limit Bifurcation ────────────────────────────────────────────────
    @Column(name = "limit1")     private Integer limit1;
    @Column(name = "limit2")     private Integer limit2;
    @Column(name = "limit3")     private Integer limit3;
    @Column(name = "limit4")     private Integer limit4;
    @Column(name = "limit1_cum") private Integer limit1Cum;
    @Column(name = "limit2_cum") private Integer limit2Cum;
    @Column(name = "limit3_cum") private Integer limit3Cum;
    @Column(name = "limit4_cum") private Integer limit4Cum;

    // ── Above / Diploma / ITI / Graduation etc. ──────────────────────────────
    @Column(name = "above")     private Integer above;
    @Column(name = "abovec")    private Integer abovec;
    @Column(name = "diploma")   private Integer diploma;
    @Column(name = "diplomac")  private Integer diplomac;
    @Column(name = "iti")       private Integer iti;
    @Column(name = "itic")      private Integer itic;
    @Column(name = "graduation_nontech")   private Integer graduationNontech;
    @Column(name = "graduation_tech")      private Integer graduationTech;
    @Column(name = "postgraduate_nontech") private Integer postgraduateNontech;
    @Column(name = "postgraduate_tech")    private Integer postgraduateTech;
    @Column(name = "phdmhil")              private Integer phdmhil;
    @Column(name = "graduation_nontechc")   private Integer graduationNontechc;
    @Column(name = "graduation_techc")      private Integer graduationTechc;
    @Column(name = "postgraduate_nontechc") private Integer postgraduateNontechc;
    @Column(name = "postgraduate_techc")    private Integer postgraduateTechc;
    @Column(name = "phdmhilc")              private Integer phdmhilc;

    // ── MSME Tooling ─────────────────────────────────────────────────────────
    @Column(name = "msme_nos_tooling_target")     private Integer msmeNosToolingTarget;
    @Column(name = "msme_nos_tooling_dtm")        private Integer msmeNosToolingDtm;
    @Column(name = "msme_nos_tooling_cumu_mon")   private Integer msmeNosToolingCumuMon;
    @Column(name = "msme_values_tooling_target")  private Integer msmeValuesToolingTarget;
    @Column(name = "msme_values_tooling_dtm",     precision=15,scale=2) private BigDecimal msmeValuesToolingDtm;
    @Column(name = "msme_values_tooling_cumu_mon",precision=15,scale=2) private BigDecimal msmeValuesToolingCumuMon;

    // ── Other Tooling ────────────────────────────────────────────────────────
    @Column(name = "other_nos_tooling_target")     private Integer otherNosToolingTarget;
    @Column(name = "other_nos_tooling_dtm")        private Integer otherNosToolingDtm;
    @Column(name = "other_nos_tooling_cumu_mon")   private Integer otherNosToolingCumuMon;
    @Column(name = "other_values_tooling_target")  private Integer otherValuesToolingTarget;
    @Column(name = "other_values_tooling_dtm",     precision=15,scale=2) private BigDecimal otherValuesToolingDtm;
    @Column(name = "other_values_tooling_cumu_mon",precision=15,scale=2) private BigDecimal otherValuesToolingCumuMon;

    // ── MSME Other Job Work ───────────────────────────────────────────────────
    @Column(name = "msme_nos_otherjob_target")     private Integer msmeNosOtherjobTarget;
    @Column(name = "msme_nos_otherjob_dtm")        private Integer msmeNosOtherjobDtm;
    @Column(name = "msme_nos_otherjob_cumu_mon")   private Integer msmeNosOtherjobCumuMon;
    @Column(name = "msme_values_otherjob_target")  private Integer msmeValuesOtherjobTarget;
    @Column(name = "msme_values_otherjob_dtm",     precision=15,scale=2) private BigDecimal msmeValuesOtherjobDtm;
    @Column(name = "msme_values_otherjob_cumu_mon",precision=15,scale=2) private BigDecimal msmeValuesOtherjobCumuMon;

    // ── Other Other Job Work ─────────────────────────────────────────────────
    @Column(name = "other_nos_otherjob_target")     private Integer otherNosOtherjobTarget;
    @Column(name = "other_nos_otherjob_dtm")        private Integer otherNosOtherjobDtm;
    @Column(name = "other_nos_otherjob_cumu_mon")   private Integer otherNosOtherjobCumuMon;
    @Column(name = "other_values_otherjob_target")  private Integer otherValuesOtherjobTarget;
    @Column(name = "other_values_otherjob_dtm",     precision=15,scale=2) private BigDecimal otherValuesOtherjobDtm;
    @Column(name = "other_values_otherjob_cumu_mon",precision=15,scale=2) private BigDecimal otherValuesOtherjobCumuMon;

    // ── Audit ────────────────────────────────────────────────────────────────
    @Column(name = "sisi_nm", length = 500) private String sisiNm;
}
