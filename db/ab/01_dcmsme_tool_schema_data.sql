--
-- PostgreSQL database dump
--

\restrict 5R5BlmfEe6ncK7PWc8HD1iL4Y1gaiSw3Wnwv9F8gBet3D4wcbL39ydT30Pf68Xa

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ab; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ab (
    name character varying(12) DEFAULT NULL::character varying
);


--
-- Name: back_upfinancial; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.back_upfinancial (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    months_year character varying(125) NOT NULL,
    rev_ear_cash_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_target integer,
    rev_ear_cash_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_target integer,
    rev_ear_cash_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_target integer,
    rev_ear_cash_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_target integer,
    rev_ear_accrual_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_target integer,
    rev_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    test_cal_services_target integer,
    test_cal_services_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_mon numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_target integer,
    test_cal_services_acc_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_mon numeric(28,2) DEFAULT NULL::numeric,
    sno integer DEFAULT 0 NOT NULL
);


--
-- Name: budget_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.budget_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon date,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: changess; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.changess (
    sno integer NOT NULL,
    user_id character varying(45) NOT NULL,
    action character varying(45) NOT NULL,
    datetim character varying(45) NOT NULL
);


--
-- Name: cr_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cr_users (
    user_id character varying(25) DEFAULT NULL::character varying,
    password character varying(25) DEFAULT NULL::character varying,
    role character varying(25) DEFAULT NULL::character varying,
    localrole character varying(20) DEFAULT NULL::character varying,
    temprole character varying(20) DEFAULT NULL::character varying
);


--
-- Name: emp_mstr; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.emp_mstr (
    emp_no character varying(10) NOT NULL,
    password character varying(6) DEFAULT NULL::character varying,
    branch_no character varying(10) DEFAULT NULL::character varying,
    fname character varying(25) DEFAULT NULL::character varying,
    mname character varying(25) DEFAULT NULL::character varying,
    lname character varying(25) DEFAULT NULL::character varying,
    dept character varying(30) DEFAULT NULL::character varying,
    desig character varying(30) DEFAULT NULL::character varying,
    addr character varying(50) DEFAULT NULL::character varying
);


--
-- Name: esdp_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.esdp_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon timestamp without time zone,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.feedback (
    oid integer,
    referenceid character varying(10) DEFAULT NULL::character varying,
    name character varying(30) DEFAULT NULL::character varying,
    email character varying(30) DEFAULT NULL::character varying,
    organisation character varying(30) DEFAULT NULL::character varying,
    designation character varying(20) DEFAULT NULL::character varying,
    address character varying(50) DEFAULT NULL::character varying,
    phone character varying(15) DEFAULT NULL::character varying,
    fax character varying(15) DEFAULT NULL::character varying,
    category character varying(50) DEFAULT NULL::character varying,
    feedback text,
    feedbackdt date,
    status character varying(15) DEFAULT NULL::character varying,
    guestbkentry character(1) DEFAULT NULL::bpchar,
    pendingwith character varying(15) DEFAULT NULL::character varying,
    acktype character varying(50) DEFAULT NULL::character varying,
    ackby character varying(15) DEFAULT NULL::character varying,
    ackdt date,
    replydt date,
    repliedby character varying(15) DEFAULT NULL::character varying,
    comments text,
    createdby character varying(30) DEFAULT NULL::character varying,
    modifiedby character varying(30) DEFAULT NULL::character varying,
    createdon date,
    modifiedon date
);


--
-- Name: feedbackaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.feedbackaction (
    oid character varying(5) DEFAULT NULL::character varying,
    action character varying(20) DEFAULT NULL::character varying,
    actiondt date,
    actionby character varying(15) DEFAULT NULL::character varying,
    pendingwith character varying(15) DEFAULT NULL::character varying,
    comments text
);


--
-- Name: file; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.file (
    file_id integer NOT NULL,
    file_data text
);


--
-- Name: file_tbl; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.file_tbl (
    id bigint NOT NULL,
    file_data text,
    file_date timestamp without time zone
);


--
-- Name: financial_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.financial_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon timestamp without time zone,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: iso_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.iso_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon timestamp without time zone,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: latandlon; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.latandlon (
    id integer NOT NULL,
    lat numeric(10,6) DEFAULT 0.000000 NOT NULL,
    lon numeric(10,6) DEFAULT 0.000000 NOT NULL,
    address character varying(255) DEFAULT ''::character varying NOT NULL
);


--
-- Name: maps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.maps (
    city character(50) DEFAULT NULL::bpchar,
    top character(5) DEFAULT NULL::bpchar,
    left1 character(5) DEFAULT NULL::bpchar
);


--
-- Name: msme_di_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.msme_di_users (
    user_id character varying(25) DEFAULT ''::character varying NOT NULL,
    password character varying(125) NOT NULL,
    role character varying(25) DEFAULT ''::character varying NOT NULL,
    institute character varying(45) NOT NULL
);


--
-- Name: msme_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.msme_users (
    user_id character(125) DEFAULT NULL::bpchar,
    role character(25) DEFAULT NULL::bpchar,
    password character varying(125) DEFAULT NULL::character varying
);


--
-- Name: physical_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.physical_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon date,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: report_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.report_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon date,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: revenue_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.revenue_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon date,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: rolemanagement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rolemanagement (
    role character(15) DEFAULT NULL::bpchar
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    role_id integer,
    role_name character(10) DEFAULT NULL::bpchar
);


--
-- Name: samodule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.samodule (
    oid character varying(6) DEFAULT NULL::character varying,
    abbreviation character varying(6) DEFAULT NULL::character varying,
    description text,
    createdby character varying(30) DEFAULT NULL::character varying,
    createdon date,
    modifiedby character varying(30) DEFAULT NULL::character varying,
    modifiedon date,
    modulename character varying(25) DEFAULT NULL::character varying
);


--
-- Name: samodulepriv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.samodulepriv (
    moduleoid character(6) DEFAULT NULL::bpchar,
    userprivoid character(6) DEFAULT NULL::bpchar
);


--
-- Name: sastate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sastate (
    statecode character(10) DEFAULT NULL::bpchar,
    statename character(50) DEFAULT NULL::bpchar,
    createdon date,
    createdby character(100) DEFAULT NULL::bpchar
);


--
-- Name: sauseraccount; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sauseraccount (
    oid character varying(6) DEFAULT NULL::character varying,
    disabled character(3) DEFAULT NULL::bpchar,
    userid character varying(100) DEFAULT NULL::character varying,
    password character varying(50) DEFAULT NULL::character varying,
    publickey character varying(50) DEFAULT NULL::character varying,
    createdby character varying(100) DEFAULT NULL::character varying,
    createdon date,
    modifiedby character varying(100) DEFAULT NULL::character varying,
    modifiedon date,
    usertype character(2) DEFAULT NULL::bpchar,
    key1 text,
    firstname character varying(30) DEFAULT NULL::character varying,
    lastname character varying(30) DEFAULT NULL::character varying
);


--
-- Name: sauseraccpriv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sauseraccpriv (
    useroid character(50) DEFAULT NULL::bpchar,
    moduleoid character(6) DEFAULT NULL::bpchar,
    userprivoid character(6) DEFAULT NULL::bpchar
);


--
-- Name: sauserpriv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sauserpriv (
    oid character varying(6) DEFAULT NULL::character varying,
    abbreviation character varying(15) DEFAULT NULL::character varying,
    description text,
    createdby character varying(100) DEFAULT NULL::character varying,
    createdon date,
    modifiedby character varying(100) DEFAULT NULL::character varying,
    modifiedon date,
    privname character varying(100) DEFAULT NULL::character varying
);


--
-- Name: specialprogrammes_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specialprogrammes_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon date,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: state; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.state (
    statecode character(6) DEFAULT NULL::bpchar,
    statename character(100) DEFAULT NULL::bpchar,
    createdon date,
    createdby character(100) DEFAULT NULL::bpchar,
    modifiedon date,
    modifiedby character(100) DEFAULT NULL::bpchar
);


--
-- Name: tbl_acr; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_acr (
    sno integer NOT NULL,
    name character varying(200) NOT NULL,
    designation character varying(200) NOT NULL,
    date_of_birth date NOT NULL,
    year2004 character varying(200) NOT NULL,
    status character varying(200) NOT NULL,
    year2005 character varying(200) NOT NULL,
    status1 character varying(200) NOT NULL,
    year2006 character varying(200) NOT NULL,
    status2 character varying(200) NOT NULL,
    year2007 character varying(200) NOT NULL,
    status3 character varying(200) NOT NULL,
    year2008 character varying(200) NOT NULL,
    status4 character varying(200) NOT NULL,
    year2009 character varying(200) NOT NULL,
    status5 character varying(200) NOT NULL,
    year2010 character varying(200) NOT NULL,
    status6 character varying(200) NOT NULL,
    year2011 character varying(200) NOT NULL,
    status7 character varying(200) NOT NULL,
    year2012 character varying(200) NOT NULL,
    status8 character varying(200) NOT NULL,
    year2013 character varying(200) NOT NULL,
    status9 character varying(200) NOT NULL,
    year2014 character varying(200) NOT NULL,
    status10 character varying(200) NOT NULL,
    year2000 character varying(200) NOT NULL,
    status11 character varying(200) NOT NULL,
    year2001 character varying(200) NOT NULL,
    status12 character varying(200) NOT NULL,
    year2002 character varying(200) NOT NULL,
    status13 character varying(200) NOT NULL,
    year2003 character varying(200) NOT NULL,
    status14 character varying(200) NOT NULL,
    user_id character varying(245) DEFAULT NULL::character varying
);


--
-- Name: tbl_acr_record; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_acr_record (
    sno integer NOT NULL,
    name character varying(45) NOT NULL,
    employee_history integer NOT NULL,
    employee_history1 character varying(445) NOT NULL
);


--
-- Name: tbl_b; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_b (
    inst_id character varying(50) DEFAULT NULL::character varying,
    months character varying(50) DEFAULT NULL::character varying,
    years integer,
    months_year timestamp without time zone,
    cry_fwd_amt numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_dm numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_cum numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_bal numeric(28,2) DEFAULT NULL::numeric,
    gia_amt numeric(28,2) DEFAULT NULL::numeric,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm numeric(28,2) DEFAULT NULL::numeric,
    gia_util_cum numeric(28,2) DEFAULT NULL::numeric,
    gia_util_bal numeric(28,2) DEFAULT NULL::numeric,
    budget_total_amt numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_dm numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_cum numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_bal numeric(28,2) DEFAULT NULL::numeric,
    details_visit character varying(425) DEFAULT NULL::character varying,
    machine_dtm numeric(28,0) DEFAULT NULL::numeric,
    machine_cum numeric(28,0) DEFAULT NULL::numeric,
    significant character varying(430) DEFAULT NULL::character varying,
    shorts_fall character varying(428) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying
);


--
-- Name: tbl_br_senet; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_br_senet (
    inst_id character varying(145) DEFAULT NULL::character varying,
    months integer,
    "smallint" character varying(145) DEFAULT NULL::character varying,
    branch character varying(145) DEFAULT NULL::character varying,
    br_hardware_target integer,
    br_hardware_tomonth integer,
    br_hardware_upto integer,
    br_con_target integer,
    br_con_tomonth integer,
    br_con_upto integer
);


--
-- Name: tbl_budget; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(125) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    cry_fwd_amt numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_dm numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_cum numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_bal numeric(28,2) NOT NULL,
    gia_amt numeric(28,2) DEFAULT NULL::numeric,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm numeric(28,2) DEFAULT NULL::numeric,
    gia_util_cum numeric(28,2) DEFAULT NULL::numeric,
    gia_util_bal numeric(28,2) DEFAULT NULL::numeric,
    budget_total_amt numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_dm numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_cum numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_bal numeric(28,2) DEFAULT NULL::numeric,
    details_visit character varying(1425) DEFAULT NULL::character varying,
    machine_dtm numeric(28,2) DEFAULT NULL::numeric,
    machine_cum numeric(28,2) DEFAULT NULL::numeric,
    significant text DEFAULT NULL::character varying,
    shorts_fall character varying(1428) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    newtext character varying(5000) DEFAULT ' '::character varying
);


--
-- Name: tbl_budget_123; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget_123 (
    inst_id character varying(10) DEFAULT NULL::character varying,
    months character varying(20) DEFAULT NULL::character varying,
    years numeric(10,0) DEFAULT NULL::numeric,
    months_year date,
    cry_fwd_amt numeric(10,2) DEFAULT NULL::numeric,
    cry_fwd_util_dm numeric(10,2) DEFAULT NULL::numeric,
    cry_fwd_util_cum numeric(10,2) DEFAULT NULL::numeric,
    cry_fwd_util_bal numeric(10,2) DEFAULT NULL::numeric,
    gia_amt numeric(10,2) DEFAULT NULL::numeric,
    stf_st_ss_a numeric(10,2) DEFAULT NULL::numeric,
    stf_st_ss_b numeric(10,2) DEFAULT NULL::numeric,
    stf_st_ss_c numeric(10,2) DEFAULT NULL::numeric,
    stf_st_ss_d numeric(10,2) DEFAULT NULL::numeric,
    stf_st_pos_a numeric(10,2) DEFAULT NULL::numeric,
    stf_st_pos_b numeric(10,2) DEFAULT NULL::numeric,
    stf_st_pos_c numeric(10,2) DEFAULT NULL::numeric,
    stf_st_pos_d numeric(10,2) DEFAULT NULL::numeric,
    gia_util_dm numeric(10,2) DEFAULT NULL::numeric,
    gia_util_cum numeric(10,2) DEFAULT NULL::numeric,
    gia_util_bal numeric(10,2) DEFAULT NULL::numeric,
    budget_total_amt numeric(10,2) DEFAULT NULL::numeric,
    budget_total_util_dm numeric(10,2) DEFAULT NULL::numeric,
    budget_total_util_cum numeric(10,2) DEFAULT NULL::numeric,
    budget_total_util_bal numeric(10,2) DEFAULT NULL::numeric,
    details_visit character varying(1000) DEFAULT NULL::character varying,
    machine_dtm numeric(10,2) DEFAULT NULL::numeric,
    machine_cum numeric(10,2) DEFAULT NULL::numeric,
    significant character varying(1000) DEFAULT NULL::character varying,
    shorts_fall character varying(1000) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying
);


--
-- Name: tbl_budget_bk; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget_bk (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(125) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    cry_fwd_amt numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_dm numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_cum numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_bal numeric(28,2) NOT NULL,
    gia_amt numeric(28,2) DEFAULT NULL::numeric,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm numeric(28,2) DEFAULT NULL::numeric,
    gia_util_cum numeric(28,2) DEFAULT NULL::numeric,
    gia_util_bal numeric(28,2) DEFAULT NULL::numeric,
    budget_total_amt numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_dm numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_cum numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_bal numeric(28,2) DEFAULT NULL::numeric,
    details_visit character varying(1425) DEFAULT NULL::character varying,
    machine_dtm numeric(28,2) DEFAULT NULL::numeric,
    machine_cum numeric(28,2) DEFAULT NULL::numeric,
    significant character varying(1430) DEFAULT NULL::character varying,
    shorts_fall character varying(1428) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying
);


--
-- Name: tbl_budget_bk1; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget_bk1 (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(125) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    cry_fwd_amt numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_dm numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_cum numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_bal numeric(28,2) NOT NULL,
    gia_amt numeric(28,2) DEFAULT NULL::numeric,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm numeric(28,2) DEFAULT NULL::numeric,
    gia_util_cum numeric(28,2) DEFAULT NULL::numeric,
    gia_util_bal numeric(28,2) DEFAULT NULL::numeric,
    budget_total_amt numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_dm numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_cum numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_bal numeric(28,2) DEFAULT NULL::numeric,
    details_visit character varying(1425) DEFAULT NULL::character varying,
    machine_dtm numeric(28,2) DEFAULT NULL::numeric,
    machine_cum numeric(28,2) DEFAULT NULL::numeric,
    significant character varying(1430) DEFAULT NULL::character varying,
    shorts_fall character varying(1428) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying
);


--
-- Name: tbl_budget_bkp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget_bkp (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(125) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    cry_fwd_amt numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_dm numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_cum numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_bal numeric(28,2) NOT NULL,
    gia_amt numeric(28,2) DEFAULT NULL::numeric,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm numeric(28,2) DEFAULT NULL::numeric,
    gia_util_cum numeric(28,2) DEFAULT NULL::numeric,
    gia_util_bal numeric(28,2) DEFAULT NULL::numeric,
    budget_total_amt numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_dm numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_cum numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_bal numeric(28,2) DEFAULT NULL::numeric,
    details_visit character varying(1425) DEFAULT NULL::character varying,
    machine_dtm numeric(28,2) DEFAULT NULL::numeric,
    machine_cum numeric(28,2) DEFAULT NULL::numeric,
    significant character varying(1430) DEFAULT NULL::character varying,
    shorts_fall character varying(1428) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying
);


--
-- Name: tbl_budget_copy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget_copy (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(125) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    cry_fwd_amt numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_dm numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_cum numeric(28,2) DEFAULT NULL::numeric,
    cry_fwd_util_bal numeric(28,2) NOT NULL,
    gia_amt numeric(28,2) DEFAULT NULL::numeric,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm numeric(28,2) DEFAULT NULL::numeric,
    gia_util_cum numeric(28,2) DEFAULT NULL::numeric,
    gia_util_bal numeric(28,2) DEFAULT NULL::numeric,
    budget_total_amt numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_dm numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_cum numeric(28,2) DEFAULT NULL::numeric,
    budget_total_util_bal numeric(28,2) DEFAULT NULL::numeric,
    details_visit character varying(1425) DEFAULT NULL::character varying,
    machine_dtm numeric(28,2) DEFAULT NULL::numeric,
    machine_cum numeric(28,2) DEFAULT NULL::numeric,
    significant character varying(1430) DEFAULT NULL::character varying,
    shorts_fall character varying(1428) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    newtext character varying(5000) DEFAULT ' '::character varying
);


--
-- Name: tbl_budget_old; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget_old (
    inst_id character varying(10) DEFAULT NULL::character varying,
    months character varying(20) DEFAULT NULL::character varying,
    years integer,
    months_year date,
    cry_fwd_amt integer,
    cry_fwd_util_dm integer,
    cry_fwd_util_cum integer,
    cry_fwd_util_bal integer,
    gia_amt integer,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm integer,
    gia_util_cum integer,
    gia_util_bal integer,
    budget_total_amt integer,
    budget_total_util_dm integer,
    budget_total_util_cum integer,
    budget_total_util_bal integer,
    machine_dtm integer,
    machine_cum integer,
    significant text,
    shorts_fall text,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    details_visit text,
    significant_1 text,
    shorts_fall_1 text
);


--
-- Name: tbl_budget_old_19july2010; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_budget_old_19july2010 (
    inst_id character varying(10) DEFAULT NULL::character varying,
    months character varying(20) DEFAULT NULL::character varying,
    years integer,
    months_year date,
    cry_fwd_amt integer,
    cry_fwd_util_dm integer,
    cry_fwd_util_cum integer,
    cry_fwd_util_bal integer,
    gia_amt integer,
    stf_st_ss_a integer,
    stf_st_ss_b integer,
    stf_st_ss_c integer,
    stf_st_ss_d integer,
    stf_st_pos_a integer,
    stf_st_pos_b integer,
    stf_st_pos_c integer,
    stf_st_pos_d integer,
    gia_util_dm integer,
    gia_util_cum integer,
    gia_util_bal integer,
    budget_total_amt integer,
    budget_total_util_dm integer,
    budget_total_util_cum integer,
    budget_total_util_bal integer,
    details_visit text,
    machine_dtm integer,
    machine_cum integer,
    significant text,
    shorts_fall text,
    sisi_nm character varying(50) DEFAULT NULL::character varying
);


--
-- Name: tbl_cabinet_summary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_cabinet_summary (
    inst_id character varying(10) DEFAULT ''::character varying NOT NULL,
    months character varying(20) NOT NULL,
    years integer NOT NULL,
    months_year date,
    rte_content text,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    rte_content_n text
);


--
-- Name: tbl_course_txn; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_course_txn (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    target integer,
    dtm integer,
    commulative integer,
    dates character varying(425) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    course_name character varying(113) DEFAULT NULL::character varying
);


