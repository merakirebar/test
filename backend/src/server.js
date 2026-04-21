// ============================================
// server.js - Entry point for the backend
// ============================================
// This file starts the Express server and
// loads environment variables.
// ============================================

const app = require('./app');

// Port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
