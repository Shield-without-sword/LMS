// src/lib/gemini-api.js

/**
 * Mock implementation of a Gemini API service for analyzing interview responses
 * Replace this with actual Gemini API implementation when ready
 */
export const analyzeResponse = async (question, answer) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // This is where you would make the actual API call to Gemini
  // const response = await fetch('https://your-gemini-api-endpoint', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     question,
  //     answer,
  //     // other parameters as needed
  //   })
  // });
  // return await response.json();
  
  // For now, return mock analysis
  return {
    clarity: calculateScore(5),
    relevance: calculateScore(5),
    technicalAccuracy: calculateScore(5),
    improvements: generateImprovements(question, answer),
    strengths: generateStrengths(question, answer)
  };
};

// Helper functions to generate mock feedback
const calculateScore = (max) => Math.floor(Math.random() * max) + 1;

const generateImprovements = (question, answer) => {
  const improvements = [
    "Try to provide more specific examples to illustrate your points.",
    "Consider structuring your answer with clear introduction and conclusion.",
    "Your explanation could benefit from technical terminology where appropriate.",
    "Be more concise and avoid tangential information.",
    "Consider citing specific frameworks or libraries in your response.",
    "Work on transitioning between different points more smoothly.",
    "Try to relate concepts to real-world applications more explicitly.",
    "Practice speaking more confidently and with fewer filler words.",
    "Consider adding a quick summary at the end of your response.",
    "Try to anticipate and address potential follow-up questions."
  ];
  
  // Select 2-4 random improvements
  const count = Math.floor(Math.random() * 3) + 2;
  const selected = [];
  const used = new Set();
  
  while (selected.length < count && selected.length < improvements.length) {
    const index = Math.floor(Math.random() * improvements.length);
    if (!used.has(index)) {
      selected.push(improvements[index]);
      used.add(index);
    }
  }
  
  return selected;
};

const generateStrengths = (question, answer) => {
  const strengths = [
    "Good understanding of the core concepts.",
    "Clear and concise explanation of complex ideas.",
    "Logical flow of information in your response.",
    "Effective use of technical terminology.",
    "Strong examples that illustrate your points well.",
    "Good balance of theoretical knowledge and practical application.",
    "Confident delivery that showcases your expertise.",
    "Well-structured response with clear beginning, middle, and end.",
    "Good time management in your answer.",
    "Ability to simplify complex concepts without losing accuracy."
  ];
  
  // Select 2-3 random strengths
  const count = Math.floor(Math.random() * 2) + 2;
  const selected = [];
  const used = new Set();
  
  while (selected.length < count && selected.length < strengths.length) {
    const index = Math.floor(Math.random() * strengths.length);
    if (!used.has(index)) {
      selected.push(strengths[index]);
      used.add(index);
    }
  }
  
  return selected;
};