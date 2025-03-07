// src/components/AvatarQA.jsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const AvatarQA = () => {
  // Sample questions the avatar will ask
  const sampleQuestions = [
    "Can you explain the concept of variable scoping in JavaScript?",
    "What's the difference between functional and object-oriented programming?",
    "How would you implement a linked list data structure?",
    "Explain the box model in CSS.",
    "What are React hooks and why are they useful?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(new Audio());
  const recognitionRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = transcript; // Start with existing transcript
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += text;
          } else {
            interimTranscript += text;
          }
        }
        
        setTranscript(finalTranscript + interimTranscript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error", event.error);
      };
    }
    
    // Initialize camera
    initCamera();
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      // Clean up video stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Initialize camera
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true
      });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [conversation]);

  // Text-to-speech setup
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // You can customize voice properties
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  };

  // Ask a random question
  const askQuestion = () => {
    const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
    const question = sampleQuestions[randomIndex];
    setCurrentQuestion(question);
    setConversation(prev => [...prev, { type: 'question', text: question }]);
    setFeedback(null); // Clear previous feedback
    speak(question);
  };

  // Start recording audio
  const startRecording = async () => {
    try {
      // Clear previous transcript before starting new recording
      setTranscript("");
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Always use the transcript if it exists
        const responseText = transcript || "Audio response recorded";
        
        // Add to recordings list
        const newRecordings = [...recordings, { 
          id: Date.now(), 
          url: audioUrl, 
          question: currentQuestion,
          timestamp: new Date().toLocaleTimeString(),
          transcript: responseText
        }];
        setRecordings(newRecordings);
        
        // Add to conversation
        setConversation(prev => [...prev, { 
          type: 'answer', 
          text: responseText, 
          audioUrl 
        }]);
        
        // Clean up streams
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.log("Recognition already started", e);
        }
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log("Recognition already stopped", e);
        }
      }
    }
  };

  // Play audio
  const playAudio = (url) => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setAudioUrl(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
      setAudioUrl(url);
    }
  };

  // Generate analysis report
  const generateReport = () => {
    if (conversation.length < 2) return;
    
    setIsAnalyzing(true);
    
    // Mock API call to AI service
    // In a real implementation, you would call your Gemini API here
    setTimeout(() => {
      const lastQuestion = conversation.find(msg => msg.type === 'question')?.text || "";
      const lastAnswer = conversation.find(msg => msg.type === 'answer')?.text || "";
      
      const mockFeedback = {
        clarity: Math.floor(Math.random() * 5) + 1,
        relevance: Math.floor(Math.random() * 5) + 1,
        technicalAccuracy: Math.floor(Math.random() * 5) + 1,
        improvements: [
          "Try to provide more specific examples to illustrate your points.",
          "Consider structuring your answer with clear introduction and conclusion.",
          "Your explanation could benefit from technical terminology where appropriate."
        ],
        strengths: [
          "Good understanding of the core concepts.",
          "Clear and concise explanation of complex ideas.",
          "Logical flow of information in your response."
        ]
      };
      
      setFeedback(mockFeedback);
      setIsAnalyzing(false);
    }, 2000);
  };

  // Handle audio ended event
  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPlaying(false);
      setAudioUrl(null);
    };
    
    audioRef.current.addEventListener('ended', handleAudioEnded);
    
    return () => {
      audioRef.current.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Left side - Video */}
      <div className="w-full md:w-1/2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Interview View</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              You're being recorded. Remember to maintain good eye contact and posture.
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right side - Chat */}
      <div className="w-full md:w-1/2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Interactive Learning Avatar</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex flex-col h-[calc(100%-7rem)]">
            <ScrollArea className="flex-grow border rounded-md p-4 mb-4" ref={scrollAreaRef}>
              {conversation.map((item, index) => (
                <div 
                  key={index} 
                  className={`mb-4 p-3 rounded-lg ${
                    item.type === 'question' 
                      ? 'bg-blue-100 ml-0 mr-12' 
                      : 'bg-gray-100 ml-12 mr-0'
                  }`}
                >
                  <div className="mb-1">{item.text}</div>
                  
                  {item.audioUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => playAudio(item.audioUrl)}
                      className="mt-2"
                    >
                      {isPlaying && audioUrl === item.audioUrl ? "Pause" : "Play Recording"}
                    </Button>
                  )}
                </div>
              ))}
              
              {conversation.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  Press "Ask Question" to start the conversation
                </div>
              )}
            </ScrollArea>
            
            {currentQuestion && !feedback && (
              <div className="border-t pt-4 mb-4">
                <div className="font-medium mb-2">Current Question:</div>
                <div className="p-3 bg-blue-50 rounded">{currentQuestion}</div>
              </div>
            )}
            
            {isRecording && (
              <div className="mt-4 p-3 bg-red-50 rounded border border-red-200 animate-pulse">
                <div className="font-medium mb-1 flex items-center">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Recording...
                </div>
                {transcript && (
                  <div className="mt-2 italic">"{transcript}"</div>
                )}
              </div>
            )}
            
            {feedback && (
              <div className="border-t pt-4 mb-4">
                <div className="font-medium mb-2">Analysis Report:</div>
                <div className="p-4 bg-blue-50 rounded">
                  <h3 className="font-semibold mb-2">Ratings (1-5):</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-white rounded shadow-sm">
                      <div className="font-medium">Clarity</div>
                      <div className="text-xl">{feedback.clarity}/5</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded shadow-sm">
                      <div className="font-medium">Relevance</div>
                      <div className="text-xl">{feedback.relevance}/5</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded shadow-sm">
                      <div className="font-medium">Technical</div>
                      <div className="text-xl">{feedback.technicalAccuracy}/5</div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2">Strengths:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-semibold mb-2">Areas for Improvement:</h3>
                  <ul className="list-disc pl-5">
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4 gap-2">
            <Button onClick={askQuestion} disabled={isRecording} className="flex-1">
              Ask Question
            </Button>
            
            {!isRecording ? (
              <Button 
                onClick={startRecording} 
                variant="outline" 
                className="bg-red-50 hover:bg-red-100 flex-1"
                disabled={!currentQuestion}
              >
                Start Recording
              </Button>
            ) : (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
                className="flex-1"
              >
                Stop Recording
              </Button>
            )}
            
            <Button
              onClick={generateReport}
              variant="outline"
              className="flex-1"
              disabled={isRecording || conversation.length < 2 || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Generate Report"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AvatarQA;