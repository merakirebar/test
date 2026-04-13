// ============================================
// TaskForm.jsx - Form to add new tasks
// ============================================
// A simple input + button form that lets
// users type a task title and submit it.
// ============================================

import { useState } from 'react';

function TaskForm({ onAddTask }) {
  // State to hold the input value
  const [title, setTitle] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Don't submit empty tasks
    if (title.trim() === '') return;

    // Call the parent's add function
    onAddTask(title);

    // Clear the input field
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
