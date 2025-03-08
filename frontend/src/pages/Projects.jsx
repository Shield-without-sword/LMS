"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { Download, Eye, CheckCircle, Search, X, BookOpen, Star, Filter, BarChart } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Toaster, toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const roadmaps = [
  {
    id: 1,
    title: 'Web Development Roadmap',
    description: 'A comprehensive guide to becoming a full-stack web developer, covering both front-end and back-end technologies.',
    pdfUrl: '/assets/roadmaps/web-dev.pdf',
    category: 'Development',
    difficulty: 'Intermediate',
    estimatedTime: '6 months',
    popular: true,
    milestones: [
      { id: 1, title: 'HTML & CSS Basics', completed: true },
      { id: 2, title: 'JavaScript Fundamentals', completed: true },
      { id: 3, title: 'React Framework', completed: false },
      { id: 4, title: 'Backend Development with Node.js', completed: false },
      { id: 5, title: 'Database Management', completed: false },
      { id: 6, title: 'Version Control with Git & GitHub', completed: false },
      { id: 7, title: 'RESTful APIs and GraphQL', completed: false },
      { id: 8, title: 'DevOps and Deployment', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Data Science Roadmap',
    description: 'Your path to becoming a proficient data scientist, focusing on data analysis, machine learning, and big data technologies.',
    pdfUrl: '/assets/roadmaps/data-analyst.pdf',
    category: 'Data',
    difficulty: 'Advanced',
    estimatedTime: '8 months',
    popular: true,
    milestones: [
      { id: 1, title: 'Python Programming', completed: true },
      { id: 2, title: 'Data Analysis with Pandas', completed: false },
      { id: 3, title: 'Machine Learning Basics', completed: false },
      { id: 4, title: 'Deep Learning and Neural Networks', completed: false },
      { id: 5, title: 'Big Data Technologies', completed: false },
      { id: 6, title: 'Data Visualization with Matplotlib & Seaborn', completed: false },
      { id: 7, title: 'Natural Language Processing (NLP)', completed: false },
      { id: 8, title: 'Model Deployment and MLOps', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Mobile App Development Roadmap',
    description: 'Guide to building cross-platform mobile applications using modern frameworks and best practices.',
    pdfUrl: '/assets/roadmaps/android.pdf',
    category: 'Development',
    difficulty: 'Intermediate',
    estimatedTime: '5 months',
    popular: false,
    milestones: [
      { id: 1, title: 'JavaScript/TypeScript Fundamentals', completed: true },
      { id: 2, title: 'React Native Basics', completed: true },
      { id: 3, title: 'State Management (Redux)', completed: false },
      { id: 4, title: 'Native Modules and APIs', completed: false },
      { id: 5, title: 'App Store Deployment', completed: false },
      { id: 6, title: 'Performance Optimization', completed: false },
      { id: 7, title: 'Push Notifications and Analytics', completed: false },
      { id: 8, title: 'User Authentication & Security', completed: false },
    ],
  },
  {
    id: 4,
    title: 'AI Data Scientist Roadmap',
    description: 'Learn the skills needed to become an AI Data Scientist, from machine learning to deep learning and model deployment.',
    pdfUrl: '/assets/roadmaps/ai-data-scientist.pdf',
    category: 'AI',
    difficulty: 'Expert',
    estimatedTime: '10 months',
    popular: true,
    milestones: [
      { id: 1, title: 'Introduction to AI and Machine Learning', completed: false },
      { id: 2, title: 'Data Preprocessing and Feature Engineering', completed: false },
      { id: 3, title: 'Supervised and Unsupervised Learning', completed: false },
      { id: 4, title: 'Deep Learning with TensorFlow and PyTorch', completed: false },
      { id: 5, title: 'Computer Vision and Image Recognition', completed: false },
      { id: 6, title: 'Natural Language Processing (NLP) and Text Analytics', completed: false },
      { id: 7, title: 'Model Evaluation and Hyperparameter Tuning', completed: false },
      { id: 8, title: 'AI Ethics and Bias Mitigation', completed: false },
    ],
  },
  {
    id: 5,
    title: 'Cyber Security Roadmap',
    description: 'Become a cybersecurity expert with this roadmap covering network security, ethical hacking, and incident response.',
    pdfUrl: '/assets/roadmaps/cyber-security.pdf',
    category: 'Security',
    difficulty: 'Advanced',
    estimatedTime: '9 months',
    popular: false,
    milestones: [
      { id: 1, title: 'Introduction to Cyber Security', completed: false },
      { id: 2, title: 'Network Security Fundamentals', completed: false },
      { id: 3, title: 'Ethical Hacking and Penetration Testing', completed: false },
      { id: 4, title: 'Cryptography and Encryption', completed: false },
      { id: 5, title: 'Security Operations and Incident Response', completed: false },
      { id: 6, title: 'Web Application Security', completed: false },
      { id: 7, title: 'Threat Intelligence and Malware Analysis', completed: false },
      { id: 8, title: 'Compliance and Security Frameworks', completed: false },
    ],
  },
  {
    id: 6,
    title: 'UI and UX Design Roadmap',
    description: 'Master the principles of user interface and user experience design, from wireframing to interactive prototyping.',
    pdfUrl: '/assets/roadmaps/ux-design.pdf',
    category: 'Design',
    difficulty: 'Beginner',
    estimatedTime: '4 months',
    popular: false,
    milestones: [
      { id: 1, title: 'Introduction to UI/UX Design', completed: false },
      { id: 2, title: 'Wireframing and Prototyping', completed: false },
      { id: 3, title: 'Design Systems and Component Libraries', completed: false },
      { id: 4, title: 'User Research and Persona Development', completed: false },
      { id: 5, title: 'Usability Testing and Iteration', completed: false },
      { id: 6, title: 'Visual Design and Typography', completed: false },
      { id: 7, title: 'Interaction Design and Animations', completed: false },
      { id: 8, title: 'Accessibility and Inclusive Design', completed: false },
    ],
  },
];

const categories = [...new Set(roadmaps.map(roadmap => roadmap.category))];
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const RoadmapPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [completedMilestones, setCompletedMilestones] = useState({})
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [activeTab, setActiveTab] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [currentRoadmap, setCurrentRoadmap] = useState(null)
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false)

  useEffect(() => {
    // Check for user's preferred theme
    const isDark = localStorage.getItem('roadmapDarkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
    
    // Check for saved progress in localStorage
    const savedProgress = localStorage.getItem('roadmapProgress')
    if (savedProgress) {
      setCompletedMilestones(JSON.parse(savedProgress))
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('roadmapDarkMode', newMode.toString())
    document.documentElement.classList.toggle('dark')
  }

  const filteredRoadmaps = useMemo(() => {
    return roadmaps.filter(roadmap => {
      const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           roadmap.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'All' || roadmap.category === selectedCategory
      
      const matchesDifficulty = selectedDifficulty === 'All' || roadmap.difficulty === selectedDifficulty
      
      const matchesTab = 
        (activeTab === 'all') ||
        (activeTab === 'popular' && roadmap.popular) ||
        (activeTab === 'in-progress' && calculateProgress(roadmap) > 0 && calculateProgress(roadmap) < 100) ||
        (activeTab === 'completed' && calculateProgress(roadmap) === 100)
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesTab
    })
  }, [searchQuery, selectedCategory, selectedDifficulty, activeTab, completedMilestones])

  const handleDownload = async (pdfUrl, title) => {
    setIsDownloading(true)
    try {
      const response = await fetch(pdfUrl)
      if (response.status === 404) {
        throw new Error('PDF file not found. Please contact the administrator.')
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const blob = await response.blob()
      if (blob.size === 0) {
        throw new Error('The downloaded file is empty')
      }
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${title.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Download Successful', {
        description: `${title} PDF has been downloaded.`,
      })
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download Failed', {
        description: error.message || `There was an error downloading the ${title} PDF. Please try again or contact support.`,
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const toggleMilestone = (roadmapId, milestoneId) => {
    setCompletedMilestones(prev => {
      const roadmapMilestones = prev[roadmapId] || []
      const updatedMilestones = roadmapMilestones.includes(milestoneId)
        ? roadmapMilestones.filter(id => id !== milestoneId)
        : [...roadmapMilestones, milestoneId]
      
      // Store updated progress in localStorage
      const updatedProgress = { ...prev, [roadmapId]: updatedMilestones }
      localStorage.setItem('roadmapProgress', JSON.stringify(updatedProgress))
      
      return updatedProgress
    })
  }

  const calculateProgress = (roadmap) => {
    const completed = (completedMilestones[roadmap.id] || []).length
    return Math.round((completed / roadmap.milestones.length) * 100)
  }

  const resetProgress = (roadmapId) => {
    setCompletedMilestones(prev => {
      const updatedProgress = { ...prev }
      delete updatedProgress[roadmapId]
      localStorage.setItem('roadmapProgress', JSON.stringify(updatedProgress))
      return updatedProgress
    })
    toast.success('Progress Reset', {
      description: 'Your progress for this roadmap has been reset.',
    })
    setMilestoneDialogOpen(false)
  }

  const openMilestoneDialog = (roadmap) => {
    setCurrentRoadmap(roadmap)
    setMilestoneDialogOpen(true)
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-gray-200 dark:bg-gray-700'
    if (progress < 25) return 'bg-red-500'
    if (progress < 50) return 'bg-yellow-500'
    if (progress < 75) return 'bg-blue-500'
    if (progress < 100) return 'bg-indigo-500'
    return 'bg-green-500'
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-indigo-100'}`}>
      <Toaster position="top-center" theme={darkMode ? 'dark' : 'light'} />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent`}>
              Learning Roadmaps
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your journey to mastery starts here
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="rounded-full p-2 h-10 w-10"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </Button>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-10 w-full rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white'}`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X size={20} />
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`${darkMode ? 'border-gray-700 text-gray-200' : ''}`}>
                  <Filter className="mr-2 h-4 w-4" /> Category: {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedCategory('All')}>
                  All Categories
                </DropdownMenuItem>
                {categories.map(category => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`${darkMode ? 'border-gray-700 text-gray-200' : ''}`}>
                  <BarChart className="mr-2 h-4 w-4" /> Difficulty: {selectedDifficulty}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedDifficulty('All')}>
                  All Difficulty Levels
                </DropdownMenuItem>
                {difficultyLevels.map(level => (
                  <DropdownMenuItem key={level} onClick={() => setSelectedDifficulty(level)}>
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className={`grid grid-cols-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <TabsTrigger value="all">All Roadmaps</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredRoadmaps.length === 0 ? (
          <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">No roadmaps found</h2>
            <p>Try adjusting your search or filter criteria.</p>
            <Button 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setActiveTab('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoadmaps.map((roadmap) => {
              const progress = calculateProgress(roadmap);
              const progressColor = getProgressColor(progress);
              
              return (
                <div 
                  key={roadmap.id} 
                  className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${
                    darkMode 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white shadow-lg hover:shadow-blue-200'
                  }`}
                >
                  <div className={`p-1 ${progressColor}`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {roadmap.title}
                      </h2>
                      {roadmap.popular && (
                        <Badge className="bg-amber-500 hover:bg-amber-600">
                          <Star className="h-3 w-3 mr-1" fill="currentColor" /> Popular
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className={darkMode ? 'border-gray-700' : ''}>
                        {roadmap.category}
                      </Badge>
                      <Badge className={`${getDifficultyColor(roadmap.difficulty)}`}>
                        {roadmap.difficulty}
                      </Badge>
                    </div>
                    
                    <p className={`mb-4 h-20 overflow-hidden ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {roadmap.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Progress
                      </span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {progress}%
                      </span>
                    </div>
                    
                    <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                      <div 
                        className={`h-2 rounded-full ${progressColor}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center text-sm mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Estimated time: {roadmap.estimatedTime}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => openMilestoneDialog(roadmap)}
                      >
                        <BookOpen className="mr-2 h-4 w-4" /> View Milestones
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownload(roadmap.pdfUrl, roadmap.title)}
                        disabled={isDownloading}
                        className={`flex-1 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : ''}`}
                      >
                        <Download className="mr-2 h-4 w-4" /> 
                        {isDownloading ? 'Downloading...' : 'Download'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Milestone Dialog */}
      {currentRoadmap && (
        <Dialog open={milestoneDialogOpen} onOpenChange={setMilestoneDialogOpen}>
          <DialogContent className={`sm:max-w-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{currentRoadmap.title}</span>
                <span className={`text-sm ${progressColor} px-2 py-1 rounded-full`}>
                  {calculateProgress(currentRoadmap)}% Complete
                </span>
              </DialogTitle>
              <DialogDescription className={darkMode ? 'text-gray-400' : ''}>
                Track your progress through the milestones below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-2">
              {currentRoadmap.milestones.map((milestone, index) => {
                const isCompleted = (completedMilestones[currentRoadmap.id] || []).includes(milestone.id);
                
                return (
                  <div
                    key={milestone.id}
                    className={`flex items-center p-4 border rounded-lg transition-colors ${
                      isCompleted 
                        ? darkMode 
                          ? 'bg-green-900/20 border-green-800' 
                          : 'bg-green-50 border-green-200' 
                        : darkMode 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="mr-4 flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : darkMode 
                            ? 'bg-gray-600 text-gray-200' 
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow mr-4">
                      <h4 className={`font-medium ${
                        isCompleted 
                          ? darkMode 
                            ? 'text-green-300' 
                            : 'text-green-700' 
                          : darkMode 
                            ? 'text-white' 
                            : 'text-gray-700'
                      }`}>
                        {milestone.title}
                      </h4>
                    </div>
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleMilestone(currentRoadmap.id, milestone.id)}
                      className={isCompleted 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : darkMode 
                          ? 'border-gray-600 text-gray-200' 
                          : ''
                      }
                    >
                      {isCompleted ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                );
              })}
            </div>
            
            <DialogFooter className="flex justify-between items-center flex-row">
            <Button
                variant="destructive"
                size="sm"
                onClick={() => resetProgress(currentRoadmap.id)}
              >
                Reset Progress
              </Button>
              <Button onClick={() => setMilestoneDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default RoadmapPage
