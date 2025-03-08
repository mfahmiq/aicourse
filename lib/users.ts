import { auth } from '@clerk/nextjs';
import { supabase } from './supabase';

export type User = {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  credits: number;
  credits_used: number;
  created_at: string;
  updated_at: string;
};

export async function createOrUpdateUser(userData: {
  user_id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  credits?: number;
  credits_used?: number;
}) {
  const { data, error } = await supabase
    .from('users')
    .upsert({
      user_id: userData.user_id,
      email: userData.email,
      full_name: userData.full_name,
      avatar_url: userData.avatar_url,
      credits: userData.credits || 5,
      credits_used: userData.credits_used || 0,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error upserting user:', error);
    throw error;
  }

  return data as User;
}

export async function getUser() {
  const { userId } = auth();
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    throw error;
  }

  return data as User;
}

export async function updateUserCredits(credits: number) {
  const { userId } = auth();
  if (!userId) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('users')
    .update({ credits })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user credits:', error);
    throw error;
  }

  return data as User;
}

export async function ensureUserExists() {
  const { userId } = auth();
  if (!userId) throw new Error('Not authenticated');

  try {
    // Coba dapatkan user yang ada
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (selectError) {
      console.error('Error checking existing user:', selectError);
    }

    if (existingUser) {
      return existingUser as User;
    }

    // Jika user tidak ditemukan, coba buat baru dengan insert
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        user_id: userId,
        email: 'pending@example.com',
        credits: 5,
        credits_used: 0
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting new user:', insertError);
      
      // Jika insert gagal, coba dengan upsert
      const { data: upsertUser, error: upsertError } = await supabase
        .from('users')
        .upsert({
          user_id: userId,
          email: 'pending@example.com',
          credits: 5,
          credits_used: 0
        })
        .select()
        .single();

      if (upsertError) {
        console.error('Error upserting user:', upsertError);
        throw new Error(`Failed to create user: ${upsertError.message}`);
      }

      return upsertUser as User;
    }

    return newUser as User;
  } catch (error) {
    console.error('Error in ensureUserExists:', error);
    
    // Coba satu kali lagi dengan delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { data: retryUser, error: retryError } = await supabase
        .from('users')
        .upsert({
          user_id: userId,
          email: 'pending@example.com',
          credits: 5,
          credits_used: 0
        })
        .select()
        .single();

      if (retryError) {
        console.error('Retry error:', retryError);
        throw retryError;
      }

      return retryUser as User;
    } catch (retryError) {
      console.error('Final error:', retryError);
      throw new Error('Failed to ensure user exists after retry');
    }
  }
} 