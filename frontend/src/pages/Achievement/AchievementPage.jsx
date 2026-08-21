import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import { PlusOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './AchievementPage.css';

/* ═══════════════════════════════════════════════════════
   Mini Rich-Text Editor (contentEditable + toolbar)
   ═══════════════════════════════════════════════════════ */
function MiniEditor({ value, onChange, disabled, minRows = 5 }) {
  const ref = useRef(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (ref.current && value !== lastValue.current) {
      ref.current.innerHTML = value || '';
      lastValue.current = value;
    }
  }, [value]);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = value || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = useCallback((cmd, val = null) => {
    ref.current?.focus();
    document.execCommand(cmd, false, val);
    const html = ref.current?.innerHTML || '';
    lastValue.current = html;
    onChange(html);
  }, [onChange]);

  return (
    <div className={`ach-editor${disabled ? ' ach-editor-disabled' : ''}`}>
      {!disabled && (
        <div className="ach-toolbar">
          <button className="ach-tb-btn" title="Bold"      onMouseDown={e => { e.preventDefault(); exec('bold'); }}><b>B</b></button>
          <button className="ach-tb-btn" title="Italic"    onMouseDown={e => { e.preventDefault(); exec('italic'); }}><i>I</i></button>
          <button className="ach-tb-btn" title="Underline" onMouseDown={e => { e.preventDefault(); exec('underline'); }}><u>U</u></button>
          <span className="ach-tb-sep" />
          <button className="ach-tb-btn" title="Bullet list"   onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList'); }}>• List</button>
          <button className="ach-tb-btn" title="Numbered list" onMouseDown={e => { e.preventDefault(); exec('insertOrderedList'); }}>1. List</button>
          <span className="ach-tb-sep" />
          <button className="ach-tb-btn" title="Clear format"  onMouseDown={e => { e.preventDefault(); exec('removeFormat'); }}>Clear</button>
        </div>
      )}
      <div
        ref={ref}
        className="ach-editor-body"
        contentEditable={!disabled}
        suppressContentEditableWarning
        style={{ minHeight: `${minRows * 1.55}em` }}
        onInput={() => {
          const html = ref.current?.innerHTML || '';
          lastValue.current = html;
          onChange(html);
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════ */
const INIT_IMPORT_ROW = () => ({ component: '', importedFrom: '', outcome: '' });
const INIT = {
  note:        '',
  importRows:  [INIT_IMPORT_ROW()],
  technical:   '',
  highEndDtm:  '', highEndCum:   '',
  masterDtm:   '', masterCum:    '',
  mous:        '',
  earlierMous: '',
  academia:    '',
  awards:      '',
};

function parse(raw) {
  if (!raw) return INIT;
  try {
    const p = JSON.parse(raw);
    return { ...INIT, ...p };
  } catch {
    return { ...INIT, technical: raw };
  }
}

function stringify(form) { return JSON.stringify(form); }

/* ═══════════════════════════════════════════════════════
   Section heading component
   ═══════════════════════════════════════════════════════ */
function SectionHead({ num, title }) {
  return (
    <div className="ach-section-head">
      <span className="ach-section-num">{num}</span>
      <span className="ach-section-title">{title}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
export default function AchievementPage() {
  const { selection, user } = useAuth();
  const [form, setForm]       = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [loadErr, setLoadErr] = useState('');

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setHasData(false); setLoadErr('');
    api.get('/entry/achievement/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      if (data.hasData) {
        setHasData(true);
        setForm(parse(data.text));
        if (user?.role !== 'SU') setBlocked(true);
      } else {
        setForm(INIT);
      }
    }).catch(() => setLoadErr('Could not load achievement data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  const setField = useCallback((key, val) =>
    setForm(prev => ({ ...prev, [key]: val })), []);

  const setImportRow = (i, key, val) =>
    setForm(prev => {
      const rows = [...prev.importRows];
      rows[i] = { ...rows[i], [key]: val };
      return { ...prev, importRows: rows };
    });

  const addImportRow = () =>
    setForm(prev => ({ ...prev, importRows: [...prev.importRows, INIT_IMPORT_ROW()] }));

  const removeImportRow = (i) =>
    setForm(prev => ({
      ...prev,
      importRows: prev.importRows.length > 1 ? prev.importRows.filter((_, idx) => idx !== i) : prev.importRows,
    }));

  const handleSave = () => {
    if (!selection?.instId) { message.error('No institute selected.'); return; }
    setSaving(true);
    api.post('/entry/achievement/save', {
      instId: selection.instId,
      month:  selection.month,
      year:   selection.year,
      text:   stringify(form),
    }).then(() => {
      message.success('Significant Achievement saved!');
      setHasData(true);
      if (user?.role !== 'SU') setBlocked(true);
    }).catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  const handleReset = () => { setForm(INIT); };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  return (
    <div className="ach-page">
      {loadErr && <Alert type="warning" message={loadErr} style={{ margin: '8px 0' }} />}
      {blocked && <Alert type="error" message="Achievement already submitted for this month. Contact SU to modify." style={{ margin: '8px 0' }} />}

      {/* ── Title bar ── */}
      <div className="ach-titlebar">
        <div className="ach-titlebar-left">
          <span className="ach-page-label">Monthly Progress Report — Section A</span>
          <span className="ach-institute">{selection?.instName || 'Achievement Entry'}</span>
        </div>
        <div className="ach-titlebar-right">
          {selection?.monthName && (
            <span className="ach-meta-chip">{selection.monthName} {selection.year}</span>
          )}
        </div>
      </div>

      <div className="ach-main">

        {/* ── Note banner ── */}
        {(form.note || user?.role === 'SU') && (
          <div className="ach-note-banner">
            <span className="ach-note-label">Note :</span>
            {user?.role === 'SU' ? (
              <input
                className="ach-note-input"
                value={form.note}
                onChange={e => setField('note', e.target.value)}
                placeholder="Enter a note visible to all users (e.g. targets update message)..."
              />
            ) : (
              <span className="ach-note-text">{form.note}</span>
            )}
          </div>
        )}
        {(form.note || user?.role === 'SU') && <div className="ach-note-divider" />}

        {/* ── Page heading ── */}
        <div className="ach-page-heading">
          <h2>Significant Achievements</h2>
          <p className="ach-inst-sub">{selection?.instName || ''}</p>
        </div>

        {/* ══════════════════════════════
            1. Import Substitution
            ══════════════════════════════ */}
        <div className="ach-card">
          <SectionHead num="1" title="Import Substitution & Export Support" />
          <div className="ach-card-body">
            <div className="ach-import-table-wrap">
              <table className="ach-import-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th>Components Designed / Manufactured <span className="ach-hint">(50 words)</span></th>
                    <th style={{ width: 220 }}>Imported From / Exported To <span className="ach-hint">(5 words)</span></th>
                    <th style={{ width: 260 }}>Outcome <span className="ach-hint">(Cost / Lead time saving etc.)</span></th>
                    {!blocked && <th style={{ width: 40 }}></th>}
                  </tr>
                </thead>
                <tbody>
                  {form.importRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'ach-tr-a' : 'ach-tr-b'}>
                      <td className="ach-td-center" style={{ color: '#888' }}>{i + 1}</td>
                      <td>
                        <textarea
                          className="ach-cell-ta"
                          rows={3}
                          value={row.component}
                          disabled={blocked}
                          onChange={e => setImportRow(i, 'component', e.target.value)}
                          placeholder="Describe component..."
                        />
                      </td>
                      <td>
                        <input
                          className="ach-cell-inp"
                          value={row.importedFrom}
                          disabled={blocked}
                          onChange={e => setImportRow(i, 'importedFrom', e.target.value)}
                          placeholder="Country / company"
                        />
                      </td>
                      <td>
                        <input
                          className="ach-cell-inp"
                          value={row.outcome}
                          disabled={blocked}
                          onChange={e => setImportRow(i, 'outcome', e.target.value)}
                          placeholder="Cost saved, time reduced..."
                        />
                      </td>
                      {!blocked && (
                        <td className="ach-td-center">
                          <Button
                            size="small" danger type="text" icon={<DeleteOutlined />}
                            onClick={() => removeImportRow(i)}
                            disabled={form.importRows.length === 1}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!blocked && (
              <Button icon={<PlusOutlined />} size="small" onClick={addImportRow} style={{ marginTop: 6 }}>
                Add Row
              </Button>
            )}
          </div>
        </div>

        {/* ══════════════════════════════
            2. Technical & Production
            ══════════════════════════════ */}
        <div className="ach-card">
          <SectionHead num="2" title="Technical & Production Achievements" />
          <div className="ach-card-body">
            <MiniEditor
              value={form.technical}
              onChange={v => setField('technical', v)}
              disabled={blocked}
              minRows={6}
            />
          </div>
        </div>

        {/* ══════════════════════════════
            3. High-End Skilling
            ══════════════════════════════ */}
        <div className="ach-card">
          <SectionHead num="3" title="High-End Skilling" />
          <div className="ach-card-body">
            <table className="ach-he-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th style={{ width: 200 }}>Number of Trainees<br /><span className="ach-hint">During the Month</span></th>
                  <th style={{ width: 200 }}>Number of Trainees<br /><span className="ach-hint">Cumulative</span></th>
                </tr>
              </thead>
              <tbody>
                <tr className="ach-tr-a">
                  <td>
                    <div className="ach-he-cat">High-End Skilling</div>
                    <div className="ach-he-sub">e.g. Emerging Technologies like AR/VR, 3D Printing, AI in Mfg, Robotics, IoT etc.</div>
                  </td>
                  <td className="ach-td-center">
                    <input className="ach-num-inp" type="number" min="0"
                      value={form.highEndDtm} disabled={blocked}
                      onChange={e => setField('highEndDtm', e.target.value)} />
                  </td>
                  <td className="ach-td-center">
                    <input className="ach-num-inp" type="number" min="0"
                      value={form.highEndCum} disabled={blocked}
                      onChange={e => setField('highEndCum', e.target.value)} />
                  </td>
                </tr>
                <tr className="ach-tr-b">
                  <td>
                    <div className="ach-he-cat">Certified Master Trainers Trained / TOT / ToA</div>
                  </td>
                  <td className="ach-td-center">
                    <input className="ach-num-inp" type="number" min="0"
                      value={form.masterDtm} disabled={blocked}
                      onChange={e => setField('masterDtm', e.target.value)} />
                  </td>
                  <td className="ach-td-center">
                    <input className="ach-num-inp" type="number" min="0"
                      value={form.masterCum} disabled={blocked}
                      onChange={e => setField('masterCum', e.target.value)} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ══════════════════════════════
            4. MoUs
            ══════════════════════════════ */}
        <div className="ach-card">
          <SectionHead num="4" title="MoUs (Date of Execution, Purpose, Expected Outcomes)" />
          <div className="ach-card-body">
            <MiniEditor
              value={form.mous}
              onChange={v => setField('mous', v)}
              disabled={blocked}
              minRows={4}
            />
          </div>
        </div>

        {/* ══════════════════════════════
            5. Outcome of Earlier MoUs
            ══════════════════════════════ */}
        <div className="ach-card">
          <SectionHead num="5" title="Outcome of Earlier MoUs" />
          <div className="ach-card-body">
            <MiniEditor
              value={form.earlierMous}
              onChange={v => setField('earlierMous', v)}
              disabled={blocked}
              minRows={4}
            />
          </div>
        </div>

        {/* ══════════════════════════════
            6. Academia Linkages
            ══════════════════════════════ */}
        <div className="ach-card">
          <SectionHead num="6" title="Academia Linkages" />
          <div className="ach-card-body">
            <MiniEditor
              value={form.academia}
              onChange={v => setField('academia', v)}
              disabled={blocked}
              minRows={4}
            />
          </div>
        </div>

        {/* ══════════════════════════════
            7. Awards and Recognitions
            ══════════════════════════════ */}
        <div className="ach-card">
          <SectionHead num="7" title="Awards and Recognitions" />
          <div className="ach-card-body">
            <MiniEditor
              value={form.awards}
              onChange={v => setField('awards', v)}
              disabled={blocked}
              minRows={4}
            />
          </div>
        </div>

        {/* ── Action bar ── */}
        <div className="ach-actions">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleSave} loading={saving} disabled={blocked || hasData}>Add</Button>
          <Button onClick={handleSave} loading={saving} disabled={blocked || !hasData}>Update</Button>
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>Print</Button>
        </div>

      </div>
    </div>
  );
}
