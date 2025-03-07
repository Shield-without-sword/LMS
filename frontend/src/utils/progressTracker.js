// src/utils/progressTracker.js

/**
 * Utility functions for tracking user progress in courses
 */
const progressTracker = {
    /**
     * Saves a lesson as completed
     * @param {string} moduleId - The module ID
     * @param {string} lessonId - The lesson ID
     * @returns {boolean} - Whether the operation was successful
     */
    markLessonComplete: (moduleId, lessonId) => {
      try {
        const lessonKey = `${moduleId}:${lessonId}`;
        let completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        
        if (!completedLessons.includes(lessonKey)) {
          completedLessons.push(lessonKey);
          localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        }
        
        return true;
      } catch (error) {
        console.error('Error marking lesson complete:', error);
        return false;
      }
    },
    
    /**
     * Checks if a lesson is completed
     * @param {string} moduleId - The module ID
     * @param {string} lessonId - The lesson ID
     * @returns {boolean} - Whether the lesson is completed
     */
    isLessonCompleted: (moduleId, lessonId) => {
      try {
        const lessonKey = `${moduleId}:${lessonId}`;
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        return completedLessons.includes(lessonKey);
      } catch (error) {
        console.error('Error checking lesson completion:', error);
        return false;
      }
    },
    
    /**
     * Gets all completed lessons
     * @returns {Array} - Array of completed lesson keys
     */
    getAllCompletedLessons: () => {
      try {
        return JSON.parse(localStorage.getItem('completedLessons') || '[]');
      } catch (error) {
        console.error('Error getting completed lessons:', error);
        return [];
      }
    },
    
    /**
     * Calculates module progress
     * @param {string} moduleId - The module ID
     * @param {Array} moduleLessons - Array of lessons in the module
     * @returns {Object} - Progress object with completed count, total count, and percentage
     */
    getModuleProgress: (moduleId, moduleLessons) => {
      try {
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        const total = moduleLessons.length;
        const completed = moduleLessons.filter(lesson => 
          completedLessons.includes(`${moduleId}:${lesson.id}`)
        ).length;
        
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { completed, total, percentage };
      } catch (error) {
        console.error('Error calculating module progress:', error);
        return { completed: 0, total: 0, percentage: 0 };
      }
    },
    
    /**
     * Calculates overall course progress
     * @param {Array} modules - Array of all course modules
     * @returns {Object} - Progress object with completed count, total count, and percentage
     */
    getCourseProgress: (modules) => {
      try {
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        
        let totalLessons = 0;
        let completedCount = 0;
        
        modules.forEach(module => {
          totalLessons += module.lessons.length;
          module.lessons.forEach(lesson => {
            if (completedLessons.includes(`${module.id}:${lesson.id}`)) {
              completedCount++;
            }
          });
        });
        
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        
        return { completed: completedCount, total: totalLessons, percentage };
      } catch (error) {
        console.error('Error calculating course progress:', error);
        return { completed: 0, total: 0, percentage: 0 };
      }
    },
    
    /**
     * Resets all progress data
     * @returns {boolean} - Whether the operation was successful
     */
    resetProgress: () => {
      try {
        localStorage.removeItem('completedLessons');
        return true;
      } catch (error) {
        console.error('Error resetting progress:', error);
        return false;
      }
    }
  };
  
  export default progressTracker;