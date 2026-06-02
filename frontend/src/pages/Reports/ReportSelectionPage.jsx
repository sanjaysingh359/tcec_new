/**
 * Shared selection page used by all trainee / report sub-pages.
 * Props:
 *   title       – report title
 *   description – one-line summary shown in the card
 *   icon        – emoji or text icon shown in the header
 *   accentColor – hex for the left accent bar & button
 *   navigateTo  – route to push on submit
 *   hasInstitute – (future) show institute dropdown
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MONTHS = [
  { value:'1', label:'April' }, { value:'2', label:'May' },
  { value:'3', label:'June' }, { value:'4', label:'July' },
  { value:'5', label:'August' }, { value:'6', label:'September' },
  { value:'7', label:'October' }, { value:'8', label:'November' },
  { value:'9', label:'December' }, { value:'10', label:'January' },
  { value:'11', label:'February' }, { value:'12', label:'March' },
];

const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

export default function ReportSelectionPage({
  title,
  description,
  icon = '📊',
  accentColor = '#073354',
  navigateTo,
}) {
  const { selection } = useAuth();
  const navigate = useNavigate();

  const [month, setMonth] = useState(selection?.month || '1');
  const [year,  setYear]  = useState(selection?.year  || YEARS[0]);

  const monthLabel = MONTHS.find(m => m.value === month)?.label || '';

  function handleSubmit(e) {
    e.preventDefault();
    navigate(navigateTo, { state: { month, monthName: monthLabel.toUpperCase(), year } });
  }

  return (
    <div className="rsel-wrap">
      <div className="rsel-card">

        {/* ── Coloured accent bar ── */}
        <div className="rsel-accent" style={{ background: accentColor }} />

        {/* ── Card header ── */}
        <div className="rsel-header">
          <div className="rsel-icon" style={{ background: accentColor + '18', color: accentColor }}>
            {icon}
          </div>
          <div>
            <div className="rsel-title">{title}</div>
            {description && <div className="rsel-desc">{description}</div>}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="rsel-divider" />

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} autoComplete="off" className="rsel-form">

          <div className="rsel-fields">

            {/* Month */}
            <div className="rsel-field">
              <label className="rsel-lbl">Month</label>
              <div className="rsel-select-wrap">
                <select
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  className="rsel-select"
                >
                  {MONTHS.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <span className="rsel-arrow">▾</span>
              </div>
            </div>

            {/* Year */}
            <div className="rsel-field">
              <label className="rsel-lbl">Year</label>
              <div className="rsel-select-wrap">
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="rsel-select"
                >
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="rsel-arrow">▾</span>
              </div>
            </div>

          </div>

          {/* Preview pill */}
          <div className="rsel-preview">
            Generating report for&nbsp;
            <strong>{monthLabel} {year}</strong>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="rsel-btn"
            style={{ background: accentColor }}
          >
            Generate Report &nbsp;→
          </button>

        </form>
      </div>
    </div>
  );
}
