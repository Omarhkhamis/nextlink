/*
  # Create Projects, Services, and Team Tables

  1. New Tables
    - `projects`
      - `id` (int8, primary key, auto increment)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `category` (text)
      - `image` (text)
      - `created_at` (timestamp with timezone, default now())
    
    - `services`
      - `id` (int8, primary key, auto increment)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `created_at` (timestamp with timezone, default now())
    
    - `team_members`
      - `id` (int8, primary key, auto increment)
      - `name` (text)
      - `position` (text)
      - `image` (text)
      - `bio` (text)
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access for write operations
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert to projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update to projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete to projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to services"
  ON services
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert to services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update to services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete to services"
  ON services
  FOR DELETE
  TO authenticated
  USING (true);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  position text NOT NULL,
  image text NOT NULL,
  bio text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to team_members"
  ON team_members
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert to team_members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update to team_members"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete to team_members"
  ON team_members
  FOR DELETE
  TO authenticated
  USING (true);
