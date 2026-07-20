# Live Notifications API

A REST + real-time API for user notifications built with
Node.js, Express.js, MongoDB and Socket.io.

## Features
- Real-time notification delivery via Socket.io
- Notification history stored in MongoDB
- Mark notifications as read
- Unread count endpoint
- Helmet, CORS, rate limiting, request logging

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT
- bcryptjs
- Helmet, CORS, Morgan, express-rate-limit
- Joi
- dotenv

## How to Run
```
npm install
npm run dev
```

## API Endpoints
- POST   /auth/register              - Register a user
- POST   /auth/login                 - Login a user
- GET    /notifications              - Get your notifications (protected)
- PATCH  /notifications/:id/read     - Mark as read (protected)
- GET    /notifications/unread-count - Get unread count (protected)

## Socket Events
- sendNotification  - emit to send a notification to a user
- newNotification   - listen to receive notifications in real-time