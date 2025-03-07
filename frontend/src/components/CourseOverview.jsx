import React from 'react';
import { useNavigate } from 'react-router-dom';

const courseList = [
  {
    title: "Intermediate HTML and CSS",
    lessons: 21,
    projects: 2,
    description: "Let's learn a little more about what you can do with HTML and CSS."
  },
  {
    title: "JavaScript",
    lessons: 31,
    projects: 12,
    description: "Make your websites dynamic and interactive with JavaScript! You'll create features and stand-alone applications. This module includes projects where you will learn how to manipulate the DOM, use object-oriented programming principles, and fetch real-world data using APIs."
  },
  {
    title: "Advanced HTML and CSS",
    lessons: 15,
    projects: 1,
    description: "It's time to dig in and become the CSS expert you deserve to be. After this course you'll be equipped to create web projects that look beautiful on any device!"
  },
  {
    title: "React",
    lessons: 23,
    projects: 3,
    description: "Let's learn React, the most popular JavaScript library for building user interfaces. Take your frontend skills to a whole new level!"
  },
  {
    title: "Databases",
    lessons: 2,
    projects: 1,
    description: "Databases are used to organize and capture large amounts of data, typically by inputting, storing, retrieving and managing the information. This course will focus on relational databases, which are widely used to store data and SQL, the language used to query the database."
  },
  {
    title: "NodeJS",
    lessons: 21,
    projects: 9,
    description: "Take your JavaScript skills to the server-side! Learn how to fully craft your site's backend using Express, the most popular back-end JavaScript framework! You will also learn how to use a relational database, PostgreSQL."
  }
];

const CourseOverview = ({ modules }) => {
  const navigate = useNavigate();

  const handleOpenCourse = (moduleId) => {
    navigate(`/courses/modules/${moduleId}`);
  };


  return (
<div className="flex">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">{module.title}</h2>
              <div className="text-sm text-gray-600 mb-4">
                <span>{module.lessons.length} Lessons</span>
              </div>
              <button
                onClick={() => handleOpenCourse(module.id)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Open Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;