--
-- Name: tbl_course_txn_13112023; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_course_txn_13112023 (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    target integer,
    dtm integer,
    commulative integer,
    dates character varying(425) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    course_name character varying(113) DEFAULT NULL::character varying
);


--
-- Name: tbl_course_txn_bk1; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_course_txn_bk1 (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    target integer,
    dtm integer,
    commulative integer,
    dates character varying(425) DEFAULT NULL::character varying,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    course_name character varying(113) DEFAULT NULL::character varying
);


--
-- Name: tbl_course_txn_new; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_course_txn_new (
    course_index integer,
    inst_id character(10) DEFAULT NULL::bpchar,
    months character(10) DEFAULT NULL::bpchar,
    years integer,
    target integer,
    dtm integer,
    commulative integer,
    dates date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    course_name character(100) DEFAULT NULL::bpchar
);


--
-- Name: tbl_course_txn_old_19july2010; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_course_txn_old_19july2010 (
    inst_id character(10) DEFAULT NULL::bpchar,
    months character(10) DEFAULT NULL::bpchar,
    years integer,
    target integer,
    dtm integer,
    commulative integer,
    dates date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    course_name character(100) DEFAULT NULL::bpchar
);


--
-- Name: tbl_court_syn; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_court_syn (
    sno integer NOT NULL,
    court_name character varying(145) NOT NULL,
    court_abbrv character varying(145) NOT NULL
);


--
-- Name: tbl_di_institute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_di_institute (
    id integer,
    inst_id character(10) DEFAULT NULL::bpchar,
    inst_name character(200) DEFAULT NULL::bpchar,
    inst_address character(200) DEFAULT NULL::bpchar
);


--
-- Name: tbl_di_target; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_di_target (
    instid character(25) NOT NULL,
    years integer NOT NULL,
    imc integer,
    edp_nonstiphen integer,
    edp_stiphen_w integer,
    edp_stiphen_sc integer,
    edp_stiphen_st integer,
    edp_sanction integer,
    esdp_nonstiphen_gen integer,
    esdp_nonstiphen_sc integer,
    esdp_nonstiphen_st integer,
    esdp_stiphen_w integer,
    esdp_stiphen_sc integer,
    esdp_stiphen_st integer,
    esdp_sanction integer,
    mdp integer,
    bsdp_gen integer,
    bsdp_sc integer,
    bsdp_st integer,
    esdpbiotech integer,
    msme_di character(100) DEFAULT NULL::bpchar
);


--
-- Name: tbl_di_target_month; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_di_target_month (
    instid character(10) DEFAULT NULL::bpchar,
    years integer,
    month character(100) DEFAULT NULL::bpchar,
    esdp integer,
    edp integer,
    mdp integer,
    esdp_biotech integer,
    imc integer,
    bsdp integer,
    inst_name character(100) DEFAULT NULL::bpchar
);


--
-- Name: tbl_di_target_ner; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_di_target_ner (
    instid character(25) DEFAULT NULL::bpchar,
    years integer,
    imc integer,
    edp_nonstiphen integer,
    edp_stiphen_w integer,
    edp_stiphen_sc integer,
    edp_stiphen_st integer,
    edp_sanction integer,
    esdp_nonstiphen_gen integer,
    esdp_nonstiphen_sc integer,
    esdp_nonstiphen_st integer,
    esdp_stiphen_w integer,
    esdp_stiphen_sc integer,
    esdp_stiphen_st integer,
    esdp_sanction integer,
    mdp integer,
    bsdp_gen integer,
    bsdp_sc integer,
    bsdp_st integer,
    esdpbiotech integer,
    msme_di character(100) DEFAULT NULL::bpchar
);


--
-- Name: tbl_dis_entry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_dis_entry (
    id_no integer,
    inst_id character(10) DEFAULT NULL::bpchar,
    years integer,
    months character(20) DEFAULT NULL::bpchar,
    program_name character(100) DEFAULT NULL::bpchar,
    program_div character(100) DEFAULT NULL::bpchar,
    program_type character(100) DEFAULT NULL::bpchar,
    yearly_target integer,
    target_report_month integer,
    achiv_report_month integer,
    expenditure integer,
    sc_m integer,
    sc_f integer,
    st_m integer,
    st_f integer,
    obc_m integer,
    obc_f integer,
    budhist_m integer,
    budhist_f integer,
    christian_m integer,
    christian_f integer,
    muslim_m integer,
    muslim_f integer,
    parsi_m integer,
    parsi_f integer,
    sikh_m integer,
    sikh_f integer,
    others_m integer,
    others_f integer,
    adv_drawn_di_month integer,
    no_prog_report_month integer,
    creation_date date,
    ph_m integer,
    ph_f integer,
    sno integer,
    total_m integer,
    total_f integer
);


--
-- Name: tbl_employee_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_employee_details (
    sno integer NOT NULL,
    employee_history date NOT NULL,
    employee_history1 date NOT NULL,
    place character varying(45) NOT NULL,
    name character varying(45) NOT NULL,
    date_of_joining date NOT NULL,
    reference_number character varying(45) NOT NULL,
    date_of_joining_inmsme date NOT NULL,
    current character varying(45) NOT NULL,
    promtion_details character varying(45) NOT NULL,
    division_workingon character varying(45) NOT NULL,
    date_of_confirmation date NOT NULL,
    reference date NOT NULL,
    recuritment character varying(45) NOT NULL,
    remarks character varying(245) NOT NULL
);


--
-- Name: tbl_esdp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_esdp (
    sno integer NOT NULL,
    instid character varying(45) NOT NULL,
    months integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    esdp2 integer NOT NULL,
    esdp3 integer NOT NULL,
    edp2 integer NOT NULL,
    edp3 integer NOT NULL,
    bsdp2 integer NOT NULL,
    bsdp3 integer NOT NULL,
    mdp2 integer NOT NULL,
    mdp3 integer NOT NULL,
    sdp2 integer NOT NULL,
    sdp3 integer NOT NULL,
    imc2 integer NOT NULL,
    imc3 integer NOT NULL,
    other2 integer NOT NULL,
    other3 integer NOT NULL,
    user_date character varying(45) NOT NULL,
    esdp4 integer NOT NULL,
    esdp5 integer NOT NULL,
    edp4 integer NOT NULL,
    edp5 integer NOT NULL,
    bsdp4 integer NOT NULL,
    bsdp5 integer NOT NULL,
    mdp4 integer NOT NULL,
    mdp5 integer NOT NULL,
    imc4 integer NOT NULL,
    imc5 integer NOT NULL,
    other4 integer NOT NULL,
    other5 integer NOT NULL,
    sdp4 integer NOT NULL,
    sdp5 integer NOT NULL,
    esdp1 integer NOT NULL,
    edp1 integer NOT NULL,
    bsdp1 integer NOT NULL,
    mdp1 integer NOT NULL,
    sdp1 integer NOT NULL,
    imc1 integer NOT NULL,
    other1 integer NOT NULL
);


--
-- Name: tbl_feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_feedback (
    sno integer NOT NULL,
    txtname character varying(345) NOT NULL,
    txtdesignation character varying(345) NOT NULL,
    txtorganization character varying(345) NOT NULL,
    txtaddress character varying(345) NOT NULL,
    telephone character varying(345) NOT NULL,
    query character varying(345) NOT NULL,
    email character varying(345) NOT NULL,
    randomno character varying(45) DEFAULT NULL::character varying
);


--
-- Name: tbl_financial_sno_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tbl_financial_sno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tbl_financial; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_financial (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    months_year character varying(125) NOT NULL,
    rev_ear_cash_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_target integer,
    rev_ear_cash_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_target integer,
    rev_ear_cash_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_target integer,
    rev_ear_cash_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_target integer,
    rev_ear_accrual_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_target integer,
    rev_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    test_cal_services_target integer,
    test_cal_services_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_mon numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_target integer,
    test_cal_services_acc_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_mon numeric(28,2) DEFAULT NULL::numeric,
    sno integer DEFAULT nextval('public.tbl_financial_sno_seq'::regclass) NOT NULL,
    rev_ear_csh_bas_consult_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_consult_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_consult_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_consult_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_consult_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_consult_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_tooling_target integer DEFAULT 0,
    rev_ear_cash_prdtn_tooling_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_cash_prdtn_tooling_cum numeric(28,2) DEFAULT 0.00,
    rev_ear_cash_prdtn_otherjob_target integer DEFAULT 0,
    rev_ear_cash_prdtn_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_cash_prdtn_otherjob_cum numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_tooling_target integer DEFAULT 0,
    rev_ear_accrual_prdtn_tooling_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_tooling_cum numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_otherjob_target integer DEFAULT 0,
    rev_ear_accrual_prdtn_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_otherjob_cum numeric(28,2) DEFAULT 0.00
);


--
-- Name: tbl_financial_bk; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_financial_bk (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    months_year character varying(125) NOT NULL,
    rev_ear_cash_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_target integer,
    rev_ear_cash_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_target integer,
    rev_ear_cash_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_target integer,
    rev_ear_cash_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_target integer,
    rev_ear_accrual_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_target integer,
    rev_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    test_cal_services_target integer,
    test_cal_services_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_mon numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_target integer,
    test_cal_services_acc_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_mon numeric(28,2) DEFAULT NULL::numeric,
    sno integer DEFAULT 0 NOT NULL
);


--
-- Name: tbl_financial_bk1; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_financial_bk1 (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    months_year character varying(125) NOT NULL,
    rev_ear_cash_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_target integer,
    rev_ear_cash_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_target integer,
    rev_ear_cash_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_target integer,
    rev_ear_cash_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_target integer,
    rev_ear_accrual_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_target integer,
    rev_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    test_cal_services_target integer,
    test_cal_services_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_mon numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_target integer,
    test_cal_services_acc_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_mon numeric(28,2) DEFAULT NULL::numeric,
    sno integer DEFAULT 0 NOT NULL
);


--
-- Name: tbl_financial_copy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_financial_copy (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    months_year character varying(125) NOT NULL,
    rev_ear_cash_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_target integer,
    rev_ear_cash_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_target integer,
    rev_ear_cash_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_target integer,
    rev_ear_cash_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_trng_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_target integer,
    rev_ear_accrual_prdtn_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_misc_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_total_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_target integer,
    rev_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    inc_exp_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_cash_cum numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_target numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_dtm numeric(28,2) DEFAULT NULL::numeric,
    per_rec_accrual_cum numeric(28,2) DEFAULT NULL::numeric,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    test_cal_services_target integer,
    test_cal_services_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_mon numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_target integer,
    test_cal_services_acc_dtm numeric(28,2) DEFAULT NULL::numeric,
    test_cal_services_acc_mon numeric(28,2) DEFAULT NULL::numeric,
    sno integer DEFAULT 0 NOT NULL,
    rev_ear_csh_bas_consult_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_consult_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_consult_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_consult_target numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_consult_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_consult_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_tooling_target integer DEFAULT 0,
    rev_ear_cash_prdtn_tooling_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_cash_prdtn_tooling_cum numeric(28,2) DEFAULT 0.00,
    rev_ear_cash_prdtn_otherjob_target integer DEFAULT 0,
    rev_ear_cash_prdtn_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_cash_prdtn_otherjob_cum numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_tooling_target integer DEFAULT 0,
    rev_ear_accrual_prdtn_tooling_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_tooling_cum numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_otherjob_target integer DEFAULT 0,
    rev_ear_accrual_prdtn_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    rev_ear_accrual_prdtn_otherjob_cum numeric(28,2) DEFAULT 0.00
);


--
-- Name: tbl_financial_mpr; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_financial_mpr (
    rev_ear_csh_bas_trng_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_trng_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_trng_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_trng_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_prdn_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_prdn_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_prdn_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_prdn_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_target numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_dtm numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_mon numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_misc_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_misc_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_misc_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_misc_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_total_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_total_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_total_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_csh_bas_total_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_trng_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_trng_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_trng_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_trng_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_prdn_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_prdn_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_prdn_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_prdn_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_acc_target numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_acc_dtm numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_acc_mon numeric(10,2) DEFAULT NULL::numeric,
    test_cal_services_acc_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_misc_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_misc_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_misc_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_misc_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_total_target numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_total_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_total_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_ear_accl_bas_total_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_cash_bas_target numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_cash_bas_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_cash_bas_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_cash_bas_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_accl_bas_target numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_accl_bas_dtm numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_accl_bas_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    rev_exp_accl_bas_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_cash_bas_target numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_cash_bas_dtm numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_cash_bas_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_cash_bas_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_accl_bas_target numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_accl_bas_dtm numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_accl_bas_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    exc_exp_accl_bas_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    per_rec_cash_bas_target numeric(10,2) DEFAULT NULL::numeric,
    per_rec_cash_bas_dtm numeric(10,2) DEFAULT NULL::numeric,
    per_rec_cash_bas_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    per_rec_cash_bas_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    per_rec_accl_bas_target numeric(10,2) DEFAULT NULL::numeric,
    per_rec_accl_bas_dtm numeric(10,2) DEFAULT NULL::numeric,
    per_rec_accl_bas_cumu_mon numeric(10,2) DEFAULT NULL::numeric,
    per_rec_accl_bas_cumu_annu numeric(10,2) DEFAULT NULL::numeric,
    inst_id character varying(45) NOT NULL,
    months character varying(45) NOT NULL,
    years integer NOT NULL,
    months_year date NOT NULL
);


--
-- Name: tbl_financial_old_19july2010; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_financial_old_19july2010 (
    inst_id character(10) DEFAULT NULL::bpchar,
    months character(20) DEFAULT NULL::bpchar,
    years integer,
    months_year date,
    rev_ear_cash_trng_target integer,
    rev_ear_cash_trng_dtm integer,
    rev_ear_cash_trng_cum integer,
    rev_ear_cash_prdtn_target integer,
    rev_ear_cash_prdtn_dtm integer,
    rev_ear_cash_prdtn_cum integer,
    rev_ear_cash_misc_target integer,
    rev_ear_cash_misc_dtm integer,
    rev_ear_cash_misc_cum integer,
    rev_ear_cash_total_target integer,
    rev_ear_cash_total_dtm integer,
    rev_ear_cash_total_cum integer,
    rev_ear_accrual_trng_target integer,
    rev_ear_accrual_trng_dtm integer,
    rev_ear_accrual_trng_cum integer,
    rev_ear_accrual_prdtn_target integer,
    rev_ear_accrual_prdtn_dtm integer,
    rev_ear_accrual_prdtn_cum integer,
    rev_ear_accrual_misc_target integer,
    rev_ear_accrual_misc_dtm integer,
    rev_ear_accrual_misc_cum integer,
    rev_ear_accrual_total_target integer,
    rev_ear_accrual_total_dtm integer,
    rev_ear_accrual_total_cum integer,
    rev_exp_cash_target integer,
    rev_exp_cash_dtm integer,
    rev_exp_cash_cum integer,
    rev_exp_accrual_target integer,
    rev_exp_accrual_dtm integer,
    rev_exp_accrual_cum integer,
    inc_exp_cash_target integer,
    inc_exp_cash_dtm integer,
    inc_exp_cash_cum integer,
    inc_exp_accrual_target integer,
    inc_exp_accrual_dtm integer,
    inc_exp_accrual_cum integer,
    per_rec_cash_target integer,
    per_rec_cash_dtm integer,
    per_rec_cash_cum integer,
    per_rec_accrual_target integer,
    per_rec_accrual_dtm integer,
    per_rec_accrual_cum integer,
    sisi_nm character(50) DEFAULT NULL::bpchar
);


--
-- Name: tbl_industrial_profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_industrial_profile (
    filename character varying(245) NOT NULL,
    state character varying(245) DEFAULT NULL::character varying,
    msmedi character varying(245) DEFAULT NULL::character varying,
    district character varying(245) DEFAULT NULL::character varying
);


--
-- Name: tbl_ip_registry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_ip_registry (
    role character(3) DEFAULT NULL::bpchar,
    date_of_visiting date,
    user_id character(20) DEFAULT NULL::bpchar,
    ip_address character(20) DEFAULT NULL::bpchar
);


--
-- Name: tbl_iso; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_iso (
    currdate date,
    name_o_unit character(100) DEFAULT NULL::bpchar,
    chan_propri character(100) DEFAULT NULL::bpchar,
    loc_unit character(100) DEFAULT NULL::bpchar,
    cor_off_addr character(100) DEFAULT NULL::bpchar,
    con_tel_no character(100) DEFAULT NULL::bpchar,
    con_fax_no character(100) DEFAULT NULL::bpchar,
    con_email character(100) DEFAULT NULL::bpchar,
    con_web_add character(100) DEFAULT NULL::bpchar,
    type_of_unit character(100) DEFAULT NULL::bpchar,
    size_unit character(100) DEFAULT NULL::bpchar,
    manu_details character(100) DEFAULT NULL::bpchar,
    pro_rd_act character(98) DEFAULT NULL::bpchar,
    pro_test_lab character(100) DEFAULT NULL::bpchar,
    pro_sal_ser character(100) DEFAULT NULL::bpchar,
    turn_over character(100) DEFAULT NULL::bpchar,
    profit character(100) DEFAULT NULL::bpchar,
    man_details character(100) DEFAULT NULL::bpchar,
    mark_dos_inter character(100) DEFAULT NULL::bpchar,
    em_no_details character(100) DEFAULT NULL::bpchar,
    type_iso character(100) DEFAULT NULL::bpchar,
    date_imp_iso character(100) DEFAULT NULL::bpchar,
    curr_stat character(100) DEFAULT NULL::bpchar,
    subsidy character(100) DEFAULT NULL::bpchar,
    category character(100) DEFAULT NULL::bpchar,
    details_of_inter_st character(100) DEFAULT NULL::bpchar,
    brand_adop character(100) DEFAULT NULL::bpchar,
    other_info character(100) DEFAULT NULL::bpchar,
    iso_code integer
);


--
-- Name: tbl_iso_mapping; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_iso_mapping (
    user_id character(25) DEFAULT NULL::bpchar,
    inst_id character(25) DEFAULT NULL::bpchar,
    tr_cat_id integer
);


--
-- Name: tbl_isotarget; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_isotarget (
    sno integer NOT NULL,
    iso_gen character varying(45) NOT NULL,
    iso_ner character varying(45) NOT NULL,
    iso_scp character varying(45) NOT NULL,
    iso_tsp character varying(45) NOT NULL,
    iso_wom character varying(45) NOT NULL,
    inst_id character varying(45) NOT NULL,
    "smallint" character varying(45) NOT NULL
);


--
-- Name: tbl_judical_detail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_judical_detail (
    sno integer NOT NULL,
    serial_number character varying(245) NOT NULL,
    detail_of_case character varying(245) NOT NULL,
    date_of_entry date NOT NULL,
    stakes_involved character varying(245) NOT NULL,
    status character varying(245) NOT NULL,
    detail_of_application character varying(245) NOT NULL,
    present_status_of_the_case character varying(245) NOT NULL,
    months character varying(45) NOT NULL,
    "smallint" integer NOT NULL,
    inst_id character varying(45) NOT NULL,
    nature_of_court character varying(145) NOT NULL,
    controlling_officers character varying(145) NOT NULL,
    date_of_next_hearing date NOT NULL,
    expected_date_of_filing date NOT NULL,
    affidavit_date_of_filing_ca date NOT NULL,
    cases_related_to character varying(45) NOT NULL,
    year_of_case integer NOT NULL,
    status_of_case character varying(145) NOT NULL
);


--
-- Name: tbl_library; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_library (
    sno integer NOT NULL,
    inst_id character varying(45) NOT NULL,
    months character varying(45) NOT NULL,
    "smallint" character varying(45) NOT NULL,
    amc_of_pc1 integer,
    amc_of_pc2 integer,
    amc_of_pc integer,
    br_hardware_target integer DEFAULT 0,
    br_hardware_tomonth integer DEFAULT 0,
    br_hardware_upto integer DEFAULT 0,
    br_hardware_target_1 integer DEFAULT 0,
    br_hardware_tomonth_1 integer DEFAULT 0,
    br_hardware_upto_1 integer DEFAULT 0,
    br_hardware_target_2 integer DEFAULT 0,
    br_hardware_tomonth_2 integer DEFAULT 0,
    br_hardware_upto_2 integer DEFAULT 0,
    br_hardware_target_3 integer DEFAULT 0,
    br_hardware_tomonth_3 integer DEFAULT 0,
    br_hardware_upto_3 integer DEFAULT 0,
    br_hardware_target_4 integer DEFAULT 0,
    br_hardware_tomonth_4 integer DEFAULT 0,
    br_hardware_upto_4 integer DEFAULT 0,
    br_hardware_target_5 integer DEFAULT 0,
    br_hardware_tomonth_5 integer DEFAULT 0,
    br_hardware_upto_5 integer DEFAULT 0
);


