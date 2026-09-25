import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './MprReport.css';
import { parseAch, safeHtml } from '../../utils/achievement';

/* ─── helpers ─────────────────────────────────────────── */
const n   = v => parseFloat(v) || 0;
const f2  = v => n(v).toFixed(2);
const f0  = v => Math.round(n(v));
const pct = (num, den) => n(den) > 0 ? ((n(num) / n(den)) * 100).toFixed(2) : '-';
const tgt = (v, dec = 2) => n(v) > 0 ? n(v).toFixed(dec) : n(v).toFixed(dec);

/* ─── JSX helpers — one lettered section = one independent table ─── */

/* Section wrapper: letter + title bar, then whatever table the caller supplies */
function Block({ letter, title, note, children }) {
  return (
    <section className="mpr-block" id={letter ? `mpr-sec-${letter}` : undefined}>
      {title && (
        <div className="mpr-sec-hdr">
          {letter && <span className="mpr-sec-letter">{letter}</span>}
          <span className="mpr-sec-title">{title}</span>
          {note && <span className="mpr-sec-note">{note}</span>}
        </div>
      )}
      {children}
    </section>
  );
}

/* Standard "Target / During / Cumulative / %age" head, spanning `labelCols` label columns */
function StatHead({ labelCols = 1, labelText = 'Particulars' }) {
  return (
    <thead>
      <tr>
        <th className="mpr-col-hdr" colSpan={labelCols} rowSpan={2} style={{ minWidth: 220 }}>{labelText}</th>
        <th className="mpr-col-hdr" rowSpan={2} style={{ width: 80 }}>Target</th>
        <th className="mpr-col-hdr" colSpan={3}>Achievement</th>
      </tr>
      <tr>
        <th className="mpr-col-hdr" style={{ width: 95 }}>During the<br />month</th>
        <th className="mpr-col-hdr" style={{ width: 100 }}>Cumulative<br />upto the month</th>
        <th className="mpr-col-hdr" style={{ width: 95 }}>Cumulative %age<br />w.r.t. Annual target</th>
      </tr>
    </thead>
  );
}

/* Bifurcation section (C, D, E, F, G): categories as columns, During / Cumulative as rows.
   cols = [{ label, dtm, cum }] */
