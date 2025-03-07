"use client"

export interface LocalStudyMaterial {
  id: string;
  userId: string;
  title: string;
  topic: string;
  type: string;
  difficulty: string;
  content: string;
  createdAt: string;
  method?: "gemini" | "manual";
}

export function saveToLocalStorage(material: Omit<LocalStudyMaterial, 'id' | 'createdAt'>) {
  // Pastikan kode dijalankan di browser
  if (typeof window === 'undefined') return null;
  
  try {
    // Get existing materials
    const existingMaterials = getFromLocalStorage();
    
    // Create new material with ID and timestamp
    const newMaterial = {
      ...material,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    // Add to existing materials
    existingMaterials.push(newMaterial);
    
    // Save to localStorage
    localStorage.setItem('study_materials', JSON.stringify(existingMaterials));
    
    console.log('\n💾 Saved to localStorage:');
    console.log('----------------------------------------');
    console.log(JSON.stringify(newMaterial, null, 2));
    console.log('----------------------------------------\n');
    
    return newMaterial;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    throw error;
  }
}

export function getFromLocalStorage(): LocalStudyMaterial[] {
  // Pastikan kode dijalankan di browser
  if (typeof window === 'undefined') return [];
  
  try {
    const items = localStorage.getItem('study_materials');
    return items ? JSON.parse(items) : [];
  } catch {
    return [];
  }
} 