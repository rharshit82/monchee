"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Star, 
  Flame, 
  MessageSquare, 
  Heart, 
  Reply,
  Search,
  Filter,
  Crown,
  TrendingUp,
  Users,
  BookOpen,
  Code,
  Brain,
  Zap,
  Edit3,
  Save,
  X,
  Download
} from "lucide-react";
import Link from "next/link";
import XPProgress from "@/components/xp-progress";
import DailyGoals from "@/components/daily-goals";
import BadgeDisplay from "@/components/badge-display";
import DiscussionsSection from "@/components/discussions-section";

interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  progress: Progress[];
  comments: Comment[];
}

interface Progress {
  id: string;
  itemType: string;
  itemId: string;
  xpAwarded: number;
  score?: number;
  isKnown?: boolean;
  completedAt: string;
}

interface Comment {
  id: string;
  content: string;
  type: string;
  ref: string;
  likes: number;
  replies: number;
  createdAt: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  condition: string;
}

// Mock data - in a real app, this would come from an API
const mockProfile: UserProfile = {
  id: "1",
  username: "systemdesigner",
  displayName: "Alex Chen",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Passionate about building scalable systems and sharing knowledge with the community.",
  xp: 1250,
  level: 5,
  streak: 7,
  badges: [
    {
      id: "1",
      name: "Quiz Master",
      description: "Completed 10 quizzes with 90%+ accuracy",
      icon: "🧠",
      category: "Learning",
      condition: "quiz:10:90"
    },
    {
      id: "2",
      name: "Lab Explorer",
      description: "Completed 5 hands-on labs",
      icon: "🔬",
      category: "Practical",
      condition: "lab:5:complete"
    },
    {
      id: "3",
      name: "Streak Beast",
      description: "Maintained a 7-day learning streak",
      icon: "🔥",
      category: "Consistency",
      condition: "streak:7:days"
    }
  ],
  progress: [
    {
      id: "1",
      itemType: "deep-dive",
      itemId: "instagram-feed",
      xpAwarded: 20,
      completedAt: "2024-12-20T10:30:00Z"
    },
    {
      id: "2",
      itemType: "quiz",
      itemId: "caching-basics",
      xpAwarded: 30,
      score: 95,
      completedAt: "2024-12-19T15:45:00Z"
    }
  ],
  comments: [
    {
      id: "1",
      content: "Great explanation of the dispatch algorithm!",
      type: "deep-dive",
      ref: "uber-dispatch",
      likes: 12,
      replies: 3,
      createdAt: "2024-12-22T10:30:00Z"
    }
  ]
};

export default function ProfilePage({ params }: { params: { username: string } }) {
  // const resolvedParams = await params;
  // For client components, params is not a Promise
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(mockProfile);
      setEditBio(mockProfile.bio || "");
      setIsOwnProfile(true); // For demo purposes
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => prev ? { ...prev, bio: editBio } : null);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your bio has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    // Simple PDF export using window.print()
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile not found</h1>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatarUrl} alt={profile.username} />
              <AvatarFallback className="text-2xl">
                {profile.displayName?.charAt(0) || profile.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.displayName || profile.username}
                </h1>
                <div className="flex gap-2">
                  {isOwnProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">@{profile.username}</p>
              
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full p-3 border rounded-md resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditBio(profile.bio || "");
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mb-4">{profile.bio || "No bio yet."}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <XPProgress xp={profile.xp} />
                    <DailyGoals 
                      dailyGoalCompleted={true} 
                      streak={profile.streak} 
                    />
                  </div>
                  <div className="space-y-6">
                    <BadgeDisplay badges={profile.badges} />
                  </div>
                </div>
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>
                      Track your journey through system design concepts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profile.progress.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Trophy className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium capitalize">{item.itemType.replace('-', ' ')}</h4>
                              <p className="text-sm text-gray-500">{item.itemId}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">+{item.xpAwarded} XP</p>
                            <p className="text-sm text-gray-500">
                              {new Date(item.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Badges Tab */}
              <TabsContent value="badges" className="space-y-6">
                <BadgeDisplay badges={profile.badges} />
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <DiscussionsSection
                  type="profile"
                  ref={profile.username}
                  comments={profile.comments}
                  onAddComment={(content) => {
                    // Handle adding comment
                    console.log("Adding comment:", content);
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
