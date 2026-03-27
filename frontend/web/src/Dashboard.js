import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestScreen from './TestScreen';
import './styles/Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [tests, setTests] = useState([]);
  const [progress, setProgress] = useState({});
  const [activeTest, setActiveTest] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    fetchTests();
    fetchProgress();
    document.body.className = `${theme}-mode`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchTests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProgress = async () => {
    setProgress({
      physics: { score: 75, accuracy: 80 },
      chemistry: { score: 70, accuracy: 75 },
      math: { score: 80, accuracy: 85 },
      biology: { score: 0, accuracy: 0 },
    });
  };

  const handleTestComplete = (result) => {
    alert(`Test completed!\nScore: ${result.score}/${result.result.totalMarks}\nAccuracy: ${result.accuracy.toFixed(2)}%`);
    setActiveTest(null);
    fetchTests();
  };

  if (activeTest) {
    return <TestScreen test={activeTest} onComplete={handleTestComplete} />;
  }

  return (
    <div className={`dashboard ${theme}-mode`}>
      <header className="dashboard-header">
        <h1>📚 Learning Dashboard</h1>
        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="progress-section">
          <h2>📊 Subject-wise Progress</h2>
          <div className="progress-grid">
            {Object.entries(progress).map(([subject, data]) => (
              <div key={subject} className="progress-card">
                <h3>{subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
                <div className="progress-bars">
                  <div className="progress-item">
                    <label>Score</label>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(data.score / 100) * 100}%`,
                        }}
                      />
                    </div>
                    <span>{data.score}%</span>
                  </div>
                  <div className="progress-item">
                    <label>Accuracy</label>
                    <div className="progress-bar">
                      <div
                        className="progress-fill accuracy"
                        style={{
                          width: `${data.accuracy}%`,
                        }}
                      />
                    </div>
                    <span>{data.accuracy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="tests-section">
          <h2>📝 Available Tests</h2>
          <div className="tests-grid">
            {tests.map((test) => (
              <div key={test._id} className="test-card">
                <div className="test-header-card">
                  <h3>{test.title}</h3>
                  <span className="badge">{test.type}</span>
                </div>
                <p className="test-description">{test.description}</p>
                <div className="test-info-grid">
                  <div className="test-info-item">
                    <span className="label">Duration</span>
                    <span className="value">{test.duration} min</span>
                  </div>
                  <div className="test-info-item">
                    <span className="label">Total Marks</span>
                    <span className="value">{test.totalMarks}</span>
                  </div>
                  <div className="test-info-item">
                    <span className="label">Type</span>
                    <span className="value">{test.examType}</span>
                  </div>
                  <div className="test-info-item">
                    <span className="label">Questions</span>
                    <span className="value">{test.questions?.length || 0}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTest(test)}
                  className="start-btn"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;