// src/components/LearningModule/ModuleNavigation.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ModuleNavigation = ({ modules }) => {
  const { moduleId, lessonId } = useParams();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    // Load completed lessons from localStorage
    const savedCompletedLessons = localStorage.getItem('completedLessons');
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }

    // Set current module as expanded
    if (moduleId) {
      setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
    }
  }, [moduleId]);

  const toggleModule = (id) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isLessonCompleted = (moduleId, lessonId) => {
    const lessonKey = `${moduleId}:${lessonId}`;
    return completedLessons.includes(lessonKey);
  };

  const getModuleProgress = (moduleId) => {
    const moduleObj = modules.find(m => m.id === moduleId);
    if (!moduleObj) return { completed: 0, total: 0, percentage: 0 };

    const total = moduleObj.lessons.length;
    const completed = moduleObj.lessons.filter(lesson => 
      isLessonCompleted(moduleId, lesson.id)
    ).length;
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };

  return (
    <div className="w-64 bg-gray-100 overflow-y-auto h-screen p-4 border-r">
      <h2 className="text-xl font-bold mb-6">Course Content</h2>
      
      <div className="space-y-4">
        {modules.map((module) => {
          const progress = getModuleProgress(module.id);
          const isActive = module.id === moduleId;
          
          return (
            <div 
              key={module.id} 
              className={`border rounded-lg overflow-hidden ${isActive ? 'border-blue-500' : 'border-gray-300'}`}
            >
              <div 
                className={`p-3 flex justify-between items-center cursor-pointer ${isActive ? 'bg-blue-50' : 'bg-white'}`}
                onClick={() => toggleModule(module.id)}
              >
                <div>
                  <h3 className="font-medium">{module.title}</h3>
                  <div className="text-xs text-gray-500">
                    {progress.completed} of {progress.total} completed
                  </div>
                </div>
                <div className="flex items-center">
                  {progress.percentage === 100 && (
                    <span className="text-green-500 mr-2">✓</span>
                  )}
                  <span>{expandedModules[module.id] ? '▼' : '►'}</span>
                </div>
              </div>
              
              {expandedModules[module.id] && (
                <div className="bg-gray-50 p-2">
                  <ul className="space-y-1">
                    {module.lessons.map((lesson) => {
                      const isLessonActive = lesson.id === lessonId && module.id === moduleId;
                      const isCompleted = isLessonCompleted(module.id, lesson.id);
                      
                      return (
                        <li key={lesson.id}>
                          <Link 
                            to={`/courses/${module.id}/${lesson.id}`}
                            className={`
                              block p-2 rounded text-sm
                              ${isLessonActive ? 'bg-blue-100 font-medium' : 'hover:bg-gray-200'}
                              ${isCompleted ? 'text-green-700' : 'text-gray-700'}
                            `}
                          >
                            <div className="flex items-center">
                              {isCompleted ? (
                                <span className="mr-2 text-green-500">✓</span>
                              ) : (
                                <span className="mr-2 w-4 h-4 rounded-full border border-gray-300"></span>
                              )}
                              {lesson.title}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleNavigation;