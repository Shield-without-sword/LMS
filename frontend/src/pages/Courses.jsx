import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Code Compiler Component
const CodeCompiler = ({ initialCode, language }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          version: '*',
          files: [{
            content: code
          }]
        })
      });

      const data = await response.json();
      setOutput(data.run.output || data.run.stderr);
    } catch (error) {
      setOutput('Error executing code: ' + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-4 border rounded-lg p-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-48 p-2 font-mono text-sm border rounded bg-black text-green-400"
      />
      <div className="mt-2 flex gap-2">
        <button
          onClick={runCode}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 flex items-center"
        >
          {isLoading ? 'Running...' : <><span className="mr-1">▶</span> Run Code</>}
        </button>
      </div>
      {output && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">Output:</h4>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-black">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

// Restructured data with consistent lesson format
const moduleData = [
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    icon: '📄',
    description: 'Learn the building blocks of the web',
    color: 'from-blue-500 to-blue-700',
    lessons: [
      { 
        id: 'intro-to-html', 
        title: 'Introduction to HTML',
        duration: '15 min',
        theory: `
          <h3>Welcome to HTML!</h3>
          <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p>
          <h4>Basic HTML Document Structure</h4>
        `,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>`,
        practice: {
          language: "html",
          instructions: "Try writing a basic HTML document with a different title and message.",
          initialCode: `<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    
</body>
</html>`
        }
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    icon: '🎨',
    description: 'Style your websites like a pro',
    color: 'from-purple-500 to-purple-800',
    lessons: [] // Placeholder for CSS lessons
  },
{
    id: 'javascript-basics',
    title: 'JavaScript Fundamentals',
    icon: '📱',
    description: 'Bring your websites to life',
    color: 'from-yellow-500 to-yellow-700',
    lessons: [
      { 
        id: 'intro-to-javascript', 
        title: 'Introduction to JavaScript',
        duration: '25 min',
        theory: `
          <h3>Welcome to JavaScript!</h3>
          <p>JavaScript brings your websites to life with dynamic interactions.</p>
          <h4>Your First JavaScript Program</h4>
        `,
        code: `// Your first JavaScript program
console.log("Hello, World!");

// Variables
let name = "Developer";
console.log("Hello, " + name + "!");`,
        practice: {
          language: "javascript",
          instructions: "Create variables for your name and age, then log a greeting.",
          initialCode: `// Write your JavaScript here
`
        }
      },
      { 
        id: 'js-functions', 
        title: 'Functions in JavaScript',
        duration: '20 min',
        theory: `
          <h3>Functions</h3>
          <p>Functions let you reuse blocks of code efficiently.</p>
          <h4>Function Syntax</h4>
        `,
        code: `// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice"));`,
        practice: {
          language: "javascript",
          instructions: "Write a function that takes two numbers and returns their sum.",
          initialCode: `// Write your function here
`
        }
      },
      { 
        id: 'js-arrays', 
        title: 'JavaScript Arrays',
        duration: '22 min',
        theory: `
          <h3>Arrays</h3>
          <p>Arrays store multiple values in a single variable.</p>
          <h4>Array Methods</h4>
        `,
        code: `// Example of an array
let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
console.log(fruits.length); // 3`,
        practice: {
          language: "javascript",
          instructions: "Create an array of five numbers and find their sum.",
          initialCode: `// Write your array code here
`
        }
      },
      { 
        id: 'js-loops', 
        title: 'Loops in JavaScript',
        duration: '20 min',
        theory: `
          <h3>Loops</h3>
          <p>Loops help execute code multiple times.</p>
          <h4>Loop Types</h4>
        `,
        code: `// Example of a loop
for (let i = 0; i < 5; i++) {
  console.log("Iteration: " + i);
}`,
        practice: {
          language: "javascript",
          instructions: "Write a loop that prints numbers from 1 to 10.",
          initialCode: `// Write your loop here
`
        }
      },
      { 
        id: 'js-objects', 
        title: 'JavaScript Objects',
        duration: '22 min',
        theory: `
          <h3>Objects</h3>
          <p>Objects store data as key-value pairs.</p>
          <h4>Object Syntax</h4>
        `,
        code: `// Example object
let person = {
  name: "Alice",
  age: 25,
  greet: function() {
    return "Hello, " + this.name;
  }
};
console.log(person.greet());`,
        practice: {
          language: "javascript",
          instructions: "Create an object that represents a book with title, author, and pages properties.",
          initialCode: `// Write your object here
`
        }
      }
    ]
  },
  {
    id: 'react-basics',
    title: 'React Basics',
    icon: '⚛️',
    description: 'Build dynamic user interfaces',
    color: 'from-blue-400 to-blue-600',
    lessons: [] // Placeholder for React lessons
  },
  {
    id: 'nodejs-basics',
    title: 'Node.js & Express',
    icon: '🖥️',
    description: 'Learn backend development',
    color: 'from-green-500 to-green-700',
    lessons: [] // Placeholder for Node.js lessons
  },
  {
    id: 'mongodb-basics',
    title: 'MongoDB & Database Management',
    icon: '🗄️',
    description: 'Handle data efficiently',
    color: 'from-teal-500 to-teal-700',
    lessons: [] // Placeholder for MongoDB lessons
  }
];


const Courses = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState(moduleData);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Theme classes for better organization
  const theme = {
    bg: darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    header: darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-indigo-700',
    card: darkMode ? 'bg-gray-800 shadow-blue-400/20' : 'bg-white shadow-xl',
    sidebar: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    content: darkMode ? 'bg-gray-800' : 'bg-white',
    codeBlock: darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
  };

  // Get progress percentage (would normally come from backend)
  const getProgress = (moduleId) => Math.floor(Math.random() * 100);

  // Render lesson content with consistent format
  const renderLessonContent = (lesson) => {
    if (!lesson) return null;
    
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">{lesson.title}</h2>
        
        {/* Theory Section */}
        {lesson.theory && (
          <div 
            className="prose max-w-none dark:prose-invert mb-8"
            dangerouslySetInnerHTML={{ __html: lesson.theory }}
          />
        )}
        
        {/* Code Example Section */}
        {lesson.code && (
          <div className="mt-6 mb-8">
            <div className={`p-4 rounded-lg ${theme.codeBlock} border`}>
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Example Code</div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <pre className="text-sm overflow-x-auto p-4 bg-black text-green-400 rounded">
                <code>{lesson.code}</code>
              </pre>
              <div className="mt-2 flex justify-end">
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Practice Section with Compiler */}
        {lesson.practice && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Practice Exercise</h3>
            <p className="mb-4">{lesson.practice.instructions}</p>
            <CodeCompiler 
              initialCode={lesson.practice.initialCode} 
              language={lesson.practice.language}
            />
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            ← Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Next →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-screen ${theme.bg} transition-all duration-300`}>
      {/* Main Content - Full Screen Usage */}
      <div className="flex-1 overflow-y-auto relative">
        {!selectedModule ? (
          /* Course Dashboard - Grid Layout That Fills Space */
          <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Learning Paths</h2>
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800">
                {modules.length} Courses Available
              </div>
            </div>
            
            {/* Card Grid - Expanded for Better Space Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(module => (
                <div 
                  key={module.id} 
                  className={`bg-gradient-to-br ${module.color} rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-64 flex flex-col`}
                  onClick={() => setSelectedModule(module)}
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-3xl mb-3">{module.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{module.title}</h3>
                    <p className="text-white text-opacity-90 mb-4 flex-grow">{module.description}</p>
                    
                    {/* Progress Bar with Animation */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">{module.lessons.length} lessons</span>
                        <span className="text-white text-sm font-medium">{getProgress(module.id)}% Complete</span>
                      </div>
                      <div className="mt-2 h-2 bg-black bg-opacity-30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-1000"
                          style={{ width: `${getProgress(module.id)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Module and Lesson View - Maximized Space Usage */
          <div className="h-full flex flex-col md:flex-row">
            {/* Sidebar - Compact But Functional */}
            <div className={`md:w-1/4 lg:w-1/5 ${theme.sidebar} md:border-r p-4 md:h-full overflow-y-auto`}>
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => {
                    setSelectedModule(null);
                    setSelectedLesson(null);
                  }} 
                  className="text-lg hover:text-blue-500 transition-colors flex items-center"
                >
                  <span className="mr-1">←</span> 
                  <span>Courses</span>
                </button>
              </div>
              
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <span className="mr-2">{selectedModule.icon}</span> 
                {selectedModule.title}
              </h3>
              
              <div className="space-y-1">
                {selectedModule.lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedLesson && selectedLesson.id === lesson.id 
                        ? 'bg-blue-600 text-white' 
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedLesson && selectedLesson.id === lesson.id 
                          ? 'bg-white text-blue-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="font-medium text-sm">{lesson.title}</div>
                    </div>
                    <div className="ml-9 text-xs opacity-70 mt-1">{lesson.duration}</div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate(`/quiz/${selectedModule.id}`)} 
                className="w-full py-2 px-4 mt-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                Take Quiz
              </button>
            </div>
            
            {/* Content Area - Full Height and Width Usage */}
            <div className={`flex-1 ${theme.content} md:h-full overflow-y-auto p-6`}>
              {selectedLesson ? (
                renderLessonContent(selectedLesson)
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="text-6xl mb-6 animate-bounce">{selectedModule.icon}</div>
                  <h3 className="text-2xl font-medium mb-3">Begin Your {selectedModule.title} Journey</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-lg">
                    Select a lesson from the menu to start mastering {selectedModule.title}. 
                    Each lesson builds on the previous one to strengthen your skills.
                  </p>
                  <button 
                    onClick={() => setSelectedLesson(selectedModule.lessons[0])} 
                    className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Start First Lesson
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer - Minimal */}
      <footer className={`py-2 px-6 ${theme.header} text-white text-center text-xs`}>
        © 2025 DevAcademy | All progress synced to cloud
      </footer>
    </div>
  );
};

export default Courses;
