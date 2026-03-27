import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = ({ admin, onLogout }) => {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    userId: '',
    name: '',
    phone: '',
    course: 'MPC',
    yearOfStudy: 1,
    examType: 'JEE-Mains',
  });
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    subject: 'physics',
    topic: '',
    difficulty: 'medium',
    course: 'MPC',
    examType: 'JEE-Mains',
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (activeTab === 'students') fetchStudents();
  }, [activeTab]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/admin/create-student', newStudent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Student created!\nUser ID: ${res.data.userId}\nTemporary Password: ${res.data.temporaryPassword}`);
      setNewStudent({
        userId: '',
        name: '',
        phone: '',
        course: 'MPC',
        yearOfStudy: 1,
        examType: 'JEE-Mains',
      });
      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating student');
    }
    setLoading(false);
  };

  const handleUploadQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/questions/upload-question', newQuestion, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Question uploaded successfully');
      setNewQuestion({
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        subject: 'physics',
        topic: '',
        difficulty: 'medium',
        course: 'MPC',
        examType: 'JEE-Mains',
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error uploading question');
    }
    setLoading(false);
  };

  const handleDeleteStudent = async (userId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/students/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Student deleted');
        fetchStudents();
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting student');
      }
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-controls">
          <span>{admin.name}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Manage Students
        </button>
        <button
          className={`tab ${activeTab === 'create-student' ? 'active' : ''}`}
          onClick={() => setActiveTab('create-student')}
        >
          Create Student
        </button>
        <button
          className={`tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          Upload Question
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'students' && (
          <div className="students-list">
            <h2>Students</h2>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Exam Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student._id}>
                    <td>{student.userId}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.yearOfStudy}</td>
                    <td>{student.examType}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteStudent(student.userId)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'create-student' && (
          <div className="create-student-form">
            <h2>Create New Student</h2>
            <form onSubmit={handleCreateStudent}>
              <input
                type="text"
                placeholder="User ID"
                value={newStudent.userId}
                onChange={(e) => setNewStudent({ ...newStudent, userId: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
              />
              <select
                value={newStudent.course}
                onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
              >
                <option value="MPC">MPC (Math-Physics-Chemistry)</option>
                <option value="BiPC">BiPC (Biology-Physics-Chemistry)</option>
              </select>
              <input
                type="number"
                placeholder="Year of Study"
                value={newStudent.yearOfStudy}
                onChange={(e) => setNewStudent({ ...newStudent, yearOfStudy: parseInt(e.target.value) })}
              />
              <select
                value={newStudent.examType}
                onChange={(e) => setNewStudent({ ...newStudent, examType: e.target.value })}
              >
                <option value="EAMCET">EAMCET</option>
                <option value="JEE-Mains">JEE Mains</option>
                <option value="JEE-Advanced">JEE Advanced</option>
                <option value="NEET">NEET</option>
              </select>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Student'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="upload-question-form">
            <h2>Upload Question</h2>
            <form onSubmit={handleUploadQuestion}>
              <textarea
                placeholder="Question Text"
                value={newQuestion.questionText}
                onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                required
              />
              {newQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[index] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                />
              ))}
              <select
                value={newQuestion.correctAnswer}
                onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
              >
                <option value="">Select Correct Answer</option>
                {newQuestion.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={newQuestion.subject}
                onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
              >
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="math">Math</option>
                <option value="biology">Biology</option>
              </select>
              <input
                type="text"
                placeholder="Topic"
                value={newQuestion.topic}
                onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
              />
              <select
                value={newQuestion.difficulty}
                onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select
                value={newQuestion.course}
                onChange={(e) => setNewQuestion({ ...newQuestion, course: e.target.value })}
              >
                <option value="MPC">MPC</option>
                <option value="BiPC">BiPC</option>
              </select>
              <select
                value={newQuestion.examType}
                onChange={(e) => setNewQuestion({ ...newQuestion, examType: e.target.value })}
              >
                <option value="EAMCET">EAMCET</option>
                <option value="JEE-Mains">JEE Mains</option>
                <option value="JEE-Advanced">JEE Advanced</option>
                <option value="NEET">NEET</option>
              </select>
              <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Question'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;