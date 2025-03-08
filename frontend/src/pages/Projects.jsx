import React, { useState } from 'react';

const Project = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const [error, setError] = useState('');
  const [repoInfo, setRepoInfo] = useState(null);
  const [taskGenerated, setTaskGenerated] = useState(false);

  // Function to generate tasks using Gemini API
  const generateTasksWithGemini = async (description) => {
    try {
      // Replace with your actual API key
      const apiKey = 'AIzaSyDdK7ukD2lO9kli33tX1v0wv1RBzbxhAgY'; 
      
      // Define the prompt for Gemini
      const prompt = `
        I'm working on the following project: "${description}".
        Generate a list of 8-10 specific development tasks that would be needed to complete this project.
        For each task, also provide keywords that might appear in commit messages when the task is implemented.
        Format the response as a JSON array like this:
        [
          {
            "name": "Task description",
            "keywords": ["keyword1", "keyword2", "keyword3"]
          }
        ]
      `;
      
      // Call the Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        })
      });
      
      const data = await response.json();
      
      // Process the response from Gemini
      if (data.candidates && data.candidates.length > 0) {
        const generatedText = data.candidates[0].content.parts[0].text;        
        // Extract JSON from the response (might be embedded in markdown code blocks)
        const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                          generatedText.match(/```\s*([\s\S]*?)\s*```/) ||
                          [null, generatedText];
        
        let jsonContent = jsonMatch[1];
        
        // Remove any non-JSON content
        if (jsonContent.indexOf('[') > 0) {
          jsonContent = jsonContent.substring(jsonContent.indexOf('['));
        }
        if (jsonContent.lastIndexOf(']') < jsonContent.length - 1) {
          jsonContent = jsonContent.substring(0, jsonContent.lastIndexOf(']') + 1);
        }
        
        // Parse the JSON response
        const tasksFromAI = JSON.parse(jsonContent);
        
        // Add IDs to tasks
        const formattedTasks = tasksFromAI.map((task, index) => ({
          id: index + 1,
          name: task.name,
          keywords: task.keywords,
          completed: false
        }));
        
        return formattedTasks;
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Error generating tasks with Gemini:', error);
      throw error;
    }
  };
  
  // Function to generate AI tasks based on project description
  const generateAITasks = async () => {
    if (!projectDescription.trim()) {
      setError('Please provide a project description to generate tasks.');
      return;
    }

    setGeneratingTasks(true);
    setError('');
    
    try {
      // Call Gemini API to generate tasks
      const aiGeneratedTasks = await generateTasksWithGemini(projectDescription);
      setTasks(aiGeneratedTasks);
      setTaskGenerated(true);
      
    } catch (error) {
      setError('Failed to generate AI tasks. Please try again.');
      console.error('Error generating tasks:', error);
    } finally {
      setGeneratingTasks(false);
    }
  };

  // Function to parse GitHub URL to extract owner and repo name
  const parseGitHubUrl = (url) => {
    try {
      // Handle different GitHub URL formats
      const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
      const match = url.match(regex);
      
      if (match && match.length === 3) {
        return {
          owner: match[1],
          repo: match[2].replace('.git', '')
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  // Function to fetch commits from GitHub API
  const fetchCommits = async (owner, repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch commits: ${error.message}`);
    }
  };

  // Function to check if commits match task keywords
  const checkTaskCompletion = (commits, taskList) => {
    return taskList.map(task => {
      // Check if any commit message contains task keywords
      const isCompleted = commits.some(commit => {
        const commitMessage = commit.commit.message.toLowerCase();
        return task.keywords.some(keyword => 
          commitMessage.includes(keyword.toLowerCase())
        );
      });
      
      return { ...task, completed: isCompleted };
    });
  };

  // Handle repository form submission
  const handleRepoSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskGenerated) {
      setError('Please generate tasks first before submitting a repository.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Parse the GitHub repository URL
    const repoData = parseGitHubUrl(repoUrl);
    
    if (!repoData) {
      setError('Invalid GitHub repository URL. Please enter a valid URL.');
      setLoading(false);
      return;
    }
    
    try {
      // Fetch commits from the GitHub repository
      const commits = await fetchCommits(repoData.owner, repoData.repo);
      
      // Update repository info
      setRepoInfo({
        owner: repoData.owner,
        repo: repoData.repo,
        commitCount: commits.length
      });
      
      // Check task completion based on commit messages
      const updatedTasks = checkTaskCompletion(commits, tasks);
      setTasks(updatedTasks);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle project description form submission
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    generateAITasks();
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Gemini-Powered Task Tracker for GitHub Projects</h1>
      
      {/* Project Description Form */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Step 1: Describe Your Project</h2>
        <form onSubmit={handleProjectSubmit}>
          <div className="mb-3">
            <label htmlFor="projectDescription" className="block text-sm font-medium mb-1">
              Project Description:
            </label>
            <textarea
              id="projectDescription"
              rows="3"
              placeholder="Describe your project (e.g., 'A React e-commerce website with user authentication')"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            disabled={generatingTasks}
          >
            {generatingTasks ? (
              <>
                <span className="inline-block mr-2 animate-spin">⟳</span>
                Generating Tasks with Gemini...
              </>
            ) : (
              'Generate Tasks with Gemini AI'
            )}
          </button>
        </form>
      </div>
      
      {/* Repository URL Form */}
      <div className={`mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 ${!taskGenerated ? 'opacity-50' : ''}`}>
        <h2 className="text-lg font-semibold mb-3">Step 2: Connect Your GitHub Repository</h2>
        <form onSubmit={handleRepoSubmit}>
          <div className="mb-3">
            <label htmlFor="repoUrl" className="block text-sm font-medium mb-1">
              GitHub Repository URL:
            </label>
            <input
              id="repoUrl"
              type="text"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
              disabled={!taskGenerated}
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300"
            disabled={loading || !taskGenerated}
          >
            {loading ? (
              <>
                <span className="inline-block mr-2 animate-spin">⟳</span>
                Analyzing Repository...
              </>
            ) : (
              'Analyze Repository'
            )}
          </button>
        </form>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {/* Repository Info */}
      {repoInfo && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold mb-2">Repository: {repoInfo.owner}/{repoInfo.repo}</h2>
          <p>Analyzed {repoInfo.commitCount} commits</p>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Completion Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {calculateProgress()}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  style={{ width: `${calculateProgress()}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600">
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Task List */}
      {taskGenerated && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Gemini-Generated Tasks for "{projectDescription}"
          </h2>
          
          {tasks.length > 0 ? (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li 
                  key={task.id} 
                  className={`p-3 rounded border ${
                    task.completed ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`mt-1 mr-3 flex-shrink-0 ${
                      task.completed ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {task.completed ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'text-green-800' : 'text-gray-700'}`}>
                        {task.name}
                      </p>
                      <div className="flex flex-wrap mt-1 gap-1">
                        {task.keywords.map((keyword, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Status: {task.completed ? 'Completed' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No tasks generated yet. Please describe your project and generate tasks with Gemini.</p>
          )}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-2">Analyzing repository commits...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
