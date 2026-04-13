// ============================================
// App.jsx - Main application component
// ============================================
// This is the root component that combines
// the task form and task list.
// ============================================

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, deleteTask } from './services/api';
import './App.css';

function App() {
  // State to hold array of tasks
  const [tasks, setTasks] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch all tasks from the API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Is the backend running?');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new task
  const handleAddTask = async (title) => {
    try {
      setError(null);
      const newTask = await createTask(title);
      // Add the new task to the top of the list
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to add task.');
      console.error('Error adding task:', err);
    }
  };

  // Function to delete a task
  const handleDeleteTask = async (id) => {
    try {
      setError(null);
      await deleteTask(id);
      // Remove the deleted task from the list
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p className="subtitle">A simple app for DevOps practice</p>
      </header>

      <main className="app-main">
        {/* Form to add new tasks */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Show error if any */}
        {error && <p className="error-message">⚠️ {error}</p>}

        {/* Show loading or task list */}
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
        )}
      </main>

      <footer className="app-footer">
        <p>Built for DevOps learning 🚀</p>
      </footer>
    </div>
  );
}

export default App;