--
-- Name: tbl_lofin_detail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_lofin_detail (
    sno integer NOT NULL,
    name character varying(145) NOT NULL,
    cmbins character varying(145) NOT NULL,
    role character varying(145) NOT NULL,
    ip_address character varying(145) NOT NULL,
    datetim character varying(45) DEFAULT NULL::character varying
);


--
-- Name: tbl_login; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_login (
    sno integer NOT NULL,
    name character varying(45) NOT NULL,
    cmbins character varying(45) NOT NULL,
    role character varying(45) NOT NULL,
    ip_address character varying(45) NOT NULL,
    datetim character varying(245) NOT NULL,
    action character varying(45) DEFAULT NULL::character varying,
    status character varying(145) DEFAULT NULL::character varying
);


--
-- Name: tbl_login_detail_courtcases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_login_detail_courtcases (
    sno integer NOT NULL,
    name character varying(145) NOT NULL,
    cmbins character varying(415) NOT NULL,
    role character varying(415) NOT NULL,
    ip_address character varying(145) NOT NULL
);


--
-- Name: tbl_month; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_month (
    sno integer NOT NULL,
    months integer NOT NULL,
    mon character varying(45) NOT NULL
);


--
-- Name: tbl_msme_di_amc; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_msme_di_amc (
    sno integer,
    msme_di character varying(100) DEFAULT NULL::character varying,
    amc_of_pcs integer,
    web_maint integer,
    leased_line integer,
    contingenciess integer,
    hw_sw integer,
    total integer,
    sanction_no text,
    sanction_date date,
    "smallint" integer,
    month character varying(20) DEFAULT NULL::character varying
);


--
-- Name: tbl_msme_di_unspent_fund; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_msme_di_unspent_fund (
    months character(20) DEFAULT NULL::bpchar,
    years character(20) DEFAULT NULL::bpchar,
    sno integer,
    msme_di character(100) DEFAULT NULL::bpchar,
    amc_of_pcs integer,
    web_maint integer,
    leased_line integer,
    contingenciess integer,
    hw_sw integer,
    total integer
);


--
-- Name: tbl_personaldata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_personaldata (
    sno integer NOT NULL,
    name character varying(45) NOT NULL,
    date_of_birth date NOT NULL,
    telenumber integer NOT NULL,
    mobnumber integer NOT NULL,
    address character varying(445) NOT NULL,
    family character varying(445) NOT NULL,
    designation character varying(245) NOT NULL,
    caste character varying(245) NOT NULL,
    discipline character varying(245) NOT NULL,
    date_of_superannuation date NOT NULL,
    uname character varying(245) NOT NULL
);


--
-- Name: tbl_phonebook; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_phonebook (
    sno integer NOT NULL,
    name character varying(145) NOT NULL,
    address character varying(445) NOT NULL,
    division character varying(145) DEFAULT NULL::character varying,
    designation character varying(145) DEFAULT NULL::character varying,
    phonenumber integer,
    mobilenumber character varying(45) DEFAULT NULL::character varying
);


--
-- Name: tbl_physical; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_physical (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(625) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    nju_msme_no_target integer,
    nju_msme_no_dtm integer,
    nju_msme_no_cum integer,
    nju_msme_value_target integer,
    nju_msme_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_msme_value_cum numeric(28,2) DEFAULT NULL::numeric,
    nju_other_no_target integer,
    nju_other_no_dtm integer,
    nju_other_no_cum integer,
    nju_other_value_target integer,
    nju_other_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_other_value_cum numeric(28,2) DEFAULT NULL::numeric,
    conslt_msme_target integer,
    conslt_msme_dtm integer,
    conslt_msme_cum integer,
    conslt_other_target integer,
    conslt_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    conslt_other_cum integer,
    any_other_target integer,
    any_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    any_other_cum integer,
    ta_ltc_target integer,
    ta_ltc_dtm integer,
    ta_ltc_cum integer,
    ta_stc_ncc_target integer,
    ta_stc_ncc_dtm integer,
    ta_stc_ncc_cum integer,
    ta_stc_ntt_target integer,
    ta_stc_ntt_dtm integer,
    ta_stc_ntt_cum integer,
    ta_others_target integer,
    ta_others_dtm integer,
    ta_others_cum integer,
    seminar_no_target integer,
    seminar_no_dtm integer,
    seminar_no_cum integer,
    seminar_participants_target integer,
    seminar_participants_dtm integer,
    seminar_participants_cum integer,
    ttb_dtm_sc integer,
    ttb_dtm_st integer,
    ttb_dtm_women integer,
    ttb_dtm_obc integer,
    ttb_dtm_ph integer,
    ttb_dtm_min integer,
    ttb_dtm_total integer,
    ttb_cum_sc integer,
    ttb_cum_st integer,
    ttb_cum_women integer,
    ttb_cum_obc integer,
    ttb_cum_ph integer,
    ttb_cum_min integer,
    ttb_cum_total integer,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    trng_total_noc_cumu_mon integer,
    trng_total_noc_dtm integer,
    tring_total_not_dtm integer,
    tring_total_not_cum integer,
    general_ttb integer,
    general_cum integer,
    gen integer DEFAULT 0,
    men integer DEFAULT 0,
    transgender integer DEFAULT 0,
    tenfail integer DEFAULT 0,
    tenpass integer DEFAULT 0,
    twelth integer DEFAULT 0,
    graduation integer DEFAULT 0,
    pg integer DEFAULT 0,
    limit1 integer DEFAULT 0,
    limit2 integer DEFAULT 0,
    limit3 integer DEFAULT 0,
    limit4 integer DEFAULT 0,
    gen_cum integer DEFAULT 0,
    men_cum integer DEFAULT 0,
    transgender_cum integer DEFAULT 0,
    tenfail_cum integer DEFAULT 0,
    tenpass_cum integer DEFAULT 0,
    twelth_cum integer DEFAULT 0,
    graduation_cum integer DEFAULT 0,
    pg_cum integer DEFAULT 0,
    limit1_cum integer DEFAULT 0,
    limit2_cum integer DEFAULT 0,
    limit3_cum integer DEFAULT 0,
    limit4_cum integer DEFAULT 0,
    above integer DEFAULT 0,
    abovec integer DEFAULT 0,
    diploma integer DEFAULT 0,
    diplomac integer DEFAULT 0,
    iti integer DEFAULT 0,
    graduation_nontech integer DEFAULT 0,
    graduation_tech integer DEFAULT 0,
    postgraduate_nontech integer DEFAULT 0,
    postgraduate_tech integer DEFAULT 0,
    phdmhil integer DEFAULT 0,
    itic integer DEFAULT 0,
    graduation_nontechc integer DEFAULT 0,
    graduation_techc integer DEFAULT 0,
    postgraduate_nontechc integer DEFAULT 0,
    postgraduate_techc integer DEFAULT 0,
    phdmhilc integer DEFAULT 0,
    msme_nos_tooling_target integer DEFAULT 0,
    msme_nos_tooling_dtm integer DEFAULT 0,
    msme_nos_tooling_cumu_mon integer DEFAULT 0,
    msme_values_tooling_target integer DEFAULT 0,
    msme_values_tooling_dtm numeric(28,2) DEFAULT 0.00,
    msme_values_tooling_cumu_mon numeric(28,2) DEFAULT 0.00,
    other_nos_tooling_target integer DEFAULT 0,
    other_nos_tooling_dtm integer DEFAULT 0,
    other_nos_tooling_cumu_mon integer DEFAULT 0,
    other_values_tooling_target integer DEFAULT 0,
    other_values_tooling_dtm numeric(28,2) DEFAULT 0.00,
    other_values_tooling_cumu_mon numeric(28,2) DEFAULT 0.00,
    msme_nos_otherjob_target integer DEFAULT 0,
    msme_nos_otherjob_dtm integer DEFAULT 0,
    msme_nos_otherjob_cumu_mon integer DEFAULT 0,
    msme_values_otherjob_target integer DEFAULT 0,
    msme_values_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    msme_values_otherjob_cumu_mon numeric(28,2) DEFAULT 0.00,
    other_nos_otherjob_target integer DEFAULT 0,
    other_nos_otherjob_dtm integer DEFAULT 0,
    other_nos_otherjob_cumu_mon integer DEFAULT 0,
    other_values_otherjob_target integer DEFAULT 0,
    other_values_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    other_values_otherjob_cumu_mon numeric(28,2) DEFAULT 0.00
);


--
-- Name: tbl_physical_13112023; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_physical_13112023 (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(625) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    nju_msme_no_target integer,
    nju_msme_no_dtm integer,
    nju_msme_no_cum integer,
    nju_msme_value_target integer,
    nju_msme_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_msme_value_cum numeric(28,2) DEFAULT NULL::numeric,
    nju_other_no_target integer,
    nju_other_no_dtm integer,
    nju_other_no_cum integer,
    nju_other_value_target integer,
    nju_other_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_other_value_cum numeric(28,2) DEFAULT NULL::numeric,
    conslt_msme_target integer,
    conslt_msme_dtm integer,
    conslt_msme_cum integer,
    conslt_other_target integer,
    conslt_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    conslt_other_cum integer,
    any_other_target integer,
    any_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    any_other_cum integer,
    ta_ltc_target integer,
    ta_ltc_dtm integer,
    ta_ltc_cum integer,
    ta_stc_ncc_target integer,
    ta_stc_ncc_dtm integer,
    ta_stc_ncc_cum integer,
    ta_stc_ntt_target integer,
    ta_stc_ntt_dtm integer,
    ta_stc_ntt_cum integer,
    ta_others_target integer,
    ta_others_dtm integer,
    ta_others_cum integer,
    seminar_no_target integer,
    seminar_no_dtm integer,
    seminar_no_cum integer,
    seminar_participants_target integer,
    seminar_participants_dtm integer,
    seminar_participants_cum integer,
    ttb_dtm_sc integer,
    ttb_dtm_st integer,
    ttb_dtm_women integer,
    ttb_dtm_obc integer,
    ttb_dtm_ph integer,
    ttb_dtm_min integer,
    ttb_dtm_total integer,
    ttb_cum_sc integer,
    ttb_cum_st integer,
    ttb_cum_women integer,
    ttb_cum_obc integer,
    ttb_cum_ph integer,
    ttb_cum_min integer,
    ttb_cum_total integer,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    trng_total_noc_cumu_mon integer,
    trng_total_noc_dtm integer,
    tring_total_not_dtm integer,
    tring_total_not_cum integer,
    general_ttb integer,
    general_cum integer,
    gen integer DEFAULT 0,
    men integer DEFAULT 0,
    transgender integer DEFAULT 0,
    tenfail integer DEFAULT 0,
    tenpass integer DEFAULT 0,
    twelth integer DEFAULT 0,
    graduation integer DEFAULT 0,
    pg integer DEFAULT 0,
    limit1 integer DEFAULT 0,
    limit2 integer DEFAULT 0,
    limit3 integer DEFAULT 0,
    limit4 integer DEFAULT 0,
    gen_cum integer DEFAULT 0,
    men_cum integer DEFAULT 0,
    transgender_cum integer DEFAULT 0,
    tenfail_cum integer DEFAULT 0,
    tenpass_cum integer DEFAULT 0,
    twelth_cum integer DEFAULT 0,
    graduation_cum integer DEFAULT 0,
    pg_cum integer DEFAULT 0,
    limit1_cum integer DEFAULT 0,
    limit2_cum integer DEFAULT 0,
    limit3_cum integer DEFAULT 0,
    limit4_cum integer DEFAULT 0,
    above integer DEFAULT 0,
    abovec integer DEFAULT 0,
    diploma integer DEFAULT 0,
    diplomac integer DEFAULT 0,
    iti integer DEFAULT 0,
    graduation_nontech integer DEFAULT 0,
    graduation_tech integer DEFAULT 0,
    postgraduate_nontech integer DEFAULT 0,
    postgraduate_tech integer DEFAULT 0,
    phdmhil integer DEFAULT 0,
    itic integer DEFAULT 0,
    graduation_nontechc integer DEFAULT 0,
    graduation_techc integer DEFAULT 0,
    postgraduate_nontechc integer DEFAULT 0,
    postgraduate_techc integer DEFAULT 0,
    phdmhilc integer DEFAULT 0,
    msme_nos_tooling_target integer DEFAULT 0,
    msme_nos_tooling_dtm integer DEFAULT 0,
    msme_nos_tooling_cumu_mon integer DEFAULT 0,
    msme_values_tooling_target integer DEFAULT 0,
    msme_values_tooling_dtm numeric(28,2) DEFAULT 0.00,
    msme_values_tooling_cumu_mon numeric(28,2) DEFAULT 0.00,
    other_nos_tooling_target integer DEFAULT 0,
    other_nos_tooling_dtm integer DEFAULT 0,
    other_nos_tooling_cumu_mon integer DEFAULT 0,
    other_values_tooling_target integer DEFAULT 0,
    other_values_tooling_dtm numeric(28,2) DEFAULT 0.00,
    other_values_tooling_cumu_mon numeric(28,2) DEFAULT 0.00,
    msme_nos_otherjob_target integer DEFAULT 0,
    msme_nos_otherjob_dtm integer DEFAULT 0,
    msme_nos_otherjob_cumu_mon integer DEFAULT 0,
    msme_values_otherjob_target integer DEFAULT 0,
    msme_values_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    msme_values_otherjob_cumu_mon numeric(28,2) DEFAULT 0.00,
    other_nos_otherjob_target integer DEFAULT 0,
    other_nos_otherjob_dtm integer DEFAULT 0,
    other_nos_otherjob_cumu_mon integer DEFAULT 0,
    other_values_otherjob_target integer DEFAULT 0,
    other_values_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    other_values_otherjob_cumu_mon numeric(28,2) DEFAULT 0.00
);


--
-- Name: tbl_physical_bk; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_physical_bk (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(625) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    nju_msme_no_target integer,
    nju_msme_no_dtm integer,
    nju_msme_no_cum integer,
    nju_msme_value_target integer,
    nju_msme_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_msme_value_cum numeric(28,2) DEFAULT NULL::numeric,
    nju_other_no_target integer,
    nju_other_no_dtm integer,
    nju_other_no_cum integer,
    nju_other_value_target integer,
    nju_other_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_other_value_cum numeric(28,2) DEFAULT NULL::numeric,
    conslt_msme_target integer,
    conslt_msme_dtm integer,
    conslt_msme_cum integer,
    conslt_other_target integer,
    conslt_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    conslt_other_cum integer,
    any_other_target integer,
    any_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    any_other_cum integer,
    ta_ltc_target integer,
    ta_ltc_dtm integer,
    ta_ltc_cum integer,
    ta_stc_ncc_target integer,
    ta_stc_ncc_dtm integer,
    ta_stc_ncc_cum integer,
    ta_stc_ntt_target integer,
    ta_stc_ntt_dtm integer,
    ta_stc_ntt_cum integer,
    ta_others_target integer,
    ta_others_dtm integer,
    ta_others_cum integer,
    seminar_no_target integer,
    seminar_no_dtm integer,
    seminar_no_cum integer,
    seminar_participants_target integer,
    seminar_participants_dtm integer,
    seminar_participants_cum integer,
    ttb_dtm_sc integer,
    ttb_dtm_st integer,
    ttb_dtm_women integer,
    ttb_dtm_obc integer,
    ttb_dtm_ph integer,
    ttb_dtm_min integer,
    ttb_dtm_total integer,
    ttb_cum_sc integer,
    ttb_cum_st integer,
    ttb_cum_women integer,
    ttb_cum_obc integer,
    ttb_cum_ph integer,
    ttb_cum_min integer,
    ttb_cum_total integer,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    trng_total_noc_cumu_mon integer,
    trng_total_noc_dtm integer,
    tring_total_not_dtm integer,
    tring_total_not_cum integer,
    general_ttb integer,
    general_cum integer
);


--
-- Name: tbl_physical_bk1; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_physical_bk1 (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(625) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    nju_msme_no_target integer,
    nju_msme_no_dtm integer,
    nju_msme_no_cum integer,
    nju_msme_value_target integer,
    nju_msme_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_msme_value_cum numeric(28,2) DEFAULT NULL::numeric,
    nju_other_no_target integer,
    nju_other_no_dtm integer,
    nju_other_no_cum integer,
    nju_other_value_target integer,
    nju_other_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_other_value_cum numeric(28,2) DEFAULT NULL::numeric,
    conslt_msme_target integer,
    conslt_msme_dtm integer,
    conslt_msme_cum integer,
    conslt_other_target integer,
    conslt_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    conslt_other_cum integer,
    any_other_target integer,
    any_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    any_other_cum integer,
    ta_ltc_target integer,
    ta_ltc_dtm integer,
    ta_ltc_cum integer,
    ta_stc_ncc_target integer,
    ta_stc_ncc_dtm integer,
    ta_stc_ncc_cum integer,
    ta_stc_ntt_target integer,
    ta_stc_ntt_dtm integer,
    ta_stc_ntt_cum integer,
    ta_others_target integer,
    ta_others_dtm integer,
    ta_others_cum integer,
    seminar_no_target integer,
    seminar_no_dtm integer,
    seminar_no_cum integer,
    seminar_participants_target integer,
    seminar_participants_dtm integer,
    seminar_participants_cum integer,
    ttb_dtm_sc integer,
    ttb_dtm_st integer,
    ttb_dtm_women integer,
    ttb_dtm_obc integer,
    ttb_dtm_ph integer,
    ttb_dtm_min integer,
    ttb_dtm_total integer,
    ttb_cum_sc integer,
    ttb_cum_st integer,
    ttb_cum_women integer,
    ttb_cum_obc integer,
    ttb_cum_ph integer,
    ttb_cum_min integer,
    ttb_cum_total integer,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    trng_total_noc_cumu_mon integer,
    trng_total_noc_dtm integer,
    tring_total_not_dtm integer,
    tring_total_not_cum integer,
    general_ttb integer,
    general_cum integer
);


