// src/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ModuleNavigation from '../components/LearningModule/ModuleNavigation';
import ModuleContent from '../components/LearningModule/ModuleContent';
import CourseOverview from '../components/CourseOverview';
import ModulesList from '../components/ModulesList';
// This is sample data - you would likely fetch this from an API
const moduleData = [
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    lessons: [
      { 
        id: 'intro-to-html', 
        title: 'Introduction to HTML',
        content: `
          <h3>Welcome to HTML!</h3>
          <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p>
          <p>In this lesson, you'll learn the basic structure of an HTML document and how to create your first webpage.</p>
          <h4>Basic HTML Document Structure</h4>
          <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first web page.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
          </code></pre>
        `
      },
      { 
        id: 'html-elements', 
        title: 'HTML Elements',
        content: `
          <h3>HTML Elements</h3>
          <p>HTML elements are the building blocks of HTML pages. They are represented by tags.</p>
          <p>HTML tags are element names surrounded by angle brackets:</p>
          <pre><code>&lt;tagname&gt;content&lt;/tagname&gt;</code></pre>
          <h4>Common HTML Elements</h4>
          <ul>
            <li><strong>Headings</strong>: &lt;h1&gt; to &lt;h6&gt;</li>
            <li><strong>Paragraphs</strong>: &lt;p&gt;</li>
            <li><strong>Links</strong>: &lt;a&gt;</li>
            <li><strong>Images</strong>: &lt;img&gt;</li>
            <li><strong>Lists</strong>: &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    lessons: [
      { 
        id: 'intro-to-css', 
        title: 'Introduction to CSS',
        content: `
          <h3>Welcome to CSS!</h3>
          <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>
          <p>With CSS, you can control the color, font, size, spacing, and many other aspects of HTML elements.</p>
          <h4>Basic CSS Syntax</h4>
          <pre><code>
selector {
  property: value;
  property: value;
}
          </code></pre>
          <p>For example, to make all paragraphs red and bold:</p>
          <pre><code>
p {
  color: red;
  font-weight: bold;
}
          </code></pre>
        `
      },
      { 
        id: 'css-selectors', 
        title: 'CSS Selectors',
        content: `
          <h3>CSS Selectors</h3>
          <p>CSS selectors are used to "find" (or select) the HTML elements you want to style.</p>
          <p>We can divide CSS selectors into five categories:</p>
          <ul>
            <li><strong>Simple selectors</strong> (select elements based on name, id, class)</li>
            <li><strong>Combinator selectors</strong> (select elements based on a specific relationship between them)</li>
            <li><strong>Pseudo-class selectors</strong> (select elements based on a certain state)</li>
            <li><strong>Pseudo-elements selectors</strong> (select and style a part of an element)</li>
            <li><strong>Attribute selectors</strong> (select elements based on an attribute or attribute value)</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Fundamentals',
    lessons: [
      { 
        id: 'intro-to-javascript', 
        title: 'Introduction to JavaScript',
        content: `
          <h3>Welcome to JavaScript!</h3>
          <p>JavaScript is a programming language used to create dynamic and interactive content on webpages.</p>
          <p>Try running this simple JavaScript code:</p>
        `,
        codeExample: {
          language: 'javascript',
          initialCode: `// Your first JavaScript program
console.log("Hello, World!");

// Try changing the message and run again
`
        }
      },
      { 
        id: 'variables-and-data-types', 
        title: 'Variables and Data Types',
        content: `
          <h3>Variables and Data Types</h3>
          <p>Practice with different variable types:</p>
        `,
        codeExample: {
          language: 'javascript',
          initialCode: `// Try declaring different types of variables
let name = "John";
let age = 25;
let isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student?", isStudent);
`
        }
      }
    ]
  }
];


const Courses = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    setModules(moduleData);
  }, []);
  return (
    <div className="flex h-screen">
    <ModuleNavigation modules={modules} />
    <div className="flex-1 overflow-y-auto">
      <Routes>
        <Route path="/" element={<CourseOverview modules={modules} />} />
        <Route 
          path="/modules/:moduleId" 
          element={
            <div className="flex">
              <ModulesList modules={modules} />
            </div>
          } 
        />
        <Route 
          path=":moduleId/:lessonId" 
          element={
            <div className="flex">
             
              <ModuleContent modules={modules} />
            </div>
          } 
        />
      </Routes>
    </div>
  </div>
  );
};

export default Courses;