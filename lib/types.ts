export type User = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string | null;
};

export type StudyMaterial = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  content: string | null;
  type: 'exam' | 'job-interview' | 'practice' | 'coding-prep' | 'other';
  method: 'gemini' | 'pdf' | 'web-link';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string | null;
};