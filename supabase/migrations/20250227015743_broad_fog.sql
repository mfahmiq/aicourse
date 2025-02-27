/*
  # Create study materials table

  1. New Tables
    - `study_materials`
      - `id` (uuid, primary key)
      - `user_id` (text, foreign key to users.id)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `type` (text) - exam, job-interview, practice, coding-prep, other
      - `method` (text) - gemini, pdf, web-link
      - `difficulty` (text) - beginner, intermediate, advanced
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `study_materials` table
    - Add policies for authenticated users to manage their own study materials
*/

CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text REFERENCES users(id) NOT NULL,
  title text NOT NULL,
  description text,
  content text,
  type text NOT NULL,
  method text NOT NULL,
  difficulty text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own study materials
CREATE POLICY "Users can read own study materials"
  ON study_materials
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own study materials
CREATE POLICY "Users can insert own study materials"
  ON study_materials
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own study materials
CREATE POLICY "Users can update own study materials"
  ON study_materials
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for users to delete their own study materials
CREATE POLICY "Users can delete own study materials"
  ON study_materials
  FOR DELETE
  USING (auth.uid() = user_id);