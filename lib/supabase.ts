import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

export type StudyMaterial = {
  id: string;
  title: string;
  topic: string;
  type: string;
  difficulty: string;
  content: string;
  user_id: string;
  method: string;
  created_at: string;
  updated_at: string;
};