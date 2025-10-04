"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  StickyNote, 
  Save, 
  Edit, 
  Trash2, 
  Plus,
  Clock,
  User
} from "lucide-react";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesSectionProps {
  type: 'lab' | 'deep-dive' | 'cheatsheet';
  ref?: string;
  title: string;
}

export default function NotesSection({ type, ref, title }: NotesSectionProps) {
  const { isSignedIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchNotes();
    }
  }, [isSignedIn, type, ref]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notes/fetch?type=${type}&ref=${ref}`);
      const data = await response.json();
      
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save notes.",
        variant: "destructive",
      });
      router.push('/sign-in');
      return;
    }

    if (!newNote.trim()) {
      toast({
        title: "Empty Note",
        description: "Please enter some content for your note.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/api/notes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          ref,
          content: newNote.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewNote("");
        await fetchNotes();
        toast({
          title: "Note Saved",
          description: "Your note has been saved successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to save note.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to save note:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const handleUpdateNote = async (noteId: string) => {
    if (!editContent.trim()) {
      toast({
        title: "Empty Note",
        description: "Please enter some content for your note.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/api/notes/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteId,
          content: editContent.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setEditingNote(null);
        setEditContent("");
        await fetchNotes();
        toast({
          title: "Note Updated",
          description: "Your note has been updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update note.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to update note:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/api/notes/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchNotes();
        toast({
          title: "Note Deleted",
          description: "Your note has been deleted successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete note.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab': return 'Lab';
      case 'deep-dive': return 'Deep Dive';
      case 'cheatsheet': return 'Cheatsheet';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab': return '🧪';
      case 'deep-dive': return '📚';
      case 'cheatsheet': return '📋';
      default: return '📝';
    }
  };

  if (!isSignedIn) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            My Notes
          </CardTitle>
          <CardDescription>
            Sign in to take notes on this {getTypeLabel(type).toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <a href="/sign-in">Sign In to Take Notes</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5" />
          My Notes
        </CardTitle>
        <CardDescription>
          Take notes on this {getTypeLabel(type).toLowerCase()}: {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Note */}
        <div className="space-y-4">
          <Textarea
            placeholder={`Add your notes about this ${getTypeLabel(type).toLowerCase()}...`}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveNote}
              disabled={saving || !newNote.trim()}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Note'}
            </Button>
          </div>
        </div>

        {/* Existing Notes */}
        {loading ? (
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">Loading notes...</div>
          </div>
        ) : notes.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
            </div>
            
            {notes.map((note) => (
              <Card key={note.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  {editingNote === note.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingNote(null);
                            setEditContent("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateNote(note.id)}
                          disabled={saving}
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {note.content}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(note.updatedAt).toLocaleDateString()} at{' '}
                            {new Date(note.updatedAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNote(note)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNote(note.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <StickyNote className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-2">No notes yet</p>
            <p className="text-xs text-gray-400">
              Add your first note above to get started
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
