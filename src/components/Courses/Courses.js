import React from 'react';
import CoursesImage from '../../assets/courses.png'; 

const Courses = () => {
  return (
    <div>
      <h1>Welcome Courses</h1>
      <img src={CoursesImage} alt="Courses" id='img1'  style={{ width: '100', height: '100' }} />
      <p>Explore our wide range of courses that help you grow your skills and knowledge.</p>
    </div>
  );
};

export default Courses;  
 