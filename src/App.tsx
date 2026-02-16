import React, { useState, useEffect } from 'react';
import './App.css';
import { Course } from './interfaces';
import CourseItem from './CourseItem';

const App = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/courses')
    .then(res => res.json())
    .then(courses => {
      setCourses(courses);
    });
  },[]);

  return (
    <div className="App">
      <ul>
        {courses.map(item => (
          <CourseItem key={item.id} course={item} />
        ))}
      </ul>
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
