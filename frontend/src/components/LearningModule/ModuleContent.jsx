// src/components/LearningModule/ModuleContent.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CodeCompiler from '../CodeCompiler';
const ModuleContent = ({ modules }) => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const module = modules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!lesson) return <div>Lesson not found</div>;

  useEffect(() => {
    // Load completed lessons from localStorage
    const savedCompletedLessons = localStorage.getItem('completedLessons');
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }

    // Find current module and lesson
    if (modules && moduleId && lessonId) {
      const foundModule = modules.find(m => m.id === moduleId);
      if (foundModule) {
        setCurrentModule(foundModule);
        const foundLesson = foundModule.lessons.find(l => l.id === lessonId);
        if (foundLesson) {
          setCurrentLesson(foundLesson);
        }
      }
    }
  }, [moduleId, lessonId, modules]);

  const markLessonComplete = () => {
    const lessonKey = `${moduleId}:${lessonId}`;
    if (!completedLessons.includes(lessonKey)) {
      const updatedCompletedLessons = [...completedLessons, lessonKey];
      setCompletedLessons(updatedCompletedLessons);
      localStorage.setItem('completedLessons', JSON.stringify(updatedCompletedLessons));
    }
  };

  const navigateToNextLesson = () => {
    if (!currentModule || !currentLesson) return;
    
    // Mark current lesson as complete
    markLessonComplete();
    
    // Find index of current lesson
    const currentIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
    
    if (currentIndex < currentModule.lessons.length - 1) {
      // Next lesson in the same module
      const nextLesson = currentModule.lessons[currentIndex + 1];
      navigate(`/courses/${moduleId}/${nextLesson.id}`);
    } else {
      // Find next module
      const currentModuleIndex = modules.findIndex(m => m.id === moduleId);
      if (currentModuleIndex < modules.length - 1) {
        const nextModule = modules[currentModuleIndex + 1];
        if (nextModule.lessons.length > 0) {
          navigate(`/courses/${nextModule.id}/${nextModule.lessons[0].id}`);
        }
      } else {
        // We're at the last lesson of the last module
        navigate('/courses/complete');
      }
    }
  };

  const navigateToPreviousLesson = () => {
    if (!currentModule || !currentLesson) return;
    
    // Find index of current lesson
    const currentIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
    
    if (currentIndex > 0) {
      // Previous lesson in the same module
      const prevLesson = currentModule.lessons[currentIndex - 1];
      navigate(`/courses/${moduleId}/${prevLesson.id}`);
    } else {
      // Find previous module
      const currentModuleIndex = modules.findIndex(m => m.id === moduleId);
      if (currentModuleIndex > 0) {
        const prevModule = modules[currentModuleIndex - 1];
        if (prevModule.lessons.length > 0) {
          // Navigate to the last lesson of the previous module
          const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
          navigate(`/courses/${prevModule.id}/${lastLesson.id}`);
        }
      }
    }
  };

  const isLessonCompleted = () => {
    const lessonKey = `${moduleId}:${lessonId}`;
    return completedLessons.includes(lessonKey);
  };

  if (!currentModule || !currentLesson) {
    return <div className="p-8 text-center">Loading lesson content...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
        
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{currentModule.title}</h1>
        <div className="text-sm text-gray-500">
          Module {modules.findIndex(m => m.id === moduleId) + 1} of {modules.length}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      
      {lesson.codeExample && (
        <CodeCompiler
          initialCode={lesson.codeExample.initialCode}
          language={lesson.codeExample.language}
        />
      )}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {currentLesson.title}
          {isLessonCompleted() && (
            <span className="ml-2 text-green-500">✓</span>
          )}
        </h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="prose max-w-none"
        >
          <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
        </motion.div>
      </div>

      <div className="flex justify-between mt-12 border-t pt-6">
        <button
          onClick={navigateToPreviousLesson}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Previous Lesson
        </button>
        
        <div>
          {!isLessonCompleted() ? (
            <button
              onClick={markLessonComplete}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition mr-4"
            >
              Mark as Complete
            </button>
          ) : (
            <button
              disabled
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-4 cursor-not-allowed"
            >
              Completed ✓
            </button>
          )}
        </div>
        
        <button
          onClick={navigateToNextLesson}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Next Lesson →
        </button>
      </div>
    </div>

  );
};

export default ModuleContent;