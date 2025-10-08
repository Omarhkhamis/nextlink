import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  image: string;
  created_at: string;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  icon: string;
  created_at: string;
};

export type TeamMember = {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  created_at: string;
};