function BifurTable({ cols, total = true }) {
  const sum = key => cols.reduce((s, c) => s + n(c[key]), 0);
  return (
    <table className={`mpr-tbl mpr-bifur${cols.length === 1 ? ' mpr-bifur-narrow' : ''}`}>
      <thead>
        <tr>
          <th className="mpr-col-hdr mpr-bifur-lbl">Trainees trained</th>
          {cols.map(c => <th key={c.label} className="mpr-col-hdr mpr-bifur-th">{c.label}</th>)}
          {total && <th className="mpr-col-hdr mpr-bifur-th">Total</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="mpr-part">During the month</td>
          {cols.map(c => <td key={c.label} className="mpr-dtm mpr-num-c">{f0(c.dtm)}</td>)}
          {total && <td className="mpr-num-c mpr-total-cell">{f0(sum('dtm'))}</td>}
        </tr>
        <tr className="mpr-row-alt">
          <td className="mpr-part">Cumulative (up to the month)</td>
          {cols.map(c => <td key={c.label} className="mpr-cum mpr-num-c">{f0(c.cum)}</td>)}
          {total && <td className="mpr-num-c mpr-total-cell">{f0(sum('cum'))}</td>}
        </tr>
      </tbody>
    </table>
  );
}

const SECTIONS = [
  ['A', 'Financial'], ['B', 'Physical'], ['C', 'Category'], ['D', 'Gender'], ['E', 'Qualification'],
  ['F', 'Age group'], ['G', 'Persons with disability'], ['H', 'Budget'], ['I', 'Staff strength'],
  ['J', 'Machine procured'], ['K', 'Visits'], ['L', 'Significant achievements'], ['M', 'Short falls'],
  ['N', 'Promotional activities'], ['O', 'NSQF'], ['P', 'Placement'],
];

const MONTH_NAMES = ['April','May','June','July','August','September','October','November','December','January','February','March'];

/* ─── Main component ─────────────────────────────────── */
export default function MprReport() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { instId, instName, month, monthName, year } = state || {};

  const [fin, setFin] = useState(null);
  const [phy, setPhy] = useState(null);
  const [bud, setBud] = useState(null);
  const [pla, setPla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!instId || !month || !year) { setLoading(false); return; }
    const params = { instId, month, year };
    Promise.all([
      api.get('/entry/financial/load', { params }),
      api.get('/entry/physical/load',  { params }),
      api.get('/entry/budget/load',    { params }),
      api.get('/entry/placement/load', { params }),
    ]).then(([fR, pR, bR, plR]) => {
      setFin(fR.data?.data);
      setPhy(pR.data?.data);
      setBud(bR.data?.data);
      setPla(plR.data?.data);
    }).catch(() => setError('Failed to load report data from server.'))
      .finally(() => setLoading(false));
  }, [instId, month, year]);

  /* ── Print: strip the app shell so only the report prints (button + Ctrl+P) ── */
  useEffect(() => {
    const on  = () => document.body.classList.add('mpr-printing');
    const off = () => document.body.classList.remove('mpr-printing');
    window.addEventListener('beforeprint', on);
    window.addEventListener('afterprint', off);
    return () => {
      window.removeEventListener('beforeprint', on);
      window.removeEventListener('afterprint', off);
      off();
    };
  }, []);

  /* ── guard ─────────────────────────────────────── */
  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading report…</div>;
  if (error)   return <div style={{ padding: 40, color: 'red' }}>{error}</div>;
  if (!instId) return <div style={{ padding: 40 }}>No selection. Please go back and choose institute/month/year.</div>;

  /* ══════════════════════════════════════════════════
     FINANCIAL computed values
     ══════════════════════════════════════════════════ */
  const finEx   = fin?.existing || {};
  const finPrev = fin?.prevCum  || {};
  const finTgt  = fin?.targets  || {};

  /* Cash Revenue Earning */
  const cTrngDtm = n(finEx.cashTraining);   const cTrngCum = n(finPrev.cashTraining)  + cTrngDtm;
  const cToolDtm = n(finEx.cashTooling);    const cToolCum = n(finPrev.cashTooling)   + cToolDtm;
  const cJobDtm  = n(finEx.cashOtherJob);   const cJobCum  = n(finPrev.cashOtherJob)  + cJobDtm;
  const cConsDtm = n(finEx.cashConsult);    const cConsCum = n(finPrev.cashConsult)   + cConsDtm;
  const cTestDtm = n(finEx.cashTesting);    const cTestCum = n(finPrev.cashTesting)   + cTestDtm;
  const cMiscDtm = n(finEx.cashMisc);       const cMiscCum = n(finPrev.cashMisc)      + cMiscDtm;
  const cTotDtm  = cTrngDtm + cToolDtm + cJobDtm + cConsDtm + cTestDtm + cMiscDtm;
  const cTotCum  = cTrngCum + cToolCum + cJobCum + cConsCum + cTestCum + cMiscCum;
  const cTotTgt  = n(finTgt.cashTotal);

  /* Accrual Revenue Earning */
  const aTrngDtm = n(finEx.accrualTraining);  const aTrngCum = n(finPrev.accrualTraining)  + aTrngDtm;
  const aToolDtm = n(finEx.accrualTooling);   const aToolCum = n(finPrev.accrualTooling)   + aToolDtm;
  const aJobDtm  = n(finEx.accrualOtherJob);  const aJobCum  = n(finPrev.accrualOtherJob)  + aJobDtm;
  const aConsDtm = n(finEx.accrualConsult);   const aConsCum = n(finPrev.accrualConsult)   + aConsDtm;
  const aTestDtm = n(finEx.accrualTesting);   const aTestCum = n(finPrev.accrualTesting)   + aTestDtm;
  const aMiscDtm = n(finEx.accrualMisc);      const aMiscCum = n(finPrev.accrualMisc)      + aMiscDtm;
  const aTotDtm  = aTrngDtm + aToolDtm + aJobDtm + aConsDtm + aTestDtm + aMiscDtm;
  const aTotCum  = aTrngCum + aToolCum + aJobCum + aConsCum + aTestCum + aMiscCum;
  const aTotTgt  = n(finTgt.accrualTotal);

  /* Revenue Expenditure */
  const revExpCDtm = n(finEx.revExpCash);     const revExpCCum = n(finPrev.revExpCash)    + revExpCDtm;
  const revExpADtm = n(finEx.revExpAccrual);  const revExpACum = n(finPrev.revExpAccrual) + revExpADtm;
  const revExpCTgt = n(finTgt.revExpCash);    const revExpATgt = n(finTgt.revExpAccrual);

  /* Excess of Income over Expenditure */
  const exCDtm = cTotDtm - revExpCDtm;  const exCCum = cTotCum - revExpCCum;
  const exADtm = aTotDtm - revExpADtm;  const exACum = aTotCum - revExpACum;

  /* %age Recovery */
  const perRecCDtm = n(finEx.perRecCashAch);     const perRecCTgt = n(finTgt.perRecCash);
  const perRecADtm = n(finEx.perRecAccrualAch);  const perRecATgt = n(finTgt.perRecAccrual);

  /* ══════════════════════════════════════════════════
     PHYSICAL computed values
     ══════════════════════════════════════════════════ */
  const phyEx   = phy?.existing || {};
  const phyPrev = phy?.prevCum  || {};
  const phyTgt  = phy?.targets  || {};

  const twMsmeNosDtm = n(phyEx.twMsmeNos);    const twMsmeNosCum = n(phyPrev.twMsmeNos)    + twMsmeNosDtm;
  const twMsmeValDtm = n(phyEx.twMsmeValues); const twMsmeValCum = n(phyPrev.twMsmeValues) + twMsmeValDtm;
  const twOthNosDtm  = n(phyEx.twOtherNos);   const twOthNosCum  = n(phyPrev.twOtherNos)   + twOthNosDtm;
  const twOthValDtm  = n(phyEx.twOtherValues);const twOthValCum  = n(phyPrev.twOtherValues)+ twOthValDtm;

  const ojwMsmeNosDtm = n(phyEx.ojwMsmeNos);    const ojwMsmeNosCum = n(phyPrev.ojwMsmeNos)    + ojwMsmeNosDtm;
  const ojwMsmeValDtm = n(phyEx.ojwMsmeValues); const ojwMsmeValCum = n(phyPrev.ojwMsmeValues) + ojwMsmeValDtm;
  const ojwOthNosDtm  = n(phyEx.ojwOtherNos);   const ojwOthNosCum  = n(phyPrev.ojwOtherNos)   + ojwOthNosDtm;
  const ojwOthValDtm  = n(phyEx.ojwOtherValues);const ojwOthValCum  = n(phyPrev.ojwOtherValues)+ ojwOthValDtm;

  const msmeConsDtm = n(phyEx.msmeCons);  const msmeConsCum = n(phyPrev.msmeCons)  + msmeConsDtm;
  const othConsDtm  = n(phyEx.otherCons); const othConsCum  = n(phyPrev.otherCons) + othConsDtm;
  const anyOthDtm   = n(phyEx.anyOther);  const anyOthCum   = n(phyPrev.anyOther)  + anyOthDtm;

  const phyNosToTDtm = twMsmeNosDtm + twOthNosDtm + ojwMsmeNosDtm + ojwOthNosDtm + msmeConsDtm + othConsDtm + anyOthDtm;
  const phyNosToTCum = twMsmeNosCum + twOthNosCum + ojwMsmeNosCum + ojwOthNosCum + msmeConsCum + othConsCum + anyOthCum;
  const phyNosToTTgt = n(phyTgt.phyTotalNos);
  const phyValToTDtm = twMsmeValDtm + twOthValDtm + ojwMsmeValDtm + ojwOthValDtm;
  const phyValToTCum = twMsmeValCum + twOthValCum + ojwMsmeValCum + ojwOthValCum;

  /* Training */
  const ltcCourses  = Array.isArray(phyEx.ltcCourses) ? phyEx.ltcCourses : [];
  // LTC cumulative is the institute-entered course cumulative (legacy form), not a sum of months
  const ltcTotDtm   = n(phyEx.ltcTotal);
  const ltcTotCum   = phyEx.ltcCumTotal != null ? n(phyEx.ltcCumTotal) : n(phyPrev.ltcTotal) + ltcTotDtm;
  const stmNocDtm   = n(phyEx.stmNocComp);    const stmNocCum   = n(phyPrev.stmNocComp)  + stmNocDtm;
  const stmNottDtm  = n(phyEx.stmNottComp);   const stmNottCum  = n(phyPrev.stmNottComp) + stmNottDtm;
  const trngOthDtm  = n(phyEx.trngOther);      const trngOthCum  = n(phyPrev.trngOther)   + trngOthDtm;
  const trngNocDtm  = n(phyEx.trngTotalNoc);  const trngNocCum  = n(phyPrev.trngTotalNoc) + trngNocDtm;
  const trngNotDtm  = n(phyEx.trngTotalNot);  const trngNotCum  = ltcTotCum + stmNottCum + trngOthCum;
  const semNosDtm   = n(phyEx.seminarsNos);    const semNosCum   = n(phyPrev.seminarsNos)  + semNosDtm;
  const semPtsDtm   = n(phyEx.seminarsPts);    const semPtsCum   = n(phyPrev.seminarsPts)  + semPtsDtm;
  const trngNotTgt  = n(phyTgt.trngTotalNot);

  /* Category (C) */
  const genDtm = n(phyEx.gen); const genCum = n(phyPrev.gen) + genDtm;
  const scDtm  = n(phyEx.sc);  const scCum  = n(phyPrev.sc)  + scDtm;
  const stDtm  = n(phyEx.st);  const stCum  = n(phyPrev.st)  + stDtm;
  const obcDtm = n(phyEx.obc); const obcCum = n(phyPrev.obc) + obcDtm;
  const minDtm = n(phyEx.min); const minCum = n(phyPrev.min) + minDtm;

  /* Gender (D) */
  const menDtm   = n(phyEx.men);         const menCum   = n(phyPrev.men)         + menDtm;
  const wmnDtm   = n(phyEx.wmn);         const wmnCum   = n(phyPrev.wmn)         + wmnDtm;
  const transDtm = n(phyEx.transgender); const transCum = n(phyPrev.transgender) + transDtm;

  /* Qualification (E) */
  const thFaDtm = n(phyEx.thFail);      const thFaCum = n(phyPrev.thFail)      + thFaDtm;
  const thPaDtm = n(phyEx.thPass);      const thPaCum = n(phyPrev.thPass)      + thPaDtm;
  const twlDtm  = n(phyEx.twelfth);     const twlCum  = n(phyPrev.twelfth)     + twlDtm;
  const itiDtm  = n(phyEx.iti);         const itiCum  = n(phyPrev.iti)         + itiDtm;
  const dipDtm  = n(phyEx.diploma);     const dipCum  = n(phyPrev.diploma)     + dipDtm;
  const gntDtm  = n(phyEx.gradNonTech); const gntCum  = n(phyPrev.gradNonTech) + gntDtm;
  const gtDtm   = n(phyEx.gradTech);    const gtCum   = n(phyPrev.gradTech)    + gtDtm;
  const pgntDtm = n(phyEx.pgNonTech);   const pgntCum = n(phyPrev.pgNonTech)   + pgntDtm;
  const pgtDtm  = n(phyEx.pgTech);      const pgtCum  = n(phyPrev.pgTech)      + pgtDtm;
  const phdDtm  = n(phyEx.phdMhil);     const phdCum  = n(phyPrev.phdMhil)     + phdDtm;

  /* Age (F) */
  const a15Dtm = n(phyEx.a1520);   const a15Cum = n(phyPrev.a1520)   + a15Dtm;
  const a21Dtm = n(phyEx.a2125);   const a21Cum = n(phyPrev.a2125)   + a21Dtm;
  const a26Dtm = n(phyEx.a2630);   const a26Cum = n(phyPrev.a2630)   + a26Dtm;
  const a31Dtm = n(phyEx.a3140);   const a31Cum = n(phyPrev.a3140)   + a31Dtm;
  const abvDtm = n(phyEx.above40); const abvCum = n(phyPrev.above40) + abvDtm;

  /* PH (G) */
  const phTrDtm = n(phyEx.ph); const phTrCum = n(phyPrev.ph) + phTrDtm;

  /* ══════════════════════════════════════════════════
     BUDGET computed values
     ══════════════════════════════════════════════════ */
  const budEx   = bud?.existing || {};
  const budPrev = bud?.prevCum  || {};

  const cfAmt = n(budEx.cfAmount); const cfDtm = n(budEx.cfDtm); const cfCum  = n(budPrev.cfCum)  + cfDtm; const cfBal = cfAmt - cfCum;
  const giaAmt = n(budEx.giaAmount); const giaDtm = n(budEx.giaDtm); const giaCum = n(budPrev.giaCum) + giaDtm; const giaBal = giaAmt - giaCum;
  const budTotAmt = cfAmt + giaAmt; const budTotDtm = cfDtm + giaDtm; const budTotCum = cfCum + giaCum; const budTotBal = cfBal + giaBal;
  const machDtm = n(budEx.machineDtm); const machCum = n(budPrev.machineCum) + machDtm;

  const ssA = n(budEx.ssA); const posA = n(budEx.posA);
  const ssB = n(budEx.ssB); const posB = n(budEx.posB);
  const ssC = n(budEx.ssC); const posC = n(budEx.posC);
  const ssD = n(budEx.ssD); const posD = n(budEx.posD);

  const achData     = parseAch(budEx.sigAchiev);
  const detailVisit = budEx.detailVisit || '';
  const shortFalls  = budEx.shortFalls  || '';
  const promoActiv  = budEx.promoActiv  || '';

  /* ══════════════════════════════════════════════════
     PLACEMENT computed values
     ══════════════════════════════════════════════════ */
  const plaEx   = pla?.existing || {};
  const plaPrev = pla?.prevCum  || {};

  const nsqfCDtm = n(plaEx.nsqfCom);  const nsqfCCum = n(plaPrev.nsqfCom)  + nsqfCDtm;
  const nsqfEDtm = n(plaEx.nsqfExe);  const nsqfECum = n(plaPrev.nsqfExe)  + nsqfEDtm;
  const nonNDtm  = n(plaEx.nonNsqf);  const nonNCum  = n(plaPrev.nonNsqf)  + nonNDtm;
  const dTotDtm  = nsqfCDtm + nsqfEDtm + nonNDtm;
  const dTotCum  = nsqfCCum + nsqfECum + nonNCum;

  /* NSQF category (section E's original single column) */
  const tCertDtm   = n(plaEx.trnCert);     const tCertCum   = n(plaPrev.trnCert)     + tCertDtm;
  const tPlcDtm    = n(plaEx.trnOptPlc);   const tPlcCum    = n(plaPrev.trnOptPlc)   + tPlcDtm;
  const tSmrkDtm   = n(plaEx.trnRegSmrk);  const tSmrkCum   = n(plaPrev.trnRegSmrk)  + tSmrkDtm;
  const cPlcdDtm   = n(plaEx.cndPlcd);     const cPlcdCum   = n(plaPrev.cndPlcd)     + cPlcdDtm;
  const empTrnDtm  = n(plaEx.empTrn);      const empTrnCum  = n(plaPrev.empTrn)      + empTrnDtm;
  const cHstdDtm   = n(plaEx.cndOptHstd);  const cHstdCum   = n(plaPrev.cndOptHstd)  + cHstdDtm;
  const cSlfsDtm   = n(plaEx.cndOptSlfs);  const cSlfsCum   = n(plaPrev.cndOptSlfs)  + cSlfsDtm;
  const cTbpDtm    = n(plaEx.cndToBePlcd); const cTbpCum    = n(plaPrev.cndToBePlcd) + cTbpDtm;

  /* NSQF-exempted category */
  const tCertExDtm  = n(plaEx.trnCertEx);      const tCertExCum  = n(plaPrev.trnCertEx)      + tCertExDtm;
  const tPlcExDtm   = n(plaEx.trnOptPlcEx);    const tPlcExCum   = n(plaPrev.trnOptPlcEx)    + tPlcExDtm;
  const tSmrkExDtm  = n(plaEx.trnRegSmrkEx);   const tSmrkExCum  = n(plaPrev.trnRegSmrkEx)   + tSmrkExDtm;
  const cPlcdExDtm  = n(plaEx.cndPlcdEx);      const cPlcdExCum  = n(plaPrev.cndPlcdEx)      + cPlcdExDtm;
  const empTrnExDtm = n(plaEx.empTrnEx);       const empTrnExCum = n(plaPrev.empTrnEx)       + empTrnExDtm;
  const cHstdExDtm  = n(plaEx.cndOptHstdEx);   const cHstdExCum  = n(plaPrev.cndOptHstdEx)   + cHstdExDtm;
  const cSlfsExDtm  = n(plaEx.cndOptSlfsEx);   const cSlfsExCum  = n(plaPrev.cndOptSlfsEx)   + cSlfsExDtm;
  const cTbpExDtm   = n(plaEx.cndToBePlcdEx);  const cTbpExCum   = n(plaPrev.cndToBePlcdEx)  + cTbpExDtm;

  /* Non-NSQF category */
  const tCertNonDtm  = n(plaEx.trnCertNon);     const tCertNonCum  = n(plaPrev.trnCertNon)     + tCertNonDtm;
  const tPlcNonDtm   = n(plaEx.trnOptPlcNon);   const tPlcNonCum   = n(plaPrev.trnOptPlcNon)   + tPlcNonDtm;
  const tSmrkNonDtm  = n(plaEx.trnRegSmrkNon);  const tSmrkNonCum  = n(plaPrev.trnRegSmrkNon)  + tSmrkNonDtm;
  const cPlcdNonDtm  = n(plaEx.cndPlcdNon);     const cPlcdNonCum  = n(plaPrev.cndPlcdNon)     + cPlcdNonDtm;
  const empTrnNonDtm = n(plaEx.empTrnNon);      const empTrnNonCum = n(plaPrev.empTrnNon)      + empTrnNonDtm;
  const cHstdNonDtm  = n(plaEx.cndOptHstdNon);  const cHstdNonCum  = n(plaPrev.cndOptHstdNon)  + cHstdNonDtm;
  const cSlfsNonDtm  = n(plaEx.cndOptSlfsNon);  const cSlfsNonCum  = n(plaPrev.cndOptSlfsNon)  + cSlfsNonDtm;
  const cTbpNonDtm   = n(plaEx.cndToBePlcdNon); const cTbpNonCum   = n(plaPrev.cndToBePlcdNon) + cTbpNonDtm;

  /* ══════════════════════════════════════════════════
     Rendering
     ══════════════════════════════════════════════════ */
  const displayMonth = monthName || (month ? MONTH_NAMES[parseInt(month) - 1] : '');

  /* Physical section D: (i) MSMEs / (ii) Others, each with Nos. + Values rows */
  function ToolingBlock({ nosDtm, nosCum, valDtm, valCum, no, alt }) {
    return (
      <>
        <tr style={{ background: alt ? '#FBF8EF' : '#fff' }}>
          <td className="mpr-part-ind" rowSpan={2}>{no}</td>
          <td className="mpr-part-ind2" colSpan={2}>Nos.</td>
          <td className="mpr-tgt">-</td>
          <td className="mpr-dtm">{f0(nosDtm)}</td>
          <td className="mpr-cum">{f0(nosCum)}</td>
          <td className="mpr-pct">-</td>
        </tr>
        <tr style={{ background: alt ? '#FBF8EF' : '#fff' }}>
          <td className="mpr-part-ind2" colSpan={2}>Values (Rs. In Lakh)</td>
          <td className="mpr-tgt">-</td>
          <td className="mpr-dtm">{f2(valDtm)}</td>
          <td className="mpr-cum">{f2(valCum)}</td>
          <td className="mpr-pct">-</td>
        </tr>
      </>
    );
  }

  return (
    <div className="mpr-page">
      <div className="mpr-doc">

        {/* ── Toolbar: stays on top while scrolling; chips jump to a section ── */}
        <div className="mpr-actions">
          <button className="mpr-back-btn" onClick={() => navigate('/app/reports/mpr')}>← Change month</button>
          <div className="mpr-action-title">
            <b>{instName}</b>
            <span>{displayMonth} {year}</span>
          </div>
          <nav className="mpr-jump" aria-label="Jump to section">
            {SECTIONS.map(([l, t]) => (
              <button key={l} title={t} onClick={() => document.getElementById(`mpr-sec-${l}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{l}</button>
            ))}
          </nav>
          <button className="mpr-print-btn" onClick={() => window.print()}>🖨 Print</button>
        </div>

        {/* ── Note banner ── */}
        {achData.note && (
          <div className="mpr-note-banner">
            <span className="mpr-note-label">Note :</span>
            <span>{achData.note}</span>
          </div>
        )}

        {/* ── Document header ── */}
        <div className="mpr-doc-header">
          <p className="mpr-inst-name">{instName || 'Institute'}</p>
          <p className="mpr-doc-title">
            Monthly progress report for the month of {displayMonth} - {year}
          </p>
        </div>

        <div className="mpr-tbl-wrap">

          {/* ════════════════════════════════════════
              A. FINANCIAL
              ════════════════════════════════════════ */}
          <Block letter="A" title="FINANCIAL">
            <table className="mpr-tbl">
              <StatHead labelCols={3} />
              <tbody>
                <tr>
                  <td className="mpr-part" rowSpan={16}>(1)Revenue earning</td>
                  <td className="mpr-part" rowSpan={8}>Cash basis</td>
                  <td className="mpr-part-ind">(i)Training</td>
                  <td className="mpr-tgt">{f2(finTgt.cashTraining)}</td>
                  <td className="mpr-dtm">{f2(cTrngDtm)}</td>
                  <td className="mpr-cum">{f2(cTrngCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr><td className="mpr-sub-hdr2" colSpan={5}>(ii)Production</td></tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind2">(a)Tooling</td>
                  <td className="mpr-tgt">{f2(finTgt.cashTooling)}</td>
                  <td className="mpr-dtm">{f2(cToolDtm)}</td>
                  <td className="mpr-cum">{f2(cToolCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr>
                  <td className="mpr-part-ind2">(b)Other Job Work</td>
                  <td className="mpr-tgt">{f2(finTgt.cashOtherJob)}</td>
                  <td className="mpr-dtm">{f2(cJobDtm)}</td>
                  <td className="mpr-cum">{f2(cJobCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind">(iii)Consultancy</td>
                  <td className="mpr-tgt">{f2(finTgt.cashConsult)}</td>
                  <td className="mpr-dtm">{f2(cConsDtm)}</td>
                  <td className="mpr-cum">{f2(cConsCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr>
                  <td className="mpr-part-ind">(iv)Testing/Calibration/Services</td>
                  <td className="mpr-tgt">{f2(finTgt.cashTesting)}</td>
                  <td className="mpr-dtm">{f2(cTestDtm)}</td>
                  <td className="mpr-cum">{f2(cTestCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind">(v)Misc.</td>
                  <td className="mpr-tgt">{f2(finTgt.cashMisc)}</td>
                  <td className="mpr-dtm">{f2(cMiscDtm)}</td>
                  <td className="mpr-cum">{f2(cMiscCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr className="mpr-total">
                  <td className="mpr-part">Total</td>
                  <td className="mpr-tgt">{f2(cTotTgt)}</td>
                  <td className="mpr-dtm">{f2(cTotDtm)}</td>
                  <td className="mpr-cum">{f2(cTotCum)}</td>
                  <td className="mpr-pct">{pct(cTotCum, cTotTgt)}</td>
                </tr>

                <tr>
                  <td className="mpr-part" rowSpan={8}>Accrual basis</td>
                  <td className="mpr-part-ind">(i)Training</td>
                  <td className="mpr-tgt">{f2(finTgt.accrualTraining)}</td>
                  <td className="mpr-dtm">{f2(aTrngDtm)}</td>
                  <td className="mpr-cum">{f2(aTrngCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr><td className="mpr-sub-hdr2" colSpan={5}>(ii)Production</td></tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind2">(a)Tooling</td>
                  <td className="mpr-tgt">{f2(finTgt.accrualTooling)}</td>
                  <td className="mpr-dtm">{f2(aToolDtm)}</td>
                  <td className="mpr-cum">{f2(aToolCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr>
                  <td className="mpr-part-ind2">(b)Other Job Work</td>
                  <td className="mpr-tgt">{f2(finTgt.accrualOtherJob)}</td>
                  <td className="mpr-dtm">{f2(aJobDtm)}</td>
                  <td className="mpr-cum">{f2(aJobCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind">(iii)Consultancy</td>
                  <td className="mpr-tgt">{f2(finTgt.accrualConsult)}</td>
                  <td className="mpr-dtm">{f2(aConsDtm)}</td>
                  <td className="mpr-cum">{f2(aConsCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr>
                  <td className="mpr-part-ind">(iv)Testing/Calibration/Services</td>
                  <td className="mpr-tgt">{f2(finTgt.accrualTesting)}</td>
                  <td className="mpr-dtm">{f2(aTestDtm)}</td>
                  <td className="mpr-cum">{f2(aTestCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind">(v)Misc.</td>
                  <td className="mpr-tgt">{f2(finTgt.accrualMisc)}</td>
                  <td className="mpr-dtm">{f2(aMiscDtm)}</td>
                  <td className="mpr-cum">{f2(aMiscCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr className="mpr-total">
                  <td className="mpr-part">Total</td>
                  <td className="mpr-tgt">{f2(aTotTgt)}</td>
                  <td className="mpr-dtm">{f2(aTotDtm)}</td>
                  <td className="mpr-cum">{f2(aTotCum)}</td>
                  <td className="mpr-pct">{pct(aTotCum, aTotTgt)}</td>
                </tr>

                <tr>
                  <td className="mpr-part" colSpan={2} rowSpan={2}>(2) Revenue expenditure</td>
                  <td className="mpr-part-ind">Cash basis</td>
                  <td className="mpr-tgt">{f2(revExpCTgt)}</td>
                  <td className="mpr-dtm">{f2(revExpCDtm)}</td>
                  <td className="mpr-cum">{f2(revExpCCum)}</td>
                  <td className="mpr-pct">{pct(revExpCCum, revExpCTgt)}</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind">Accrual basis</td>
                  <td className="mpr-tgt">{f2(revExpATgt)}</td>
                  <td className="mpr-dtm">{f2(revExpADtm)}</td>
                  <td className="mpr-cum">{f2(revExpACum)}</td>
                  <td className="mpr-pct">{pct(revExpACum, revExpATgt)}</td>
                </tr>

                <tr>
                  <td className="mpr-part" colSpan={2} rowSpan={2}>(3) Excess of income over expenditure</td>
                  <td className="mpr-part-ind">Cash basis</td>
                  <td className="mpr-dash">-</td>
                  <td className="mpr-dtm">{f2(exCDtm)}</td>
                  <td className="mpr-cum">{f2(exCCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind">Accrual basis</td>
                  <td className="mpr-dash">-</td>
                  <td className="mpr-dtm">{f2(exADtm)}</td>
                  <td className="mpr-cum">{f2(exACum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>

                <tr>
                  <td className="mpr-part" colSpan={2} rowSpan={2}>(4) %age recovery</td>
                  <td className="mpr-part-ind">Cash basis</td>
                  <td className="mpr-tgt">{f2(perRecCTgt)}</td>
                  <td className="mpr-dtm">{f2(perRecCDtm)}</td>
                  <td className="mpr-cum">{pct(cTotCum, revExpCCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind">Accrual basis</td>
                  <td className="mpr-tgt">{f2(perRecATgt)}</td>
                  <td className="mpr-dtm">{f2(perRecADtm)}</td>
                  <td className="mpr-cum">{pct(aTotCum, revExpACum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
              </tbody>
            </table>
          </Block>

          {/* ════════════════════════════════════════
              B. PHYSICAL
              ════════════════════════════════════════ */}
          <Block letter="B" title="PHYSICAL">
            <table className="mpr-tbl">
              <StatHead labelCols={3} />
              <tbody>
                <tr><td className="mpr-sub-hdr2" colSpan={7}>Number of unit benefited</td></tr>
                <tr><td className="mpr-sub-hdr2" colSpan={7}>(a)Number of Tooling Work</td></tr>
                <ToolingBlock no="(i)MSMEs"  nosDtm={twMsmeNosDtm} nosCum={twMsmeNosCum} valDtm={twMsmeValDtm} valCum={twMsmeValCum} />
                <ToolingBlock no="(ii)Others" nosDtm={twOthNosDtm} nosCum={twOthNosCum} valDtm={twOthValDtm} valCum={twOthValCum} alt />

                <tr><td className="mpr-sub-hdr2" colSpan={7}>(b)Number of Other Job Work</td></tr>
                <ToolingBlock no="(i)MSMEs"  nosDtm={ojwMsmeNosDtm} nosCum={ojwMsmeNosCum} valDtm={ojwMsmeValDtm} valCum={ojwMsmeValCum} />
                <ToolingBlock no="(ii)Others" nosDtm={ojwOthNosDtm} nosCum={ojwOthNosCum} valDtm={ojwOthValDtm} valCum={ojwOthValCum} alt />

                <tr><td className="mpr-sub-hdr2" colSpan={7}>(c)Consultancies</td></tr>
                <tr>
                  <td className="mpr-part-ind" colSpan={3}>(i)MSMEs</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(msmeConsDtm)}</td><td className="mpr-cum">{f0(msmeConsCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind" colSpan={3}>(ii)Others</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(othConsDtm)}</td><td className="mpr-cum">{f0(othConsCum)}</td><td className="mpr-dash">-</td>
                </tr>

                <tr><td className="mpr-sub-hdr2" colSpan={7}>(d)Any others</td></tr>
                <tr>
                  <td className="mpr-part-ind" colSpan={3}>Any Others</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(anyOthDtm)}</td><td className="mpr-cum">{f0(anyOthCum)}</td><td className="mpr-dash">-</td>
                </tr>

                <tr>
                  <td className="mpr-part" colSpan={2} rowSpan={2}>Total(a+b+c+d)</td>
                  <td className="mpr-part-ind2">Nos.</td>
                  <td className="mpr-tgt">{f0(phyNosToTTgt)}</td>
                  <td className="mpr-dtm">{f0(phyNosToTDtm)}</td>
                  <td className="mpr-cum">{f0(phyNosToTCum)}</td>
                  <td className="mpr-pct">{pct(phyNosToTCum, phyNosToTTgt)}</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind2">Values (Rs. In Lakh)</td>
                  <td className="mpr-dash">-</td>
                  <td className="mpr-dtm">{f2(phyValToTDtm)}</td>
                  <td className="mpr-cum">{f2(phyValToTCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
              </tbody>
            </table>

            <div className="mpr-sub-sec">Training activities</div>
            <div className="mpr-sub-hdr2">(a) Long term courses (course-wise details of trainees)</div>
            <table className="mpr-tbl">
              <thead>
                <tr>
                  <th className="mpr-col-hdr" style={{ width: 44 }}>S.No</th>
                  <th className="mpr-col-hdr">Name of the program</th>
                  <th className="mpr-col-hdr" style={{ width: 80 }}>Target</th>
                  <th className="mpr-col-hdr" style={{ width: 95 }}>Trainees trained<br />during the month</th>
                  <th className="mpr-col-hdr" style={{ width: 100 }}>Trainees trained<br />up to the month</th>
                  <th className="mpr-col-hdr" style={{ width: 95 }}>%age w.r.t.<br />annual target</th>
                </tr>
              </thead>
              <tbody>
                {ltcCourses.length === 0 ? (
                  <tr><td colSpan={6} className="mpr-empty-row">No long term course entered for this month</td></tr>
                ) : ltcCourses.map((c, i) => (
                  <tr key={i} className={i % 2 ? 'mpr-row-alt' : undefined}>
                    <td className="mpr-num-c">{i + 1}</td>
                    <td className="mpr-part">{c.name || '-'}</td>
                    <td className="mpr-dash">-</td>
                    <td className="mpr-dtm">{f0(c.dtm)}</td>
                    <td className="mpr-cum">{f0(c.cumMon)}</td>
                    <td className="mpr-dash">-</td>
                  </tr>
                ))}
                <tr className="mpr-total">
                  <td colSpan={3} className="mpr-part">Total</td>
                  <td className="mpr-dtm">{f0(ltcTotDtm)}</td>
                  <td className="mpr-cum">{f0(ltcTotCum)}</td>
                  <td className="mpr-dash">-</td>
                </tr>
              </tbody>
            </table>

            <table className="mpr-tbl">
              <StatHead labelCols={2} />
              <tbody>
                <tr>
                  <td className="mpr-part mpr-grp" rowSpan={2}>(b) Short term</td>
                  <td className="mpr-part-ind">(i) Number of courses completed</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(stmNocDtm)}</td><td className="mpr-cum">{f0(stmNocCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr className="mpr-row-alt">
                  <td className="mpr-part-ind">(ii) Number of trainees trained (completed)</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(stmNottDtm)}</td><td className="mpr-cum">{f0(stmNottCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr>
                  <td className="mpr-part mpr-grp" colSpan={2}>(c) Others</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(trngOthDtm)}</td><td className="mpr-cum">{f0(trngOthCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr className="mpr-total">
                  <td className="mpr-part" rowSpan={2}>Total (a+b+c)</td>
                  <td className="mpr-part-ind">No. of courses</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(trngNocDtm)}</td><td className="mpr-cum">{f0(trngNocCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr className="mpr-total">
                  <td className="mpr-part-ind">No. of trainees</td>
                  <td className="mpr-tgt">{f0(trngNotTgt)}</td><td className="mpr-dtm">{f0(trngNotDtm)}</td><td className="mpr-cum">{f0(trngNotCum)}</td><td className="mpr-pct">{pct(trngNotCum, trngNotTgt)}</td>
                </tr>
                <tr>
                  <td className="mpr-part mpr-grp" rowSpan={2}>Seminars / Workshops</td>
                  <td className="mpr-part-ind">No.</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(semNosDtm)}</td><td className="mpr-cum">{f0(semNosCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr className="mpr-row-alt">
                  <td className="mpr-part-ind">Participants</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(semPtsDtm)}</td><td className="mpr-cum">{f0(semPtsCum)}</td><td className="mpr-dash">-</td>
                </tr>
              </tbody>
            </table>
          </Block>

          {/* ════════════════════════════════════════
              C – G. Trainees trained — bifurcation
              ════════════════════════════════════════ */}
          <Block letter="C" title="Trainees trained (bifurcation) — Category">
            <BifurTable cols={[
              { label: 'GEN', dtm: genDtm, cum: genCum }, { label: 'SC', dtm: scDtm, cum: scCum },
              { label: 'ST', dtm: stDtm, cum: stCum }, { label: 'OBC', dtm: obcDtm, cum: obcCum },
              { label: 'Minority', dtm: minDtm, cum: minCum },
            ]} />
          </Block>

          <Block letter="D" title="Trainees trained (bifurcation) — Gender">
            <BifurTable cols={[
              { label: 'Men', dtm: menDtm, cum: menCum }, { label: 'Women', dtm: wmnDtm, cum: wmnCum },
              { label: 'Transgender', dtm: transDtm, cum: transCum },
            ]} />
          </Block>

          <Block letter="E" title="Trainees trained (bifurcation) — Qualification">
            <BifurTable cols={[
              { label: 'HSC (10th) dropout & below 10th', dtm: thFaDtm, cum: thFaCum },
              { label: 'HSC (10th) pass',                 dtm: thPaDtm, cum: thPaCum },
              { label: 'Intermediate (12th) pass',        dtm: twlDtm,  cum: twlCum },
              { label: 'ITI & pursuing',                  dtm: itiDtm,  cum: itiCum },
              { label: 'Diploma & pursuing',              dtm: dipDtm,  cum: dipCum },
              { label: 'Graduate (Tech) & pursuing',      dtm: gtDtm,   cum: gtCum },
              { label: 'Graduate (Non-Tech) & pursuing',  dtm: gntDtm,  cum: gntCum },
              { label: 'PG (Tech) & pursuing',            dtm: pgtDtm,  cum: pgtCum },
              { label: 'PG (Non-Tech) & pursuing',        dtm: pgntDtm, cum: pgntCum },
              { label: 'Ph.D. / M.Phil',                  dtm: phdDtm,  cum: phdCum },
            ]} />
          </Block>

          <Block letter="F" title="Trainees trained (bifurcation) — Age group">
            <BifurTable cols={[
              { label: '15 – 20', dtm: a15Dtm, cum: a15Cum }, { label: '21 – 25', dtm: a21Dtm, cum: a21Cum },
              { label: '26 – 30', dtm: a26Dtm, cum: a26Cum }, { label: '31 – 40', dtm: a31Dtm, cum: a31Cum },
              { label: 'Above 40', dtm: abvDtm, cum: abvCum },
            ]} />
          </Block>

          <Block letter="G" title="Trainees trained — Persons with disability">
            <BifurTable total={false} cols={[{ label: 'PH', dtm: phTrDtm, cum: phTrCum }]} />
          </Block>

          {/* ════════════════════════════════════════
              H. Budget
              ════════════════════════════════════════ */}
          <Block letter="H" title="Budget" note={`B.E. (Rs. Lakh): ${f2(finTgt.beBudget)}`}>
            <table className="mpr-tbl">
              <thead>
                <tr>
                  <th className="mpr-col-hdr" style={{ minWidth: 220 }}>Particulars</th>
                  <th className="mpr-col-hdr">Amount<br />(Rs. Lakh)</th>
                  <th className="mpr-col-hdr">Utilization<br />(during the month)</th>
                  <th className="mpr-col-hdr">Utilization<br />(cumulative)</th>
                  <th className="mpr-col-hdr">Balance<br />(Rs. Lakh)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mpr-part">(a) Carry forward from previous year</td>
                  <td className="mpr-tgt">{f2(cfAmt)}</td><td className="mpr-dtm">{f2(cfDtm)}</td><td className="mpr-cum">{f2(cfCum)}</td><td className="mpr-pct">{f2(cfBal)}</td>
                </tr>
                <tr className="mpr-row-alt">
                  <td className="mpr-part">(b) GIA released during the year (till date)</td>
                  <td className="mpr-tgt">{f2(giaAmt)}</td><td className="mpr-dtm">{f2(giaDtm)}</td><td className="mpr-cum">{f2(giaCum)}</td><td className="mpr-pct">{f2(giaBal)}</td>
                </tr>
                <tr className="mpr-total">
                  <td className="mpr-part">Total</td>
                  <td className="mpr-tgt">{f2(budTotAmt)}</td><td className="mpr-dtm">{f2(budTotDtm)}</td><td className="mpr-cum">{f2(budTotCum)}</td><td className="mpr-pct">{f2(budTotBal)}</td>
                </tr>
              </tbody>
            </table>
          </Block>

          {/* I. Staff strength  +  J. Machine procured — side by side */}
          <div className="mpr-pair">
            <Block letter="I" title="Staff strength">
              <table className="mpr-tbl">
                <thead>
                  <tr>
                    <th className="mpr-col-hdr" style={{ minWidth: 120 }}></th>
                    <th className="mpr-col-hdr mpr-staff-th">A</th><th className="mpr-col-hdr mpr-staff-th">B</th>
                    <th className="mpr-col-hdr mpr-staff-th">C</th><th className="mpr-col-hdr mpr-staff-th">D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mpr-part">Sanctioned</td>
                    <td className="mpr-num-c">{ssA}</td><td className="mpr-num-c">{ssB}</td><td className="mpr-num-c">{ssC}</td><td className="mpr-num-c">{ssD}</td>
                  </tr>
                  <tr className="mpr-row-alt">
                    <td className="mpr-part">In position</td>
                    <td className="mpr-num-c">{posA}</td><td className="mpr-num-c">{posB}</td><td className="mpr-num-c">{posC}</td><td className="mpr-num-c">{posD}</td>
                  </tr>
                </tbody>
              </table>
            </Block>

            <Block letter="J" title="Machine procured">
              <table className="mpr-tbl">
                <thead>
                  <tr>
                    <th className="mpr-col-hdr">During the month</th>
                    <th className="mpr-col-hdr">Cumulative (up to the month)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mpr-dtm mpr-num-c">{f2(machDtm)}</td>
                    <td className="mpr-cum mpr-num-c">{f2(machCum)}</td>
                  </tr>
                </tbody>
              </table>
            </Block>
          </div>

          {/* K – N. Narrative sections */}
          {[
            ['K', 'Details of visits of MSME / Industrial / Assco / Institutions', detailVisit, false],
            ['L', 'Significant achievements, if any, including new initiatives taken like NMCP etc.', achData.technical, true],
            ['M', 'Short falls, if any (with reasons)', shortFalls, false],
            ['N', 'Promotional activities', promoActiv, false],
          ].map(([letter, title, text, html]) => (
            <Block key={letter} letter={letter} title={title}>
              <div className="mpr-text-box">
                {!text ? <span className="mpr-nodata">(no data entered)</span>
                  : html ? <div dangerouslySetInnerHTML={{ __html: safeHtml(text) }} />
                  : <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>}
              </div>
            </Block>
          ))}

          {/* ════════════════════════════════════════
              O. Trainees trained under (NSQF/Non-NSQF/Exempted)
              ════════════════════════════════════════ */}
          <Block letter="O" title="Trainees trained under NSQF / NSQF exempted / Non-NSQF">
            <table className="mpr-tbl">
              <thead>
                <tr>
                  <th className="mpr-col-hdr" style={{ width: 50 }}>S.No</th>
                  <th className="mpr-col-hdr">Trainees trained under</th>
                  <th className="mpr-col-hdr" style={{ width: 130 }}>During the month</th>
                  <th className="mpr-col-hdr" style={{ width: 150 }}>Cumulative (up to the month)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="mpr-num-c">(i)</td><td className="mpr-part">NSQF (NSQF compliance, AICTE / NCVT / SCVT courses)</td><td className="mpr-dtm">{f0(nsqfCDtm)}</td><td className="mpr-cum">{f0(nsqfCCum)}</td></tr>
                <tr className="mpr-row-alt"><td className="mpr-num-c">(ii)</td><td className="mpr-part">NSQF exempted – 26 courses</td><td className="mpr-dtm">{f0(nsqfEDtm)}</td><td className="mpr-cum">{f0(nsqfECum)}</td></tr>
                <tr><td className="mpr-num-c">(iii)</td><td className="mpr-part">Non-NSQF (all other short term / tailor made courses)</td><td className="mpr-dtm">{f0(nonNDtm)}</td><td className="mpr-cum">{f0(nonNCum)}</td></tr>
                <tr className="mpr-total"><td colSpan={2} className="mpr-part">Total</td><td className="mpr-dtm">{f0(dTotDtm)}</td><td className="mpr-cum">{f0(dTotCum)}</td></tr>
              </tbody>
            </table>
          </Block>

          {/* ════════════════════════════════════════
              P. Placement Section — NSQF / NSQF exempted / Non NSQF
              ════════════════════════════════════════ */}
          <Block letter="P" title="Placement">
            <table className="mpr-tbl">
              <thead>
                <tr>
                  <th className="mpr-col-hdr" rowSpan={2} style={{ minWidth: 260 }}>Particulars</th>
                  <th className="mpr-col-hdr" colSpan={2}>NSQF</th>
                  <th className="mpr-col-hdr" colSpan={2}>NSQF exempted</th>
                  <th className="mpr-col-hdr" colSpan={2}>Non-NSQF</th>
                </tr>
                <tr>
                  <th className="mpr-col-hdr">During<br />the month</th><th className="mpr-col-hdr">Cumulative<br />(up to the month)</th>
                  <th className="mpr-col-hdr">During<br />the month</th><th className="mpr-col-hdr">Cumulative<br />(up to the month)</th>
                  <th className="mpr-col-hdr">During<br />the month</th><th className="mpr-col-hdr">Cumulative<br />(up to the month)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['(i)',    'Trainees certified',                                                        tCertDtm,   tCertCum,   tCertExDtm,  tCertExCum,  tCertNonDtm,  tCertNonCum],
                  ['(ii)',   'Total trainees opted for placement',                                       tPlcDtm,    tPlcCum,    tPlcExDtm,   tPlcExCum,   tPlcNonDtm,   tPlcNonCum],
                  ['(iii)',  'Trainees registered on Sampark portal',                                    tSmrkDtm,   tSmrkCum,   tSmrkExDtm,  tSmrkExCum,  tSmrkNonDtm,  tSmrkNonCum],
                  ['(iv)',   'Candidates who got placement (through the institute or after leaving it)', cPlcdDtm,   cPlcdCum,   cPlcdExDtm,  cPlcdExCum,  cPlcdNonDtm,  cPlcdNonCum],
                  ['(v)',    'Candidates already employed who attended re-skilling / up-skilling',       empTrnDtm,  empTrnCum,  empTrnExDtm, empTrnExCum, empTrnNonDtm, empTrnNonCum],
                  ['(vi)',   'Candidates who opted for higher studies (incl. continuing education)',     cHstdDtm,   cHstdCum,   cHstdExDtm,  cHstdExCum,  cHstdNonDtm,  cHstdNonCum],
                  ['(vii)',  'Candidates who opted for self-employment',                                 cSlfsDtm,   cSlfsCum,   cSlfsExDtm,  cSlfsExCum,  cSlfsNonDtm,  cSlfsNonCum],
                  ['(viii)', 'Candidates yet to be placed',                                              cTbpDtm,    cTbpCum,    cTbpExDtm,   cTbpExCum,   cTbpNonDtm,   cTbpNonCum],
                ].map(([no, label, nDtm, nCum, eDtm, eCum, oDtm, oCum], i) => (
                  <tr key={i} className={i % 2 ? 'mpr-row-alt' : undefined}>
                    <td className="mpr-part"><span className="mpr-rowno">{no}</span>{label}</td>
                    <td className="mpr-dtm">{f0(nDtm)}</td><td className="mpr-cum">{f0(nCum)}</td>
                    <td className="mpr-dtm">{f0(eDtm)}</td><td className="mpr-cum">{f0(eCum)}</td>
                    <td className="mpr-dtm">{f0(oDtm)}</td><td className="mpr-cum">{f0(oCum)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Block>

        </div>

        {/* ── Print button ── */}
        <div className="mpr-bottom-actions" style={{ textAlign: 'center', padding: '14px 0' }}>
          <button className="mpr-print-btn" onClick={() => window.print()}>Print</button>
        </div>

      </div>
    </div>
  );
}
