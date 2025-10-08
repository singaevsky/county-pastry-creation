import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://puzwiigbxjnxuqpudazh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1endpaWdieGpueHVxcHVkYXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0Mjk1MTEsImV4cCI6MjA2MzAwNTUxMX0.GuLca5JQUqHPgK7q6Z0LjRpXma4fBYNfQULfrRZVnV0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
