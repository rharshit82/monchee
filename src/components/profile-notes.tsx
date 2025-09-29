"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  StickyNote, 
  ExternalLink,
  Clock,
  FileText,
  BookOpen,
  FlaskConical
} from "lucide-react";
import Link from "next/link";

interface Note {
  id: string;
  type: string;
  ref: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileNotesProps {
  userId: string;
}

export default function ProfileNotes({ userId }: ProfileNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupedNotes, setGroupedNotes] = useState<Record<string, Note[]>>({});

  useEffect(() => {
    fetchUserNotes();
  }, [userId]);

  const fetchUserNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notes/user/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setNotes(data.notes);
        groupNotesByType(data.notes);
      }
    } catch (error) {
      console.error('Failed to fetch user notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupNotesByType = (notes: Note[]) => {
    const grouped = notes.reduce((acc, note) => {
      if (!acc[note.type]) {
        acc[note.type] = [];
      }
      acc[note.type].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    setGroupedNotes(grouped);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab': return 'Labs';
      case 'deep-dive': return 'Deep Dives';
      case 'cheatsheet': return 'Cheatsheets';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab': return <FlaskConical className="h-4 w-4 text-green-500" />;
      case 'deep-dive': return <BookOpen className="h-4 w-4 text-purple-500" />;
      case 'cheatsheet': return <FileText className="h-4 w-4 text-orange-500" />;
      default: return <StickyNote className="h-4 w-4 text-gray-500" />;
    }
  };

  const getContentPath = (type: string, ref: string) => {
    switch (type) {
      case 'lab': return `/labs/${ref}`;
      case 'deep-dive': return `/deep-dives/${ref}`;
      case 'cheatsheet': return `/cheatsheets/${ref}`;
      default: return '/';
    }
  };

  const getContentTitle = (type: string, ref: string) => {
    // In a real app, you'd fetch the actual title from the content
    switch (type) {
      case 'lab': return ref.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      case 'deep-dive': return ref.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      case 'cheatsheet': return ref.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      default: return ref;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            My Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">Loading notes...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (notes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            My Notes
          </CardTitle>
          <CardDescription>
            Notes you take on labs, deep dives, and cheatsheets will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <StickyNote className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-2">No notes yet</p>
            <p className="text-xs text-gray-400">
              Start taking notes on content to see them here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5" />
          My Notes
        </CardTitle>
        <CardDescription>
          {notes.length} note{notes.length !== 1 ? 's' : ''} across {Object.keys(groupedNotes).length} content type{Object.keys(groupedNotes).length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedNotes).map(([type, typeNotes]) => (
          <div key={type} className="space-y-3">
            <div className="flex items-center gap-2">
              {getTypeIcon(type)}
              <h4 className="font-medium text-sm text-gray-700">
                {getTypeLabel(type)} ({typeNotes.length})
              </h4>
            </div>
            
            <div className="space-y-2">
              {typeNotes.map((note) => (
                <Card key={note.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm text-gray-900 truncate">
                            {getContentTitle(type, note.ref)}
                          </h5>
                          <p className="text-xs text-gray-500 mt-1">
                            {note.content.length > 100 
                              ? `${note.content.substring(0, 100)}...` 
                              : note.content
                            }
                          </p>
                        </div>
                        <Link href={getContentPath(type, note.ref)}>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(note.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
