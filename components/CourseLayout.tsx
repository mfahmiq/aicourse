import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CourseLayoutProps {
  content: string;
  title: string;
  difficulty: string;
  duration: string;
  chaptersCount: number;
  hasVideo: boolean;
}

export function CourseLayout({ content, title, difficulty, duration, chaptersCount, hasVideo }: CourseLayoutProps) {
  const [chapters, setChapters] = useState(() => {
    // Parse content dari Gemini dan convert ke format chapter
    try {
      const parsedContent = JSON.parse(content);
      return parsedContent.chapters || [];
    } catch {
      // Jika format tidak sesuai, buat chapter kosong
      return Array(chaptersCount).fill({
        title: '',
        description: '',
        duration: ''
      });
    }
  });

  const [editingChapter, setEditingChapter] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Difficulty: {difficulty}</span>
          <span>Duration: {duration}</span>
          <span>Chapters: {chaptersCount}</span>
          <span>Video: {hasVideo ? 'Yes' : 'No'}</span>
        </div>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter: any, index: number) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{chapter.title || `Chapter ${index + 1}`}</h3>
                <p className="text-sm text-gray-600">{chapter.description}</p>
                <span className="text-sm text-gray-500">{chapter.duration}</span>
              </div>
              <Button variant="outline" onClick={() => {
                setEditingChapter({ ...chapter, index });
                setIsDialogOpen(true);
              }}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
          </DialogHeader>
          {editingChapter && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={editingChapter.title}
                  onChange={(e) => setEditingChapter({
                    ...editingChapter,
                    title: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingChapter.description}
                  onChange={(e) => setEditingChapter({
                    ...editingChapter,
                    description: e.target.value
                  })}
                />
              </div>
              <Button onClick={() => {
                const newChapters = [...chapters];
                newChapters[editingChapter.index] = editingChapter;
                setChapters(newChapters);
                setIsDialogOpen(false);
              }}>
                Update
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 