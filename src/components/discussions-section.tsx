"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Send, 
  Trash2, 
  User,
  Clock
} from "lucide-react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
    avatarUrl: string | null;
  };
}

interface DiscussionsSectionProps {
  type: 'lab' | 'deep-dive';
  ref: string;
  title: string;
}

export default function DiscussionsSection({ type, ref, title }: DiscussionsSectionProps) {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [type, ref]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments/list?type=${type}&ref=${ref}`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post comments.",
        variant: "destructive",
      });
      router.push('/sign-in');
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter some content for your comment.",
        variant: "destructive",
      });
      return;
    }

    try {
      setPosting(true);
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          ref,
          content: newComment.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewComment("");
        await fetchComments();
        toast({
          title: "Comment Posted",
          description: "Your comment has been posted successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to post comment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      setPosting(true);
      const response = await fetch('/api/comments/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchComments();
        toast({
          title: "Comment Deleted",
          description: "Your comment has been deleted successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete comment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPosting(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab': return 'Lab';
      case 'deep-dive': return 'Deep Dive';
      default: return type;
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

  if (!isSignedIn) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Discussions
          </CardTitle>
          <CardDescription>
            Sign in to join the discussion on this {getTypeLabel(type).toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <a href="/sign-in">Sign In to Comment</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Discussions
        </CardTitle>
        <CardDescription>
          Join the discussion about this {getTypeLabel(type).toLowerCase()}: {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Comment */}
        <div className="space-y-4">
          <Textarea
            placeholder={`Share your thoughts about this ${getTypeLabel(type).toLowerCase()}...`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handlePostComment}
              disabled={posting || !newComment.trim()}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {posting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </div>

        {/* Comments List */}
        {loading ? (
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">Loading comments...</div>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MessageCircle className="h-4 w-4" />
              <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
            </div>
            
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
                      
                      <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {comment.content}
                      </div>
                      
                      {/* Delete button for comment owner */}
                      {isSignedIn && user && comment.user.username === user.username && (
                        <div className="mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.id)}
                            className="h-6 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-2">No comments yet</p>
            <p className="text-xs text-gray-400">
              Be the first to start the discussion!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
