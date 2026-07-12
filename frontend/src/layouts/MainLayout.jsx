import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'antd';
import {
  HomeOutlined, DollarOutlined, BarChartOutlined, PieChartOutlined,
  TeamOutlined, AimOutlined, UserSwitchOutlined,
  FileTextOutlined, EditOutlined, LockOutlined, LogoutOutlined,
  LineChartOutlined, FundOutlined, PhoneOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

/* ── Nav definitions ── */
function buildNav(role, section) {
  const isSU  = role === 'SU';
  const entry = section === '1';

  const entryNav = [
    { divider: 'Main' },
    { key: '/dashboard',           icon: <HomeOutlined />,       label: 'Application Home Page' },
    { divider: 'Data Entry' },
    isSU && { key: '/app/target',  icon: <AimOutlined />,        label: 'Annual Target' },
    { key: '/app/financial',       icon: <DollarOutlined />,     label: 'Financial Section' },
    { key: '/app/physical',        icon: <BarChartOutlined />,   label: 'Physical Section' },
    { key: '/app/budget',          icon: <FundOutlined />,       label: 'Budget Section' },
    { key: '/app/placement',       icon: <UserSwitchOutlined />, label: 'Placement Section' },
    { divider: 'Account' },
    { key: '/app/change-password', icon: <LockOutlined />,       label: 'Change Password' },
    { key: '/app/contact',         icon: <PhoneOutlined />,      label: 'Contact Us' },
    { key: '__logout__',           icon: <LogoutOutlined />,     label: 'Logout' },
  ].filter(Boolean);

  // SU sees all reports + Update/Delete; IU sees only Graphical + MPR-AB
  const suReportNav = [
    { divider: 'Main' },
    { key: '/dashboard',                          icon: <HomeOutlined />,      label: 'Application Home Page' },
    { key: '/app/reports/graphical',              icon: <LineChartOutlined />, label: 'Graphical Representation' },
    { divider: 'Trainees Trained' },
    { key: '/app/reports/trainees/category',      icon: <TeamOutlined />,      label: 'Category wise' },
    { key: '/app/reports/trainees/gender',        icon: <TeamOutlined />,      label: 'Gender wise' },
    { key: '/app/reports/trainees/qualification', icon: <TeamOutlined />,      label: 'Qualification wise' },
    { key: '/app/reports/trainees/age',           icon: <TeamOutlined />,      label: 'Age wise' },
    { divider: 'Reports' },
    { key: '/app/reports/budget',                 icon: <FundOutlined />,      label: 'Budget Report' },
    { key: '/app/reports/target',                 icon: <AimOutlined />,       label: 'Target Report' },
    { key: '/app/reports/mpr',                    icon: <FileTextOutlined />,  label: 'MPR-AB Report' },
    { key: '/app/reports/analysis',               icon: <PieChartOutlined />,  label: 'Analysis Report' },
    { key: '/app/reports/rfd',                    icon: <BarChartOutlined />,  label: 'Report for RFD' },
    { key: '/app/modify-data',                    icon: <EditOutlined />,      label: 'Update / Delete' },
    { divider: 'Account' },
    { key: '/app/contact',                        icon: <PhoneOutlined />,     label: 'Contact Us' },
    { key: '__logout__',                          icon: <LogoutOutlined />,    label: 'Logout' },
  ];

  const iuReportNav = [
    { divider: 'Main' },
    { key: '/dashboard',             icon: <HomeOutlined />,      label: 'Application Home Page' },
    { key: '/app/reports/graphical', icon: <LineChartOutlined />, label: 'Graphical Representation' },
    { divider: 'Reports' },
    { key: '/app/reports/mpr',       icon: <FileTextOutlined />,  label: 'MPR-AB Report' },
    { divider: 'Account' },
    { key: '/app/contact',           icon: <PhoneOutlined />,     label: 'Contact Us' },
    { key: '__logout__',             icon: <LogoutOutlined />,    label: 'Logout' },
  ];

  if (entry) return entryNav;
  return isSU ? suReportNav : iuReportNav;
}

/* ── Custom nav components ── */
function NavDivider({ label, collapsed }) {
  if (collapsed) return <div className="sn-divider-collapsed" />;
  return <div className="sn-divider"><span>{label}</span></div>;
}

function NavItem({ icon, label, active, onClick, collapsed, sub }) {
  return (
    <div
      className={`sn-item${active ? ' sn-active' : ''}${sub ? ' sn-sub' : ''}`}
      onClick={onClick}
      title={collapsed ? label : undefined}
    >
      <span className="sn-icon">{icon}</span>
      {!collapsed && <span className="sn-label">{label}</span>}
      {active && !collapsed && <span className="sn-active-dot" />}
    </div>
  );
}

function SubGroup({ item, selectedKey, onSelect, collapsed }) {
  const hasActive = item.children?.some(c => c.key === selectedKey);
  const [open, setOpen] = useState(hasActive);

  return (
    <div className={`sn-group-root${open ? ' sn-group-open' : ''}`}>
      <div
        className={`sn-item sn-group${hasActive ? ' sn-parent-active' : ''}`}
        onClick={() => !collapsed && setOpen(o => !o)}
        title={collapsed ? item.label : undefined}
      >
        <span className="sn-icon">{item.icon}</span>
        {!collapsed && (
          <>
            <span className="sn-label">{item.label}</span>
            <span className={`sn-arrow${open ? ' sn-arrow-open' : ''}`}>▾</span>
          </>
        )}
      </div>
      {!collapsed && open && (
        <div className="sn-children">
          {item.children?.map(c => (
            <div
              key={c.key}
              className={`sn-child-item${selectedKey === c.key ? ' sn-child-active' : ''}`}
              onClick={() => onSelect(c.key)}
            >
              <span className="sn-child-dot" />
              <span className="sn-child-label">{c.label}</span>
              {selectedKey === c.key && <span className="sn-active-dot" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Avatar initials ── */
function Avatar({ name }) {
  const letter = (name || 'U')[0].toUpperCase();
  return <span className="ml-avatar">{letter}</span>;
}

/* ── Main Layout ── */
export default function MainLayout() {
  const { user, selection, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const nav = buildNav(user?.role, selection?.section);
  const currentKey = location.pathname;
  const username = user?.userId || user?.uid || user?.userName || 'User';
  const isEntry  = selection?.section === '1';

  function handleLogout() { logout(); navigate('/login'); }

  const userDropdown = {
    items: [
      { key: 'name',    label: username, disabled: true },
      { type: 'divider' },
      { key: 'pwd',     icon: <LockOutlined />,   label: 'Change Password' },
      { key: 'switch',  icon: <HomeOutlined />,   label: 'Switch Month / Section' },
      { type: 'divider' },
      { key: 'logout',  icon: <LogoutOutlined />, label: 'Logout', danger: true },
    ],
    onClick: ({ key }) => {
      if      (key === 'logout') handleLogout();
      else if (key === 'pwd')    navigate('/app/change-password');
      else if (key === 'switch') navigate('/dashboard');
    },
  };

  return (
    <div className="ml-shell">

      {/* ══════════════ HEADER ══════════════ */}
      <header className="ml-topbar">
        <div className="ml-topbar-left">
          <button className="ml-collapse-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
          <div className="ml-topbar-divider" />
          <img src="/images/india-gov-logo.jpg" className="ml-topbar-logo" alt=""
            onError={e => { e.target.src = '/images/india-gov-logo.gif'; }} />
          <div className="ml-topbar-org">
            <div className="ml-topbar-org-main">Office of Development Commissioner (MSME)</div>
            <div className="ml-topbar-org-sub">Ministry of Micro, Small &amp; Medium Enterprises</div>
          </div>
        </div>

        <div className="ml-topbar-right">
          {selection && (
            <div className="ml-chips">
              <span className="ml-chip ml-chip-inst">{selection.instName}</span>
              <span className="ml-chip ml-chip-month">{selection.monthName} {selection.year}</span>
              <span className={`ml-chip ${isEntry ? 'ml-chip-entry' : 'ml-chip-report'}`}>
                {isEntry ? 'Entry' : 'Reports'}
              </span>
            </div>
          )}
          <Dropdown menu={userDropdown} placement="bottomRight" trigger={['click']}>
            <button className="ml-user-pill">
              <Avatar name={username} />
              <span className="ml-user-name">{username}</span>
              <DownOutlined style={{ fontSize: 10, opacity: 0.7 }} />
            </button>
          </Dropdown>
        </div>
      </header>

      {/* ══════════════ BODY ══════════════ */}
      <div className="ml-body">

        {/* ── SIDEBAR ── */}
        <aside className={`ml-sidebar${collapsed ? ' ml-sidebar-collapsed' : ''}`}>

          {/* Brand */}
          <div className="sn-brand">
            <div className="sn-brand-monogram">{collapsed ? 'M' : 'MPR'}</div>
            {!collapsed && <div className="sn-brand-title">TCEC Portal</div>}
            {!collapsed && <div className="sn-brand-sub">Ministry of MSME</div>}
            {!collapsed && (
              <div className={`sn-brand-badge ${isEntry ? 'sn-badge-entry' : 'sn-badge-report'}`}>
                {isEntry ? '● Entry Section' : '● Report Section'}
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="sn-nav">
            {nav.map((item, i) => {
              if (item.divider) return (
                <NavDivider key={`d${i}`} label={item.divider} collapsed={collapsed} />
              );
              return (
                <NavItem
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  active={item.key !== '__logout__' && currentKey === item.key}
                  onClick={() => item.key === '__logout__' ? handleLogout() : navigate(item.key)}
                  collapsed={collapsed}
                />
              );
            })}
          </nav>
        </aside>

        {/* ── CONTENT ── */}
        <main className="ml-main">
          <div className="ml-content-area">
            <Outlet />
          </div>
          <footer className="ml-footer">
            <span>Created &amp; Designed by O/O DC-MSME</span>
            <span>Contact Us : 011-23062354 (Senet Division)</span>
          </footer>
        </main>

      </div>
    </div>
  );
}
