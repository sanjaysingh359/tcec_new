/* The four Monthly Progress Report applications. Each one is a separate system with its own
   database and users; the one chosen on the landing page is sent to the backend (X-App header)
   and locks the session to that application's data. */

export const APPS = {
  dfo: {
    key: 'dfo', code: 'DFO', title: 'Monthly Progress Report-DFO',
    subtitle: 'District Field Office', color: '#1f6fb2',
    comingSoon: true,
  },
  tcec: {
    key: 'tcec', code: 'TCEC', title: 'Monthly Progress Report-TCEC',
    subtitle: 'Technology Centre & Extension Centre', color: '#1e7e34',
    loginHint: 'TCEC-Johrat', institutes: 'Technology Centres & TCECs',
    // legacy TCEC had no Significant Achievement module — only the Budget form's text box (MPR section L)
    achievements: false,
  },
  ab: {
    key: 'ab', code: 'AB', title: 'Monthly Progress Report-AB',
    subtitle: 'MSME Autonomous Body', color: '#b01818',
    institutes: 'MSME Autonomous Bodies',   // database dcmsme_tool; login names known once its data is loaded
    achievements: true,
  },
  tcsp: {
    key: 'tcsp', code: 'TCSP', title: 'Monthly Progress Report-TCSP',
    subtitle: 'Technology Centre Scheme Project', color: '#b36b00',
    loginHint: 'TC-Bhiwadi', institutes: 'Technology Centres (TCSP)',
    achievements: true,
  },
};

export const APP_ORDER = ['dfo', 'tcec', 'ab', 'tcsp'];

const STORAGE_KEY = 'mpr_app';

export function getAppKey() {
  try { return sessionStorage.getItem(STORAGE_KEY); } catch { return null; }
}

export function setAppKey(key) {
  try { sessionStorage.setItem(STORAGE_KEY, key); } catch { /* storage unavailable */ }
  setDocTitle();
}

export function clearAppKey() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ }
}

/** The application chosen on the landing page, or null when none has been chosen yet. */
export function currentApp() {
  const key = getAppKey();
  return (key && APPS[key] && !APPS[key].comingSoon) ? APPS[key] : null;
}

/** Does the chosen application have the Significant Achievement module (entry page + reports)? */
export function hasAchievements() {
  return !!currentApp()?.achievements;
}

/** Short product name used in headers and menus, e.g. "MPR-TCSP". */
export function mprName() {
  const app = currentApp();
  return app ? `MPR-${app.code}` : 'MPR';
}

/** Browser tab title for the chosen application. */
export function setDocTitle() {
  document.title = `${mprName()} | DC-MSME`;
}
