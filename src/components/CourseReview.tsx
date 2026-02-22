import React, { useState, useEffect } from 'react';
import { Course } from '../interfaces';
import CourseItem from './CourseItem';
import NewCourseForm from './NewCourseForm';
import { fetchCourse } from '../services/CoursesService';

const CourseReview = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);


  const toggleFormVisible = () => {
    setFormVisible(!formVisible);
  };

  const fetchCourses = () => {
    fetchCourse()
    .then(courses => {
      setCourses(courses);
    })
  };

  const handleNewCourseCreated = (course: Course) => {
    fetchCourses();
    setFormVisible(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="CourseReview">
      <ul>
        {courses.map(item => (
          <CourseItem key={item.id} course={item} />
        ))}
      </ul>
      <button onClick={toggleFormVisible}>New Course</button>
      {formVisible && 
      (
        <NewCourseForm onNewCourseCreated={handleNewCourseCreated} />
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
export default CourseReview;
