import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './MprReport.css';

/* ─── helpers ─────────────────────────────────────────── */
const n  = v => parseFloat(v) || 0;
const f2 = v => n(v).toFixed(2);
const f0 = v => Math.round(n(v));
const pct = (num, den) => n(den) > 0 ? ((n(num) / n(den)) * 100).toFixed(2) + '%' : '-';
const tgt = (v, dec = 2) => n(v) > 0 ? n(v).toFixed(dec) : '-';

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

/* ─── JSX helpers ─────────────────────────────────────── */
const Sec  = ({ cols = 5, children }) => (
  <tr><td className="mpr-sec-hdr" colSpan={cols}>{children}</td></tr>
);
const Sub  = ({ cols = 5, children, indent }) => (
  <tr><td className={indent ? 'mpr-sub-hdr2' : 'mpr-sub-hdr'} colSpan={cols}>{children}</td></tr>
);
const TxtRow = ({ label, content, cols = 4 }) => (
  <>
    <tr><td className="mpr-sub-hdr2" colSpan={cols + 1}>{label}</td></tr>
    <tr>
      <td className="mpr-text-cell" colSpan={cols + 1}>
        {content
          ? <span dangerouslySetInnerHTML={{ __html: content }} />
          : <span className="mpr-nodata">(no data entered)</span>}
      </td>
    </tr>
  </>
);

/* Standard data row: label | target | dtm | cum | pct */
function Row({ label, target = '-', dtm, cum, cumPct, indent, alt }) {
  const labelClass = indent === 2 ? 'mpr-part-ind2' : indent ? 'mpr-part-ind' : 'mpr-part';
  const bg = alt ? '#FBF8EF' : '#FFFFFF';
  return (
    <tr>
      <td className={labelClass} style={{ background: bg }}>{label}</td>
      <td className="mpr-tgt">{target}</td>
      <td className="mpr-dtm">{dtm}</td>
      <td className="mpr-cum">{cum}</td>
      <td className="mpr-pct">{cumPct}</td>
    </tr>
  );
}

/* Total row */
function TotRow({ label, target = '-', dtm, cum, cumPct, indent }) {
  const labelClass = indent === 2 ? 'mpr-part-ind2' : indent ? 'mpr-part-ind' : 'mpr-part';
  return (
    <tr className="mpr-total">
      <td className={labelClass}>{label}</td>
      <td className="mpr-tgt">{target}</td>
      <td className="mpr-dtm">{dtm}</td>
      <td className="mpr-cum">{cum}</td>
      <td className="mpr-pct">{cumPct}</td>
    </tr>
  );
}

