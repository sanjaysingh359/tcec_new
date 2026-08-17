import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './AchievementPage.css';

export default function AchievementPage() {
  const { selection, user } = useAuth();
  const [text, setText]       = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [loadErr, setLoadErr] = useState('');

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setLoadErr('');
    api.get('/entry/achievement/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      setText(data.text || '');
      if (data.hasData && user?.role !== 'SU') {
        setBlocked(true);
      }
    }).catch(() => setLoadErr('Could not load achievement data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  const handleSave = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    setSaving(true);
    api.post('/entry/achievement/save', {
      instId: selection.instId,
      month:  selection.month,
      year:   selection.year,
      text,
    }).then(() => {
      message.success('Significant Achievement saved successfully!');
      if (user?.role !== 'SU') setBlocked(true);
    }).catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  return (
    <div className="ach-page">
      {loadErr && <Alert type="warning" message={loadErr} style={{ margin: '8px 0' }} />}
      {blocked && <Alert type="error" message="Achievement already submitted for this month. Contact SU to modify." style={{ margin: '8px 0' }} />}

      {/* Title Bar */}
      <div className="ach-titlebar">
        <div className="ach-titlebar-left">
          <span className="ach-page-label">Monthly Progress Report — Significant Achievement</span>
          <span className="ach-institute">{selection?.instName || 'Achievement Entry'}</span>
        </div>
        <div className="ach-titlebar-right">
          {selection?.monthName && (
            <span className="ach-meta-chip">{selection.monthName} {selection.year}</span>
          )}
        </div>
      </div>

      <div className="ach-card">
        <div className="ach-card-title">
          Significant Achievements during {selection?.monthName || 'the month'}
        </div>
        <div className="ach-card-body">
          <label className="ach-label">
            Enter significant achievements, notable activities, milestones, and highlights for this month:
          </label>
          <textarea
            className="ach-textarea"
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={blocked}
            placeholder="Describe the significant achievements of the institute for this month..."
            rows={10}
          />
          <div className="ach-char-count">{text.length} characters</div>
        </div>
      </div>

      <div className="ach-actions">
        <Button onClick={() => setText('')} disabled={blocked}>Clear</Button>
        <Button type="primary" onClick={handleSave} loading={saving} disabled={blocked}>
          Save Achievement
        </Button>
      </div>
    </div>
  );
}
