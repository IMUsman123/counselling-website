-- Career Guidance App Database Setup
-- Run this script in your Supabase SQL editor

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_match TEXT NOT NULL,
  score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at);

-- Enable Row Level Security
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can insert own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can update own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can delete own quiz results" ON quiz_results;

-- Create policy for users to view their own results
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy for users to insert their own results
CREATE POLICY "Users can insert own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own results
CREATE POLICY "Users can update own quiz results" ON quiz_results
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy for users to delete their own results
CREATE POLICY "Users can delete own quiz results" ON quiz_results
  FOR DELETE USING (auth.uid() = user_id);

-- Create a view for career statistics (optional)
CREATE OR REPLACE VIEW career_stats AS
SELECT 
  career_match,
  COUNT(*) as total_users,
  AVG(score) as average_score,
  MIN(score) as min_score,
  MAX(score) as max_score
FROM quiz_results
GROUP BY career_match
ORDER BY total_users DESC;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON quiz_results TO anon, authenticated;
GRANT ALL ON career_stats TO anon, authenticated;

-- Insert sample data for testing (optional)
-- Uncomment the following lines if you want to add sample data
/*
INSERT INTO quiz_results (user_id, career_match, score, answers) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Software Engineer', 15, '[0, 0, 0, 0, 0]'),
  ('00000000-0000-0000-0000-000000000002', 'Data Scientist', 14, '[0, 0, 0, 0, 0]'),
  ('00000000-0000-0000-0000-000000000003', 'Marketing Manager', 13, '[1, 1, 1, 1, 1]');
*/

-- Verify the setup
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'quiz_results';

SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'quiz_results';