--
-- Name: tbl_physical_copy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_physical_copy (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    months_year character varying(625) DEFAULT NULL::character varying,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    nju_msme_no_target integer,
    nju_msme_no_dtm integer,
    nju_msme_no_cum integer,
    nju_msme_value_target integer,
    nju_msme_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_msme_value_cum numeric(28,2) DEFAULT NULL::numeric,
    nju_other_no_target integer,
    nju_other_no_dtm integer,
    nju_other_no_cum integer,
    nju_other_value_target integer,
    nju_other_value_dtm numeric(28,2) DEFAULT NULL::numeric,
    nju_other_value_cum numeric(28,2) DEFAULT NULL::numeric,
    conslt_msme_target integer,
    conslt_msme_dtm integer,
    conslt_msme_cum integer,
    conslt_other_target integer,
    conslt_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    conslt_other_cum integer,
    any_other_target integer,
    any_other_dtm numeric(28,2) DEFAULT NULL::numeric,
    any_other_cum integer,
    ta_ltc_target integer,
    ta_ltc_dtm integer,
    ta_ltc_cum integer,
    ta_stc_ncc_target integer,
    ta_stc_ncc_dtm integer,
    ta_stc_ncc_cum integer,
    ta_stc_ntt_target integer,
    ta_stc_ntt_dtm integer,
    ta_stc_ntt_cum integer,
    ta_others_target integer,
    ta_others_dtm integer,
    ta_others_cum integer,
    seminar_no_target integer,
    seminar_no_dtm integer,
    seminar_no_cum integer,
    seminar_participants_target integer,
    seminar_participants_dtm integer,
    seminar_participants_cum integer,
    ttb_dtm_sc integer,
    ttb_dtm_st integer,
    ttb_dtm_women integer,
    ttb_dtm_obc integer,
    ttb_dtm_ph integer,
    ttb_dtm_min integer,
    ttb_dtm_total integer,
    ttb_cum_sc integer,
    ttb_cum_st integer,
    ttb_cum_women integer,
    ttb_cum_obc integer,
    ttb_cum_ph integer,
    ttb_cum_min integer,
    ttb_cum_total integer,
    sisi_nm character varying(50) DEFAULT NULL::character varying,
    trng_total_noc_cumu_mon integer,
    trng_total_noc_dtm integer,
    tring_total_not_dtm integer,
    tring_total_not_cum integer,
    general_ttb integer,
    general_cum integer,
    gen integer DEFAULT 0,
    men integer DEFAULT 0,
    transgender integer DEFAULT 0,
    tenfail integer DEFAULT 0,
    tenpass integer DEFAULT 0,
    twelth integer DEFAULT 0,
    graduation integer DEFAULT 0,
    pg integer DEFAULT 0,
    limit1 integer DEFAULT 0,
    limit2 integer DEFAULT 0,
    limit3 integer DEFAULT 0,
    limit4 integer DEFAULT 0,
    gen_cum integer DEFAULT 0,
    men_cum integer DEFAULT 0,
    transgender_cum integer DEFAULT 0,
    tenfail_cum integer DEFAULT 0,
    tenpass_cum integer DEFAULT 0,
    twelth_cum integer DEFAULT 0,
    graduation_cum integer DEFAULT 0,
    pg_cum integer DEFAULT 0,
    limit1_cum integer DEFAULT 0,
    limit2_cum integer DEFAULT 0,
    limit3_cum integer DEFAULT 0,
    limit4_cum integer DEFAULT 0,
    above integer DEFAULT 0,
    abovec integer DEFAULT 0,
    diploma integer DEFAULT 0,
    diplomac integer DEFAULT 0,
    iti integer DEFAULT 0,
    graduation_nontech integer DEFAULT 0,
    graduation_tech integer DEFAULT 0,
    postgraduate_nontech integer DEFAULT 0,
    postgraduate_tech integer DEFAULT 0,
    phdmhil integer DEFAULT 0,
    itic integer DEFAULT 0,
    graduation_nontechc integer DEFAULT 0,
    graduation_techc integer DEFAULT 0,
    postgraduate_nontechc integer DEFAULT 0,
    postgraduate_techc integer DEFAULT 0,
    phdmhilc integer DEFAULT 0,
    msme_nos_tooling_target integer DEFAULT 0,
    msme_nos_tooling_dtm integer DEFAULT 0,
    msme_nos_tooling_cumu_mon integer DEFAULT 0,
    msme_values_tooling_target integer DEFAULT 0,
    msme_values_tooling_dtm numeric(28,2) DEFAULT 0.00,
    msme_values_tooling_cumu_mon numeric(28,2) DEFAULT 0.00,
    other_nos_tooling_target integer DEFAULT 0,
    other_nos_tooling_dtm integer DEFAULT 0,
    other_nos_tooling_cumu_mon integer DEFAULT 0,
    other_values_tooling_target integer DEFAULT 0,
    other_values_tooling_dtm numeric(28,2) DEFAULT 0.00,
    other_values_tooling_cumu_mon numeric(28,2) DEFAULT 0.00,
    msme_nos_otherjob_target integer DEFAULT 0,
    msme_nos_otherjob_dtm integer DEFAULT 0,
    msme_nos_otherjob_cumu_mon integer DEFAULT 0,
    msme_values_otherjob_target integer DEFAULT 0,
    msme_values_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    msme_values_otherjob_cumu_mon numeric(28,2) DEFAULT 0.00,
    other_nos_otherjob_target integer DEFAULT 0,
    other_nos_otherjob_dtm integer DEFAULT 0,
    other_nos_otherjob_cumu_mon integer DEFAULT 0,
    other_values_otherjob_target integer DEFAULT 0,
    other_values_otherjob_dtm numeric(28,2) DEFAULT 0.00,
    other_values_otherjob_cumu_mon numeric(28,2) DEFAULT 0.00
);


--
-- Name: tbl_physical_old_19july2010; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_physical_old_19july2010 (
    inst_id character(10) DEFAULT NULL::bpchar,
    months character(20) DEFAULT NULL::bpchar,
    years integer,
    months_year date,
    nju_msme_no_target integer,
    nju_msme_no_dtm integer,
    nju_msme_no_cum integer,
    nju_msme_value_target integer,
    nju_msme_value_dtm integer,
    nju_msme_value_cum integer,
    nju_other_no_target integer,
    nju_other_no_dtm integer,
    nju_other_no_cum integer,
    nju_other_value_target integer,
    nju_other_value_dtm integer,
    nju_other_value_cum integer,
    conslt_msme_target integer,
    conslt_msme_dtm integer,
    conslt_msme_cum integer,
    conslt_other_target integer,
    conslt_other_dtm integer,
    conslt_other_cum integer,
    any_other_target integer,
    any_other_dtm integer,
    any_other_cum integer,
    ta_ltc_target integer,
    ta_ltc_dtm integer,
    ta_ltc_cum integer,
    ta_stc_ncc_target integer,
    ta_stc_ncc_dtm integer,
    ta_stc_ncc_cum integer,
    ta_stc_ntt_target integer,
    ta_stc_ntt_dtm integer,
    ta_stc_ntt_cum integer,
    ta_others_target integer,
    ta_others_dtm integer,
    ta_others_cum integer,
    seminar_no_target integer,
    seminar_no_dtm integer,
    seminar_no_cum integer,
    seminar_participants_target integer,
    seminar_participants_dtm integer,
    seminar_participants_cum integer,
    ttb_dtm_sc integer,
    ttb_dtm_st integer,
    ttb_dtm_women integer,
    ttb_dtm_obc integer,
    ttb_dtm_ph integer,
    ttb_dtm_min integer,
    ttb_dtm_total integer,
    ttb_cum_sc integer,
    ttb_cum_st integer,
    ttb_cum_women integer,
    ttb_cum_obc integer,
    ttb_cum_ph integer,
    ttb_cum_min integer,
    ttb_cum_total integer,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    trng_total_noc_dtm integer DEFAULT 0,
    trng_total_noc_cumu_mon integer DEFAULT 0
);


--
-- Name: tbl_placement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_placement (
    sno integer DEFAULT 0 NOT NULL,
    inst_id character varying(45) NOT NULL,
    months character varying(45) NOT NULL,
    years character varying(45) NOT NULL,
    year_months character varying(100) NOT NULL,
    nsqf_com_dm integer DEFAULT 0 NOT NULL,
    nsqf_com_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_cum integer DEFAULT 0 NOT NULL,
    ps_trn_cert_dm integer DEFAULT 0 NOT NULL,
    ps_trn_cert_cum integer DEFAULT 0 NOT NULL,
    ps_trn_opt_plc_dm integer DEFAULT 0 NOT NULL,
    ps_trn_opt_plc_cum integer DEFAULT 0 NOT NULL,
    ps_trn_reg_smprk_dm integer DEFAULT 0 NOT NULL,
    ps_trn_reg_smprk_cum integer DEFAULT 0 NOT NULL,
    ps_cnd_plcd_dm integer DEFAULT 0 NOT NULL,
    ps_cnd_plcd_cum integer DEFAULT 0 NOT NULL,
    ps_emp_trn_dm integer DEFAULT 0 NOT NULL,
    ps_emp_trn_cum integer DEFAULT 0 NOT NULL,
    ps_trn_opt_hstd_dm integer DEFAULT 0 NOT NULL,
    ps_trn_opt_hstd_cum integer DEFAULT 0 NOT NULL,
    ps_cnd_opt_slfs_dm integer DEFAULT 0 NOT NULL,
    ps_cnd_opt_slfs_cum integer DEFAULT 0 NOT NULL,
    ps_cnd_to_beplcd_dm integer DEFAULT 0 NOT NULL,
    ps_cnd_to_beplcd_cum integer DEFAULT 0 NOT NULL,
    "time" character varying(45) DEFAULT ''::character varying NOT NULL,
    ip character varying(45) DEFAULT ''::character varying NOT NULL,
    nsqf_ex_ram11_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram11_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram12_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram12_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram13_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram13_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram14_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram14_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram15_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram15_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram16_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram16_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram17_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram17_cum integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram18_dm integer DEFAULT 0 NOT NULL,
    nsqf_ex_ram18_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram31_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram31_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram32_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram32_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram33_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram33_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram34_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram34_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram35_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram35_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram36_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram36_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram37_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram37_cum integer DEFAULT 0 NOT NULL,
    non_nsqf_ram38_dm integer DEFAULT 0 NOT NULL,
    non_nsqf_ram38_cum integer DEFAULT 0 NOT NULL
);


--
-- Name: tbl_placement_sno_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tbl_placement_sno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tbl_pms_target; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_pms_target (
    sno integer NOT NULL,
    inst_id character varying(45) NOT NULL,
    "smallint" character varying(45) NOT NULL,
    esdp integer NOT NULL,
    edp integer NOT NULL,
    bsdp integer NOT NULL,
    mdp integer NOT NULL,
    sdp integer NOT NULL,
    imc integer NOT NULL,
    other integer NOT NULL,
    vdp integer NOT NULL,
    project_new integer NOT NULL,
    project_updated integer NOT NULL,
    state_industrial integer NOT NULL,
    survey integer NOT NULL,
    status_report integer NOT NULL,
    technology_study integer NOT NULL,
    trade integer NOT NULL,
    training_programmes integer NOT NULL,
    detail_of_projects integer NOT NULL,
    sensitization_wto integer NOT NULL,
    awareness_bio integer NOT NULL,
    programmes_packaging integer NOT NULL,
    programmes_bar integer NOT NULL,
    awareness_cluster integer NOT NULL,
    tequp integer NOT NULL,
    sensitization_ipr integer NOT NULL,
    awareness_tequp integer NOT NULL,
    identification integer NOT NULL,
    seminar_on_vsbk integer NOT NULL,
    indl_potenial integer NOT NULL,
    workshop integer NOT NULL,
    vdp1 integer
);


--
-- Name: tbl_report; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_report (
    sno integer NOT NULL,
    instid character varying(45) NOT NULL,
    months integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    monthly_achievment_new integer NOT NULL,
    monthly_achievment_updated integer NOT NULL,
    stateindustrial integer NOT NULL,
    survey_report_achievment integer NOT NULL,
    status_report_achievment integer NOT NULL,
    technology_study_achievment integer NOT NULL,
    trade_directories_achievment integer NOT NULL,
    training_programme_achievment integer NOT NULL,
    detail_project_achievment integer NOT NULL,
    distict_potenial_achievment integer NOT NULL,
    user_date character varying(45) NOT NULL,
    cum_monthly_achievment_new integer,
    cum_monthly_achievment_updated integer,
    project_profiles_target_new integer,
    project_profiles_target_updated integer,
    state_industrial_target integer,
    distict_potenial_target integer,
    survey_report_target integer,
    status_report_target integer,
    technology_study_target integer,
    trade_directories_target integer,
    training_programme_target integer,
    detail_project_target integer
);


--
-- Name: tbl_revenue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_revenue (
    sno integer NOT NULL,
    instid character varying(45) NOT NULL,
    months integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    common_total integer NOT NULL,
    sale_total integer NOT NULL,
    sdp_total integer NOT NULL,
    edp_total integer NOT NULL,
    mdp_total integer NOT NULL,
    seminar_total integer NOT NULL,
    capacity_total integer NOT NULL,
    project_total integer NOT NULL,
    sick_total integer NOT NULL,
    inplant_total integer NOT NULL,
    surveys_total integer NOT NULL,
    energy_total integer NOT NULL,
    nsic_total integer NOT NULL,
    sale_publication_total integer NOT NULL,
    information_total integer NOT NULL,
    others_total integer NOT NULL,
    accounts_total integer NOT NULL,
    user_date character varying(45) NOT NULL,
    cum_common_total integer NOT NULL,
    total integer NOT NULL,
    cum_total integer NOT NULL,
    esdp_total integer
);


--
-- Name: tbl_revenue_branch; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_revenue_branch (
    instid character varying(45) DEFAULT NULL::character varying,
    months character varying(45) DEFAULT NULL::character varying,
    years integer,
    msmedi integer,
    branch1 integer,
    branch2 integer,
    branch3 integer,
    branch4 integer,
    branch5 integer,
    branch6 integer,
    name character varying(145) DEFAULT NULL::character varying,
    sno integer NOT NULL,
    user_date date NOT NULL
);


--
-- Name: tbl_search_engine; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_search_engine (
    sno integer NOT NULL,
    aliass character varying(645) NOT NULL,
    linkofwebsite character varying(745) NOT NULL
);


--
-- Name: tbl_senet; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_senet (
    sno integer NOT NULL,
    inst_id character varying(45) NOT NULL,
    months integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    amc_of_pc1 integer NOT NULL,
    web1 integer NOT NULL,
    connectivity1 integer NOT NULL,
    contg1 integer NOT NULL,
    others1 integer NOT NULL,
    user_date character varying(145) NOT NULL,
    amc_of_pc2 integer NOT NULL,
    web2 integer NOT NULL,
    connectivity2 integer NOT NULL,
    others2 integer NOT NULL,
    contg2 integer NOT NULL,
    amc_of_pc integer NOT NULL,
    web integer NOT NULL,
    connectivity integer NOT NULL,
    contg integer DEFAULT 0 NOT NULL,
    others integer DEFAULT 0,
    br_hardware_tomonth character varying(45) DEFAULT '0'::character varying,
    br_con_tomonth character varying(45) DEFAULT '0'::character varying,
    br_contg_tomonth character varying(45) DEFAULT '0'::character varying,
    br_others_tomonth character varying(45) DEFAULT '0'::character varying,
    br_hardware_tomonth_1 character varying(45) DEFAULT '0'::character varying,
    br_con_tomonth_1 character varying(45) DEFAULT '0'::character varying,
    br_contg_tomonth_1 character varying(45) DEFAULT '0'::character varying,
    br_others_tomonth_1 character varying(45) DEFAULT NULL::character varying,
    br_hardware_tomonth_2 character varying(45) DEFAULT '0'::character varying,
    br_con_tomonth_2 character varying(45) DEFAULT '0'::character varying,
    br_contg_tomonth_2 character varying(45) DEFAULT '0'::character varying,
    br_others_tomonth_2 character varying(45) DEFAULT '0'::character varying,
    br_hardware_tomonth_3 character varying(45) DEFAULT '0'::character varying,
    br_contg_tomonth_3 character varying(45) DEFAULT '0'::character varying,
    br_others_tomonth_3 character varying(45) DEFAULT '0'::character varying,
    br_hardware_tomonth_4 character varying(45) DEFAULT '0'::character varying,
    br_con_tomonth_4 character varying(45) DEFAULT '0'::character varying,
    br_contg_tomonth_4 character varying(45) DEFAULT '0'::character varying,
    br_others_tomonth_4 character varying(45) DEFAULT '0'::character varying,
    br_hardware_tomonth_5 character varying(45) DEFAULT '0'::character varying,
    br_con_tomonth_5 character varying(45) DEFAULT '0'::character varying,
    br_contg_tomonth_5 character varying(45) DEFAULT '0'::character varying,
    br_others_tomonth_5 character varying(45) DEFAULT '0'::character varying,
    br_con_tomonth_3 character varying(45) DEFAULT '0'::character varying
);


--
-- Name: tbl_special_program; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_special_program (
    sno integer NOT NULL,
    instid character varying(45) NOT NULL,
    months integer NOT NULL,
    "smallint" character varying(145) NOT NULL,
    sensitization_programme_wto_programmes integer NOT NULL,
    sensitization_programme_wto_participants integer NOT NULL,
    awareness_bio_programmes integer NOT NULL,
    awareness_bio_participants integer NOT NULL,
    exports_programmes integer NOT NULL,
    exports_participants integer NOT NULL,
    bar_coding_programmes integer NOT NULL,
    bar_coding_participants integer NOT NULL,
    cluster_programmes integer NOT NULL,
    cluster_participants integer NOT NULL,
    tequp_programmes integer NOT NULL,
    tequp_participants integer NOT NULL,
    ipr_programmes integer NOT NULL,
    ipr_participants integer NOT NULL,
    awareness_tequp_programmes integer NOT NULL,
    awareness_tequp_participants integer NOT NULL,
    awareness_clcss_programmes integer NOT NULL,
    awareness_clcss_participants integer NOT NULL,
    seminar_vsbk_programmes integer NOT NULL,
    seminar_vsbk_participants integer NOT NULL,
    user_date character varying(145) NOT NULL,
    sensitization_programme_wto_target integer,
    awareness_bio_target integer,
    exports_target integer,
    bar_coding_target integer,
    cluster_target integer,
    tequp_target integer,
    ipr_target integer,
    awareness_tequp_target integer,
    awareness_clcss_target integer,
    seminar_vsbk_target integer
);


--
-- Name: tbl_ssi_mda; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_ssi_mda (
    sno integer NOT NULL,
    inst_id character varying(45) NOT NULL,
    months character varying(45) NOT NULL,
    "smallint" integer NOT NULL,
    fund_release_mda integer NOT NULL,
    target_release_mda integer NOT NULL,
    exp_mda integer NOT NULL,
    mses_mda integer NOT NULL,
    cumm_exp_mda integer NOT NULL,
    cumm_mses_mda integer NOT NULL,
    fund_release_nmcp integer NOT NULL,
    target_release_nmcp integer NOT NULL,
    exp_nmcp integer NOT NULL,
    mses_nmcp integer NOT NULL,
    cumm_exp_nmcp integer NOT NULL,
    cumm_mses_nmcp integer NOT NULL,
    fund_release_nmcp_seminar integer NOT NULL,
    target_release_nmcp_seminar integer NOT NULL,
    exp_nmcp_seminar integer NOT NULL,
    mses_nmcp_seminar integer NOT NULL,
    cumm_exp_nmcp_seminar integer NOT NULL,
    cumm_mses_nmcp_seminar integer NOT NULL,
    user_date date NOT NULL
);


--
-- Name: tbl_target_ssi_mda; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_target_ssi_mda (
    sno integer NOT NULL,
    instid character varying(45) NOT NULL,
    "smallint" integer NOT NULL,
    fund_release_mda integer NOT NULL,
    fund_release_nmcp integer NOT NULL,
    fund_release_nmcp_seminar integer NOT NULL,
    target_mda integer NOT NULL,
    target_nmcp integer NOT NULL,
    target_nmcp_seminar integer NOT NULL
);


--
-- Name: tbl_targetlib; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_targetlib (
    sno integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    inst_id character varying(45) NOT NULL,
    amc_of_pc1 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_1 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_2 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_3 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_4 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_5 character varying(45) DEFAULT '0'::character varying NOT NULL
);


--
-- Name: tbl_targetlib_bk; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_targetlib_bk (
    sno integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    inst_id character varying(45) NOT NULL,
    amc_of_pc1 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_1 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_2 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_3 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_4 character varying(45) DEFAULT '0'::character varying NOT NULL,
    br_hardware_target_5 character varying(45) DEFAULT '0'::character varying NOT NULL
);


--
-- Name: tbl_targetsenet; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_targetsenet (
    sno integer NOT NULL,
    inst_id character varying(45) NOT NULL,
    months integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    amc_of_pc1 character varying(45) DEFAULT '0'::character varying NOT NULL,
    web1 integer DEFAULT 0 NOT NULL,
    connectivity1 integer DEFAULT 0 NOT NULL,
    contg1 integer DEFAULT 0 NOT NULL,
    others1 integer DEFAULT 0 NOT NULL,
    br_hardware_target integer DEFAULT 0,
    br_con_target integer DEFAULT 0,
    br_contg_target integer DEFAULT 0,
    br_hardware_target_1 integer DEFAULT 0,
    br_con_target_1 integer DEFAULT 0,
    br_contg_target_1 integer DEFAULT 0,
    br_others_target_1 integer DEFAULT 0,
    br_hardware_target_2 integer DEFAULT 0,
    br_con_target_2 integer DEFAULT 0,
    br_contg_target_2 integer DEFAULT 0,
    br_others_target_2 integer DEFAULT 0,
    br_hardware_target_3 integer DEFAULT 0,
    br_con_target_3 integer DEFAULT 0,
    br_contg_target_3 integer DEFAULT 0,
    br_others_target_3 integer DEFAULT 0,
    br_hardware_target_4 integer DEFAULT 0,
    br_con_target_4 integer DEFAULT 0,
    br_contg_target_4 integer DEFAULT 0,
    br_others_target_4 integer DEFAULT 0,
    br_hardware_target_5 integer DEFAULT 0,
    br_con_target_5 integer DEFAULT 0,
    br_contg_target_5 integer DEFAULT 0,
    br_others_target_5 integer DEFAULT 0,
    br_others_target integer
);


--
-- Name: tbl_temp_analysisrpt; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_temp_analysisrpt (
    ptrainees_a double precision,
    psum_unitsassisted double precision,
    psum_per_rec_cash_dtm double precision,
    psum_per_rec_accrual_dtm double precision,
    auid character(100) DEFAULT ''::bpchar NOT NULL,
    atrvatid integer,
    age_recy double precision,
    yearss character varying(20) DEFAULT ''::character varying NOT NULL,
    months integer NOT NULL
);


--
-- Name: tbl_tooling_otherjob; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_tooling_otherjob (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    months_year character varying(125) NOT NULL,
    rev_ear_cash_prdtn_tooling_target integer,
    rev_ear_cash_prdtn_tooling_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_tooling_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_otherjob_target integer,
    rev_ear_cash_prdtn_otherjob_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_otherjob_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_tooling_target integer,
    rev_ear_accrual_prdtn_tooling_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_tooling_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_otherjob_target integer,
    rev_ear_accrual_prdtn_otherjob_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_otherjob_cum numeric(28,2) DEFAULT NULL::numeric,
    sno integer NOT NULL
);


--
-- Name: tbl_tooling_otherjob_copy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_tooling_otherjob_copy (
    inst_id character varying(50) DEFAULT ''::character varying NOT NULL,
    months character varying(50) DEFAULT ''::character varying NOT NULL,
    years character varying(125) DEFAULT '0'::character varying NOT NULL,
    months_year character varying(125) NOT NULL,
    rev_ear_cash_prdtn_tooling_target integer,
    rev_ear_cash_prdtn_tooling_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_tooling_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_otherjob_target integer,
    rev_ear_cash_prdtn_otherjob_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_cash_prdtn_otherjob_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_tooling_target integer,
    rev_ear_accrual_prdtn_tooling_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_tooling_cum numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_otherjob_target integer,
    rev_ear_accrual_prdtn_otherjob_dtm numeric(28,2) DEFAULT NULL::numeric,
    rev_ear_accrual_prdtn_otherjob_cum numeric(28,2) DEFAULT NULL::numeric,
    sno integer DEFAULT 0 NOT NULL
);


--
-- Name: tbl_tr_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_tr_category (
    tc_id integer,
    tc_cayegory text
);


--
-- Name: tbl_trng_exp_target; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_trng_exp_target (
    inst_id character(10) NOT NULL,
    years character varying(125) NOT NULL,
    rev_earn_cash integer,
    rev_earn_acc integer,
    rev_exp_cash integer,
    rev_exp_acc integer,
    inc_exp_cash integer,
    inc_exp_acc integer,
    per_rec_cash integer,
    per_rec_acc integer,
    creation_date date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    nju_target integer,
    ta_target integer,
    be_budget integer,
    months integer
);


--
-- Name: tbl_trng_exp_target_19july10; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_trng_exp_target_19july10 (
    inst_id character(10) DEFAULT NULL::bpchar,
    years character(10) DEFAULT NULL::bpchar,
    rev_earn_cash integer,
    rev_earn_acc integer,
    rev_exp_cash integer,
    rev_exp_acc integer,
    inc_exp_cash integer,
    inc_exp_acc integer,
    per_rec_cash integer,
    per_rec_acc integer,
    creation_date date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    nju_target integer,
    ta_target integer
);


--
-- Name: tbl_trng_exp_target_backup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_trng_exp_target_backup (
    inst_id character(10) NOT NULL,
    years character varying(125) NOT NULL,
    rev_earn_cash integer,
    rev_earn_acc integer,
    rev_exp_cash integer,
    rev_exp_acc integer,
    inc_exp_cash integer,
    inc_exp_acc integer,
    per_rec_cash integer,
    per_rec_acc integer,
    creation_date date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    nju_target integer,
    ta_target integer,
    be_budget integer,
    months integer
);


--
-- Name: tbl_trng_exp_target_bk; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_trng_exp_target_bk (
    inst_id character(10) NOT NULL,
    years character varying(125) NOT NULL,
    rev_earn_cash integer,
    rev_earn_acc integer,
    rev_exp_cash integer,
    rev_exp_acc integer,
    inc_exp_cash integer,
    inc_exp_acc integer,
    per_rec_cash integer,
    per_rec_acc integer,
    creation_date date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    nju_target integer,
    ta_target integer,
    be_budget integer,
    months integer
);


--
-- Name: tbl_trng_exp_target_bkp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_trng_exp_target_bkp (
    inst_id character(10) NOT NULL,
    years character varying(125) NOT NULL,
    rev_earn_cash integer,
    rev_earn_acc integer,
    rev_exp_cash integer,
    rev_exp_acc integer,
    inc_exp_cash integer,
    inc_exp_acc integer,
    per_rec_cash integer,
    per_rec_acc integer,
    creation_date date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    nju_target integer,
    ta_target integer,
    be_budget integer,
    months integer
);


--
-- Name: tbl_trng_exp_target_copy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_trng_exp_target_copy (
    inst_id character(10) NOT NULL,
    years character varying(125) NOT NULL,
    rev_earn_cash integer,
    rev_earn_acc integer,
    rev_exp_cash integer,
    rev_exp_acc integer,
    inc_exp_cash integer,
    inc_exp_acc integer,
    per_rec_cash integer,
    per_rec_acc integer,
    creation_date date,
    sisi_nm character(50) DEFAULT NULL::bpchar,
    nju_target integer,
    ta_target integer,
    be_budget integer,
    months integer
);


--
-- Name: tbl_uploadfile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_uploadfile (
    id integer NOT NULL,
    filename character varying(145) NOT NULL,
    name character varying(245) NOT NULL,
    date_of_birth date NOT NULL,
    designation character varying(245) NOT NULL
);


--
-- Name: tbl_vendor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_vendor (
    sno integer NOT NULL,
    instid character varying(45) NOT NULL,
    months integer NOT NULL,
    "smallint" character varying(45) NOT NULL,
    vdp_conducted integer NOT NULL,
    unit_participated integer NOT NULL,
    amount_disbursed integer NOT NULL,
    svdpvdp_conducted integer NOT NULL,
    svdpunit_participated integer NOT NULL,
    svdpamount_disbursed integer NOT NULL,
    user_date character varying(125) NOT NULL,
    cum_vdp_conducted integer NOT NULL,
    cum_unit_participated integer NOT NULL,
    cum_amount_disbursed integer NOT NULL,
    svdpcum_vdp_conducted integer NOT NULL,
    svdpcum_unit_participated integer NOT NULL,
    svdpcum_amount_disbursed integer NOT NULL,
    totaltarget integer NOT NULL,
    totaltargett integer
);


--
-- Name: tbl_workshop; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_workshop (
    sno integer NOT NULL,
    instid character varying(45) NOT NULL,
    "smallint" character varying(45) NOT NULL,
    months integer NOT NULL,
    no_of_unit_benefitted integer NOT NULL,
    no_jobs_undertaken integer NOT NULL,
    no_trainees_trained integer NOT NULL,
    no_jobs_completed integer NOT NULL,
    no_units_registered integer NOT NULL,
    capacity_assessment integer NOT NULL,
    user_date character varying(154) NOT NULL,
    cum_no_of_unit_benefitted integer NOT NULL,
    cum_no_jobs_undertaken integer NOT NULL,
    cum_no_trainees_trained integer NOT NULL,
    cum_no_jobs_completed integer NOT NULL,
    cum_no_units_registered integer NOT NULL,
    cum_capacity_assessment integer NOT NULL,
    target integer NOT NULL
);


--
-- Name: temp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.temp (
    useroid character(6) DEFAULT NULL::bpchar,
    moduleoid character(6) DEFAULT NULL::bpchar,
    userprivoid character(6) DEFAULT NULL::bpchar,
    moduleid character(6) DEFAULT NULL::bpchar
);


--
-- Name: test; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.test (
    username character varying(20) DEFAULT ''::character varying NOT NULL
);


--
-- Name: tl_institute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tl_institute (
    id integer NOT NULL,
    inst_id character(10) NOT NULL,
    inst_name character(200) DEFAULT NULL::bpchar,
    inst_address character(200) DEFAULT NULL::bpchar
);


--
-- Name: totalinst; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.totalinst (
    name character varying(122) DEFAULT NULL::character varying
);


--
-- Name: user_cr_mapping; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_cr_mapping (
    user_id character varying(25) DEFAULT NULL::character varying,
    inst_id character varying(10) DEFAULT NULL::character varying,
    tr_cat_id integer
);


--
-- Name: user_di_mapping; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_di_mapping (
    user_id character(25) DEFAULT NULL::bpchar,
    inst_id character(10) DEFAULT NULL::bpchar,
    tr_cat_id integer
);


--
-- Name: user_id_mapping; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_id_mapping (
    user_id character(25) DEFAULT NULL::bpchar,
    inst_id character(10) DEFAULT NULL::bpchar,
    tr_cat_id integer
);


--
-- Name: user_old_pass_toolroom; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_old_pass_toolroom (
    sno integer NOT NULL,
    inst character varying(45) NOT NULL,
    password character varying(100) NOT NULL,
    no_of_changes integer NOT NULL,
    "time" character varying(45) NOT NULL,
    user_ip character varying(45) NOT NULL
);


--
-- Name: vendor_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendor_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon date,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Name: workshop_audit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workshop_audit (
    id integer NOT NULL,
    inst_id character varying(51) NOT NULL,
    months character varying(50) NOT NULL,
    years character varying(50) NOT NULL,
    changedon date,
    action character varying(50) DEFAULT NULL::character varying
);


--
-- Data for Name: ab; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ab (name) FROM stdin;
\.


--
-- Data for Name: back_upfinancial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.back_upfinancial (inst_id, months, years, months_year, rev_ear_cash_trng_target, rev_ear_cash_trng_dtm, rev_ear_cash_trng_cum, rev_ear_cash_prdtn_target, rev_ear_cash_prdtn_dtm, rev_ear_cash_prdtn_cum, rev_ear_cash_misc_target, rev_ear_cash_misc_dtm, rev_ear_cash_misc_cum, rev_ear_cash_total_target, rev_ear_cash_total_dtm, rev_ear_cash_total_cum, rev_ear_accrual_trng_target, rev_ear_accrual_trng_dtm, rev_ear_accrual_trng_cum, rev_ear_accrual_prdtn_target, rev_ear_accrual_prdtn_dtm, rev_ear_accrual_prdtn_cum, rev_ear_accrual_misc_target, rev_ear_accrual_misc_dtm, rev_ear_accrual_misc_cum, rev_ear_accrual_total_target, rev_ear_accrual_total_dtm, rev_ear_accrual_total_cum, rev_exp_cash_target, rev_exp_cash_dtm, rev_exp_cash_cum, rev_exp_accrual_target, rev_exp_accrual_dtm, rev_exp_accrual_cum, inc_exp_cash_target, inc_exp_cash_dtm, inc_exp_cash_cum, inc_exp_accrual_target, inc_exp_accrual_dtm, inc_exp_accrual_cum, per_rec_cash_target, per_rec_cash_dtm, per_rec_cash_cum, per_rec_accrual_target, per_rec_accrual_dtm, per_rec_accrual_cum, sisi_nm, test_cal_services_target, test_cal_services_dtm, test_cal_services_mon, test_cal_services_acc_target, test_cal_services_acc_dtm, test_cal_services_acc_mon, sno) FROM stdin;
\.


--
-- Data for Name: budget_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.budget_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: changess; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.changess (sno, user_id, action, datetim) FROM stdin;
\.


--
-- Data for Name: cr_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cr_users (user_id, password, role, localrole, temprole) FROM stdin;
\.


--
-- Data for Name: emp_mstr; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.emp_mstr (emp_no, password, branch_no, fname, mname, lname, dept, desig, addr) FROM stdin;
\.


--
-- Data for Name: esdp_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.esdp_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.feedback (oid, referenceid, name, email, organisation, designation, address, phone, fax, category, feedback, feedbackdt, status, guestbkentry, pendingwith, acktype, ackby, ackdt, replydt, repliedby, comments, createdby, modifiedby, createdon, modifiedon) FROM stdin;
\.


--
-- Data for Name: feedbackaction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.feedbackaction (oid, action, actiondt, actionby, pendingwith, comments) FROM stdin;
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.file (file_id, file_data) FROM stdin;
\.


--
-- Data for Name: file_tbl; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.file_tbl (id, file_data, file_date) FROM stdin;
\.


--
-- Data for Name: financial_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.financial_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: iso_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.iso_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: latandlon; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.latandlon (id, lat, lon, address) FROM stdin;
\.


--
-- Data for Name: maps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.maps (city, top, left1) FROM stdin;
\.


--
-- Data for Name: msme_di_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.msme_di_users (user_id, password, role, institute) FROM stdin;
\.


--
-- Data for Name: msme_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.msme_users (user_id, role, password) FROM stdin;
admin                                                                                                                        	SU                       	731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab
admin2                                                                                                                       	SU                       	57eb4cac3cc548ccc73ceb2f73d23488598a560adbdaf130171b6b6d870355a0
Charnjeet                                                                                                                    	SU                       	6e017f646ed8df9da722a60174e708014dc72405824a1b24dc0542aeb96a5d0c
IZZATULLAH                                                                                                                   	SU                       	6e017f646ed8df9da722a60174e708014dc72405824a1b24dc0542aeb96a5d0c
BASU                                                                                                                         	SU                       	57eb4cac3cc548ccc73ceb2f73d23488598a560adbdaf130171b6b6d870355a0
SEC-MSME                                                                                                                     	SU                       	731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab
SU                                                                                                                           	SU                       	7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358
\.


--
-- Data for Name: physical_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.physical_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: report_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.report_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: revenue_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.revenue_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: rolemanagement; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rolemanagement (role) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (role_id, role_name) FROM stdin;
\.


--
-- Data for Name: samodule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.samodule (oid, abbreviation, description, createdby, createdon, modifiedby, modifiedon, modulename) FROM stdin;
\.


--
-- Data for Name: samodulepriv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.samodulepriv (moduleoid, userprivoid) FROM stdin;
\.


--
-- Data for Name: sastate; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sastate (statecode, statename, createdon, createdby) FROM stdin;
\.


--
-- Data for Name: sauseraccount; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sauseraccount (oid, disabled, userid, password, publickey, createdby, createdon, modifiedby, modifiedon, usertype, key1, firstname, lastname) FROM stdin;
\.


--
-- Data for Name: sauseraccpriv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sauseraccpriv (useroid, moduleoid, userprivoid) FROM stdin;
\.


--
-- Data for Name: sauserpriv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sauserpriv (oid, abbreviation, description, createdby, createdon, modifiedby, modifiedon, privname) FROM stdin;
\.


--
-- Data for Name: specialprogrammes_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.specialprogrammes_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: state; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.state (statecode, statename, createdon, createdby, modifiedon, modifiedby) FROM stdin;
\.


--
-- Data for Name: tbl_acr; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_acr (sno, name, designation, date_of_birth, year2004, status, year2005, status1, year2006, status2, year2007, status3, year2008, status4, year2009, status5, year2010, status6, year2011, status7, year2012, status8, year2013, status9, year2014, status10, year2000, status11, year2001, status12, year2002, status13, year2003, status14, user_id) FROM stdin;
\.


--
-- Data for Name: tbl_acr_record; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_acr_record (sno, name, employee_history, employee_history1) FROM stdin;
\.


--
-- Data for Name: tbl_b; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_b (inst_id, months, years, months_year, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm) FROM stdin;
\.


--
-- Data for Name: tbl_br_senet; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_br_senet (inst_id, months, "smallint", branch, br_hardware_target, br_hardware_tomonth, br_hardware_upto, br_con_target, br_con_tomonth, br_con_upto) FROM stdin;
\.


--
-- Data for Name: tbl_budget; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget (inst_id, months, months_year, years, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm, newtext) FROM stdin;
\.


--
-- Data for Name: tbl_budget_123; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget_123 (inst_id, months, years, months_year, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm) FROM stdin;
\.


--
-- Data for Name: tbl_budget_bk; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget_bk (inst_id, months, months_year, years, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm) FROM stdin;
\.


--
-- Data for Name: tbl_budget_bk1; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget_bk1 (inst_id, months, months_year, years, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm) FROM stdin;
\.


--
-- Data for Name: tbl_budget_bkp; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget_bkp (inst_id, months, months_year, years, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm) FROM stdin;
\.


--
-- Data for Name: tbl_budget_copy; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget_copy (inst_id, months, months_year, years, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm, newtext) FROM stdin;
\.


--
-- Data for Name: tbl_budget_old; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget_old (inst_id, months, years, months_year, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm, details_visit, significant_1, shorts_fall_1) FROM stdin;
\.


--
-- Data for Name: tbl_budget_old_19july2010; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_budget_old_19july2010 (inst_id, months, years, months_year, cry_fwd_amt, cry_fwd_util_dm, cry_fwd_util_cum, cry_fwd_util_bal, gia_amt, stf_st_ss_a, stf_st_ss_b, stf_st_ss_c, stf_st_ss_d, stf_st_pos_a, stf_st_pos_b, stf_st_pos_c, stf_st_pos_d, gia_util_dm, gia_util_cum, gia_util_bal, budget_total_amt, budget_total_util_dm, budget_total_util_cum, budget_total_util_bal, details_visit, machine_dtm, machine_cum, significant, shorts_fall, sisi_nm) FROM stdin;
\.


--
-- Data for Name: tbl_cabinet_summary; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_cabinet_summary (inst_id, months, years, months_year, rte_content, sisi_nm, rte_content_n) FROM stdin;
\.


--
-- Data for Name: tbl_course_txn; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_course_txn (inst_id, months, years, target, dtm, commulative, dates, sisi_nm, course_name) FROM stdin;
\.


--
-- Data for Name: tbl_course_txn_13112023; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_course_txn_13112023 (inst_id, months, years, target, dtm, commulative, dates, sisi_nm, course_name) FROM stdin;
\.


--
-- Data for Name: tbl_course_txn_bk1; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_course_txn_bk1 (inst_id, months, years, target, dtm, commulative, dates, sisi_nm, course_name) FROM stdin;
\.


--
-- Data for Name: tbl_course_txn_new; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_course_txn_new (course_index, inst_id, months, years, target, dtm, commulative, dates, sisi_nm, course_name) FROM stdin;
\.


--
-- Data for Name: tbl_course_txn_old_19july2010; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_course_txn_old_19july2010 (inst_id, months, years, target, dtm, commulative, dates, sisi_nm, course_name) FROM stdin;
\.


--
-- Data for Name: tbl_court_syn; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_court_syn (sno, court_name, court_abbrv) FROM stdin;
\.


--
-- Data for Name: tbl_di_institute; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_di_institute (id, inst_id, inst_name, inst_address) FROM stdin;
\.


--
-- Data for Name: tbl_di_target; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_di_target (instid, years, imc, edp_nonstiphen, edp_stiphen_w, edp_stiphen_sc, edp_stiphen_st, edp_sanction, esdp_nonstiphen_gen, esdp_nonstiphen_sc, esdp_nonstiphen_st, esdp_stiphen_w, esdp_stiphen_sc, esdp_stiphen_st, esdp_sanction, mdp, bsdp_gen, bsdp_sc, bsdp_st, esdpbiotech, msme_di) FROM stdin;
\.


--
-- Data for Name: tbl_di_target_month; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_di_target_month (instid, years, month, esdp, edp, mdp, esdp_biotech, imc, bsdp, inst_name) FROM stdin;
\.


--
-- Data for Name: tbl_di_target_ner; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_di_target_ner (instid, years, imc, edp_nonstiphen, edp_stiphen_w, edp_stiphen_sc, edp_stiphen_st, edp_sanction, esdp_nonstiphen_gen, esdp_nonstiphen_sc, esdp_nonstiphen_st, esdp_stiphen_w, esdp_stiphen_sc, esdp_stiphen_st, esdp_sanction, mdp, bsdp_gen, bsdp_sc, bsdp_st, esdpbiotech, msme_di) FROM stdin;
\.


