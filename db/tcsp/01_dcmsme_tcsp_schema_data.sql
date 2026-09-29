-- ============================================================
-- PostgreSQL 17 migration of dcmsme_tcsp (TCSP application)
-- Source: MariaDB 10.4  →  Target: PostgreSQL 17
-- ============================================================

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

-- MySQL dump 10.13  Distrib 5.7.27, for Win64 (x86_64)
--
-- Host: localhost    Database: dcmsme_tcsp
-- ------------------------------------------------------
-- Server version	5.7.27-log


--
-- Table structure for table `ab`
--

DROP TABLE IF EXISTS ab;

CREATE TABLE ab (
  name varchar(12) DEFAULT NULL
);


--
-- Dumping data for table `ab`
--


--
-- Temporary table structure for view `abc`
--

DROP TABLE IF EXISTS abc;


--
-- Temporary table structure for view `abcd`
--

DROP TABLE IF EXISTS abcd;


--
-- Table structure for table `back_upfinancial`
--

DROP TABLE IF EXISTS back_upfinancial;

CREATE TABLE back_upfinancial (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  MONTHS_YEAR varchar(125) NOT NULL,
  REV_EAR_CASH_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_TARGET integer DEFAULT NULL,
  REV_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TEST_CAL_SERVICES_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_MON decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_MON decimal(28,2) DEFAULT NULL,
  SNO integer NOT NULL DEFAULT '0'
);


--
-- Dumping data for table `back_upfinancial`
--


--
-- Table structure for table `budget_audit`
--

DROP TABLE IF EXISTS budget_audit;

CREATE TABLE budget_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon date DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `budget_audit`
--


--
-- Table structure for table `changess`
--

DROP TABLE IF EXISTS changess;

