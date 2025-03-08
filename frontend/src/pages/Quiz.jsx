import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Sample quiz data - would typically be fetched from API based on module ID
const quizzesData = {
  'html-basics': {
    title: 'HTML Fundamentals Quiz',
    description: 'Test your knowledge of HTML basics',
    timeLimit: 10, // minutes
    questions: [
      {
        id: 1,
        question: 'Which tag is used to define the main heading of a document?',
        options: ['<header>', '<h1>', '<heading>', '<main>'],
        correctAnswer: '<h1>'
      },
      {
        id: 2,
        question: 'Which HTML element is used to define an unordered list?',
        options: ['<ul>', '<ol>', '<list>', '<dl>'],
        correctAnswer: '<ul>'
      },
      {
        id: 3,
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'Hyper Transfer Markup Language',
          'Hyperlink Text Management Language',
          'High Tech Modern Language'
        ],
        correctAnswer: 'Hyper Text Markup Language'
      },
      {
        id: 4,
        question: 'Which attribute is used to provide a URL for a link?',
        options: ['src', 'link', 'href', 'url'],
        correctAnswer: 'href'
      },
      {
        id: 5,
        question: 'Which HTML element is used to embed JavaScript code?',
        options: ['<js>', '<javascript>', '<script>', '<code>'],
        correctAnswer: '<script>'
      }
    ]
  },
  'css-basics': {
    title: 'CSS Fundamentals Quiz',
    description: 'Test your knowledge of CSS styling',
    timeLimit: 10,
    questions: [
      {
        id: 1,
        question: 'Which property is used to change the text color?',
        options: ['text-color', 'font-color', 'color', 'text-style'],
        correctAnswer: 'color'
      },
      {
        id: 2,
        question: 'Which CSS property controls the spacing between elements?',
        options: ['spacing', 'margin', 'padding', 'border'],
        correctAnswer: 'margin'
      },
      {
        id: 3,
        question: 'What does CSS stand for?',
        options: [
          'Cascading Style Sheets',
          'Creative Style System',
          'Computer Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 'Cascading Style Sheets'
      },
      {
        id: 4,
        question: 'Which property is used to set the background color?',
        options: ['bgcolor', 'background-color', 'color-background', 'bg'],
        correctAnswer: 'background-color'
      },
      {
        id: 5,
        question: 'Which selector is used to select elements with a specific class?',
        options: ['#', '.', '*', '>'],
        correctAnswer: '.'
      }
    ]
  },
  'javascript-basics': {
    title: 'JavaScript Fundamentals Quiz',
    description: 'Test your knowledge of JavaScript basics',
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['var', 'variable', 'v', 'all of the above'],
        correctAnswer: 'var'
      },
      {
        id: 2,
        question: 'How do you write a comment in JavaScript?',
        options: ['<!-- comment -->', '/* comment */', '// comment', '# comment'],
        correctAnswer: '// comment'
      },
      {
        id: 3,
        question: 'Which method is used to output data to the console?',
        options: ['console.print()', 'console.log()', 'console.output()', 'console.write()'],
        correctAnswer: 'console.log()'
      },
      {
        id: 4,
        question: 'What is the correct way to create a function in JavaScript?',
        options: [
          'function:myFunction()',
          'function = myFunction()',
          'function myFunction()',
          'create myFunction()'
        ],
        correctAnswer: 'function myFunction()'
      },
      {
        id: 5,
        question: 'How do you check if a variable is equal to another variable in both value and type?',
        options: ['==', '===', '=', 'equals()'],
        correctAnswer: '==='
      }
    ]
  }
};