--
-- Data for Name: tbl_dis_entry; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_dis_entry (id_no, inst_id, years, months, program_name, program_div, program_type, yearly_target, target_report_month, achiv_report_month, expenditure, sc_m, sc_f, st_m, st_f, obc_m, obc_f, budhist_m, budhist_f, christian_m, christian_f, muslim_m, muslim_f, parsi_m, parsi_f, sikh_m, sikh_f, others_m, others_f, adv_drawn_di_month, no_prog_report_month, creation_date, ph_m, ph_f, sno, total_m, total_f) FROM stdin;
\.


--
-- Data for Name: tbl_employee_details; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_employee_details (sno, employee_history, employee_history1, place, name, date_of_joining, reference_number, date_of_joining_inmsme, current, promtion_details, division_workingon, date_of_confirmation, reference, recuritment, remarks) FROM stdin;
\.


--
-- Data for Name: tbl_esdp; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_esdp (sno, instid, months, "smallint", esdp2, esdp3, edp2, edp3, bsdp2, bsdp3, mdp2, mdp3, sdp2, sdp3, imc2, imc3, other2, other3, user_date, esdp4, esdp5, edp4, edp5, bsdp4, bsdp5, mdp4, mdp5, imc4, imc5, other4, other5, sdp4, sdp5, esdp1, edp1, bsdp1, mdp1, sdp1, imc1, other1) FROM stdin;
\.


--
-- Data for Name: tbl_feedback; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_feedback (sno, txtname, txtdesignation, txtorganization, txtaddress, telephone, query, email, randomno) FROM stdin;
\.


--
-- Data for Name: tbl_financial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_financial (inst_id, months, years, months_year, rev_ear_cash_trng_target, rev_ear_cash_trng_dtm, rev_ear_cash_trng_cum, rev_ear_cash_prdtn_target, rev_ear_cash_prdtn_dtm, rev_ear_cash_prdtn_cum, rev_ear_cash_misc_target, rev_ear_cash_misc_dtm, rev_ear_cash_misc_cum, rev_ear_cash_total_target, rev_ear_cash_total_dtm, rev_ear_cash_total_cum, rev_ear_accrual_trng_target, rev_ear_accrual_trng_dtm, rev_ear_accrual_trng_cum, rev_ear_accrual_prdtn_target, rev_ear_accrual_prdtn_dtm, rev_ear_accrual_prdtn_cum, rev_ear_accrual_misc_target, rev_ear_accrual_misc_dtm, rev_ear_accrual_misc_cum, rev_ear_accrual_total_target, rev_ear_accrual_total_dtm, rev_ear_accrual_total_cum, rev_exp_cash_target, rev_exp_cash_dtm, rev_exp_cash_cum, rev_exp_accrual_target, rev_exp_accrual_dtm, rev_exp_accrual_cum, inc_exp_cash_target, inc_exp_cash_dtm, inc_exp_cash_cum, inc_exp_accrual_target, inc_exp_accrual_dtm, inc_exp_accrual_cum, per_rec_cash_target, per_rec_cash_dtm, per_rec_cash_cum, per_rec_accrual_target, per_rec_accrual_dtm, per_rec_accrual_cum, sisi_nm, test_cal_services_target, test_cal_services_dtm, test_cal_services_mon, test_cal_services_acc_target, test_cal_services_acc_dtm, test_cal_services_acc_mon, sno, rev_ear_csh_bas_consult_target, rev_ear_csh_bas_consult_dtm, rev_ear_csh_bas_consult_cum, rev_ear_accl_bas_consult_target, rev_ear_accl_bas_consult_dtm, rev_ear_accl_bas_consult_cum, rev_ear_cash_prdtn_tooling_target, rev_ear_cash_prdtn_tooling_dtm, rev_ear_cash_prdtn_tooling_cum, rev_ear_cash_prdtn_otherjob_target, rev_ear_cash_prdtn_otherjob_dtm, rev_ear_cash_prdtn_otherjob_cum, rev_ear_accrual_prdtn_tooling_target, rev_ear_accrual_prdtn_tooling_dtm, rev_ear_accrual_prdtn_tooling_cum, rev_ear_accrual_prdtn_otherjob_target, rev_ear_accrual_prdtn_otherjob_dtm, rev_ear_accrual_prdtn_otherjob_cum) FROM stdin;
\.


--
-- Data for Name: tbl_financial_bk; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_financial_bk (inst_id, months, years, months_year, rev_ear_cash_trng_target, rev_ear_cash_trng_dtm, rev_ear_cash_trng_cum, rev_ear_cash_prdtn_target, rev_ear_cash_prdtn_dtm, rev_ear_cash_prdtn_cum, rev_ear_cash_misc_target, rev_ear_cash_misc_dtm, rev_ear_cash_misc_cum, rev_ear_cash_total_target, rev_ear_cash_total_dtm, rev_ear_cash_total_cum, rev_ear_accrual_trng_target, rev_ear_accrual_trng_dtm, rev_ear_accrual_trng_cum, rev_ear_accrual_prdtn_target, rev_ear_accrual_prdtn_dtm, rev_ear_accrual_prdtn_cum, rev_ear_accrual_misc_target, rev_ear_accrual_misc_dtm, rev_ear_accrual_misc_cum, rev_ear_accrual_total_target, rev_ear_accrual_total_dtm, rev_ear_accrual_total_cum, rev_exp_cash_target, rev_exp_cash_dtm, rev_exp_cash_cum, rev_exp_accrual_target, rev_exp_accrual_dtm, rev_exp_accrual_cum, inc_exp_cash_target, inc_exp_cash_dtm, inc_exp_cash_cum, inc_exp_accrual_target, inc_exp_accrual_dtm, inc_exp_accrual_cum, per_rec_cash_target, per_rec_cash_dtm, per_rec_cash_cum, per_rec_accrual_target, per_rec_accrual_dtm, per_rec_accrual_cum, sisi_nm, test_cal_services_target, test_cal_services_dtm, test_cal_services_mon, test_cal_services_acc_target, test_cal_services_acc_dtm, test_cal_services_acc_mon, sno) FROM stdin;
\.


--
-- Data for Name: tbl_financial_bk1; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_financial_bk1 (inst_id, months, years, months_year, rev_ear_cash_trng_target, rev_ear_cash_trng_dtm, rev_ear_cash_trng_cum, rev_ear_cash_prdtn_target, rev_ear_cash_prdtn_dtm, rev_ear_cash_prdtn_cum, rev_ear_cash_misc_target, rev_ear_cash_misc_dtm, rev_ear_cash_misc_cum, rev_ear_cash_total_target, rev_ear_cash_total_dtm, rev_ear_cash_total_cum, rev_ear_accrual_trng_target, rev_ear_accrual_trng_dtm, rev_ear_accrual_trng_cum, rev_ear_accrual_prdtn_target, rev_ear_accrual_prdtn_dtm, rev_ear_accrual_prdtn_cum, rev_ear_accrual_misc_target, rev_ear_accrual_misc_dtm, rev_ear_accrual_misc_cum, rev_ear_accrual_total_target, rev_ear_accrual_total_dtm, rev_ear_accrual_total_cum, rev_exp_cash_target, rev_exp_cash_dtm, rev_exp_cash_cum, rev_exp_accrual_target, rev_exp_accrual_dtm, rev_exp_accrual_cum, inc_exp_cash_target, inc_exp_cash_dtm, inc_exp_cash_cum, inc_exp_accrual_target, inc_exp_accrual_dtm, inc_exp_accrual_cum, per_rec_cash_target, per_rec_cash_dtm, per_rec_cash_cum, per_rec_accrual_target, per_rec_accrual_dtm, per_rec_accrual_cum, sisi_nm, test_cal_services_target, test_cal_services_dtm, test_cal_services_mon, test_cal_services_acc_target, test_cal_services_acc_dtm, test_cal_services_acc_mon, sno) FROM stdin;
\.


--
-- Data for Name: tbl_financial_copy; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_financial_copy (inst_id, months, years, months_year, rev_ear_cash_trng_target, rev_ear_cash_trng_dtm, rev_ear_cash_trng_cum, rev_ear_cash_prdtn_target, rev_ear_cash_prdtn_dtm, rev_ear_cash_prdtn_cum, rev_ear_cash_misc_target, rev_ear_cash_misc_dtm, rev_ear_cash_misc_cum, rev_ear_cash_total_target, rev_ear_cash_total_dtm, rev_ear_cash_total_cum, rev_ear_accrual_trng_target, rev_ear_accrual_trng_dtm, rev_ear_accrual_trng_cum, rev_ear_accrual_prdtn_target, rev_ear_accrual_prdtn_dtm, rev_ear_accrual_prdtn_cum, rev_ear_accrual_misc_target, rev_ear_accrual_misc_dtm, rev_ear_accrual_misc_cum, rev_ear_accrual_total_target, rev_ear_accrual_total_dtm, rev_ear_accrual_total_cum, rev_exp_cash_target, rev_exp_cash_dtm, rev_exp_cash_cum, rev_exp_accrual_target, rev_exp_accrual_dtm, rev_exp_accrual_cum, inc_exp_cash_target, inc_exp_cash_dtm, inc_exp_cash_cum, inc_exp_accrual_target, inc_exp_accrual_dtm, inc_exp_accrual_cum, per_rec_cash_target, per_rec_cash_dtm, per_rec_cash_cum, per_rec_accrual_target, per_rec_accrual_dtm, per_rec_accrual_cum, sisi_nm, test_cal_services_target, test_cal_services_dtm, test_cal_services_mon, test_cal_services_acc_target, test_cal_services_acc_dtm, test_cal_services_acc_mon, sno, rev_ear_csh_bas_consult_target, rev_ear_csh_bas_consult_dtm, rev_ear_csh_bas_consult_cum, rev_ear_accl_bas_consult_target, rev_ear_accl_bas_consult_dtm, rev_ear_accl_bas_consult_cum, rev_ear_cash_prdtn_tooling_target, rev_ear_cash_prdtn_tooling_dtm, rev_ear_cash_prdtn_tooling_cum, rev_ear_cash_prdtn_otherjob_target, rev_ear_cash_prdtn_otherjob_dtm, rev_ear_cash_prdtn_otherjob_cum, rev_ear_accrual_prdtn_tooling_target, rev_ear_accrual_prdtn_tooling_dtm, rev_ear_accrual_prdtn_tooling_cum, rev_ear_accrual_prdtn_otherjob_target, rev_ear_accrual_prdtn_otherjob_dtm, rev_ear_accrual_prdtn_otherjob_cum) FROM stdin;
\.


--
-- Data for Name: tbl_financial_mpr; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_financial_mpr (rev_ear_csh_bas_trng_target, rev_ear_csh_bas_trng_dtm, rev_ear_csh_bas_trng_cumu_mon, rev_ear_csh_bas_trng_cumu_annu, rev_ear_csh_bas_prdn_target, rev_ear_csh_bas_prdn_dtm, rev_ear_csh_bas_prdn_cumu_mon, rev_ear_csh_bas_prdn_cumu_annu, test_cal_services_target, test_cal_services_dtm, test_cal_services_mon, test_cal_services_annu, rev_ear_csh_bas_misc_target, rev_ear_csh_bas_misc_dtm, rev_ear_csh_bas_misc_cumu_mon, rev_ear_csh_bas_misc_cumu_annu, rev_ear_csh_bas_total_target, rev_ear_csh_bas_total_dtm, rev_ear_csh_bas_total_cumu_mon, rev_ear_csh_bas_total_cumu_annu, rev_ear_accl_bas_trng_target, rev_ear_accl_bas_trng_dtm, rev_ear_accl_bas_trng_cumu_mon, rev_ear_accl_bas_trng_cumu_annu, rev_ear_accl_bas_prdn_target, rev_ear_accl_bas_prdn_dtm, rev_ear_accl_bas_prdn_cumu_mon, rev_ear_accl_bas_prdn_cumu_annu, test_cal_services_acc_target, test_cal_services_acc_dtm, test_cal_services_acc_mon, test_cal_services_acc_annu, rev_ear_accl_bas_misc_target, rev_ear_accl_bas_misc_dtm, rev_ear_accl_bas_misc_cumu_mon, rev_ear_accl_bas_misc_cumu_annu, rev_ear_accl_bas_total_target, rev_ear_accl_bas_total_dtm, rev_ear_accl_bas_total_cumu_mon, rev_ear_accl_bas_total_cumu_annu, rev_exp_cash_bas_target, rev_exp_cash_bas_dtm, rev_exp_cash_bas_cumu_mon, rev_exp_cash_bas_cumu_annu, rev_exp_accl_bas_target, rev_exp_accl_bas_dtm, rev_exp_accl_bas_cumu_mon, rev_exp_accl_bas_cumu_annu, exc_exp_cash_bas_target, exc_exp_cash_bas_dtm, exc_exp_cash_bas_cumu_mon, exc_exp_cash_bas_cumu_annu, exc_exp_accl_bas_target, exc_exp_accl_bas_dtm, exc_exp_accl_bas_cumu_mon, exc_exp_accl_bas_cumu_annu, per_rec_cash_bas_target, per_rec_cash_bas_dtm, per_rec_cash_bas_cumu_mon, per_rec_cash_bas_cumu_annu, per_rec_accl_bas_target, per_rec_accl_bas_dtm, per_rec_accl_bas_cumu_mon, per_rec_accl_bas_cumu_annu, inst_id, months, years, months_year) FROM stdin;
\.


--
-- Data for Name: tbl_financial_old_19july2010; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_financial_old_19july2010 (inst_id, months, years, months_year, rev_ear_cash_trng_target, rev_ear_cash_trng_dtm, rev_ear_cash_trng_cum, rev_ear_cash_prdtn_target, rev_ear_cash_prdtn_dtm, rev_ear_cash_prdtn_cum, rev_ear_cash_misc_target, rev_ear_cash_misc_dtm, rev_ear_cash_misc_cum, rev_ear_cash_total_target, rev_ear_cash_total_dtm, rev_ear_cash_total_cum, rev_ear_accrual_trng_target, rev_ear_accrual_trng_dtm, rev_ear_accrual_trng_cum, rev_ear_accrual_prdtn_target, rev_ear_accrual_prdtn_dtm, rev_ear_accrual_prdtn_cum, rev_ear_accrual_misc_target, rev_ear_accrual_misc_dtm, rev_ear_accrual_misc_cum, rev_ear_accrual_total_target, rev_ear_accrual_total_dtm, rev_ear_accrual_total_cum, rev_exp_cash_target, rev_exp_cash_dtm, rev_exp_cash_cum, rev_exp_accrual_target, rev_exp_accrual_dtm, rev_exp_accrual_cum, inc_exp_cash_target, inc_exp_cash_dtm, inc_exp_cash_cum, inc_exp_accrual_target, inc_exp_accrual_dtm, inc_exp_accrual_cum, per_rec_cash_target, per_rec_cash_dtm, per_rec_cash_cum, per_rec_accrual_target, per_rec_accrual_dtm, per_rec_accrual_cum, sisi_nm) FROM stdin;
\.


--
-- Data for Name: tbl_industrial_profile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_industrial_profile (filename, state, msmedi, district) FROM stdin;
\.


--
-- Data for Name: tbl_ip_registry; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_ip_registry (role, date_of_visiting, user_id, ip_address) FROM stdin;
\.


--
-- Data for Name: tbl_iso; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_iso (currdate, name_o_unit, chan_propri, loc_unit, cor_off_addr, con_tel_no, con_fax_no, con_email, con_web_add, type_of_unit, size_unit, manu_details, pro_rd_act, pro_test_lab, pro_sal_ser, turn_over, profit, man_details, mark_dos_inter, em_no_details, type_iso, date_imp_iso, curr_stat, subsidy, category, details_of_inter_st, brand_adop, other_info, iso_code) FROM stdin;
\.


--
-- Data for Name: tbl_iso_mapping; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_iso_mapping (user_id, inst_id, tr_cat_id) FROM stdin;
\.


--
-- Data for Name: tbl_isotarget; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_isotarget (sno, iso_gen, iso_ner, iso_scp, iso_tsp, iso_wom, inst_id, "smallint") FROM stdin;
\.


--
-- Data for Name: tbl_judical_detail; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_judical_detail (sno, serial_number, detail_of_case, date_of_entry, stakes_involved, status, detail_of_application, present_status_of_the_case, months, "smallint", inst_id, nature_of_court, controlling_officers, date_of_next_hearing, expected_date_of_filing, affidavit_date_of_filing_ca, cases_related_to, year_of_case, status_of_case) FROM stdin;
\.


--
-- Data for Name: tbl_library; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_library (sno, inst_id, months, "smallint", amc_of_pc1, amc_of_pc2, amc_of_pc, br_hardware_target, br_hardware_tomonth, br_hardware_upto, br_hardware_target_1, br_hardware_tomonth_1, br_hardware_upto_1, br_hardware_target_2, br_hardware_tomonth_2, br_hardware_upto_2, br_hardware_target_3, br_hardware_tomonth_3, br_hardware_upto_3, br_hardware_target_4, br_hardware_tomonth_4, br_hardware_upto_4, br_hardware_target_5, br_hardware_tomonth_5, br_hardware_upto_5) FROM stdin;
\.


--
-- Data for Name: tbl_lofin_detail; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_lofin_detail (sno, name, cmbins, role, ip_address, datetim) FROM stdin;
\.


--
-- Data for Name: tbl_login; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_login (sno, name, cmbins, role, ip_address, datetim, action, status) FROM stdin;
\.


--
-- Data for Name: tbl_login_detail_courtcases; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_login_detail_courtcases (sno, name, cmbins, role, ip_address) FROM stdin;
\.


--
-- Data for Name: tbl_month; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_month (sno, months, mon) FROM stdin;
\.


--
-- Data for Name: tbl_msme_di_amc; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_msme_di_amc (sno, msme_di, amc_of_pcs, web_maint, leased_line, contingenciess, hw_sw, total, sanction_no, sanction_date, "smallint", month) FROM stdin;
\.


--
-- Data for Name: tbl_msme_di_unspent_fund; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_msme_di_unspent_fund (months, years, sno, msme_di, amc_of_pcs, web_maint, leased_line, contingenciess, hw_sw, total) FROM stdin;
\.


--
-- Data for Name: tbl_personaldata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_personaldata (sno, name, date_of_birth, telenumber, mobnumber, address, family, designation, caste, discipline, date_of_superannuation, uname) FROM stdin;
\.


--
-- Data for Name: tbl_phonebook; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_phonebook (sno, name, address, division, designation, phonenumber, mobilenumber) FROM stdin;
\.


--
-- Data for Name: tbl_physical; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_physical (inst_id, months, months_year, years, nju_msme_no_target, nju_msme_no_dtm, nju_msme_no_cum, nju_msme_value_target, nju_msme_value_dtm, nju_msme_value_cum, nju_other_no_target, nju_other_no_dtm, nju_other_no_cum, nju_other_value_target, nju_other_value_dtm, nju_other_value_cum, conslt_msme_target, conslt_msme_dtm, conslt_msme_cum, conslt_other_target, conslt_other_dtm, conslt_other_cum, any_other_target, any_other_dtm, any_other_cum, ta_ltc_target, ta_ltc_dtm, ta_ltc_cum, ta_stc_ncc_target, ta_stc_ncc_dtm, ta_stc_ncc_cum, ta_stc_ntt_target, ta_stc_ntt_dtm, ta_stc_ntt_cum, ta_others_target, ta_others_dtm, ta_others_cum, seminar_no_target, seminar_no_dtm, seminar_no_cum, seminar_participants_target, seminar_participants_dtm, seminar_participants_cum, ttb_dtm_sc, ttb_dtm_st, ttb_dtm_women, ttb_dtm_obc, ttb_dtm_ph, ttb_dtm_min, ttb_dtm_total, ttb_cum_sc, ttb_cum_st, ttb_cum_women, ttb_cum_obc, ttb_cum_ph, ttb_cum_min, ttb_cum_total, sisi_nm, trng_total_noc_cumu_mon, trng_total_noc_dtm, tring_total_not_dtm, tring_total_not_cum, general_ttb, general_cum, gen, men, transgender, tenfail, tenpass, twelth, graduation, pg, limit1, limit2, limit3, limit4, gen_cum, men_cum, transgender_cum, tenfail_cum, tenpass_cum, twelth_cum, graduation_cum, pg_cum, limit1_cum, limit2_cum, limit3_cum, limit4_cum, above, abovec, diploma, diplomac, iti, graduation_nontech, graduation_tech, postgraduate_nontech, postgraduate_tech, phdmhil, itic, graduation_nontechc, graduation_techc, postgraduate_nontechc, postgraduate_techc, phdmhilc, msme_nos_tooling_target, msme_nos_tooling_dtm, msme_nos_tooling_cumu_mon, msme_values_tooling_target, msme_values_tooling_dtm, msme_values_tooling_cumu_mon, other_nos_tooling_target, other_nos_tooling_dtm, other_nos_tooling_cumu_mon, other_values_tooling_target, other_values_tooling_dtm, other_values_tooling_cumu_mon, msme_nos_otherjob_target, msme_nos_otherjob_dtm, msme_nos_otherjob_cumu_mon, msme_values_otherjob_target, msme_values_otherjob_dtm, msme_values_otherjob_cumu_mon, other_nos_otherjob_target, other_nos_otherjob_dtm, other_nos_otherjob_cumu_mon, other_values_otherjob_target, other_values_otherjob_dtm, other_values_otherjob_cumu_mon) FROM stdin;
\.


