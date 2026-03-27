import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (res.data.user.role !== 'admin') {
        setError('Access denied. Admin only.');
        return;
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLogin(res.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Admin Panel</h1>
        <p className="subtitle">Manage Tests & Students</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            placeholder="Admin ID"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="credentials-hint">Demo: admin123 / Admin@12345</p>
      </div>
    </div>
  );
};

export default AdminLogin;