// ZAP Labs - Backend Server
// This server proxies requests to the Grok API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin: ['https://002-11097-7yupcizgxdrb-preview.ezsite.ai', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

// Explicitly handle OPTIONS requests for /api/grok
app.options('/api/grok', (req, res) => {
  console.log('Handling OPTIONS request for /api/grok');
  res.status(200).end();
});

// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Validate API key middleware
const validateApiKey = (req, res, next) => {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'Server configuration error: API key not configured'
    });
  }
  next();
};

// Rate limiting middleware
const requestCounts = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }
  requestCounts[ip] = requestCounts[ip].filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);
  if (requestCounts[ip].length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please try again later.'
    });
  }
  requestCounts[ip].push(now);
  next();
};

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ZAP Labs API server is running' });
});

// Grok API proxy endpoint
app.post('/api/grok', validateApiKey, rateLimiter, async (req, res) => {
  try {
    const { prompt, options = {} } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    // Default parameters
    const requestOptions = {
      model: options.model || 'grok-beta',
      max_tokens: options.max_tokens || 500,
      temperature: options.temperature || 0.7
    };

    console.log(`Processing POST request to /api/grok with ${prompt.length} characters`);

    // Retry logic for rate limiting
    const MAX_RETRIES = 3;
    let grokResponse, data;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      grokResponse = await fetch('https://api.grok.xai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: requestOptions.model,
          prompt: prompt,
          max_tokens: requestOptions.max_tokens,
          temperature: requestOptions.temperature
        })
      });

      data = await grokResponse.json();

      if (grokResponse.status === 429 && attempt < MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
        console.log(`Rate limit hit, retrying after ${delay}ms (attempt ${attempt}/${MAX_RETRIES})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      break;
    }

    // Check for errors in the Grok API response
    if (!grokResponse.ok) {
      console.error('Grok API error:', data);
      return res.status(grokResponse.status).json({
        success: false,
        error: data.error?.message || 'Error from Grok API'
      });
    }

    // Extract the response content
    const responseContent = data.choices[0]?.text;

    if (!responseContent) {
      return res.status(500).json({
        success: false,
        error: 'Empty response from Grok API'
      });
    }

    // Return successful response
    return res.status(200).json({
      success: true,
      data: responseContent
    });

  } catch (error) {
    console.error('Server error in /api/grok:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`ZAP Labs API server running on port ${PORT}`);
});