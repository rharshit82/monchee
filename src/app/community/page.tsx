"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
  Zap
} from "lucide-react";
import Link from "next/link";

interface LeaderboardUser {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  points: number;
  level: number;
  xp: number;
  streak: number;
  badges: number;
  rank: number;
}

interface Discussion {
  id: string;
  user: {
    username: string;
    displayName?: string;
    avatarUrl?: string;
  };
  type: string;
  ref: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: string;
}

// Mock data with enhanced gamification
const leaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    username: "systemdesigner",
    displayName: "Alex Chen",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    points: 1250,
    level: 5,
    xp: 1250,
    streak: 7,
    badges: 6,
    rank: 1
  },
  {
    id: "2",
    username: "scalearchitect",
    displayName: "Sarah Kim",
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    points: 1180,
    level: 5,
    xp: 1180,
    streak: 5,
    badges: 4,
    rank: 2
  },
  {
    id: "3",
    username: "distributeddev",
    displayName: "Mike Johnson",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    points: 1050,
    level: 4,
    xp: 1050,
    streak: 3,
    badges: 3,
    rank: 3
  },
  {
    id: "4",
    username: "cloudmaster",
    displayName: "Emma Wilson",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    points: 980,
    level: 4,
    xp: 980,
    streak: 6,
    badges: 4,
    rank: 4
  },
  {
    id: "5",
    username: "microservices",
    displayName: "David Lee",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    points: 920,
    level: 4,
    xp: 920,
    streak: 4,
    badges: 2,
    rank: 5
  }
];

