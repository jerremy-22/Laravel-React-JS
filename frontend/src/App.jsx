
import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = '/api';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [error, setError] = useState('');

  // Fetch user if token exists
  const fetchUser = async (tok) => {
    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${tok || token}` },
      });
      setUser(res.data);
      setError('');
    } catch (err) {
      setUser(null);
      setError('Not authenticated');
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setToken(res.data.access_token);
      localStorage.setItem('token', res.data.access_token);
      fetchUser(res.data.access_token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      // ignore error
    }
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  // Auto-fetch user on mount if token
  React.useEffect(() => {
    if (token) fetchUser(token);
  }, [token]);

  return (
    <div className="auth-app">
      <h1>Laravel React Auth Demo</h1>
      {token && user ? (
        <div>
          <p>Welcome, {user.name || user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
