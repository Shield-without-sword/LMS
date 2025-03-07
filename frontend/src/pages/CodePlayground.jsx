import React from 'react';
import { FaTrophy } from 'react-icons/fa';

const CodePlayground = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaTrophy className="text-2xl text-indigo-600" />
          <h1 className="text-2xl font-bold">Code Playground</h1>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl text-gray-600 mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            Our interactive code playground is being built. 
            Soon you'll be able to practice coding in real-time!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
