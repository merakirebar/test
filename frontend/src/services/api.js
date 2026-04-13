// ============================================
// api.js - API service for backend calls
// ============================================
// Centralized API calls using axios.
// Uses environment variable for the API URL.
// ============================================

import axios from 'axios';

// Get the API URL from environment variables
// Vite exposes env vars with the VITE_ prefix
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Fetch all tasks
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

// Create a new task
export const createTask = async (title) => {
  const response = await api.post('/tasks', { title });
  return response.data;
};

// Delete a task by ID
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