/* Row with dash in target + pct (for text/ratio rows) */
function SimpleRow({ label, dtm, cum, indent, alt }) {
  const labelClass = indent === 2 ? 'mpr-part-ind2' : indent ? 'mpr-part-ind' : 'mpr-part';
  const bg = alt ? '#FBF8EF' : '#FFFFFF';
  return (
    <tr>
      <td className={labelClass} style={{ background: bg }}>{label}</td>
      <td className="mpr-dash">-</td>
      <td className="mpr-dtm">{dtm}</td>
      <td className="mpr-cum">{cum}</td>
      <td className="mpr-dash">-</td>
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

  /* Excess of Income over Expenditure */
  const exCDtm = cTotDtm - revExpCDtm;  const exCCum = cTotCum - revExpCCum;
  const exADtm = aTotDtm - revExpADtm;  const exACum = aTotCum - revExpACum;

  /* %age Recovery */
  const perRecCDtm = n(finEx.perRecCashAch);    const perRecCTgt = n(finTgt.perRecCash);
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
  const catTDtm = genDtm + scDtm + stDtm + obcDtm + minDtm;
  const catTCum = genCum + scCum + stCum + obcCum + minCum;

  /* Gender (D) */
  const menDtm   = n(phyEx.men);         const menCum   = n(phyPrev.men)         + menDtm;
  const wmnDtm   = n(phyEx.wmn);         const wmnCum   = n(phyPrev.wmn)         + wmnDtm;
  const transDtm = n(phyEx.transgender); const transCum = n(phyPrev.transgender) + transDtm;
  const genTDtm  = menDtm + wmnDtm + transDtm;
  const genTCum  = menCum + wmnCum + transCum;

  /* Qualification (E+F) */
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
  const qualAllDtm = thFaDtm + thPaDtm + twlDtm + itiDtm + dipDtm + gntDtm + gtDtm + pgntDtm + pgtDtm + phdDtm;
  const qualAllCum = thFaCum + thPaCum + twlCum + itiCum + dipCum + gntCum + gtCum + pgntCum + pgtCum + phdCum;

  /* Age (G) */
  const a15Dtm = n(phyEx.a1520);   const a15Cum = n(phyPrev.a1520)   + a15Dtm;
  const a21Dtm = n(phyEx.a2125);   const a21Cum = n(phyPrev.a2125)   + a21Dtm;
  const a26Dtm = n(phyEx.a2630);   const a26Cum = n(phyPrev.a2630)   + a26Dtm;
  const a31Dtm = n(phyEx.a3140);   const a31Cum = n(phyPrev.a3140)   + a31Dtm;
  const abvDtm = n(phyEx.above40); const abvCum = n(phyPrev.above40) + abvDtm;
  const ageTDtm = a15Dtm + a21Dtm + a26Dtm + a31Dtm + abvDtm;
  const ageTCum = a15Cum + a21Cum + a26Cum + a31Cum + abvCum;

  /* PH */
  const phTrDtm = n(phyEx.ph); const phTrCum = n(phyPrev.ph) + phTrDtm;

  /* ══════════════════════════════════════════════════
     BUDGET computed values
     ══════════════════════════════════════════════════ */
  const budEx   = bud?.existing || {};
  const budPrev = bud?.prevCum  || {};

  const cfDtm      = n(budEx.cfDtm);     const cfCum  = n(budPrev.cfCum)  + cfDtm;
  const giaDtm     = n(budEx.giaDtm);    const giaCum = n(budPrev.giaCum) + giaDtm;
  const machDtm    = n(budEx.machineDtm);const machCum = n(budPrev.machineCum) + machDtm;

  const ssA = n(budEx.ssA); const posA = n(budEx.posA);
  const ssB = n(budEx.ssB); const posB = n(budEx.posB);
  const ssC = n(budEx.ssC); const posC = n(budEx.posC);
  const ssD = n(budEx.ssD); const posD = n(budEx.posD);
  const ssT = ssA + ssB + ssC + ssD; const posT = posA + posB + posC + posD;

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

  const tCertDtm   = n(plaEx.trnCert);     const tCertCum   = n(plaPrev.trnCert)     + tCertDtm;
  const tPlcDtm    = n(plaEx.trnOptPlc);   const tPlcCum    = n(plaPrev.trnOptPlc)   + tPlcDtm;
  const tSmrkDtm   = n(plaEx.trnRegSmrk);  const tSmrkCum   = n(plaPrev.trnRegSmrk)  + tSmrkDtm;
  const cPlcdDtm   = n(plaEx.cndPlcd);     const cPlcdCum   = n(plaPrev.cndPlcd)     + cPlcdDtm;
  const empTrnDtm  = n(plaEx.empTrn);      const empTrnCum  = n(plaPrev.empTrn)      + empTrnDtm;
  const cHstdDtm   = n(plaEx.cndOptHstd);  const cHstdCum   = n(plaPrev.cndOptHstd)  + cHstdDtm;
  const cSlfsDtm   = n(plaEx.cndOptSlfs);  const cSlfsCum   = n(plaPrev.cndOptSlfs)  + cSlfsDtm;
  const cTbpDtm    = n(plaEx.cndToBePlcd); const cTbpCum    = n(plaPrev.cndToBePlcd) + cTbpDtm;

  /* ══════════════════════════════════════════════════
     Rendering
     ══════════════════════════════════════════════════ */
  const displayMonth = monthName || (month ? MONTH_NAMES[parseInt(month) - 1] : '');

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
          <p className="mpr-org-name">TOOL ROOM & TRAINING CENTRE (TCEC)</p>
          <p className="mpr-inst-name">{instName || 'Institute'}</p>
          <p className="mpr-doc-title">
            Monthly Progress Report for the Month of {displayMonth} — {year}
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            MAIN REPORT TABLE
            ═══════════════════════════════════════════ */}
        <div className="mpr-tbl-wrap">
          <table className="mpr-tbl">

            {/* Column headers */}
            <thead>
              <tr>
                <th className="mpr-col-hdr" rowSpan={2} style={{ minWidth: 240 }}>Particulars</th>
                <th className="mpr-col-hdr" rowSpan={2} style={{ width: 90 }}>Annual<br />Target</th>
                <th className="mpr-col-hdr" colSpan={3}>Achievement</th>
              </tr>
              <tr>
                <th className="mpr-col-hdr" style={{ width: 100 }}>During the<br />Month</th>
                <th className="mpr-col-hdr" style={{ width: 100 }}>Cumulative<br />upto Month</th>
                <th className="mpr-col-hdr" style={{ width: 90 }}>Cumul. %age<br />w.r.t. Target</th>
              </tr>
            </thead>

            <tbody>
              {/* ════════════════════════════════════════
                  A. FINANCIAL
                  ════════════════════════════════════════ */}
              <Sec>A. FINANCIAL</Sec>
              <Sub>(1) Revenue Earning</Sub>
              <Sub indent>(a) Cash Basis (Rs. in Lakh)</Sub>

              <Row label="(i) Training"                        dtm={f2(cTrngDtm)} cum={f2(cTrngCum)} cumPct={pct(cTrngCum, cTotTgt)} alt />
              <Row label="(ii) Production — Tooling"           dtm={f2(cToolDtm)} cum={f2(cToolCum)} cumPct={pct(cToolCum, cTotTgt)} />
              <Row label="(ii) Production — Other Job Work"    dtm={f2(cJobDtm)}  cum={f2(cJobCum)}  cumPct={pct(cJobCum,  cTotTgt)} alt />
              <Row label="(iii) Consultancy"                   dtm={f2(cConsDtm)} cum={f2(cConsCum)} cumPct={pct(cConsCum, cTotTgt)} />
              <Row label="(iv) Testing / Calibration Services" dtm={f2(cTestDtm)} cum={f2(cTestCum)} cumPct={pct(cTestCum, cTotTgt)} alt />
              <Row label="(v) Misc."                           dtm={f2(cMiscDtm)} cum={f2(cMiscCum)} cumPct={pct(cMiscCum, cTotTgt)} />
              <TotRow label="Total — Cash Basis"
                target={tgt(cTotTgt)} dtm={f2(cTotDtm)} cum={f2(cTotCum)} cumPct={pct(cTotCum, cTotTgt)} />

              <Sub indent>(b) Accrual Basis (Rs. in Lakh)</Sub>
              <Row label="(i) Training"                        dtm={f2(aTrngDtm)} cum={f2(aTrngCum)} cumPct={pct(aTrngCum, aTotTgt)} alt />
              <Row label="(ii) Production — Tooling"           dtm={f2(aToolDtm)} cum={f2(aToolCum)} cumPct={pct(aToolCum, aTotTgt)} />
              <Row label="(ii) Production — Other Job Work"    dtm={f2(aJobDtm)}  cum={f2(aJobCum)}  cumPct={pct(aJobCum,  aTotTgt)} alt />
              <Row label="(iii) Consultancy"                   dtm={f2(aConsDtm)} cum={f2(aConsCum)} cumPct={pct(aConsCum, aTotTgt)} />
              <Row label="(iv) Testing / Calibration Services" dtm={f2(aTestDtm)} cum={f2(aTestCum)} cumPct={pct(aTestCum, aTotTgt)} alt />
              <Row label="(v) Misc."                           dtm={f2(aMiscDtm)} cum={f2(aMiscCum)} cumPct={pct(aMiscCum, aTotTgt)} />
              <TotRow label="Total — Accrual Basis"
                target={tgt(aTotTgt)} dtm={f2(aTotDtm)} cum={f2(aTotCum)} cumPct={pct(aTotCum, aTotTgt)} />

              <Sub>(2) Revenue Expenditure (Rs. in Lakh)</Sub>
              <Row label="(a) Cash Basis"    target={tgt(n(finTgt.revExpCash))}    dtm={f2(revExpCDtm)} cum={f2(revExpCCum)} cumPct={pct(revExpCCum, n(finTgt.revExpCash))} alt />
              <Row label="(b) Accrual Basis" target={tgt(n(finTgt.revExpAccrual))} dtm={f2(revExpADtm)} cum={f2(revExpACum)} cumPct={pct(revExpACum, n(finTgt.revExpAccrual))} />

              <Sub>(3) Excess of Income over Expenditure (Rs. in Lakh)</Sub>
              <SimpleRow label="(a) Cash Basis"    dtm={f2(exCDtm)} cum={f2(exCCum)} alt />
              <SimpleRow label="(b) Accrual Basis"  dtm={f2(exADtm)} cum={f2(exACum)} />

              <Sub>(4) %age Recovery</Sub>
              <Row label="(a) Cash Basis"    target={tgt(perRecCTgt, 2)} dtm={f2(perRecCDtm) + '%'} cum="-" cumPct={pct(cTotCum, cTotTgt)} alt />
              <Row label="(b) Accrual Basis" target={tgt(perRecATgt, 2)} dtm={f2(perRecADtm) + '%'} cum="-" cumPct={pct(aTotCum, aTotTgt)} />

              {/* ════════════════════════════════════════
                  B. PHYSICAL
                  ════════════════════════════════════════ */}
              <Sec>B. PHYSICAL</Sec>
              <Sub>Number of Unit Benefited</Sub>

              <Sub indent>(a) Number of Tooling Work</Sub>
              <Row label="(i) MSMEs — Nos."               dtm={f0(twMsmeNosDtm)} cum={f0(twMsmeNosCum)} cumPct="-" alt />
              <Row label="(i) MSMEs — Values (Rs. Lakh)"  dtm={f2(twMsmeValDtm)} cum={f2(twMsmeValCum)} cumPct="-" />
              <Row label="(ii) Others — Nos."              dtm={f0(twOthNosDtm)}  cum={f0(twOthNosCum)}  cumPct="-" alt />
              <Row label="(ii) Others — Values (Rs. Lakh)" dtm={f2(twOthValDtm)} cum={f2(twOthValCum)}   cumPct="-" />

              <Sub indent>(b) Number of Other Job Work</Sub>
              <Row label="(i) MSMEs — Nos."               dtm={f0(ojwMsmeNosDtm)} cum={f0(ojwMsmeNosCum)} cumPct="-" alt />
              <Row label="(i) MSMEs — Values (Rs. Lakh)"  dtm={f2(ojwMsmeValDtm)} cum={f2(ojwMsmeValCum)} cumPct="-" />
              <Row label="(ii) Others — Nos."              dtm={f0(ojwOthNosDtm)}  cum={f0(ojwOthNosCum)}  cumPct="-" alt />
              <Row label="(ii) Others — Values (Rs. Lakh)" dtm={f2(ojwOthValDtm)} cum={f2(ojwOthValCum)}   cumPct="-" />

              <Sub indent>(c) Consultancies</Sub>
              <Row label="(i) MSMEs"   dtm={f0(msmeConsDtm)} cum={f0(msmeConsCum)} cumPct="-" alt />
              <Row label="(ii) Others" dtm={f0(othConsDtm)}  cum={f0(othConsCum)}  cumPct="-" />

              <Sub indent>(d) Any Others</Sub>
              <Row label="Any Others" dtm={f0(anyOthDtm)} cum={f0(anyOthCum)} cumPct="-" alt />

              <TotRow label="Total (a+b+c+d) — Nos."
                target={tgt(phyNosToTTgt, 0)} dtm={f0(phyNosToTDtm)} cum={f0(phyNosToTCum)}
                cumPct={pct(phyNosToTCum, phyNosToTTgt)} />
              <TotRow label="Total (a+b+c+d) — Values (Rs. Lakh)"
                dtm={f2(phyValToTDtm)} cum={f2(phyValToTCum)} cumPct="-" />

              {/* Training Activities */}
              <Sub>Training Activities</Sub>
              <Sub indent>(a) Long Term Courses (course-wise)</Sub>
              <Row label="Total Trainees (Long Term)" dtm={f0(ltcTotDtm)} cum={f0(ltcTotCum)} cumPct="-" alt />

              <Sub indent>(b) Short Term Courses</Sub>
              <Row label="(i) Number of Courses Completed"         dtm={f0(stmNocDtm)}  cum={f0(stmNocCum)}  cumPct="-" alt />
              <Row label="(ii) Number of Trainees Trained"         dtm={f0(stmNottDtm)} cum={f0(stmNottCum)} cumPct="-" />
              <Row label="(c) Others"                              dtm={f0(trngOthDtm)} cum={f0(trngOthCum)} cumPct="-" alt />

              <TotRow label="Total (a+b+c) — No. of Courses"
                dtm={f0(trngNocDtm)} cum={f0(trngNocCum)} cumPct="-" />
              <TotRow label="Total (a+b+c) — No. of Trainees"
                target={tgt(trngNotTgt, 0)} dtm={f0(trngNotDtm)} cum={f0(trngNotCum)}
                cumPct={pct(trngNotCum, trngNotTgt)} />

              <Sub indent>Seminars / Workshops</Sub>
              <Row label="No. of Seminars / Workshops" dtm={f0(semNosDtm)} cum={f0(semNosCum)} cumPct="-" alt />
              <Row label="No. of Participants"         dtm={f0(semPtsDtm)} cum={f0(semPtsCum)} cumPct="-" />

              {/* C. Category Bifurcation */}
              <Sec>C. Trainees Trained — Category Bifurcation</Sec>
              <tr>
                <th className="mpr-col-hdr">Category</th>
                <th className="mpr-col-hdr">-</th>
                <th className="mpr-col-hdr">During Month</th>
                <th className="mpr-col-hdr">Cumulative</th>
                <th className="mpr-col-hdr">-</th>
              </tr>
              <Row label="GEN"   dtm={f0(genDtm)} cum={f0(genCum)} cumPct="-" alt />
              <Row label="SC"    dtm={f0(scDtm)}  cum={f0(scCum)}  cumPct="-" />
              <Row label="ST"    dtm={f0(stDtm)}  cum={f0(stCum)}  cumPct="-" alt />
              <Row label="OBC"   dtm={f0(obcDtm)} cum={f0(obcCum)} cumPct="-" />
              <Row label="Minority" dtm={f0(minDtm)} cum={f0(minCum)} cumPct="-" alt />
              <TotRow label="Total" dtm={f0(catTDtm)} cum={f0(catTCum)} cumPct="-" />

              {/* D. Gender Bifurcation */}
              <Sec>D. Trainees Trained — Gender Bifurcation</Sec>
              <tr>
                <th className="mpr-col-hdr">Category</th>
                <th className="mpr-col-hdr">-</th>
                <th className="mpr-col-hdr">During Month</th>
                <th className="mpr-col-hdr">Cumulative</th>
                <th className="mpr-col-hdr">-</th>
              </tr>
              <Row label="MEN"         dtm={f0(menDtm)}   cum={f0(menCum)}   cumPct="-" alt />
              <Row label="WOMEN"       dtm={f0(wmnDtm)}   cum={f0(wmnCum)}   cumPct="-" />
              <Row label="TRANSGENDER" dtm={f0(transDtm)} cum={f0(transCum)} cumPct="-" alt />
              <TotRow label="Total"    dtm={f0(genTDtm)}  cum={f0(genTCum)}  cumPct="-" />

              {/* E+F. Qualification Bifurcation */}
              <Sec>E & F. Trainees Trained — Qualification Bifurcation</Sec>
              <tr>
                <th className="mpr-col-hdr">Qualification</th>
                <th className="mpr-col-hdr">-</th>
                <th className="mpr-col-hdr">During Month</th>
                <th className="mpr-col-hdr">Cumulative</th>
                <th className="mpr-col-hdr">-</th>
              </tr>
              <Row label="HSC (10th) Dropout / Below 10th"     dtm={f0(thFaDtm)} cum={f0(thFaCum)} cumPct="-" alt />
              <Row label="HSC (10th Pass)"                     dtm={f0(thPaDtm)} cum={f0(thPaCum)} cumPct="-" />
              <Row label="Intermediate (12th)"                 dtm={f0(twlDtm)}  cum={f0(twlCum)}  cumPct="-" alt />
              <Row label="ITI & Pursuing"                      dtm={f0(itiDtm)}  cum={f0(itiCum)}  cumPct="-" />
              <Row label="Diploma & Pursuing"                  dtm={f0(dipDtm)}  cum={f0(dipCum)}  cumPct="-" alt />
              <Row label="Graduate (Non-Tech) & Pursuing"      dtm={f0(gntDtm)}  cum={f0(gntCum)}  cumPct="-" />
              <Row label="Graduate (Tech) & Pursuing"          dtm={f0(gtDtm)}   cum={f0(gtCum)}   cumPct="-" alt />
              <Row label="Post Graduate (Non-Tech) & Pursuing" dtm={f0(pgntDtm)} cum={f0(pgntCum)} cumPct="-" />
              <Row label="Post Graduate (Tech) & Pursuing"     dtm={f0(pgtDtm)}  cum={f0(pgtCum)}  cumPct="-" alt />
              <Row label="Ph.D / M.Phil"                       dtm={f0(phdDtm)}  cum={f0(phdCum)}  cumPct="-" />
              <TotRow label="Total (All Qualifications)"       dtm={f0(qualAllDtm)} cum={f0(qualAllCum)} cumPct="-" />

              {/* G. Age Bifurcation */}
              <Sec>G. Trainees Trained — Age Bifurcation</Sec>
              <tr>
                <th className="mpr-col-hdr">Age Group</th>
                <th className="mpr-col-hdr">-</th>
                <th className="mpr-col-hdr">During Month</th>
                <th className="mpr-col-hdr">Cumulative</th>
                <th className="mpr-col-hdr">-</th>
              </tr>
              <Row label="15 – 20 years"  dtm={f0(a15Dtm)} cum={f0(a15Cum)} cumPct="-" alt />
              <Row label="21 – 25 years"  dtm={f0(a21Dtm)} cum={f0(a21Cum)} cumPct="-" />
              <Row label="26 – 30 years"  dtm={f0(a26Dtm)} cum={f0(a26Cum)} cumPct="-" alt />
              <Row label="31 – 40 years"  dtm={f0(a31Dtm)} cum={f0(a31Cum)} cumPct="-" />
              <Row label="Above 40 years" dtm={f0(abvDtm)} cum={f0(abvCum)} cumPct="-" alt />
              <TotRow label="Total"       dtm={f0(ageTDtm)} cum={f0(ageTCum)} cumPct="-" />

              {/* PH */}
              <Sec>Physically Handicapped (PH) Trainees</Sec>
              <Row label="PH Trainees" dtm={f0(phTrDtm)} cum={f0(phTrCum)} cumPct="-" />

              {/* H. Budget */}
              <Sec>H. Budget & Expenditure (Carry Forward + GIA)</Sec>
              <Row label="Carry Forward — Utilization (Rs. Lakh)"
                target={tgt(n(budEx.cfAmount))} dtm={f2(cfDtm)} cum={f2(cfCum)} cumPct="-" alt />
              <Row label="GIA — Utilization (Rs. Lakh)"
                target={tgt(n(budEx.giaAmount))} dtm={f2(giaDtm)} cum={f2(giaCum)} cumPct="-" />

              {/* I. Staff Strength */}
              <Sec>I. Staff Strength</Sec>
              <tr>
                <td className="mpr-text-cell" colSpan={5}>
                  <table className="mpr-staff-tbl">
                    <thead>
                      <tr>
                        <th>Group</th>
                        <th>Sanctioned</th>
                        <th>In Position</th>
                        <th>Vacancy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['Group A', ssA, posA],['Group B', ssB, posB],['Group C', ssC, posC],['Group D', ssD, posD]].map(([g, s, p]) => (
                        <tr key={g}>
                          <td style={{ textAlign: 'left', fontWeight: 600 }}>{g}</td>
                          <td>{s}</td><td>{p}</td><td>{s - p}</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#dce8f5', fontWeight: 700 }}>
                        <td style={{ textAlign: 'left' }}>Total</td>
                        <td>{ssT}</td><td>{posT}</td><td>{ssT - posT}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* J. Machine Procured */}
              <Sec>J. Machines / Equipments Procured</Sec>
              <Row label="No. of Machines / Equipments" dtm={f0(machDtm)} cum={f0(machCum)} cumPct="-" />

              {/* K. Details of Visits */}
              <TxtRow label="K. Details of Visits" content={detailVisit} />

              {/* L. Significant Achievements */}
              <Sec>L. Significant Achievements</Sec>

              {achData.importRows && achData.importRows.length > 0 && (
                <>
                  <tr>
                    <td className="mpr-sub-hdr2" colSpan={5}>Import Substitution &amp; Export Support</td>
                  </tr>
                  <tr>
                    <td className="mpr-text-cell" colSpan={5}>
                      <table className="mpr-import-tbl">
                        <thead>
                          <tr>
                            <th style={{ width: 36 }}>#</th>
                            <th>Component Designed / Manufactured</th>
                            <th style={{ width: 180 }}>Imported From / Exported To</th>
                            <th style={{ width: 220 }}>Outcome</th>
                          </tr>
                        </thead>
                        <tbody>
                          {achData.importRows.map((r, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? '#f9fbff' : '#fff' }}>
                              <td style={{ textAlign: 'center', color: '#888' }}>{i + 1}</td>
                              <td>{r.component}</td>
                              <td>{r.importedFrom}</td>
                              <td>{r.outcome}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              )}

              {achData.technical && (
                <TxtRow label="Technical &amp; Production Achievements" content={achData.technical} />
              )}

              {(n(achData.highEndDtm) > 0 || n(achData.masterDtm) > 0) && (
                <>
                  <tr>
                    <td className="mpr-sub-hdr2" colSpan={5}>High-End Skilling</td>
                  </tr>
                  <tr>
                    <th className="mpr-col-hdr">Category</th>
                    <th className="mpr-col-hdr">-</th>
                    <th className="mpr-col-hdr">During Month</th>
                    <th className="mpr-col-hdr">Cumulative</th>
                    <th className="mpr-col-hdr">-</th>
                  </tr>
                  <Row label="High-End Skilling (AR/VR, AI, Robotics etc.)"
                    dtm={f0(n(achData.highEndDtm))} cum={f0(n(achData.highEndCum))} cumPct="-" alt />
                  <Row label="Certified Master Trainers / TOT / ToA"
                    dtm={f0(n(achData.masterDtm))} cum={f0(n(achData.masterCum))} cumPct="-" />
                </>
              )}

              {achData.mous && <TxtRow label="MoUs (Date of Execution, Purpose, Expected Outcomes)" content={achData.mous} />}
              {achData.earlierMous && <TxtRow label="Outcome of Earlier MoUs" content={achData.earlierMous} />}
              {achData.academia && <TxtRow label="Academia Linkages" content={achData.academia} />}
              {achData.awards && <TxtRow label="Awards and Recognitions" content={achData.awards} />}

              {/* M. Short Falls */}
              <TxtRow label="M. Short Falls / Problems Faced" content={shortFalls} />

              {/* N. Promotional Activities */}
              <Sec>N. Promotional Activities</Sec>
              <tr>
                <td className="mpr-text-cell mpr-nodata" colSpan={5}>(Not separately tracked — refer to Significant Achievements)</td>
              </tr>

              {/* O. Trainees Trained Under (D) */}
              <Sec>O. Trainees Trained Under</Sec>
              <tr>
                <td className="mpr-text-cell" colSpan={5}>
                  <table className="mpr-d-tbl">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>During Month</th>
                        <th>Cumulative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['(i) NSQF (Compliance — AICTE/NCVT/SCVTC Courses)', nsqfCDtm, nsqfCCum],
                        ['(ii) NSQF Exempted — 26 Courses',                   nsqfEDtm, nsqfECum],
                        ['(iii) Non-NSQF (Short Term / Tailor-Made Courses)', nonNDtm,  nonNCum ],
                      ].map(([label, dtm, cum], i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#f5f5f0' : '#fffef8' }}>
                          <td>{label}</td>
                          <td>{f0(dtm)}</td>
                          <td>{f0(cum)}</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#dce8f5', fontWeight: 700 }}>
                        <td>Total</td><td>{f0(dTotDtm)}</td><td>{f0(dTotCum)}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* P. Placement Section */}
              <Sec>P. Placement Section</Sec>
              <tr>
                <th className="mpr-col-hdr" colSpan={3}>Particulars</th>
                <th className="mpr-col-hdr">During Month</th>
                <th className="mpr-col-hdr">Cumulative</th>
              </tr>
              {[
                ['(i)    Trainees Certified',                                                                tCertDtm,  tCertCum],
                ['(ii)   Total Trainees opted for Placement',                                               tPlcDtm,   tPlcCum],
                ['(iii)  Trainees Registered on Sampark Portal',                                            tSmrkDtm,  tSmrkCum],
                ['(iv)   Candidates got Placement (through institute + after leaving)',                     cPlcdDtm,  cPlcdCum],
                ['(v)    Already Employed — attending for Re-skilling / Up-skilling',                      empTrnDtm, empTrnCum],
                ['(vi)   Opted for Higher Studies (incl. continuing education)',                            cHstdDtm,  cHstdCum],
                ['(vii)  Opted for Self-Employment',                                                        cSlfsDtm,  cSlfsCum],
                ['(viii) Yet to be Placed',                                                                  cTbpDtm,   cTbpCum],
              ].map(([label, dtm, cum], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#F2F2F2' : '#FBF8EF' }}>
                  <td className="mpr-part" colSpan={3}>{label}</td>
                  <td className="mpr-dtm">{f0(dtm)}</td>
                  <td className="mpr-cum">{f0(cum)}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #ddd', fontSize: 11, color: '#999', textAlign: 'right' }}>
          Report generated for {instName} — {displayMonth} {year}
        </div>

      </div>
    </div>
  );
}
