import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { TrophyOutlined, BankOutlined, ClusterOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ReportSelector from '../../components/ReportSelector';

export const ALL_INST = 'all';
const ALL_NAME = 'All institutes';

export default function AchievementReportPage() {
  const { selection } = useAuth();
  const [institutes, setInstitutes] = useState([]);
  const [loadingInst, setLoadingInst] = useState(true);
  const [instError, setInstError] = useState(null);
  const [selectedInst, setSelectedInst] = useState(ALL_INST);

  useEffect(() => {
    setLoadingInst(true);
    api.get('/institutes/active')
      .then(res => {
        const list = res.data?.data || [];
        setInstitutes(list);
        setInstError(null);
        // start on the institute chosen at login, when it is a real institute
        if (list.some(i => i.instId === selection?.instId)) setSelectedInst(selection.instId);
      })
      .catch(() => { setInstError('Could not load institutes — only the all-institutes view is available.'); setInstitutes([]); })
      .finally(() => setLoadingInst(false));
  }, [selection?.instId]);

  const isAll = selectedInst === ALL_INST;
  const instName = isAll ? ALL_NAME : (institutes.find(i => i.instId === selectedInst)?.instName || selectedInst);

  return (
    <ReportSelector
      title="Significant Achievement Report"
      description="Significant achievements of a technology centre for the month — same sections as the achievement entry form."
      target="/app/reports/achievement/report"
      icon={<TrophyOutlined />}
      includes={[
        '1. Import substitution & export support',
        '2. Technical & production achievements',
        '3. High-end skilling (month and cumulative)',
        '4–5. MoUs and outcome of earlier MoUs',
        '6–7. Academia linkages, awards & recognitions',
      ]}
      note={instError}
      top={(
        <>
          <span className="rs2-inst-label">Institute / Tool Room</span>
          <Select
            className="rs2-inst-select"
            size="large"
            showSearch
            loading={loadingInst}
            value={selectedInst}
            onChange={setSelectedInst}
            optionFilterProp="label"
            suffixIcon={<BankOutlined />}
            options={[
              { value: ALL_INST, label: `${ALL_NAME} (one after another)` },
              ...institutes.map(i => ({ value: i.instId, label: i.instName })),
            ]}
          />
        </>
      )}
      subject={<>{isAll ? <ClusterOutlined /> : <BankOutlined />} {instName}</>}
      buildState={(month, monthName, year) => ({ month, monthName, year, instId: selectedInst, instName })}
    />
  );
}
