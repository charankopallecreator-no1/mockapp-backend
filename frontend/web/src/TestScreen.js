import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TestScreen.css';

const TestScreen = ({ test, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [isCheatingDetected, setIsCheatingDetected] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const token = localStorage.getItem('token');

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  // Tab switch detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitches((t) => t + 1);
        if (tabSwitches >= 3) {
          setIsCheatingDetected(true);
          handleAutoSubmit();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [tabSwitches, submitted]);

  // Fullscreen mode
  useEffect(() => {
    const enterFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    };
    enterFullscreen();
  }, []);

  const handleAutoSubmit = () => {
    if (!submitted) submitTest();
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const submitTest = async () => {
    setSubmitted(true);
    try {
      const answersArray = test.questions.map((q) => ({
        questionId: q._id,
        answer: answers[q._id] || '',
        timeTaken: 0,
      }));

      const res = await axios.post(
        `http://localhost:5000/api/tests/${test._id}/submit`,
        {
          answers: answersArray,
          isCheatingDetected,
          tabSwitches,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onComplete(res.data);
    } catch (error) {
      console.error('Error submitting test:', error);
      alert(error.response?.data?.message || 'Error submitting test');
    }
  };

  const question = test.questions[currentQuestion];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (submitted) {
    return (
      <div className="test-submitted">
        <h2>Test Submitted</h2>
        <p>Thank you for taking the test.</p>
      </div>
    );
  }

  return (
    <div className="test-screen">
      <div className="test-header">
        <div className="test-info">
          <h2>{test.title}</h2>
          <span className="tab-warning">
            {tabSwitches > 0 && `⚠️ Tab switches: ${tabSwitches}`}
          </span>
        </div>
        <div className="test-timer">
          <span className={timeLeft < 300 ? 'timer-warning' : ''}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="test-content">
        <div className="question-panel">
          <h3>
            Question {currentQuestion + 1} of {test.questions.length}
          </h3>
          <p className="question-text">{question.questionText}</p>

          <div className="options">
            {question.options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answers[question._id] === option}
                  onChange={() => handleAnswerChange(question._id, option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div className="question-navigation">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <span className="question-shortcut">
              {currentQuestion + 1} / {test.questions.length}
            </span>
            <button
              onClick={() =>
                setCurrentQuestion(
                  Math.min(test.questions.length - 1, currentQuestion + 1)
                )
              }
              disabled={currentQuestion === test.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div className="questions-shortcut">
          <h4>Questions</h4>
          <div className="shortcut-grid">
            {test.questions.map((q, index) => (
              <button
                key={index}
                className={`shortcut-btn ${
                  answers[q._id] ? 'answered' : ''
                } ${currentQuestion === index ? 'active' : ''}`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="test-footer">
        <button onClick={submitTest} className="submit-btn">
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default TestScreen;