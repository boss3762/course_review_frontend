import React, { useState, useEffect } from 'react';
import './App.css';
import { Course } from './interfaces';
import CourseItem from './components/CourseItem';
import NewCourseForm from './components/NewCourseForm';

const App = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  

  const toggleFormVisible = () => {
    setFormVisible(!formVisible);
  };

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then(res => res.json())
      .then(courses => {
        setCourses(courses);
      });
  }, []);

  return (
    <div className="App">
      <ul>
        {courses.map(item => (
          <CourseItem key={item.id} course={item} />
        ))}
      </ul>
      <button onClick={toggleFormVisible}>New Course</button>
      {formVisible && (
        <NewCourseForm />
      )}
    </div>
  );
}

/*
type AppState = {
  message: string;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    message: 'Hello World',
  };

  componentDidMount() {
    fetch('http://localhost:3000/courses')
    .then(res => res.json())
    .then(obj => {
      this.setState({
        message: obj.message,
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.message}
      </div>
    );
  }
}
*/
export default App;
