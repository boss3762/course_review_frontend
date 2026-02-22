import React from 'react';

import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';

import './App.css';
import LoginForm from './components/LoginForm';
import About from './components/About';
import CourseReview from './components/CourseReview';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CourseReview />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
