import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './PhysicalPage.css';

/* ═══════════════════════════════════════════════════════
   Cell helpers — defined OUTSIDE component to avoid remount
   ═══════════════════════════════════════════════════════ */

function DashCell({ bg = '#f1f4f8' }) {
  return (
    <td className="phy-cell" style={{ background: bg, textAlign: 'center' }}>
      <input className="phy-input phy-ro" value="-" readOnly style={{ width: 70 }} />
    </td>
  );
}

function TgtCell({ value = 0, bg = '#f1f4f8' }) {
  return (
    <td className="phy-cell" style={{ background: bg, textAlign: 'center' }}>
      <input className="phy-input phy-ro" value={value != null ? value : '-'} readOnly style={{ width: 70 }} />
    </td>
  );
}

function CalcCell({ value, bg = '#f1f4f8', total = false }) {
  const display = typeof value === 'number'
    ? (Number.isInteger(value) ? value : value.toFixed(2))
    : (value ?? 0);
  return (
    <td className="phy-cell" style={{ background: bg, textAlign: 'center' }}>
      <input
        className={`phy-input phy-ro${total ? ' phy-total-input' : ''}`}
        value={display}
        readOnly
        style={{ width: 70 }}
      />
    </td>
  );
}

function PctCell({ cum, target, bg = '#f1f4f8' }) {
  const val = target > 0 ? ((cum / target) * 100).toFixed(2) : '-';
  return (
    <td className="phy-cell" style={{ background: bg, textAlign: 'center' }}>
      <input className="phy-input phy-ro" value={val} readOnly style={{ width: 70 }} />
    </td>
  );
}

function EditCell({ value, onChange, bg = '#fffef0' }) {
  return (
    <td className="phy-cell" style={{ background: bg, textAlign: 'center' }}>
      <input
        className="phy-input phy-editable"
        value={value}
        onChange={onChange}
        style={{ width: 70 }}
      />
    </td>
  );
}

/* small input for bifurcation cells */
function SmEditCell({ value, onChange, bg = '#fffef0' }) {
  return (
    <td className="phy-cell" style={{ background: bg, textAlign: 'center' }}>
      <input
        className="phy-input phy-editable"
        value={value}
        onChange={onChange}
        style={{ width: 55 }}
      />
    </td>
  );
}