const discussionsData: Discussion[] = [
  {
    id: "1",
    user: {
      username: "systemdesigner",
      displayName: "Alex Chen",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    type: "deep-dive",
    ref: "uber-dispatch",
    content: "Great explanation of the dispatch algorithm! The geospatial indexing approach is really clever. I'm wondering how they handle surge pricing in real-time...",
    likes: 12,
    replies: 3,
    createdAt: "2024-12-22T10:30:00Z"
  },
  {
    id: "2",
    user: {
      username: "scalearchitect",
      displayName: "Sarah Kim",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    type: "lab",
    ref: "rate-limiter",
    content: "Just completed the Rate Limiter lab! The token bucket implementation was challenging but really helped me understand the concepts. Anyone else working on this?",
    likes: 8,
    replies: 5,
    createdAt: "2024-12-22T09:15:00Z"
  },
  {
    id: "3",
    user: {
      username: "distributeddev",
      displayName: "Mike Johnson",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    type: "cheatsheet",
    ref: "caching-patterns",
    content: "This cheatsheet is gold! The invalidation strategies section really cleared up my confusion about write-through vs write-behind patterns.",
    likes: 15,
    replies: 2,
    createdAt: "2024-12-21T16:45:00Z"
  },
  {
    id: "4",
    user: {
      username: "cloudmaster",
      displayName: "Emma Wilson",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    type: "library",
    ref: "cap-theorem",
    content: "CAP theorem is finally clicking for me! The trade-offs between consistency and availability make so much more sense now. Thanks for the clear explanation!",
    likes: 20,
    replies: 7,
    createdAt: "2024-12-21T14:20:00Z"
  }
];

export default function CommunityPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDiscussions, setFilteredDiscussions] = useState(discussionsData);

  useEffect(() => {
    if (searchQuery) {
      const filtered = discussionsData.filter(discussion =>
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDiscussions(filtered);
    } else {
      setFilteredDiscussions(discussionsData);
    }
  }, [searchQuery]);

  const handleLike = (discussionId: string) => {
    toast({
      title: "Liked!",
      description: "Thanks for your feedback!",
    });
  };

  const handleReply = (discussionId: string) => {
    toast({
      title: "Reply",
      description: "Reply functionality coming soon!",
    });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deep-dive": return <BookOpen className="h-4 w-4" />;
      case "lab": return <Code className="h-4 w-4" />;
      case "cheatsheet": return <Brain className="h-4 w-4" />;
      case "library": return <BookOpen className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deep-dive": return "bg-blue-100 text-blue-800";
      case "lab": return "bg-green-100 text-green-800";
      case "cheatsheet": return "bg-purple-100 text-purple-800";
      case "library": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Community Hub
            </h1>
            <p className="text-xl text-gray-600">
              Connect with fellow learners, track your progress, and share insights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-6 w-6" />
                      Top Learners
                    </CardTitle>
                    <CardDescription>
                      Ranked by XP, level, and learning streaks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboardData.map((user) => (
                        <div key={user.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            {getRankIcon(user.rank)}
                          </div>
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatarUrl} alt={user.username} />
                            <AvatarFallback>
                              {user.displayName?.charAt(0) || user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link 
                                href={`/profile/${user.username}`}
                                className="font-semibold hover:text-blue-600 transition-colors"
                              >
                                {user.displayName || user.username}
                              </Link>
                              <Badge variant="secondary">Level {user.level}</Badge>
                            </div>
                            <div className="text-sm text-gray-600">@{user.username}</div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-lg">{user.xp.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">XP</div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-lg">{user.points.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">points</div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-orange-600">
                              <Flame className="h-4 w-4" />
                              <span className="font-semibold">{user.streak}</span>
                            </div>
                            <div className="text-sm text-gray-600">streak</div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold">{user.badges}</div>
                            <div className="text-sm text-gray-600">badges</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Featured Learners Tab */}
              <TabsContent value="featured" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-6 w-6" />
                      Featured Learners
                    </CardTitle>
                    <CardDescription>
                      Top performers this week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {leaderboardData.slice(0, 6).map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6 text-center">
                            <div className="relative mb-4">
                              <Avatar className="h-20 w-20 mx-auto">
                                <AvatarImage src={user.avatarUrl} alt={user.username} />
                                <AvatarFallback className="text-2xl">
                                  {user.displayName?.charAt(0) || user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              {user.rank <= 3 && (
                                <div className="absolute -top-2 -right-2">
                                  {getRankIcon(user.rank)}
                                </div>
                              )}
                            </div>
                            
                            <h3 className="font-semibold text-lg mb-1">
                              {user.displayName || user.username}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">@{user.username}</p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Level:</span>
                                <span className="font-semibold">{user.level}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">XP:</span>
                                <span className="font-semibold">{user.xp.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Points:</span>
                                <span className="font-semibold">{user.points.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Streak:</span>
                                <div className="flex items-center gap-1 text-orange-600">
                                  <Flame className="h-4 w-4" />
                                  <span className="font-semibold">{user.streak}</span>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Badges:</span>
                                <span className="font-semibold">{user.badges}</span>
                              </div>
                            </div>
                            
                            <Button asChild className="w-full mt-4">
                              <Link href={`/profile/${user.username}`}>
                                View Profile
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-6 w-6" />
                          Community Discussions
                        </CardTitle>
                        <CardDescription>
                          Share insights and learn from others
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search discussions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {filteredDiscussions.map((discussion) => (
                        <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={discussion.user.avatarUrl} alt={discussion.user.username} />
                                <AvatarFallback>
                                  {discussion.user.displayName?.charAt(0) || discussion.user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Link 
                                    href={`/profile/${discussion.user.username}`}
                                    className="font-semibold hover:text-blue-600 transition-colors"
                                  >
                                    {discussion.user.displayName || discussion.user.username}
                                  </Link>
                                  <span className="text-gray-500">•</span>
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs ${getTypeColor(discussion.type)}`}
                                  >
                                    <div className="flex items-center gap-1">
                                      {getTypeIcon(discussion.type)}
                                      {discussion.type.replace("-", " ")}
                                    </div>
                                  </Badge>
                                  <span className="text-gray-500">•</span>
                                  <span className="text-sm text-gray-500">
                                    {discussion.ref}
                                  </span>
                                </div>
                                
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                  {discussion.content}
                                </p>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <button
                                    onClick={() => handleLike(discussion.id)}
                                    className="flex items-center gap-1 hover:text-red-600 transition-colors"
                                  >
                                    <Heart className="h-4 w-4" />
                                    {discussion.likes}
                                  </button>
                                  <button
                                    onClick={() => handleReply(discussion.id)}
                                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                                  >
                                    <Reply className="h-4 w-4" />
                                    {discussion.replies}
                                  </button>
                                  <span>
                                    {new Date(discussion.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
