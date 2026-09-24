-- Removes the rows inserted by analysis_report_seed.sql (tagged 'TEST-SEED').
-- Existing targets that the seed kept (ON CONFLICT DO NOTHING) are not tagged and stay untouched.
BEGIN;

DELETE FROM tbl_course_txn      WHERE dates   = 'TEST-SEED';
DELETE FROM tbl_budget          WHERE sisi_nm = 'TEST-SEED';
DELETE FROM tbl_financial       WHERE sisi_nm = 'TEST-SEED';
DELETE FROM tbl_physical        WHERE sisi_nm = 'TEST-SEED';
DELETE FROM tbl_trng_exp_target WHERE TRIM(sisi_nm) = 'TEST-SEED';

COMMIT;