function SmCalcCell({ value, bg = '#f1f4f8' }) {
  return (
    <td className="phy-cell" style={{ background: bg, textAlign: 'center' }}>
      <input className="phy-input phy-ro" value={value ?? 0} readOnly style={{ width: 55 }} />
    </td>
  );
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
const n = (v) => parseFloat(v) || 0;

const BG1 = '#F2F2F2';
const BG2 = '#FBF8EF';

const ZERO_PREV = {
  msmeNosNju: 0, msmeValuesNju: 0, otherNosNju: 0, otherValuesNju: 0,
  msmeCons: 0, otherCons: 0, anyOther: 0,
  stmNocComp: 0, stmNottComp: 0, trngOther: 0, trngTotalNoc: 0, trngTotalNot: 0,
  seminarsNos: 0, seminarsPts: 0,
  gen: 0, sc: 0, st: 0, obc: 0, min: 0,
  men: 0, wmn: 0, transgender: 0,
  thFail: 0, thPass: 0, twelfth: 0, iti: 0, diploma: 0,
  gradNonTech: 0, gradTech: 0, pgNonTech: 0, pgTech: 0, phdMhil: 0,
  a1520: 0, a2125: 0, a2630: 0, a3140: 0, above40: 0, ph: 0, ltcTotal: 0,
};

export default function PhysicalPage() {
  const { selection, user } = useAuth();

  const [PREV, setPrev]      = useState(ZERO_PREV);
  const [FIX_VAL1, setFix1]  = useState(0); // phy_total_nos_target
  const [FIX_VAL2, setFix2]  = useState(0); // trng_total_not_target
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [loadErr, setLoadErr] = useState('');

  /* ── editable DTM state ── */
  const INIT_DTM = {
    msmeNosNju: '', msmeValuesNju: '',
    otherNosNju: '', otherValuesNju: '',
    msmeCons: '', otherCons: '',
    anyOther: '',
    stmNocComp: '', stmNottComp: '', trngOther: '',
    trngTotalNoc: '', trngTotalNot: '',
    seminarsNos: '', seminarsPts: '',
    gen: '', sc: '', st: '', obc: '', min: '', ph: '',
    men: '', wmn: '', transgender: '',
    thFail: '', thPass: '', twelfth: '', iti: '', diploma: '', gradNonTech: '', gradTech: '',
    pgNonTech: '', pgTech: '', phdMhil: '',
    a1520: '', a2125: '', a2630: '', a3140: '', above40: '',
  };

  const [dtm, setDtm] = useState(INIT_DTM);
  const [ltcCourses, setLtcCourses] = useState(
    Array.from({ length: 25 }, () => ({ name: '', dtm: '', cumMon: '' }))
  );

  const set = (key) => (e) => setDtm((prev) => ({ ...prev, [key]: e.target.value }));

  const setLtc = (i, field) => (e) => {
    setLtcCourses((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: e.target.value };
      return next;
    });
  };

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setLoadErr('');
    api.get('/entry/physical/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      setPrev({ ...ZERO_PREV, ...(data.prevCum || {}) });
      if (data.targets) {
        if (data.targets.phyTotalNos != null) setFix1(data.targets.phyTotalNos);
        if (data.targets.trngTotalNot != null) setFix2(data.targets.trngTotalNot);
      }
      if (data.hasData) {
        if (user?.role === 'SU') {
          const ex = data.existing || {};
          setDtm(prev => ({ ...prev, ...ex }));
        } else {
          setBlocked(true);
        }
      }
    }).catch(() => setLoadErr('Could not load form data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  const handleSave = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    setSaving(true);
    const ltcDtmTotal = ltcCourses.reduce((s, r) => s + n(r.dtm), 0);
    api.post('/entry/physical/save', {
      instId: selection.instId, month: selection.month, year: selection.year,
      ...dtm,
      ltcTotal: ltcDtmTotal,
    }).then(() => message.success('Physical data saved successfully!'))
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  /* ── Section B computed values ── */
  const msmeNosNjuCum    = PREV.msmeNosNju    + n(dtm.msmeNosNju);
  const msmeValuesNjuCum = PREV.msmeValuesNju + n(dtm.msmeValuesNju);
  const otherNosNjuCum   = PREV.otherNosNju   + n(dtm.otherNosNju);
  const otherValuesNjuCum= PREV.otherValuesNju+ n(dtm.otherValuesNju);
  const msmeConsCum      = PREV.msmeCons      + n(dtm.msmeCons);
  const otherConsCum     = PREV.otherCons     + n(dtm.otherCons);
  const anyOtherCum      = PREV.anyOther      + n(dtm.anyOther);

  // Physical total Nos (a+b+c)
  const phyTotalNosDtm = n(dtm.msmeNosNju) + n(dtm.otherNosNju) + n(dtm.msmeCons) + n(dtm.otherCons) + n(dtm.anyOther);
  const phyTotalNosCum = msmeNosNjuCum + otherNosNjuCum + msmeConsCum + otherConsCum + anyOtherCum;

  // Physical total Values (only NJU has values)
  const phyTotalValuesDtm = n(dtm.msmeValuesNju) + n(dtm.otherValuesNju);
  const phyTotalValuesCum = msmeValuesNjuCum + otherValuesNjuCum;

  /* ── Training computed values ── */
  const ltcDtmTotal  = ltcCourses.reduce((s, r) => s + n(r.dtm),    0);
  const ltcCumTotal  = ltcCourses.reduce((s, r) => s + n(r.cumMon), 0);

  const stmNocCompCum  = PREV.stmNocComp  + n(dtm.stmNocComp);
  const stmNottCompCum = PREV.stmNottComp + n(dtm.stmNottComp);
  const trngOtherCum   = PREV.trngOther   + n(dtm.trngOther);

  const trngTotalNocCum = PREV.trngTotalNoc + n(dtm.trngTotalNoc);
  const trngTotalNotCum = PREV.trngTotalNot + n(dtm.trngTotalNot);

  const seminarsNosCum = PREV.seminarsNos + n(dtm.seminarsNos);
  const seminarsPtsCum = PREV.seminarsPts + n(dtm.seminarsPts);

  /* ── Bifurcation C (Category) ── */
  const genCum  = PREV.gen  + n(dtm.gen);
  const scCum   = PREV.sc   + n(dtm.sc);
  const stCum   = PREV.st   + n(dtm.st);
  const obcCum  = PREV.obc  + n(dtm.obc);
  const minCum  = PREV.min  + n(dtm.min);
  const catDtmTotal  = n(dtm.gen)  + n(dtm.sc) + n(dtm.st) + n(dtm.obc) + n(dtm.min);
  const catCumTotal  = genCum + scCum + stCum + obcCum + minCum;

  /* ── Bifurcation D (Gender) ── */
  const menCum   = PREV.men         + n(dtm.men);
  const wmnCum   = PREV.wmn         + n(dtm.wmn);
  const transCum = PREV.transgender + n(dtm.transgender);
  const genDtmTotal = n(dtm.men) + n(dtm.wmn) + n(dtm.transgender);
  const genCumTotal = menCum + wmnCum + transCum;

  /* ── Bifurcation E (Qualification part 1) ── */
  const thFailCum    = PREV.thFail     + n(dtm.thFail);
  const thPassCum    = PREV.thPass     + n(dtm.thPass);
  const twelfthCum   = PREV.twelfth    + n(dtm.twelfth);
  const itiCum       = PREV.iti        + n(dtm.iti);
  const diplomaCum   = PREV.diploma    + n(dtm.diploma);
  const gradNTCum    = PREV.gradNonTech+ n(dtm.gradNonTech);
  const gradTCum     = PREV.gradTech   + n(dtm.gradTech);
  const qualEDtmTot  = n(dtm.thFail)+n(dtm.thPass)+n(dtm.twelfth)+n(dtm.iti)+n(dtm.diploma)+n(dtm.gradNonTech)+n(dtm.gradTech);
  const qualECumTot  = thFailCum+thPassCum+twelfthCum+itiCum+diplomaCum+gradNTCum+gradTCum;

  /* ── Bifurcation F (Qualification part 2) ── */
  const pgNTCum     = PREV.pgNonTech + n(dtm.pgNonTech);
  const pgTCum      = PREV.pgTech    + n(dtm.pgTech);
  const phdMhilCum  = PREV.phdMhil   + n(dtm.phdMhil);
  const qualFDtmTot = n(dtm.pgNonTech)+n(dtm.pgTech)+n(dtm.phdMhil);
  const qualFCumTot = pgNTCum+pgTCum+phdMhilCum;
  // Grand totals for E+F
  const qualAllDtm = qualEDtmTot + qualFDtmTot;
  const qualAllCum = qualECumTot + qualFCumTot;

  /* ── Bifurcation G (Age) ── */
  const a1520Cum  = PREV.a1520  + n(dtm.a1520);
  const a2125Cum  = PREV.a2125  + n(dtm.a2125);
  const a2630Cum  = PREV.a2630  + n(dtm.a2630);
  const a3140Cum  = PREV.a3140  + n(dtm.a3140);
  const aboveCum  = PREV.above40+ n(dtm.above40);
  const ageDtmTot = n(dtm.a1520)+n(dtm.a2125)+n(dtm.a2630)+n(dtm.a3140)+n(dtm.above40);
  const ageCumTot = a1520Cum+a2125Cum+a2630Cum+a3140Cum+aboveCum;

  /* ── Bifurcation H (PH) ── */
  const phCum = PREV.ph + n(dtm.ph);

  /* ── Handlers ── */
  const handleReset = () => {
    setDtm(INIT_DTM);
    setLtcCourses(Array.from({ length: 25 }, () => ({ name: '', dtm: '', cumMon: '' })));
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  /* ── Render ── */
  return (
    <div className="phy-page">
      {loadErr && <Alert type="warning" message={loadErr} style={{ margin: '8px 0' }} />}
      {blocked && <Alert type="error" message="Data already submitted for this month. Contact SU to modify." style={{ margin: '8px 0' }} />}

      {/* ── Title Bar ── */}
      <div className="phy-titlebar">
        <div className="phy-titlebar-left">
          <span className="phy-page-label">Monthly Progress Report — Section B</span>
          <span className="phy-institute">{selection?.instName || 'Physical Section'}</span>
        </div>
        <div className="phy-titlebar-right">
          {selection?.monthName && (
            <span className="phy-meta-chip">
              {selection.monthName} {selection.year}
            </span>
          )}
          <span className="phy-note">* All Nos. fields are integer | Values in Rs. Lakh</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CARD 1 — SECTION B: Physical + Training
          ══════════════════════════════════════════════════ */}
      <div className="phy-card">
        <div className="phy-table-wrap">
          <table className="phy-table">
            <thead>
              <tr>
                <th className="phy-th" colSpan={4} rowSpan={2}>Physical Part</th>
                <th className="phy-th" rowSpan={2}>Target</th>
                <th className="phy-th" colSpan={3}>Achievement</th>
              </tr>
              <tr>
                <th className="phy-th">Trainees trained<br />During the month</th>
                <th className="phy-th">Cumulative<br />upto the month</th>
                <th className="phy-th">Cumulative %age<br />w.r.t Annual Target</th>
              </tr>
            </thead>
            <tbody>

              {/* ─ B. PHYSICAL header ─ */}
              <tr>
                <td className="phy-cell phy-letter" rowSpan={13}><b>B.</b></td>
                <td className="phy-cell phy-section-hdr" colSpan={7}><b>PHYSICAL</b></td>
              </tr>
              <tr>
                <td className="phy-cell phy-sub-hdr" colSpan={7}><b>Number of unit benefited</b></td>
              </tr>
              <tr>
                <td className="phy-cell phy-slabel" colSpan={7}>(a) <b>Number of job undertaken</b></td>
              </tr>

              {/* (i) MSMEs */}
              <tr>
                <td className="phy-cell phy-slabel" rowSpan={2}>(i) MSMEs</td>
                <td className="phy-cell" colSpan={2} style={{ background: BG1 }}>Nos.</td>
                <DashCell bg={BG1} />
                <EditCell value={dtm.msmeNosNju}    onChange={set('msmeNosNju')}    bg={BG1} />
                <CalcCell value={msmeNosNjuCum}    bg={BG1} />
                <DashCell bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell" colSpan={2} style={{ background: BG2 }}>Values (Rs. In Lakh)</td>
                <DashCell bg={BG2} />
                <EditCell value={dtm.msmeValuesNju} onChange={set('msmeValuesNju')} bg={BG2} />
                <CalcCell value={msmeValuesNjuCum}  bg={BG2} />
                <DashCell bg={BG2} />
              </tr>

              {/* (ii) Others */}
              <tr>
                <td className="phy-cell phy-slabel" rowSpan={2}>(ii) Others</td>
                <td className="phy-cell" colSpan={2} style={{ background: BG1 }}>Nos.</td>
                <DashCell bg={BG1} />
                <EditCell value={dtm.otherNosNju}    onChange={set('otherNosNju')}    bg={BG1} />
                <CalcCell value={otherNosNjuCum}    bg={BG1} />
                <DashCell bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell" colSpan={2} style={{ background: BG2 }}>Values (Rs. In Lakh)</td>
                <DashCell bg={BG2} />
                <EditCell value={dtm.otherValuesNju} onChange={set('otherValuesNju')} bg={BG2} />
                <CalcCell value={otherValuesNjuCum}  bg={BG2} />
                <DashCell bg={BG2} />
              </tr>

              {/* (b) Consultancies */}
              <tr>
                <td className="phy-cell phy-slabel" colSpan={7}>(b) <b>Consultancies</b></td>
              </tr>
              <tr>
                <td className="phy-cell phy-slabel" colSpan={3}>(i) MSMEs</td>
                <DashCell bg={BG1} />
                <EditCell value={dtm.msmeCons}  onChange={set('msmeCons')}  bg={BG1} />
                <CalcCell value={msmeConsCum}   bg={BG1} />
                <DashCell bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-slabel" colSpan={3}>(ii) Others</td>
                <DashCell bg={BG2} />
                <EditCell value={dtm.otherCons} onChange={set('otherCons')} bg={BG2} />
                <CalcCell value={otherConsCum}  bg={BG2} />
                <DashCell bg={BG2} />
              </tr>

              {/* (c) Any others */}
              <tr>
                <td className="phy-cell phy-slabel" colSpan={3}>(c) <b>Any others</b></td>
                <DashCell bg={BG1} />
                <EditCell value={dtm.anyOther}  onChange={set('anyOther')}  bg={BG1} />
                <CalcCell value={anyOtherCum}   bg={BG1} />
                <DashCell bg={BG1} />
              </tr>

              {/* Total (a+b+c) */}
              <tr>
                <td className="phy-cell phy-slabel" rowSpan={2}><b>Total<br />(a+b+c)</b></td>
                <td className="phy-cell" colSpan={2} style={{ background: BG2 }}>Nos.</td>
                <TgtCell value={FIX_VAL1} bg={BG2} />
                <CalcCell value={phyTotalNosDtm}  bg={BG2} total />
                <CalcCell value={phyTotalNosCum}  bg={BG2} total />
                <PctCell  cum={phyTotalNosCum} target={FIX_VAL1} bg={BG2} />
              </tr>
              <tr>
                <td className="phy-cell" colSpan={2} style={{ background: BG1 }}>Values (Rs. In Lakh)</td>
                <DashCell bg={BG1} />
                <CalcCell value={phyTotalValuesDtm} bg={BG1} total />
                <CalcCell value={phyTotalValuesCum}  bg={BG1} total />
                <DashCell bg={BG1} />
              </tr>

              {/* ─ Training Activities ─ */}
              <tr>
                <td className="phy-cell" rowSpan={11}></td>
                <td className="phy-cell phy-section-hdr" colSpan={7}><b>Training activities</b></td>
              </tr>
              <tr>
                <td className="phy-cell phy-slabel" colSpan={7}>
                  (a) <b>Long term courses</b> (course-wise details of trainees)
                </td>
              </tr>

              {/* LTC sub-table */}
              <tr>
                <td className="phy-cell" colSpan={7} style={{ padding: 8 }}>
                  <div className="phy-ltc-scroll">
                    <table className="phy-ltc-table">
                      <thead>
                        <tr>
                          <th className="phy-ltc-th" style={{ width: 36 }}>S.No</th>
                          <th className="phy-ltc-th" style={{ width: 260 }}>Name of the program</th>
                          <th className="phy-ltc-th" style={{ width: 70 }}>Target</th>
                          <th className="phy-ltc-th" style={{ width: 90 }}>During the Month</th>
                          <th className="phy-ltc-th" style={{ width: 90 }}>Cumulative upto the month</th>
                          <th className="phy-ltc-th" style={{ width: 90 }}>Cumulative %age</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ltcCourses.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'phy-ltc-row1' : 'phy-ltc-row2'}>
                            <td className="phy-ltc-cell" style={{ textAlign: 'center', color: '#555' }}>{i + 1}</td>
                            <td className="phy-ltc-cell">
                              <input
                                className="phy-ltc-name-input phy-editable"
                                value={row.name}
                                onChange={setLtc(i, 'name')}
                                style={{ width: '98%' }}
                              />
                            </td>
                            <td className="phy-ltc-cell" style={{ textAlign: 'center', background: '#f1f4f8' }}>
                              <input className="phy-input phy-ro" value="-" readOnly style={{ width: 60 }} />
                            </td>
                            <td className="phy-ltc-cell" style={{ textAlign: 'center' }}>
                              <input
                                className="phy-input phy-editable"
                                value={row.dtm}
                                onChange={setLtc(i, 'dtm')}
                                style={{ width: 72 }}
                              />
                            </td>
                            <td className="phy-ltc-cell" style={{ textAlign: 'center' }}>
                              <input
                                className="phy-input phy-editable"
                                value={row.cumMon}
                                onChange={setLtc(i, 'cumMon')}
                                style={{ width: 72 }}
                              />
                            </td>
                            <td className="phy-ltc-cell" style={{ textAlign: 'center', background: '#f1f4f8' }}>
                              <input className="phy-input phy-ro" value="-" readOnly style={{ width: 60 }} />
                            </td>
                          </tr>
                        ))}
                        {/* Total row */}
                        <tr style={{ background: '#e8f0fa' }}>
                          <td className="phy-ltc-cell" colSpan={2} style={{ fontWeight: 'bold', color: '#073354', paddingLeft: 8 }}>Total</td>
                          <td className="phy-ltc-cell" style={{ textAlign: 'center', background: '#f1f4f8' }}>
                            <input className="phy-input phy-ro" value="-" readOnly style={{ width: 60 }} />
                          </td>
                          <td className="phy-ltc-cell" style={{ textAlign: 'center' }}>
                            <input className="phy-input phy-ro phy-total-input" value={ltcDtmTotal} readOnly style={{ width: 72 }} />
                          </td>
                          <td className="phy-ltc-cell" style={{ textAlign: 'center' }}>
                            <input className="phy-input phy-ro phy-total-input" value={ltcCumTotal} readOnly style={{ width: 72 }} />
                          </td>
                          <td className="phy-ltc-cell" style={{ textAlign: 'center', background: '#f1f4f8' }}>
                            <input className="phy-input phy-ro" value="-" readOnly style={{ width: 60 }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>

              {/* (b) Short term */}
              <tr>
                <td className="phy-cell phy-slabel" colSpan={7}>(b) <b>Short term</b></td>
              </tr>
              <tr>
                <td className="phy-cell phy-slabel" colSpan={3}>(i) Number of courses completed</td>
                <DashCell bg={BG1} />
                <EditCell value={dtm.stmNocComp}  onChange={set('stmNocComp')}  bg={BG1} />
                <CalcCell value={stmNocCompCum}   bg={BG1} />
                <DashCell bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-slabel" colSpan={3}>(ii) Number of trainees trained (completed)</td>
                <DashCell bg={BG2} />
                <EditCell value={dtm.stmNottComp} onChange={set('stmNottComp')} bg={BG2} />
                <CalcCell value={stmNottCompCum}  bg={BG2} />
                <DashCell bg={BG2} />
              </tr>
              <tr>
                <td className="phy-cell phy-slabel" colSpan={3}>(c) <b>Others</b></td>
                <DashCell bg={BG1} />
                <EditCell value={dtm.trngOther}   onChange={set('trngOther')}   bg={BG1} />
                <CalcCell value={trngOtherCum}    bg={BG1} />
                <DashCell bg={BG1} />
              </tr>

              {/* Total (a+b+c) Training */}
              <tr>
                <td className="phy-cell phy-slabel" rowSpan={2}><b>Total<br />(a+b+c)</b></td>
                <td className="phy-cell" colSpan={2} style={{ background: BG2 }}>No. of courses</td>
                <DashCell bg={BG2} />
                <EditCell value={dtm.trngTotalNoc} onChange={set('trngTotalNoc')} bg={BG2} />
                <CalcCell value={trngTotalNocCum}  bg={BG2} total />
                <DashCell bg={BG2} />
              </tr>
              <tr>
                <td className="phy-cell" colSpan={2} style={{ background: BG1 }}>No. of Trainees</td>
                <TgtCell value={FIX_VAL2} bg={BG1} />
                <EditCell value={dtm.trngTotalNot} onChange={set('trngTotalNot')} bg={BG1} />
                <CalcCell value={trngTotalNotCum}  bg={BG1} total />
                <PctCell  cum={trngTotalNotCum} target={FIX_VAL2} bg={BG1} />
              </tr>

              {/* Seminars / Workshops */}
              <tr>
                <td className="phy-cell phy-slabel" rowSpan={2}>Seminars /<br />Workshops</td>
                <td className="phy-cell" colSpan={2} style={{ background: BG2 }}>No.</td>
                <DashCell bg={BG2} />
                <EditCell value={dtm.seminarsNos}  onChange={set('seminarsNos')} bg={BG2} />
                <CalcCell value={seminarsNosCum}   bg={BG2} />
                <DashCell bg={BG2} />
              </tr>
              <tr>
                <td className="phy-cell" colSpan={2} style={{ background: BG1 }}>Participants</td>
                <DashCell bg={BG1} />
                <EditCell value={dtm.seminarsPts}  onChange={set('seminarsPts')} bg={BG1} />
                <CalcCell value={seminarsPtsCum}   bg={BG1} />
                <DashCell bg={BG1} />
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CARD 2 — SECTION C: Trainees bifurcation (Category)
          ══════════════════════════════════════════════════ */}
      <div className="phy-card phy-card-mt">
        <div className="phy-card-title">C. Trainees Trained — Category Bifurcation</div>
        <div className="phy-table-wrap">
          <table className="phy-table">
            <tbody>
              <tr>
                <td className="phy-cell phy-letter" rowSpan={4}><b>C.</b></td>
                <td className="phy-cell phy-bifur-label" rowSpan={2} style={{ background: BG2, width: 260 }}>
                  (a) Trainees trained (bifurcation)<br />(During the month)
                </td>
                <th className="phy-th" style={{ width: 70 }}>GEN</th>
                <th className="phy-th" style={{ width: 70 }}>SC</th>
                <th className="phy-th" style={{ width: 70 }}>ST</th>
                <th className="phy-th" style={{ width: 70 }}>OBC</th>
                <th className="phy-th" style={{ width: 70 }}>Min.</th>
                <th className="phy-th" style={{ width: 70 }}>Total</th>
              </tr>
              <tr>
                <SmEditCell value={dtm.gen} onChange={set('gen')} bg={BG1} />
                <SmEditCell value={dtm.sc}  onChange={set('sc')}  bg={BG1} />
                <SmEditCell value={dtm.st}  onChange={set('st')}  bg={BG1} />
                <SmEditCell value={dtm.obc} onChange={set('obc')} bg={BG1} />
                <SmEditCell value={dtm.min} onChange={set('min')} bg={BG1} />
                <SmCalcCell value={catDtmTotal} bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-bifur-label" rowSpan={2} style={{ background: BG1 }}>
                  (b) Trainees trained (bifurcation)<br />(Cumulative)
                </td>
                <th className="phy-th">GEN</th>
                <th className="phy-th">SC</th>
                <th className="phy-th">ST</th>
                <th className="phy-th">OBC</th>
                <th className="phy-th">Min.</th>
                <th className="phy-th">Total</th>
              </tr>
              <tr>
                <SmCalcCell value={genCum}  bg={BG2} />
                <SmCalcCell value={scCum}   bg={BG2} />
                <SmCalcCell value={stCum}   bg={BG2} />
                <SmCalcCell value={obcCum}  bg={BG2} />
                <SmCalcCell value={minCum}  bg={BG2} />
                <SmCalcCell value={catCumTotal} bg={BG2} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CARD 3 — SECTION D: Gender bifurcation
          ══════════════════════════════════════════════════ */}
      <div className="phy-card phy-card-mt">
        <div className="phy-card-title">D. Trainees Trained — Gender Bifurcation</div>
        <div className="phy-table-wrap">
          <table className="phy-table">
            <tbody>
              <tr>
                <td className="phy-cell phy-letter" rowSpan={4}><b>D.</b></td>
                <td className="phy-cell phy-bifur-label" rowSpan={2} style={{ background: BG2, width: 260 }}>
                  (a) Trainees trained (bifurcation)<br />(During the month)
                </td>
                <th className="phy-th" style={{ width: 90 }}>MEN</th>
                <th className="phy-th" style={{ width: 90 }}>WOMEN</th>
                <th className="phy-th" style={{ width: 90 }}>TRANSGENDER</th>
                <th className="phy-th" style={{ width: 90 }}>Total</th>
              </tr>
              <tr>
                <SmEditCell value={dtm.men}         onChange={set('men')}         bg={BG1} />
                <SmEditCell value={dtm.wmn}         onChange={set('wmn')}         bg={BG1} />
                <SmEditCell value={dtm.transgender} onChange={set('transgender')} bg={BG1} />
                <SmCalcCell value={genDtmTotal} bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-bifur-label" rowSpan={2} style={{ background: BG1 }}>
                  (b) Trainees trained (bifurcation)<br />(Cumulative)
                </td>
                <th className="phy-th">MEN</th>
                <th className="phy-th">WOMEN</th>
                <th className="phy-th">TRANSGENDER</th>
                <th className="phy-th">Total</th>
              </tr>
              <tr>
                <SmCalcCell value={menCum}   bg={BG2} />
                <SmCalcCell value={wmnCum}   bg={BG2} />
                <SmCalcCell value={transCum} bg={BG2} />
                <SmCalcCell value={genCumTotal} bg={BG2} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CARD 4 — SECTIONS E+F: Qualification bifurcation
          ══════════════════════════════════════════════════ */}
      <div className="phy-card phy-card-mt">
        <div className="phy-card-title">E & F. Trainees Trained — Qualification Bifurcation</div>
        <div className="phy-table-wrap">
          {/* Part E — 7 qualification columns */}
          <table className="phy-table" style={{ marginBottom: 8 }}>
            <thead>
              <tr>
                <th className="phy-th" rowSpan={2} style={{ width: 28 }}>E.</th>
                <th className="phy-th" rowSpan={2} style={{ width: 220 }}>Category</th>
                <th className="phy-th">HSC(10th)<br />Dropout / Below 10th</th>
                <th className="phy-th">HSC(10th)</th>
                <th className="phy-th">Intermediate (12th)</th>
                <th className="phy-th">ITI & Pursuing</th>
                <th className="phy-th">Diploma & Pursuing</th>
                <th className="phy-th">Graduate (Non-Tech) & Pursuing</th>
                <th className="phy-th">Graduate (Tech) & Pursuing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG2 }}>
                  (a) During the month
                </td>
                <SmEditCell value={dtm.thFail}     onChange={set('thFail')}     bg={BG1} />
                <SmEditCell value={dtm.thPass}     onChange={set('thPass')}     bg={BG1} />
                <SmEditCell value={dtm.twelfth}    onChange={set('twelfth')}    bg={BG1} />
                <SmEditCell value={dtm.iti}        onChange={set('iti')}        bg={BG1} />
                <SmEditCell value={dtm.diploma}    onChange={set('diploma')}    bg={BG1} />
                <SmEditCell value={dtm.gradNonTech}onChange={set('gradNonTech')}bg={BG1} />
                <SmEditCell value={dtm.gradTech}   onChange={set('gradTech')}   bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG1 }}>
                  (b) Cumulative
                </td>
                <SmCalcCell value={thFailCum}  bg={BG2} />
                <SmCalcCell value={thPassCum}  bg={BG2} />
                <SmCalcCell value={twelfthCum} bg={BG2} />
                <SmCalcCell value={itiCum}     bg={BG2} />
                <SmCalcCell value={diplomaCum} bg={BG2} />
                <SmCalcCell value={gradNTCum}  bg={BG2} />
                <SmCalcCell value={gradTCum}   bg={BG2} />
              </tr>
            </tbody>
          </table>

          {/* Part F — PG + Total */}
          <table className="phy-table">
            <thead>
              <tr>
                <th className="phy-th" rowSpan={2} style={{ width: 28 }}>F.</th>
                <th className="phy-th" rowSpan={2} style={{ width: 220 }}>Category</th>
                <th className="phy-th">Post Graduate<br />(Non-Tech) & Pursuing</th>
                <th className="phy-th">Post Graduate<br />(Tech) & Pursuing</th>
                <th className="phy-th">Ph.D / M.Phil</th>
                <th className="phy-th">Total<br />(All Qualifications)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG2 }}>
                  (a) During the month
                </td>
                <SmEditCell value={dtm.pgNonTech} onChange={set('pgNonTech')} bg={BG1} />
                <SmEditCell value={dtm.pgTech}    onChange={set('pgTech')}    bg={BG1} />
                <SmEditCell value={dtm.phdMhil}   onChange={set('phdMhil')}   bg={BG1} />
                <SmCalcCell value={qualAllDtm}    bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG1 }}>
                  (b) Cumulative
                </td>
                <SmCalcCell value={pgNTCum}     bg={BG2} />
                <SmCalcCell value={pgTCum}      bg={BG2} />
                <SmCalcCell value={phdMhilCum}  bg={BG2} />
                <SmCalcCell value={qualAllCum}  bg={BG2} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CARD 5 — SECTION G: Age bifurcation
          ══════════════════════════════════════════════════ */}
      <div className="phy-card phy-card-mt">
        <div className="phy-card-title">G. Trainees Trained — Age Bifurcation</div>
        <div className="phy-table-wrap">
          <table className="phy-table">
            <thead>
              <tr>
                <th className="phy-th" rowSpan={2} style={{ width: 28 }}>G.</th>
                <th className="phy-th" rowSpan={2} style={{ width: 220 }}>Category</th>
                <th className="phy-th" style={{ width: 80 }}>15 – 20</th>
                <th className="phy-th" style={{ width: 80 }}>21 – 25</th>
                <th className="phy-th" style={{ width: 80 }}>26 – 30</th>
                <th className="phy-th" style={{ width: 80 }}>31 – 40</th>
                <th className="phy-th" style={{ width: 80 }}>Above 40</th>
                <th className="phy-th" style={{ width: 80 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG2 }}>
                  (a) During the month
                </td>
                <SmEditCell value={dtm.a1520}   onChange={set('a1520')}   bg={BG1} />
                <SmEditCell value={dtm.a2125}   onChange={set('a2125')}   bg={BG1} />
                <SmEditCell value={dtm.a2630}   onChange={set('a2630')}   bg={BG1} />
                <SmEditCell value={dtm.a3140}   onChange={set('a3140')}   bg={BG1} />
                <SmEditCell value={dtm.above40} onChange={set('above40')} bg={BG1} />
                <SmCalcCell value={ageDtmTot}   bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG1 }}>
                  (b) Cumulative
                </td>
                <SmCalcCell value={a1520Cum}  bg={BG2} />
                <SmCalcCell value={a2125Cum}  bg={BG2} />
                <SmCalcCell value={a2630Cum}  bg={BG2} />
                <SmCalcCell value={a3140Cum}  bg={BG2} />
                <SmCalcCell value={aboveCum}  bg={BG2} />
                <SmCalcCell value={ageCumTot} bg={BG2} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CARD 6 — SECTION H: PH (Physically Handicapped)
          ══════════════════════════════════════════════════ */}
      <div className="phy-card phy-card-mt">
        <div className="phy-card-title">H. Trainees Trained — Physically Handicapped (PH)</div>
        <div className="phy-table-wrap">
          <table className="phy-table">
            <thead>
              <tr>
                <th className="phy-th" rowSpan={2} style={{ width: 28 }}>H.</th>
                <th className="phy-th" rowSpan={2} style={{ width: 260 }}>Category</th>
                <th className="phy-th" style={{ width: 120 }}>PH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG2 }}>
                  (a) During the month
                </td>
                <SmEditCell value={dtm.ph} onChange={set('ph')} bg={BG1} />
              </tr>
              <tr>
                <td className="phy-cell phy-bifur-label" colSpan={2} style={{ background: BG1 }}>
                  (b) Cumulative
                </td>
                <SmCalcCell value={phCum} bg={BG2} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Action bar ── */}
      <div className="phy-actions">
        <Button onClick={handleReset} disabled={blocked}>Reset</Button>
        <Button type="primary" onClick={handleSave} loading={saving} disabled={blocked}>Save</Button>
      </div>

    </div>
  );
}
