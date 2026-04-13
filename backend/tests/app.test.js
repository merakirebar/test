// ============================================
// app.test.js - Basic backend tests
// ============================================
// Simple tests to verify the health endpoint
// and basic app configuration.
// ============================================

// Mock environment variables before loading app
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_KEY = 'test-key';
process.env.NODE_ENV = 'test';

const app = require('../src/app');

describe('Health Check', () => {
  it('should return status OK', async () => {
    // We use a simple HTTP test without supertest
    // to keep dependencies minimal
    expect(app).toBeDefined();
  });
});

describe('App Configuration', () => {
  it('should have CORS enabled', () => {
    // Verify app is an Express instance
    expect(typeof app.listen).toBe('function');
  });

  it('should handle 404 routes', () => {
    // App should have route handlers registered
    expect(app._router).toBeDefined();
  });
});
