import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './MprReport.css';

/* ─── helpers ─────────────────────────────────────────── */
const n   = v => parseFloat(v) || 0;
const f2  = v => n(v).toFixed(2);
const f0  = v => Math.round(n(v));
const pct = (num, den) => n(den) > 0 ? ((n(num) / n(den)) * 100).toFixed(2) : '-';
const tgt = (v, dec = 2) => n(v) > 0 ? n(v).toFixed(dec) : n(v).toFixed(dec);

/* Parse achievement JSON (same as AchievementPage) */
const INIT_ACH = {
  note: '', importRows: [], technical: '',
  highEndDtm: '0', highEndCum: '0', masterDtm: '0', masterCum: '0',
  mous: '', earlierMous: '', academia: '', awards: '',
};
function parseAch(raw) {
  if (!raw) return INIT_ACH;
  try { return { ...INIT_ACH, ...JSON.parse(raw) }; }
  catch { return { ...INIT_ACH, technical: raw }; }
}

/* ─── JSX helpers — one lettered section = one independent table ─── */

/* Section wrapper: letter + title bar, then whatever table the caller supplies */
function Block({ letter, title, children }) {
  return (
    <div className="mpr-block">
      {title && <div className="mpr-sec-hdr">{letter ? `${letter}. ` : ''}{title}</div>}
      {children}
    </div>
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

/* Bifurcation row: one outer label (During-the-month / Cumulative) + an inline
   mini table of category columns. Used for sections C, D, E, F. */
function BifurRow({ label, cols, alt }) {
  return (
    <tr style={{ background: alt ? '#FBF8EF' : '#fff' }}>
      <td className="mpr-part" style={{ minWidth: 200 }}>{label}</td>
      <td style={{ padding: 0 }}>
        <table className="mpr-bifur-tbl">
          <thead><tr>{cols.map(c => <th key={c.label}>{c.label}</th>)}<th>Total</th></tr></thead>
          <tbody>
            <tr>{cols.map(c => <td key={c.label}>{f0(c.value)}</td>)}<td className="mpr-total-cell">{f0(cols.reduce((s, c) => s + n(c.value), 0))}</td></tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

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
  const ltcTotDtm   = n(phyEx.ltcTotal);      const ltcTotCum   = n(phyPrev.ltcTotal)    + ltcTotDtm;
  const stmNocDtm   = n(phyEx.stmNocComp);    const stmNocCum   = n(phyPrev.stmNocComp)  + stmNocDtm;
  const stmNottDtm  = n(phyEx.stmNottComp);   const stmNottCum  = n(phyPrev.stmNottComp) + stmNottDtm;
  const trngOthDtm  = n(phyEx.trngOther);      const trngOthCum  = n(phyPrev.trngOther)   + trngOthDtm;
  const trngNocDtm  = n(phyEx.trngTotalNoc);  const trngNocCum  = n(phyPrev.trngTotalNoc) + trngNocDtm;
  const trngNotDtm  = n(phyEx.trngTotalNot);  const trngNotCum  = n(phyPrev.trngTotalNot) + trngNotDtm;
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
          <td className="mpr-part-ind2">Nos.</td>
          <td className="mpr-tgt">-</td>
          <td className="mpr-dtm">{f0(nosDtm)}</td>
          <td className="mpr-cum">{f0(nosCum)}</td>
          <td className="mpr-pct">-</td>
        </tr>
        <tr style={{ background: alt ? '#FBF8EF' : '#fff' }}>
          <td className="mpr-part-ind2">Values (Rs. In Lakh)</td>
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

        {/* ── Action bar ── */}
        <div className="mpr-actions">
          <button className="mpr-back-btn" onClick={() => navigate('/app/reports/mpr')}>← Back</button>
          <button className="mpr-print-btn" onClick={() => window.print()}>🖨 Print</button>
          <span className="mpr-action-note">
            {instName} — {displayMonth} {year}
          </span>
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
                  <td className="mpr-part-ind" colSpan={2}>(i)MSMEs</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(msmeConsDtm)}</td><td className="mpr-cum">{f0(msmeConsCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part-ind" colSpan={2}>(ii)Others</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(othConsDtm)}</td><td className="mpr-cum">{f0(othConsCum)}</td><td className="mpr-dash">-</td>
                </tr>

                <tr><td className="mpr-sub-hdr2" colSpan={7}>(d)Any others</td></tr>
                <tr>
                  <td className="mpr-part-ind" colSpan={2}>Any Others</td>
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

            <div className="mpr-sub-hdr2" style={{ marginTop: 6 }}>Training activities</div>
            <div className="mpr-sub-hdr2">(a)Long term courses (course-wise details of trainees)</div>
            <table className="mpr-import-tbl" style={{ marginBottom: 6 }}>
              <thead>
                <tr>
                  <th style={{ width: 40 }}>S.No</th><th>Name of the program</th><th style={{ width: 80 }}>Target</th>
                  <th style={{ width: 100 }}>Trainees trained<br />During the Month</th>
                  <th style={{ width: 110 }}>Trainees trained up to<br />the month</th>
                  <th style={{ width: 90 }}>%age<br />w.r.t Annual target</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td style={{ textAlign: 'left' }}>(course-wise entries — see Physical Section)</td><td>-</td><td>{f0(ltcTotDtm)}</td><td>{f0(ltcTotCum)}</td><td>-</td></tr>
                <tr style={{ background: '#dce8f5', fontWeight: 700 }}><td colSpan={3}>Total</td><td>{f0(ltcTotDtm)}</td><td>{f0(ltcTotCum)}</td><td>-</td></tr>
              </tbody>
            </table>

            <table className="mpr-tbl">
              <tbody>
                <tr>
                  <td className="mpr-part-ind" colSpan={2}>(b)Short term</td>
                  <td className="mpr-part-ind2">(i)Number of courses completed</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(stmNocDtm)}</td><td className="mpr-cum">{f0(stmNocCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td colSpan={2}></td>
                  <td className="mpr-part-ind2">(ii)Number of Trainees Trained(completed)</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(stmNottDtm)}</td><td className="mpr-cum">{f0(stmNottCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr>
                  <td className="mpr-part-ind" colSpan={2}>(c)Others</td>
                  <td></td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(trngOthDtm)}</td><td className="mpr-cum">{f0(trngOthCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part" colSpan={2} rowSpan={2}>Total(a+b+c)</td>
                  <td className="mpr-part-ind2">No. of courses</td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(trngNocDtm)}</td><td className="mpr-cum">{f0(trngNocCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr>
                  <td className="mpr-part-ind2">No. of trainees</td>
                  <td className="mpr-tgt">{f0(trngNotTgt)}</td><td className="mpr-dtm">{f0(trngNotDtm)}</td><td className="mpr-cum">{f0(trngNotCum)}</td><td className="mpr-pct">{pct(trngNotCum, trngNotTgt)}</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td className="mpr-part" colSpan={3}>Seminars/Workshops</td>
                  <td className="mpr-part-ind2">No.</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(semNosDtm)}</td><td className="mpr-cum">{f0(semNosCum)}</td><td className="mpr-dash">-</td>
                </tr>
                <tr style={{ background: '#FBF8EF' }}>
                  <td colSpan={3}></td>
                  <td className="mpr-part-ind2">Participants</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="mpr-dash">-</td><td className="mpr-dtm">{f0(semPtsDtm)}</td><td className="mpr-cum">{f0(semPtsCum)}</td><td className="mpr-dash">-</td>
                </tr>
              </tbody>
            </table>
          </Block>

          {/* ════════════════════════════════════════
              C / D / E / F — bifurcation tables (transposed: categories as columns)
              ════════════════════════════════════════ */}
          <table className="mpr-tbl">
            <tbody>
              <tr>
                <td className="mpr-letter-cell" rowSpan={2}>C.</td>
                <BifurRow label="Trainees trained(bifurcation)(During the month)"
                  cols={[{ label: 'GEN', value: genDtm }, { label: 'SC', value: scDtm }, { label: 'ST', value: stDtm }, { label: 'OBC', value: obcDtm }, { label: 'MINORITY', value: minDtm }]} />
              </tr>
              <tr>
                <BifurRow label="(b)Trainees trained(bifurcation)(Cumulative)"
                  cols={[{ label: 'GEN', value: genCum }, { label: 'SC', value: scCum }, { label: 'ST', value: stCum }, { label: 'OBC', value: obcCum }, { label: 'MINORITY', value: minCum }]} alt />
              </tr>

              <tr>
                <td className="mpr-letter-cell" rowSpan={2}>D.</td>
                <BifurRow label="Trainees trained(bifurcation)(During the month)"
                  cols={[{ label: 'MEN', value: menDtm }, { label: 'WOMEN', value: wmnDtm }, { label: 'TRANSGENDER', value: transDtm }]} />
              </tr>
              <tr>
                <BifurRow label="(b)Trainees trained(bifurcation)(Cumulative)"
                  cols={[{ label: 'MEN', value: menCum }, { label: 'WOMEN', value: wmnCum }, { label: 'TRANSGENDER', value: transCum }]} alt />
              </tr>

              <tr>
                <td className="mpr-letter-cell" rowSpan={2}>E.</td>
                <BifurRow label="Trainees trained(bifurcation)(During the month)"
                  cols={[
                    { label: 'HSC(10th) Dropout& Below 10th', value: thFaDtm }, { label: 'HSC(10th) Pass', value: thPaDtm },
                    { label: 'Intermediate(12th)Pass', value: twlDtm }, { label: 'ITI & Persuing', value: itiDtm },
                    { label: 'Diploma & Persuing', value: dipDtm }, { label: 'Graduate(Tech)& Persuing', value: gtDtm },
                    { label: 'Graduate(Non-Tech)& Persuing', value: gntDtm }, { label: 'Post Graduate(Tech)& Persuing', value: pgtDtm },
                    { label: 'Post Graduate(Non-Tech)& Persuing', value: pgntDtm }, { label: 'Phd./Mhil', value: phdDtm },
                  ]} />
              </tr>
              <tr>
                <BifurRow label="(b)Trainees trained(bifurcation)(Cumulative)"
                  cols={[
                    { label: 'HSC(10th) Dropout& Below 10th', value: thFaCum }, { label: 'HSC(10th) Pass', value: thPaCum },
                    { label: 'Intermediate(12th)Pass', value: twlCum }, { label: 'ITI & Persuing', value: itiCum },
                    { label: 'Diploma & Persuing', value: dipCum }, { label: 'Graduate(Tech)& Persuing', value: gtCum },
                    { label: 'Graduate(Non-Tech)& Persuing', value: gntCum }, { label: 'Post Graduate(Tech)& Persuing', value: pgtCum },
                    { label: 'Post Graduate(Non-Tech)& Persuing', value: pgntCum }, { label: 'Phd./Mhil', value: phdCum },
                  ]} alt />
              </tr>

              <tr>
                <td className="mpr-letter-cell" rowSpan={2}>F.</td>
                <BifurRow label="Trainees trained(bifurcation)(During the month)"
                  cols={[{ label: 'Age(15-20)', value: a15Dtm }, { label: 'Age(21-25)', value: a21Dtm }, { label: 'Age(26-30)', value: a26Dtm }, { label: 'Age(31-40)', value: a31Dtm }, { label: 'Above 40', value: abvDtm }]} />
              </tr>
              <tr>
                <BifurRow label="(b)Trainees trained(bifurcation)(Cumulative)"
                  cols={[{ label: 'Age(15-20)', value: a15Cum }, { label: 'Age(21-25)', value: a21Cum }, { label: 'Age(26-30)', value: a26Cum }, { label: 'Age(31-40)', value: a31Cum }, { label: 'Above 40', value: abvCum }]} alt />
              </tr>

              <tr>
                <td className="mpr-letter-cell" rowSpan={2}>G.</td>
                <td className="mpr-part" rowSpan={2}>&nbsp;</td>
                <td className="mpr-part-ind2">PH</td><td className="mpr-dtm">{f0(phTrDtm)}</td>
              </tr>
              <tr>
                <td className="mpr-part-ind2">PH</td><td className="mpr-cum">{f0(phTrCum)}</td>
              </tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════
              H. Budget
              ════════════════════════════════════════ */}
          <div className="mpr-sub-hdr2">Budget B E (Rs. Lakh) -{f0(finTgt.beBudget) || 0},</div>
          <table className="mpr-tbl">
            <thead>
              <tr>
                <td className="mpr-letter-cell" rowSpan={4}>H.</td>
                <th className="mpr-col-hdr" colSpan={2}></th>
                <th className="mpr-col-hdr">Amount<br />in (Rs. Lakh.)</th>
                <th className="mpr-col-hdr">Utilization<br />(During month)</th>
                <th className="mpr-col-hdr">Utilization<br />(Cummulative)</th>
                <th className="mpr-col-hdr">Balance<br />in (Rs. Lakh.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mpr-part" colSpan={2}>(a)Carry forward from previous year</td>
                <td className="mpr-dtm">{f2(cfAmt)}</td><td className="mpr-dtm">{f2(cfDtm)}</td><td className="mpr-cum">{f2(cfCum)}</td><td className="mpr-cum">{f2(cfBal)}</td>
              </tr>
              <tr style={{ background: '#FBF8EF' }}>
                <td className="mpr-part" colSpan={2}>(b)GIA Released during the year(Till Date)</td>
                <td className="mpr-dtm">{f2(giaAmt)}</td><td className="mpr-dtm">{f2(giaDtm)}</td><td className="mpr-cum">{f2(giaCum)}</td><td className="mpr-cum">{f2(giaBal)}</td>
              </tr>
              <tr className="mpr-total">
                <td className="mpr-part" colSpan={2}>Total</td>
                <td className="mpr-dtm">{f2(budTotAmt)}</td><td className="mpr-dtm">{f2(budTotDtm)}</td><td className="mpr-cum">{f2(budTotCum)}</td><td className="mpr-cum">{f2(budTotBal)}</td>
              </tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════
              I. Staff strength
              ════════════════════════════════════════ */}
          <table className="mpr-tbl">
            <thead>
              <tr>
                <th className="mpr-letter-cell" rowSpan={3}>I.</th>
                <th className="mpr-col-hdr" rowSpan={3}>Staff strength</th>
                <th className="mpr-col-hdr"></th>
                <th className="mpr-staff-col">A</th><th className="mpr-staff-col">B</th><th className="mpr-staff-col">C</th><th className="mpr-staff-col">D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mpr-part-ind2">Sanctioned</td>
                <td className="mpr-dtm">{ssA}</td><td className="mpr-dtm">{ssB}</td><td className="mpr-dtm">{ssC}</td><td className="mpr-dtm">{ssD}</td>
              </tr>
              <tr style={{ background: '#FBF8EF' }}>
                <td className="mpr-part-ind2">In postion</td>
                <td className="mpr-dtm">{posA}</td><td className="mpr-dtm">{posB}</td><td className="mpr-dtm">{posC}</td><td className="mpr-dtm">{posD}</td>
              </tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════
              J. Machine procured
              ════════════════════════════════════════ */}
          <table className="mpr-tbl">
            <tbody>
              <tr>
                <td className="mpr-letter-cell">J.</td>
                <td className="mpr-part" colSpan={2}>Machine procured</td>
                <td className="mpr-part-ind2">During the month</td>
                <td className="mpr-dtm">{f2(machDtm)}</td>
                <td className="mpr-part-ind2">Cumulative</td>
                <td className="mpr-cum">{f2(machCum)}</td>
              </tr>
            </tbody>
          </table>

          {/* K / L / M / N — free text */}
          <table className="mpr-tbl">
            <tbody>
              <tr>
                <td className="mpr-letter-cell">K.</td>
                <td className="mpr-part" style={{ width: 260 }}>Details of visits of MSME/Industrial/Assco/Institutions</td>
                <td className="mpr-text-cell">{detailVisit || <span className="mpr-nodata">(no data entered)</span>}</td>
              </tr>
              <tr style={{ background: '#FBF8EF' }}>
                <td className="mpr-letter-cell">L.</td>
                <td className="mpr-part">Significant achievements, if any, including new initiatives taken like NMCP etc.</td>
                <td className="mpr-text-cell">{achData.technical || <span className="mpr-nodata">(no data entered)</span>}</td>
              </tr>
              <tr>
                <td className="mpr-letter-cell">M.</td>
                <td className="mpr-part">Short falls if any (with reasons)</td>
                <td className="mpr-text-cell">{shortFalls || <span className="mpr-nodata">(no data entered)</span>}</td>
              </tr>
              <tr style={{ background: '#FBF8EF' }}>
                <td className="mpr-letter-cell">N.</td>
                <td className="mpr-part">Promotional Activites</td>
                <td className="mpr-text-cell">{achData.note || <span className="mpr-nodata">(no data entered)</span>}</td>
              </tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════
              O. Trainees trained under (NSQF/Non-NSQF/Exempted)
              ════════════════════════════════════════ */}
          <table className="mpr-tbl">
            <thead>
              <tr>
                <td className="mpr-letter-cell" rowSpan={4}>O.</td>
                <th className="mpr-col-hdr">Sno</th>
                <th className="mpr-col-hdr">Trainees trained under</th>
                <th className="mpr-col-hdr">During the month</th>
                <th className="mpr-col-hdr">Cumulative (up to the month)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>(i)</td><td style={{ textAlign: 'left' }}>NSQF (NSQF Compliance,AICTE/NCVT/SCVTC Cources)</td><td>{f0(nsqfCDtm)}</td><td>{f0(nsqfCCum)}</td></tr>
              <tr style={{ background: '#FBF8EF' }}><td>(ii)</td><td style={{ textAlign: 'left' }}>NSQF exempted -26 cources</td><td>{f0(nsqfEDtm)}</td><td>{f0(nsqfECum)}</td></tr>
              <tr><td>(iii)</td><td style={{ textAlign: 'left' }}>Non NSQF ( all other short term/tailor made cources)</td><td>{f0(nonNDtm)}</td><td>{f0(nonNCum)}</td></tr>
              <tr className="mpr-total"><td colSpan={2}>Total</td><td>{f0(dTotDtm)}</td><td>{f0(dTotCum)}</td></tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════
              P. Placement Section — NSQF / NSQF exempted / Non NSQF
              ════════════════════════════════════════ */}
          <table className="mpr-pla-tbl">
            <thead>
              <tr>
                <th rowSpan={2} style={{ width: 26 }}>P.</th>
                <th rowSpan={2}>Name</th>
                <th colSpan={2}>NSQF</th>
                <th colSpan={2}>NSQF exempted</th>
                <th colSpan={2}>Non NSQF</th>
              </tr>
              <tr>
                <th>During the month</th><th>Cumulative<br />(up to the month)</th>
                <th>During the month</th><th>Cumulative<br />(up to the month)</th>
                <th>During the month</th><th>Cumulative<br />(up to the month)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['(i)',    'Trainees Certified',                                                           tCertDtm,   tCertCum,   tCertExDtm,  tCertExCum,  tCertNonDtm,  tCertNonCum],
                ['(ii)',   'Total trainees opted for placement',                                          tPlcDtm,    tPlcCum,    tPlcExDtm,   tPlcExCum,   tPlcNonDtm,   tPlcNonCum],
                ['(iii)',  'Trainees registered on Sampark Portal',                                      tSmrkDtm,   tSmrkCum,   tSmrkExDtm,  tSmrkExCum,  tSmrkNonDtm,  tSmrkNonCum],
                ['(iv)',   'Candidate got placement (through institute as well as after leaving the institution)', cPlcdDtm, cPlcdCum, cPlcdExDtm, cPlcdExCum, cPlcdNonDtm, cPlcdNonCum],
                ['(v)',    'Candidate who were already employed attend the training for re-skilling/up-skilling', empTrnDtm, empTrnCum, empTrnExDtm, empTrnExCum, empTrnNonDtm, empTrnNonCum],
                ['(vi)',   'Candidate who opted for higher studies (including candidate continuing their education)', cHstdDtm, cHstdCum, cHstdExDtm, cHstdExCum, cHstdNonDtm, cHstdNonCum],
                ['(vii)',  'Candidates opted for self-employment',                                        cSlfsDtm,   cSlfsCum,   cSlfsExDtm,  cSlfsExCum,  cSlfsNonDtm,  cSlfsNonCum],
                ['(viii)', 'Candidate who were yet to be placed',                                         cTbpDtm,    cTbpCum,    cTbpExDtm,   cTbpExCum,   cTbpNonDtm,   cTbpNonCum],
              ].map(([no, label, nDtm, nCum, eDtm, eCum, oDtm, oCum], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#F2F2F2' : '#FBF8EF' }}>
                  {i === 0 && <td rowSpan={8} style={{ fontWeight: 700 }}>P.</td>}
                  <td style={{ textAlign: 'left', minWidth: 220 }}>{no} {label}</td>
                  <td>{f0(nDtm)}</td><td>{f0(nCum)}</td>
                  <td>{f0(eDtm)}</td><td>{f0(eCum)}</td>
                  <td>{f0(oDtm)}</td><td>{f0(oCum)}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* ── Print button ── */}
        <div className="mpr-bottom-actions" style={{ textAlign: 'center', padding: '14px 0' }}>
          <button className="mpr-print-btn" onClick={() => window.print()}>Print</button>
        </div>

      </div>
    </div>
  );
}
