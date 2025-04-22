// ZAP Labs API Utilities

// Access error handling utilities from global window object

// Mock data for scenarios
const mockScenarios = [
{
  id: 1,
  name: "Alex Weber",
  age: 34,
  type: "Online Solicitation",
  difficulty: "Medium",
  tags: ["First-Time Offender", "Denial", "Minimization"],
  description: "Subject claims to have been role-playing and unaware of communicating with a minor.",
  objectives: ["Establish timeline", "Identify grooming patterns", "Assess subject awareness"],
  thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHBvcnRyYWl0fGVufDB8fDB8fHww",
  completed: false,
  featured: true
},
{
  id: 2,
  name: "Morgan Riley",
  age: 42,
  type: "Child Exploitation Material",
  difficulty: "Hard",
  tags: ["Repeat Offender", "Technical Knowledge", "Manipulation"],
  description: "Subject claims materials were downloaded accidentally through a file sharing network.",
  objectives: ["Assess technical knowledge", "Identify distribution patterns", "Establish intent"],
  thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHBvcnRyYWl0fGVufDB8fDB8fHww",
  completed: false,
  featured: true
},
{
  id: 3,
  name: "Jamie Bennett",
  age: 29,
  type: "Online Solicitation",
  difficulty: "Easy",
  tags: ["First-Time Offender", "Confession", "Cooperation"],
  description: "Subject initially denies knowledge but becomes cooperative during interview.",
  objectives: ["Build rapport", "Secure confession", "Identify potential victims"],
  thumbnail: "https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1hbGUlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
  completed: false,
  featured: true
},
{
  id: 4,
  name: "Taylor Quinn",
  age: 38,
  type: "Child Exploitation Material",
  difficulty: "Medium",
  tags: ["Sophistication", "Encrypted Evidence", "Denial"],
  description: "Subject uses encrypted storage and claims no knowledge of materials found on devices.",
  objectives: ["Address encryption issues", "Establish ownership of devices", "Identify access patterns"],
  thumbnail: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww",
  completed: false,
  featured: false
},
{
  id: 5,
  name: "Jordan Casey",
  age: 26,
  type: "Trafficking",
  difficulty: "Hard",
  tags: ["Multiple Victims", "Organization", "Deception"],
  description: "Subject is suspected of involvement in trafficking minors but denies all knowledge.",
  objectives: ["Establish timeline", "Identify co-conspirators", "Map victim relationships"],
  thumbnail: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
  completed: false,
  featured: false
}];


// Mock data for resources
const mockResources = [
{
  id: 1,
  title: "Interview Best Practices Guide",
  category: "Guide",
  description: "Comprehensive guide on best practices for conducting effective and trauma-informed interviews.",
  url: "#resources/1",
  icon: "fa-book"
},
{
  id: 2,
  title: "Detecting Deception in Interviews",
  category: "Video",
  description: "Training video on identifying verbal and non-verbal cues of deception during interviews.",
  url: "#resources/2",
  icon: "fa-video"
},
{
  id: 3,
  title: "Technical Evidence Collection Handbook",
  category: "Guide",
  description: "Guidelines for properly documenting and preserving digital evidence.",
  url: "#resources/3",
  icon: "fa-file-pdf"
},
{
  id: 4,
  title: "Trauma-Informed Interviewing Webinar",
  category: "Webinar",
  description: "Expert-led session on conducting interviews with a trauma-informed approach.",
  url: "#resources/4",
  icon: "fa-desktop"
},
{
  id: 5,
  title: "Legal Framework Reference",
  category: "Reference",
  description: "Quick reference guide to relevant laws and legal considerations.",
  url: "#resources/5",
  icon: "fa-gavel"
}];


// Mock evaluation criteria
const evaluationCriteria = [
{
  id: 1,
  name: "Rapport Building",
  description: "Effectiveness in establishing trust and open communication with the subject."
},
{
  id: 2,
  name: "Question Structure",
  description: "Use of appropriate question types and sequencing to elicit information."
},
{
  id: 3,
  name: "Active Listening",
  description: "Demonstration of attention to subject responses and appropriate follow-up."
},
{
  id: 4,
  name: "Evidence Integration",
  description: "Strategic use of available evidence during the interview process."
},
{
  id: 5,
  name: "Legal Compliance",
  description: "Adherence to legal requirements and proper procedure."
},
{
  id: 6,
  name: "Deception Detection",
  description: "Recognition of inconsistencies and deceptive behavior patterns."
}];


