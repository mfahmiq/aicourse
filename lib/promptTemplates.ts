export const STUDY_TEMPLATES = {
  EXAM: `Buatlah materi persiapan ujian untuk {nama_topik}. Materi ini harus mencakup konsep utama, ringkasan teori, contoh soal, dan latihan dengan jawaban. Sesuaikan dengan tingkat kesulitan {level_kesulitan} dan cakupan materi {durasi_course}. Gunakan format yang mudah dipahami dan relevan dengan ujian akademik atau sertifikasi.`,
  
  JOB_INTERVIEW: `Buatlah panduan persiapan wawancara kerja untuk {nama_topik}. Sertakan pertanyaan umum dan teknis yang sering muncul, contoh jawaban yang baik, serta tips tambahan agar kandidat lebih siap. Materi harus sesuai dengan industri {bidang_pekerjaan} dan posisi {posisi_pekerjaan}.`,
  
  PRACTICE: `Buatlah modul latihan interaktif untuk {nama_topik}. Materi harus mencakup ringkasan konsep, latihan soal bertingkat dari mudah hingga sulit, serta solusi yang dijelaskan secara rinci. Format pembelajaran harus mendorong pemahaman yang lebih mendalam melalui latihan praktis.`,
  
  CODING_PREP: `Buatlah materi persiapan koding untuk {nama_topik}. Sertakan penjelasan konsep, contoh kode, dan latihan soal coding dengan tingkat kesulitan {level_kesulitan}. Tambahkan pembahasan solusi serta tips best practice dalam pemrograman untuk membantu pemahaman yang lebih baik.`,
  
  OTHER: `Buatlah materi course tentang {nama_topik} dengan fokus pada {tujuan_pengguna}. Pastikan materi terstruktur dengan baik, mencakup teori, contoh praktis, dan sumber tambahan yang relevan agar pembelajaran lebih efektif.`
}

export function generatePrompt(
  template: keyof typeof STUDY_TEMPLATES,
  params: Record<string, string>
): string {
  let prompt = STUDY_TEMPLATES[template];
  
  Object.entries(params).forEach(([key, value]) => {
    prompt = prompt.replace(`{${key}}`, value);
  });
  
  return prompt;
} 