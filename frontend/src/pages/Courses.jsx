
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample data - would typically be fetched from API
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
        content: `
          <h3>Welcome to HTML!</h3>
          <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p>
          <h4>Basic HTML Document Structure</h4>
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first web page.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        `
      },
      { 
        id: 'html-elements', 
        title: 'HTML Elements',
        duration: '20 min',
        content: `
          <h3>HTML Elements</h3>
          <p>HTML elements are the building blocks of HTML pages, represented by tags: <code>&lt;tagname&gt;content&lt;/tagname&gt;</code></p>
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
    icon: '🎨',
    description: 'Style your websites like a pro',
    color: 'from-purple-500 to-purple-800',
    lessons: [
      { 
        id: 'intro-to-css', 
        title: 'Introduction to CSS',
        duration: '18 min',
        content: `
          <h3>Welcome to CSS!</h3>
          <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>
          <h4>Basic CSS Syntax</h4>
          <pre><code>selector {
  property: value;
  property: value;
}</code></pre>
        `
      }
    ]
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
        content: `
          <h3>Welcome to JavaScript!</h3>
          <p>JavaScript brings your websites to life with dynamic interactions.</p>
        `,
        codeExample: {
          language: 'javascript',
          initialCode: `// Your first JavaScript program
console.log("Hello, World!");`
        }
      }
    ]
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
    content: darkMode ? 'bg-gray-800' : 'bg-white'
  };

  // Get progress percentage (would normally come from backend)
  const getProgress = (moduleId) => Math.floor(Math.random() * 100);

  return (
    <div className={`flex flex-col h-screen ${theme.bg} transition-all duration-300`}>
      {/* Header - More Compact */}

      
      {/* Main Content - Full Screen Usage */}
      <div className="flex-1 overflow-y-auto relative">
        {!selectedModule ? (
          /* Course Dashboard - Grid Layout That Fills Space */
          <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Learning Paths</h2>
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800">
                3 Courses Available
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
                  onClick={() => setSelectedModule(null)} 
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
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">{selectedLesson.title}</h2>
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                  />
                  
                  {selectedLesson.codeExample && (
                    <div className="mt-6">
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Live Code Editor</div>
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                        <pre className="text-sm overflow-x-auto p-4 bg-black text-green-400 rounded">
                          <code>{selectedLesson.codeExample.initialCode}</code>
                        </pre>
                        <div className="mt-2 flex justify-end">
                          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center">
                            <span className="mr-1">▶</span> Run Code
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-between">
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      ← Previous
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Next →
                    </button>
                  </div>
                </div>
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
