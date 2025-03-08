import React, { useState, useEffect } from 'react';

const Project = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const [error, setError] = useState('');
  const [repoInfo, setRepoInfo] = useState(null);
  const [taskGenerated, setTaskGenerated] = useState(false);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  // All your existing functions
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

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <span className={`${theme === 'dark' ? 'text-purple-400' : 'text-blue-600'}`}>Gemini-Powered</span> Task Tracker
          </h1>
          <p className={`mt-3 max-w-2xl mx-auto text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
            Generate and track development tasks using AI and GitHub integration
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-1">
          {/* Project Description Form */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'} transition-all duration-300 transform hover:scale-[1.01]`}>
            <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white`}>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-bold">Step 1: Project Description</h2>
              </div>
              <p className="mt-2 opacity-80">Describe your project and let Gemini generate tasks</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label htmlFor="projectDescription" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    What are you building?
                  </label>
                  <textarea
                    id="projectDescription"
                    rows="3"
                    placeholder="Describe your project (e.g., 'A React e-commerce website with user authentication')"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'} focus:border-transparent transition-colors duration-200`}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${generatingTasks ? (theme === 'dark' ? 'bg-purple-700' : 'bg-blue-400') : (theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700')} focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'} focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70`}
                  disabled={generatingTasks}
                >
                  {generatingTasks ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Tasks...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Generate Tasks with Gemini AI
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Repository URL Form */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${!taskGenerated ? 'opacity-75 cursor-not-allowed' : ''} ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'} transition-all duration-300 transform hover:scale-[1.01]`}>
            <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-r from-green-900 to-teal-900' : 'bg-gradient-to-r from-green-500 to-teal-500'} text-white`}>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-bold">Step 2: Connect GitHub Repository</h2>
              </div>
              <p className="mt-2 opacity-80">Link your repository to track task progress</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleRepoSubmit} className="space-y-4">
                <div>
                  <label htmlFor="repoUrl" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    GitHub Repository URL:
                  </label>
                  <input
                    id="repoUrl"
                    type="text"
                    placeholder="https://github.com/username/repository"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-green-500' : 'focus:ring-green-500'} focus:border-transparent transition-colors duration-200`}
                    required
                    disabled={!taskGenerated}
                  />
                </div>
                <button 
                  type="submit" 
                  className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${loading ? (theme === 'dark' ? 'bg-green-700' : 'bg-green-400') : (theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700')} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70`}
                  disabled={loading || !taskGenerated}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Repository...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Analyze Repository
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className={`rounded-lg shadow-md overflow-hidden ${theme === 'dark' ? 'bg-red-900 border border-red-800' : 'bg-red-100 border border-red-400'} transition-transform transform animate-pulse`}>
              <div className="px-4 py-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-red-300' : 'text-red-500'} mr-3`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
              </div>
            </div>
          )}

          {/* Repository Info */}
          {repoInfo && (
            <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'} transition-all duration-300 transform hover:scale-[1.01]`}>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-400 to-indigo-500'} text-white`}>
                <h2 className="text-xl font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  Repository: {repoInfo.owner}/{repoInfo.repo}
                </h2>
                <div className="mt-2 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Analyzed {repoInfo.commitCount} commits
                </div>
              </div>

              <div className="p-6">
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Completion Progress</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${theme === 'dark' ? 'text-blue-300 bg-blue-900' : 'text-blue-600 bg-blue-200'}`}>
                        {calculateProgress() < 30 ? 'Just Started' : calculateProgress() < 70 ? 'In Progress' : 'Almost Done'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold inline-block ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                        {calculateProgress()}%
                      </span>
                    </div>
                  </div>
                  <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      style={{ width: `${calculateProgress()}%` }} 
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'} transition-all duration-500 ease-in-out`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Task List */}
        {taskGenerated && (
          <div className={`mt-10 rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'} transition-all duration-300`}>
            <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white`}>
              <h2 className="text-xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Gemini-Generated Tasks
              </h2>
              <p className="mt-2 opacity-80">
                For project: "{projectDescription}"
              </p>
            </div>

            <div className="p-6">
              {tasks.length > 0 ? (
                <ul className="space-y-4 divide-y divide-gray-200">
                  {tasks.map((task, idx) => (
                    <li 
                      key={task.id} 
                      className={`p-4 rounded-lg ${task.completed 
                        ? (theme === 'dark' ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200')
                        : (theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200')} 
                      transition-colors duration-300`}
                    >
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                          task.completed 
                            ? (theme === 'dark' ? 'bg-green-500 text-green-100' : 'bg-green-500 text-white') 
                            : (theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-600')
                        }`}>
                          {task.completed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>
                        <div className="ml-3 w-full">
                          <p className={`text-sm font-medium ${task.completed 
                            ? (theme === 'dark' ? 'text-green-200 line-through' : 'text-green-800 line-through') 
                            : (theme === 'dark' ? 'text-white' : 'text-gray-800')}`}>
                            {task.name}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {task.keywords.map((keyword, kidx) => (
                              <span 
                                key={`${task.id}-${kidx}`} 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  task.completed
                                    ? (theme === 'dark' ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                                    : (theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-800')
                                }`}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <p className="mt-2 text-lg">No tasks generated yet.</p>
                  <p className="mt-1">Add a project description to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            TaskGenius - Powered by Gemini AI and GitHub
          </p>
        </div>
      </div>
    </div>
  );
};

export default Project;
