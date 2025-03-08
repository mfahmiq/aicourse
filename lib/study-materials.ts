import { auth } from '@clerk/nextjs';
import { supabase } from './supabase';
import { ensureUserExists } from './users';
import type { StudyMaterial } from './supabase';

export async function getStudyMaterials() {
  const { userId } = auth();
  await ensureUserExists();
  
  const { data: materials, error } = await supabase
    .from('study_materials')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching study materials:', error);
    throw error;
  }

  return materials as StudyMaterial[];
}

export async function createStudyMaterial(materialData: Partial<StudyMaterial>) {
  const { userId } = auth();
  await ensureUserExists();
  
  const { data, error } = await supabase
    .from('study_materials')
    .insert([
      {
        ...materialData,
        user_id: userId,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating study material:', error);
    throw error;
  }

  return data as StudyMaterial;
}

export async function updateStudyMaterial(materialId: string, materialData: Partial<StudyMaterial>) {
  const { userId } = auth();
  
  const { data, error } = await supabase
    .from('study_materials')
    .update(materialData)
    .eq('id', materialId)
    .eq('user_id', userId) // Memastikan user hanya bisa update material miliknya
    .select()
    .single();

  if (error) {
    console.error('Error updating study material:', error);
    throw error;
  }

  return data as StudyMaterial;
}

export async function deleteStudyMaterial(materialId: string) {
  const { userId } = auth();
  
  const { error } = await supabase
    .from('study_materials')
    .delete()
    .match({ 
      id: materialId,
      user_id: userId  // Memastikan user hanya bisa hapus material miliknya
    });

  if (error) {
    console.error('Error deleting study material:', error);
    throw error;
  }
} 