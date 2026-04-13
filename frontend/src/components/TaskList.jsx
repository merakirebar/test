// ============================================
// TaskList.jsx - Display list of tasks
// ============================================
// Renders each task with a delete button.
// Shows a friendly message when empty.
// ============================================

function TaskList({ tasks, onDeleteTask }) {
  // Show message if no tasks exist
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet. Add one above! ✨</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <div>
            <p className="task-title">{task.title}</p>
            <p className="task-date">
              {new Date(task.created_at).toLocaleDateString()}
            </p>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDeleteTask(task.id)}
            title="Delete task"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
