/**
 * Jest test setup file
 * This file runs before all tests
 */

// Add custom matchers if needed
// Example: import '@testing-library/jest-dom/extend-expect';

// Setup global test configuration
beforeAll(() => {
  // Global setup before all tests
});

afterAll(() => {
  // Global cleanup after all tests
});

beforeEach(() => {
  // Setup before each test
});

afterEach(() => {
  // Cleanup after each test
});

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.PORT = '5000';
process.env.CACHE_TTL = '300';
