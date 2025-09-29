"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Code, 
  Brain, 
  Target,
  Trophy,
  Clock,
  Users,
  ArrowLeft,
  ArrowRight,
  Star,
  Award,
  CheckCircle,
  Lock,
  Play,
  Loader2
} from "lucide-react";

interface TrackModule {
  id: string;
  title: string;
  type: 'cheatsheet' | 'library' | 'quiz' | 'lab' | 'deep-dive';
  slug: string;
  order: number;
  status: 'locked' | 'in-progress' | 'completed';
}

interface Track {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  modules: TrackModule[];
  badge: {
    name: string;
    icon: string;
    description: string;
  };
  color: string;
}

const tracksData: Record<string, Track> = {
  'beginner': {
    id: 'beginner',
    title: 'Beginner Track',
    description: 'Master the fundamentals of system design with caching, sharding, and core concepts.',
    difficulty: 'Beginner',
    estimatedTime: '2-3 weeks',
    color: 'bg-green-500',
    badge: {
      name: 'Beginner Architect',
      icon: '🏆',
      description: 'Completed the beginner system design track'
    },
    modules: [
      { id: 'caching-patterns', title: 'Caching Patterns', type: 'cheatsheet', slug: 'caching-patterns', order: 1, status: 'locked' },
      { id: 'sharding', title: 'Database Sharding', type: 'library', slug: 'sharding', order: 2, status: 'locked' },
      { id: 'cap-theorem', title: 'CAP Theorem', type: 'library', slug: 'cap-theorem', order: 3, status: 'locked' },
      { id: 'caching-basics', title: 'Caching Basics Quiz', type: 'quiz', slug: 'caching-basics', order: 4, status: 'locked' }
    ]
  },
  'intermediate': {
    id: 'intermediate',
    title: 'Intermediate Track',
    description: 'Dive deeper into real-world systems with Instagram Feed, Uber Dispatch, and hands-on labs.',
    difficulty: 'Intermediate',
    estimatedTime: '4-6 weeks',
    color: 'bg-blue-500',
    badge: {
      name: 'System Designer',
      icon: '🏗️',
      description: 'Completed the intermediate system design track'
    },
    modules: [
      { id: 'instagram-feed', title: 'Instagram Feed Deep Dive', type: 'deep-dive', slug: 'instagram-feed', order: 1, status: 'locked' },
      { id: 'uber-dispatch', title: 'Uber Dispatch Deep Dive', type: 'deep-dive', slug: 'uber-dispatch', order: 2, status: 'locked' },
      { id: 'rate-limiter', title: 'Rate Limiter Lab', type: 'lab', slug: 'rate-limiter', order: 3, status: 'locked' },
      { id: 'sharding-basics', title: 'Sharding Basics Quiz', type: 'quiz', slug: 'sharding-basics', order: 4, status: 'locked' }
    ]
  },
  'advanced': {
    id: 'advanced',
    title: 'Advanced Track',
    description: 'Master distributed systems with Netflix Streaming, message queues, and complex architectures.',
    difficulty: 'Advanced',
    estimatedTime: '6-8 weeks',
    color: 'bg-purple-500',
    badge: {
      name: 'Distributed Pro',
      icon: '⚡',
      description: 'Completed the advanced distributed systems track'
    },
    modules: [
      { id: 'netflix-streaming', title: 'Netflix Streaming Deep Dive', type: 'deep-dive', slug: 'netflix-streaming', order: 1, status: 'locked' },
      { id: 'message-queue', title: 'Message Queue Lab', type: 'lab', slug: 'message-queue', order: 2, status: 'locked' },
      { id: 'url-shortener', title: 'URL Shortener Lab', type: 'lab', slug: 'url-shortener', order: 3, status: 'locked' },
      { id: 'database-trade-offs', title: 'Database Trade-offs Quiz', type: 'quiz', slug: 'database-trade-offs', order: 4, status: 'locked' }
    ]
  }
};

