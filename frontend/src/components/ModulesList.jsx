import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModulesList = ({ modules }) => {
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const handleLessonClick = (moduleId, lessonId) => {
    navigate(`/courses/${moduleId}/${lessonId}`);
  };

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Course Modules</h1>
        <div className="space-y-6">
          {modules.map((module) => (
            <div key={module.id} className="border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(module.id, lesson.id)}
                    className="w-full text-left p-4 rounded bg-gray-50 hover:bg-gray-100 transition"
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulesList;