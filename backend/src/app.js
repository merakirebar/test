// ============================================
// app.js - Express application setup
// ============================================
// This file configures Express with middleware,
// routes, and error handling.
// ============================================

// Load environment variables from .env file
const dotenv = require('dotenv');

// Load the correct .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

dotenv.config({ path: envFile });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');

// Create Express app
const app = express();

// ---- MIDDLEWARE ----

// Enable CORS (allows frontend to call backend)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// HTTP request logging (shows requests in console)
app.use(morgan('dev'));

// ---- ROUTES ----

// Health check endpoint (useful for Docker & monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Task API routes (mounted at /api/tasks)
app.use('/api/tasks', taskRoutes);

// ---- ERROR HANDLING ----

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