// Mock conversation responses (simplified AI simulation)
const mockResponses = {
  1: { // Scenario ID 1 (Alex Weber)
    greeting: "I don't understand why I'm here. I was just role-playing online.",
    deny: "I had no idea they were underage. Their profile said they were 18.",
    question_about_messages: "Those messages were just fantasy. I never intended to meet anyone.",
    question_about_intent: "Look, I might have said some things I shouldn't have, but it was just talk.",
    question_about_awareness: "How was I supposed to know? People lie online all the time."
  },
  2: { // Scenario ID 2 (Morgan Riley)
    greeting: "This is all a huge misunderstanding. I know nothing about those files.",
    deny: "I use file sharing for legitimate purposes. Sometimes random files get downloaded.",
    question_about_files: "I have thousands of files. I can't possibly check every single one.",
    question_about_technical: "Yes, I know how computers work. That's why I know these things happen accidentally.",
    question_about_patterns: "There's no pattern because I didn't download anything illegal intentionally."
  }
  // Additional scenarios would be added here
};

// Get all scenarios
async function getScenarios() {
  return withErrorHandling(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In a real app, this would be an API call
    return { success: true, data: mockScenarios };
  }, {
    showNotification: true,
    context: { entity: 'scenarios' }
  });
}

// Get featured scenarios
async function getFeaturedScenarios() {
  return withErrorHandling(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // In a real app, this would be an API call
    const featured = mockScenarios.filter((scenario) => scenario.featured);
    return { success: true, data: featured };
  }, {
    showNotification: true,
    context: { entity: 'featured scenarios' }
  });
}

// Get single scenario by ID
async function getScenarioById(id) {
  return withErrorHandling(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, this would be an API call
    const scenario = mockScenarios.find((s) => s.id === parseInt(id));

    if (!scenario) {
      throw new ResourceNotFoundError(`Scenario with ID ${id} not found`);
    }

    return { success: true, data: scenario };
  }, {
    showNotification: true,
    context: { entity: 'scenario', id }
  });
}

// Get resources
async function getResources() {
  return withErrorHandling(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    // In a real app, this would be an API call
    return { success: true, data: mockResources };
  }, {
    showNotification: true,
    context: { entity: 'resources' }
  });
}

// Get resource by ID
async function getResourceById(id) {
  return withErrorHandling(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    // In a real app, this would be an API call
    const resource = mockResources.find((r) => r.id === parseInt(id));

    if (!resource) {
      throw new ResourceNotFoundError(`Resource with ID ${id} not found`);
    }

    return { success: true, data: resource };
  }, {
    showNotification: true,
    context: { entity: 'resource', id }
  });
}

// Simulate chat response from AI
async function getAIResponse(scenarioId, userMessage) {
  return withRetry(async () => {
    // Always use API key instead of direct chat link
    return handleApiKeyResponse(scenarioId, userMessage);
  }, {
    maxRetries: 3,
    baseDelay: 1000,
    exponential: true,
    retryableErrors: ['NetworkError', 'ServerError', 'RateLimitError'],
    context: { entity: 'AI response', scenarioId }
  });
}

// Handle responses using the API key
async function handleApiKeyResponse(scenarioId, userMessage) {
  // Check for offline status first
  if (isOffline()) {
    throw new NetworkError('You appear to be offline. Please check your connection and try again.');
  }

  try {
    // First, check if the enhanced Grok API service is available
    if (typeof getEnhancedAIResponse === 'function') {
      console.log(`Using enhanced Grok API service for scenario ${scenarioId}`);

      // Get conversation history (in a real app, you would store this in state)
      // For now, we'll just pass an empty array
      const conversationHistory = [];

      // Use the enhanced service that makes real Grok API calls
      return await getEnhancedAIResponse(scenarioId, userMessage, null, conversationHistory);
    }

    // Fallback to the original implementation if enhanced service isn't available
    console.log(`Using fallback response generation for scenario ${scenarioId}`);

    // Get the stored API key
    const apiKey = localStorage.getItem('grok_api_key_backup');
    console.log(`API key detected of length: ${apiKey ? apiKey.length : 0}`);

    if (!apiKey) {
      throw new AuthenticationError('No API key found. Please add your API key in the settings.');
    }

    // Get scenario details to customize the response
    const scenario = await getScenarioById(scenarioId);
    if (!scenario.success) {
      throw new ResourceNotFoundError(`Scenario with ID ${scenarioId} not found`);
    }

    // Use the local fallback logic for generating responses
    const scenarioData = scenario.data;
    const messageLower = userMessage.toLowerCase();
    let response;

    // Generate a more sophisticated response since we're using the API key
    if (messageLower.includes('hello') || messageLower.includes('hi ') || messageLower.length < 10) {
      response = `I'm ${scenarioData.name}. I've been brought in for questioning about some ${scenarioData.type.toLowerCase()} allegations, but this is all a big mistake.`;
    } else if (messageLower.includes('why') || messageLower.includes('what happened')) {
      response = `Look, I honestly don't understand why I'm being accused. There's been a serious misunderstanding here.`;
    } else if (messageLower.includes('evidence') || messageLower.includes('proof')) {
      response = `What evidence could you possibly have? I haven't broken any laws. I feel like you're trying to trip me up or get me to say something incriminating.`;
    } else if (messageLower.includes('child') || messageLower.includes('minor') || messageLower.includes('young')) {
      response = `I had absolutely no idea they were underage. Their profile clearly stated they were an adult. I wouldn't have engaged otherwise.`;
    } else if (messageLower.includes('computer') || messageLower.includes('device') || messageLower.includes('phone')) {
      response = `That's my personal device and I consider that private. I'm not comfortable with anyone searching through my personal communications without proper legal authority.`;
    } else if (messageLower.includes('admit') || messageLower.includes('confess') || messageLower.includes('guilty')) {
      response = `I have nothing to confess to because I've done nothing wrong. This whole situation is being completely mischaracterized.`;
    } else if (messageLower.includes('lawyer') || messageLower.includes('attorney') || messageLower.includes('rights')) {
      response = `Maybe I should speak with a lawyer before answering any more questions. I know I have rights in this situation.`;
    } else {
      // Enhanced deflection responses using Grok API key capabilities
      const deflections = [
      `I don't believe I should answer that question right now.`,
      `I think I've been quite cooperative, but I'm not sure where this line of questioning is headed.`,
      `That's not at all what happened, and I'm concerned that you've already made up your mind about me.`,
      `You seem to be twisting my words into something I never intended.`,
      `I honestly don't recall anything like what you're describing.`,
      `I'm not sure why you're asking these particular questions or what you're implying.`,
      `This is clearly just a misunderstanding that's gotten completely out of hand.`,
      `I've always been a law-abiding citizen, and I resent these implications.`];

      const randomIndex = Math.floor(Math.random() * deflections.length);
      response = deflections[randomIndex];
    }

    return { success: true, data: { message: response } };
  } catch (error) {
    // Let the withRetry function handle the error
    throw parseApiError(error, { scenarioId, messageLength: userMessage.length });
  }
}

