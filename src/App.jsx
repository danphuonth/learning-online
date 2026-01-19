// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCourses from './pages/TeacherCourses';
import TeacherStudents from './pages/TeacherStudents';
import TeacherSchedule from './pages/TeacherSchedule';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Protected Route for Teachers
  const TeacherRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (user.role !== 'teacher') {
      return <Navigate to="/home" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - NO Header/Footer */}
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={<Register onLogin={handleLogin} />} 
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <TeacherRoute>
              <Header user={user} onLogout={handleLogout} />
              <TeacherDashboard user={user} />
              <Footer />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <TeacherRoute>
              <Header user={user} onLogout={handleLogout} />
              <TeacherCourses user={user} />
              <Footer />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <TeacherRoute>
              <Header user={user} onLogout={handleLogout} />
              <TeacherStudents user={user} />
              <Footer />
            </TeacherRoute>
          }
        />
        <Route
          path="/teacher/schedule"
          element={
            <TeacherRoute>
              <Header user={user} onLogout={handleLogout} />
              <TeacherSchedule user={user} />
              <Footer />
            </TeacherRoute>
          }
        />

        {/* Main Routes - WITH Header/Footer */}
        <Route
          path="/"
          element={
            <>
              <Header user={user} onLogout={handleLogout} />
              <Navigate to="/home" replace />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Header user={user} onLogout={handleLogout} />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/courses"
          element={
            <>
              <Header user={user} onLogout={handleLogout} />
              <Courses />
              <Footer />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <Header user={user} onLogout={handleLogout} />
              <Categories />
              <Footer />
            </>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;