--
-- Data for Name: tbl_physical_13112023; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_physical_13112023 (inst_id, months, months_year, years, nju_msme_no_target, nju_msme_no_dtm, nju_msme_no_cum, nju_msme_value_target, nju_msme_value_dtm, nju_msme_value_cum, nju_other_no_target, nju_other_no_dtm, nju_other_no_cum, nju_other_value_target, nju_other_value_dtm, nju_other_value_cum, conslt_msme_target, conslt_msme_dtm, conslt_msme_cum, conslt_other_target, conslt_other_dtm, conslt_other_cum, any_other_target, any_other_dtm, any_other_cum, ta_ltc_target, ta_ltc_dtm, ta_ltc_cum, ta_stc_ncc_target, ta_stc_ncc_dtm, ta_stc_ncc_cum, ta_stc_ntt_target, ta_stc_ntt_dtm, ta_stc_ntt_cum, ta_others_target, ta_others_dtm, ta_others_cum, seminar_no_target, seminar_no_dtm, seminar_no_cum, seminar_participants_target, seminar_participants_dtm, seminar_participants_cum, ttb_dtm_sc, ttb_dtm_st, ttb_dtm_women, ttb_dtm_obc, ttb_dtm_ph, ttb_dtm_min, ttb_dtm_total, ttb_cum_sc, ttb_cum_st, ttb_cum_women, ttb_cum_obc, ttb_cum_ph, ttb_cum_min, ttb_cum_total, sisi_nm, trng_total_noc_cumu_mon, trng_total_noc_dtm, tring_total_not_dtm, tring_total_not_cum, general_ttb, general_cum, gen, men, transgender, tenfail, tenpass, twelth, graduation, pg, limit1, limit2, limit3, limit4, gen_cum, men_cum, transgender_cum, tenfail_cum, tenpass_cum, twelth_cum, graduation_cum, pg_cum, limit1_cum, limit2_cum, limit3_cum, limit4_cum, above, abovec, diploma, diplomac, iti, graduation_nontech, graduation_tech, postgraduate_nontech, postgraduate_tech, phdmhil, itic, graduation_nontechc, graduation_techc, postgraduate_nontechc, postgraduate_techc, phdmhilc, msme_nos_tooling_target, msme_nos_tooling_dtm, msme_nos_tooling_cumu_mon, msme_values_tooling_target, msme_values_tooling_dtm, msme_values_tooling_cumu_mon, other_nos_tooling_target, other_nos_tooling_dtm, other_nos_tooling_cumu_mon, other_values_tooling_target, other_values_tooling_dtm, other_values_tooling_cumu_mon, msme_nos_otherjob_target, msme_nos_otherjob_dtm, msme_nos_otherjob_cumu_mon, msme_values_otherjob_target, msme_values_otherjob_dtm, msme_values_otherjob_cumu_mon, other_nos_otherjob_target, other_nos_otherjob_dtm, other_nos_otherjob_cumu_mon, other_values_otherjob_target, other_values_otherjob_dtm, other_values_otherjob_cumu_mon) FROM stdin;
\.


--
-- Data for Name: tbl_physical_bk; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_physical_bk (inst_id, months, months_year, years, nju_msme_no_target, nju_msme_no_dtm, nju_msme_no_cum, nju_msme_value_target, nju_msme_value_dtm, nju_msme_value_cum, nju_other_no_target, nju_other_no_dtm, nju_other_no_cum, nju_other_value_target, nju_other_value_dtm, nju_other_value_cum, conslt_msme_target, conslt_msme_dtm, conslt_msme_cum, conslt_other_target, conslt_other_dtm, conslt_other_cum, any_other_target, any_other_dtm, any_other_cum, ta_ltc_target, ta_ltc_dtm, ta_ltc_cum, ta_stc_ncc_target, ta_stc_ncc_dtm, ta_stc_ncc_cum, ta_stc_ntt_target, ta_stc_ntt_dtm, ta_stc_ntt_cum, ta_others_target, ta_others_dtm, ta_others_cum, seminar_no_target, seminar_no_dtm, seminar_no_cum, seminar_participants_target, seminar_participants_dtm, seminar_participants_cum, ttb_dtm_sc, ttb_dtm_st, ttb_dtm_women, ttb_dtm_obc, ttb_dtm_ph, ttb_dtm_min, ttb_dtm_total, ttb_cum_sc, ttb_cum_st, ttb_cum_women, ttb_cum_obc, ttb_cum_ph, ttb_cum_min, ttb_cum_total, sisi_nm, trng_total_noc_cumu_mon, trng_total_noc_dtm, tring_total_not_dtm, tring_total_not_cum, general_ttb, general_cum) FROM stdin;
\.


--
-- Data for Name: tbl_physical_bk1; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_physical_bk1 (inst_id, months, months_year, years, nju_msme_no_target, nju_msme_no_dtm, nju_msme_no_cum, nju_msme_value_target, nju_msme_value_dtm, nju_msme_value_cum, nju_other_no_target, nju_other_no_dtm, nju_other_no_cum, nju_other_value_target, nju_other_value_dtm, nju_other_value_cum, conslt_msme_target, conslt_msme_dtm, conslt_msme_cum, conslt_other_target, conslt_other_dtm, conslt_other_cum, any_other_target, any_other_dtm, any_other_cum, ta_ltc_target, ta_ltc_dtm, ta_ltc_cum, ta_stc_ncc_target, ta_stc_ncc_dtm, ta_stc_ncc_cum, ta_stc_ntt_target, ta_stc_ntt_dtm, ta_stc_ntt_cum, ta_others_target, ta_others_dtm, ta_others_cum, seminar_no_target, seminar_no_dtm, seminar_no_cum, seminar_participants_target, seminar_participants_dtm, seminar_participants_cum, ttb_dtm_sc, ttb_dtm_st, ttb_dtm_women, ttb_dtm_obc, ttb_dtm_ph, ttb_dtm_min, ttb_dtm_total, ttb_cum_sc, ttb_cum_st, ttb_cum_women, ttb_cum_obc, ttb_cum_ph, ttb_cum_min, ttb_cum_total, sisi_nm, trng_total_noc_cumu_mon, trng_total_noc_dtm, tring_total_not_dtm, tring_total_not_cum, general_ttb, general_cum) FROM stdin;
\.


--
-- Data for Name: tbl_physical_copy; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_physical_copy (inst_id, months, months_year, years, nju_msme_no_target, nju_msme_no_dtm, nju_msme_no_cum, nju_msme_value_target, nju_msme_value_dtm, nju_msme_value_cum, nju_other_no_target, nju_other_no_dtm, nju_other_no_cum, nju_other_value_target, nju_other_value_dtm, nju_other_value_cum, conslt_msme_target, conslt_msme_dtm, conslt_msme_cum, conslt_other_target, conslt_other_dtm, conslt_other_cum, any_other_target, any_other_dtm, any_other_cum, ta_ltc_target, ta_ltc_dtm, ta_ltc_cum, ta_stc_ncc_target, ta_stc_ncc_dtm, ta_stc_ncc_cum, ta_stc_ntt_target, ta_stc_ntt_dtm, ta_stc_ntt_cum, ta_others_target, ta_others_dtm, ta_others_cum, seminar_no_target, seminar_no_dtm, seminar_no_cum, seminar_participants_target, seminar_participants_dtm, seminar_participants_cum, ttb_dtm_sc, ttb_dtm_st, ttb_dtm_women, ttb_dtm_obc, ttb_dtm_ph, ttb_dtm_min, ttb_dtm_total, ttb_cum_sc, ttb_cum_st, ttb_cum_women, ttb_cum_obc, ttb_cum_ph, ttb_cum_min, ttb_cum_total, sisi_nm, trng_total_noc_cumu_mon, trng_total_noc_dtm, tring_total_not_dtm, tring_total_not_cum, general_ttb, general_cum, gen, men, transgender, tenfail, tenpass, twelth, graduation, pg, limit1, limit2, limit3, limit4, gen_cum, men_cum, transgender_cum, tenfail_cum, tenpass_cum, twelth_cum, graduation_cum, pg_cum, limit1_cum, limit2_cum, limit3_cum, limit4_cum, above, abovec, diploma, diplomac, iti, graduation_nontech, graduation_tech, postgraduate_nontech, postgraduate_tech, phdmhil, itic, graduation_nontechc, graduation_techc, postgraduate_nontechc, postgraduate_techc, phdmhilc, msme_nos_tooling_target, msme_nos_tooling_dtm, msme_nos_tooling_cumu_mon, msme_values_tooling_target, msme_values_tooling_dtm, msme_values_tooling_cumu_mon, other_nos_tooling_target, other_nos_tooling_dtm, other_nos_tooling_cumu_mon, other_values_tooling_target, other_values_tooling_dtm, other_values_tooling_cumu_mon, msme_nos_otherjob_target, msme_nos_otherjob_dtm, msme_nos_otherjob_cumu_mon, msme_values_otherjob_target, msme_values_otherjob_dtm, msme_values_otherjob_cumu_mon, other_nos_otherjob_target, other_nos_otherjob_dtm, other_nos_otherjob_cumu_mon, other_values_otherjob_target, other_values_otherjob_dtm, other_values_otherjob_cumu_mon) FROM stdin;
\.


--
-- Data for Name: tbl_physical_old_19july2010; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_physical_old_19july2010 (inst_id, months, years, months_year, nju_msme_no_target, nju_msme_no_dtm, nju_msme_no_cum, nju_msme_value_target, nju_msme_value_dtm, nju_msme_value_cum, nju_other_no_target, nju_other_no_dtm, nju_other_no_cum, nju_other_value_target, nju_other_value_dtm, nju_other_value_cum, conslt_msme_target, conslt_msme_dtm, conslt_msme_cum, conslt_other_target, conslt_other_dtm, conslt_other_cum, any_other_target, any_other_dtm, any_other_cum, ta_ltc_target, ta_ltc_dtm, ta_ltc_cum, ta_stc_ncc_target, ta_stc_ncc_dtm, ta_stc_ncc_cum, ta_stc_ntt_target, ta_stc_ntt_dtm, ta_stc_ntt_cum, ta_others_target, ta_others_dtm, ta_others_cum, seminar_no_target, seminar_no_dtm, seminar_no_cum, seminar_participants_target, seminar_participants_dtm, seminar_participants_cum, ttb_dtm_sc, ttb_dtm_st, ttb_dtm_women, ttb_dtm_obc, ttb_dtm_ph, ttb_dtm_min, ttb_dtm_total, ttb_cum_sc, ttb_cum_st, ttb_cum_women, ttb_cum_obc, ttb_cum_ph, ttb_cum_min, ttb_cum_total, sisi_nm, trng_total_noc_dtm, trng_total_noc_cumu_mon) FROM stdin;
\.


--
-- Data for Name: tbl_placement; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_placement (sno, inst_id, months, years, year_months, nsqf_com_dm, nsqf_com_cum, nsqf_ex_dm, nsqf_ex_cum, non_nsqf_dm, non_nsqf_cum, ps_trn_cert_dm, ps_trn_cert_cum, ps_trn_opt_plc_dm, ps_trn_opt_plc_cum, ps_trn_reg_smprk_dm, ps_trn_reg_smprk_cum, ps_cnd_plcd_dm, ps_cnd_plcd_cum, ps_emp_trn_dm, ps_emp_trn_cum, ps_trn_opt_hstd_dm, ps_trn_opt_hstd_cum, ps_cnd_opt_slfs_dm, ps_cnd_opt_slfs_cum, ps_cnd_to_beplcd_dm, ps_cnd_to_beplcd_cum, "time", ip, nsqf_ex_ram11_dm, nsqf_ex_ram11_cum, nsqf_ex_ram12_dm, nsqf_ex_ram12_cum, nsqf_ex_ram13_dm, nsqf_ex_ram13_cum, nsqf_ex_ram14_dm, nsqf_ex_ram14_cum, nsqf_ex_ram15_dm, nsqf_ex_ram15_cum, nsqf_ex_ram16_dm, nsqf_ex_ram16_cum, nsqf_ex_ram17_dm, nsqf_ex_ram17_cum, nsqf_ex_ram18_dm, nsqf_ex_ram18_cum, non_nsqf_ram31_dm, non_nsqf_ram31_cum, non_nsqf_ram32_dm, non_nsqf_ram32_cum, non_nsqf_ram33_dm, non_nsqf_ram33_cum, non_nsqf_ram34_dm, non_nsqf_ram34_cum, non_nsqf_ram35_dm, non_nsqf_ram35_cum, non_nsqf_ram36_dm, non_nsqf_ram36_cum, non_nsqf_ram37_dm, non_nsqf_ram37_cum, non_nsqf_ram38_dm, non_nsqf_ram38_cum) FROM stdin;
\.


--
-- Data for Name: tbl_pms_target; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_pms_target (sno, inst_id, "smallint", esdp, edp, bsdp, mdp, sdp, imc, other, vdp, project_new, project_updated, state_industrial, survey, status_report, technology_study, trade, training_programmes, detail_of_projects, sensitization_wto, awareness_bio, programmes_packaging, programmes_bar, awareness_cluster, tequp, sensitization_ipr, awareness_tequp, identification, seminar_on_vsbk, indl_potenial, workshop, vdp1) FROM stdin;
\.


--
-- Data for Name: tbl_report; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_report (sno, instid, months, "smallint", monthly_achievment_new, monthly_achievment_updated, stateindustrial, survey_report_achievment, status_report_achievment, technology_study_achievment, trade_directories_achievment, training_programme_achievment, detail_project_achievment, distict_potenial_achievment, user_date, cum_monthly_achievment_new, cum_monthly_achievment_updated, project_profiles_target_new, project_profiles_target_updated, state_industrial_target, distict_potenial_target, survey_report_target, status_report_target, technology_study_target, trade_directories_target, training_programme_target, detail_project_target) FROM stdin;
\.


--
-- Data for Name: tbl_revenue; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_revenue (sno, instid, months, "smallint", common_total, sale_total, sdp_total, edp_total, mdp_total, seminar_total, capacity_total, project_total, sick_total, inplant_total, surveys_total, energy_total, nsic_total, sale_publication_total, information_total, others_total, accounts_total, user_date, cum_common_total, total, cum_total, esdp_total) FROM stdin;
\.


--
-- Data for Name: tbl_revenue_branch; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_revenue_branch (instid, months, years, msmedi, branch1, branch2, branch3, branch4, branch5, branch6, name, sno, user_date) FROM stdin;
\.


--
-- Data for Name: tbl_search_engine; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_search_engine (sno, aliass, linkofwebsite) FROM stdin;
\.


--
-- Data for Name: tbl_senet; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_senet (sno, inst_id, months, "smallint", amc_of_pc1, web1, connectivity1, contg1, others1, user_date, amc_of_pc2, web2, connectivity2, others2, contg2, amc_of_pc, web, connectivity, contg, others, br_hardware_tomonth, br_con_tomonth, br_contg_tomonth, br_others_tomonth, br_hardware_tomonth_1, br_con_tomonth_1, br_contg_tomonth_1, br_others_tomonth_1, br_hardware_tomonth_2, br_con_tomonth_2, br_contg_tomonth_2, br_others_tomonth_2, br_hardware_tomonth_3, br_contg_tomonth_3, br_others_tomonth_3, br_hardware_tomonth_4, br_con_tomonth_4, br_contg_tomonth_4, br_others_tomonth_4, br_hardware_tomonth_5, br_con_tomonth_5, br_contg_tomonth_5, br_others_tomonth_5, br_con_tomonth_3) FROM stdin;
\.


--
-- Data for Name: tbl_special_program; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_special_program (sno, instid, months, "smallint", sensitization_programme_wto_programmes, sensitization_programme_wto_participants, awareness_bio_programmes, awareness_bio_participants, exports_programmes, exports_participants, bar_coding_programmes, bar_coding_participants, cluster_programmes, cluster_participants, tequp_programmes, tequp_participants, ipr_programmes, ipr_participants, awareness_tequp_programmes, awareness_tequp_participants, awareness_clcss_programmes, awareness_clcss_participants, seminar_vsbk_programmes, seminar_vsbk_participants, user_date, sensitization_programme_wto_target, awareness_bio_target, exports_target, bar_coding_target, cluster_target, tequp_target, ipr_target, awareness_tequp_target, awareness_clcss_target, seminar_vsbk_target) FROM stdin;
\.


--
-- Data for Name: tbl_ssi_mda; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_ssi_mda (sno, inst_id, months, "smallint", fund_release_mda, target_release_mda, exp_mda, mses_mda, cumm_exp_mda, cumm_mses_mda, fund_release_nmcp, target_release_nmcp, exp_nmcp, mses_nmcp, cumm_exp_nmcp, cumm_mses_nmcp, fund_release_nmcp_seminar, target_release_nmcp_seminar, exp_nmcp_seminar, mses_nmcp_seminar, cumm_exp_nmcp_seminar, cumm_mses_nmcp_seminar, user_date) FROM stdin;
\.


--
-- Data for Name: tbl_target_ssi_mda; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_target_ssi_mda (sno, instid, "smallint", fund_release_mda, fund_release_nmcp, fund_release_nmcp_seminar, target_mda, target_nmcp, target_nmcp_seminar) FROM stdin;
\.


--
-- Data for Name: tbl_targetlib; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_targetlib (sno, "smallint", inst_id, amc_of_pc1, br_hardware_target, br_hardware_target_1, br_hardware_target_2, br_hardware_target_3, br_hardware_target_4, br_hardware_target_5) FROM stdin;
\.


--
-- Data for Name: tbl_targetlib_bk; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_targetlib_bk (sno, "smallint", inst_id, amc_of_pc1, br_hardware_target, br_hardware_target_1, br_hardware_target_2, br_hardware_target_3, br_hardware_target_4, br_hardware_target_5) FROM stdin;
\.


--
-- Data for Name: tbl_targetsenet; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_targetsenet (sno, inst_id, months, "smallint", amc_of_pc1, web1, connectivity1, contg1, others1, br_hardware_target, br_con_target, br_contg_target, br_hardware_target_1, br_con_target_1, br_contg_target_1, br_others_target_1, br_hardware_target_2, br_con_target_2, br_contg_target_2, br_others_target_2, br_hardware_target_3, br_con_target_3, br_contg_target_3, br_others_target_3, br_hardware_target_4, br_con_target_4, br_contg_target_4, br_others_target_4, br_hardware_target_5, br_con_target_5, br_contg_target_5, br_others_target_5, br_others_target) FROM stdin;
\.


--
-- Data for Name: tbl_temp_analysisrpt; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_temp_analysisrpt (ptrainees_a, psum_unitsassisted, psum_per_rec_cash_dtm, psum_per_rec_accrual_dtm, auid, atrvatid, age_recy, yearss, months) FROM stdin;
\.