const Quiz = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);

  // Set up dark mode from localStorage or previous setting
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
  }, []);

  // Load quiz data
  useEffect(() => {
    if (moduleId && quizzesData[moduleId]) {
      setCurrentQuiz(quizzesData[moduleId]);
      setTimeLeft(quizzesData[moduleId].timeLimit * 60); // Convert to seconds
    } else {
      // If no valid moduleId, load the first quiz
      const firstQuizId = Object.keys(quizzesData)[0];
      setCurrentQuiz(quizzesData[firstQuizId]);
      setTimeLeft(quizzesData[firstQuizId].timeLimit * 60);
    }
  }, [moduleId]);

  // Timer countdown
  useEffect(() => {
    if (!currentQuiz || quizSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuiz, quizSubmitted, timeLeft]);

  // Calculate score when quiz is submitted
  useEffect(() => {
    if (quizSubmitted && currentQuiz) {
      let correctCount = 0;
      currentQuiz.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      setScore((correctCount / currentQuiz.questions.length) * 100);
    }
  }, [quizSubmitted, selectedAnswers, currentQuiz]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const theme = {
    bg: darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    header: darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-indigo-700',
    card: darkMode ? 'bg-gray-800 shadow-blue-400/20' : 'bg-white shadow-xl',
    option: darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
  };

  // Return to courses
  const handleReturnToCourses = () => {
    navigate('/courses');
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setTimeLeft(currentQuiz.timeLimit * 60);
    setScore(0);
  };

  if (!currentQuiz) {
    return (
      <div className={`flex items-center justify-center h-screen ${theme.bg}`}>
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg}`}>
      {/* Header */}
      <header className={`px-6 py-3 ${theme.header} text-white shadow-lg flex justify-between items-center sticky top-0 z-30`}>
        <h1 className="text-2xl font-bold tracking-tight flex items-center">
          <span className="mr-2 text-yellow-300">⚡</span> DevAcademy
        </h1>
        <button 
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem('darkMode', !darkMode);
          }} 
          className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800'} transition-colors`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">{currentQuiz.title}</h2>
            <p className="text-lg opacity-80 mb-4">{currentQuiz.description}</p>
            
            {/* Progress and Timer */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="mr-2">Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}</span>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`font-mono ${timeLeft < 60 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'} font-bold`}>
                {!quizSubmitted && <span>⏱️ {formatTime(timeLeft)}</span>}
              </div>
            </div>
          </div>

          {/* Quiz Content */}
          {!quizSubmitted ? (
            <div className={`${theme.card} rounded-xl shadow-lg p-6`}>
              {/* Question */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-4">
                  {currentQuiz.questions[currentQuestionIndex].question}
                </h3>
                
                {/* Options */}
                <div className="space-y-3">
                  {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <div 
                      key={index}
                      onClick={() => handleAnswerSelect(currentQuiz.questions[currentQuestionIndex].id, option)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedAnswers[currentQuiz.questions[currentQuestionIndex].id] === option
                          ? 'bg-blue-600 text-white' 
                          : theme.option
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          selectedAnswers[currentQuiz.questions[currentQuestionIndex].id] === option
                            ? 'bg-white text-blue-600' 
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div>{option}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                  <button 
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmitQuiz}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className={`${theme.card} rounded-xl shadow-lg p-8 text-center`}>
              <div className="text-5xl mb-6">
                {score >= 80 ? '🏆' : score >= 60 ? '🎯' : '📚'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-xl mb-6">Your score: <span className="font-bold">{Math.round(score)}%</span></p>
              
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
                <div 
                  className={`h-full rounded-full ${
                    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              
              {/* Question Review */}
              <div className="mb-8 text-left">
                <h4 className="font-bold text-lg mb-4">Question Review:</h4>
                <div className="space-y-4">
                  {currentQuiz.questions.map((question, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <p className="font-medium mb-2">{idx + 1}. {question.question}</p>
                      <p>
                        Your answer: 
                        <span className={`ml-2 ${
                          selectedAnswers[question.id] === question.correctAnswer
                            ? 'text-green-600 dark:text-green-400 font-bold'
                            : 'text-red-600 dark:text-red-400 font-bold'
                        }`}>
                          {selectedAnswers[question.id] || 'Not answered'}
                        </span>
                      </p>
                      {selectedAnswers[question.id] !== question.correctAnswer && (
                        <p className="text-green-600 dark:text-green-400">
                          Correct answer: <span className="font-bold">{question.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry Quiz
                </button>
                <button 
                  onClick={handleReturnToCourses}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Return to Courses
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`py-2 px-6 ${theme.header} text-white text-center text-xs`}>
        © 2025 DevAcademy | All progress synced to cloud
      </footer>
    </div>
  );
};

export default Quiz;
