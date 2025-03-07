import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';

function EmployeeTable({
  employees = [],
  handleUpdateEmployee,
}) {
  const handleDeleteEmployee = async (id) => {
    try {
      const { success, message } = await DeleteEmployeeById(id);
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
    } catch (err) {
      console.error(err);
      notify('Failed to delete Employee', 'error');
    }
  };

  const EmployeeCard = ({ employee }) => (
    
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200">
      <div className="p-4">
        {/* Post Header with Avatar and Name */}
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
            {employee.name.charAt(0)}
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-lg text-gray-800">{employee.name}</h3>
            <p className="text-gray-500 text-sm">Posted now</p>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{employee.Defect}</p>
        </div>
        
        {/* Media Content (if available) */}
        {employee.profileImage && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img 
              src={employee.profileImage} 
              alt="Post media" 
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
        
        {/* Tags */}
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
            #{employee.Breed}
          </span>
        </div>
        
        {/* Engagement Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span>Like</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span>Comment</span>
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {handleUpdateEmployee && (
              <button 
                onClick={() => handleUpdateEmployee(employee)}
                className="text-gray-500 hover:text-blue-500 transition-colors"
              >
                <span className="text-lg">✏️</span>
              </button>
            )}
            <button 
              onClick={() => handleDeleteEmployee(employee._id)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <span className="text-lg">🗑️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {employees.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Data Not Found</h3>
          <p className="mt-1 text-gray-500">No posts to display at this time.</p>
        </div>
      ) : (
        employees.map((emp) => <EmployeeCard key={emp._id} employee={emp} />)
      )}
    </div>
  );
}

export default EmployeeTable;