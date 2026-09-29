import axios from 'axios';
import { getAppKey } from '../utils/apps';

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const user = sessionStorage.getItem('tcec_user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  // application chosen on the landing page — selects that application's database on the server
  const app = getAppKey();
  if (app) config.headers['X-App'] = app;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Redirect to login on 401 ONLY for authenticated calls (not the login request itself).
    // Without this check, a wrong-password 401 would reload the page before the error message shows.
    const isLoginCall = err.config?.url?.includes('/auth/login');
    if (err.response?.status === 401 && !isLoginCall) {
      // sign out, but keep the chosen application so the user lands on its login page
      sessionStorage.removeItem('tcec_user');
      sessionStorage.removeItem('tcec_selection');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
