// ============================================
// taskService.js - Business logic & DB calls
// ============================================
// Services contain the core logic and interact
// with the database. Controllers call services.
// ============================================

const supabase = require('../config/supabaseClient');

// Fetch all tasks from Supabase, ordered by newest first
const getAllTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Create a new task in Supabase
const createTask = async (title) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title }])
    .select()     // Return the inserted row
    .single();    // Expect a single row back

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete a task by ID from Supabase
const deleteTask = async (id) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
};