export default function TrackDetailPage({ params }: { params: { slug: string } }) {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [track, setTrack] = useState<Track | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTrackData();
    }
  }, [user, params.slug]);

  const fetchTrackData = async () => {
    try {
      setIsLoading(true);
      
      // Get track data
      const trackData = tracksData[params.slug];
      if (!trackData) {
        setTrack(null);
        return;
      }

      // Fetch user's progress for this track
      const response = await fetch(`/api/tracks/${params.slug}/progress`);
      if (response.ok) {
        const data = await response.json();
        
        // Update module statuses based on user progress
        const updatedModules = trackData.modules.map(module => {
          const moduleProgress = data.modules.find((m: any) => m.id === module.id);
          return {
            ...module,
            status: moduleProgress ? moduleProgress.status : 'locked'
          };
        });

        // Unlock first module if track not started
        if (data.progress === 0) {
          updatedModules[0].status = 'in-progress';
        }

        // Unlock next module if previous is completed
        for (let i = 0; i < updatedModules.length - 1; i++) {
          if (updatedModules[i].status === 'completed') {
            updatedModules[i + 1].status = 'in-progress';
          }
        }

        setTrack({
          ...trackData,
          modules: updatedModules
        });
        setProgress(data.progress);
        setIsCompleted(data.completed);
      } else {
        // If no progress, start with first module unlocked
        const updatedModules = [...trackData.modules];
        updatedModules[0].status = 'in-progress';
        
        setTrack({
          ...trackData,
          modules: updatedModules
        });
        setProgress(0);
        setIsCompleted(false);
      }
    } catch (error) {
      console.error('Error fetching track data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'cheatsheet': return <Target className="h-5 w-5" />;
      case 'library': return <BookOpen className="h-5 w-5" />;
      case 'quiz': return <Brain className="h-5 w-5" />;
      case 'lab': return <Code className="h-5 w-5" />;
      case 'deep-dive': return <BookOpen className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getModuleTypeColor = (type: string) => {
    switch (type) {
      case 'cheatsheet': return 'bg-orange-100 text-orange-800';
      case 'library': return 'bg-indigo-100 text-indigo-800';
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-green-100 text-green-800';
      case 'deep-dive': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleUrl = (module: TrackModule) => {
    switch (module.type) {
      case 'cheatsheet': return `/cheatsheets/${module.slug}`;
      case 'library': return `/library/${module.slug}`;
      case 'quiz': return `/learn`;
      case 'lab': return `/labs/${module.slug}`;
      case 'deep-dive': return `/deep-dives/${module.slug}`;
      default: return '#';
    }
  };

  const handleModuleComplete = async (moduleId: string) => {
    try {
      const response = await fetch(`/api/tracks/${params.slug}/complete-module`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.trackCompleted) {
          toast({
            title: "🎉 Track Completed!",
            description: `Congratulations! You've completed the ${track?.title} and earned the ${track?.badge.name} badge!`,
          });
          setIsCompleted(true);
        } else {
          toast({
            title: "✅ Module Completed!",
            description: `Great job! You've completed this module. Progress: ${result.progress}%`,
          });
        }
        
        // Refresh track data
        fetchTrackData();
      } else {
        toast({
          title: "Error",
          description: "Failed to mark module as completed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error completing module:', error);
      toast({
        title: "Error",
        description: "Failed to mark module as completed. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isLoaded || isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access learning tracks and track your progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/sign-in">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Track Not Found</CardTitle>
            <CardDescription>
              The track you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/tracks">Back to Tracks</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="sm" asChild>
                <a href="/tracks">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Tracks
                </a>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${track.color}`}></div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {track.difficulty}
                  </Badge>
                  {isCompleted && (
                    <Badge className="bg-green-500 text-white">
                      <Trophy className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {track.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {track.description}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{track.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{track.modules.length} modules</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Track Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Badge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{track.badge.icon}</div>
                      <div>
                        <div className="font-medium">{track.badge.name}</div>
                        <div className="text-sm text-gray-500">{track.badge.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Track Modules
                </CardTitle>
                <CardDescription>
                  Complete modules in order to unlock the next one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {track.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        module.status === 'completed'
                          ? 'bg-green-50 border-green-200'
                          : module.status === 'in-progress'
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      {/* Module Number */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        module.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : module.status === 'in-progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {module.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Module Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          {getModuleIcon(module.type)}
                          <h3 className="font-medium">{module.title}</h3>
                          <Badge className={getModuleTypeColor(module.type)}>
                            {module.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {module.status === 'completed' && 'Completed'}
                          {module.status === 'in-progress' && 'In Progress'}
                          {module.status === 'locked' && 'Locked - Complete previous modules'}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center gap-2">
                        {module.status === 'completed' && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        )}
                        
                        {module.status === 'in-progress' && (
                          <Button asChild size="sm">
                            <a href={getModuleUrl(module)}>
                              <Play className="h-4 w-4 mr-2" />
                              Start
                            </a>
                          </Button>
                        )}
                        
                        {module.status === 'locked' && (
                          <Button disabled size="sm">
                            <Lock className="h-4 w-4 mr-2" />
                            Locked
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
