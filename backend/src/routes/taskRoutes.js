// ============================================
// taskRoutes.js - Routes for task endpoints
// ============================================
// This file defines the URL routes and maps
// them to controller functions.
// ============================================

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /api/tasks → Fetch all tasks
router.get('/', taskController.getAllTasks);

// POST /api/tasks → Create a new task
router.post('/', taskController.createTask);

// DELETE /api/tasks/:id → Delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
