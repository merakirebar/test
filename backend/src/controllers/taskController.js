// ============================================
// taskController.js - Request/Response logic
// ============================================
// Controllers handle HTTP requests and send
// responses. They call services for business
// logic and database operations.
// ============================================

const taskService = require('../services/taskService');

// GET /api/tasks - Fetch all tasks
const getAllTasks = async (req, res) => {
  try {
    console.log('📋 Fetching all tasks...');
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('❌ Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// POST /api/tasks - Create a new task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    // Validate input
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }

    console.log(`✏️ Creating task: "${title}"`);
    const newTask = await taskService.createTask(title.trim());
    res.status(201).json(newTask);
  } catch (error) {
    console.error('❌ Error creating task:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// DELETE /api/tasks/:id - Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`🗑️ Deleting task: ${id}`);
    await taskService.deleteTask(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting task:', error.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
};
