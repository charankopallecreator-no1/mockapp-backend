import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loginMode, setLoginMode] = useState('student'); // 'student' or 'admin'

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'admin') {
        setAdmin(parsedUser);
      } else {
        setUser(parsedUser);
      }
    }
  }, []);

  const handleStudentLogin = (userData) => {
    setUser(userData);
    setLoginMode('student');
  };

  const handleAdminLogin = (adminData) => {
    setAdmin(adminData);
    setLoginMode('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAdmin(null);
    setLoginMode('student');
  };

  // Admin panel view
  if (admin) {
    return <AdminPanel admin={admin} onLogout={handleLogout} />;
  }

  // Student view
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Login mode selection
  if (loginMode === 'admin') {
    return (
      <>
        <AdminLogin onLogin={handleAdminLogin} />
        <div className="login-mode-toggle">
          <button onClick={() => setLoginMode('student')}>Student Login</button>
        </div>
      </>
    );
  }

  // Student login
  return (
    <>
      <Login onLogin={handleStudentLogin} />
      <div className="login-mode-toggle">
        <button onClick={() => setLoginMode('admin')}>Admin Login</button>
      </div>
    </>
  );
}

export default App;