// This function is no longer needed as we always use the API key
// It's been left as a stub for compatibility
function checkForDirectChatLink() {
  return false; // Always return false to use API key
}

// This function is no longer needed as we always use the API key
// It's been left as a stub that calls handleApiKeyResponse for compatibility
async function handleDirectChatResponse(scenarioId, userMessage) {
  console.warn('Direct chat responses are deprecated, using API key response instead');
  return handleApiKeyResponse(scenarioId, userMessage);
}

// Submit interview for evaluation
async function submitForEvaluation(scenarioId, interviewData) {
  return withErrorHandling(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if we should simulate an error (randomly for testing)
    if (Math.random() < 0.05) {// 5% chance of error
      if (Math.random() < 0.5) {
        throw new ServerError('Evaluation service temporarily unavailable');
      } else {
        throw new RateLimitError('Too many evaluation requests', { retryAfter: 30 });
      }
    }

    // In a real app, this would be an AI evaluation
    // For now, generate mock feedback
    const evaluationResults = {};

    evaluationCriteria.forEach((criterion) => {
      // Generate a score between 60-95
      const score = Math.floor(Math.random() * 36) + 60;

      let feedback;
      if (score >= 90) {
        feedback = `Excellent performance in ${criterion.name.toLowerCase()}.`;
      } else if (score >= 80) {
        feedback = `Good performance in ${criterion.name.toLowerCase()}, with room for improvement.`;
      } else if (score >= 70) {
        feedback = `Adequate performance in ${criterion.name.toLowerCase()}, but needs significant improvement.`;
      } else {
        feedback = `Needs improvement in ${criterion.name.toLowerCase()}.`;
      }

      evaluationResults[criterion.id] = {
        score,
        feedback,
        criterionName: criterion.name
      };
    });

    // Calculate overall score
    const overallScore = Math.round(
      Object.values(evaluationResults).reduce((sum, item) => sum + item.score, 0) /
      Object.values(evaluationResults).length
    );

    return {
      success: true,
      data: {
        evaluationResults,
        overallScore,
        timestamp: new Date().toISOString(),
        scenarioId
      }
    };
  }, {
    showNotification: true,
    context: { entity: 'evaluation', scenarioId }
  });
}

// Export PDF report (mock function)
async function exportPDFReport(evaluationData) {
  return withTimeout(async () => {
    // In a real app, this would generate a PDF
    console.log('Exporting PDF with data:', evaluationData);

    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Success message
    return { success: true, message: 'PDF report generated and downloaded successfully' };
  }, 15000); // 15 second timeout for PDF generation
}

// Fetch suspects from external API
async function fetchSuspectsFromAPI() {
  return withErrorHandling(async () => {
    try {
      const response = await fetch('https://v0-zaplabs.vercel.app/api/suspects');

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching suspects from API:', error);
      throw error;
    }
  }, {
    showNotification: true,
    context: { entity: 'external suspects API' }
  });
}