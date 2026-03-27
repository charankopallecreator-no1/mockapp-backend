# Educational Platform

This is a full-stack educational platform for JEE Mains, JEE Advanced, and NEET preparation.

## Setup

1. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend Web: `cd frontend/web && npm install`

2. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.

3. Run the application:
   - Backend: `cd backend && npm start`
   - Frontend: `cd frontend/web && npm start`

## Production Deployment

- Build the frontend: `cd frontend/web && npm run build`
- Deploy backend to a server (e.g., Heroku, AWS)
- Serve frontend build files statically

## Features

- User authentication
- Mock tests
- AI-powered question generation
- Progress tracking
- PWA support for mobile devices

## Device Compatibility

The app is designed to work on all devices:
- Desktop: Full web experience
- Mobile: PWA installable, responsive design
- Tablet: Optimized layout

## Testing

Run tests with:
- Backend: `npm test`
- Frontend: `npm test`