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
  BookOpen,
  Users
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

export default function LatestDiscussions() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestComments();
  }, []);

  const fetchLatestComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/comments/latest?limit=10');
      const data = await response.json();
      
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Failed to fetch latest comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab': return 'Lab';
      case 'deep-dive': return 'Deep Dive';
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
            Latest Discussions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">Loading discussions...</div>
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
            Latest Discussions
          </CardTitle>
          <CardDescription>
            Recent comments and discussions across Monchee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-2">No discussions yet</p>
            <p className="text-xs text-gray-400">
              Start commenting on content to see discussions here
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
          Latest Discussions
        </CardTitle>
        <CardDescription>
          Recent comments and discussions across Monchee
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.user.avatarUrl || ''} alt={comment.user.username} />
                  <AvatarFallback className="text-xs">
                    {comment.user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm text-gray-900">
                      {comment.user.username}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(comment.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(comment.type)}
                    <span className="text-sm font-medium text-gray-700">
                      {getContentTitle(comment.type, comment.ref)}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {getTypeLabel(comment.type)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {comment.content.length > 150 
                      ? `${comment.content.substring(0, 150)}...` 
                      : comment.content
                    }
                  </p>
                  
                  <Link href={getContentPath(comment.type, comment.ref)}>
                    <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View Discussion
                    </button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {comments.length >= 10 && (
          <div className="text-center pt-4">
            <Link href="/community">
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mx-auto">
                <Users className="h-4 w-4" />
                View All Discussions
              </button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
