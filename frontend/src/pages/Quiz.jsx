import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();

  // Sample quiz data - in a real scenario, this data could come from an API or be stored elsewhere
  const quizData = {
    'html-basics': {
      'intro-to-html': [
        {
          question: "What does HTML stand for?",
          options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
          correctAnswer: "HyperText Markup Language"
        },
        {
          question: "Which tag is used to create a paragraph in HTML?",
          options: ["<p>", "<div>", "<h1>"],
          correctAnswer: "<p>"
        }
      ],
      'html-elements': [
        {
          question: "Which of the following is a block-level element?",
          options: ["<p>", "<img>", "<a>"],
          correctAnswer: "<p>"
        },
        {
          question: "How do you define a link in HTML?",
          options: ["<link>", "<a>", "<href>"],
          correctAnswer: "<a>"
        }
      ]
    },
    'css-basics': {
      'intro-to-css': [
        {
          question: "What does CSS stand for?",
          options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
          correctAnswer: "Cascading Style Sheets"
        },
        {
          question: "Which property is used to change the font of an element?",
          options: ["font-family", "font-style", "font-size"],
          correctAnswer: "font-family"
        }
      ]
      
    }
  };

  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Retrieve the quiz data based on the module and lesson
    if (quizData[moduleId] && quizData[moduleId][lessonId]) {
      setCurrentQuiz(quizData[moduleId][lessonId]);
    }
  }, [moduleId, lessonId]);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers({
      ...answers,
      [questionIndex]: selectedAnswer
    });
  };

  const submitQuiz = () => {
    let totalScore = 0;

    // Check answers and calculate the score
    currentQuiz.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    setQuizComplete(true);
  };

  const navigateToNextLesson = () => {
    // Move to next lesson in the same module
    const currentModule = Object.keys(quizData).find((module) => module === moduleId);
    const moduleLessons = Object.keys(quizData[currentModule]);
    const currentLessonIndex = moduleLessons.findIndex((lesson) => lesson === lessonId);
    
    if (currentLessonIndex < moduleLessons.length - 1) {
      const nextLesson = moduleLessons[currentLessonIndex + 1];
      navigate(`/courses/${moduleId}/${nextLesson}`);
    } else {
      // If it's the last lesson, navigate to the next module or end the course
      const currentModuleIndex = Object.keys(quizData).findIndex((module) => module === moduleId);
      if (currentModuleIndex < Object.keys(quizData).length - 1) {
        const nextModule = Object.keys(quizData)[currentModuleIndex + 1];
        const nextLesson = Object.keys(quizData[nextModule])[0]; // Take the first lesson of the next module
        navigate(`/courses/${nextModule}/${nextLesson}`);
      } else {
        navigate('/courses/complete'); // If it is the last module, navigate to the completion page
      }
    }
  };

  if (quizComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Quiz Results</h2>
        <p className="mb-4">You scored {score} out of {currentQuiz.length}</p>
        <button
          onClick={navigateToNextLesson}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Next Lesson →
        </button>
      </div>
    );
  }

  if (!currentQuiz.length) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Quiz Not Found</h2>
        <p className="mb-4">Sorry, no quiz data is available for this lesson.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Quiz: {lessonId}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {currentQuiz.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center">
                  <input
                    type="radio"
                    id={`question-${index}-option-${i}`}
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                    checked={answers[index] === option}
                    className="mr-2"
                  />
                  <label htmlFor={`question-${index}-option-${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="flex justify-between">
          <button
            onClick={submitQuiz}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