--
-- Data for Name: tbl_tooling_otherjob; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_tooling_otherjob (inst_id, months, years, months_year, rev_ear_cash_prdtn_tooling_target, rev_ear_cash_prdtn_tooling_dtm, rev_ear_cash_prdtn_tooling_cum, rev_ear_cash_prdtn_otherjob_target, rev_ear_cash_prdtn_otherjob_dtm, rev_ear_cash_prdtn_otherjob_cum, rev_ear_accrual_prdtn_tooling_target, rev_ear_accrual_prdtn_tooling_dtm, rev_ear_accrual_prdtn_tooling_cum, rev_ear_accrual_prdtn_otherjob_target, rev_ear_accrual_prdtn_otherjob_dtm, rev_ear_accrual_prdtn_otherjob_cum, sno) FROM stdin;
\.


--
-- Data for Name: tbl_tooling_otherjob_copy; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_tooling_otherjob_copy (inst_id, months, years, months_year, rev_ear_cash_prdtn_tooling_target, rev_ear_cash_prdtn_tooling_dtm, rev_ear_cash_prdtn_tooling_cum, rev_ear_cash_prdtn_otherjob_target, rev_ear_cash_prdtn_otherjob_dtm, rev_ear_cash_prdtn_otherjob_cum, rev_ear_accrual_prdtn_tooling_target, rev_ear_accrual_prdtn_tooling_dtm, rev_ear_accrual_prdtn_tooling_cum, rev_ear_accrual_prdtn_otherjob_target, rev_ear_accrual_prdtn_otherjob_dtm, rev_ear_accrual_prdtn_otherjob_cum, sno) FROM stdin;
\.


--
-- Data for Name: tbl_tr_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_tr_category (tc_id, tc_cayegory) FROM stdin;
\.


--
-- Data for Name: tbl_trng_exp_target; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_trng_exp_target (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, sisi_nm, nju_target, ta_target, be_budget, months) FROM stdin;
\.


--
-- Data for Name: tbl_trng_exp_target_19july10; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_trng_exp_target_19july10 (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, sisi_nm, nju_target, ta_target) FROM stdin;
\.


--
-- Data for Name: tbl_trng_exp_target_backup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_trng_exp_target_backup (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, sisi_nm, nju_target, ta_target, be_budget, months) FROM stdin;
\.


--
-- Data for Name: tbl_trng_exp_target_bk; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_trng_exp_target_bk (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, sisi_nm, nju_target, ta_target, be_budget, months) FROM stdin;
\.


--
-- Data for Name: tbl_trng_exp_target_bkp; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_trng_exp_target_bkp (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, sisi_nm, nju_target, ta_target, be_budget, months) FROM stdin;
\.


--
-- Data for Name: tbl_trng_exp_target_copy; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_trng_exp_target_copy (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, sisi_nm, nju_target, ta_target, be_budget, months) FROM stdin;
\.


--
-- Data for Name: tbl_uploadfile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_uploadfile (id, filename, name, date_of_birth, designation) FROM stdin;
\.


--
-- Data for Name: tbl_vendor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_vendor (sno, instid, months, "smallint", vdp_conducted, unit_participated, amount_disbursed, svdpvdp_conducted, svdpunit_participated, svdpamount_disbursed, user_date, cum_vdp_conducted, cum_unit_participated, cum_amount_disbursed, svdpcum_vdp_conducted, svdpcum_unit_participated, svdpcum_amount_disbursed, totaltarget, totaltargett) FROM stdin;
\.


--
-- Data for Name: tbl_workshop; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tbl_workshop (sno, instid, "smallint", months, no_of_unit_benefitted, no_jobs_undertaken, no_trainees_trained, no_jobs_completed, no_units_registered, capacity_assessment, user_date, cum_no_of_unit_benefitted, cum_no_jobs_undertaken, cum_no_trainees_trained, cum_no_jobs_completed, cum_no_units_registered, cum_capacity_assessment, target) FROM stdin;
\.


--
-- Data for Name: temp; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.temp (useroid, moduleoid, userprivoid, moduleid) FROM stdin;
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.test (username) FROM stdin;
\.


--
-- Data for Name: tl_institute; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tl_institute (id, inst_id, inst_name, inst_address) FROM stdin;
\.


--
-- Data for Name: totalinst; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.totalinst (name) FROM stdin;
\.


--
-- Data for Name: user_cr_mapping; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_cr_mapping (user_id, inst_id, tr_cat_id) FROM stdin;
\.


--
-- Data for Name: user_di_mapping; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_di_mapping (user_id, inst_id, tr_cat_id) FROM stdin;
\.


--
-- Data for Name: user_id_mapping; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_id_mapping (user_id, inst_id, tr_cat_id) FROM stdin;
admin                    	SU        	\N
BASU                     	SU        	\N
IZZATULLAH               	SU        	\N
Charnjeet                	SU        	\N
admin2                   	SU        	\N
SEC-MSME                 	SU        	\N
SU                       	SU        	0
\.


--
-- Data for Name: user_old_pass_toolroom; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_old_pass_toolroom (sno, inst, password, no_of_changes, "time", user_ip) FROM stdin;
\.


--
-- Data for Name: vendor_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendor_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Data for Name: workshop_audit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.workshop_audit (id, inst_id, months, years, changedon, action) FROM stdin;
\.


--
-- Name: tbl_financial_sno_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tbl_financial_sno_seq', 1, false);


--
-- Name: tbl_placement_sno_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tbl_placement_sno_seq', 1, false);


--
-- Name: budget_audit budget_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.budget_audit
    ADD CONSTRAINT budget_audit_pkey PRIMARY KEY (id);


--
-- Name: changess changess_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.changess
    ADD CONSTRAINT changess_pkey PRIMARY KEY (sno);


--
-- Name: emp_mstr emp_mstr_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.emp_mstr
    ADD CONSTRAINT emp_mstr_pkey PRIMARY KEY (emp_no);


--
-- Name: esdp_audit esdp_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.esdp_audit
    ADD CONSTRAINT esdp_audit_pkey PRIMARY KEY (id);


--
-- Name: file file_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_pkey PRIMARY KEY (file_id);


--
-- Name: file_tbl file_tbl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.file_tbl
    ADD CONSTRAINT file_tbl_pkey PRIMARY KEY (id);


--
-- Name: financial_audit financial_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.financial_audit
    ADD CONSTRAINT financial_audit_pkey PRIMARY KEY (id);


--
-- Name: iso_audit iso_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.iso_audit
    ADD CONSTRAINT iso_audit_pkey PRIMARY KEY (id);


--
-- Name: latandlon latandlon_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.latandlon
    ADD CONSTRAINT latandlon_pkey PRIMARY KEY (id);


--
-- Name: msme_di_users msme_di_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.msme_di_users
    ADD CONSTRAINT msme_di_users_pkey PRIMARY KEY (user_id, password, role);


--
-- Name: physical_audit physical_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.physical_audit
    ADD CONSTRAINT physical_audit_pkey PRIMARY KEY (id);


--
-- Name: report_audit report_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_audit
    ADD CONSTRAINT report_audit_pkey PRIMARY KEY (id);


--
-- Name: revenue_audit revenue_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_audit
    ADD CONSTRAINT revenue_audit_pkey PRIMARY KEY (id);


--
-- Name: specialprogrammes_audit specialprogrammes_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialprogrammes_audit
    ADD CONSTRAINT specialprogrammes_audit_pkey PRIMARY KEY (id);


--
-- Name: tbl_acr tbl_acr_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_acr
    ADD CONSTRAINT tbl_acr_pkey PRIMARY KEY (sno);


--
-- Name: tbl_acr_record tbl_acr_record_employee_history_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_acr_record
    ADD CONSTRAINT tbl_acr_record_employee_history_name_key UNIQUE (employee_history, name);


--
-- Name: tbl_acr_record tbl_acr_record_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_acr_record
    ADD CONSTRAINT tbl_acr_record_pkey PRIMARY KEY (sno);


--
-- Name: tbl_br_senet tbl_br_senet_inst_id_months_smallint_branch_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_br_senet
    ADD CONSTRAINT tbl_br_senet_inst_id_months_smallint_branch_key UNIQUE (inst_id, months, "smallint", branch);


--
-- Name: tbl_budget_bk tbl_budget_bk_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_budget_bk
    ADD CONSTRAINT tbl_budget_bk_pkey PRIMARY KEY (inst_id, months, years);


--
-- Name: tbl_budget tbl_budget_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_budget
    ADD CONSTRAINT tbl_budget_pkey PRIMARY KEY (inst_id, months, years);


--
-- Name: tbl_cabinet_summary tbl_cabinet_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_cabinet_summary
    ADD CONSTRAINT tbl_cabinet_summary_pkey PRIMARY KEY (inst_id, months, years);


--
-- Name: tbl_court_syn tbl_court_syn_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_court_syn
    ADD CONSTRAINT tbl_court_syn_pkey PRIMARY KEY (sno);


--
-- Name: tbl_di_target tbl_di_target_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_di_target
    ADD CONSTRAINT tbl_di_target_pkey PRIMARY KEY (instid, years);


--
-- Name: tbl_employee_details tbl_employee_details_name_date_of_joining_employee_history_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_employee_details
    ADD CONSTRAINT tbl_employee_details_name_date_of_joining_employee_history_key UNIQUE (name, date_of_joining, employee_history);


--
-- Name: tbl_employee_details tbl_employee_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_employee_details
    ADD CONSTRAINT tbl_employee_details_pkey PRIMARY KEY (sno);


--
-- Name: tbl_esdp tbl_esdp_instid_months_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_esdp
    ADD CONSTRAINT tbl_esdp_instid_months_smallint_key UNIQUE (instid, months, "smallint");


--
-- Name: tbl_esdp tbl_esdp_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_esdp
    ADD CONSTRAINT tbl_esdp_pkey PRIMARY KEY (sno);


--
-- Name: tbl_feedback tbl_feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_feedback
    ADD CONSTRAINT tbl_feedback_pkey PRIMARY KEY (sno);


--
-- Name: tbl_financial_mpr tbl_financial_mpr_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_financial_mpr
    ADD CONSTRAINT tbl_financial_mpr_pkey PRIMARY KEY (inst_id);


--
-- Name: tbl_financial tbl_financial_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_financial
    ADD CONSTRAINT tbl_financial_pkey PRIMARY KEY (sno);


--
-- Name: tbl_industrial_profile tbl_industrial_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_industrial_profile
    ADD CONSTRAINT tbl_industrial_profile_pkey PRIMARY KEY (filename);


--
-- Name: tbl_isotarget tbl_isotarget_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_isotarget
    ADD CONSTRAINT tbl_isotarget_pkey PRIMARY KEY (sno);


--
-- Name: tbl_judical_detail tbl_judical_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_judical_detail
    ADD CONSTRAINT tbl_judical_detail_pkey PRIMARY KEY (sno);


--
-- Name: tbl_library tbl_library_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_library
    ADD CONSTRAINT tbl_library_pkey PRIMARY KEY (sno);


--
-- Name: tbl_lofin_detail tbl_lofin_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_lofin_detail
    ADD CONSTRAINT tbl_lofin_detail_pkey PRIMARY KEY (sno);


--
-- Name: tbl_login_detail_courtcases tbl_login_detail_courtcases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_login_detail_courtcases
    ADD CONSTRAINT tbl_login_detail_courtcases_pkey PRIMARY KEY (sno);


--
-- Name: tbl_login tbl_login_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_login
    ADD CONSTRAINT tbl_login_pkey PRIMARY KEY (sno);


--
-- Name: tbl_month tbl_month_months_mon_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_month
    ADD CONSTRAINT tbl_month_months_mon_key UNIQUE (months, mon);


--
-- Name: tbl_month tbl_month_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_month
    ADD CONSTRAINT tbl_month_pkey PRIMARY KEY (sno);


--
-- Name: tbl_personaldata tbl_personaldata_name_date_of_birth_mobnumber_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_personaldata
    ADD CONSTRAINT tbl_personaldata_name_date_of_birth_mobnumber_key UNIQUE (name, date_of_birth, mobnumber);


--
-- Name: tbl_personaldata tbl_personaldata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_personaldata
    ADD CONSTRAINT tbl_personaldata_pkey PRIMARY KEY (sno);


--
-- Name: tbl_personaldata tbl_personaldata_uname_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_personaldata
    ADD CONSTRAINT tbl_personaldata_uname_key UNIQUE (uname);


--
-- Name: tbl_phonebook tbl_phonebook_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_phonebook
    ADD CONSTRAINT tbl_phonebook_pkey PRIMARY KEY (sno);


--
-- Name: tbl_physical_bk tbl_physical_bk_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_physical_bk
    ADD CONSTRAINT tbl_physical_bk_pkey PRIMARY KEY (inst_id, months, years);


--
-- Name: tbl_physical tbl_physical_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_physical
    ADD CONSTRAINT tbl_physical_pkey PRIMARY KEY (inst_id, months, years);


--
-- Name: tbl_placement tbl_placement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_placement
    ADD CONSTRAINT tbl_placement_pkey PRIMARY KEY (sno);


--
-- Name: tbl_pms_target tbl_pms_target_inst_id_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_pms_target
    ADD CONSTRAINT tbl_pms_target_inst_id_smallint_key UNIQUE (inst_id, "smallint");


--
-- Name: tbl_pms_target tbl_pms_target_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_pms_target
    ADD CONSTRAINT tbl_pms_target_pkey PRIMARY KEY (sno);


--
-- Name: tbl_report tbl_report_instid_months_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_report
    ADD CONSTRAINT tbl_report_instid_months_smallint_key UNIQUE (instid, months, "smallint");


--
-- Name: tbl_report tbl_report_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_report
    ADD CONSTRAINT tbl_report_pkey PRIMARY KEY (sno);


--
-- Name: tbl_revenue_branch tbl_revenue_branch_instid_months_years_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_revenue_branch
    ADD CONSTRAINT tbl_revenue_branch_instid_months_years_name_key UNIQUE (instid, months, years, name);


--
-- Name: tbl_revenue_branch tbl_revenue_branch_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_revenue_branch
    ADD CONSTRAINT tbl_revenue_branch_pkey PRIMARY KEY (sno);


--
-- Name: tbl_revenue tbl_revenue_instid_months_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_revenue
    ADD CONSTRAINT tbl_revenue_instid_months_smallint_key UNIQUE (instid, months, "smallint");


--
-- Name: tbl_revenue tbl_revenue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_revenue
    ADD CONSTRAINT tbl_revenue_pkey PRIMARY KEY (sno);


--
-- Name: tbl_search_engine tbl_search_engine_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_search_engine
    ADD CONSTRAINT tbl_search_engine_pkey PRIMARY KEY (sno);


--
-- Name: tbl_senet tbl_senet_inst_id_months_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_senet
    ADD CONSTRAINT tbl_senet_inst_id_months_smallint_key UNIQUE (inst_id, months, "smallint");


--
-- Name: tbl_senet tbl_senet_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_senet
    ADD CONSTRAINT tbl_senet_pkey PRIMARY KEY (sno, inst_id, months, "smallint");


--
-- Name: tbl_special_program tbl_special_program_instid_months_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_special_program
    ADD CONSTRAINT tbl_special_program_instid_months_smallint_key UNIQUE (instid, months, "smallint");


--
-- Name: tbl_special_program tbl_special_program_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_special_program
    ADD CONSTRAINT tbl_special_program_pkey PRIMARY KEY (sno);


--
-- Name: tbl_ssi_mda tbl_ssi_mda_inst_id_months_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_ssi_mda
    ADD CONSTRAINT tbl_ssi_mda_inst_id_months_smallint_key UNIQUE (inst_id, months, "smallint");


--
-- Name: tbl_ssi_mda tbl_ssi_mda_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_ssi_mda
    ADD CONSTRAINT tbl_ssi_mda_pkey PRIMARY KEY (sno, inst_id, months, "smallint");


--
-- Name: tbl_target_ssi_mda tbl_target_ssi_mda_instid_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_target_ssi_mda
    ADD CONSTRAINT tbl_target_ssi_mda_instid_smallint_key UNIQUE (instid, "smallint");


--
-- Name: tbl_target_ssi_mda tbl_target_ssi_mda_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_target_ssi_mda
    ADD CONSTRAINT tbl_target_ssi_mda_pkey PRIMARY KEY (sno, instid, "smallint");


--
-- Name: tbl_targetlib_bk tbl_targetlib_bk_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_targetlib_bk
    ADD CONSTRAINT tbl_targetlib_bk_pkey PRIMARY KEY (sno);


--
-- Name: tbl_targetlib tbl_targetlib_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_targetlib
    ADD CONSTRAINT tbl_targetlib_pkey PRIMARY KEY (sno);


--
-- Name: tbl_targetsenet tbl_targetsenet_inst_id_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_targetsenet
    ADD CONSTRAINT tbl_targetsenet_inst_id_smallint_key UNIQUE (inst_id, "smallint");


--
-- Name: tbl_targetsenet tbl_targetsenet_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_targetsenet
    ADD CONSTRAINT tbl_targetsenet_pkey PRIMARY KEY (sno);


--
-- Name: tbl_temp_analysisrpt tbl_temp_analysisrpt_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_temp_analysisrpt
    ADD CONSTRAINT tbl_temp_analysisrpt_pkey PRIMARY KEY (yearss, auid, months);


--
-- Name: tbl_tooling_otherjob tbl_tooling_otherjob_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_tooling_otherjob
    ADD CONSTRAINT tbl_tooling_otherjob_pkey PRIMARY KEY (sno);


--
-- Name: tbl_trng_exp_target_bk tbl_trng_exp_target_bk_inst_id_years_rev_earn_cash_rev_earn_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_trng_exp_target_bk
    ADD CONSTRAINT tbl_trng_exp_target_bk_inst_id_years_rev_earn_cash_rev_earn_key UNIQUE (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, nju_target, ta_target, be_budget);


--
-- Name: tbl_trng_exp_target_bk tbl_trng_exp_target_bk_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_trng_exp_target_bk
    ADD CONSTRAINT tbl_trng_exp_target_bk_pkey PRIMARY KEY (years, inst_id);


--
-- Name: tbl_trng_exp_target tbl_trng_exp_target_inst_id_years_rev_earn_cash_rev_earn_ac_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_trng_exp_target
    ADD CONSTRAINT tbl_trng_exp_target_inst_id_years_rev_earn_cash_rev_earn_ac_key UNIQUE (inst_id, years, rev_earn_cash, rev_earn_acc, rev_exp_cash, rev_exp_acc, inc_exp_cash, inc_exp_acc, per_rec_cash, per_rec_acc, creation_date, nju_target, ta_target, be_budget);


--
-- Name: tbl_trng_exp_target tbl_trng_exp_target_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_trng_exp_target
    ADD CONSTRAINT tbl_trng_exp_target_pkey PRIMARY KEY (years, inst_id);


--
-- Name: tbl_uploadfile tbl_uploadfile_name_designation_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_uploadfile
    ADD CONSTRAINT tbl_uploadfile_name_designation_key UNIQUE (name, designation);


--
-- Name: tbl_uploadfile tbl_uploadfile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_uploadfile
    ADD CONSTRAINT tbl_uploadfile_pkey PRIMARY KEY (id);


--
-- Name: tbl_vendor tbl_vendor_instid_months_smallint_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_vendor
    ADD CONSTRAINT tbl_vendor_instid_months_smallint_key UNIQUE (instid, months, "smallint");


--
-- Name: tbl_vendor tbl_vendor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_vendor
    ADD CONSTRAINT tbl_vendor_pkey PRIMARY KEY (sno);


--
-- Name: tbl_workshop tbl_workshop_instid_smallint_months_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_workshop
    ADD CONSTRAINT tbl_workshop_instid_smallint_months_key UNIQUE (instid, "smallint", months);


--
-- Name: tbl_workshop tbl_workshop_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_workshop
    ADD CONSTRAINT tbl_workshop_pkey PRIMARY KEY (sno);


--
-- Name: tl_institute tl_institute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tl_institute
    ADD CONSTRAINT tl_institute_pkey PRIMARY KEY (inst_id, id);


--
-- Name: user_old_pass_toolroom user_old_pass_toolroom_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_old_pass_toolroom
    ADD CONSTRAINT user_old_pass_toolroom_pkey PRIMARY KEY (sno);


--
-- Name: vendor_audit vendor_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendor_audit
    ADD CONSTRAINT vendor_audit_pkey PRIMARY KEY (id);


--
-- Name: workshop_audit workshop_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workshop_audit
    ADD CONSTRAINT workshop_audit_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict 5R5BlmfEe6ncK7PWc8HD1iL4Y1gaiSw3Wnwv9F8gBet3D4wcbL39ydT30Pf68Xa

