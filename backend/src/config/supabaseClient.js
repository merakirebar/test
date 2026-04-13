// ============================================
// supabaseClient.js - Supabase connection
// ============================================
// This file creates and exports a Supabase
// client using environment variables.
// ============================================

const { createClient } = require('@supabase/supabase-js');

// Read Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validate that credentials exist
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
  console.error('   Please check your .env file');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase client initialized');

module.exports = supabase;
