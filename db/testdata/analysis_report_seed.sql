-- ═══════════════════════════════════════════════════════════════════════════
-- Test data for the Performance Analysis report  (/app/reports/analysis)
-- Period : MARCH (month 12) 2026-2027        Institutes : I1–I5
-- Every inserted row is tagged sisi_nm = 'TEST-SEED' (course rows: dates = 'TEST-SEED').
-- Remove with analysis_report_seed_cleanup.sql
--
-- Scenarios
--   I1 TCEC-Behrampur     complete; accrual revenue total stored
--   I2 TCEC-Balasore      complete; accrual total NULL -> report sums the accrual parts
--   I3 TCEC-Bengaluru     complete; negative surplus; long-term courses in tbl_course_txn
--   I4 TCEC-Amritsar      financial + physical + target but NO budget row -> '*' row, zeros
--   I5 TCEC-Bhawanipatnam nothing entered -> '*' row, zeros
--
-- Expected report rows (if these institutes had no 2026-2027 target before; otherwise
-- T columns show the existing targets — run the check query at the bottom):
--   Institute         RevT RevA ExpT ExpA SurT SurA TrnT TrnA UnitT UnitA
--   TCEC-Balasore      325  260  310  248   15   12  900  700   250   110
--   TCEC-Behrampur     450  483  420  455   30   28 1200 1045   300   185
--   TCEC-Bengaluru     250  199  260  231  -10  -32  800  565   150    77
--   *TCEC-Amritsar, *TCEC-Bhawanipatnam (and every other institute) -> all 0
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- Refuse to run if real data already exists for these institutes in March 2026-2027
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM tbl_financial  WHERE inst_id IN ('I1','I2','I3','I4','I5') AND months = '12' AND years = '2026-2027')
  OR EXISTS (SELECT 1 FROM tbl_physical   WHERE inst_id IN ('I1','I2','I3','I4','I5') AND months = '12' AND years = '2026-2027')
  OR EXISTS (SELECT 1 FROM tbl_budget     WHERE inst_id IN ('I1','I2','I3','I4','I5') AND months = '12' AND years = '2026-2027')
  OR EXISTS (SELECT 1 FROM tbl_course_txn WHERE inst_id IN ('I1','I2','I3','I4','I5') AND months = '12' AND years = '2026-2027')
  THEN
    RAISE EXCEPTION 'Data already exists for I1-I5, March 2026-2027 — not seeding (run the cleanup script first if it is old test data)';
  END IF;
END $$;

-- ── Annual targets (kept if the institute already has a 2026-2027 target) ──
INSERT INTO tbl_trng_exp_target (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc,
                                 ta_target, nju_target, be_budget, sisi_nm)
VALUES ('I1', '2026-2027', 450, 450, 420, 420, 1200, 300, 500, 'TEST-SEED'),
       ('I2', '2026-2027', 325, 325, 310, 310,  900, 250, 400, 'TEST-SEED'),
       ('I3', '2026-2027', 250, 250, 260, 260,  800, 150, 350, 'TEST-SEED'),
       ('I4', '2026-2027', 200, 200, 190, 190,  600, 100, 300, 'TEST-SEED')
ON CONFLICT (years, inst_id) DO NOTHING;

-- ── Financial (cumulative up to March) ──
INSERT INTO tbl_financial (inst_id, months, years, months_year, sisi_nm,
    rev_ear_accrual_trng_cum, rev_ear_accrual_prdtn_tooling_cum, rev_ear_accrual_prdtn_otherjob_cum,
    rev_ear_accl_bas_consult_cum, rev_ear_accrual_misc_cum, test_cal_services_acc_mon,
    rev_ear_accrual_total_cum, rev_exp_accrual_cum,
    rev_ear_cash_total_cum, rev_exp_cash_cum)
VALUES
  -- I1: stored total 482.60 -> 483 ; expenditure 455.30 -> 455
  ('I1', '12', '2026-2027', '12-2026-2027', 'TEST-SEED', 210.00, 120.30, 90.00, 30.10, 17.20, 15.00, 482.60, 455.30, 470.00, 440.00),
  -- I2: total NULL -> 120.40+60.25+45.10+18.00+6.75+9.50 = 260.00 ; expenditure 248.49 -> 248
  ('I2', '12', '2026-2027', '12-2026-2027', 'TEST-SEED', 120.40,  60.25, 45.10, 18.00,  6.75,  9.50,   NULL, 248.49, 255.00, 240.00),
  -- I3: 198.50 -> 199 (rounds half up) ; expenditure 231.49 -> 231 ; surplus negative
  ('I3', '12', '2026-2027', '12-2026-2027', 'TEST-SEED',  90.00,  50.00, 30.00, 15.00,  8.50,  5.00, 198.50, 231.49, 190.00, 225.00),
  ('I4', '12', '2026-2027', '12-2026-2027', 'TEST-SEED', 100.00,  40.00, 20.00, 10.00,  5.00,  5.00, 180.00, 170.00, 175.00, 165.00);

