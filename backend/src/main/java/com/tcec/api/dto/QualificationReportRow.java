package com.tcec.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * One row in the Qualification-wise Trainees Trained report.
 *
 * JSON field names must match the keys used in QualificationWiseReport.jsx:
 *   QUAL_KEYS_DTM = ['tenfail','tenpass','twelth','ITI','Diploma',
 *                    'GradTech','GradNonTech','PGTech','PGNonTech','Phd']
 *   QUAL_KEYS_CUM = ['tenfailC','tenpassC','twelthC','ITIC','DiplomaC',
 *                    'GradTechC','GradNonTechC','PGTechC','PGNonTechC','PhdC']
 *
 * Source columns (tbl_physical):
 *   tenfail / tenfail_cum
 *   tenpass / tenpass_cum
 *   twelth  / twelth_cum
 *   iti     / itic
 *   diploma / diplomac
 *   graduation_tech     / graduation_techc
 *   graduation_nontech  / graduation_nontechc
 *   postgraduate_tech   / postgraduate_techc
 *   postgraduate_nontech/ postgraduate_nontechc
 *   phdmhil             / phdmhilc
 */
public class QualificationReportRow {

    public String  userId;
    public int     target;
    public boolean noData;

    // ── During the Month ──────────────────────────────────────────────────────
    public int tenfail;
    public int tenpass;
    public int twelth;

    @JsonProperty("ITI")      public int iti;
    @JsonProperty("Diploma")  public int diploma;
    @JsonProperty("GradTech")    public int gradTech;
    @JsonProperty("GradNonTech") public int gradNonTech;
    @JsonProperty("PGTech")      public int pgTech;
    @JsonProperty("PGNonTech")   public int pgNonTech;
    @JsonProperty("Phd")         public int phd;

    // ── Up to the Month ───────────────────────────────────────────────────────
    public int tenfailC;
    public int tenpassC;
    public int twelthC;

    @JsonProperty("ITIC")         public int itiC;
    @JsonProperty("DiplomaC")     public int diplomaC;
    @JsonProperty("GradTechC")    public int gradTechC;
    @JsonProperty("GradNonTechC") public int gradNonTechC;
    @JsonProperty("PGTechC")      public int pgTechC;
    @JsonProperty("PGNonTechC")   public int pgNonTechC;
    @JsonProperty("PhdC")         public int phdC;

    public QualificationReportRow() {}

    public QualificationReportRow(
            String userId, int target,
            int tenfail,  int tenpass,  int twelth,
            int iti,      int diploma,
            int gradTech, int gradNonTech, int pgTech, int pgNonTech, int phd,
            int tenfailC, int tenpassC, int twelthC,
            int itiC,     int diplomaC,
            int gradTechC, int gradNonTechC, int pgTechC, int pgNonTechC, int phdC,
            boolean noData) {

        this.userId   = userId;
        this.target   = target;
        this.noData   = noData;
        this.tenfail  = tenfail;  this.tenpass  = tenpass;  this.twelth  = twelth;
        this.iti      = iti;      this.diploma  = diploma;
        this.gradTech = gradTech; this.gradNonTech = gradNonTech;
        this.pgTech   = pgTech;   this.pgNonTech   = pgNonTech;  this.phd = phd;
        this.tenfailC = tenfailC; this.tenpassC = tenpassC; this.twelthC = twelthC;
        this.itiC     = itiC;     this.diplomaC = diplomaC;
        this.gradTechC = gradTechC; this.gradNonTechC = gradNonTechC;
        this.pgTechC  = pgTechC;  this.pgNonTechC = pgNonTechC; this.phdC = phdC;
    }
}
