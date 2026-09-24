import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { LineChartOutlined, BankOutlined, ClusterOutlined } from '@ant-design/icons';
import api from '../../services/api';
import ReportSelector from '../../components/ReportSelector';

const ALL = 'totalInstitutes';
const ALL_NAME = 'Cumulative Of All Institutes';

export default function GraphicalReportPage() {
  const [institutes, setInstitutes] = useState([]);
  const [loadingInst, setLoadingInst] = useState(true);
  const [instError, setInstError] = useState(null);
  const [selectedInst, setSelectedInst] = useState(ALL);

  useEffect(() => {
    setLoadingInst(true);
    api.get('/institutes/active')
      .then(res => { setInstitutes(res.data?.data || []); setInstError(null); })
      .catch(() => { setInstError('Could not load institutes — only the cumulative view is available.'); setInstitutes([]); })
      .finally(() => setLoadingInst(false));
  }, []);

  const isAll = selectedInst === ALL;
  const instName = isAll ? ALL_NAME : (institutes.find(i => i.instId === selectedInst)?.instName || selectedInst);

  return (
    <ReportSelector
      title="Graphical Representation"
      description="Month-by-month charts of the monthly progress report of MSME-AB for a financial year."
      target="/app/reports/graphical/chart"
      icon={<LineChartOutlined />}
      yearOnly
      includes={[
        'Revenue, recurring expenditure and surplus — monthly and cumulative',
        'Trainees trained — monthly and cumulative',
        'Units assisted — monthly and cumulative',
        'For one institute or all institutes combined',
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
              { value: ALL, label: `${ALL_NAME} (all institutes)` },
              ...institutes.map(i => ({ value: i.instId, label: i.instName })),
            ]}
          />
        </>
      )}
      subject={<>{isAll ? <ClusterOutlined /> : <BankOutlined />} {instName}</>}
      buildState={(_month, _monthName, year) => ({ instId: selectedInst, instName, year, isAll })}
    />
  );
}
