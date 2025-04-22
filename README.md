# ZAP Labs Backend Server

This is the backend server for the ZAP Labs AI-Powered Interview Training Platform. It proxies requests to the Grok API to ensure secure handling of API keys and proper rate limiting.

## Setup and Deployment

### Prerequisites
- Node.js 14+
- Grok API key

### Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Grok API key
4. Start the development server:
   ```
   npm run dev
   ```

### Deploying to Vercel

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy:
   ```
   vercel
   ```

4. Add environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" section
   - Add `GROK_API_KEY` with your Grok API key

5. For production deployment:
   ```
   vercel --prod
   ```

### Deploying to Heroku

1. Install the Heroku CLI and login:
   ```
   npm install -g heroku
   heroku login
   ```

2. Create a new Heroku app:
   ```
   heroku create zap-labs-backend
   ```

3. Set your environment variables:
   ```
   heroku config:set GROK_API_KEY=your_grok_api_key_here
   ```

4. Deploy:
   ```
   git push heroku main
   ```

## API Endpoints

### Health Check
- `GET /`
  - Response: `{ status: 'ok', message: 'ZAP Labs API server is running' }`

### Grok API Proxy
- `POST /api/grok`
  - Request body:
    ```json
    {
      "prompt": "Your prompt text here",
      "options": {
        "model": "grok-beta",
        "max_tokens": 500,
        "temperature": 0.7
      }
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": "Response from Grok API"
    }
    ```

## Security Features

- CORS protection
- Rate limiting (60 requests per minute)
- Automatic retry logic with exponential backoff for rate-limited requests
- Security headers
- Environment variable protection for API keys