CREATE TABLE changess (
  sno integer NOT NULL ,
  USER_ID varchar(45) NOT NULL,
  action varchar(45) NOT NULL,
  datetim varchar(45) NOT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `changess`
--


--
-- Table structure for table `cr_users`
--

DROP TABLE IF EXISTS cr_users;

CREATE TABLE cr_users (
  USER_ID varchar(25) DEFAULT NULL,
  PASSWORD varchar(25) DEFAULT NULL,
  ROLE varchar(25) DEFAULT NULL,
  LOCALROLE varchar(20) DEFAULT NULL,
  TEMPROLE varchar(20) DEFAULT NULL
);


--
-- Dumping data for table `cr_users`
--


--
-- Table structure for table `emp_mstr`
--

DROP TABLE IF EXISTS emp_mstr;

CREATE TABLE emp_mstr (
  EMP_NO varchar(10) NOT NULL,
  PASSWORD varchar(6) DEFAULT NULL,
  BRANCH_NO varchar(10) DEFAULT NULL,
  FNAME varchar(25) DEFAULT NULL,
  MNAME varchar(25) DEFAULT NULL,
  LNAME varchar(25) DEFAULT NULL,
  DEPT varchar(30) DEFAULT NULL,
  DESIG varchar(30) DEFAULT NULL,
  ADDR varchar(50) DEFAULT NULL,
  PRIMARY KEY (EMP_NO)
);


--
-- Dumping data for table `emp_mstr`
--


--
-- Table structure for table `esdp_audit`
--

DROP TABLE IF EXISTS esdp_audit;

CREATE TABLE esdp_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon timestamp DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `esdp_audit`
--


--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS feedback;

CREATE TABLE feedback (
  OID integer DEFAULT NULL,
  REFERENCEID varchar(10) DEFAULT NULL,
  NAME varchar(30) DEFAULT NULL,
  EMAIL varchar(30) DEFAULT NULL,
  ORGANISATION varchar(30) DEFAULT NULL,
  DESIGNATION varchar(20) DEFAULT NULL,
  ADDRESS varchar(50) DEFAULT NULL,
  PHONE varchar(15) DEFAULT NULL,
  FAX varchar(15) DEFAULT NULL,
  CATEGORY varchar(50) DEFAULT NULL,
  FEEDBACK text,
  FEEDBACKDT date DEFAULT NULL,
  STATUS varchar(15) DEFAULT NULL,
  GUESTBKENTRY char(1) DEFAULT NULL,
  PENDINGWITH varchar(15) DEFAULT NULL,
  ACKTYPE varchar(50) DEFAULT NULL,
  ACKBY varchar(15) DEFAULT NULL,
  ACKDT date DEFAULT NULL,
  REPLYDT date DEFAULT NULL,
  REPLIEDBY varchar(15) DEFAULT NULL,
  COMMENTS text,
  CREATEDBY varchar(30) DEFAULT NULL,
  MODIFIEDBY varchar(30) DEFAULT NULL,
  CREATEDON date DEFAULT NULL,
  MODIFIEDON date DEFAULT NULL
);


--
-- Dumping data for table `feedback`
--


--
-- Table structure for table `feedbackaction`
--

DROP TABLE IF EXISTS feedbackaction;

CREATE TABLE feedbackaction (
  OID varchar(5) DEFAULT NULL,
  ACTION varchar(20) DEFAULT NULL,
  ACTIONDT date DEFAULT NULL,
  ACTIONBY varchar(15) DEFAULT NULL,
  PENDINGWITH varchar(15) DEFAULT NULL,
  COMMENTS text
);


--
-- Dumping data for table `feedbackaction`
--


--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS file;

CREATE TABLE file (
  file_id integer NOT NULL ,
  file_data text,
  PRIMARY KEY (file_id)
);


--
-- Dumping data for table `file`
--


--
-- Table structure for table `file_tbl`
--

DROP TABLE IF EXISTS file_tbl;

CREATE TABLE file_tbl (
  id bigint NOT NULL ,
  file_data text,
  file_date timestamp DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `file_tbl`
--


--
-- Table structure for table `financial_audit`
--

DROP TABLE IF EXISTS financial_audit;

CREATE TABLE financial_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon timestamp DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `financial_audit`
--


--
-- Table structure for table `iso_audit`
--

DROP TABLE IF EXISTS iso_audit;

CREATE TABLE iso_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon timestamp DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `iso_audit`
--


--
-- Table structure for table `latandlon`
--

DROP TABLE IF EXISTS latandlon;

CREATE TABLE latandlon (
  id integer NOT NULL ,
  lat decimal(10,6) NOT NULL DEFAULT '0.000000',
  lon decimal(10,6) NOT NULL DEFAULT '0.000000',
  address varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);


--
-- Dumping data for table `latandlon`
--


--
-- Table structure for table `maps`
--

DROP TABLE IF EXISTS maps;

CREATE TABLE maps (
  CITY char(50) DEFAULT NULL,
  TOP char(5) DEFAULT NULL,
  LEFT1 char(5) DEFAULT NULL
);


--
-- Dumping data for table `maps`
--


--
-- Table structure for table `msme_di_users`
--

DROP TABLE IF EXISTS msme_di_users;

CREATE TABLE msme_di_users (
  USER_ID varchar(25) NOT NULL DEFAULT '',
  PASSWORD varchar(125) NOT NULL,
  ROLE varchar(25) NOT NULL DEFAULT '',
  INSTITUTE varchar(45) NOT NULL,
  PRIMARY KEY (USER_ID,PASSWORD,ROLE)
);


--
-- Dumping data for table `msme_di_users`
--

INSERT INTO msme_di_users VALUES ('admin','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','SU',''),('adminadmin','21232f297a57a5a743894a0e4a801fc3','IU',''),('administrator','73803249c6667c5af2d51c0dedfae487','SU',''),('bbsahoo','74babfe010d4b4441961b2d5c88a5eb9280cb0d7d86d478220978408ccdd5ee5','SU',''),('msmesolan','d27ca3a59d65e75397388c58fd5214b65b54a33eb7b314acace37ed520cb053e','IU',''),('shaktirani','1d0513d3ce040eb13671a7d0071639a678e8420d68ea3cb9fd94cb2c723b7074','SU',''),('sunil','af674ed66a726918583170c53c585b02055e388d07642154616e10d0bd04fc63','SU',''),('svsharma','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','SU',''),('TCEC-Amritsar','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Balasore','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Behrampur','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Bengaluru','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Bhavnagar','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Bhawanipatnam','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Ettumanoor','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Faridabad','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Haldwani','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Hoshiarpur','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Jaipur','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Johrat','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Karimnagar','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Keonjhar','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Kolkata ','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Kota','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Madurai ','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Nagaur','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Nilokheri','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Okhla','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Sanad','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Srinagar','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Thiruvalla','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Udaipur','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Vaniyamvadi','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU',''),('TCEC-Waluj','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab','IU','');

--
-- Table structure for table `msme_users`
--

DROP TABLE IF EXISTS msme_users;

CREATE TABLE msme_users (
  USER_ID char(125) DEFAULT NULL,
  ROLE char(25) DEFAULT NULL,
  PASSWORD varchar(125) DEFAULT NULL
);


--
-- Dumping data for table `msme_users`
--

INSERT INTO msme_users VALUES ('admin','SU','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab'),('TC-Bhiwadi','IU','beae3e0b95d1538f46c9fe4f169aca869b3b263f5617f7deeda16387e1551d8b'),('TC-Rohtak','IU','e82200398fdaa25666851811472aa201f8a11db392f9a9535ea01ea94dfca6c4'),('TC-Baddi','IU','62df4eef271e5a0eaf413124a289a145009fb295c69a546e72d69b0abe852fc0'),('TC-Sitarganj','IU','4f2301948a7fdd9f7a5968359edcadbccaf7940b886a59776af866906f3f52af'),('TC-Puducherry','IU','bc79656762af188746ea51d621359fd7d838732c3a26e8024b53167f9be0ccd9'),('TC-Durg','IU','5da69a390bcae55b411dea05b3fa8f3e8b4918283b524403d15014ae29fa3cf8'),('TC-Visakhapatnam','IU','af12f5f42ff6df0149562645b8fc06d3a36c48e2009c591079366de0cc90958d'),('TC-Imphal','IU','3703b46e4350670da179c997ead8beaf747860e21358c1814049a4a2ff2309d4'),('TC-Grnoida','IU','f7cbb1ea40826b8f343333c897120d105ee1693d5d698921ac0125d7167fd9ca'),('TC-Bhopal','IU','78b9e4ec1ae56fc3014432708f23d4689d89a892f14c8e2d0aa5cb32472d361c'),('TC-Kanpur','IU','d9eb50fd1adaa3fc53c7d7819aa747f495d130961199d7e46bd7e6672945b53e'),('TC-Bangalore','IU','35a58602852dc04a987b210f293ee66a5e93df524699d4b48866d73181fc65cd'),('ANIL','SU','fd00e60789de65f5db638ad739b7be20e6f003b3385707d3bc7bfdc0c3e47fce'),('VINEET','SU','3ae433f65bf5fabfafa74c90a275647382ba9c1a499509d4d2c3e5c6cf659264'),('TC-Patna','IU','bea0737e402e6026ee02f4613a710b9498ded633e0e5f2624fd229c4bb878d21');

--
-- Table structure for table `physical_audit`
--

DROP TABLE IF EXISTS physical_audit;

CREATE TABLE physical_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon date DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `physical_audit`
--


--
-- Table structure for table `report_audit`
--

DROP TABLE IF EXISTS report_audit;

CREATE TABLE report_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon date DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `report_audit`
--


--
-- Table structure for table `revenue_audit`
--

DROP TABLE IF EXISTS revenue_audit;

CREATE TABLE revenue_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon date DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `revenue_audit`
--


--
-- Table structure for table `rolemanagement`
--

DROP TABLE IF EXISTS rolemanagement;

CREATE TABLE rolemanagement (
  ROLE char(15) DEFAULT NULL
);


--
-- Dumping data for table `rolemanagement`
--


--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  ROLE_ID integer DEFAULT NULL,
  ROLE_NAME char(10) DEFAULT NULL
);


--
-- Dumping data for table `roles`
--


--
-- Temporary table structure for view `rpt_target`
--

DROP TABLE IF EXISTS rpt_target;


--
-- Temporary table structure for view `rpt_uns_bal`
--

DROP TABLE IF EXISTS rpt_uns_bal;


--
-- Table structure for table `samodule`
--

DROP TABLE IF EXISTS samodule;

CREATE TABLE samodule (
  OID varchar(6) DEFAULT NULL,
  ABBREVIATION varchar(6) DEFAULT NULL,
  DESCRIPTION text,
  CREATEDBY varchar(30) DEFAULT NULL,
  CREATEDON date DEFAULT NULL,
  MODIFIEDBY varchar(30) DEFAULT NULL,
  MODIFIEDON date DEFAULT NULL,
  MODULENAME varchar(25) DEFAULT NULL
);


--
-- Dumping data for table `samodule`
--


--
-- Table structure for table `samodulepriv`
--

DROP TABLE IF EXISTS samodulepriv;

CREATE TABLE samodulepriv (
  MODULEOID char(6) DEFAULT NULL,
  USERPRIVOID char(6) DEFAULT NULL
);


--
-- Dumping data for table `samodulepriv`
--


--
-- Table structure for table `sastate`
--

DROP TABLE IF EXISTS sastate;

CREATE TABLE sastate (
  STATECODE char(10) DEFAULT NULL,
  STATENAME char(50) DEFAULT NULL,
  CREATEDON date DEFAULT NULL,
  CREATEDBY char(100) DEFAULT NULL
);


--
-- Dumping data for table `sastate`
--


--
-- Table structure for table `sauseraccount`
--

DROP TABLE IF EXISTS sauseraccount;

CREATE TABLE sauseraccount (
  OID varchar(6) DEFAULT NULL,
  DISABLED char(3) DEFAULT NULL,
  USERID varchar(100) DEFAULT NULL,
  PASSWORD varchar(50) DEFAULT NULL,
  PUBLICKEY varchar(50) DEFAULT NULL,
  CREATEDBY varchar(100) DEFAULT NULL,
  CREATEDON date DEFAULT NULL,
  MODIFIEDBY varchar(100) DEFAULT NULL,
  MODIFIEDON date DEFAULT NULL,
  USERTYPE char(2) DEFAULT NULL,
  KEY1 text,
  FIRSTNAME varchar(30) DEFAULT NULL,
  LASTNAME varchar(30) DEFAULT NULL
);


--
-- Dumping data for table `sauseraccount`
--


--
-- Table structure for table `sauseraccpriv`
--

DROP TABLE IF EXISTS sauseraccpriv;

CREATE TABLE sauseraccpriv (
  USEROID char(50) DEFAULT NULL,
  MODULEOID char(6) DEFAULT NULL,
  USERPRIVOID char(6) DEFAULT NULL
);


--
-- Dumping data for table `sauseraccpriv`
--


--
-- Table structure for table `sauserpriv`
--

DROP TABLE IF EXISTS sauserpriv;

CREATE TABLE sauserpriv (
  OID varchar(6) DEFAULT NULL,
  ABBREVIATION varchar(15) DEFAULT NULL,
  DESCRIPTION text,
  CREATEDBY varchar(100) DEFAULT NULL,
  CREATEDON date DEFAULT NULL,
  MODIFIEDBY varchar(100) DEFAULT NULL,
  MODIFIEDON date DEFAULT NULL,
  PRIVNAME varchar(100) DEFAULT NULL
);


--
-- Dumping data for table `sauserpriv`
--


--
-- Table structure for table `specialprogrammes_audit`
--

DROP TABLE IF EXISTS specialprogrammes_audit;

CREATE TABLE specialprogrammes_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon date DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `specialprogrammes_audit`
--


--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS state;

CREATE TABLE state (
  STATECODE char(6) DEFAULT NULL,
  STATENAME char(100) DEFAULT NULL,
  CREATEDON date DEFAULT NULL,
  CREATEDBY char(100) DEFAULT NULL,
  MODIFIEDON date DEFAULT NULL,
  MODIFIEDBY char(100) DEFAULT NULL
);


--
-- Dumping data for table `state`
--


--
-- Table structure for table `tbl_acr`
--

DROP TABLE IF EXISTS tbl_acr;

CREATE TABLE tbl_acr (
  sno integer NOT NULL ,
  name varchar(200) NOT NULL,
  Designation varchar(200) NOT NULL,
  Date_of_Birth date NOT NULL,
  year2004 varchar(200) NOT NULL,
  status varchar(200) NOT NULL,
  year2005 varchar(200) NOT NULL,
  status1 varchar(200) NOT NULL,
  year2006 varchar(200) NOT NULL,
  status2 varchar(200) NOT NULL,
  year2007 varchar(200) NOT NULL,
  status3 varchar(200) NOT NULL,
  year2008 varchar(200) NOT NULL,
  status4 varchar(200) NOT NULL,
  year2009 varchar(200) NOT NULL,
  status5 varchar(200) NOT NULL,
  year2010 varchar(200) NOT NULL,
  status6 varchar(200) NOT NULL,
  year2011 varchar(200) NOT NULL,
  status7 varchar(200) NOT NULL,
  year2012 varchar(200) NOT NULL,
  status8 varchar(200) NOT NULL,
  year2013 varchar(200) NOT NULL,
  status9 varchar(200) NOT NULL,
  year2014 varchar(200) NOT NULL,
  status10 varchar(200) NOT NULL,
  year2000 varchar(200) NOT NULL,
  status11 varchar(200) NOT NULL,
  year2001 varchar(200) NOT NULL,
  status12 varchar(200) NOT NULL,
  year2002 varchar(200) NOT NULL,
  status13 varchar(200) NOT NULL,
  year2003 varchar(200) NOT NULL,
  status14 varchar(200) NOT NULL,
  User_id varchar(245) DEFAULT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_acr`
--


--
-- Table structure for table `tbl_acr_record`
--

DROP TABLE IF EXISTS tbl_acr_record;

CREATE TABLE tbl_acr_record (
  sno integer NOT NULL ,
  name varchar(45) NOT NULL,
  employee_history integer NOT NULL,
  employee_history1 varchar(445) NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (employee_history,name)
);


--
-- Dumping data for table `tbl_acr_record`
--


--
-- Table structure for table `tbl_b`
--

DROP TABLE IF EXISTS tbl_b;

CREATE TABLE tbl_b (
  INST_ID varchar(50) DEFAULT NULL,
  MONTHS varchar(50) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  MONTHS_YEAR timestamp DEFAULT NULL,
  CRY_FWD_AMT decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_DM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_CUM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_BAL decimal(28,2) DEFAULT NULL,
  GIA_AMT decimal(28,2) DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_CUM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_BAL decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_AMT decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL decimal(28,2) DEFAULT NULL,
  DETAILS_VISIT varchar(425) DEFAULT NULL,
  MACHINE_DTM decimal(28,0) DEFAULT NULL,
  MACHINE_CUM decimal(28,0) DEFAULT NULL,
  SIGNIFICANT varchar(430) DEFAULT NULL,
  SHORTS_FALL varchar(428) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL
);


--
-- Dumping data for table `tbl_b`
--


--
-- Table structure for table `tbl_br_senet`
--

DROP TABLE IF EXISTS tbl_br_senet;

CREATE TABLE tbl_br_senet (
  INST_ID varchar(145) DEFAULT NULL,
  MONTHS integer DEFAULT NULL,
  smallint varchar(145) DEFAULT NULL,
  Branch varchar(145) DEFAULT NULL,
  Br_hardware_target integer DEFAULT NULL,
  Br_hardware_tomonth integer DEFAULT NULL,
  Br_hardware_upto integer DEFAULT NULL,
  Br_con_target integer DEFAULT NULL,
  Br_con_tomonth integer DEFAULT NULL,
  Br_con_upto integer DEFAULT NULL,
  UNIQUE (INST_ID,MONTHS,smallint,Branch)
);


--
-- Dumping data for table `tbl_br_senet`
--


--
-- Table structure for table `tbl_budget`
--

DROP TABLE IF EXISTS tbl_budget;

CREATE TABLE tbl_budget (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(125) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  CRY_FWD_AMT decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_DM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_CUM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_BAL decimal(28,2) NOT NULL,
  GIA_AMT decimal(28,2) DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_CUM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_BAL decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_AMT decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL decimal(28,2) DEFAULT NULL,
  DETAILS_VISIT varchar(1425) DEFAULT NULL,
  MACHINE_DTM decimal(28,2) DEFAULT NULL,
  MACHINE_CUM decimal(28,2) DEFAULT NULL,
  SIGNIFICANT varchar(1430) DEFAULT NULL,
  SHORTS_FALL varchar(1428) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  newText varchar(5000) DEFAULT ' ',
  PRIMARY KEY (INST_ID,MONTHS,YEARS),
  UNIQUE (INST_ID,MONTHS,YEARS)
);


--
-- Dumping data for table `tbl_budget`
--

INSERT INTO tbl_budget VALUES ('I1','1','2025-2026-1-20','2025-2026',3.82,0.00,0.00,3.82,0.00,19,35,6,0,4,10,2,0,24.08,24.08,-24.08,3.82,24.08,24.08,-20.26,' 1.Visit by Shriram Pistons & Rings Limited Team , Bhiwadi Rajasthan\r\n2.Visit by Groz Engineering Tools Pvt Ltd Team, Bhiwadi Rajasthan\r\n3.Visit by Saint Gobain Team , Bhiwadi Rajasthan\r\n4. Visit by ACYM Team, Bhiwadi Rajasthan\r\n5. Vist by Shri Sai Tool & Gauge Team, Bhiwadi Rajasthan\r\n6. Visit by Supermac Industries India Ltd Team, Manesar Haryana\r\n7. Visit by Paragon Autotech Products Pvt Ltd Team, Bhiwadi Rajasthan\r\n8. Visit to SPRL Pathredi Plant , Bhiwadi Rajasthan\r\n9. Visit by Subroto Machine Tools Team, Bhiwadi Rajasthan\r\n10. Vist by JMW India Pvt Ltd Team, Bhiwadi Rajasthan\r\n11. Visit by Shekhar Engineering & Automation Team, Bhiwadi Rajasthan',0.00,0.00,' -',' -',NULL,' 1.Showcasing & Walk through of MSME TC Bhiwadi arranged for NSIC team on 02.04.25\r\n2. Showcasing & Walkthrough of MSME TC Bhiwadi for SkillNet Learning Team'),('I1','2','2025-2026-2-20','2025-2026',3.82,0.00,0.00,3.82,0.00,19,35,6,0,4,9,2,0,22.76,46.84,-46.84,3.82,22.76,46.84,-43.02,'1.Visit by Shriram Pistons & Rings Limited Team , Bhiwadi Rajasthan\r\n2.Visit by ACE Techno Mold Team, Bhiwadi Rajasthan\r\n3. Vist by Shri Sai Tool & Gauge Team, Bhiwadi Rajasthan\r\n4. Vist by JMW India Pvt Ltd Team, Bhiwadi Rajasthan\r\n5. Visit by Supermac Industries India Ltd Team, Manesar Haryana\r\n6. Visit by Paragon Autotech Products Pvt Ltd Team, Bhiwadi Rajasthan\r\n7.Vist by Mekn tool India Pvt Ltd Team , Manesar Haryana\r\n8. Visit by CMT Hydro Research & Development Team, Bhiwadi Rajasthan\r\n9. Visit by Hydor India Technic Pvt Ltd Team, Bhiwadi Rajasthan\r\n10. Visit to Saint Gobain Bhiwadi Plant\r\n11. Visit to Anand CY Myutec Automotive Pvt Ltd Bhiwadi Plant \r\n12.Visit to SVS Filtations Plant Pathredi, Bhiwadi Rajasthan',0.00,0.00,' â?¢Campus drive in collaboration with Tata Passenger Electric Mobility Ltd, Sanand Gujarat, Subros Ltd, Noida, Adverb Ltd, Noida, Krishna maruti Ltd for pass out and final year students of Diploma courses (ADTDM 2021, 2022 & DIM 2022 batches). In progress, 40 Placed till date.\r\nâ?¢ MOU signed with Digital Village computer education Centre, Bhindushi and National education and research institute, Alwar and Skillnet Learning LLP, Chandigarh for mutual collaboration in providing skill development training programmes to trainees from various institutions.\r\nâ?¢ Admission process for 7th Batch of Diploma courses commenced\r\nâ?¢ Critical Job Work Machining execution for a cavity block on CNC EDM Wire cut Machine for Customer Mekn Tool India Pvt Ltd\r\nâ?¢ Rapid Prototyping Job Work Machining executions on CNC 5 Axis Milling Machine for M/s Shri Sai Tools & Gauges\r\nâ?¢ Critical gravity Die casting Piston Pin Boss Machining executions for M/s Shriram Piston & Rings Limited on CNC 5 Axis Machining\r\n',' ',NULL,' 1.Showcasing & Walk through of MSME TC Bhiwadi arranged for PI Tech International Firm  team \r\n2. Showcasing & Walkthrough of MSME TC Bhiwadi for Mitsubishi Electric India Private Limited\r\n3.Showcasing & Walkthrough of MSME TC Bhiwadi for MSD Facilitators \r\n4. Placing Banners and advertisements in Newspaper for Diploma Admissions'),('I3','1','2025-2026-1-20','2025-2026',0.00,0.00,0.00,0.00,0.00,60,30,50,50,3,3,3,3,0.00,0.00,0.00,0.00,0.00,0.00,0.00,' Mr Purewal, MD, PA Pinions Dharampur Visted TC Baddi.Dhiman Engineering team visited TC Baddi',0.00,0.00,' Successfully completed the machining of bus 700 nos',' N/A',NULL,' Regular promotional activities are being done by TC Baddi on Newspapers, Social media etc.'),('I3','2','2025-2026-2-20','2025-2026',0.00,0.00,0.00,0.00,0.00,60,33,50,50,3,33,10,10,0.00,0.00,0.00,0.00,0.00,0.00,0.00,' Mr Dev Kumar of Elin Electronics Baddi visited TC Baddi for VHT Furnace works.',0.00,0.00,' Successfully completed the Heat Treatment of D2 Steel. ',' ',NULL,' TC Baddi is displaying advertisement in newspapers regarding Diploma Admissions '),('I4','1','2025-2026-1-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,3,2,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'(i) Dr. Manoran Patra, Chairman, CEPTAM, Visited TC Sitarganj on 01.04.2025\r\n(ii) Shri. Aviket Wagh, MD, Sai Engineering Pvt. Ltd, Rudrapur visited TC Sitarganj on 05.04.2025\r\n(iii) Shri Yadav Ji, Plant Head Tushar Excel Sitarganj visited TC Sitarganj on 09.04.2025\r\n(iv) Dr. Manu Korulla, Director General (RM), DRDO, visited TC Sitarganj on 10.04.2025\r\n(v)Shri Vivek Jain, MD, Action Tesa Ltd, Sitarganj visited TC Sitarganj on 29.04.2025\r\n',0.00,0.00,'Successfully completed & delivered after VMC Machining of Fuel tank cap of 1500 nos. & MS Pin stud of 295 nos. to M/s Sai Industries Rudrapur dated 22/04/2025.',' -',NULL,'Regular promotional activities are being conducted by MSME TC Sitarganj through News Paper Advertisement, Social Media Advertisement, Visits to Collges and Industries'),('I4','2','2025-2026-2-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,3,2,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,' (i) Shri Narendra Saini, Plant Head, Ultra Tech suspensions Pvt. Ltd. Rudrapur visited TC Sitarganj on 06.05.2025\r\n(ii) Shri Sandeep Saini, Plant Head, Sansera Pvt Ltd. Rudrapur visited TC Sitarganj on 17.05.2025\r\n(iii) Shri Rakesh Chaki, Plant Head, Aurangabad Auto Ltd. Rudrapur visited TC Sitarganj on 17.05.2025\r\n(iv) 100 Students from S.K.Public School, Khatima visited TC Sitarganj on 21.05.2025\r\n(v) Shri H.S.Meena, Scientist, DIBER Haldwani visited TC Sitarganj on 22.05.2025\r\n(vi) Shri Surendra Negi, Plant Head, Sinomex Diagnostics Pvt Ltd. Rudrapur visited TC Sitarganj on 22.05.2025',0.00,0.00,' (i) Commencement of Skill Development Training Program for 30 participants sponsored by Action Tesa Sitarganj\r\n(ii) Commencement of DRDO Sponsored training program on Solidworks for 25 participants on 26.05.2025\r\n(iii)2.	Successfully completed & delivered after VMC Machining of Fuel tank cap - 1000 nos. to M/s Sai Industries Rudrapur dated 29/04/2025.\r\n(iv) 3.	Successfully completed & delivered after VMC Machining of SML Pattern - 01 no. Die Set to M/s GPP Longhu Precision Forging , Sitarganj dated 28/04/2025.\r\n(v) 4.	Successfully completed & delivered after VMC Machining of CAT R/A Pattern - 01 no. Die Set to M/s GPP Longhu Precision Forging , Sitarganj dated 28/04/2025.',' -',NULL,' Regular promotional activities are being conducted by MSME TC Sitarganj through News Paper Advertisement, Social Media Advertisement, Visits to Collges and Industries'),('I5','1','2025-2026-1-20','2025-2026',0.00,13.00,13.00,-13.00,0.00,18,34,8,0,1,0,0,0,0.00,0.00,0.00,0.00,13.00,13.00,-13.00,'â?¢On April 9, 2025, one-day paid programs on AI and IoT were conducted at MSME TC Puducherry for 116 students from MVIT.\r\nâ?¢  On April 15, 2025, a staff meeting was held to discuss new business avenues and explain the Detailed Project Report (DPR) for FY 2025-26 preparations. \r\nâ?¢  Visits were made to the Government ITI for Women in Puducherry, the Directorate of Higher and Technical Education at Lawspet, and the District Industries Centre (DIC) office in Thattanchavady, followed by a meeting with the Assistant Engineer at the Electricity Department to discuss electricity consumption. \r\nâ?¢  The internship certificate and the two-day paid program certificate were handed over to the concerned individual. \r\nâ?¢  On April 23, 2025, a one-day paid program on AI was conducted at MSME TC Puducherry for 80 students from PSV College ',0.00,0.00,' 1.AI and IoT Training Programs\r\nApril 9, 2025: Conducted a one-day paid training program on Artificial Intelligence (AI) and the Internet of Things (IoT) for 116 students from MVIT.\r\n\r\nApril 23, 2025: Organized another one-day paid program on AI for 80 students from PSV College.\r\n\r\nThese programs are part of the Centre''s commitment to equipping students with cutting-edge technological skills, thereby enhancing their employability and fostering a culture of innovation.\r\n\r\n2. Strategic Planning and Stakeholder Engagement\r\nApril 15, 2025: Held a staff meeting to discuss new business avenues and to prepare the Detailed Project Report (DPR) for the fiscal year 2025-26.\r\n\r\nEngaged with key stakeholders through visits to the Government ITI for Women in Puducherry, the Directorate of Higher and Technical Education at Lawspet, and the District Industries Centre (DIC) office in Thattanchavady. Additionally, a meeting with the Assistant Engineer at the Electricity Department was conducted to discuss electricity consumption, reflecting the Centre''s commitment to sustainable operations.\r\n\r\n3. Internship and Certification Programs\r\nThe Centre successfully concluded its internship programs by distributing certificates to participants. Additionally, certificates for the two-day paid programs were handed over to the respective individuals, acknowledging their efforts and participation.',' ',NULL,' Title:\r\n1. â??Gateway to AI using Python & SolidWorksâ??\r\n2. â??Micro Python using ESP8266: Start Your Innovationâ??\r\n\r\nDuration:\r\n2 Days (Repeated Twice for 2 Batches of 100 Students Each)\r\nTarget Audience:\r\nEngineering & Polytechnic College Students (ECE, CSE, EEE, Mech,Mechatronics, etc.)\r\nTentative Dates:\r\nâ?¢1st Visit (Promotional + Coordination): First Week of May\r\nâ?¢Training Program Batches:\r\nBatch 1: May 9 and May 10, 2025\r\nBatch 2: May 29 and May 30 ,2025\r\nExpected Strength:\r\n200 Students (100 per batch)\r\nPromotional Activities Plan\r\n1. Pre-Visit Promotion\r\nActivity	Description	Timeline	Responsible\r\nCollege Visit	Meet HoDs, Faculty & Student Coordinators	May 1st week	Marketing Team\r\nBrochure Distribution	Printed & Digital PDFs for circulation	May 1st week	Marketing Team\r\n\r\nRegistration & Follow-Up\r\nâ?¢Google Form: For capturing student details & batch preferences\r\nâ?¢QR Code Posters: For easy registration via mobile\r\nâ?¢Reminder Campaign: Via WhatsApp & Email (2 days before the program)\r\nWe are plan to conduct PM Vishwakarma on may 2 nd week .\r\n'),('I5','2','2025-2026-2-20','2025-2026',0.00,17.50,30.50,-30.50,0.00,18,34,8,0,1,0,0,0,0.00,0.00,0.00,0.00,17.50,30.50,-30.50,' 29/04/25: Conducted one-day career guidance program in PLC for ~90 PTU mechatronics students at Pondicherry Technical University.\r\n05/05/25: Visited Rajiv Gandhi College of Engineering Technology and TPRS Pvt Ltd for new program collaboration.\r\n06/05/25: Visited Saradha Gangadharan College to invite for TECH TODAY-25; submitted proposal at DIC for advanced skill training program.\r\n\r\n07/05/25: Visited and invited Govt ITI for Men, Christ Arts & Science College, Christ College of Engineering, Community College Arts & Science, Tagore Arts & Science College, SS Arts & Science College, MNGPTC, and BASC for TECH TODAY-25.\r\n08/05/25: Conducted staff meeting to discuss two-day TECH TODAY-25 at MSME TC Puducherry.\r\n16/05/25: Started PM Vishwakarma Batch II for carpenter job role with 7 candidates at MSME TC Puducherry',0.00,0.00,'PM Vishwakarma Batch II: Launched carpenter job role training with 7 candidates (12-16 May 2025), boosting vocational skills under PM Vishwakarma scheme.\r\nCareer Guidance Program: Conducted one-day PLC session for ~90 PTU mechatronics students (29 Apr 2025), promoting industry-relevant skills.\r\nInternship Completion: Awarded six-week internship certificates to ECE students (25 Apr 2025) for practical training.\r\nNew Collaborations: Visited Rajiv Gandhi College & TPRS Pvt Ltd (5 May 2025) to explore skill development programs. Submitted proposal to DIC (6 May 2025) for advanced training under NMCP.\r\nTECH TODAY-25 Outreach: Engaged multiple colleges (6-7 May 2025) for industry-academia collaboration. Held staff meeting (8 May 2025) to plan two-day event.',' ',NULL,' Promotional Activities and Training Arrangements (May 2025):\r\n\r\nObjective: Mobilize and arrange hands-on training programs for students in grades 7th to 9th and 11th, tailored to their requirements, and facilitate internships for engineering students in Puducherry.\r\nPromotional Visits for 2-Day/6-Day Training:\r\nVisited the following schools to promote and arrange 2-day/6-day hands-on training programs for 7th to 9th and 11th-grade students:\r\nObjective was to engage students in practical, skill-based training aligned with their academic and career interests, with programs designed for 2-day and 6-day durations.\r\nInternship Arrangement:\r\nCoordinated with Womenâ??s Engineering College to arrange a six-week internship program for 30 students, focusing on hands-on technical training. Certificates were handed over to ECE department students on 25-may 2025 at MSME TC Puducherry.'),('I6','1','2025-2026-1-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,1,5,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'1. Simhagiri Foundary Work Pvt Ltd\r\n2. Mid lndia Caster & Services\r\n3. Shree Ram Seamless Pvt Ltd\r\n4. Bansal Brothers Pvt Ltd',0.00,0.00,' Nil','Nil ',NULL,'Nil'),('I6','2','2025-2026-2-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,1,5,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'1. Taurus Metal Pvt Ltd\r\n2. Eternity Work',0.00,0.00,' Nil',' Nil',NULL,' Nil'),('I7','1','2025-2026-1-20','2025-2026',7.54,7.54,7.54,0.00,0.00,5,6,0,0,1,1,0,0,0.00,0.00,0.00,7.54,7.54,7.54,0.00,' 1. Hi-Tech Corporation, Visakhapatnam  2. Parekh Plast, Visakhapatnam 3. Manjushree, Visakhapatnam 4. SVN Engineers, Visakhapatnam.',0.00,0.00,' Nil',' Nil',NULL,' Nil'),('I7','2','2025-2026-2-20','2025-2026',0.00,0.00,7.54,-7.54,0.00,5,6,0,0,1,1,0,0,0.00,0.00,0.00,0.00,0.00,7.54,-7.54,' Nil',0.00,0.00,' Nil',' Nil',NULL,' MSME CET -2025 Conducted on 11 May 2025. Total 520 candidates has been appeared for the CET.'),('I9','1','2025-2026-1-20','2025-2026',3.14,1.41,1.41,1.73,0.00,8,15,7,0,0,0,0,0,0.00,0.00,0.00,3.14,1.41,1.41,1.73,' MSME TC Greater Noida has visited 03 educational Institutes for the promotion of courses conducted at TC Greater Noida',0.00,0.00,' TC has conducted special session of entrepreneurship & digital marketing for the students of ongoing programs',' Requisite action and marketing plan is in progress for achieving the targets',NULL,' Digital Marketing was undertaken for Courses offered & workshops.'),('I9','2','2025-2026-2-20','2025-2026',3.14,4.25,5.66,-2.52,0.00,8,15,7,0,0,0,0,0,0.00,0.00,0.00,3.14,4.25,5.66,-2.52,' MSME TC Greater Noida has visited 02 educational Institutes for the promotion of courses conducted at TC Greater Noida',0.00,0.00,' TC has conducted special session of entrepreneurship & employability skills for the students of ongoing programs',' Requisite action and marketing plan is in progress for achieving the targets',NULL,' Digital Marketing was undertaken for Courses offered & workshop'),('I91','1','2025-2026-1-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,2,10,2,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'NITTR Faculty Training:\r\nConducted a 1-day specialized training on hydraulics for faculty from technical institutions in collaboration with NITTR, focusing on modern skill development techniques.\r\nMadhyanchal University Visit:\r\nHosted students and faculty from Madhyanchal University for an industry exposure program covering technology upgradation, skilling, and awareness of governmentÂ initiatives.\r\n',0.00,0.00,'CSIR-CSIO, Chandigarh: Received two orders from CSIR-CSIO, Chandigarh to manufacture Vibration Fixture & Angle Plates (5) worth order value of Rs. 160325',' ',NULL,'Visit to Industries / Associations, Institutions like ITI, Polytechnic College, Engineering College, Schools, Social Media Advertisements, Information Sharing.'),('I91','2','2025-2026-2-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,2,10,2,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,' Customer Visits\r\n1.Forgewell Corporation\r\n2.Asha Industrial Products for Vacuum Heat Treatment Furnace\r\n3.MANIT for Products for Vacuum Heat Treatment Furnace\r\n4.Rigthill for Job Work\r\n5. Sharmudya ITI Collaboration\r\n',0.00,0.00,'Customer & Job details.\r\nâ?¢CSIR-CSIO, Chandigarh: Received order from CSIR-CSIO, Chandigarh to manufacture Flange (10), Bottom Cap (8), CC (9), BW (2) worth order value of Rs. 337480.\r\nâ?¢Sai Agro Tech: Received order from Sai Agro Tech to manufacture Punch worth order value of Rs. 1180.\r\nâ?¢Maa Sharda Electro Stamping Pvt. Ltd. (First Order): Received order from Maa Sharda Electro Stamping Pvt. Ltd. to manufacture Rotor Pole worth order value of Rs. 21093.\r\nâ?¢Enterprising Engineers: Received order from Enterprising Engineers to manufacture SS Shaft 142 & Bolt Lock 125 worth order value of Rs. 23299.\r\nâ?¢Maa Sharda Electro Stamping Pvt. Ltd. (Second Order): Received order from Maa Sharda Electro Stamping Pvt. Ltd. to manufacture Laminator Stator worth order value of Rs. 5664.\r\nâ?¢Bhavani Maa Udyog: Received order from Bhavani Maa Udyog to manufacture P1 PROPTNK (AL 6061) worth order value of Rs. 11800.\r\n',' ',NULL,' Visit to Industries / Associations, Institutions like ITI, Polytechnic College, Engineering College, Schools, Social Media Advertisements, Information Sharing.'),('I92','1','2025-2026-1-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,2,0,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,' REGINAL LABOUR INSTITUTE \r\n 7 POLYTECHNIC ',0.00,0.00,' NIL',' NIL',NULL,'SEMINAR OF 302 DIPLOMA PURSUING STUDENTS FROM GOVT.POLYTECNIC MOBILIED FOR INTURNSHIP AND SHORT TERM COURSES. '),('I92','2','2025-2026-2-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,2,0,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'Vishal Industries\r\n4 BRD\r\nLohia Corp',0.00,0.00,' Nil',' Nil',NULL,' Visit ITIs for Short Term courses '),('I93','1','2025-2026-1-20','2025-2026',2.39,5.61,5.61,-3.22,0.00,8,10,7,0,1,0,0,0,0.00,0.00,0.00,2.39,5.61,5.61,-3.22,' MSME TC Bengaluru has visited 03 Educational Institutes or promotions of courses conducted at TC Bengaluru ',0.00,0.00,' TC has conducted workshops on weekends to ensure the maximum participation of wage employees on current industrial topics (AI & Chat GPT)',' Requisite action and marketing plan is in progress for achieving the target.',NULL,' Digital marketing was undertaken for the manufacturing incubation centre available in TC Bengaluru.'),('I93','2','2025-2026-2-20','2025-2026',2.39,9.29,14.90,-12.51,0.00,8,10,7,0,1,0,0,0,0.00,0.00,0.00,2.39,9.29,14.90,-12.51,' MSME TC Bengaluru has visited 04 Educational institutes for promotions of courses conducted at TC Bengaluru, and financial availability of MSME was briefed to startups',0.00,0.00,' TC has conducted workshops on weekends to ensure the maximum participation of wage employees on current industrial topics (AI & Chat GPT, GST Practitioner, Export & Import) ',' Requisite action and marketing plan are in progress for achieving the target. ',NULL,' Digital marketing was undertaken for the manufacturing incubation centre available in TC Bengaluru.'),('I94','1','2025-2026-1-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,1,0,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,' a.Visited polytechnic and engineering colleges in Bihta Patna',0.00,0.00,'1.Completed a Auto-cad Workshop for one Week consisting 23 Student at NSIT Engg. College in which 01 Girls Student took training.\r\n2.071 Student registered for AutoCAD 96 Hrs. Course for 28th April 2025 Batch-27th May,2025.\r\n3.SBPDCL, Bihta, Patna. Labour contractor has been finalized by the SBDPCL and it is expected that installation and commissioning will complete in 45 days from 28th April,2025.\r\n',' nil',NULL,' nil'),('I94','2','2025-2026-2-20','2025-2026',0.00,0.00,0.00,0.00,0.00,19,35,6,0,1,0,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,' 1.Visited Govt engineering colleges, Banka, Bihar. \r\n',0.00,0.00,' Government Engineering College, Banka and MSME Technology Centre, Patna will sign an MoU related to training and entrepreneurship programs shortly.',' NIL',NULL,' NIL');

--
-- Table structure for table `tbl_budget_123`
--

DROP TABLE IF EXISTS tbl_budget_123;

CREATE TABLE tbl_budget_123 (
  INST_ID varchar(10) DEFAULT NULL,
  MONTHS varchar(20) DEFAULT NULL,
  YEARS decimal(10,0) DEFAULT NULL,
  MONTHS_YEAR date DEFAULT NULL,
  CRY_FWD_AMT decimal(10,2) DEFAULT NULL,
  CRY_FWD_UTIL_DM decimal(10,2) DEFAULT NULL,
  CRY_FWD_UTIL_CUM decimal(10,2) DEFAULT NULL,
  CRY_FWD_UTIL_BAL decimal(10,2) DEFAULT NULL,
  GIA_AMT decimal(10,2) DEFAULT NULL,
  STF_ST_SS_A decimal(10,2) DEFAULT NULL,
  STF_ST_SS_B decimal(10,2) DEFAULT NULL,
  STF_ST_SS_C decimal(10,2) DEFAULT NULL,
  STF_ST_SS_D decimal(10,2) DEFAULT NULL,
  STF_ST_POS_A decimal(10,2) DEFAULT NULL,
  STF_ST_POS_B decimal(10,2) DEFAULT NULL,
  STF_ST_POS_C decimal(10,2) DEFAULT NULL,
  STF_ST_POS_D decimal(10,2) DEFAULT NULL,
  GIA_UTIL_DM decimal(10,2) DEFAULT NULL,
  GIA_UTIL_CUM decimal(10,2) DEFAULT NULL,
  GIA_UTIL_BAL decimal(10,2) DEFAULT NULL,
  BUDGET_TOTAL_AMT decimal(10,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM decimal(10,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM decimal(10,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL decimal(10,2) DEFAULT NULL,
  DETAILS_VISIT varchar(1000) DEFAULT NULL,
  MACHINE_DTM decimal(10,2) DEFAULT NULL,
  MACHINE_CUM decimal(10,2) DEFAULT NULL,
  SIGNIFICANT varchar(1000) DEFAULT NULL,
  SHORTS_FALL varchar(1000) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL
);


--
-- Dumping data for table `tbl_budget_123`
--


--
-- Table structure for table `tbl_budget_bk`
--

DROP TABLE IF EXISTS tbl_budget_bk;

CREATE TABLE tbl_budget_bk (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(125) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  CRY_FWD_AMT decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_DM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_CUM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_BAL decimal(28,2) NOT NULL,
  GIA_AMT decimal(28,2) DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_CUM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_BAL decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_AMT decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL decimal(28,2) DEFAULT NULL,
  DETAILS_VISIT varchar(1425) DEFAULT NULL,
  MACHINE_DTM decimal(28,2) DEFAULT NULL,
  MACHINE_CUM decimal(28,2) DEFAULT NULL,
  SIGNIFICANT varchar(1430) DEFAULT NULL,
  SHORTS_FALL varchar(1428) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  PRIMARY KEY (INST_ID,MONTHS,YEARS),
  UNIQUE (INST_ID,MONTHS,YEARS)
);


--
-- Dumping data for table `tbl_budget_bk`
--


--
-- Table structure for table `tbl_budget_bk1`
--

DROP TABLE IF EXISTS tbl_budget_bk1;

CREATE TABLE tbl_budget_bk1 (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(125) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  CRY_FWD_AMT decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_DM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_CUM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_BAL decimal(28,2) NOT NULL,
  GIA_AMT decimal(28,2) DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_CUM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_BAL decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_AMT decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL decimal(28,2) DEFAULT NULL,
  DETAILS_VISIT varchar(1425) DEFAULT NULL,
  MACHINE_DTM decimal(28,2) DEFAULT NULL,
  MACHINE_CUM decimal(28,2) DEFAULT NULL,
  SIGNIFICANT varchar(1430) DEFAULT NULL,
  SHORTS_FALL varchar(1428) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL
);


--
-- Dumping data for table `tbl_budget_bk1`
--


--
-- Table structure for table `tbl_budget_bkp`
--

DROP TABLE IF EXISTS tbl_budget_bkp;

CREATE TABLE tbl_budget_bkp (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(125) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  CRY_FWD_AMT decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_DM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_CUM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_BAL decimal(28,2) NOT NULL,
  GIA_AMT decimal(28,2) DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_CUM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_BAL decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_AMT decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL decimal(28,2) DEFAULT NULL,
  DETAILS_VISIT varchar(1425) DEFAULT NULL,
  MACHINE_DTM decimal(28,2) DEFAULT NULL,
  MACHINE_CUM decimal(28,2) DEFAULT NULL,
  SIGNIFICANT varchar(1430) DEFAULT NULL,
  SHORTS_FALL varchar(1428) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL
);


--
-- Dumping data for table `tbl_budget_bkp`
--


--
-- Table structure for table `tbl_budget_copy`
--

DROP TABLE IF EXISTS tbl_budget_copy;

CREATE TABLE tbl_budget_copy (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(125) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  CRY_FWD_AMT decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_DM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_CUM decimal(28,2) DEFAULT NULL,
  CRY_FWD_UTIL_BAL decimal(28,2) NOT NULL,
  GIA_AMT decimal(28,2) DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_CUM decimal(28,2) DEFAULT NULL,
  GIA_UTIL_BAL decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_AMT decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM decimal(28,2) DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL decimal(28,2) DEFAULT NULL,
  DETAILS_VISIT varchar(1425) DEFAULT NULL,
  MACHINE_DTM decimal(28,2) DEFAULT NULL,
  MACHINE_CUM decimal(28,2) DEFAULT NULL,
  SIGNIFICANT varchar(1430) DEFAULT NULL,
  SHORTS_FALL varchar(1428) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  newText varchar(5000) DEFAULT ' '
);


--
-- Dumping data for table `tbl_budget_copy`
--


--
-- Table structure for table `tbl_budget_old`
--

DROP TABLE IF EXISTS tbl_budget_old;

CREATE TABLE tbl_budget_old (
  INST_ID varchar(10) DEFAULT NULL,
  MONTHS varchar(20) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  MONTHS_YEAR date DEFAULT NULL,
  CRY_FWD_AMT integer DEFAULT NULL,
  CRY_FWD_UTIL_DM integer DEFAULT NULL,
  CRY_FWD_UTIL_CUM integer DEFAULT NULL,
  CRY_FWD_UTIL_BAL integer DEFAULT NULL,
  GIA_AMT integer DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM integer DEFAULT NULL,
  GIA_UTIL_CUM integer DEFAULT NULL,
  GIA_UTIL_BAL integer DEFAULT NULL,
  BUDGET_TOTAL_AMT integer DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM integer DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM integer DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL integer DEFAULT NULL,
  MACHINE_DTM integer DEFAULT NULL,
  MACHINE_CUM integer DEFAULT NULL,
  SIGNIFICANT text,
  SHORTS_FALL text,
  SISI_NM varchar(50) DEFAULT NULL,
  DETAILS_VISIT text,
  SIGNIFICANT_1 text,
  SHORTS_FALL_1 text
);


--
-- Dumping data for table `tbl_budget_old`
--


--
-- Table structure for table `tbl_budget_old_19july2010`
--

DROP TABLE IF EXISTS tbl_budget_old_19july2010;

CREATE TABLE tbl_budget_old_19july2010 (
  INST_ID varchar(10) DEFAULT NULL,
  MONTHS varchar(20) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  MONTHS_YEAR date DEFAULT NULL,
  CRY_FWD_AMT integer DEFAULT NULL,
  CRY_FWD_UTIL_DM integer DEFAULT NULL,
  CRY_FWD_UTIL_CUM integer DEFAULT NULL,
  CRY_FWD_UTIL_BAL integer DEFAULT NULL,
  GIA_AMT integer DEFAULT NULL,
  STF_ST_SS_A integer DEFAULT NULL,
  STF_ST_SS_B integer DEFAULT NULL,
  STF_ST_SS_C integer DEFAULT NULL,
  STF_ST_SS_D integer DEFAULT NULL,
  STF_ST_POS_A integer DEFAULT NULL,
  STF_ST_POS_B integer DEFAULT NULL,
  STF_ST_POS_C integer DEFAULT NULL,
  STF_ST_POS_D integer DEFAULT NULL,
  GIA_UTIL_DM integer DEFAULT NULL,
  GIA_UTIL_CUM integer DEFAULT NULL,
  GIA_UTIL_BAL integer DEFAULT NULL,
  BUDGET_TOTAL_AMT integer DEFAULT NULL,
  BUDGET_TOTAL_UTIL_DM integer DEFAULT NULL,
  BUDGET_TOTAL_UTIL_CUM integer DEFAULT NULL,
  BUDGET_TOTAL_UTIL_BAL integer DEFAULT NULL,
  DETAILS_VISIT text,
  MACHINE_DTM integer DEFAULT NULL,
  MACHINE_CUM integer DEFAULT NULL,
  SIGNIFICANT text,
  SHORTS_FALL text,
  SISI_NM varchar(50) DEFAULT NULL
);


--
-- Dumping data for table `tbl_budget_old_19july2010`
--


--
-- Table structure for table `tbl_cabinet_summary`
--

DROP TABLE IF EXISTS tbl_cabinet_summary;

CREATE TABLE tbl_cabinet_summary (
  INST_ID varchar(10) NOT NULL DEFAULT '',
  MONTHS varchar(20) NOT NULL,
  YEARS integer NOT NULL,
  MONTHS_YEAR date DEFAULT NULL,
  RTE_CONTENT text,
  SISI_NM varchar(50) DEFAULT NULL,
  RTE_CONTENT_N text,
  PRIMARY KEY (INST_ID,MONTHS,YEARS)
);


--
-- Dumping data for table `tbl_cabinet_summary`
--


--
-- Table structure for table `tbl_course_txn`
--

DROP TABLE IF EXISTS tbl_course_txn;

CREATE TABLE tbl_course_txn (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  TARGET integer DEFAULT NULL,
  DTM integer DEFAULT NULL,
  COMMULATIVE integer DEFAULT NULL,
  DATES varchar(425) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  COURSE_NAME varchar(113) DEFAULT NULL
);


--
-- Dumping data for table `tbl_course_txn`
--

INSERT INTO tbl_course_txn VALUES ('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,' DIPLOMA IN TOOL & DIE MAKINGDTDM(ADTDM)'),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,'DIPLOMA IN MECHATRONICS(DIM)'),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,'DIPLOMA IN LOGISTICS TECHNOLOGY (DILT)'),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I1','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I4','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','1','2025-2026',NULL,30,30,'2025-2026-1-20',NULL,'Senior Technician Mechatronics'),('I91','1','2025-2026',NULL,30,30,'2025-2026-1-20',NULL,'Junior Technician Computer Hardware & Network'),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I2','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I91','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,'Advanced diploma in Tool and Die making '),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,'Diploma in Mechatronics '),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I2','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,'Diploma in Tool & Die making'),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,'Diploma in Mechatronics'),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,'Diploma in Logistics Technology'),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I1','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I5','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I3','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I9','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I94','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I5','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I92','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I7','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I93','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','1','2025-2026',NULL,0,0,'2025-2026-1-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,''),('I6','2','2025-2026',NULL,0,0,'2025-2026-2-20',NULL,'');

--
-- Table structure for table `tbl_course_txn_13112023`
--

DROP TABLE IF EXISTS tbl_course_txn_13112023;

CREATE TABLE tbl_course_txn_13112023 (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  TARGET integer DEFAULT NULL,
  DTM integer DEFAULT NULL,
  COMMULATIVE integer DEFAULT NULL,
  DATES varchar(425) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  COURSE_NAME varchar(113) DEFAULT NULL
);


--
-- Dumping data for table `tbl_course_txn_13112023`
--


--
-- Table structure for table `tbl_course_txn_bk1`
--

DROP TABLE IF EXISTS tbl_course_txn_bk1;

CREATE TABLE tbl_course_txn_bk1 (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  TARGET integer DEFAULT NULL,
  DTM integer DEFAULT NULL,
  COMMULATIVE integer DEFAULT NULL,
  DATES varchar(425) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  COURSE_NAME varchar(113) DEFAULT NULL
);


--
-- Dumping data for table `tbl_course_txn_bk1`
--


--
-- Table structure for table `tbl_course_txn_new`
--

DROP TABLE IF EXISTS tbl_course_txn_new;

CREATE TABLE tbl_course_txn_new (
  COURSE_INDEX integer DEFAULT NULL,
  INST_ID char(10) DEFAULT NULL,
  MONTHS char(10) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  TARGET integer DEFAULT NULL,
  DTM integer DEFAULT NULL,
  COMMULATIVE integer DEFAULT NULL,
  DATES date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  COURSE_NAME char(100) DEFAULT NULL
);


--
-- Dumping data for table `tbl_course_txn_new`
--


--
-- Table structure for table `tbl_course_txn_old_19july2010`
--

DROP TABLE IF EXISTS tbl_course_txn_old_19july2010;

CREATE TABLE tbl_course_txn_old_19july2010 (
  INST_ID char(10) DEFAULT NULL,
  MONTHS char(10) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  TARGET integer DEFAULT NULL,
  DTM integer DEFAULT NULL,
  COMMULATIVE integer DEFAULT NULL,
  DATES date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  COURSE_NAME char(100) DEFAULT NULL
);


--
-- Dumping data for table `tbl_course_txn_old_19july2010`
--


--
-- Table structure for table `tbl_court_syn`
--

DROP TABLE IF EXISTS tbl_court_syn;

CREATE TABLE tbl_court_syn (
  sno integer NOT NULL ,
  court_name varchar(145) NOT NULL,
  court_abbrv varchar(145) NOT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_court_syn`
--


--
-- Table structure for table `tbl_di_institute`
--

DROP TABLE IF EXISTS tbl_di_institute;

CREATE TABLE tbl_di_institute (
  ID integer DEFAULT NULL,
  INST_ID char(10) DEFAULT NULL,
  INST_NAME char(200) DEFAULT NULL,
  INST_ADDRESS char(200) DEFAULT NULL
);


--
-- Dumping data for table `tbl_di_institute`
--


--
-- Table structure for table `tbl_di_target`
--

DROP TABLE IF EXISTS tbl_di_target;

CREATE TABLE tbl_di_target (
  INSTID char(25) NOT NULL,
  YEARS integer NOT NULL,
  IMC integer DEFAULT NULL,
  EDP_NONSTIPHEN integer DEFAULT NULL,
  EDP_STIPHEN_W integer DEFAULT NULL,
  EDP_STIPHEN_SC integer DEFAULT NULL,
  EDP_STIPHEN_ST integer DEFAULT NULL,
  EDP_SANCTION integer DEFAULT NULL,
  ESDP_NONSTIPHEN_GEN integer DEFAULT NULL,
  ESDP_NONSTIPHEN_SC integer DEFAULT NULL,
  ESDP_NONSTIPHEN_ST integer DEFAULT NULL,
  ESDP_STIPHEN_W integer DEFAULT NULL,
  ESDP_STIPHEN_SC integer DEFAULT NULL,
  ESDP_STIPHEN_ST integer DEFAULT NULL,
  ESDP_SANCTION integer DEFAULT NULL,
  MDP integer DEFAULT NULL,
  BSDP_GEN integer DEFAULT NULL,
  BSDP_SC integer DEFAULT NULL,
  BSDP_ST integer DEFAULT NULL,
  ESDPBIOTECH integer DEFAULT NULL,
  MSME_DI char(100) DEFAULT NULL,
  PRIMARY KEY (INSTID,YEARS)
);


--
-- Dumping data for table `tbl_di_target`
--


--
-- Table structure for table `tbl_di_target_month`
--

DROP TABLE IF EXISTS tbl_di_target_month;

CREATE TABLE tbl_di_target_month (
  INSTID char(10) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  MONTH char(100) DEFAULT NULL,
  ESDP integer DEFAULT NULL,
  EDP integer DEFAULT NULL,
  MDP integer DEFAULT NULL,
  ESDP_BIOTECH integer DEFAULT NULL,
  IMC integer DEFAULT NULL,
  BSDP integer DEFAULT NULL,
  INST_NAME char(100) DEFAULT NULL
);


--
-- Dumping data for table `tbl_di_target_month`
--


--
-- Table structure for table `tbl_di_target_ner`
--

DROP TABLE IF EXISTS tbl_di_target_ner;

CREATE TABLE tbl_di_target_ner (
  INSTID char(25) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  IMC integer DEFAULT NULL,
  EDP_NONSTIPHEN integer DEFAULT NULL,
  EDP_STIPHEN_W integer DEFAULT NULL,
  EDP_STIPHEN_SC integer DEFAULT NULL,
  EDP_STIPHEN_ST integer DEFAULT NULL,
  EDP_SANCTION integer DEFAULT NULL,
  ESDP_NONSTIPHEN_GEN integer DEFAULT NULL,
  ESDP_NONSTIPHEN_SC integer DEFAULT NULL,
  ESDP_NONSTIPHEN_ST integer DEFAULT NULL,
  ESDP_STIPHEN_W integer DEFAULT NULL,
  ESDP_STIPHEN_SC integer DEFAULT NULL,
  ESDP_STIPHEN_ST integer DEFAULT NULL,
  ESDP_SANCTION integer DEFAULT NULL,
  MDP integer DEFAULT NULL,
  BSDP_GEN integer DEFAULT NULL,
  BSDP_SC integer DEFAULT NULL,
  BSDP_ST integer DEFAULT NULL,
  ESDPBIOTECH integer DEFAULT NULL,
  MSME_DI char(100) DEFAULT NULL
);


--
-- Dumping data for table `tbl_di_target_ner`
--


--
-- Table structure for table `tbl_dis_entry`
--

DROP TABLE IF EXISTS tbl_dis_entry;

CREATE TABLE tbl_dis_entry (
  ID_NO integer DEFAULT NULL,
  INST_ID char(10) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  MONTHS char(20) DEFAULT NULL,
  PROGRAM_NAME char(100) DEFAULT NULL,
  PROGRAM_DIV char(100) DEFAULT NULL,
  PROGRAM_TYPE char(100) DEFAULT NULL,
  YEARLY_TARGET integer DEFAULT NULL,
  TARGET_REPORT_MONTH integer DEFAULT NULL,
  ACHIV_REPORT_MONTH integer DEFAULT NULL,
  EXPENDITURE integer DEFAULT NULL,
  SC_M integer DEFAULT NULL,
  SC_F integer DEFAULT NULL,
  ST_M integer DEFAULT NULL,
  ST_F integer DEFAULT NULL,
  OBC_M integer DEFAULT NULL,
  OBC_F integer DEFAULT NULL,
  BUDHIST_M integer DEFAULT NULL,
  BUDHIST_F integer DEFAULT NULL,
  CHRISTIAN_M integer DEFAULT NULL,
  CHRISTIAN_F integer DEFAULT NULL,
  MUSLIM_M integer DEFAULT NULL,
  MUSLIM_F integer DEFAULT NULL,
  PARSI_M integer DEFAULT NULL,
  PARSI_F integer DEFAULT NULL,
  SIKH_M integer DEFAULT NULL,
  SIKH_F integer DEFAULT NULL,
  OTHERS_M integer DEFAULT NULL,
  OTHERS_F integer DEFAULT NULL,
  ADV_DRAWN_DI_MONTH integer DEFAULT NULL,
  NO_PROG_REPORT_MONTH integer DEFAULT NULL,
  CREATION_DATE date DEFAULT NULL,
  PH_M integer DEFAULT NULL,
  PH_F integer DEFAULT NULL,
  SNO integer DEFAULT NULL,
  TOTAL_M integer DEFAULT NULL,
  TOTAL_F integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_dis_entry`
--


--
-- Table structure for table `tbl_employee_details`
--

DROP TABLE IF EXISTS tbl_employee_details;

CREATE TABLE tbl_employee_details (
  sno integer NOT NULL ,
  Employee_history date NOT NULL,
  Employee_history1 date NOT NULL,
  place varchar(45) NOT NULL,
  name varchar(45) NOT NULL,
  date_of_joining date NOT NULL,
  reference_number varchar(45) NOT NULL,
  date_of_joining_inmsme date NOT NULL,
  current varchar(45) NOT NULL,
  promtion_details varchar(45) NOT NULL,
  division_workingon varchar(45) NOT NULL,
  date_of_confirmation date NOT NULL,
  Reference date NOT NULL,
  Recuritment varchar(45) NOT NULL,
  Remarks varchar(245) NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (name,date_of_joining,Employee_history)
);


--
-- Dumping data for table `tbl_employee_details`
--


--
-- Table structure for table `tbl_esdp`
--

DROP TABLE IF EXISTS tbl_esdp;

CREATE TABLE tbl_esdp (
  sno integer NOT NULL ,
  InstId varchar(45) NOT NULL,
  months integer NOT NULL,
  smallint varchar(45) NOT NULL,
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
  user_date varchar(45) NOT NULL,
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
  other1 integer NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (InstId,months,smallint)
);


--
-- Dumping data for table `tbl_esdp`
--


--
-- Table structure for table `tbl_feedback`
--

DROP TABLE IF EXISTS tbl_feedback;

CREATE TABLE tbl_feedback (
  sno integer NOT NULL ,
  txtName varchar(345) NOT NULL,
  txtDesignation varchar(345) NOT NULL,
  txtOrganization varchar(345) NOT NULL,
  txtAddress varchar(345) NOT NULL,
  Telephone varchar(345) NOT NULL,
  query varchar(345) NOT NULL,
  email varchar(345) NOT NULL,
  randomno varchar(45) DEFAULT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_feedback`
--


--
-- Table structure for table `tbl_financial`
--

DROP TABLE IF EXISTS tbl_financial;

CREATE TABLE tbl_financial (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  MONTHS_YEAR varchar(125) NOT NULL,
  REV_EAR_CASH_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_TARGET integer DEFAULT NULL,
  REV_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TEST_CAL_SERVICES_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_MON decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_MON decimal(28,2) DEFAULT NULL,
  SNO integer NOT NULL ,
  REV_EAR_CSH_BAS_CONSULT_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_CSH_BAS_CONSULT_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CSH_BAS_CONSULT_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCL_BAS_CONSULT_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCL_BAS_CONSULT_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCL_BAS_CONSULT_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_TARGET integer DEFAULT '0',
  REV_EAR_CASH_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_CASH_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT '0.00',
  REV_EAR_CASH_PRDTN_OTHERJOB_TARGET integer DEFAULT '0',
  REV_EAR_CASH_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_CASH_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_TOOLING_TARGET integer DEFAULT '0',
  REV_EAR_ACCRUAL_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_TARGET integer DEFAULT '0',
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT '0.00',
  PRIMARY KEY (SNO)
);


--
-- Dumping data for table `tbl_financial`
--

INSERT INTO tbl_financial VALUES ('I1','1','2025-2026','2025-2026-1-20',246.47,2.27,2.27,0,0.00,0.00,7,0.82,0.82,316,13.45,13.45,0.00,2.27,2.27,0,0.00,0.00,0.00,0.82,0.82,0.00,12.86,12.86,0.00,28.91,28.91,0,28.91,28.91,0.00,-15.46,-15.46,0.00,-16.05,-16.05,0.00,46.52,46.52,0.00,44.48,44.48,NULL,0,0.00,0.00,0,0.00,0.00,1,10.00,0.11,0.11,0.00,0.11,0.11,5,0.34,0.34,48,9.91,9.91,0,0.34,0.34,0,9.32,9.32),('I9','1','2025-2026','2025-2026-1-20',0.00,0.09,0.09,0,0.00,0.00,0,0.00,0.00,50,0.09,0.09,0.00,0.00,0.00,0,0.00,0.00,0.00,0.00,0.00,50.00,0.00,0.00,100.00,4.20,4.20,100,0.00,0.00,-50.00,-4.11,-4.11,0.00,0.00,0.00,0.00,2.14,2.14,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,2,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I4','1','2025-2026','2025-2026-1-20',0.00,0.20,0.20,0,0.00,0.00,0,0.00,0.00,242,0.20,0.20,0.00,0.20,0.20,0,0.00,0.00,0.00,0.00,0.00,242.00,0.38,0.58,242.00,19.81,19.81,242,19.81,19.81,0.00,-19.61,-19.61,0.00,-19.43,-19.23,0.00,1.01,1.01,0.00,1.92,2.93,NULL,0,0.00,0.00,0,0.00,0.00,3,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.20,0,0.18,0.18),('I91','1','2025-2026','2025-2026-1-20',0.00,3.51,3.51,0,0.00,0.00,0,0.00,0.00,416,4.36,4.36,0.00,15.27,15.27,0,0.00,0.00,0.00,0.00,0.00,416.00,16.87,16.87,416.00,38.07,38.07,416,38.07,38.07,0.00,-33.71,-33.71,0.00,-21.20,-21.20,0.00,11.45,11.45,0.00,44.31,44.31,NULL,0,0.00,0.00,0,0.00,0.00,4,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.85,0.85,0,0.00,0.00,0,1.60,1.60),('I4','2','2025-2026','2025-2026-2-20',0.00,9.98,10.18,0,0.00,0.00,0,0.27,0.27,242,10.25,10.45,0.00,9.98,10.18,0,0.00,0.00,0.00,0.27,0.27,242.00,10.67,11.05,242.00,22.53,42.34,242,22.53,42.34,0.00,-12.28,-31.89,0.00,-11.86,-31.98,0.00,45.50,24.68,0.00,47.37,26.10,NULL,0,0.00,0.00,0,0.00,0.00,5,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.42,0.60),('I91','2','2025-2026','2025-2026-2-20',0.00,2.49,6.00,0,0.00,0.00,0,0.00,0.00,416,3.38,7.74,0.00,5.31,20.58,0,0.00,0.00,0.00,0.00,0.00,416.00,9.32,26.19,416.00,41.67,79.74,416,41.67,79.74,0.00,-38.29,-72.00,0.00,-32.35,-53.55,0.00,8.11,9.71,0.00,22.37,32.84,NULL,0,0.00,0.00,0,0.00,0.00,7,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.89,1.74,0,0.00,0.00,0,4.01,5.61),('I1','2','2025-2026','2025-2026-2-20',0.00,5.03,7.30,0,0.00,0.00,7,0.36,1.18,7,9.90,23.35,0.00,2.32,4.59,0,0.00,0.00,0.00,0.35,1.17,403.00,6.62,19.48,403.00,35.70,64.61,403,35.70,64.61,0.00,-25.80,-41.26,0.00,-29.08,-45.13,0.00,27.73,36.14,0.00,18.54,30.15,NULL,0,0.00,0.00,0,0.00,0.00,9,0.00,0.02,0.13,0.00,0.07,0.18,0,0.00,0.34,0,4.49,14.40,0,0.40,0.74,0,3.48,12.80),('I5','1','2025-2026','2025-2026-1-20',0.00,0.91,0.91,0,0.00,0.00,0,0.00,0.00,130,1.68,1.68,0.00,0.91,0.91,0,0.00,0.00,0.00,0.00,0.00,130.00,2.11,2.11,130.00,13.00,13.00,130,0.00,0.00,0.00,-11.32,-11.32,0.00,2.11,2.11,0.00,12.92,12.92,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,12,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.77,0.77,0,0.00,0.00,0,1.20,1.20),('I3','1','2025-2026','2025-2026-1-20',0.00,0.50,0.50,0,0.00,0.00,0,0.00,0.00,252,0.70,0.70,0.00,0.30,0.30,0,0.00,0.00,0.00,0.00,0.00,252.00,0.50,0.50,252.00,15.90,15.90,252,1.00,1.00,0.00,-15.20,-15.20,0.00,0.20,0.20,0.00,4.40,4.40,0.00,50.00,50.00,NULL,0,0.00,0.00,0,0.00,0.00,13,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.20,0.20,0,0.00,0.00,0,0.10,0.10),('I3','2','2025-2026','2025-2026-2-20',0.00,1.00,1.50,0,0.00,0.00,0,0.00,0.00,252,1.70,2.40,0.00,0.20,0.50,0,0.00,0.00,0.00,0.00,0.00,252.00,0.20,0.60,252.00,16.30,32.20,252,0.40,1.40,0.00,-14.60,-29.80,0.00,-0.20,0.00,0.00,10.43,7.45,0.00,50.00,42.86,NULL,0,0.00,0.00,0,0.00,0.00,14,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.70,0.90,0,0.00,0.00,0,0.60,0.70),('I9','2','2025-2026','2025-2026-2-20',0.00,0.63,0.72,0,0.00,0.00,0,0.00,0.00,50,0.63,0.72,0.00,0.00,0.00,0,0.00,0.00,0.00,0.00,0.00,50.00,0.00,0.00,100.00,8.07,12.27,100,0.00,0.00,0.00,-7.44,-11.55,0.00,0.00,0.00,0.00,7.81,5.87,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,17,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I92','1','2025-2026','2025-2026-1-20',0.00,6.21,6.21,0,0.00,0.00,0,0.07,0.07,374,6.28,6.28,0.00,2.21,2.21,0,0.00,0.00,0.00,0.00,0.00,374.00,2.31,2.31,374.00,11.53,11.53,374,16.06,16.06,0.00,-5.32,-5.32,0.00,-13.85,-13.85,0.00,54.47,54.47,0.00,14.38,14.38,NULL,0,0.00,0.00,0,0.10,0.10,18,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I94','1','2025-2026','2025-2026-1-20',0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,30,0.00,0.00,0.00,0.07,0.07,0,0.00,0.00,0.00,0.00,0.00,30.00,0.07,0.07,100.00,0.00,0.00,100,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,19,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I94','2','2025-2026','2025-2026-2-20',0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,30,0.00,0.00,0.00,0.00,0.07,0,0.00,0.00,0.00,0.00,0.00,30.00,0.00,0.07,100.00,0.00,0.00,100,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,20,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I92','2','2025-2026','2025-2026-2-20',0.00,1.98,8.19,0,0.00,0.00,0,0.00,0.07,374,1.98,8.26,0.00,1.70,3.91,0,0.00,0.00,0.00,0.00,0.00,374.00,1.70,4.01,374.00,19.36,30.89,374,19.36,35.42,0.00,-19.36,-24.61,0.00,-17.66,-31.41,0.00,10.23,26.74,0.00,8.78,11.32,NULL,0,0.00,0.00,0,0.00,0.10,21,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I5','2','2025-2026','2025-2026-2-20',0.00,3.20,4.11,0,0.00,0.00,0,0.00,0.00,130,3.40,5.08,0.00,3.20,4.11,0,0.00,0.00,0.00,0.00,0.00,130.00,3.50,5.61,130.00,17.50,30.50,130,0.00,0.00,0.00,-14.10,-25.42,0.00,3.50,5.61,0.00,19.43,16.66,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,22,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.20,0.97,0,0.00,0.00,0,0.30,1.50),('I7','1','2025-2026','2025-2026-1-20',0.00,0.16,0.16,0,0.00,0.00,0,5.04,5.04,508,5.20,5.20,350.00,0.16,0.16,0,0.00,0.00,40.00,5.04,5.04,508.00,13.02,13.02,450.00,19.43,19.43,450,36.22,36.22,58.00,-14.23,-14.23,58.00,-23.20,-23.20,0.00,26.76,26.76,0.00,35.95,35.95,NULL,0,0.00,0.00,3,0.00,0.00,23,0.00,0.00,0.00,5.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,20,0.00,0.00,90,7.82,7.82),('I7','2','2025-2026','2025-2026-2-20',0.00,0.26,0.42,0,0.00,0.00,0,1.51,6.55,508,1.77,6.97,350.00,10.06,10.22,0,0.00,0.00,40.00,1.51,6.55,508.00,11.57,23.08,508.00,24.33,43.76,508,35.91,72.13,0.00,-22.56,-36.79,0.00,-24.34,-49.05,0.00,7.27,15.93,0.00,32.22,32.00,NULL,0,0.00,0.00,0,0.00,0.00,24,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,7.82),('I93','1','2025-2026','2025-2026-1-20',150.00,0.97,0.97,0,0.00,0.00,0,0.00,0.00,150,0.97,0.97,0.00,0.00,0.00,0,0.00,0.00,0.00,0.00,0.00,150.00,0.00,0.00,150.00,5.61,5.61,150,0.00,0.00,0.00,-4.64,-4.64,0.00,0.00,0.00,0.00,17.29,17.29,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,25,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I93','2','2025-2026','2025-2026-2-20',150.00,1.43,2.40,0,0.00,0.00,0,0.00,0.00,150,1.43,2.40,0.00,0.00,0.00,0,0.00,0.00,0.00,0.00,0.00,150.00,0.00,0.00,150.00,9.29,14.90,150,0.00,0.00,0.00,-7.86,-12.50,0.00,0.00,0.00,0.00,15.39,16.11,0.00,0.00,0.00,NULL,0,0.00,0.00,0,0.00,0.00,26,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00),('I6','1','2025-2026','2025-2026-1-20',0.00,3.54,3.54,0,0.00,0.00,0,0.00,0.00,379,4.20,4.20,0.00,6.60,6.60,0,0.00,0.00,0.00,0.00,0.00,379.00,7.26,7.26,379.00,31.46,31.46,379,25.79,25.79,0.00,-27.26,-27.26,0.00,-18.53,-18.53,0.00,13.35,13.35,0.00,28.15,28.15,NULL,0,0.00,0.00,0,0.00,0.00,27,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.66,0.66,0,0.00,0.00,0,0.66,0.66),('I6','2','2025-2026','2025-2026-2-20',0.00,5.53,9.07,0,0.00,0.00,0,0.00,0.00,379,5.89,10.09,0.00,6.60,13.20,0,0.00,0.00,0.00,0.00,0.00,379.00,6.96,14.22,379.00,26.23,57.69,379,24.90,50.69,0.00,-20.34,-47.60,0.00,-17.94,-36.47,0.00,22.46,17.49,0.00,27.95,28.05,NULL,0,0.00,0.00,0,0.00,0.00,28,0.00,0.00,0.00,0.00,0.00,0.00,0,0.00,0.00,0,0.36,1.02,0,0.00,0.00,0,0.36,1.02);

--
-- Table structure for table `tbl_financial_bk`
--

DROP TABLE IF EXISTS tbl_financial_bk;

CREATE TABLE tbl_financial_bk (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  MONTHS_YEAR varchar(125) NOT NULL,
  REV_EAR_CASH_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_TARGET integer DEFAULT NULL,
  REV_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TEST_CAL_SERVICES_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_MON decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_MON decimal(28,2) DEFAULT NULL,
  SNO integer NOT NULL DEFAULT '0'
);


--
-- Dumping data for table `tbl_financial_bk`
--


--
-- Table structure for table `tbl_financial_bk1`
--

DROP TABLE IF EXISTS tbl_financial_bk1;

CREATE TABLE tbl_financial_bk1 (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  MONTHS_YEAR varchar(125) NOT NULL,
  REV_EAR_CASH_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_TARGET integer DEFAULT NULL,
  REV_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TEST_CAL_SERVICES_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_MON decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_MON decimal(28,2) DEFAULT NULL,
  SNO integer NOT NULL DEFAULT '0'
);


--
-- Dumping data for table `tbl_financial_bk1`
--


--
-- Table structure for table `tbl_financial_copy`
--

DROP TABLE IF EXISTS tbl_financial_copy;

CREATE TABLE tbl_financial_copy (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  MONTHS_YEAR varchar(125) NOT NULL,
  REV_EAR_CASH_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_TARGET integer DEFAULT NULL,
  REV_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  REV_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_CASH_CUM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  INC_EXP_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_CASH_CUM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_TARGET decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_DTM decimal(28,2) DEFAULT NULL,
  PER_REC_ACCRUAL_CUM decimal(28,2) DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TEST_CAL_SERVICES_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_MON decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_TARGET integer DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_DTM decimal(28,2) DEFAULT NULL,
  TEST_CAL_SERVICES_ACC_MON decimal(28,2) DEFAULT NULL,
  SNO integer NOT NULL DEFAULT '0',
  REV_EAR_CSH_BAS_CONSULT_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_CSH_BAS_CONSULT_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CSH_BAS_CONSULT_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCL_BAS_CONSULT_TARGET decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCL_BAS_CONSULT_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCL_BAS_CONSULT_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_TARGET integer DEFAULT '0',
  REV_EAR_CASH_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_CASH_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT '0.00',
  REV_EAR_CASH_PRDTN_OTHERJOB_TARGET integer DEFAULT '0',
  REV_EAR_CASH_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_CASH_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_TOOLING_TARGET integer DEFAULT '0',
  REV_EAR_ACCRUAL_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_TARGET integer DEFAULT '0',
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT '0.00',
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT '0.00'
);


--
-- Dumping data for table `tbl_financial_copy`
--


--
-- Table structure for table `tbl_financial_mpr`
--

DROP TABLE IF EXISTS tbl_financial_mpr;

CREATE TABLE tbl_financial_mpr (
  rev_ear_csh_bas_trng_target decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_trng_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_trng_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_trng_cumu_annu decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_prdn_target decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_prdn_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_prdn_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_prdn_cumu_annu decimal(10,2) DEFAULT NULL,
  test_cal_services_target decimal(10,2) DEFAULT NULL,
  test_cal_services_dtm decimal(10,2) DEFAULT NULL,
  test_cal_services_mon decimal(10,2) DEFAULT NULL,
  test_cal_services_annu decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_misc_target decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_misc_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_misc_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_misc_cumu_annu decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_total_target decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_total_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_total_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_csh_bas_total_cumu_annu decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_trng_target decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_trng_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_trng_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_trng_cumu_annu decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_prdn_target decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_prdn_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_prdn_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_prdn_cumu_annu decimal(10,2) DEFAULT NULL,
  test_cal_services_acc_target decimal(10,2) DEFAULT NULL,
  test_cal_services_acc_dtm decimal(10,2) DEFAULT NULL,
  test_cal_services_acc_mon decimal(10,2) DEFAULT NULL,
  test_cal_services_acc_annu decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_misc_target decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_misc_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_misc_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_misc_cumu_annu decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_total_target decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_total_dtm decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_total_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_ear_accl_bas_total_cumu_annu decimal(10,2) DEFAULT NULL,
  rev_exp_cash_bas_target decimal(10,2) DEFAULT NULL,
  rev_exp_cash_bas_dtm decimal(10,2) DEFAULT NULL,
  rev_exp_cash_bas_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_exp_cash_bas_cumu_annu decimal(10,2) DEFAULT NULL,
  rev_exp_accl_bas_target decimal(10,2) DEFAULT NULL,
  rev_exp_accl_bas_dtm decimal(10,2) DEFAULT NULL,
  rev_exp_accl_bas_cumu_mon decimal(10,2) DEFAULT NULL,
  rev_exp_accl_bas_cumu_annu decimal(10,2) DEFAULT NULL,
  exc_exp_cash_bas_target decimal(10,2) DEFAULT NULL,
  exc_exp_cash_bas_dtm decimal(10,2) DEFAULT NULL,
  exc_exp_cash_bas_cumu_mon decimal(10,2) DEFAULT NULL,
  exc_exp_cash_bas_cumu_annu decimal(10,2) DEFAULT NULL,
  exc_exp_accl_bas_target decimal(10,2) DEFAULT NULL,
  exc_exp_accl_bas_dtm decimal(10,2) DEFAULT NULL,
  exc_exp_accl_bas_cumu_mon decimal(10,2) DEFAULT NULL,
  exc_exp_accl_bas_cumu_annu decimal(10,2) DEFAULT NULL,
  per_rec_cash_bas_target decimal(10,2) DEFAULT NULL,
  per_rec_cash_bas_dtm decimal(10,2) DEFAULT NULL,
  per_rec_cash_bas_cumu_mon decimal(10,2) DEFAULT NULL,
  per_rec_cash_bas_cumu_annu decimal(10,2) DEFAULT NULL,
  per_rec_accl_bas_target decimal(10,2) DEFAULT NULL,
  per_rec_accl_bas_dtm decimal(10,2) DEFAULT NULL,
  per_rec_accl_bas_cumu_mon decimal(10,2) DEFAULT NULL,
  per_rec_accl_bas_cumu_annu decimal(10,2) DEFAULT NULL,
  INST_ID varchar(45) NOT NULL,
  months varchar(45) NOT NULL,
  years integer NOT NULL,
  months_year date NOT NULL,
  PRIMARY KEY (INST_ID)
);


--
-- Dumping data for table `tbl_financial_mpr`
--


--
-- Table structure for table `tbl_financial_old_19july2010`
--

DROP TABLE IF EXISTS tbl_financial_old_19july2010;

CREATE TABLE tbl_financial_old_19july2010 (
  INST_ID char(10) DEFAULT NULL,
  MONTHS char(20) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  MONTHS_YEAR date DEFAULT NULL,
  REV_EAR_CASH_TRNG_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_TRNG_DTM integer DEFAULT NULL,
  REV_EAR_CASH_TRNG_CUM integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_DTM integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_CUM integer DEFAULT NULL,
  REV_EAR_CASH_MISC_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_MISC_DTM integer DEFAULT NULL,
  REV_EAR_CASH_MISC_CUM integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_DTM integer DEFAULT NULL,
  REV_EAR_CASH_TOTAL_CUM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_DTM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_TRNG_CUM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_DTM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_CUM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_DTM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_MISC_CUM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_DTM integer DEFAULT NULL,
  REV_EAR_ACCRUAL_TOTAL_CUM integer DEFAULT NULL,
  REV_EXP_CASH_TARGET integer DEFAULT NULL,
  REV_EXP_CASH_DTM integer DEFAULT NULL,
  REV_EXP_CASH_CUM integer DEFAULT NULL,
  REV_EXP_ACCRUAL_TARGET integer DEFAULT NULL,
  REV_EXP_ACCRUAL_DTM integer DEFAULT NULL,
  REV_EXP_ACCRUAL_CUM integer DEFAULT NULL,
  INC_EXP_CASH_TARGET integer DEFAULT NULL,
  INC_EXP_CASH_DTM integer DEFAULT NULL,
  INC_EXP_CASH_CUM integer DEFAULT NULL,
  INC_EXP_ACCRUAL_TARGET integer DEFAULT NULL,
  INC_EXP_ACCRUAL_DTM integer DEFAULT NULL,
  INC_EXP_ACCRUAL_CUM integer DEFAULT NULL,
  PER_REC_CASH_TARGET integer DEFAULT NULL,
  PER_REC_CASH_DTM integer DEFAULT NULL,
  PER_REC_CASH_CUM integer DEFAULT NULL,
  PER_REC_ACCRUAL_TARGET integer DEFAULT NULL,
  PER_REC_ACCRUAL_DTM integer DEFAULT NULL,
  PER_REC_ACCRUAL_CUM integer DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL
);


--
-- Dumping data for table `tbl_financial_old_19july2010`
--


--
-- Table structure for table `tbl_industrial_profile`
--

DROP TABLE IF EXISTS tbl_industrial_profile;

CREATE TABLE tbl_industrial_profile (
  fileName varchar(245) NOT NULL,
  State varchar(245) DEFAULT NULL,
  Msmedi varchar(245) DEFAULT NULL,
  District varchar(245) DEFAULT NULL,
  PRIMARY KEY (fileName)
);


--
-- Dumping data for table `tbl_industrial_profile`
--


--
-- Table structure for table `tbl_ip_registry`
--

DROP TABLE IF EXISTS tbl_ip_registry;

CREATE TABLE tbl_ip_registry (
  ROLE char(3) DEFAULT NULL,
  DATE_OF_VISITING date DEFAULT NULL,
  USER_ID char(20) DEFAULT NULL,
  IP_ADDRESS char(20) DEFAULT NULL
);


--
-- Dumping data for table `tbl_ip_registry`
--


--
-- Table structure for table `tbl_iso`
--

DROP TABLE IF EXISTS tbl_iso;

CREATE TABLE tbl_iso (
  CURRDATE date DEFAULT NULL,
  NAME_O_UNIT char(100) DEFAULT NULL,
  CHAN_PROPRI char(100) DEFAULT NULL,
  LOC_UNIT char(100) DEFAULT NULL,
  COR_OFF_ADDR char(100) DEFAULT NULL,
  CON_TEL_NO char(100) DEFAULT NULL,
  CON_FAX_NO char(100) DEFAULT NULL,
  CON_EMAIL char(100) DEFAULT NULL,
  CON_WEB_ADD char(100) DEFAULT NULL,
  TYPE_OF_UNIT char(100) DEFAULT NULL,
  SIZE_UNIT char(100) DEFAULT NULL,
  MANU_DETAILS char(100) DEFAULT NULL,
  PRO_RD_ACT char(98) DEFAULT NULL,
  PRO_TEST_LAB char(100) DEFAULT NULL,
  PRO_SAL_SER char(100) DEFAULT NULL,
  TURN_OVER char(100) DEFAULT NULL,
  PROFIT char(100) DEFAULT NULL,
  MAN_DETAILS char(100) DEFAULT NULL,
  MARK_DOS_INTER char(100) DEFAULT NULL,
  EM_NO_DETAILS char(100) DEFAULT NULL,
  TYPE_ISO char(100) DEFAULT NULL,
  DATE_IMP_ISO char(100) DEFAULT NULL,
  CURR_STAT char(100) DEFAULT NULL,
  SUBSIDY char(100) DEFAULT NULL,
  CATEGORY char(100) DEFAULT NULL,
  DETAILS_OF_INTER_ST char(100) DEFAULT NULL,
  BRAND_ADOP char(100) DEFAULT NULL,
  OTHER_INFO char(100) DEFAULT NULL,
  ISO_CODE integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_iso`
--


--
-- Table structure for table `tbl_iso_mapping`
--

DROP TABLE IF EXISTS tbl_iso_mapping;

CREATE TABLE tbl_iso_mapping (
  USER_ID char(25) DEFAULT NULL,
  INST_ID char(25) DEFAULT NULL,
  TR_CAT_ID integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_iso_mapping`
--


--
-- Table structure for table `tbl_isotarget`
--

DROP TABLE IF EXISTS tbl_isotarget;

CREATE TABLE tbl_isotarget (
  sno integer NOT NULL ,
  Iso_gen varchar(45) NOT NULL,
  Iso_ner varchar(45) NOT NULL,
  Iso_scp varchar(45) NOT NULL,
  Iso_tsp varchar(45) NOT NULL,
  Iso_wom varchar(45) NOT NULL,
  inst_id varchar(45) NOT NULL,
  smallint varchar(45) NOT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_isotarget`
--


--
-- Table structure for table `tbl_judical_detail`
--

DROP TABLE IF EXISTS tbl_judical_detail;

CREATE TABLE tbl_judical_detail (
  sno integer NOT NULL ,
  Serial_number varchar(245) NOT NULL,
  Detail_of_case varchar(245) NOT NULL,
  date_of_entry date NOT NULL,
  stakes_involved varchar(245) NOT NULL,
  status varchar(245) NOT NULL,
  Detail_of_application varchar(245) NOT NULL,
  Present_status_of_the_case varchar(245) NOT NULL,
  months varchar(45) NOT NULL,
  smallint integer NOT NULL,
  INST_ID varchar(45) NOT NULL,
  nature_of_court varchar(145) NOT NULL,
  Controlling_Officers varchar(145) NOT NULL,
  date_of_next_hearing date NOT NULL,
  expected_date_of_filing date NOT NULL,
  Affidavit_date_of_filing_CA date NOT NULL,
  cases_related_to varchar(45) NOT NULL,
  year_of_case integer NOT NULL,
  status_of_case varchar(145) NOT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_judical_detail`
--


--
-- Table structure for table `tbl_library`
--

DROP TABLE IF EXISTS tbl_library;

CREATE TABLE tbl_library (
  sno integer NOT NULL ,
  Inst_id varchar(45) NOT NULL,
  months varchar(45) NOT NULL,
  smallint varchar(45) NOT NULL,
  AMC_of_pc1 integer DEFAULT NULL,
  AMC_of_pc2 integer DEFAULT NULL,
  AMC_of_pc integer DEFAULT NULL,
  br_hardware_target integer DEFAULT '0',
  br_hardware_tomonth integer DEFAULT '0',
  br_hardware_upto integer DEFAULT '0',
  br_hardware_target_1 integer DEFAULT '0',
  br_hardware_tomonth_1 integer DEFAULT '0',
  br_hardware_upto_1 integer DEFAULT '0',
  br_hardware_target_2 integer DEFAULT '0',
  br_hardware_tomonth_2 integer DEFAULT '0',
  br_hardware_upto_2 integer DEFAULT '0',
  br_hardware_target_3 integer DEFAULT '0',
  br_hardware_tomonth_3 integer DEFAULT '0',
  br_hardware_upto_3 integer DEFAULT '0',
  br_hardware_target_4 integer DEFAULT '0',
  br_hardware_tomonth_4 integer DEFAULT '0',
  br_hardware_upto_4 integer DEFAULT '0',
  br_hardware_target_5 integer DEFAULT '0',
  br_hardware_tomonth_5 integer DEFAULT '0',
  br_hardware_upto_5 integer DEFAULT '0',
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_library`
--


--
-- Table structure for table `tbl_lofin_detail`
--

DROP TABLE IF EXISTS tbl_lofin_detail;

CREATE TABLE tbl_lofin_detail (
  sno integer NOT NULL ,
  Name varchar(145) NOT NULL,
  cmbIns varchar(145) NOT NULL,
  role varchar(145) NOT NULL,
  IP_ADDRESS varchar(145) NOT NULL,
  Datetim varchar(45) DEFAULT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_lofin_detail`
--

INSERT INTO tbl_lofin_detail VALUES (1,'ANIL','SU','SU','106.221.238.254','Wed May 21 17:55:08 IST 2025'),(2,'Vineet','SU','SU','165.225.124.104','Fri May 23 15:26:04 IST 2025'),(3,'TC-Bhiwadi','I1','IU','165.225.124.118','Mon May 26 10:00:42 IST 2025'),(4,'VINEET','SU','SU','165.225.124.118','Mon May 26 10:07:19 IST 2025'),(5,'TC-Bhiwadi','I1','IU','165.225.124.118','Mon May 26 10:53:47 IST 2025'),(6,'TC-Bhiwadi','I1','IU','136.226.251.90','Tue May 27 15:20:59 IST 2025'),(7,'TC-Grnoida','I9','IU','59.178.171.254','Tue May 27 17:44:45 IST 2025'),(8,'TC-Bhopal','I91','IU','117.254.215.17','Tue May 27 18:09:18 IST 2025'),(9,'TC-Bhiwadi','I1','IU','117.251.98.146','Tue May 27 19:21:16 IST 2025'),(10,'TC-Bhiwadi','I1','IU','117.251.98.146','Wed May 28 09:04:46 IST 2025'),(11,'TC-Baddi','I3','IU','59.178.192.139','Wed May 28 09:25:06 IST 2025'),(12,'TC-Bhiwadi','I1','IU','117.251.98.146','Wed May 28 10:03:11 IST 2025'),(13,'TC-Bhiwadi','I1','IU','117.251.98.146','Wed May 28 12:37:34 IST 2025'),(14,'TC-Sitarganj','I4','IU','117.208.162.29','Wed May 28 14:06:44 IST 2025'),(15,'TC-Durg','I6','IU','117.240.175.254','Wed May 28 14:24:11 IST 2025'),(16,'TC-Durg','I6','IU','117.240.175.254','Wed May 28 14:55:20 IST 2025'),(17,'TC-Bangalore','I93','IU','106.216.234.145','Wed May 28 16:14:07 IST 2025'),(18,'TC-Durg','I6','IU','117.240.175.254','Wed May 28 16:14:39 IST 2025'),(19,'TC-Puducherry','I5','IU','117.236.229.35','Wed May 28 16:23:06 IST 2025'),(20,'Tc-Imphal','I8','IU','49.47.141.225','Wed May 28 16:46:03 IST 2025'),(21,'TC-Durg','I6','IU','117.198.246.71','Thu May 29 10:14:37 IST 2025'),(22,'TC-Durg','I6','IU','117.240.175.254','Thu May 29 10:32:35 IST 2025'),(23,'TC-Rohtak','I2','IU','117.251.78.2','Thu May 29 15:05:48 IST 2025'),(24,'TC-Rohtak','I2','IU','117.251.78.2','Thu May 29 15:09:45 IST 2025'),(25,'TC-Rohtak','I2','IU','117.251.78.2','Thu May 29 15:27:10 IST 2025'),(26,'TC-Rohtak','I2','IU','117.251.78.2','Thu May 29 15:37:59 IST 2025'),(27,'TC-Rohtak','I2','IU','117.251.78.2','Thu May 29 15:53:01 IST 2025'),(28,'TC-Bhiwadi','I1','IU','117.251.98.146','Thu May 29 16:08:59 IST 2025'),(29,'TC-Bhiwadi','I1','IU','117.251.98.146','Fri May 30 09:00:57 IST 2025'),(30,'TC-Grnoida','I9','IU','106.219.160.56','Fri May 30 10:16:18 IST 2025'),(31,'TC-Bhiwadi','I1','IU','117.251.98.146','Fri May 30 10:22:22 IST 2025'),(32,'admin','SU','SU','10.195.0.248','Fri May 30 10:41:05 IST 2025'),(33,'admin','SU','SU','10.195.0.248','Fri May 30 10:54:55 IST 2025'),(34,'admin','SU','SU','10.195.0.248','Fri May 30 11:01:48 IST 2025'),(35,'TC-Rohtak','I2','IU','117.251.78.2','Fri May 30 11:22:55 IST 2025'),(36,'TC-Grnoida','I9','IU','106.219.160.56','Fri May 30 12:35:11 IST 2025'),(37,'TC-Grnoida','I9','IU','106.219.160.56','Fri May 30 14:30:15 IST 2025'),(38,'TC-Grnoida','I9','IU','106.219.160.56','Fri May 30 14:45:17 IST 2025'),(39,'TC-Bangalore','I93','IU','223.181.108.100','Fri May 30 15:42:31 IST 2025'),(40,'TC-Bhiwadi','I1','IU','117.251.98.146','Fri May 30 16:10:25 IST 2025'),(41,'TC-Grnoida','I9','IU','106.219.160.56','Fri May 30 17:39:58 IST 2025'),(42,'TC-Bangalore','I93','IU','117.242.249.6','Fri May 30 18:37:58 IST 2025'),(43,'TC-Grnoida','I9','IU','106.219.160.56','Fri May 30 18:53:38 IST 2025'),(44,'TC-Bhopal','I91','IU','117.254.215.17','Sat May 31 09:21:33 IST 2025'),(45,'TC-Bangalore','I93','IU','223.181.108.100','Sat May 31 09:46:37 IST 2025'),(46,'TC-Grnoida','I9','IU','59.178.161.89','Sat May 31 14:41:04 IST 2025'),(47,'TC-Sitarganj','I4','IU','117.208.166.223','Sat May 31 14:44:17 IST 2025'),(48,'TC-Bhopal','I91','IU','117.254.215.17','Sat May 31 15:20:49 IST 2025'),(49,'TC-Sitarganj','I4','IU','117.208.166.223','Sat May 31 16:05:44 IST 2025'),(50,'TC-Bhopal','I91','IU','117.254.215.17','Sat May 31 16:30:22 IST 2025'),(51,'TC-Rohtak','I2','IU','223.187.97.35','Sat May 31 16:54:50 IST 2025'),(52,'TC-Grnoida','I9','IU','59.178.164.125','Sat May 31 17:50:57 IST 2025'),(53,'TC-Bangalore','I93','IU','117.196.248.143','Mon Jun 02 10:13:49 IST 2025'),(54,'TC-Bangalore','I93','IU','106.216.229.243','Mon Jun 02 11:58:26 IST 2025'),(55,'TC-Bangalore','I93','IU','223.181.109.182','Mon Jun 02 13:46:19 IST 2025'),(56,'TC-Bangalore','I93','IU','223.181.109.182','Mon Jun 02 14:07:04 IST 2025'),(57,'TC-Bangalore','I93','IU','117.242.249.168','Mon Jun 02 15:43:08 IST 2025'),(58,'TC-Bangalore','I93','IU','223.181.110.207','Tue Jun 03 11:14:02 IST 2025'),(59,'TC-Durg','I6','IU','117.240.175.236','Tue Jun 03 12:12:32 IST 2025'),(60,'TC-Bangalore','I93','IU','223.181.110.207','Tue Jun 03 13:56:29 IST 2025'),(61,'TC-Durg','I6','IU','117.240.175.236','Tue Jun 03 15:31:29 IST 2025'),(62,'TC-Bhiwadi','I1','IU','117.251.98.146','Tue Jun 03 18:39:29 IST 2025'),(63,'TC-Bhiwadi','I1','IU','117.251.98.146','Tue Jun 03 19:03:08 IST 2025'),(64,'TC-Bangalore','I93','IU','223.181.108.164','Tue Jun 03 19:52:58 IST 2025'),(65,'TC-Bangalore','I93','IU','223.181.108.164','Tue Jun 03 20:23:24 IST 2025'),(66,'TC-Rohtak','I2','IU','117.251.78.2','Wed Jun 04 10:19:12 IST 2025'),(67,'TC-Bangalore','I93','IU','223.181.108.164','Wed Jun 04 11:35:52 IST 2025'),(68,'TC-Rohtak','I2','IU','117.251.78.2','Thu Jun 05 10:57:16 IST 2025'),(69,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 05 11:18:07 IST 2025'),(70,'TC-Grnoida','I9','IU','59.178.161.211','Thu Jun 05 11:49:20 IST 2025'),(71,'TC-Rohtak','I2','IU','117.251.78.2','Thu Jun 05 11:57:11 IST 2025'),(72,'TC-Rohtak','I2','IU','117.251.78.2','Thu Jun 05 12:09:51 IST 2025'),(73,'Vineet','SU','SU','136.226.230.186','Thu Jun 05 12:15:19 IST 2025'),(74,'Vineet','SU','SU','136.226.230.186','Thu Jun 05 12:46:19 IST 2025'),(75,'Vineet','SU','SU','136.226.230.186','Thu Jun 05 13:58:12 IST 2025'),(76,'TC-Grnoida','I9','IU','59.178.164.40','Thu Jun 05 14:19:27 IST 2025'),(77,'Vineet','SU','SU','136.226.251.88','Thu Jun 05 14:31:23 IST 2025'),(78,'TC-Bhiwadi','I1','IU','117.251.98.146','Thu Jun 05 14:41:06 IST 2025'),(79,'TC-Puducherry','I5','IU','61.2.57.157','Thu Jun 05 15:07:23 IST 2025'),(80,'TC-Grnoida','I9','IU','59.178.164.40','Thu Jun 05 15:38:22 IST 2025'),(81,'TC-Grnoida','I9','IU','59.178.164.40','Thu Jun 05 17:10:18 IST 2025'),(82,'TC-Puducherry','I5','IU','61.2.57.157','Thu Jun 05 17:28:03 IST 2025'),(83,'TC-Grnoida','I9','IU','59.178.164.40','Thu Jun 05 18:14:21 IST 2025'),(84,'TC-Puducherry','I5','IU','61.2.57.157','Thu Jun 05 18:38:00 IST 2025'),(85,'TC-Grnoida','I9','IU','59.178.164.40','Fri Jun 06 09:44:53 IST 2025'),(86,'TC-Grnoida','I9','IU','59.178.164.40','Fri Jun 06 10:39:41 IST 2025'),(87,'TC-Puducherry','I5','IU','120.56.167.132','Fri Jun 06 10:46:51 IST 2025'),(88,'TC-Grnoida','I9','IU','59.178.164.40','Fri Jun 06 11:35:30 IST 2025'),(89,'TC-Grnoida','I9','IU','59.178.164.40','Fri Jun 06 12:05:29 IST 2025'),(90,'Vineet','SU','SU','136.226.230.184','Fri Jun 06 12:52:25 IST 2025'),(91,'TC-Grnoida','I9','IU','59.178.161.203','Fri Jun 06 17:23:42 IST 2025'),(92,'TC-Puducherry','I5','IU','117.236.229.35','Fri Jun 06 17:32:04 IST 2025'),(93,'TC-Puducherry','I5','IU','117.236.229.35','Fri Jun 06 18:39:07 IST 2025'),(94,'TC-Puducherry','I5','IU','117.236.229.35','Fri Jun 06 20:10:37 IST 2025'),(95,'TC-Baddi','I3','IU','59.178.62.66','Mon Jun 09 13:27:45 IST 2025'),(96,'Vineet','SU','SU','136.226.251.98','Mon Jun 09 14:15:07 IST 2025'),(97,'Vineet','SU','SU','136.226.251.117','Mon Jun 09 14:46:23 IST 2025'),(98,'TC-Durg','I6','IU','117.240.175.236','Mon Jun 09 15:19:24 IST 2025'),(99,'TC-Durg','I6','IU','117.240.175.236','Mon Jun 09 15:26:09 IST 2025'),(100,'TC-Bangalore','I93','IU','223.185.132.126','Mon Jun 09 15:27:52 IST 2025'),(101,'TC-Durg','I6','IU','59.96.46.68','Mon Jun 09 17:23:18 IST 2025'),(102,'TC-Bangalore','I93','IU','223.185.132.126','Mon Jun 09 22:46:54 IST 2025'),(103,'TC-Durg','I6','IU','59.96.46.68','Tue Jun 10 09:04:33 IST 2025'),(104,'TC-Durg','I6','IU','117.240.175.236','Tue Jun 10 12:41:05 IST 2025'),(105,'Vineet','SU','SU','136.226.230.202','Tue Jun 10 13:42:19 IST 2025'),(106,'TC-Durg','I6','IU','117.240.175.236','Tue Jun 10 13:47:49 IST 2025'),(107,'Vineet','SU','SU','136.226.230.202','Tue Jun 10 13:49:58 IST 2025'),(108,'TC-Durg','I6','IU','117.223.230.241','Tue Jun 10 15:30:19 IST 2025'),(109,'TC-Grnoida','I9','IU','59.178.165.23','Wed Jun 11 09:16:16 IST 2025'),(110,'Vineet','SU','SU','136.226.250.85','Wed Jun 11 10:11:16 IST 2025'),(111,'TC-Puducherry','I5','IU','120.56.218.40','Wed Jun 11 10:18:21 IST 2025'),(112,'TC-Grnoida','I9','IU','59.178.165.23','Wed Jun 11 10:28:27 IST 2025'),(113,'TC-Grnoida','I9','IU','59.178.165.23','Wed Jun 11 10:36:59 IST 2025'),(114,'TC-Bangalore','I93','IU','223.185.132.126','Wed Jun 11 10:37:57 IST 2025'),(115,'TC-Grnoida','I9','IU','59.178.165.23','Wed Jun 11 11:47:55 IST 2025'),(116,'TC-Kanpur','I92','IU','117.208.77.98','Wed Jun 11 12:09:54 IST 2025'),(117,'TC-Bangalore','I93','IU','223.185.132.126','Wed Jun 11 12:30:28 IST 2025'),(118,'TC-Kanpur','I92','IU','117.208.77.98','Wed Jun 11 12:30:29 IST 2025'),(119,'Vineet','SU','SU','165.225.124.94','Wed Jun 11 12:42:59 IST 2025'),(120,'TC-Kanpur','I92','IU','117.208.77.98','Wed Jun 11 13:58:41 IST 2025'),(121,'Vineet','SU','SU','165.225.124.94','Wed Jun 11 14:05:35 IST 2025'),(122,'TC-Patna','I94','IU','152.58.188.208','Wed Jun 11 14:22:09 IST 2025'),(123,'TC-Patna','I94','IU','152.58.188.9','Wed Jun 11 15:05:34 IST 2025'),(124,'TC-Patna','I94','IU','152.58.186.246','Wed Jun 11 15:12:27 IST 2025'),(125,'Vineet','SU','SU','165.225.124.94','Wed Jun 11 16:22:49 IST 2025'),(126,'TC-Patna','I94','IU','152.58.188.135','Wed Jun 11 16:26:49 IST 2025'),(127,'TC-Kanpur','I92','IU','117.208.77.98','Wed Jun 11 16:42:11 IST 2025'),(128,'Vineet','SU','SU','165.225.124.94','Wed Jun 11 17:30:54 IST 2025'),(129,'TC-Kanpur','I92','IU','59.89.140.197','Thu Jun 12 09:02:29 IST 2025'),(130,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 12 09:09:37 IST 2025'),(131,'TC-Puducherry','I5','IU','117.236.229.35','Thu Jun 12 09:24:50 IST 2025'),(132,'Vineet','SU','SU','136.226.250.85','Thu Jun 12 09:37:26 IST 2025'),(133,'TC-Puducherry','I5','IU','117.236.229.35','Thu Jun 12 09:46:19 IST 2025'),(134,'Vineet','SU','SU','136.226.250.85','Thu Jun 12 10:29:18 IST 2025'),(135,'TC-Visakhapatnam','I7','IU','136.226.230.187','Thu Jun 12 10:38:35 IST 2025'),(136,'Vineet','SU','SU','10.195.0.206','Thu Jun 12 10:44:33 IST 2025'),(137,'TC-KANPUR','I92','IU','59.89.140.197','Thu Jun 12 10:48:29 IST 2025'),(138,'TC-Puducherry','I5','IU','117.236.229.35','Thu Jun 12 10:50:12 IST 2025'),(139,'Vineet','SU','SU','136.226.250.97','Thu Jun 12 10:51:59 IST 2025'),(140,'Vineet','SU','SU','136.226.250.85','Thu Jun 12 11:16:38 IST 2025'),(141,'TC-Visakhapatnam','I7','IU','10.195.0.249','Thu Jun 12 11:17:29 IST 2025'),(142,'TC-Visakhapatnam','I7','IU','10.195.0.249','Thu Jun 12 11:32:28 IST 2025'),(143,'TC-Visakhapatnam','I7','IU','117.196.243.83','Thu Jun 12 11:34:17 IST 2025'),(144,'Anil','SU','SU','10.195.1.39','Thu Jun 12 11:35:25 IST 2025'),(145,'TC-Visakhapatnam','I7','IU','117.196.243.83','Thu Jun 12 11:37:07 IST 2025'),(146,'TC-Puducherry','I5','IU','117.236.229.35','Thu Jun 12 11:49:39 IST 2025'),(147,'Vineet','SU','SU','136.226.250.85','Thu Jun 12 11:50:18 IST 2025'),(148,'TC-Puducherry','I5','IU','120.56.101.223','Thu Jun 12 12:33:49 IST 2025'),(149,'TC-Visakhapatnam','I7','IU','117.196.243.83','Thu Jun 12 12:36:41 IST 2025'),(150,'TC-Puducherry','I5','IU','120.56.101.223','Thu Jun 12 12:48:16 IST 2025'),(151,'Vineet','SU','SU','136.226.250.85','Thu Jun 12 14:30:06 IST 2025'),(152,'TC-Puducherry','I5','IU','120.56.101.223','Thu Jun 12 14:42:49 IST 2025'),(153,'vineet','SU','SU','136.226.250.108','Thu Jun 12 14:47:56 IST 2025'),(154,'Anil','SU','SU','10.195.1.39','Thu Jun 12 16:45:16 IST 2025'),(155,'TC-Visakhapatnam','I7','IU','117.196.243.83','Thu Jun 12 16:58:35 IST 2025'),(156,'TC-Visakhapatnam','I7','IU','117.196.243.83','Thu Jun 12 17:30:04 IST 2025'),(157,'TC-Visakhapatnam','I7','IU','117.196.243.83','Thu Jun 12 17:44:35 IST 2025'),(158,'Vineet','SU','SU','223.228.220.209','Thu Jun 12 20:37:06 IST 2025'),(159,'Vineet','SU','SU','165.225.124.83','Fri Jun 13 08:56:41 IST 2025'),(160,'Anil','SU','SU','10.195.1.39','Fri Jun 13 09:37:39 IST 2025'),(161,'vineet','SU','SU','165.225.124.113','Fri Jun 13 12:11:33 IST 2025'),(162,'TC-Visakhapatnam','I7','IU','117.196.243.83','Fri Jun 13 13:40:56 IST 2025'),(163,'Anil','SU','SU','10.195.1.39','Fri Jun 13 14:29:48 IST 2025'),(164,'TC-Visakhapatnam','I7','IU','117.196.243.83','Fri Jun 13 17:00:41 IST 2025'),(165,'vineet','SU','SU','136.226.250.85','Fri Jun 13 17:02:11 IST 2025'),(166,'TC-Bangalore','I93','IU','223.185.132.126','Fri Jun 13 17:22:46 IST 2025'),(167,'TC-Bangalore','I93','IU','223.185.132.126','Fri Jun 13 17:27:35 IST 2025'),(168,'TC-Bangalore','I93','IU','223.185.132.126','Fri Jun 13 17:28:25 IST 2025'),(169,'TC-Bangalore','I93','IU','223.185.132.126','Fri Jun 13 17:28:40 IST 2025'),(170,'TC-Visakhapatnam','I7','IU','117.196.243.83','Fri Jun 13 17:45:59 IST 2025'),(171,'TC-Durg','I6','IU','117.240.175.236','Sat Jun 14 10:12:58 IST 2025'),(172,'Vineet','SU','SU','136.226.230.193','Mon Jun 16 08:29:40 IST 2025'),(173,'TC-Durg','I6','IU','117.240.175.236','Mon Jun 16 09:28:34 IST 2025'),(174,'vineet','SU','SU','136.226.230.187','Mon Jun 16 10:14:20 IST 2025'),(175,'Anil','SU','SU','10.195.0.206','Mon Jun 16 12:10:34 IST 2025'),(176,'vineet','SU','SU','136.226.230.187','Mon Jun 16 14:30:40 IST 2025'),(177,'Anil','SU','SU','10.195.0.206','Mon Jun 16 15:48:33 IST 2025'),(178,'TC-Bangalore','I93','IU','223.181.107.232','Mon Jun 16 15:57:19 IST 2025'),(179,'TC-Bangalore','I93','IU','223.181.107.232','Mon Jun 16 16:02:04 IST 2025'),(180,'Vineet','SU','SU','136.226.230.193','Mon Jun 16 16:31:07 IST 2025'),(181,'TC-Bangalore','I93','IU','223.181.107.232','Tue Jun 17 10:02:29 IST 2025'),(182,'TC-Bangalore','I93','IU','223.181.107.232','Tue Jun 17 10:04:44 IST 2025'),(183,'Vineet','SU','SU','165.225.124.83','Tue Jun 17 10:12:58 IST 2025'),(184,'TC-Bangalore','I93','IU','223.181.107.232','Tue Jun 17 10:24:56 IST 2025'),(185,'TC-Bangalore','I93','IU','49.37.170.79','Tue Jun 17 10:32:26 IST 2025'),(186,'TC-Durg','I6','IU','117.240.175.236','Tue Jun 17 11:00:28 IST 2025'),(187,'vineet','SU','SU','106.221.235.63','Tue Jun 17 14:16:58 IST 2025'),(188,'TC-Bhiwadi','I1','IU','117.251.98.146','Tue Jun 17 16:04:07 IST 2025'),(189,'vineet','SU','SU','165.225.124.76','Tue Jun 17 16:12:32 IST 2025'),(190,'vineet','SU','SU','165.225.124.100','Tue Jun 17 16:15:29 IST 2025'),(191,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 09:01:00 IST 2025'),(192,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 10:42:17 IST 2025'),(193,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 11:57:58 IST 2025'),(194,'TC-Durg','I6','IU','59.96.37.71','Wed Jun 18 12:34:36 IST 2025'),(195,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 13:42:52 IST 2025'),(196,'TC-Rohtak','I2','IU','117.251.78.2','Wed Jun 18 14:15:10 IST 2025'),(197,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 14:19:55 IST 2025'),(198,'TC-Durg','I6','IU','10.195.0.248','Wed Jun 18 14:51:05 IST 2025'),(199,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 15:12:02 IST 2025'),(200,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 16:01:25 IST 2025'),(201,'admin','SU','SU','10.195.0.248','Wed Jun 18 16:57:27 IST 2025'),(202,'VINEET','SU','SU','10.195.0.248','Wed Jun 18 16:59:04 IST 2025'),(203,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 17:01:12 IST 2025'),(204,'TC-Durg','I6','IU','117.240.175.236','Wed Jun 18 17:14:57 IST 2025'),(205,'Vineet','SU','SU','165.225.124.79','Wed Jun 18 17:31:12 IST 2025'),(206,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 09:16:13 IST 2025'),(207,'TC-Bangalore','I93','IU','117.192.42.28','Thu Jun 19 09:58:18 IST 2025'),(208,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 09:59:01 IST 2025'),(209,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 10:32:36 IST 2025'),(210,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 10:47:45 IST 2025'),(211,'TC-Bangalore','I93','IU','117.192.42.28','Thu Jun 19 10:51:54 IST 2025'),(212,'TC-Grnoida','I9','IU','59.89.103.112','Thu Jun 19 11:00:33 IST 2025'),(213,'TC-Bhiwadi','I1','IU','117.251.98.146','Thu Jun 19 11:39:45 IST 2025'),(214,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 12:01:09 IST 2025'),(215,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 12:05:27 IST 2025'),(216,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 13:42:02 IST 2025'),(217,'TC-Durg','I6','IU','117.240.175.236','Thu Jun 19 14:23:39 IST 2025'),(218,'Tc-bhopal','I91','IU','136.226.250.124','Thu Jun 19 15:16:17 IST 2025'),(219,'vineet','SU','SU','136.226.250.124','Thu Jun 19 15:19:29 IST 2025'),(220,'vineet','SU','SU','136.226.250.124','Thu Jun 19 15:42:17 IST 2025'),(221,'vineet','SU','SU','136.226.250.124','Thu Jun 19 15:43:44 IST 2025');

--
-- Table structure for table `tbl_login`
--

DROP TABLE IF EXISTS tbl_login;

CREATE TABLE tbl_login (
  sno integer NOT NULL ,
  Name varchar(45) NOT NULL,
  cmbIns varchar(45) NOT NULL,
  role varchar(45) NOT NULL,
  IP_ADDRESS varchar(45) NOT NULL,
  Datetim varchar(245) NOT NULL,
  action varchar(45) DEFAULT NULL,
  status varchar(145) DEFAULT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_login`
--


--
-- Table structure for table `tbl_login_detail_courtcases`
--

DROP TABLE IF EXISTS tbl_login_detail_courtcases;

CREATE TABLE tbl_login_detail_courtcases (
  sno integer NOT NULL ,
  Name varchar(145) NOT NULL,
  cmbIns varchar(415) NOT NULL,
  role varchar(415) NOT NULL,
  IP_ADDRESS varchar(145) NOT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_login_detail_courtcases`
--


--
-- Table structure for table `tbl_month`
--

DROP TABLE IF EXISTS tbl_month;

CREATE TABLE tbl_month (
  sno integer NOT NULL ,
  months integer NOT NULL,
  mon varchar(45) NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (months,mon)
);


--
-- Dumping data for table `tbl_month`
--

INSERT INTO tbl_month VALUES (1,1,'April'),(2,2,'May'),(3,3,'June'),(4,4,'July'),(5,5,'August'),(6,6,'September'),(7,7,'October'),(8,8,'November'),(9,9,'December'),(10,10,'January'),(11,11,'February'),(12,12,'March');

--
-- Table structure for table `tbl_msme_di_amc`
--

DROP TABLE IF EXISTS tbl_msme_di_amc;

CREATE TABLE tbl_msme_di_amc (
  SNO integer DEFAULT NULL,
  MSME_DI varchar(100) DEFAULT NULL,
  AMC_OF_PCS integer DEFAULT NULL,
  WEB_MAINT integer DEFAULT NULL,
  LEASED_LINE integer DEFAULT NULL,
  CONTINGENCIESS integer DEFAULT NULL,
  HW_SW integer DEFAULT NULL,
  TOTAL integer DEFAULT NULL,
  SANCTION_NO text,
  SANCTION_DATE date DEFAULT NULL,
  smallint integer DEFAULT NULL,
  MONTH varchar(20) DEFAULT NULL
);


--
-- Dumping data for table `tbl_msme_di_amc`
--


--
-- Table structure for table `tbl_msme_di_unspent_fund`
--

DROP TABLE IF EXISTS tbl_msme_di_unspent_fund;

CREATE TABLE tbl_msme_di_unspent_fund (
  MONTHS char(20) DEFAULT NULL,
  YEARS char(20) DEFAULT NULL,
  SNO integer DEFAULT NULL,
  MSME_DI char(100) DEFAULT NULL,
  AMC_OF_PCS integer DEFAULT NULL,
  WEB_MAINT integer DEFAULT NULL,
  LEASED_LINE integer DEFAULT NULL,
  CONTINGENCIESS integer DEFAULT NULL,
  HW_SW integer DEFAULT NULL,
  TOTAL integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_msme_di_unspent_fund`
--


--
-- Table structure for table `tbl_personaldata`
--

DROP TABLE IF EXISTS tbl_personaldata;

CREATE TABLE tbl_personaldata (
  sno integer NOT NULL ,
  name varchar(45) NOT NULL,
  date_of_birth date NOT NULL,
  telenumber integer NOT NULL,
  mobnumber integer NOT NULL,
  Address varchar(445) NOT NULL,
  Family varchar(445) NOT NULL,
  Designation varchar(245) NOT NULL,
  Caste varchar(245) NOT NULL,
  Discipline varchar(245) NOT NULL,
  Date_of_superannuation date NOT NULL,
  uname varchar(245) NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (name,date_of_birth,mobnumber),
  UNIQUE (uname)
);


--
-- Dumping data for table `tbl_personaldata`
--

INSERT INTO tbl_personaldata VALUES (3,'prakash chandra','1900-01-01',46654654,56546546,'ggfdgfdgfdgfd','bgdfgfd','Development Commissioner','dfdsf','ffdsf','1900-01-01','admin');

--
-- Table structure for table `tbl_phonebook`
--

DROP TABLE IF EXISTS tbl_phonebook;

CREATE TABLE tbl_phonebook (
  sno integer NOT NULL ,
  name varchar(145) NOT NULL,
  Address varchar(445) NOT NULL,
  Division varchar(145) DEFAULT NULL,
  Designation varchar(145) DEFAULT NULL,
  phoneNumber integer DEFAULT NULL,
  MobileNumber varchar(45) DEFAULT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_phonebook`
--

INSERT INTO tbl_phonebook VALUES (2,'Mr.Amrendra Sinha','o/o DCMSME','-','Development Commissioner',23061176,'-'),(3,'Dr.Sunita Chhibba','O/O DCMSME','-','Additional Development Commissioner ',23061069,'-'),(4,'MR. R.K Rai','o/o DCMSME','ToolRoom','Director',23062561,'24366048'),(5,'MR. S.V.Sharma','o/o DCMSME','Senet Division','Deputy Director',23062680,'-'),(6,'MR. B.B.Sahoo','o/o DCMSME','Senet Division','Assistant Director Grade-II',23062680,'9968803575'),(7,'MR.V.V.Khare','O/O DCMSME','Senet Division','Assistant Director Grade-II',23062680,'9810206940'),(8,'MR. Mahesh Chand','o/o DCMSME','ToolRoom','Assistant Director Grade-II',0,'-'),(9,'MR. Amit Bhardwaj','o/o dcmsme','ToolRoom','Assistant Director Grade-II',0,'-'),(10,'MR. K.L.Rao','o/o DCMSME','SDI','Director',23063363,'9212268925'),(11,'MR.Niranjan Naik','o/o DCMSME','-','industrial adviser',23061178,'-');

--
-- Table structure for table `tbl_physical`
--

DROP TABLE IF EXISTS tbl_physical;

CREATE TABLE tbl_physical (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(625) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  NJU_MSME_NO_TARGET integer DEFAULT NULL,
  NJU_MSME_NO_DTM integer DEFAULT NULL,
  NJU_MSME_NO_CUM integer DEFAULT NULL,
  NJU_MSME_VALUE_TARGET integer DEFAULT NULL,
  NJU_MSME_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_MSME_VALUE_CUM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_NO_TARGET integer DEFAULT NULL,
  NJU_OTHER_NO_DTM integer DEFAULT NULL,
  NJU_OTHER_NO_CUM integer DEFAULT NULL,
  NJU_OTHER_VALUE_TARGET integer DEFAULT NULL,
  NJU_OTHER_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_VALUE_CUM decimal(28,2) DEFAULT NULL,
  CONSLT_MSME_TARGET integer DEFAULT NULL,
  CONSLT_MSME_DTM integer DEFAULT NULL,
  CONSLT_MSME_CUM integer DEFAULT NULL,
  CONSLT_OTHER_TARGET integer DEFAULT NULL,
  CONSLT_OTHER_DTM decimal(28,2) DEFAULT NULL,
  CONSLT_OTHER_CUM integer DEFAULT NULL,
  ANY_OTHER_TARGET integer DEFAULT NULL,
  ANY_OTHER_DTM decimal(28,2) DEFAULT NULL,
  ANY_OTHER_CUM integer DEFAULT NULL,
  TA_LTC_TARGET integer DEFAULT NULL,
  TA_LTC_DTM integer DEFAULT NULL,
  TA_LTC_CUM integer DEFAULT NULL,
  TA_STC_NCC_TARGET integer DEFAULT NULL,
  TA_STC_NCC_DTM integer DEFAULT NULL,
  TA_STC_NCC_CUM integer DEFAULT NULL,
  TA_STC_NTT_TARGET integer DEFAULT NULL,
  TA_STC_NTT_DTM integer DEFAULT NULL,
  TA_STC_NTT_CUM integer DEFAULT NULL,
  TA_OTHERS_TARGET integer DEFAULT NULL,
  TA_OTHERS_DTM integer DEFAULT NULL,
  TA_OTHERS_CUM integer DEFAULT NULL,
  SEMINAR_NO_TARGET integer DEFAULT NULL,
  SEMINAR_NO_DTM integer DEFAULT NULL,
  SEMINAR_NO_CUM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_TARGET integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_DTM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_CUM integer DEFAULT NULL,
  TTB_DTM_SC integer DEFAULT NULL,
  TTB_DTM_ST integer DEFAULT NULL,
  TTB_DTM_WOMEN integer DEFAULT NULL,
  TTB_DTM_OBC integer DEFAULT NULL,
  TTB_DTM_PH integer DEFAULT NULL,
  TTB_DTM_MIN integer DEFAULT NULL,
  TTB_DTM_TOTAL integer DEFAULT NULL,
  TTB_CUM_SC integer DEFAULT NULL,
  TTB_CUM_ST integer DEFAULT NULL,
  TTB_CUM_WOMEN integer DEFAULT NULL,
  TTB_CUM_OBC integer DEFAULT NULL,
  TTB_CUM_PH integer DEFAULT NULL,
  TTB_CUM_MIN integer DEFAULT NULL,
  TTB_CUM_TOTAL integer DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TRNG_TOTAL_NOC_CUMU_MON integer DEFAULT NULL,
  TRNG_TOTAL_NOC_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_CUM integer DEFAULT NULL,
  general_ttb integer DEFAULT NULL,
  general_cum integer DEFAULT NULL,
  GEN integer DEFAULT '0',
  MEN integer DEFAULT '0',
  TRANSGENDER integer DEFAULT '0',
  tenfail integer DEFAULT '0',
  tenpass integer DEFAULT '0',
  twelth integer DEFAULT '0',
  Graduation integer DEFAULT '0',
  PG integer DEFAULT '0',
  limit1 integer DEFAULT '0',
  limit2 integer DEFAULT '0',
  limit3 integer DEFAULT '0',
  limit4 integer DEFAULT '0',
  GEN_CUM integer DEFAULT '0',
  MEN_CUM integer DEFAULT '0',
  TRANSGENDER_CUM integer DEFAULT '0',
  tenfail_cum integer DEFAULT '0',
  tenpass_cum integer DEFAULT '0',
  twelth_cum integer DEFAULT '0',
  Graduation_cum integer DEFAULT '0',
  PG_CUM integer DEFAULT '0',
  limit1_cum integer DEFAULT '0',
  limit2_cum integer DEFAULT '0',
  limit3_cum integer DEFAULT '0',
  limit4_cum integer DEFAULT '0',
  Above integer DEFAULT '0',
  Abovec integer DEFAULT '0',
  Diploma integer DEFAULT '0',
  Diplomac integer DEFAULT '0',
  ITI integer DEFAULT '0',
  Graduation_NonTech integer DEFAULT '0',
  Graduation_Tech integer DEFAULT '0',
  PostGraduate_NonTech integer DEFAULT '0',
  PostGraduate_Tech integer DEFAULT '0',
  PhdMhil integer DEFAULT '0',
  ITIc integer DEFAULT '0',
  Graduation_NonTechc integer DEFAULT '0',
  Graduation_Techc integer DEFAULT '0',
  PostGraduate_NonTechc integer DEFAULT '0',
  PostGraduate_Techc integer DEFAULT '0',
  PhdMhilc integer DEFAULT '0',
  msme_nos_tooling_target integer DEFAULT '0',
  msme_nos_tooling_dtm integer DEFAULT '0',
  msme_nos_tooling_cumu_mon integer DEFAULT '0',
  msme_values_tooling_target integer DEFAULT '0',
  msme_values_tooling_dtm decimal(28,2) DEFAULT '0.00',
  msme_values_tooling_cumu_mon decimal(28,2) DEFAULT '0.00',
  other_nos_tooling_target integer DEFAULT '0',
  other_nos_tooling_dtm integer DEFAULT '0',
  other_nos_tooling_cumu_mon integer DEFAULT '0',
  other_values_tooling_target integer DEFAULT '0',
  other_values_tooling_dtm decimal(28,2) DEFAULT '0.00',
  other_values_tooling_cumu_mon decimal(28,2) DEFAULT '0.00',
  msme_nos_otherjob_target integer DEFAULT '0',
  msme_nos_otherjob_dtm integer DEFAULT '0',
  msme_nos_otherjob_cumu_mon integer DEFAULT '0',
  msme_values_otherjob_target integer DEFAULT '0',
  msme_values_otherjob_dtm decimal(28,2) DEFAULT '0.00',
  msme_values_otherjob_cumu_mon decimal(28,2) DEFAULT '0.00',
  other_nos_otherjob_target integer DEFAULT '0',
  other_nos_otherjob_dtm integer DEFAULT '0',
  other_nos_otherjob_cumu_mon integer DEFAULT '0',
  other_values_otherjob_target integer DEFAULT '0',
  other_values_otherjob_dtm decimal(28,2) DEFAULT '0.00',
  other_values_otherjob_cumu_mon decimal(28,2) DEFAULT '0.00',
  PRIMARY KEY (INST_ID,MONTHS,YEARS),
  UNIQUE (INST_ID,MONTHS,YEARS)
);


--
-- Dumping data for table `tbl_physical`
--

INSERT INTO tbl_physical VALUES ('I1','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,8,8,0,0.00,0,0,0.00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,107,107,31,0,35,28,0,13,0,31,0,35,28,0,13,0,NULL,0,0,0,0,NULL,NULL,35,72,0,0,85,0,0,0,107,0,0,0,35,72,0,0,85,0,0,0,107,0,0,0,0,0,22,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.00,0.00,0,2,2,0,0.34,0.34,0,10,10,0,6.62,6.62,0,8,8,0,2.70,2.70),('I1','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,7,15,0,0.00,0,0,5.00,5,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,0,58,165,0,0,0,0,0,0,0,31,0,35,28,0,13,0,NULL,0,0,0,0,NULL,NULL,58,58,0,0,0,0,0,0,57,1,0,0,93,130,0,0,85,0,0,0,164,1,0,0,0,0,57,79,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0.00,0.00,0,3,5,0,0.40,0.74,0,10,20,0,1.50,8.12,0,4,12,0,1.98,4.68),('I3','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,1,1,0,0.00,0,0,0.00,0,0,0,0,0,2,2,0,72,72,0,0,0,0,1,1,0,30,30,11,5,8,2,0,0,0,11,5,8,2,0,0,0,NULL,2,2,42,42,NULL,NULL,54,64,0,0,1,11,0,0,59,13,0,0,54,64,0,0,1,11,0,0,59,13,0,0,0,0,0,0,60,0,0,0,0,0,60,0,0,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,1,1,0,0.20,0.20,0,0,0,0,0.00,0.00),('I3','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,1,2,0,0.00,0,0,0.00,0,0,0,0,0,3,5,0,75,147,0,0,0,0,1,2,0,35,65,35,25,12,1,0,0,0,46,30,20,3,0,0,0,NULL,7,5,75,117,NULL,NULL,14,65,0,0,10,3,0,0,49,16,1,0,68,129,0,0,11,14,0,0,108,29,1,0,0,0,0,0,64,0,0,0,0,0,124,0,0,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,1,2,0,0.70,0.90,0,1,1,0,0.00,0.00),('I4','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,0,0,0,0,0,0,100,100,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,15,0,0,0,0,NULL,0,0,0,100,NULL,NULL,100,85,0,0,80,20,0,0,2,81,17,0,100,85,0,0,80,20,0,0,2,81,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,2,2,0,0.18,0.18,0,0,0,0,0.00,0.00),('I4','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,1,1,0,15,15,0,0,100,0,0,0,0,0,0,7,8,5,0,0,0,0,7,8,20,0,0,0,0,NULL,1,1,15,15,NULL,NULL,0,10,0,0,0,15,0,0,0,15,0,0,100,95,0,0,80,35,0,0,2,96,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0.20,0.20,0,0,0,0,0.00,0.00,0,2,4,0,0.23,0.41,0,0,0,0,0.00,0.00),('I5','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,7,7,0,0.00,0,0,0.00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,196,196,20,0,81,181,0,0,0,20,0,81,181,0,0,0,NULL,5,5,7,7,NULL,NULL,2,122,0,0,0,5,0,0,202,0,0,1,2,122,0,0,0,5,0,0,202,0,0,1,0,0,0,0,0,80,118,0,0,0,0,80,118,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,3,3,0,0.30,0.30,0,0,0,0,0.90,0.90),('I5','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,11,18,0,0.00,0,0,2.00,2,0,0,0,0,9,9,0,9,9,0,203,203,0,2,4,0,203,399,10,0,85,192,0,0,0,30,0,166,373,0,0,0,NULL,8,3,9,212,NULL,NULL,10,127,0,0,7,0,0,0,205,0,0,0,12,249,0,0,7,5,0,0,407,0,0,1,7,7,15,15,4,10,176,0,0,0,4,90,294,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,3,6,0,0.30,0.60,0,0,0,0,0.00,0.90),('I6','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,6,6,0,112,112,0,0,0,0,0,0,0,0,0,11,19,43,62,0,0,0,11,19,43,62,0,0,0,NULL,6,6,112,112,NULL,NULL,20,69,0,0,16,8,0,0,54,37,6,12,20,69,0,0,16,8,0,0,54,37,6,12,3,3,6,6,47,3,29,3,0,0,47,3,29,3,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,5,5,0,0.65,0.65,0,2,2,0,0.01,0.01),('I6','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,11,17,0,209,321,0,0,0,0,0,0,0,0,0,21,23,54,119,0,0,0,32,42,97,181,0,0,0,NULL,17,11,209,321,NULL,NULL,46,155,0,0,0,0,0,0,101,99,6,3,66,224,0,0,16,8,0,0,155,136,12,15,0,3,151,157,13,1,32,12,0,0,60,4,61,15,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,5,10,0,0.30,0.95,0,1,3,0,0.05,0.06),('I7','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,82,82,5,2,34,50,0,0,0,5,2,34,50,0,0,0,NULL,0,0,0,0,NULL,NULL,25,48,0,0,0,0,0,0,0,0,0,0,25,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,82,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,4,4,0,0.92,0.92,0,2,2,0,6.91,6.91),('I7','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,57,139,6,6,40,33,0,0,0,11,8,74,83,0,0,0,NULL,0,0,0,0,NULL,NULL,12,17,0,0,0,0,0,0,57,0,0,0,37,65,0,0,0,0,0,0,57,0,0,0,0,0,0,0,0,57,0,0,0,0,0,139,0,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,4,0,0.00,0.92,0,0,2,0,0.00,6.91),('I9','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,2.00,2,0,0.00,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,1,1,1,1,NULL,NULL,1,1,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00),('I9','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,5.00,7,0,0.00,0,0,0,0,0,2,3,0,4,5,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,2,0,0,1,0,0,0,NULL,3,2,4,5,NULL,NULL,1,4,0,0,1,1,0,0,1,1,2,0,2,5,0,0,2,1,0,0,2,1,2,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00),('I91','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,3,3,0,0.00,0,0,0.00,0,0,60,60,0,4,4,0,96,96,0,0,0,0,2,2,0,86,86,63,78,28,75,0,2,0,63,78,28,75,0,2,0,NULL,6,6,156,156,NULL,NULL,24,214,0,0,0,0,0,0,134,100,4,1,24,214,0,0,0,0,0,0,134,100,4,1,3,3,0,0,138,0,104,0,0,0,138,0,104,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,2,2,0,1.60,1.60,0,0,0,0,0.00,0.00),('I91','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,3,6,0,0.00,0,0,0.00,0,0,0,0,0,4,8,0,83,179,0,0,0,0,2,4,0,59,145,26,38,99,41,0,0,0,89,116,127,116,0,2,0,NULL,10,4,83,239,NULL,NULL,37,43,0,0,0,0,0,0,83,37,22,0,61,257,0,0,0,0,0,0,217,137,26,1,0,3,0,0,83,22,37,0,0,0,221,22,141,0,0,0,0,1,1,0,0.01,0.01,0,0,0,0,0.00,0.00,0,4,6,0,4.00,5.60,0,0,0,0,0.00,0.00),('I92','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,2,2,0,0.00,0,0,0.00,0,0,0,0,0,2,2,0,7,7,0,0,0,0,7,7,0,302,302,0,0,1,3,0,0,0,0,0,1,3,0,0,0,NULL,2,2,7,7,NULL,NULL,4,6,0,0,0,2,0,0,0,5,0,2,4,6,0,0,0,2,0,0,0,5,0,2,0,0,0,0,3,0,2,0,0,0,3,0,2,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,1,1,0,0.11,0.11),('I92','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,2,4,0,0.00,0,0,0.00,0,0,0,0,0,2,4,0,10,17,0,0,0,0,0,7,0,0,302,2,0,2,3,0,0,0,2,0,3,6,0,0,0,NULL,4,2,10,17,NULL,NULL,5,8,0,0,0,0,0,0,3,7,0,0,9,14,0,0,0,2,0,0,3,12,0,2,0,0,10,10,0,0,0,0,0,0,3,0,2,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,1,0,0.00,0.11),('I93','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,3,3,0,68,68,0,0,0,0,3,3,0,68,68,2,0,21,18,0,0,0,2,0,21,18,0,0,0,NULL,3,3,68,68,NULL,NULL,48,47,0,0,0,6,0,0,3,7,5,14,48,47,0,0,0,6,0,0,3,7,5,14,39,39,6,6,0,27,0,0,29,0,0,27,0,0,29,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00),('I93','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,1.00,1,0,0.00,0,0,0,0,0,3,6,0,105,173,0,0,0,0,0,3,0,0,68,7,0,37,17,0,0,0,9,0,58,35,0,0,0,NULL,6,3,105,173,NULL,NULL,81,68,0,0,0,4,0,0,9,12,16,23,129,115,0,0,0,10,0,0,12,19,21,37,45,84,1,7,0,50,0,25,25,0,0,77,0,25,54,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00),('I94','1','2025-2026-1-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,5,0,0,0,0,NULL,0,0,0,0,NULL,NULL,23,18,0,0,0,0,0,0,0,23,0,0,23,18,0,0,0,0,0,0,0,23,0,0,0,0,0,0,0,0,23,0,0,0,0,0,23,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00),('I94','2','2025-2026-2-20','2025-2026',0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0,0,0.00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,NULL,0,0,0,0,NULL,NULL,0,0,0,0,0,0,0,0,0,0,0,0,23,18,0,0,0,0,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,0,0,0,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00,0,0,0,0,0.00,0.00);

--
-- Table structure for table `tbl_physical_13112023`
--

DROP TABLE IF EXISTS tbl_physical_13112023;

CREATE TABLE tbl_physical_13112023 (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(625) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  NJU_MSME_NO_TARGET integer DEFAULT NULL,
  NJU_MSME_NO_DTM integer DEFAULT NULL,
  NJU_MSME_NO_CUM integer DEFAULT NULL,
  NJU_MSME_VALUE_TARGET integer DEFAULT NULL,
  NJU_MSME_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_MSME_VALUE_CUM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_NO_TARGET integer DEFAULT NULL,
  NJU_OTHER_NO_DTM integer DEFAULT NULL,
  NJU_OTHER_NO_CUM integer DEFAULT NULL,
  NJU_OTHER_VALUE_TARGET integer DEFAULT NULL,
  NJU_OTHER_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_VALUE_CUM decimal(28,2) DEFAULT NULL,
  CONSLT_MSME_TARGET integer DEFAULT NULL,
  CONSLT_MSME_DTM integer DEFAULT NULL,
  CONSLT_MSME_CUM integer DEFAULT NULL,
  CONSLT_OTHER_TARGET integer DEFAULT NULL,
  CONSLT_OTHER_DTM decimal(28,2) DEFAULT NULL,
  CONSLT_OTHER_CUM integer DEFAULT NULL,
  ANY_OTHER_TARGET integer DEFAULT NULL,
  ANY_OTHER_DTM decimal(28,2) DEFAULT NULL,
  ANY_OTHER_CUM integer DEFAULT NULL,
  TA_LTC_TARGET integer DEFAULT NULL,
  TA_LTC_DTM integer DEFAULT NULL,
  TA_LTC_CUM integer DEFAULT NULL,
  TA_STC_NCC_TARGET integer DEFAULT NULL,
  TA_STC_NCC_DTM integer DEFAULT NULL,
  TA_STC_NCC_CUM integer DEFAULT NULL,
  TA_STC_NTT_TARGET integer DEFAULT NULL,
  TA_STC_NTT_DTM integer DEFAULT NULL,
  TA_STC_NTT_CUM integer DEFAULT NULL,
  TA_OTHERS_TARGET integer DEFAULT NULL,
  TA_OTHERS_DTM integer DEFAULT NULL,
  TA_OTHERS_CUM integer DEFAULT NULL,
  SEMINAR_NO_TARGET integer DEFAULT NULL,
  SEMINAR_NO_DTM integer DEFAULT NULL,
  SEMINAR_NO_CUM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_TARGET integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_DTM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_CUM integer DEFAULT NULL,
  TTB_DTM_SC integer DEFAULT NULL,
  TTB_DTM_ST integer DEFAULT NULL,
  TTB_DTM_WOMEN integer DEFAULT NULL,
  TTB_DTM_OBC integer DEFAULT NULL,
  TTB_DTM_PH integer DEFAULT NULL,
  TTB_DTM_MIN integer DEFAULT NULL,
  TTB_DTM_TOTAL integer DEFAULT NULL,
  TTB_CUM_SC integer DEFAULT NULL,
  TTB_CUM_ST integer DEFAULT NULL,
  TTB_CUM_WOMEN integer DEFAULT NULL,
  TTB_CUM_OBC integer DEFAULT NULL,
  TTB_CUM_PH integer DEFAULT NULL,
  TTB_CUM_MIN integer DEFAULT NULL,
  TTB_CUM_TOTAL integer DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TRNG_TOTAL_NOC_CUMU_MON integer DEFAULT NULL,
  TRNG_TOTAL_NOC_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_CUM integer DEFAULT NULL,
  general_ttb integer DEFAULT NULL,
  general_cum integer DEFAULT NULL,
  GEN integer DEFAULT '0',
  MEN integer DEFAULT '0',
  TRANSGENDER integer DEFAULT '0',
  tenfail integer DEFAULT '0',
  tenpass integer DEFAULT '0',
  twelth integer DEFAULT '0',
  Graduation integer DEFAULT '0',
  PG integer DEFAULT '0',
  limit1 integer DEFAULT '0',
  limit2 integer DEFAULT '0',
  limit3 integer DEFAULT '0',
  limit4 integer DEFAULT '0',
  GEN_CUM integer DEFAULT '0',
  MEN_CUM integer DEFAULT '0',
  TRANSGENDER_CUM integer DEFAULT '0',
  tenfail_cum integer DEFAULT '0',
  tenpass_cum integer DEFAULT '0',
  twelth_cum integer DEFAULT '0',
  Graduation_cum integer DEFAULT '0',
  PG_CUM integer DEFAULT '0',
  limit1_cum integer DEFAULT '0',
  limit2_cum integer DEFAULT '0',
  limit3_cum integer DEFAULT '0',
  limit4_cum integer DEFAULT '0',
  Above integer DEFAULT '0',
  Abovec integer DEFAULT '0',
  Diploma integer DEFAULT '0',
  Diplomac integer DEFAULT '0',
  ITI integer DEFAULT '0',
  Graduation_NonTech integer DEFAULT '0',
  Graduation_Tech integer DEFAULT '0',
  PostGraduate_NonTech integer DEFAULT '0',
  PostGraduate_Tech integer DEFAULT '0',
  PhdMhil integer DEFAULT '0',
  ITIc integer DEFAULT '0',
  Graduation_NonTechc integer DEFAULT '0',
  Graduation_Techc integer DEFAULT '0',
  PostGraduate_NonTechc integer DEFAULT '0',
  PostGraduate_Techc integer DEFAULT '0',
  PhdMhilc integer DEFAULT '0',
  msme_nos_tooling_target integer DEFAULT '0',
  msme_nos_tooling_dtm integer DEFAULT '0',
  msme_nos_tooling_cumu_mon integer DEFAULT '0',
  msme_values_tooling_target integer DEFAULT '0',
  msme_values_tooling_dtm decimal(28,2) DEFAULT '0.00',
  msme_values_tooling_cumu_mon decimal(28,2) DEFAULT '0.00',
  other_nos_tooling_target integer DEFAULT '0',
  other_nos_tooling_dtm integer DEFAULT '0',
  other_nos_tooling_cumu_mon integer DEFAULT '0',
  other_values_tooling_target integer DEFAULT '0',
  other_values_tooling_dtm decimal(28,2) DEFAULT '0.00',
  other_values_tooling_cumu_mon decimal(28,2) DEFAULT '0.00',
  msme_nos_otherjob_target integer DEFAULT '0',
  msme_nos_otherjob_dtm integer DEFAULT '0',
  msme_nos_otherjob_cumu_mon integer DEFAULT '0',
  msme_values_otherjob_target integer DEFAULT '0',
  msme_values_otherjob_dtm decimal(28,2) DEFAULT '0.00',
  msme_values_otherjob_cumu_mon decimal(28,2) DEFAULT '0.00',
  other_nos_otherjob_target integer DEFAULT '0',
  other_nos_otherjob_dtm integer DEFAULT '0',
  other_nos_otherjob_cumu_mon integer DEFAULT '0',
  other_values_otherjob_target integer DEFAULT '0',
  other_values_otherjob_dtm decimal(28,2) DEFAULT '0.00',
  other_values_otherjob_cumu_mon decimal(28,2) DEFAULT '0.00'
);


--
-- Dumping data for table `tbl_physical_13112023`
--


--
-- Table structure for table `tbl_physical_bk`
--

DROP TABLE IF EXISTS tbl_physical_bk;

CREATE TABLE tbl_physical_bk (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(625) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  NJU_MSME_NO_TARGET integer DEFAULT NULL,
  NJU_MSME_NO_DTM integer DEFAULT NULL,
  NJU_MSME_NO_CUM integer DEFAULT NULL,
  NJU_MSME_VALUE_TARGET integer DEFAULT NULL,
  NJU_MSME_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_MSME_VALUE_CUM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_NO_TARGET integer DEFAULT NULL,
  NJU_OTHER_NO_DTM integer DEFAULT NULL,
  NJU_OTHER_NO_CUM integer DEFAULT NULL,
  NJU_OTHER_VALUE_TARGET integer DEFAULT NULL,
  NJU_OTHER_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_VALUE_CUM decimal(28,2) DEFAULT NULL,
  CONSLT_MSME_TARGET integer DEFAULT NULL,
  CONSLT_MSME_DTM integer DEFAULT NULL,
  CONSLT_MSME_CUM integer DEFAULT NULL,
  CONSLT_OTHER_TARGET integer DEFAULT NULL,
  CONSLT_OTHER_DTM decimal(28,2) DEFAULT NULL,
  CONSLT_OTHER_CUM integer DEFAULT NULL,
  ANY_OTHER_TARGET integer DEFAULT NULL,
  ANY_OTHER_DTM decimal(28,2) DEFAULT NULL,
  ANY_OTHER_CUM integer DEFAULT NULL,
  TA_LTC_TARGET integer DEFAULT NULL,
  TA_LTC_DTM integer DEFAULT NULL,
  TA_LTC_CUM integer DEFAULT NULL,
  TA_STC_NCC_TARGET integer DEFAULT NULL,
  TA_STC_NCC_DTM integer DEFAULT NULL,
  TA_STC_NCC_CUM integer DEFAULT NULL,
  TA_STC_NTT_TARGET integer DEFAULT NULL,
  TA_STC_NTT_DTM integer DEFAULT NULL,
  TA_STC_NTT_CUM integer DEFAULT NULL,
  TA_OTHERS_TARGET integer DEFAULT NULL,
  TA_OTHERS_DTM integer DEFAULT NULL,
  TA_OTHERS_CUM integer DEFAULT NULL,
  SEMINAR_NO_TARGET integer DEFAULT NULL,
  SEMINAR_NO_DTM integer DEFAULT NULL,
  SEMINAR_NO_CUM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_TARGET integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_DTM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_CUM integer DEFAULT NULL,
  TTB_DTM_SC integer DEFAULT NULL,
  TTB_DTM_ST integer DEFAULT NULL,
  TTB_DTM_WOMEN integer DEFAULT NULL,
  TTB_DTM_OBC integer DEFAULT NULL,
  TTB_DTM_PH integer DEFAULT NULL,
  TTB_DTM_MIN integer DEFAULT NULL,
  TTB_DTM_TOTAL integer DEFAULT NULL,
  TTB_CUM_SC integer DEFAULT NULL,
  TTB_CUM_ST integer DEFAULT NULL,
  TTB_CUM_WOMEN integer DEFAULT NULL,
  TTB_CUM_OBC integer DEFAULT NULL,
  TTB_CUM_PH integer DEFAULT NULL,
  TTB_CUM_MIN integer DEFAULT NULL,
  TTB_CUM_TOTAL integer DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TRNG_TOTAL_NOC_CUMU_MON integer DEFAULT NULL,
  TRNG_TOTAL_NOC_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_CUM integer DEFAULT NULL,
  general_ttb integer DEFAULT NULL,
  general_cum integer DEFAULT NULL,
  PRIMARY KEY (INST_ID,MONTHS,YEARS),
  UNIQUE (INST_ID,MONTHS,YEARS)
);


--
-- Dumping data for table `tbl_physical_bk`
--


--
-- Table structure for table `tbl_physical_bk1`
--

DROP TABLE IF EXISTS tbl_physical_bk1;

CREATE TABLE tbl_physical_bk1 (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(625) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  NJU_MSME_NO_TARGET integer DEFAULT NULL,
  NJU_MSME_NO_DTM integer DEFAULT NULL,
  NJU_MSME_NO_CUM integer DEFAULT NULL,
  NJU_MSME_VALUE_TARGET integer DEFAULT NULL,
  NJU_MSME_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_MSME_VALUE_CUM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_NO_TARGET integer DEFAULT NULL,
  NJU_OTHER_NO_DTM integer DEFAULT NULL,
  NJU_OTHER_NO_CUM integer DEFAULT NULL,
  NJU_OTHER_VALUE_TARGET integer DEFAULT NULL,
  NJU_OTHER_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_VALUE_CUM decimal(28,2) DEFAULT NULL,
  CONSLT_MSME_TARGET integer DEFAULT NULL,
  CONSLT_MSME_DTM integer DEFAULT NULL,
  CONSLT_MSME_CUM integer DEFAULT NULL,
  CONSLT_OTHER_TARGET integer DEFAULT NULL,
  CONSLT_OTHER_DTM decimal(28,2) DEFAULT NULL,
  CONSLT_OTHER_CUM integer DEFAULT NULL,
  ANY_OTHER_TARGET integer DEFAULT NULL,
  ANY_OTHER_DTM decimal(28,2) DEFAULT NULL,
  ANY_OTHER_CUM integer DEFAULT NULL,
  TA_LTC_TARGET integer DEFAULT NULL,
  TA_LTC_DTM integer DEFAULT NULL,
  TA_LTC_CUM integer DEFAULT NULL,
  TA_STC_NCC_TARGET integer DEFAULT NULL,
  TA_STC_NCC_DTM integer DEFAULT NULL,
  TA_STC_NCC_CUM integer DEFAULT NULL,
  TA_STC_NTT_TARGET integer DEFAULT NULL,
  TA_STC_NTT_DTM integer DEFAULT NULL,
  TA_STC_NTT_CUM integer DEFAULT NULL,
  TA_OTHERS_TARGET integer DEFAULT NULL,
  TA_OTHERS_DTM integer DEFAULT NULL,
  TA_OTHERS_CUM integer DEFAULT NULL,
  SEMINAR_NO_TARGET integer DEFAULT NULL,
  SEMINAR_NO_DTM integer DEFAULT NULL,
  SEMINAR_NO_CUM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_TARGET integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_DTM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_CUM integer DEFAULT NULL,
  TTB_DTM_SC integer DEFAULT NULL,
  TTB_DTM_ST integer DEFAULT NULL,
  TTB_DTM_WOMEN integer DEFAULT NULL,
  TTB_DTM_OBC integer DEFAULT NULL,
  TTB_DTM_PH integer DEFAULT NULL,
  TTB_DTM_MIN integer DEFAULT NULL,
  TTB_DTM_TOTAL integer DEFAULT NULL,
  TTB_CUM_SC integer DEFAULT NULL,
  TTB_CUM_ST integer DEFAULT NULL,
  TTB_CUM_WOMEN integer DEFAULT NULL,
  TTB_CUM_OBC integer DEFAULT NULL,
  TTB_CUM_PH integer DEFAULT NULL,
  TTB_CUM_MIN integer DEFAULT NULL,
  TTB_CUM_TOTAL integer DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TRNG_TOTAL_NOC_CUMU_MON integer DEFAULT NULL,
  TRNG_TOTAL_NOC_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_CUM integer DEFAULT NULL,
  general_ttb integer DEFAULT NULL,
  general_cum integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_physical_bk1`
--


--
-- Table structure for table `tbl_physical_copy`
--

DROP TABLE IF EXISTS tbl_physical_copy;

CREATE TABLE tbl_physical_copy (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  MONTHS_YEAR varchar(625) DEFAULT NULL,
  YEARS varchar(125) NOT NULL DEFAULT '0',
  NJU_MSME_NO_TARGET integer DEFAULT NULL,
  NJU_MSME_NO_DTM integer DEFAULT NULL,
  NJU_MSME_NO_CUM integer DEFAULT NULL,
  NJU_MSME_VALUE_TARGET integer DEFAULT NULL,
  NJU_MSME_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_MSME_VALUE_CUM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_NO_TARGET integer DEFAULT NULL,
  NJU_OTHER_NO_DTM integer DEFAULT NULL,
  NJU_OTHER_NO_CUM integer DEFAULT NULL,
  NJU_OTHER_VALUE_TARGET integer DEFAULT NULL,
  NJU_OTHER_VALUE_DTM decimal(28,2) DEFAULT NULL,
  NJU_OTHER_VALUE_CUM decimal(28,2) DEFAULT NULL,
  CONSLT_MSME_TARGET integer DEFAULT NULL,
  CONSLT_MSME_DTM integer DEFAULT NULL,
  CONSLT_MSME_CUM integer DEFAULT NULL,
  CONSLT_OTHER_TARGET integer DEFAULT NULL,
  CONSLT_OTHER_DTM decimal(28,2) DEFAULT NULL,
  CONSLT_OTHER_CUM integer DEFAULT NULL,
  ANY_OTHER_TARGET integer DEFAULT NULL,
  ANY_OTHER_DTM decimal(28,2) DEFAULT NULL,
  ANY_OTHER_CUM integer DEFAULT NULL,
  TA_LTC_TARGET integer DEFAULT NULL,
  TA_LTC_DTM integer DEFAULT NULL,
  TA_LTC_CUM integer DEFAULT NULL,
  TA_STC_NCC_TARGET integer DEFAULT NULL,
  TA_STC_NCC_DTM integer DEFAULT NULL,
  TA_STC_NCC_CUM integer DEFAULT NULL,
  TA_STC_NTT_TARGET integer DEFAULT NULL,
  TA_STC_NTT_DTM integer DEFAULT NULL,
  TA_STC_NTT_CUM integer DEFAULT NULL,
  TA_OTHERS_TARGET integer DEFAULT NULL,
  TA_OTHERS_DTM integer DEFAULT NULL,
  TA_OTHERS_CUM integer DEFAULT NULL,
  SEMINAR_NO_TARGET integer DEFAULT NULL,
  SEMINAR_NO_DTM integer DEFAULT NULL,
  SEMINAR_NO_CUM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_TARGET integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_DTM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_CUM integer DEFAULT NULL,
  TTB_DTM_SC integer DEFAULT NULL,
  TTB_DTM_ST integer DEFAULT NULL,
  TTB_DTM_WOMEN integer DEFAULT NULL,
  TTB_DTM_OBC integer DEFAULT NULL,
  TTB_DTM_PH integer DEFAULT NULL,
  TTB_DTM_MIN integer DEFAULT NULL,
  TTB_DTM_TOTAL integer DEFAULT NULL,
  TTB_CUM_SC integer DEFAULT NULL,
  TTB_CUM_ST integer DEFAULT NULL,
  TTB_CUM_WOMEN integer DEFAULT NULL,
  TTB_CUM_OBC integer DEFAULT NULL,
  TTB_CUM_PH integer DEFAULT NULL,
  TTB_CUM_MIN integer DEFAULT NULL,
  TTB_CUM_TOTAL integer DEFAULT NULL,
  SISI_NM varchar(50) DEFAULT NULL,
  TRNG_TOTAL_NOC_CUMU_MON integer DEFAULT NULL,
  TRNG_TOTAL_NOC_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_DTM integer DEFAULT NULL,
  TRING_TOTAL_NOT_CUM integer DEFAULT NULL,
  general_ttb integer DEFAULT NULL,
  general_cum integer DEFAULT NULL,
  GEN integer DEFAULT '0',
  MEN integer DEFAULT '0',
  TRANSGENDER integer DEFAULT '0',
  tenfail integer DEFAULT '0',
  tenpass integer DEFAULT '0',
  twelth integer DEFAULT '0',
  Graduation integer DEFAULT '0',
  PG integer DEFAULT '0',
  limit1 integer DEFAULT '0',
  limit2 integer DEFAULT '0',
  limit3 integer DEFAULT '0',
  limit4 integer DEFAULT '0',
  GEN_CUM integer DEFAULT '0',
  MEN_CUM integer DEFAULT '0',
  TRANSGENDER_CUM integer DEFAULT '0',
  tenfail_cum integer DEFAULT '0',
  tenpass_cum integer DEFAULT '0',
  twelth_cum integer DEFAULT '0',
  Graduation_cum integer DEFAULT '0',
  PG_CUM integer DEFAULT '0',
  limit1_cum integer DEFAULT '0',
  limit2_cum integer DEFAULT '0',
  limit3_cum integer DEFAULT '0',
  limit4_cum integer DEFAULT '0',
  Above integer DEFAULT '0',
  Abovec integer DEFAULT '0',
  Diploma integer DEFAULT '0',
  Diplomac integer DEFAULT '0',
  ITI integer DEFAULT '0',
  Graduation_NonTech integer DEFAULT '0',
  Graduation_Tech integer DEFAULT '0',
  PostGraduate_NonTech integer DEFAULT '0',
  PostGraduate_Tech integer DEFAULT '0',
  PhdMhil integer DEFAULT '0',
  ITIc integer DEFAULT '0',
  Graduation_NonTechc integer DEFAULT '0',
  Graduation_Techc integer DEFAULT '0',
  PostGraduate_NonTechc integer DEFAULT '0',
  PostGraduate_Techc integer DEFAULT '0',
  PhdMhilc integer DEFAULT '0',
  msme_nos_tooling_target integer DEFAULT '0',
  msme_nos_tooling_dtm integer DEFAULT '0',
  msme_nos_tooling_cumu_mon integer DEFAULT '0',
  msme_values_tooling_target integer DEFAULT '0',
  msme_values_tooling_dtm decimal(28,2) DEFAULT '0.00',
  msme_values_tooling_cumu_mon decimal(28,2) DEFAULT '0.00',
  other_nos_tooling_target integer DEFAULT '0',
  other_nos_tooling_dtm integer DEFAULT '0',
  other_nos_tooling_cumu_mon integer DEFAULT '0',
  other_values_tooling_target integer DEFAULT '0',
  other_values_tooling_dtm decimal(28,2) DEFAULT '0.00',
  other_values_tooling_cumu_mon decimal(28,2) DEFAULT '0.00',
  msme_nos_otherjob_target integer DEFAULT '0',
  msme_nos_otherjob_dtm integer DEFAULT '0',
  msme_nos_otherjob_cumu_mon integer DEFAULT '0',
  msme_values_otherjob_target integer DEFAULT '0',
  msme_values_otherjob_dtm decimal(28,2) DEFAULT '0.00',
  msme_values_otherjob_cumu_mon decimal(28,2) DEFAULT '0.00',
  other_nos_otherjob_target integer DEFAULT '0',
  other_nos_otherjob_dtm integer DEFAULT '0',
  other_nos_otherjob_cumu_mon integer DEFAULT '0',
  other_values_otherjob_target integer DEFAULT '0',
  other_values_otherjob_dtm decimal(28,2) DEFAULT '0.00',
  other_values_otherjob_cumu_mon decimal(28,2) DEFAULT '0.00'
);


--
-- Dumping data for table `tbl_physical_copy`
--


--
-- Table structure for table `tbl_physical_old_19july2010`
--

DROP TABLE IF EXISTS tbl_physical_old_19july2010;

CREATE TABLE tbl_physical_old_19july2010 (
  INST_ID char(10) DEFAULT NULL,
  MONTHS char(20) DEFAULT NULL,
  YEARS integer DEFAULT NULL,
  MONTHS_YEAR date DEFAULT NULL,
  NJU_MSME_NO_TARGET integer DEFAULT NULL,
  NJU_MSME_NO_DTM integer DEFAULT NULL,
  NJU_MSME_NO_CUM integer DEFAULT NULL,
  NJU_MSME_VALUE_TARGET integer DEFAULT NULL,
  NJU_MSME_VALUE_DTM integer DEFAULT NULL,
  NJU_MSME_VALUE_CUM integer DEFAULT NULL,
  NJU_OTHER_NO_TARGET integer DEFAULT NULL,
  NJU_OTHER_NO_DTM integer DEFAULT NULL,
  NJU_OTHER_NO_CUM integer DEFAULT NULL,
  NJU_OTHER_VALUE_TARGET integer DEFAULT NULL,
  NJU_OTHER_VALUE_DTM integer DEFAULT NULL,
  NJU_OTHER_VALUE_CUM integer DEFAULT NULL,
  CONSLT_MSME_TARGET integer DEFAULT NULL,
  CONSLT_MSME_DTM integer DEFAULT NULL,
  CONSLT_MSME_CUM integer DEFAULT NULL,
  CONSLT_OTHER_TARGET integer DEFAULT NULL,
  CONSLT_OTHER_DTM integer DEFAULT NULL,
  CONSLT_OTHER_CUM integer DEFAULT NULL,
  ANY_OTHER_TARGET integer DEFAULT NULL,
  ANY_OTHER_DTM integer DEFAULT NULL,
  ANY_OTHER_CUM integer DEFAULT NULL,
  TA_LTC_TARGET integer DEFAULT NULL,
  TA_LTC_DTM integer DEFAULT NULL,
  TA_LTC_CUM integer DEFAULT NULL,
  TA_STC_NCC_TARGET integer DEFAULT NULL,
  TA_STC_NCC_DTM integer DEFAULT NULL,
  TA_STC_NCC_CUM integer DEFAULT NULL,
  TA_STC_NTT_TARGET integer DEFAULT NULL,
  TA_STC_NTT_DTM integer DEFAULT NULL,
  TA_STC_NTT_CUM integer DEFAULT NULL,
  TA_OTHERS_TARGET integer DEFAULT NULL,
  TA_OTHERS_DTM integer DEFAULT NULL,
  TA_OTHERS_CUM integer DEFAULT NULL,
  SEMINAR_NO_TARGET integer DEFAULT NULL,
  SEMINAR_NO_DTM integer DEFAULT NULL,
  SEMINAR_NO_CUM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_TARGET integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_DTM integer DEFAULT NULL,
  SEMINAR_PARTICIPANTS_CUM integer DEFAULT NULL,
  TTB_DTM_SC integer DEFAULT NULL,
  TTB_DTM_ST integer DEFAULT NULL,
  TTB_DTM_WOMEN integer DEFAULT NULL,
  TTB_DTM_OBC integer DEFAULT NULL,
  TTB_DTM_PH integer DEFAULT NULL,
  TTB_DTM_MIN integer DEFAULT NULL,
  TTB_DTM_TOTAL integer DEFAULT NULL,
  TTB_CUM_SC integer DEFAULT NULL,
  TTB_CUM_ST integer DEFAULT NULL,
  TTB_CUM_WOMEN integer DEFAULT NULL,
  TTB_CUM_OBC integer DEFAULT NULL,
  TTB_CUM_PH integer DEFAULT NULL,
  TTB_CUM_MIN integer DEFAULT NULL,
  TTB_CUM_TOTAL integer DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  TRNG_TOTAL_NOC_DTM integer DEFAULT '0',
  TRNG_TOTAL_NOC_CUMU_MON integer DEFAULT '0'
);


--
-- Dumping data for table `tbl_physical_old_19july2010`
--


--
-- Table structure for table `tbl_placement`
--

DROP TABLE IF EXISTS tbl_placement;

CREATE TABLE tbl_placement (
  sno integer NOT NULL ,
  INST_ID varchar(45) NOT NULL,
  MONTHS varchar(45) NOT NULL,
  YEARS varchar(45) NOT NULL,
  YEAR_MONTHS varchar(100) NOT NULL,
  NSQF_COM_DM integer NOT NULL,
  NSQF_COM_CUM integer NOT NULL,
  NSQF_EX_DM integer NOT NULL,
  NSQF_EX_CUM integer NOT NULL,
  NON_NSQF_DM integer NOT NULL,
  NON_NSQF_CUM integer NOT NULL,
  PS_TRN_CERT_DM integer NOT NULL,
  PS_TRN_CERT_CUM integer NOT NULL,
  PS_TRN_OPT_PLC_DM integer NOT NULL,
  PS_TRN_OPT_PLC_CUM integer NOT NULL,
  PS_TRN_REG_SMPRK_DM integer NOT NULL,
  PS_TRN_REG_SMPRK_CUM integer NOT NULL,
  PS_CND_PLCD_DM integer NOT NULL,
  PS_CND_PLCD_CUM integer NOT NULL,
  PS_EMP_TRN_DM integer NOT NULL,
  PS_EMP_TRN_CUM integer NOT NULL,
  PS_TRN_OPT_HSTD_DM integer NOT NULL,
  PS_TRN_OPT_HSTD_CUM integer NOT NULL,
  PS_CND_OPT_SLFS_DM integer NOT NULL,
  PS_CND_OPT_SLFS_CUM integer NOT NULL,
  PS_CND_TO_BEPLCD_DM integer NOT NULL,
  PS_CND_TO_BEPLCD_CUM integer NOT NULL,
  time varchar(45) NOT NULL,
  IP varchar(45) NOT NULL,
  NSQF_EX_RAM11_DM integer NOT NULL,
  NSQF_EX_RAM11_CUM integer NOT NULL,
  NSQF_EX_RAM12_DM integer NOT NULL,
  NSQF_EX_RAM12_CUM integer NOT NULL,
  NSQF_EX_RAM13_DM integer NOT NULL,
  NSQF_EX_RAM13_CUM integer NOT NULL,
  NSQF_EX_RAM14_DM integer NOT NULL,
  NSQF_EX_RAM14_CUM integer NOT NULL,
  NSQF_EX_RAM15_DM integer NOT NULL,
  NSQF_EX_RAM15_CUM integer NOT NULL,
  NSQF_EX_RAM16_DM integer NOT NULL,
  NSQF_EX_RAM16_CUM integer NOT NULL,
  NSQF_EX_RAM17_DM integer NOT NULL,
  NSQF_EX_RAM17_CUM integer NOT NULL,
  NSQF_EX_RAM18_DM integer NOT NULL,
  NSQF_EX_RAM18_CUM integer NOT NULL,
  NON_NSQF_RAM31_DM integer NOT NULL,
  NON_NSQF_RAM31_CUM integer NOT NULL,
  NON_NSQF_RAM32_DM integer NOT NULL,
  NON_NSQF_RAM32_CUM integer NOT NULL,
  NON_NSQF_RAM33_DM integer NOT NULL,
  NON_NSQF_RAM33_CUM integer NOT NULL,
  NON_NSQF_RAM34_DM integer NOT NULL,
  NON_NSQF_RAM34_CUM integer NOT NULL,
  NON_NSQF_RAM35_DM integer NOT NULL,
  NON_NSQF_RAM35_CUM integer NOT NULL,
  NON_NSQF_RAM36_DM integer NOT NULL,
  NON_NSQF_RAM36_CUM integer NOT NULL,
  NON_NSQF_RAM37_DM integer NOT NULL,
  NON_NSQF_RAM37_CUM integer NOT NULL,
  NON_NSQF_RAM38_DM integer NOT NULL,
  NON_NSQF_RAM38_CUM integer NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (sno)
);


--
-- Dumping data for table `tbl_placement`
--

INSERT INTO tbl_placement VALUES (1,'I1','1','2025-2026','2025-2026-1-20',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'30/05/2025 16:36:18','117.251.98.146',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(2,'I4','1','2025-2026','2025-2026-1-20',0,0,0,0,100,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'31/05/2025 16:37:23','117.208.166.223',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(3,'I91','1','2025-2026','2025-2026-1-20',60,60,96,96,86,86,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'31/05/2025 16:55:25','117.254.215.17',96,96,0,0,19,19,0,0,0,0,0,0,0,0,0,0,86,86,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(4,'I4','2','2025-2026','2025-2026-2-20',0,0,15,15,0,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'31/05/2025 17:03:18','117.208.166.223',15,15,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(5,'I2','1','2025-2026','2025-2026-1-20',0,0,1,1,193,193,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'31/05/2025 17:41:56','223.187.98.35',1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,193,193,0,0,0,0,0,0,2,2,191,191,0,0,0,0),(6,'I91','2','2025-2026','2025-2026-2-20',0,60,83,179,59,145,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'31/05/2025 18:18:24','117.254.215.17',83,179,0,0,22,41,0,0,0,0,0,0,0,0,0,0,59,145,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(7,'I6','2','2025-2026','2025-2026-2-20',34,34,0,0,13,13,34,34,19,19,0,0,11,11,0,0,15,15,3,3,5,5,'03/06/2025 15:57:08','117.240.175.236',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(10,'I2','2','2025-2026','2025-2026-2-20',15,15,22,23,20,213,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'05/06/2025 11:53:16','117.251.78.2',22,23,0,0,0,0,0,0,0,1,22,22,0,0,0,0,20,213,0,0,0,0,0,0,0,2,20,211,0,0,0,0),(11,'I1','2','2025-2026','2025-2026-2-20',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'05/06/2025 14:59:51','117.251.98.146',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(12,'I5','1','2025-2026','2025-2026-1-20',0,0,7,7,196,196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'06/06/2025 20:35:25','117.236.229.35',7,7,0,0,0,0,0,0,0,0,7,7,0,0,0,0,196,196,0,0,0,0,0,0,0,0,196,196,0,0,0,0),(13,'I3','1','2025-2026','2025-2026-1-20',0,0,72,72,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'09/06/2025 13:56:29','59.178.62.66',72,72,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(14,'I3','2','2025-2026','2025-2026-2-20',32,32,45,117,0,0,32,32,0,0,0,0,0,0,0,0,32,32,0,0,0,0,'09/06/2025 14:10:15','59.178.62.66',45,117,0,0,0,0,0,0,0,0,40,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(15,'I6','1','2025-2026','2025-2026-1-20',34,34,0,0,13,13,34,34,19,19,0,0,11,11,0,0,15,15,3,3,5,5,'10/06/2025 15:57:51','117.223.230.241',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(16,'I9','1','2025-2026','2025-2026-1-20',0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'11/06/2025 10:46:08','59.178.165.23',1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(17,'I9','2','2025-2026','2025-2026-2-20',0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'11/06/2025 10:55:05','59.178.165.23',4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(18,'I94','1','2025-2026','2025-2026-1-20',0,0,0,0,23,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'11/06/2025 15:25:43','152.58.186.246',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(19,'I94','2','2025-2026','2025-2026-2-20',0,0,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'11/06/2025 16:05:02','152.58.186.246',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(20,'I92','1','2025-2026','2025-2026-1-20',0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'12/06/2025 10:03:24','59.89.140.197',7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(21,'I92','2','2025-2026','2025-2026-2-20',0,0,10,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'12/06/2025 10:12:36','59.89.140.197',10,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(22,'I5','2','2025-2026','2025-2026-2-20',0,0,2,9,210,406,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'12/06/2025 11:17:06','117.236.229.35',2,9,0,0,0,0,0,0,0,0,2,9,0,0,0,0,210,406,0,0,0,0,0,0,7,7,203,399,0,0,0,0),(23,'I7','1','2025-2026','2025-2026-1-20',22,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'12/06/2025 18:03:09','117.196.243.83',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(24,'I7','2','2025-2026','2025-2026-2-20',0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'13/06/2025 13:56:40','117.196.243.83',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(25,'I93','1','2025-2026','2025-2026-1-20',0,0,1,1,67,67,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'17/06/2025 11:11:58','223.181.107.232',1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,67,67,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(26,'I93','2','2025-2026','2025-2026-2-20',0,0,1,2,104,171,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'17/06/2025 11:47:19','223.181.107.232',1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,171,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

--
-- Table structure for table `tbl_pms_target`
--

DROP TABLE IF EXISTS tbl_pms_target;

CREATE TABLE tbl_pms_target (
  sno integer NOT NULL ,
  inst_id varchar(45) NOT NULL,
  smallint varchar(45) NOT NULL,
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
  Training_programmes integer NOT NULL,
  detail_of_projects integer NOT NULL,
  Sensitization_wto integer NOT NULL,
  Awareness_bio integer NOT NULL,
  Programmes_Packaging integer NOT NULL,
  Programmes_bar integer NOT NULL,
  Awareness_cluster integer NOT NULL,
  TEQUP integer NOT NULL,
  Sensitization_ipr integer NOT NULL,
  Awareness_tequp integer NOT NULL,
  identification integer NOT NULL,
  seminar_on_vsbk integer NOT NULL,
  Indl_Potenial integer NOT NULL,
  workshop integer NOT NULL,
  vdp1 integer DEFAULT NULL,
  PRIMARY KEY (sno),
  UNIQUE (inst_id,smallint)
);


--
-- Dumping data for table `tbl_pms_target`
--


--
-- Table structure for table `tbl_report`
--

DROP TABLE IF EXISTS tbl_report;

CREATE TABLE tbl_report (
  sno integer NOT NULL ,
  InstId varchar(45) NOT NULL,
  months integer NOT NULL,
  smallint varchar(45) NOT NULL,
  Monthly_Achievment_new integer NOT NULL,
  Monthly_Achievment_updated integer NOT NULL,
  stateindustrial integer NOT NULL,
  Survey_Report_Achievment integer NOT NULL,
  Status_Report_Achievment integer NOT NULL,
  Technology_Study_Achievment integer NOT NULL,
  Trade_Directories_Achievment integer NOT NULL,
  Training_Programme_Achievment integer NOT NULL,
  Detail_Project_Achievment integer NOT NULL,
  Distict_Potenial_Achievment integer NOT NULL,
  user_date varchar(45) NOT NULL,
  cum_Monthly_Achievment_new integer DEFAULT NULL,
  cum_Monthly_Achievment_updated integer DEFAULT NULL,
  Project_Profiles_target_new integer DEFAULT NULL,
  Project_Profiles_target_updated integer DEFAULT NULL,
  state_industrial_target integer DEFAULT NULL,
  Distict_Potenial_target integer DEFAULT NULL,
  Survey_Report_target integer DEFAULT NULL,
  Status_Report_target integer DEFAULT NULL,
  Technology_Study_target integer DEFAULT NULL,
  Trade_Directories_target integer DEFAULT NULL,
  Training_Programme_target integer DEFAULT NULL,
  Detail_Project_target integer DEFAULT NULL,
  PRIMARY KEY (sno),
  UNIQUE (InstId,months,smallint)
);


--
-- Dumping data for table `tbl_report`
--


--
-- Table structure for table `tbl_revenue`
--

DROP TABLE IF EXISTS tbl_revenue;

CREATE TABLE tbl_revenue (
  sno integer NOT NULL ,
  InstId varchar(45) NOT NULL,
  months integer NOT NULL,
  smallint varchar(45) NOT NULL,
  Common_total integer NOT NULL,
  sale_total integer NOT NULL,
  sdp_total integer NOT NULL,
  edp_total integer NOT NULL,
  mdp_total integer NOT NULL,
  Seminar_total integer NOT NULL,
  Capacity_total integer NOT NULL,
  Project_total integer NOT NULL,
  Sick_total integer NOT NULL,
  Inplant_total integer NOT NULL,
  Surveys_total integer NOT NULL,
  Energy_total integer NOT NULL,
  NSIC_total integer NOT NULL,
  sale_publication_total integer NOT NULL,
  Information_total integer NOT NULL,
  others_total integer NOT NULL,
  Accounts_total integer NOT NULL,
  user_date varchar(45) NOT NULL,
  cum_Common_total integer NOT NULL,
  total integer NOT NULL,
  cum_total integer NOT NULL,
  esdp_total integer DEFAULT NULL,
  PRIMARY KEY (sno),
  UNIQUE (InstId,months,smallint)
);


--
-- Dumping data for table `tbl_revenue`
--


--
-- Table structure for table `tbl_revenue_branch`
--

DROP TABLE IF EXISTS tbl_revenue_branch;

CREATE TABLE tbl_revenue_branch (
  instId varchar(45) DEFAULT NULL,
  months varchar(45) DEFAULT NULL,
  years integer DEFAULT NULL,
  msmedi integer DEFAULT NULL,
  branch1 integer DEFAULT NULL,
  branch2 integer DEFAULT NULL,
  branch3 integer DEFAULT NULL,
  branch4 integer DEFAULT NULL,
  branch5 integer DEFAULT NULL,
  branch6 integer DEFAULT NULL,
  name varchar(145) DEFAULT NULL,
  sno integer NOT NULL ,
  user_date date NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (instId,months,years,name)
);


--
-- Dumping data for table `tbl_revenue_branch`
--


--
-- Table structure for table `tbl_search_engine`
--

DROP TABLE IF EXISTS tbl_search_engine;

CREATE TABLE tbl_search_engine (
  sno integer NOT NULL ,
  aliass varchar(645) NOT NULL,
  linkofwebsite varchar(745) NOT NULL,
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_search_engine`
--

INSERT INTO tbl_search_engine VALUES (1,'Introduction','http://www.dcmsme.gov.in/MSME-DO/sido.htm'),(2,'Organisation','http://www.dcmsme.gov.in/MSME-DO/sidonetwork.htm'),(3,'Organisation','http://www.dcmsme.gov.in/MSME-DO/sidonetwork.htm'),(4,'Services','http://www.dcmsme.gov.in/MSME-DO/sidoservices.htm'),(5,'Development Commissioner (Micro, Small & Medium Enterprises) Headquarter.','http://www.dcmsme.gov.in/MSME-DO/sidocperson.htm'),(6,'Address of Field Offices working under DC-MSME','http://www.dcmsme.gov.in/MSME-DO/DCmsmeaddress.htm'),(7,'MSME-DI / BR. MSME-DI / MSME-TCs / MSME-TSs','http://www.dcmsme.gov.in/MSME-DO/MSMEdi.pdf'),(8,'Autonomous Bodies','http://www.dcmsme.gov.in/MSME-DO/MSMEautonomousins.pdf'),(9,'Entrepreneurs Memorandum (Part-II) Data on MSME Sector','http://www.dcmsme.gov.in/publications/EMP2.pdf'),(10,'Data & StatisticsData & Statistics','http://www.dcmsme.gov.in/data-stat.htm'),(11,'Final Report Fourth all India Census of MSME 2006-2007 Book','http://www.dcmsme.gov.in/publications/FinalReport010711.pdf'),(12,'Quick Results Fourth All India Census Of MSME 2006-2007','http://www.dcmsme.gov.in/publications/census10.pdf'),(13,'Field verification and updation of enterprises for data collection on items included in the commodity basket selected for IIP-MSME. CD Download','http://www.dcmsme.gov.in/publications/IIP-MSME.html'),(14,'ANNUAL REPORT - Ministry of Micro, Small and Medium Enterprises','http://dcmsme.gov.in/rptAnnualReport.html'),(15,'ANNUAL REPORT - MSME-DIs 2011-12','http://dcmsme.gov.in/diAnnualReport.html'),(16,'ANNUAL REPORT - MSME-DIs 2012-13','http://dcmsme.gov.in/diAnnualReport12-13.html'),(17,'DISTRICTS INDUSTRIAL PROFILES ','http://dcmsme.gov.in/dips/old_dipr.html'),(18,'Budget','http://www.dcmsme.gov.in/Budget&Allocation.htm'),(19,'Outcome Budget','http://www.msme.gov.in/msme_planbudget.htm'),(20,'Demand for Grants: 2013-2014','http://www.msme.gov.in/msme_planbudget.htm'),(21,'Demand for Grants: 2013-2014  ','http://www.dcmsme.gov.in/RevisedEFCPIBGuidelines.pdf'),(22,'Statement of Budget Estimates','http://www.dcmsme.gov.in/Annual%20Plan-msme.htm'),(23,'Allocation of funds to MSME - DIs. (Sanction Order) ','http://www.dcmsme.gov.in/allocationfund.htm'),(24,'Allocation and Sanction of funds for conducting National and State Level Vendor Development Programmes by MSME-Dls during 2013-14.','http://www.dcmsme.gov.in/sanction_order_8-7.pdf'),(25,'Online Application','http://www.dcmsme.gov.in/senet/index.html'),(26,'Hindi Sanskaran','http://laghu-udyog.gov.in/'),(27,'Innovation Action Plan','http://www.dcmsme.gov.in/Innovation%20Action%20Plan%20for%20Ministry%20of%20MSME.pdf'),(28,'Public Procurement','http://www.dcmsme.gov.in/pppm.htm'),(29,'Package For Promotion','http://www.dcmsme.gov.in/Package_For_Promotion.html'),(30,'MSME Publications','http://www.dcmsme.gov.in/publications/publication.htm'),(31,'MSME in India','http://www.dcmsme.gov.in/ssiindia/msme_in.htm'),(32,'Overview of MSME in India (In English)','http://www.dcmsme.gov.in/ssiindia/MSME_OVERVIEW09.pdf'),(33,'Definition of MSME','http://www.dcmsme.gov.in/ssiindia/defination_msme.htm'),(34,'National Portal','http://www.dcmsme.gov.in/National_Portal.pdf'),(35,'Useful Links','http://www.dcmsme.gov.in/partners/useful_links.htm'),(36,'Addresses of DICs','http://www.dcmsme.gov.in/howtosetup/17.10.12%20List%20State%20wise%20DICs%20Address%20%20New%20Microsoft%20Word%20Document.pdf'),(37,'MSME Ministry','http://msme.gov.in/'),(38,'GOI Websites ','http://www.goidirectory.gov.in/index.php');

--
-- Table structure for table `tbl_senet`
--

DROP TABLE IF EXISTS tbl_senet;

CREATE TABLE tbl_senet (
  sno integer NOT NULL ,
  Inst_id varchar(45) NOT NULL,
  months integer NOT NULL,
  smallint varchar(45) NOT NULL,
  AMC_of_pc1 integer NOT NULL,
  web1 integer NOT NULL,
  Connectivity1 integer NOT NULL,
  Contg1 integer NOT NULL,
  Others1 integer NOT NULL,
  user_date varchar(145) NOT NULL,
  AMC_of_pc2 integer NOT NULL,
  web2 integer NOT NULL,
  Connectivity2 integer NOT NULL,
  Others2 integer NOT NULL,
  Contg2 integer NOT NULL,
  AMC_of_pc integer NOT NULL,
  web integer NOT NULL,
  Connectivity integer NOT NULL,
  Contg integer NOT NULL DEFAULT '0',
  Others integer DEFAULT '0',
  Br_hardware_tomonth varchar(45) DEFAULT '0',
  Br_con_tomonth varchar(45) DEFAULT '0',
  Br_contg_tomonth varchar(45) DEFAULT '0',
  Br_others_tomonth varchar(45) DEFAULT '0',
  Br_hardware_tomonth_1 varchar(45) DEFAULT '0',
  Br_con_tomonth_1 varchar(45) DEFAULT '0',
  Br_contg_tomonth_1 varchar(45) DEFAULT '0',
  Br_others_tomonth_1 varchar(45) DEFAULT NULL,
  Br_hardware_tomonth_2 varchar(45) DEFAULT '0',
  Br_con_tomonth_2 varchar(45) DEFAULT '0',
  Br_contg_tomonth_2 varchar(45) DEFAULT '0',
  Br_others_tomonth_2 varchar(45) DEFAULT '0',
  Br_hardware_tomonth_3 varchar(45) DEFAULT '0',
  Br_contg_tomonth_3 varchar(45) DEFAULT '0',
  Br_others_tomonth_3 varchar(45) DEFAULT '0',
  Br_hardware_tomonth_4 varchar(45) DEFAULT '0',
  Br_con_tomonth_4 varchar(45) DEFAULT '0',
  Br_contg_tomonth_4 varchar(45) DEFAULT '0',
  Br_others_tomonth_4 varchar(45) DEFAULT '0',
  Br_hardware_tomonth_5 varchar(45) DEFAULT '0',
  Br_con_tomonth_5 varchar(45) DEFAULT '0',
  Br_contg_tomonth_5 varchar(45) DEFAULT '0',
  Br_others_tomonth_5 varchar(45) DEFAULT '0',
  Br_con_tomonth_3 varchar(45) DEFAULT '0',
  PRIMARY KEY (sno,Inst_id,months,smallint),
  UNIQUE (Inst_id,months,smallint)
);


--
-- Dumping data for table `tbl_senet`
--


--
-- Table structure for table `tbl_special_program`
--

DROP TABLE IF EXISTS tbl_special_program;

CREATE TABLE tbl_special_program (
  sno integer NOT NULL ,
  InstId varchar(45) NOT NULL,
  months integer NOT NULL,
  smallint varchar(145) NOT NULL,
  Sensitization_programme_wto_Programmes integer NOT NULL,
  Sensitization_programme_wto_Participants integer NOT NULL,
  Awareness_Bio_Programmes integer NOT NULL,
  Awareness_Bio_Participants integer NOT NULL,
  Exports_Programmes integer NOT NULL,
  Exports_Participants integer NOT NULL,
  Bar_coding_Programmes integer NOT NULL,
  Bar_coding_Participants integer NOT NULL,
  Cluster_Programmes integer NOT NULL,
  Cluster_Participants integer NOT NULL,
  TEQUP_Programmes integer NOT NULL,
  TEQUP_Participants integer NOT NULL,
  IPR_Programmes integer NOT NULL,
  IPR_Participants integer NOT NULL,
  Awareness_TEQUP_Programmes integer NOT NULL,
  Awareness_TEQUP_Participants integer NOT NULL,
  Awareness_CLCSS_Programmes integer NOT NULL,
  Awareness_CLCSS_Participants integer NOT NULL,
  Seminar_VSBK_Programmes integer NOT NULL,
  Seminar_VSBK_Participants integer NOT NULL,
  user_date varchar(145) NOT NULL,
  Sensitization_programme_wto_target integer DEFAULT NULL,
  Awareness_Bio_target integer DEFAULT NULL,
  Exports_target integer DEFAULT NULL,
  Bar_coding_target integer DEFAULT NULL,
  Cluster_target integer DEFAULT NULL,
  TEQUP_target integer DEFAULT NULL,
  IPR_target integer DEFAULT NULL,
  Awareness_TEQUP_target integer DEFAULT NULL,
  Awareness_CLCSS_target integer DEFAULT NULL,
  Seminar_VSBK_target integer DEFAULT NULL,
  PRIMARY KEY (sno),
  UNIQUE (InstId,months,smallint)
);


--
-- Dumping data for table `tbl_special_program`
--


--
-- Table structure for table `tbl_ssi_mda`
--

DROP TABLE IF EXISTS tbl_ssi_mda;

CREATE TABLE tbl_ssi_mda (
  SNO integer NOT NULL ,
  inst_id varchar(45) NOT NULL,
  months varchar(45) NOT NULL,
  smallint integer NOT NULL,
  fund_release_mda integer NOT NULL,
  target_release_mda integer NOT NULL,
  Exp_mda integer NOT NULL,
  MSEs_mda integer NOT NULL,
  Cumm_exp_mda integer NOT NULL,
  Cumm_MSEs_mda integer NOT NULL,
  fund_release_nmcp integer NOT NULL,
  target_release_nmcp integer NOT NULL,
  Exp_nmcp integer NOT NULL,
  MSEs_nmcp integer NOT NULL,
  Cumm_exp_nmcp integer NOT NULL,
  Cumm_MSEs_nmcp integer NOT NULL,
  fund_release_nmcp_seminar integer NOT NULL,
  target_release_nmcp_seminar integer NOT NULL,
  Exp_nmcp_seminar integer NOT NULL,
  MSEs_nmcp_seminar integer NOT NULL,
  Cumm_exp_nmcp_seminar integer NOT NULL,
  Cumm_MSEs_nmcp_seminar integer NOT NULL,
  user_date date NOT NULL,
  PRIMARY KEY (SNO,inst_id,months,smallint),
  UNIQUE (inst_id,months,smallint)
);


--
-- Dumping data for table `tbl_ssi_mda`
--


--
-- Table structure for table `tbl_target_ssi_mda`
--

DROP TABLE IF EXISTS tbl_target_ssi_mda;

CREATE TABLE tbl_target_ssi_mda (
  sno integer NOT NULL ,
  InstId varchar(45) NOT NULL,
  smallint integer NOT NULL,
  fund_release_mda integer NOT NULL,
  fund_release_nmcp integer NOT NULL,
  fund_release_nmcp_seminar integer NOT NULL,
  Target_mda integer NOT NULL,
  Target_nmcp integer NOT NULL,
  Target_nmcp_seminar integer NOT NULL,
  PRIMARY KEY (sno,InstId,smallint),
  UNIQUE (InstId,smallint)
);


--
-- Dumping data for table `tbl_target_ssi_mda`
--


--
-- Table structure for table `tbl_targetlib`
--

DROP TABLE IF EXISTS tbl_targetlib;

CREATE TABLE tbl_targetlib (
  sno integer NOT NULL ,
  smallint varchar(45) NOT NULL,
  Inst_Id varchar(45) NOT NULL,
  amc_of_pc1 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_1 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_2 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_3 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_4 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_5 varchar(45) NOT NULL DEFAULT '0',
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_targetlib`
--


--
-- Table structure for table `tbl_targetlib_bk`
--

DROP TABLE IF EXISTS tbl_targetlib_bk;

CREATE TABLE tbl_targetlib_bk (
  sno integer NOT NULL ,
  smallint varchar(45) NOT NULL,
  Inst_Id varchar(45) NOT NULL,
  amc_of_pc1 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_1 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_2 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_3 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_4 varchar(45) NOT NULL DEFAULT '0',
  Br_hardware_target_5 varchar(45) NOT NULL DEFAULT '0',
  PRIMARY KEY (sno)
);


--
-- Dumping data for table `tbl_targetlib_bk`
--


--
-- Table structure for table `tbl_targetsenet`
--

DROP TABLE IF EXISTS tbl_targetsenet;

CREATE TABLE tbl_targetsenet (
  sno integer NOT NULL ,
  Inst_id varchar(45) NOT NULL,
  months integer NOT NULL,
  smallint varchar(45) NOT NULL,
  AMC_of_pc1 varchar(45) NOT NULL DEFAULT '0',
  web1 integer NOT NULL DEFAULT '0',
  Connectivity1 integer NOT NULL DEFAULT '0',
  Contg1 integer NOT NULL DEFAULT '0',
  Others1 integer NOT NULL DEFAULT '0',
  Br_hardware_target integer DEFAULT '0',
  Br_con_target integer DEFAULT '0',
  Br_contg_target integer DEFAULT '0',
  Br_hardware_target_1 integer DEFAULT '0',
  Br_con_target_1 integer DEFAULT '0',
  Br_contg_target_1 integer DEFAULT '0',
  Br_others_target_1 integer DEFAULT '0',
  Br_hardware_target_2 integer DEFAULT '0',
  Br_con_target_2 integer DEFAULT '0',
  Br_contg_target_2 integer DEFAULT '0',
  Br_others_target_2 integer DEFAULT '0',
  Br_hardware_target_3 integer DEFAULT '0',
  Br_con_target_3 integer DEFAULT '0',
  Br_contg_target_3 integer DEFAULT '0',
  Br_others_target_3 integer DEFAULT '0',
  Br_hardware_target_4 integer DEFAULT '0',
  Br_con_target_4 integer DEFAULT '0',
  Br_contg_target_4 integer DEFAULT '0',
  Br_others_target_4 integer DEFAULT '0',
  Br_hardware_target_5 integer DEFAULT '0',
  Br_con_target_5 integer DEFAULT '0',
  Br_contg_target_5 integer DEFAULT '0',
  Br_others_target_5 integer DEFAULT '0',
  Br_others_target integer DEFAULT NULL,
  PRIMARY KEY (sno),
  UNIQUE (Inst_id,smallint)
);


--
-- Dumping data for table `tbl_targetsenet`
--


--
-- Table structure for table `tbl_temp_analysisrpt`
--

DROP TABLE IF EXISTS tbl_temp_analysisrpt;

CREATE TABLE tbl_temp_analysisrpt (
  PTRAINEES_A double precision DEFAULT NULL,
  PSUM_UNITSASSISTED double precision DEFAULT NULL,
  PSUM_PER_REC_CASH_DTM double precision DEFAULT NULL,
  PSUM_PER_REC_ACCRUAL_DTM double precision DEFAULT NULL,
  AUID char(100) NOT NULL DEFAULT '',
  ATRVATID integer DEFAULT NULL,
  Age_Recy double precision DEFAULT NULL,
  yearss varchar(20) NOT NULL DEFAULT '',
  months integer NOT NULL,
  PRIMARY KEY (yearss,AUID,months)
);


--
-- Dumping data for table `tbl_temp_analysisrpt`
--


--
-- Table structure for table `tbl_tooling_otherjob`
--

DROP TABLE IF EXISTS tbl_tooling_otherjob;

CREATE TABLE tbl_tooling_otherjob (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  MONTHS_YEAR varchar(125) NOT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_OTHERJOB_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TOOLING_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT NULL,
  SNO integer NOT NULL ,
  PRIMARY KEY (SNO)
);


--
-- Dumping data for table `tbl_tooling_otherjob`
--

INSERT INTO tbl_tooling_otherjob VALUES ('I1','1','2025-2026','2025-2026-1-20',5,0.34,0.34,48,9.91,9.91,0,0.34,0.34,0,9.32,9.32,1),('I9','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,2),('I4','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.20,0,0.18,0.18,3),('I91','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.85,0.85,0,0.00,0.00,0,1.60,1.60,4),('I4','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.42,0.60,5),('I91','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.89,1.74,0,0.00,0.00,0,4.01,5.61,7),('I1','2','2025-2026','2025-2026-2-20',0,0.00,0.34,0,4.49,14.40,0,0.40,0.74,0,3.48,12.80,9),('I93','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,10),('I5','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.77,0.77,0,0.00,0.00,0,1.20,1.20,12),('I3','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.20,0.20,0,0.00,0.00,0,0.10,0.10,13),('I3','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.70,0.90,0,0.00,0.00,0,0.60,0.70,14),('I9','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,17),('I92','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,18),('I94','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,19),('I94','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,20),('I92','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,21),('I5','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.20,0.97,0,0.00,0.00,0,0.30,1.50,22),('I7','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.00,0.00,20,0.00,0.00,90,7.82,7.82,23),('I7','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,7.82,24),('I93','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,25),('I93','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,0,0.00,0.00,26),('I6','1','2025-2026','2025-2026-1-20',0,0.00,0.00,0,0.66,0.66,0,0.00,0.00,0,0.66,0.66,27),('I6','2','2025-2026','2025-2026-2-20',0,0.00,0.00,0,0.36,1.02,0,0.00,0.00,0,0.36,1.02,28);

--
-- Table structure for table `tbl_tooling_otherjob_copy`
--

DROP TABLE IF EXISTS tbl_tooling_otherjob_copy;

CREATE TABLE tbl_tooling_otherjob_copy (
  INST_ID varchar(50) NOT NULL DEFAULT '',
  MONTHS varchar(50) NOT NULL DEFAULT '',
  YEARS varchar(125) NOT NULL DEFAULT '0',
  MONTHS_YEAR varchar(125) NOT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_OTHERJOB_TARGET integer DEFAULT NULL,
  REV_EAR_CASH_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_CASH_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TOOLING_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TOOLING_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_TOOLING_CUM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_TARGET integer DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_DTM decimal(28,2) DEFAULT NULL,
  REV_EAR_ACCRUAL_PRDTN_OTHERJOB_CUM decimal(28,2) DEFAULT NULL,
  SNO integer NOT NULL DEFAULT '0'
);


--
-- Dumping data for table `tbl_tooling_otherjob_copy`
--


--
-- Table structure for table `tbl_tr_category`
--

DROP TABLE IF EXISTS tbl_tr_category;

CREATE TABLE tbl_tr_category (
  TC_ID integer DEFAULT NULL,
  TC_CAYEGORY text
);


--
-- Dumping data for table `tbl_tr_category`
--

INSERT INTO tbl_tr_category VALUES (1,'Tool Room                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               '),(2,'Research                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                '),(3,'a                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ');

--
-- Table structure for table `tbl_trng_exp_target`
--

DROP TABLE IF EXISTS tbl_trng_exp_target;

CREATE TABLE tbl_trng_exp_target (
  INST_ID char(10) NOT NULL,
  YEARS varchar(125) NOT NULL,
  REV_EARN_CASH integer DEFAULT NULL,
  REV_EARN_ACC integer DEFAULT NULL,
  REV_EXP_CASH integer DEFAULT NULL,
  REV_EXP_ACC integer DEFAULT NULL,
  INC_EXP_CASH integer DEFAULT NULL,
  INC_EXP_ACC integer DEFAULT NULL,
  PER_REC_CASH integer DEFAULT NULL,
  PER_REC_ACC integer DEFAULT NULL,
  CREATION_DATE date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  NJU_TARGET integer DEFAULT NULL,
  TA_TARGET integer DEFAULT NULL,
  BE_BUDGET integer DEFAULT NULL,
  Months integer DEFAULT NULL,
  PRIMARY KEY (YEARS,INST_ID),
  UNIQUE (INST_ID,YEARS,REV_EARN_CASH,REV_EARN_ACC,REV_EXP_CASH,REV_EXP_ACC,INC_EXP_CASH,INC_EXP_ACC,PER_REC_CASH,PER_REC_ACC,CREATION_DATE,NJU_TARGET,TA_TARGET,BE_BUDGET)
);


--
-- Dumping data for table `tbl_trng_exp_target`
--

INSERT INTO tbl_trng_exp_target VALUES ('I1','2025-2026',403,403,403,403,0,0,0,0,'2025-05-30','null',297,4370,0,NULL),('I2','2025-2026',298,298,298,298,0,0,0,0,'2025-05-30','null',165,4329,0,NULL),('I3','2025-2026',252,252,252,252,0,0,0,0,'2025-05-30','null',110,1962,0,NULL),('I4','2025-2026',242,242,242,242,0,0,0,0,'2025-05-30','null',132,2538,0,NULL),('I5','2025-2026',130,130,130,130,0,0,0,0,'2025-05-30','null',110,2537,0,NULL),('I6','2025-2026',379,379,379,379,0,0,0,0,'2025-05-30','null',165,5500,0,NULL),('I7','2025-2026',508,508,508,508,0,0,0,0,'2025-05-30','null',165,5047,0,NULL),('I8','2025-2026',100,100,120,120,-20,-20,0,0,'2025-05-30','null',88,1027,0,NULL),('I9','2025-2026',50,50,100,100,-50,-50,0,0,'2025-05-30','null',55,3935,0,NULL),('I91','2025-2026',416,416,416,416,0,0,0,0,'2025-05-30','null',220,4183,0,NULL),('I92','2025-2026',374,374,374,374,0,0,0,0,'2025-05-30','null',110,515,0,NULL),('I93','2025-2026',150,150,150,150,0,0,0,0,'2025-05-30','null',66,9087,0,NULL),('I94','2025-2026',30,30,100,100,-70,-70,0,0,'2025-05-30','null',55,800,0,NULL);

--
-- Table structure for table `tbl_trng_exp_target_19july10`
--

DROP TABLE IF EXISTS tbl_trng_exp_target_19july10;

CREATE TABLE tbl_trng_exp_target_19july10 (
  INST_ID char(10) DEFAULT NULL,
  YEARS char(10) DEFAULT NULL,
  REV_EARN_CASH integer DEFAULT NULL,
  REV_EARN_ACC integer DEFAULT NULL,
  REV_EXP_CASH integer DEFAULT NULL,
  REV_EXP_ACC integer DEFAULT NULL,
  INC_EXP_CASH integer DEFAULT NULL,
  INC_EXP_ACC integer DEFAULT NULL,
  PER_REC_CASH integer DEFAULT NULL,
  PER_REC_ACC integer DEFAULT NULL,
  CREATION_DATE date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  NJU_TARGET integer DEFAULT NULL,
  TA_TARGET integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_trng_exp_target_19july10`
--


--
-- Table structure for table `tbl_trng_exp_target_backup`
--

DROP TABLE IF EXISTS tbl_trng_exp_target_backup;

CREATE TABLE tbl_trng_exp_target_backup (
  INST_ID char(10) NOT NULL,
  YEARS varchar(125) NOT NULL,
  REV_EARN_CASH integer DEFAULT NULL,
  REV_EARN_ACC integer DEFAULT NULL,
  REV_EXP_CASH integer DEFAULT NULL,
  REV_EXP_ACC integer DEFAULT NULL,
  INC_EXP_CASH integer DEFAULT NULL,
  INC_EXP_ACC integer DEFAULT NULL,
  PER_REC_CASH integer DEFAULT NULL,
  PER_REC_ACC integer DEFAULT NULL,
  CREATION_DATE date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  NJU_TARGET integer DEFAULT NULL,
  TA_TARGET integer DEFAULT NULL,
  BE_BUDGET integer DEFAULT NULL,
  Months integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_trng_exp_target_backup`
--


--
-- Table structure for table `tbl_trng_exp_target_bk`
--

DROP TABLE IF EXISTS tbl_trng_exp_target_bk;

CREATE TABLE tbl_trng_exp_target_bk (
  INST_ID char(10) NOT NULL,
  YEARS varchar(125) NOT NULL,
  REV_EARN_CASH integer DEFAULT NULL,
  REV_EARN_ACC integer DEFAULT NULL,
  REV_EXP_CASH integer DEFAULT NULL,
  REV_EXP_ACC integer DEFAULT NULL,
  INC_EXP_CASH integer DEFAULT NULL,
  INC_EXP_ACC integer DEFAULT NULL,
  PER_REC_CASH integer DEFAULT NULL,
  PER_REC_ACC integer DEFAULT NULL,
  CREATION_DATE date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  NJU_TARGET integer DEFAULT NULL,
  TA_TARGET integer DEFAULT NULL,
  BE_BUDGET integer DEFAULT NULL,
  Months integer DEFAULT NULL,
  PRIMARY KEY (YEARS,INST_ID),
  UNIQUE (INST_ID,YEARS,REV_EARN_CASH,REV_EARN_ACC,REV_EXP_CASH,REV_EXP_ACC,INC_EXP_CASH,INC_EXP_ACC,PER_REC_CASH,PER_REC_ACC,CREATION_DATE,NJU_TARGET,TA_TARGET,BE_BUDGET)
);


--
-- Dumping data for table `tbl_trng_exp_target_bk`
--


--
-- Table structure for table `tbl_trng_exp_target_bkp`
--

DROP TABLE IF EXISTS tbl_trng_exp_target_bkp;

CREATE TABLE tbl_trng_exp_target_bkp (
  INST_ID char(10) NOT NULL,
  YEARS varchar(125) NOT NULL,
  REV_EARN_CASH integer DEFAULT NULL,
  REV_EARN_ACC integer DEFAULT NULL,
  REV_EXP_CASH integer DEFAULT NULL,
  REV_EXP_ACC integer DEFAULT NULL,
  INC_EXP_CASH integer DEFAULT NULL,
  INC_EXP_ACC integer DEFAULT NULL,
  PER_REC_CASH integer DEFAULT NULL,
  PER_REC_ACC integer DEFAULT NULL,
  CREATION_DATE date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  NJU_TARGET integer DEFAULT NULL,
  TA_TARGET integer DEFAULT NULL,
  BE_BUDGET integer DEFAULT NULL,
  Months integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_trng_exp_target_bkp`
--


--
-- Table structure for table `tbl_trng_exp_target_copy`
--

DROP TABLE IF EXISTS tbl_trng_exp_target_copy;

CREATE TABLE tbl_trng_exp_target_copy (
  INST_ID char(10) NOT NULL,
  YEARS varchar(125) NOT NULL,
  REV_EARN_CASH integer DEFAULT NULL,
  REV_EARN_ACC integer DEFAULT NULL,
  REV_EXP_CASH integer DEFAULT NULL,
  REV_EXP_ACC integer DEFAULT NULL,
  INC_EXP_CASH integer DEFAULT NULL,
  INC_EXP_ACC integer DEFAULT NULL,
  PER_REC_CASH integer DEFAULT NULL,
  PER_REC_ACC integer DEFAULT NULL,
  CREATION_DATE date DEFAULT NULL,
  SISI_NM char(50) DEFAULT NULL,
  NJU_TARGET integer DEFAULT NULL,
  TA_TARGET integer DEFAULT NULL,
  BE_BUDGET integer DEFAULT NULL,
  Months integer DEFAULT NULL
);


--
-- Dumping data for table `tbl_trng_exp_target_copy`
--


--
-- Table structure for table `tbl_uploadfile`
--

DROP TABLE IF EXISTS tbl_uploadfile;

CREATE TABLE tbl_uploadfile (
  id integer NOT NULL ,
  fileName varchar(145) NOT NULL,
  name varchar(245) NOT NULL,
  date_of_birth date NOT NULL,
  Designation varchar(245) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name,Designation)
);


--
-- Dumping data for table `tbl_uploadfile`
--


--
-- Table structure for table `tbl_vendor`
--

DROP TABLE IF EXISTS tbl_vendor;

CREATE TABLE tbl_vendor (
  sno integer NOT NULL ,
  InstId varchar(45) NOT NULL,
  months integer NOT NULL,
  smallint varchar(45) NOT NULL,
  vdp_conducted integer NOT NULL,
  unit_participated integer NOT NULL,
  Amount_Disbursed integer NOT NULL,
  SVDPvdp_conducted integer NOT NULL,
  SVDPunit_participated integer NOT NULL,
  SVDPAmount_Disbursed integer NOT NULL,
  user_date varchar(125) NOT NULL,
  cum_vdp_conducted integer NOT NULL,
  cum_unit_participated integer NOT NULL,
  cum_Amount_Disbursed integer NOT NULL,
  SVDPcum_vdp_conducted integer NOT NULL,
  SVDPcum_unit_participated integer NOT NULL,
  SVDPcum_Amount_Disbursed integer NOT NULL,
  Totaltarget integer NOT NULL,
  totaltargett integer DEFAULT NULL,
  PRIMARY KEY (sno),
  UNIQUE (InstId,months,smallint)
);


--
-- Dumping data for table `tbl_vendor`
--


--
-- Table structure for table `tbl_workshop`
--

DROP TABLE IF EXISTS tbl_workshop;

CREATE TABLE tbl_workshop (
  sno integer NOT NULL ,
  Instid varchar(45) NOT NULL,
  smallint varchar(45) NOT NULL,
  months integer NOT NULL,
  No_Of_unit_benefitted integer NOT NULL,
  No_jobs_underTaken integer NOT NULL,
  No_Trainees_Trained integer NOT NULL,
  No_jobs_Completed integer NOT NULL,
  No_units_Registered integer NOT NULL,
  Capacity_Assessment integer NOT NULL,
  user_date varchar(154) NOT NULL,
  cum_No_Of_unit_benefitted integer NOT NULL,
  cum_No_jobs_underTaken integer NOT NULL,
  cum_No_Trainees_Trained integer NOT NULL,
  cum_No_jobs_Completed integer NOT NULL,
  cum_No_units_Registered integer NOT NULL,
  cum_Capacity_Assessment integer NOT NULL,
  target integer NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (Instid,smallint,months)
);


--
-- Dumping data for table `tbl_workshop`
--


--
-- Table structure for table `temp`
--

DROP TABLE IF EXISTS temp;

CREATE TABLE temp (
  USEROID char(6) DEFAULT NULL,
  MODULEOID char(6) DEFAULT NULL,
  USERPRIVOID char(6) DEFAULT NULL,
  MODULEID char(6) DEFAULT NULL
);


--
-- Dumping data for table `temp`
--


--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS test;

CREATE TABLE test (
  username varchar(20) NOT NULL DEFAULT ''
);


--
-- Dumping data for table `test`
--

INSERT INTO test VALUES ('rajesh'),('George'),('Vikas'),('Prakash'),('Mahesh');

--
-- Table structure for table `tl_institute`
--

DROP TABLE IF EXISTS tl_institute;

CREATE TABLE tl_institute (
  ID integer NOT NULL,
  INST_ID char(10) NOT NULL,
  INST_NAME char(200) DEFAULT NULL,
  INST_ADDRESS char(200) DEFAULT NULL,
  PRIMARY KEY (INST_ID,ID)
);


--
-- Dumping data for table `tl_institute`
--

INSERT INTO tl_institute VALUES (1,'I1','Bhiwadi','A'),(2,'I2','Rohtak','A'),(3,'I3','Baddi','A'),(4,'I4','Sitarganj','A'),(5,'I5','Puducherry','A'),(6,'I6','Durg','A'),(7,'I7','Visakhapatnam','A'),(8,'I8','Imphal','A'),(9,'I9','Grnoida','A'),(10,'I91','Bhopal','A'),(11,'I92','Kanpur','A'),(12,'I93','Bangalore','A'),(13,'I94','Patna','A');

--
-- Table structure for table `totalinst`
--

DROP TABLE IF EXISTS totalinst;

CREATE TABLE totalinst (
  name varchar(122) DEFAULT NULL
);


--
-- Dumping data for table `totalinst`
--

INSERT INTO totalinst VALUES ('TC-Bhiwadi'),('TC-Rohtak'),('TC-Baddi'),('TC-Sitarganj'),('TC-Puducherry'),('TC-Durg'),('TC-Visakhapatnam'),('TC-Imphal'),('TC-Grnoida'),('TC-Bhopal'),('TC-Kanpur'),('TC-Bangalore'),('TC-Patna');

--
-- Temporary table structure for view `trainee_trainedd`
--

DROP TABLE IF EXISTS trainee_trainedd;


--
-- Table structure for table `user_cr_mapping`
--

DROP TABLE IF EXISTS user_cr_mapping;

CREATE TABLE user_cr_mapping (
  USER_ID varchar(25) DEFAULT NULL,
  INST_ID varchar(10) DEFAULT NULL,
  TR_CAT_ID integer DEFAULT NULL
);


--
-- Dumping data for table `user_cr_mapping`
--

INSERT INTO user_cr_mapping VALUES ('admin','SU',NULL),('puri','SU',NULL),('sarita737','SU',NULL),('rajendra','SU',NULL),('svsharma','SU',NULL);

--
-- Table structure for table `user_di_mapping`
--

DROP TABLE IF EXISTS user_di_mapping;

CREATE TABLE user_di_mapping (
  USER_ID char(25) DEFAULT NULL,
  INST_ID char(10) DEFAULT NULL,
  TR_CAT_ID integer DEFAULT NULL
);


--
-- Dumping data for table `user_di_mapping`
--

INSERT INTO user_di_mapping VALUES ('SEC-MSME','SU',NULL);

--
-- Table structure for table `user_id_mapping`
--

DROP TABLE IF EXISTS user_id_mapping;

CREATE TABLE user_id_mapping (
  USER_ID char(25) DEFAULT NULL,
  INST_ID char(10) DEFAULT NULL,
  TR_CAT_ID integer DEFAULT NULL
);


--
-- Dumping data for table `user_id_mapping`
--

INSERT INTO user_id_mapping VALUES ('TC-Bhiwadi','I1',1),('TC-Rohtak','I2',1),('TC-Baddi','I3',1),('TC-Sitarganj','I4',1),('TC-Puducherry','I5',1),('TC-Durg','I6',1),('TC-Visakhapatnam','I7',1),('TC-Imphal','I8',1),('TC-Grnoida','I9',1),('TC-Bhopal','I91',1),('TC-Kanpur','I92',1),('TC-Bangalore','I93',1),('admin','SU',NULL),('ANIL','SU',NULL),('VINEET','SU',NULL),('TC-Patna','I94',1);

--
-- Table structure for table `user_old_pass_toolroom`
--

DROP TABLE IF EXISTS user_old_pass_toolroom;

CREATE TABLE user_old_pass_toolroom (
  sno integer NOT NULL ,
  inst varchar(45) NOT NULL,
  password varchar(100) NOT NULL,
  no_of_changes integer NOT NULL,
  time varchar(45) NOT NULL,
  user_ip varchar(45) NOT NULL,
  PRIMARY KEY (sno),
  UNIQUE (sno)
);


--
-- Dumping data for table `user_old_pass_toolroom`
--

INSERT INTO user_old_pass_toolroom VALUES (1,'admin','731a0a7a77ea7e72ca366986e589e13ad065b834805d0739200f0836718175ab',1,'19/05/2025 11:27:53','127.0.0.1'),(2,'TC-Bhiwadi','beae3e0b95d1538f46c9fe4f169aca869b3b263f5617f7deeda16387e1551d8b',1,'19/05/2025 11:27:53','127.0.0.1'),(3,'TC-Rohtak','a14681967df548e43f0af40e84abf80e75287eec5eba24b288e0bef376e0fe28',1,'19/05/2025 11:27:53','127.0.0.1'),(4,'TC-Baddi','62df4eef271e5a0eaf413124a289a145009fb295c69a546e72d69b0abe852fc0',1,'19/05/2025 11:27:53','127.0.0.1'),(5,'TC-Sitarganj','4f2301948a7fdd9f7a5968359edcadbccaf7940b886a59776af866906f3f52af',1,'19/05/2025 11:27:53','127.0.0.1'),(6,'TC-Puducherry','bc79656762af188746ea51d621359fd7d838732c3a26e8024b53167f9be0ccd9',1,'19/05/2025 11:27:53','127.0.0.1'),(7,'TC-Durg','5da69a390bcae55b411dea05b3fa8f3e8b4918283b524403d15014ae29fa3cf8',1,'19/05/2025 11:27:53','127.0.0.1'),(8,'TC-Visakhapatnam','af12f5f42ff6df0149562645b8fc06d3a36c48e2009c591079366de0cc90958d',1,'19/05/2025 11:27:53','127.0.0.1'),(9,'TC-Imphal','3703b46e4350670da179c997ead8beaf747860e21358c1814049a4a2ff2309d4',1,'19/05/2025 11:27:53','127.0.0.1'),(10,'TC-Grnoida','f7cbb1ea40826b8f343333c897120d105ee1693d5d698921ac0125d7167fd9ca',1,'19/05/2025 11:27:53','127.0.0.1'),(11,'TC-Bhopal','78b9e4ec1ae56fc3014432708f23d4689d89a892f14c8e2d0aa5cb32472d361c',1,'19/05/2025 11:27:53','127.0.0.1'),(12,'TC-Kanpur','d9eb50fd1adaa3fc53c7d7819aa747f495d130961199d7e46bd7e6672945b53e',1,'19/05/2025 11:27:53','127.0.0.1'),(13,'TC-Bangalore','35a58602852dc04a987b210f293ee66a5e93df524699d4b48866d73181fc65cd',1,'19/05/2025 11:27:53','127.0.0.1'),(14,'ANIL','fd00e60789de65f5db638ad739b7be20e6f003b3385707d3bc7bfdc0c3e47fce',1,'19/05/2025 11:27:53','127.0.0.1'),(15,'VINEET','3ae433f65bf5fabfafa74c90a275647382ba9c1a499509d4d2c3e5c6cf659264',1,'19/05/2025 11:27:53','127.0.0.1'),(16,'TC-Patna','bea0737e402e6026ee02f4613a710b9498ded633e0e5f2624fd229c4bb878d21',1,'19/05/2025 11:27:53','127.0.0.1'),(17,'TC-Rohtak','e82200398fdaa25666851811472aa201f8a11db392f9a9535ea01ea94dfca6c4',2,'29/05/2025 15:09:16','117.251.78.2');

--
-- Temporary table structure for view `v_caes_indiviual`
--

DROP TABLE IF EXISTS v_caes_indiviual;


--
-- Temporary table structure for view `v_carryforwarddd`
--

DROP TABLE IF EXISTS v_carryforwarddd;


--
-- Temporary table structure for view `v_cat`
--

DROP TABLE IF EXISTS v_cat;


--
-- Temporary table structure for view `v_court_cases`
--

DROP TABLE IF EXISTS v_court_cases;


--
-- Temporary table structure for view `v_financial_target`
--

DROP TABLE IF EXISTS v_financial_target;


--
-- Temporary table structure for view `v_graphdata`
--

DROP TABLE IF EXISTS v_graphdata;


--
-- Temporary table structure for view `v_physical`
--

DROP TABLE IF EXISTS v_physical;


--
-- Temporary table structure for view `v_physical_new`
--

DROP TABLE IF EXISTS v_physical_new;


--
-- Temporary table structure for view `v_physical_old`
--

DROP TABLE IF EXISTS v_physical_old;


--
-- Temporary table structure for view `v_rpt_nalysis_final`
--

DROP TABLE IF EXISTS v_rpt_nalysis_final;


--
-- Temporary table structure for view `v_rpt_peranalysis_o`
--

DROP TABLE IF EXISTS v_rpt_peranalysis_o;


--
-- Temporary table structure for view `v_rpt_performanceanalysis_o`
--

DROP TABLE IF EXISTS v_rpt_performanceanalysis_o;


--
-- Temporary table structure for view `v_rptanalysis_part`
--

DROP TABLE IF EXISTS v_rptanalysis_part;


--
-- Temporary table structure for view `v_senet_final_report`
--

DROP TABLE IF EXISTS v_senet_final_report;


--
-- Temporary table structure for view `v_test`
--

DROP TABLE IF EXISTS v_test;


--
-- Temporary table structure for view `v_trrpt`
--

DROP TABLE IF EXISTS v_trrpt;


--
-- Temporary table structure for view `v_workshop_report_data`
--

DROP TABLE IF EXISTS v_workshop_report_data;


--
-- Table structure for table `vendor_audit`
--

DROP TABLE IF EXISTS vendor_audit;

CREATE TABLE vendor_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon date DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `vendor_audit`
--


--
-- Temporary table structure for view `view_emp`
--

DROP TABLE IF EXISTS view_emp;


--
-- Temporary table structure for view `view_emp_detail`
--

DROP TABLE IF EXISTS view_emp_detail;


--
-- Table structure for table `workshop_audit`
--

DROP TABLE IF EXISTS workshop_audit;

CREATE TABLE workshop_audit (
  id integer NOT NULL ,
  INST_ID varchar(51) NOT NULL,
  MONTHS varchar(50) NOT NULL,
  YEARS varchar(50) NOT NULL,
  changedon date DEFAULT NULL,
  action varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Dumping data for table `workshop_audit`
--


--
-- Final view structure for view `abc`
--


--
-- Final view structure for view `abcd`
--


--
-- Final view structure for view `rpt_target`
--


--
-- Final view structure for view `rpt_uns_bal`
--


--
-- Final view structure for view `trainee_trainedd`
--


--
-- Final view structure for view `v_caes_indiviual`
--


--
-- Final view structure for view `v_carryforwarddd`
--


--
-- Final view structure for view `v_cat`
--


--
-- Final view structure for view `v_court_cases`
--


--
-- Final view structure for view `v_financial_target`
--


--
-- Final view structure for view `v_graphdata`
--


--
-- Final view structure for view `v_physical`
--


--
-- Final view structure for view `v_physical_new`
--


--
-- Final view structure for view `v_physical_old`
--


--
-- Final view structure for view `v_rpt_nalysis_final`
--


--
-- Final view structure for view `v_rpt_peranalysis_o`
--


--
-- Final view structure for view `v_rpt_performanceanalysis_o`
--


--
-- Final view structure for view `v_rptanalysis_part`
--


--
-- Final view structure for view `v_senet_final_report`
--


--
-- Final view structure for view `v_test`
--


--
-- Final view structure for view `v_trrpt`
--


--
-- Final view structure for view `v_workshop_report_data`
--


--
-- Final view structure for view `view_emp`
--


--
-- Final view structure for view `view_emp_detail`
--



-- Dump completed on 2025-06-19 15:56:01
-- ===== End of migration =====
