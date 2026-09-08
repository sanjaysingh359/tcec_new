-- ============================================================================
-- Migration: Placement Section (E) — NSQF-exempted & Non-NSQF category columns
-- Date     : 2026-09-08
-- Table    : tbl_placement   (database: dcmsme_tcec)
-- ----------------------------------------------------------------------------
-- The Placement Section screen (/app/placement) now captures each of the eight
-- rows (i–viii) under THREE categories instead of one:
--
--     NSQF           -> ps_*_dm / ps_*_cum                (already present)
--     NSQF exempted  -> nsqf_ex_ram11..18_dm / _cum       (rows i..viii)
--     Non NSQF       -> non_nsqf_ram31..38_dm / _cum      (rows i..viii)
--
-- The ram11..18 / ram31..38 columns already exist in the production dump that
-- ships in postgresDb/, so on that database this migration is a NO-OP. It is
-- written idempotently (ADD COLUMN IF NOT EXISTS) so it can also be applied to
-- any older tbl_placement that predates those columns.
--
-- Run:
--   psql -h localhost -U postgres -d dcmsme_tcec -f db/migrations/2026-09-08_placement_section_e_categories.sql
--   -- or, against the Docker container:
--   docker cp db/migrations/2026-09-08_placement_section_e_categories.sql tcec-pg:/tmp/m.sql
--   docker exec tcec-pg psql -U postgres -d dcmsme_tcec -f /tmp/m.sql
--
-- No data backfill is required: new columns default to 0, and the API
-- (EntryController.savePlacement) maintains the _cum values from that point on
-- as  cumulative = sum(previous months' _dm) + this month's _dm.
-- ============================================================================

BEGIN;

ALTER TABLE tbl_placement
    -- ── NSQF exempted — placement rows (i)…(viii) ─────────────────────────
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram11_dm   integer NOT NULL DEFAULT 0,  -- (i)   Trainees Certified
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram11_cum  integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram12_dm   integer NOT NULL DEFAULT 0,  -- (ii)  Total trainees opted for placement
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram12_cum  integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram13_dm   integer NOT NULL DEFAULT 0,  -- (iii) Trainees registered on Sampark Portal
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram13_cum  integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram14_dm   integer NOT NULL DEFAULT 0,  -- (iv)  Candidates got placement
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram14_cum  integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram15_dm   integer NOT NULL DEFAULT 0,  -- (v)   Already employed, training for re/up-skilling
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram15_cum  integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram16_dm   integer NOT NULL DEFAULT 0,  -- (vi)  Opted for higher studies
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram16_cum  integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram17_dm   integer NOT NULL DEFAULT 0,  -- (vii) Opted for self-employment
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram17_cum  integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram18_dm   integer NOT NULL DEFAULT 0,  -- (viii) Yet to be placed
    ADD COLUMN IF NOT EXISTS nsqf_ex_ram18_cum  integer NOT NULL DEFAULT 0,

    -- ── Non NSQF — placement rows (i)…(viii) ──────────────────────────────
    ADD COLUMN IF NOT EXISTS non_nsqf_ram31_dm  integer NOT NULL DEFAULT 0,  -- (i)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram31_cum integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS non_nsqf_ram32_dm  integer NOT NULL DEFAULT 0,  -- (ii)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram32_cum integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS non_nsqf_ram33_dm  integer NOT NULL DEFAULT 0,  -- (iii)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram33_cum integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS non_nsqf_ram34_dm  integer NOT NULL DEFAULT 0,  -- (iv)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram34_cum integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS non_nsqf_ram35_dm  integer NOT NULL DEFAULT 0,  -- (v)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram35_cum integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS non_nsqf_ram36_dm  integer NOT NULL DEFAULT 0,  -- (vi)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram36_cum integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS non_nsqf_ram37_dm  integer NOT NULL DEFAULT 0,  -- (vii)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram37_cum integer NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS non_nsqf_ram38_dm  integer NOT NULL DEFAULT 0,  -- (viii)
    ADD COLUMN IF NOT EXISTS non_nsqf_ram38_cum integer NOT NULL DEFAULT 0;

COMMIT;

-- ── Verification ────────────────────────────────────────────────────────────
-- Expect: 32
SELECT count(*) AS category_columns_present
FROM   information_schema.columns
WHERE  table_name = 'tbl_placement'
  AND (column_name LIKE 'nsqf_ex_ram1%' OR column_name LIKE 'non_nsqf_ram3%');

-- ── Rollback (only if you must undo — this DROPS the columns and their data) ─
-- ALTER TABLE tbl_placement
--     DROP COLUMN IF EXISTS nsqf_ex_ram11_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram11_cum,
--     DROP COLUMN IF EXISTS nsqf_ex_ram12_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram12_cum,
--     DROP COLUMN IF EXISTS nsqf_ex_ram13_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram13_cum,
--     DROP COLUMN IF EXISTS nsqf_ex_ram14_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram14_cum,
--     DROP COLUMN IF EXISTS nsqf_ex_ram15_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram15_cum,
--     DROP COLUMN IF EXISTS nsqf_ex_ram16_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram16_cum,
--     DROP COLUMN IF EXISTS nsqf_ex_ram17_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram17_cum,
--     DROP COLUMN IF EXISTS nsqf_ex_ram18_dm,  DROP COLUMN IF EXISTS nsqf_ex_ram18_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram31_dm, DROP COLUMN IF EXISTS non_nsqf_ram31_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram32_dm, DROP COLUMN IF EXISTS non_nsqf_ram32_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram33_dm, DROP COLUMN IF EXISTS non_nsqf_ram33_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram34_dm, DROP COLUMN IF EXISTS non_nsqf_ram34_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram35_dm, DROP COLUMN IF EXISTS non_nsqf_ram35_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram36_dm, DROP COLUMN IF EXISTS non_nsqf_ram36_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram37_dm, DROP COLUMN IF EXISTS non_nsqf_ram37_cum,
--     DROP COLUMN IF EXISTS non_nsqf_ram38_dm, DROP COLUMN IF EXISTS non_nsqf_ram38_cum;
