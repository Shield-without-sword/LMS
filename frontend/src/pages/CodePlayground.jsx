import React from 'react';
import { FaTrophy } from 'react-icons/fa';

const CodePlayground = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://live-code-editor-omega.vercel.app/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Code Playground"
      />
    </div>
  );
};

export default CodePlayground;
