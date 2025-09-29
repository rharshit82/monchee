import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  TrendingUp
} from "lucide-react";
import prisma from "@/lib/prisma";
import ProfileNotes from "@/components/profile-notes";
import ProfileComments from "@/components/profile-comments";

// Mock data - in a real app, this would come from the database
const mockUserProfile = {
  id: "user_123",
  clerkId: "user_123",
  username: "rharshit82",
  avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
  bio: "Full Stack Developer passionate about system design and distributed systems",
  points: 1250,
  level: 4,
  xp: 1250,
  streak: 7,
  lastActive: new Date(),
};

const mockGamificationStats = {
  level: 4,
  xp: 1250,
  xpToNextLevel: 500,
  streak: 7,
  points: 1250,
  badges: [
    { name: "Level 4", icon: "🏆", description: "Reached level 4" },
    { name: "Quiz Master", icon: "��", description: "Completed 10+ quizzes" },
    { name: "Cache Master", icon: "🔥", description: "Mastered caching concepts" },
    { name: "Consistency King", icon: "👑", description: "7-day learning streak" },
  ],
  completedActivities: {
    quizzes: 12,
    labs: 5,
    deepDives: 8,
    cheatsheets: 15,
    tracks: 2
  },
  completedTracks: [
    { name: "Beginner Track", badge: "Beginner Architect", progress: 100 },
    { name: "Intermediate Track", badge: "System Designer", progress: 75 },
  ]
};

export default async function UserProfilePage({ 
  params 
}: { 
  params: { username: string } 
}) {
  // In a real app, you would fetch this data from the database
  // const userProfile = await prisma.userProfile.findUnique({
  //   where: { username: params.username },
  //   include: { badges: true, progress: true }
  // });

  // For now, we'll use mock data
  const userProfile = mockUserProfile;
  const gamificationStats = mockGamificationStats;

  if (!userProfile) {
    notFound();
  }

  const xpPercentage = (gamificationStats.xp / (gamificationStats.xp + gamificationStats.xpToNextLevel)) * 100;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.username} />
                <AvatarFallback className="text-2xl">
                  {userProfile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {userProfile.username}
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                {userProfile.bio}
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-center">
                  Level {gamificationStats.level}
                </Badge>
                <Badge variant="outline" className="w-full justify-center">
                  {gamificationStats.points} points
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Learning Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">XP Progress</span>
                  <span className="text-gray-900">{gamificationStats.xp} / {gamificationStats.xp + gamificationStats.xpToNextLevel}</span>
                </div>
                <Progress value={xpPercentage} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Streak
                </span>
                <span className="text-gray-900 font-medium">{gamificationStats.streak} days</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Points
                </span>
                <span className="text-gray-900 font-medium">{gamificationStats.points}</span>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {gamificationStats.badges.map((badge, index) => (
                  <div key={index} className="text-center p-2 border rounded-lg">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs text-gray-600">{badge.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Activity Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Learning Activity
              </CardTitle>
              <CardDescription>
                Your progress across different learning activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {gamificationStats.completedActivities.deepDives}
                  </div>
                  <div className="text-sm text-gray-600">Deep Dives</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <FlaskConical className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {gamificationStats.completedActivities.labs}
                  </div>
                  <div className="text-sm text-gray-600">Labs</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {gamificationStats.completedActivities.cheatsheets}
                  </div>
                  <div className="text-sm text-gray-600">Cheatsheets</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {gamificationStats.completedActivities.quizzes}
                  </div>
                  <div className="text-sm text-gray-600">Quizzes</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <GraduationCap className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {gamificationStats.completedActivities.tracks}
                  </div>
                  <div className="text-sm text-gray-600">Tracks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Tracks */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Completed Tracks
              </CardTitle>
              <CardDescription>
                Learning tracks you've completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gamificationStats.completedTracks.map((track, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {track.progress === 100 ? '✓' : Math.round(track.progress)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{track.name}</div>
                        <div className="text-sm text-gray-600">{track.badge}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {track.progress}% Complete
                      </div>
                      <Progress value={track.progress} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <ProfileNotes userId={userProfile.id} />

          {/* Comments Section */}
          <ProfileComments userId={userProfile.id} />
        </div>
      </div>
    </div>
  );
}
