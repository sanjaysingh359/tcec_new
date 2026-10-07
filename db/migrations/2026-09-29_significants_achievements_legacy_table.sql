-- Legacy Significant Achievement table (TCSP and AB MySQL databases), kept as-is
-- in PostgreSQL so its data survives the migration. The new app stores the
-- Significant Achievement text in tbl_budget.significant; this table is the
-- legacy source. Apply to dcmsme_tcsp and dcmsme_tool. Safe to re-run.
CREATE TABLE IF NOT EXISTS public.significants_achievements (
    id                     serial PRIMARY KEY,
    components_1           text,
    import_export_1        text,
    import_outcome_1       text,
    components_2           text,
    import_export_2        text,
    import_outcome_2       text,
    technical_achievements text,
    highend_month          integer,
    highend_cumulative     integer,
    master_month           integer,
    master_cumulative      integer,
    mou_details            text,
    mou_outcome            text,
    academia               text,
    awards                 text,
    inst_id                text,
    months                 integer,
    months_year            text,
    years                  text
);
