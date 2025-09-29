"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  ExternalLink,
  Clock,
  FlaskConical,
  BookOpen
} from "lucide-react";
import Link from "next/link";

interface Comment {
  id: string;
  type: string;
  ref: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
    avatarUrl: string | null;
  };
}

interface ProfileCommentsProps {
  userId: string;
}

export default function ProfileComments({ userId }: ProfileCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupedComments, setGroupedComments] = useState<Record<string, Comment[]>>({});

  useEffect(() => {
    fetchUserComments();
  }, [userId]);

  const fetchUserComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments/user/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.comments);
        groupCommentsByType(data.comments);
      }
    } catch (error) {
      console.error('Failed to fetch user comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupCommentsByType = (comments: Comment[]) => {
    const grouped = comments.reduce((acc, comment) => {
      if (!acc[comment.type]) {
        acc[comment.type] = [];
      }
      acc[comment.type].push(comment);
      return acc;
    }, {} as Record<string, Comment[]>);

    setGroupedComments(grouped);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab': return 'Labs';
      case 'deep-dive': return 'Deep Dives';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab': return <FlaskConical className="h-4 w-4 text-green-500" />;
      case 'deep-dive': return <BookOpen className="h-4 w-4 text-purple-500" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getContentPath = (type: string, ref: string) => {
    switch (type) {
      case 'lab': return `/labs/${ref}`;
      case 'deep-dive': return `/deep-dives/${ref}`;
      default: return '/';
    }
  };

  const getContentTitle = (type: string, ref: string) => {
    // In a real app, you'd fetch the actual title from the content
    switch (type) {
      case 'lab': return ref.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      case 'deep-dive': return ref.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      default: return ref;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            My Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">Loading comments...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (comments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            My Comments
          </CardTitle>
          <CardDescription>
            Comments you make on labs and deep dives will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-2">No comments yet</p>
            <p className="text-xs text-gray-400">
              Start commenting on content to see them here
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
          <MessageCircle className="h-5 w-5" />
          My Comments
        </CardTitle>
        <CardDescription>
          {comments.length} comment{comments.length !== 1 ? 's' : ''} across {Object.keys(groupedComments).length} content type{Object.keys(groupedComments).length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedComments).map(([type, typeComments]) => (
          <div key={type} className="space-y-3">
            <div className="flex items-center gap-2">
              {getTypeIcon(type)}
              <h4 className="font-medium text-sm text-gray-700">
                {getTypeLabel(type)} ({typeComments.length})
              </h4>
            </div>
            
            <div className="space-y-3">
              {typeComments.map((comment) => (
                <Card key={comment.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm text-gray-900 truncate">
                            {getContentTitle(type, comment.ref)}
                          </h5>
                          <p className="text-xs text-gray-500 mt-1">
                            {comment.content.length > 100 
                              ? `${comment.content.substring(0, 100)}...` 
                              : comment.content
                            }
                          </p>
                        </div>
                        <Link href={getContentPath(type, comment.ref)}>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </Link>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(comment.createdAt)}</span>
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
