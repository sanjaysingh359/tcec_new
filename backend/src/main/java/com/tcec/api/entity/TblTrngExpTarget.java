package com.tcec.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_trng_exp_target")
@IdClass(InstYearId.class)
@Getter @Setter @NoArgsConstructor
public class TblTrngExpTarget {

    @Id @Column(name = "inst_id", length = 50) private String instId;
    @Id @Column(name = "years",   length = 125) private String years;

    @Column(name = "rev_earn_cash") private Integer revEarnCash;
    @Column(name = "rev_earn_acc")  private Integer revEarnAcc;
    @Column(name = "rev_exp_cash")  private Integer revExpCash;
    @Column(name = "rev_exp_acc")   private Integer revExpAcc;
    @Column(name = "inc_exp_cash")  private Integer incExpCash;
    @Column(name = "inc_exp_acc")   private Integer incExpAcc;
    @Column(name = "per_rec_cash")  private Integer perRecCash;
    @Column(name = "per_rec_acc")   private Integer perRecAcc;

    /** Annual training (trainees) target */
    @Column(name = "ta_target")     private Integer taTarget;
    /** NJU (unit assisted) target */
    @Column(name = "nju_target")    private Integer njuTarget;
    /** Budget estimate */
    @Column(name = "be_budget")     private Integer beBudget;
}
