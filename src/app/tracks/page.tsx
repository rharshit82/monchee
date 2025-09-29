"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Code, 
  Brain, 
  Target,
  Trophy,
  Clock,
  Users,
  ArrowRight,
  Star,
  Award
} from "lucide-react";

interface TrackModule {
  id: string;
  title: string;
  type: 'cheatsheet' | 'library' | 'quiz' | 'lab' | 'deep-dive';
  slug: string;
  order: number;
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

const tracksData: Track[] = [
  {
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
      { id: 'caching-patterns', title: 'Caching Patterns', type: 'cheatsheet', slug: 'caching-patterns', order: 1 },
      { id: 'sharding', title: 'Database Sharding', type: 'library', slug: 'sharding', order: 2 },
      { id: 'cap-theorem', title: 'CAP Theorem', type: 'library', slug: 'cap-theorem', order: 3 },
      { id: 'caching-basics', title: 'Caching Basics Quiz', type: 'quiz', slug: 'caching-basics', order: 4 }
    ]
  },
  {
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
      { id: 'instagram-feed', title: 'Instagram Feed Deep Dive', type: 'deep-dive', slug: 'instagram-feed', order: 1 },
      { id: 'uber-dispatch', title: 'Uber Dispatch Deep Dive', type: 'deep-dive', slug: 'uber-dispatch', order: 2 },
      { id: 'rate-limiter', title: 'Rate Limiter Lab', type: 'lab', slug: 'rate-limiter', order: 3 },
      { id: 'sharding-basics', title: 'Sharding Basics Quiz', type: 'quiz', slug: 'sharding-basics', order: 4 }
    ]
  },
  {
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
      { id: 'netflix-streaming', title: 'Netflix Streaming Deep Dive', type: 'deep-dive', slug: 'netflix-streaming', order: 1 },
      { id: 'message-queue', title: 'Message Queue Lab', type: 'lab', slug: 'message-queue', order: 2 },
      { id: 'url-shortener', title: 'URL Shortener Lab', type: 'lab', slug: 'url-shortener', order: 3 },
      { id: 'database-trade-offs', title: 'Database Trade-offs Quiz', type: 'quiz', slug: 'database-trade-offs', order: 4 }
    ]
  }
];

export default function TracksPage() {
  const { user, isLoaded } = useUser();
  const [trackProgress, setTrackProgress] = useState<Record<string, number>>({});
  const [completedTracks, setCompletedTracks] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      // Fetch user's track progress
      fetchTrackProgress();
    }
  }, [user]);

  const fetchTrackProgress = async () => {
    try {
      const response = await fetch('/api/tracks/progress');
      if (response.ok) {
        const data = await response.json();
        setTrackProgress(data.progress);
        setCompletedTracks(data.completedTracks);
      }
    } catch (error) {
      console.error('Error fetching track progress:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'cheatsheet': return <Target className="h-4 w-4" />;
      case 'library': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <Brain className="h-4 w-4" />;
      case 'lab': return <Code className="h-4 w-4" />;
      case 'deep-dive': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  if (!isLoaded) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Learning Tracks
            </h1>
            <p className="text-xl text-gray-600">
              Structured paths from beginner to advanced system design. Follow curated learning journeys and earn badges.
            </p>
          </div>
        </div>
      </section>

      {/* Tracks Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tracksData.map((track) => {
                const progress = trackProgress[track.id] || 0;
                const isCompleted = completedTracks.includes(track.id);
                
                return (
                  <Card key={track.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                    {isCompleted && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          <Trophy className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${track.color}`}></div>
                        <Badge className={getDifficultyColor(track.difficulty)}>
                          {track.difficulty}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl">{track.title}</CardTitle>
                      <CardDescription className="text-base">
                        {track.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Progress Section */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Modules Preview */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-gray-700">Modules ({track.modules.length})</h4>
                        <div className="space-y-1">
                          {track.modules.slice(0, 3).map((module) => (
                            <div key={module.id} className="flex items-center gap-2 text-sm text-gray-600">
                              {getModuleIcon(module.type)}
                              <span className="truncate">{module.title}</span>
                            </div>
                          ))}
                          {track.modules.length > 3 && (
                            <div className="text-sm text-gray-500">
                              +{track.modules.length - 3} more modules
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{track.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>{track.badge.name}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button asChild className="w-full">
                        <a href={`/tracks/${track.id}`}>
                          {isCompleted ? 'View Track' : 'Start Track'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Master System Design?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose your track and start building the skills that top tech companies value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/tracks/beginner">Start with Beginner Track</a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="/community">View Community</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
