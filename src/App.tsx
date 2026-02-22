import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';

import AuthService from './services/AuthService';

import './App.css';
import LoginForm from './components/LoginForm';
import About from './components/About';
import CourseReview from './components/CourseReview';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(AuthService.getUserName());
  }, []);

  const handleUserLogin = () => {
    setUsername(AuthService.getUserName());
  }

  const logout = () => {
    AuthService.logout();
    navigate("/");
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About</Link></li>
          {username && (
            <li>
              user: {username}
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CourseReview />} />
        <Route path="/login" element={<LoginForm loginCallback={handleUserLogin} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
