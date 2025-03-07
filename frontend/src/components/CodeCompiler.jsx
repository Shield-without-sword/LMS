import React, { useState } from 'react';

const CodeCompiler = ({ initialCode, language }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          version: '*',
          files: [{
            content: code
          }]
        })
      });

      const data = await response.json();
      setOutput(data.run.output || data.run.stderr);
    } catch (error) {
      setOutput('Error executing code: ' + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-4 border rounded-lg p-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-48 p-2 font-mono text-sm border rounded"
      />
      <div className="mt-2 flex gap-2">
        <button
          onClick={runCode}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
      </div>
      {output && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">Output:</h4>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeCompiler;