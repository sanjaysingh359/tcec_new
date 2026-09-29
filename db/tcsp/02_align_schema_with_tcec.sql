-- Align the TCSP database with the TCEC schema the new MPR app expects.
-- Generated from postgresDb/dcmsme_tcec_dump.sql vs 01_dcmsme_tcsp_schema_data.sql.
-- Safe to re-run: every statement is IF NOT EXISTS.

-- The new app numbers new Financial / Placement rows from these sequences (entity @SequenceGenerator),
-- as on the TCEC database. Start each one after the highest existing sno.
CREATE SEQUENCE IF NOT EXISTS public.tbl_financial_sno_seq START WITH 1 INCREMENT BY 1;
SELECT setval('public.tbl_financial_sno_seq', COALESCE((SELECT MAX(sno) FROM public.tbl_financial), 0) + 1, false);
ALTER TABLE public.tbl_financial ALTER COLUMN sno SET DEFAULT nextval('public.tbl_financial_sno_seq');

CREATE SEQUENCE IF NOT EXISTS public.tbl_placement_sno_seq START WITH 1 INCREMENT BY 1;
SELECT setval('public.tbl_placement_sno_seq', COALESCE((SELECT MAX(sno) FROM public.tbl_placement), 0) + 1, false);
ALTER TABLE public.tbl_placement ALTER COLUMN sno SET DEFAULT nextval('public.tbl_placement_sno_seq');