-- ── Physical (cumulative up to March) ──
-- Trainees A = ta_ltc_cum + ta_stc_ntt_cum + ta_others_cum
-- Units A    = tooling (msme+other) + other job (msme+other) + any_other + consultancy (msme+other)
INSERT INTO tbl_physical (inst_id, months, years, months_year, sisi_nm,
    ta_ltc_dtm, ta_ltc_cum, ta_stc_ntt_dtm, ta_stc_ntt_cum, ta_others_dtm, ta_others_cum,
    tring_total_not_dtm, tring_total_not_cum,
    msme_nos_tooling_dtm, msme_nos_tooling_cumu_mon, other_nos_tooling_dtm, other_nos_tooling_cumu_mon,
    msme_nos_otherjob_dtm, msme_nos_otherjob_cumu_mon, other_nos_otherjob_dtm, other_nos_otherjob_cumu_mon,
    any_other_dtm, any_other_cum, conslt_msme_dtm, conslt_msme_cum, conslt_other_dtm, conslt_other_cum)
VALUES
  -- I1: 310+640+95 = 1045 ; 40+12+85+20+9+14+5 = 185
  ('I1', '12', '2026-2027', '12-2026-2027', 'TEST-SEED', 20, 310, 55, 640, 8, 95, 83, 1045,  4, 40, 1, 12,  7, 85, 2, 20, 1,  9, 1, 14, 0, 5),
  -- I2: 150+510+40 = 700 ; 30+8+50+10+4+6+2 = 110
  ('I2', '12', '2026-2027', '12-2026-2027', 'TEST-SEED', 10, 150, 45, 510, 3, 40, 58,  700,  3, 30, 1,  8,  5, 50, 1, 10, 0,  4, 1,  6, 0, 2),
  -- I3: 160 (from course rows below)+380+25 = 565 ; 22+5+35+7+3+4+1 = 77
  ('I3', '12', '2026-2027', '12-2026-2027', 'TEST-SEED', 12, 160, 30, 380, 2, 25, 44,  565,  2, 22, 0,  5,  3, 35, 1,  7, 0,  3, 0,  4, 0, 1),
  ('I4', '12', '2026-2027', '12-2026-2027', 'TEST-SEED',  8,  90, 20, 300, 1, 10, 29,  400,  1, 15, 0,  3,  2, 20, 0,  4, 0,  2, 0,  3, 0, 1);

-- ── Long-term courses for I3 (TA_LTC = sum of these; Physical page shows them on reopen) ──
INSERT INTO tbl_course_txn (inst_id, months, years, dtm, commulative, dates, course_name)
VALUES ('I3', '12', '2026-2027', 7, 96, 'TEST-SEED', 'Diploma in Tool & Die Making'),
       ('I3', '12', '2026-2027', 5, 64, 'TEST-SEED', 'Diploma in Mechatronics');

-- ── Budget rows (I4 deliberately left out) ──
INSERT INTO tbl_budget (inst_id, months, years, months_year, cry_fwd_amt, gia_amt, cry_fwd_util_bal, sisi_nm)
VALUES ('I1', '12', '2026-2027', '12-2026-2027', 25.00, 300.00, 0, 'TEST-SEED'),
       ('I2', '12', '2026-2027', '12-2026-2027', 15.00, 250.00, 0, 'TEST-SEED'),
       ('I3', '12', '2026-2027', '12-2026-2027', 10.00, 200.00, 0, 'TEST-SEED');

COMMIT;

-- ── Check: what the report should show for the seeded institutes (same logic as the API) ──
SELECT m.user_id,
       CASE WHEN b.inst_id IS NULL OR f.inst_id IS NULL OR p.inst_id IS NULL OR t.inst_id IS NULL THEN '*' ELSE '' END AS no_data,
       t.rev_earn_cash AS rev_t,
       ROUND(COALESCE(f.rev_ear_accrual_total_cum,
             COALESCE(f.rev_ear_accrual_trng_cum,0) + COALESCE(f.rev_ear_accrual_prdtn_tooling_cum,0)
           + COALESCE(f.rev_ear_accrual_prdtn_otherjob_cum,0) + COALESCE(f.rev_ear_accl_bas_consult_cum,0)
           + COALESCE(f.rev_ear_accrual_misc_cum,0) + COALESCE(f.test_cal_services_acc_mon,0))) AS rev_a,
       t.rev_exp_acc AS exp_t,
       ROUND(f.rev_exp_accrual_cum) AS exp_a,
       t.ta_target  AS trn_t,
       p.ta_ltc_cum + p.ta_stc_ntt_cum + p.ta_others_cum AS trn_a,
       t.nju_target AS unit_t,
       p.msme_nos_tooling_cumu_mon + p.other_nos_tooling_cumu_mon + p.msme_nos_otherjob_cumu_mon
     + p.other_nos_otherjob_cumu_mon + p.any_other_cum + p.conslt_msme_cum + p.conslt_other_cum AS unit_a
FROM user_id_mapping m
LEFT JOIN tbl_financial       f ON f.inst_id = TRIM(m.inst_id) AND f.months = '12' AND f.years = '2026-2027'
LEFT JOIN tbl_physical        p ON p.inst_id = TRIM(m.inst_id) AND p.months = '12' AND p.years = '2026-2027'
LEFT JOIN tbl_budget          b ON b.inst_id = TRIM(m.inst_id) AND b.months = '12' AND b.years = '2026-2027'
LEFT JOIN tbl_trng_exp_target t ON TRIM(t.inst_id) = TRIM(m.inst_id) AND t.years = '2026-2027'
WHERE TRIM(m.inst_id) IN ('I1','I2','I3','I4','I5')
ORDER BY 2, 1;
