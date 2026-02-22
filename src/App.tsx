import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import About from './components/About';
import CourseReview from './components/CourseReview';

const App = () => {
  return (
    <div className="App">
      <CourseReview />
      <LoginForm />
      <About />
    </div>
  );
}

export default App;
