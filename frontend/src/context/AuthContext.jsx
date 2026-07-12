import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('tcec_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [selection, setSelection] = useState(() => {
    const stored = sessionStorage.getItem('tcec_selection');
    return stored ? JSON.parse(stored) : null;
  });

  function login(userData) {
    sessionStorage.setItem('tcec_user', JSON.stringify(userData));
    setUser(userData);
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
