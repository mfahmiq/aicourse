import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs';

export const createSupabaseClient = async () => {
  const { getToken } = auth();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${await getToken({ template: 'supabase' })}`,
      },
    },
    auth: {
      persistSession: false,
    },
  });

  return supabase;
};
