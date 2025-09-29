"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Target, 
  BookOpen, 
  FlaskConical, 
  FileText,
  GraduationCap,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  Users,
  MessageCircle
} from "lucide-react";
import LatestDiscussions from "@/components/latest-discussions";

// Mock data - in a real app, this would come from the database
const mockLeaderboard = [
  {
    id: "1",
    username: "rharshit82",
    avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
    points: 1250,
    level: 4,
    streak: 7,
    completedTracks: 2
  },
  {
    id: "2",
    username: "alice",
    avatarUrl: "https://placehold.co/100x100",
    points: 980,
    level: 3,
    streak: 5,
    completedTracks: 1
  },
  {
    id: "3",
    username: "bob",
    avatarUrl: "https://placehold.co/100x100",
    points: 750,
    level: 3,
    streak: 3,
    completedTracks: 1
  },
  {
    id: "4",
    username: "charlie",
    avatarUrl: "https://placehold.co/100x100",
    points: 650,
    level: 2,
    streak: 4,
    completedTracks: 0
  },
  {
    id: "5",
    username: "diana",
    avatarUrl: "https://placehold.co/100x100",
    points: 520,
    level: 2,
    streak: 2,
    completedTracks: 0
  }
];

const mockFeaturedLearners = [
  {
    id: "1",
    username: "rharshit82",
    avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
    points: 1250,
    level: 4,
    streak: 7,
    badges: ["Cache Master", "Quiz Master", "Consistency King"],
    completedTracks: 2
  },
  {
    id: "2",
    username: "alice",
    avatarUrl: "https://placehold.co/100x100",
    points: 980,
    level: 3,
    streak: 5,
    badges: ["Sharding Pro", "Lab Expert"],
    completedTracks: 1
  },
  {
    id: "3",
    username: "bob",
    avatarUrl: "https://placehold.co/100x100",
    points: 750,
    level: 3,
    streak: 3,
    badges: ["Deep Dive Explorer"],
    completedTracks: 1
  }
];

export default function CommunityPage() {
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [featuredLearners, setFeaturedLearners] = useState(mockFeaturedLearners);
  const [sortBy, setSortBy] = useState<'points' | 'level' | 'streak'>('points');

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return b.points - a.points;
      case 'level':
        return b.level - a.level;
      case 'streak':
        return b.streak - a.streak;
      default:
        return b.points - a.points;
    }
  });

  const getSortLabel = (type: string) => {
    switch (type) {
      case 'points': return 'Points';
      case 'level': return 'Level';
      case 'streak': return 'Streak';
      default: return 'Points';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight gradient-text mb-4">
          Community
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect with fellow learners, track your progress, and see who's leading the way in system design mastery.
        </p>
      </div>

      <Tabs defaultValue="leaderboard" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Featured Learners
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Latest Discussions
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Learning Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top learners ranked by their achievements
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {(['points', 'level', 'streak'] as const).map((type) => (
                    <Button
                      key={type}
                      variant={sortBy === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(type)}
                    >
                      {getSortLabel(type)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedLeaderboard.map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-gray-400 w-8">
                          {index + 1}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatarUrl} alt={user.username} />
                          <AvatarFallback>
                            {user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{user.username}</div>
                          <div className="text-sm text-gray-500">
                            Level {user.level} • {user.streak} day streak
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{user.points}</div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{user.completedTracks}</div>
                        <div className="text-sm text-gray-500">tracks</div>
                      </div>
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
                <Star className="h-5 w-5" />
                Featured Learners
              </CardTitle>
              <CardDescription>
                Top performers and their achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredLearners.map((learner) => (
                  <Card key={learner.id} className="text-center">
                    <CardContent className="p-6">
                      <Avatar className="h-16 w-16 mx-auto mb-4">
                        <AvatarImage src={learner.avatarUrl} alt={learner.username} />
                        <AvatarFallback className="text-xl">
                          {learner.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {learner.username}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-center gap-4 text-sm">
                          <span className="text-gray-600">Level {learner.level}</span>
                          <span className="text-gray-600">{learner.points} points</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                          <Zap className="h-4 w-4" />
                          <span>{learner.streak} day streak</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Badges</div>
                        <div className="flex flex-wrap justify-center gap-1">
                          {learner.badges.map((badge, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Latest Discussions Tab */}
        <TabsContent value="discussions" className="space-y-6">
          <LatestDiscussions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
