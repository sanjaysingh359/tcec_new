package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "tbl_placement")
@DynamicInsert
@DynamicUpdate
@Getter @Setter @NoArgsConstructor
public class TblPlacement {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "placement_seq")
    @SequenceGenerator(name = "placement_seq", sequenceName = "tbl_placement_sno_seq", allocationSize = 1)
    @Column(name = "sno")
    private Integer sno;

    @Column(name = "inst_id", length = 45)
    private String instId;

    @Column(name = "months", length = 45)
    private String months;

    @Column(name = "years", length = 45)
    private String years;

    @Column(name = "year_months", length = 100)
    private String yearMonths;

    // ── Section D: Trainees Trained Under ─────────────────────────────────
    @Column(name = "nsqf_com_dm")   private Integer nsqfComDm;
    @Column(name = "nsqf_com_cum")  private Integer nsqfComCum;
    @Column(name = "nsqf_ex_dm")    private Integer nsqfExDm;
    @Column(name = "nsqf_ex_cum")   private Integer nsqfExCum;
    @Column(name = "non_nsqf_dm")   private Integer nonNsqfDm;
    @Column(name = "non_nsqf_cum")  private Integer nonNsqfCum;

    // ── Section E: Placement ───────────────────────────────────────────────
    @Column(name = "ps_trn_cert_dm")       private Integer psTrnCertDm;
    @Column(name = "ps_trn_cert_cum")      private Integer psTrnCertCum;
    @Column(name = "ps_trn_opt_plc_dm")    private Integer psTrnOptPlcDm;
    @Column(name = "ps_trn_opt_plc_cum")   private Integer psTrnOptPlcCum;
    @Column(name = "ps_trn_reg_smprk_dm")  private Integer psTrnRegSmprkDm;
    @Column(name = "ps_trn_reg_smprk_cum") private Integer psTrnRegSmprkCum;
    @Column(name = "ps_cnd_plcd_dm")       private Integer psCndPlcdDm;
    @Column(name = "ps_cnd_plcd_cum")      private Integer psCndPlcdCum;
    @Column(name = "ps_emp_trn_dm")        private Integer psEmpTrnDm;
    @Column(name = "ps_emp_trn_cum")       private Integer psEmpTrnCum;
    @Column(name = "ps_trn_opt_hstd_dm")   private Integer psTrnOptHstdDm;
    @Column(name = "ps_trn_opt_hstd_cum")  private Integer psTrnOptHstdCum;
    @Column(name = "ps_cnd_opt_slfs_dm")   private Integer psCndOptSlfsDm;
    @Column(name = "ps_cnd_opt_slfs_cum")  private Integer psCndOptSlfsCum;
    @Column(name = "ps_cnd_to_beplcd_dm")  private Integer psCndToBeplcdDm;
    @Column(name = "ps_cnd_to_beplcd_cum") private Integer psCndToBeplcdCum;

    // ── NSQF-Exempted sub-rows ─────────────────────────────────────────────
    @Column(name = "nsqf_ex_ram11_dm")  private Integer nsqfExRam11Dm;
    @Column(name = "nsqf_ex_ram11_cum") private Integer nsqfExRam11Cum;
    @Column(name = "nsqf_ex_ram12_dm")  private Integer nsqfExRam12Dm;
    @Column(name = "nsqf_ex_ram12_cum") private Integer nsqfExRam12Cum;
    @Column(name = "nsqf_ex_ram13_dm")  private Integer nsqfExRam13Dm;
    @Column(name = "nsqf_ex_ram13_cum") private Integer nsqfExRam13Cum;
    @Column(name = "nsqf_ex_ram14_dm")  private Integer nsqfExRam14Dm;
    @Column(name = "nsqf_ex_ram14_cum") private Integer nsqfExRam14Cum;
    @Column(name = "nsqf_ex_ram15_dm")  private Integer nsqfExRam15Dm;
    @Column(name = "nsqf_ex_ram15_cum") private Integer nsqfExRam15Cum;
    @Column(name = "nsqf_ex_ram16_dm")  private Integer nsqfExRam16Dm;
    @Column(name = "nsqf_ex_ram16_cum") private Integer nsqfExRam16Cum;
    @Column(name = "nsqf_ex_ram17_dm")  private Integer nsqfExRam17Dm;
    @Column(name = "nsqf_ex_ram17_cum") private Integer nsqfExRam17Cum;
    @Column(name = "nsqf_ex_ram18_dm")  private Integer nsqfExRam18Dm;
    @Column(name = "nsqf_ex_ram18_cum") private Integer nsqfExRam18Cum;

    // ── Non-NSQF sub-rows ──────────────────────────────────────────────────
    @Column(name = "non_nsqf_ram31_dm")  private Integer nonNsqfRam31Dm;
    @Column(name = "non_nsqf_ram31_cum") private Integer nonNsqfRam31Cum;
    @Column(name = "non_nsqf_ram32_dm")  private Integer nonNsqfRam32Dm;
    @Column(name = "non_nsqf_ram32_cum") private Integer nonNsqfRam32Cum;
    @Column(name = "non_nsqf_ram33_dm")  private Integer nonNsqfRam33Dm;
    @Column(name = "non_nsqf_ram33_cum") private Integer nonNsqfRam33Cum;
    @Column(name = "non_nsqf_ram34_dm")  private Integer nonNsqfRam34Dm;
    @Column(name = "non_nsqf_ram34_cum") private Integer nonNsqfRam34Cum;
    @Column(name = "non_nsqf_ram35_dm")  private Integer nonNsqfRam35Dm;
    @Column(name = "non_nsqf_ram35_cum") private Integer nonNsqfRam35Cum;
    @Column(name = "non_nsqf_ram36_dm")  private Integer nonNsqfRam36Dm;
    @Column(name = "non_nsqf_ram36_cum") private Integer nonNsqfRam36Cum;
    @Column(name = "non_nsqf_ram37_dm")  private Integer nonNsqfRam37Dm;
    @Column(name = "non_nsqf_ram37_cum") private Integer nonNsqfRam37Cum;
    @Column(name = "non_nsqf_ram38_dm")  private Integer nonNsqfRam38Dm;
    @Column(name = "non_nsqf_ram38_cum") private Integer nonNsqfRam38Cum;

    // ── Audit fields ────────────────────────────────────────────────────────
    @Column(name = "time", length = 45)
    private String time;

    @Column(name = "ip", length = 45)
    private String ip;
}
