import { createContext, useContext, useState } from 'react';
import api from '../services/api';
import { getAppKey } from '../utils/apps';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // A session belongs to the application it was opened in; after switching application
  // (landing page) the old session is dropped and the user signs in to the new one.
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('tcec_user');
    const u = stored ? JSON.parse(stored) : null;
    if (u && u.app !== getAppKey()) {
      sessionStorage.removeItem('tcec_user');
      sessionStorage.removeItem('tcec_selection');
      return null;
    }
    return u;
  });

  const [selection, setSelection] = useState(() => {
    const stored = sessionStorage.getItem('tcec_selection');
    return stored && sessionStorage.getItem('tcec_user') ? JSON.parse(stored) : null;
  });

  function login(userData) {
    const withApp = { ...userData, app: getAppKey() };
    sessionStorage.setItem('tcec_user', JSON.stringify(withApp));
    setUser(withApp);
  }

  async function logout() {
    // Call backend to invalidate the token
    try {
      await api.post('/auth/logout');
    } catch (_) {
      // Silent — we clear local state regardless
    }
    sessionStorage.removeItem('tcec_user');
    sessionStorage.removeItem('tcec_selection');
    setUser(null);
    setSelection(null);
  }

  function saveSelection(sel) {
    sessionStorage.setItem('tcec_selection', JSON.stringify(sel));
    setSelection(sel);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, selection, saveSelection }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
