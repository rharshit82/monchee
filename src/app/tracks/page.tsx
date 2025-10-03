"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Code, 
  Brain, 
  Target, 
  CheckCircle, 
  Clock,
  Award,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  totalItems: number;
  completedItems: number;
  progressPercentage: number;
  badge: {
    name: string;
    description: string;
    icon: string;
  };
  items: Array<{
    id: string;
    type: "cheatsheet" | "library" | "deep-dive" | "quiz" | "lab" | "scenario";
    title: string;
    slug: string;
    completed: boolean;
  }>;
}

// Mock data - in a real app, this would come from an API
const tracksData: Track[] = [
  {
    id: "1",
    slug: "beginner",
    title: "System Design Foundations",
    description: "Master the fundamentals of system design with essential concepts, patterns, and best practices.",
    difficulty: "Beginner",
    duration: "2-3 weeks",
    totalItems: 4,
    completedItems: 2,
    progressPercentage: 50,
    badge: {
      name: "Foundation Builder",
      description: "Completed System Design Foundations track",
      icon: "🏗️"
    },
    items: [
      {
        id: "1",
        type: "cheatsheet",
        title: "Caching Patterns",
        slug: "caching-patterns",
        completed: true
      },
      {
        id: "2",
        type: "library",
        title: "Sharding",
        slug: "sharding",
        completed: true
      },
      {
        id: "3",
        type: "deep-dive",
        title: "Instagram Feed",
        slug: "instagram-feed",
        completed: false
      },
      {
        id: "4",
        type: "quiz",
        title: "Basics of Scaling",
        slug: "basics-scaling-quiz",
        completed: false
      }
    ]
  },
  {
    id: "2",
    slug: "intermediate",
    title: "Scaling Systems",
    description: "Learn how to design and scale distributed systems for high availability and performance.",
    difficulty: "Intermediate",
    duration: "3-4 weeks",
    totalItems: 5,
    completedItems: 1,
    progressPercentage: 20,
    badge: {
      name: "System Scaler",
      description: "Completed Scaling Systems track",
      icon: "📈"
    },
    items: [
      {
        id: "5",
        type: "cheatsheet",
        title: "Database Trade-offs",
        slug: "database-tradeoffs",
        completed: true
      },
      {
        id: "6",
        type: "library",
        title: "Message Queues",
        slug: "message-queues",
        completed: false
      },
      {
        id: "7",
        type: "deep-dive",
        title: "Uber Dispatch",
        slug: "uber-dispatch",
        completed: false
      },
      {
        id: "8",
        type: "lab",
        title: "Rate Limiter",
        slug: "rate-limiter",
        completed: false
      },
      {
        id: "9",
        type: "scenario",
        title: "SQL vs NoSQL",
        slug: "sql-vs-nosql-scenario",
        completed: false
      }
    ]
  },
  {
    id: "3",
    slug: "advanced",
    title: "Distributed Systems Mastery",
    description: "Advanced concepts in distributed systems, consensus algorithms, and fault tolerance.",
    difficulty: "Advanced",
    duration: "4-6 weeks",
    totalItems: 5,
    completedItems: 0,
    progressPercentage: 0,
    badge: {
      name: "Distributed Architect",
      description: "Completed Distributed Systems Mastery track",
      icon: "��️"
    },
    items: [
      {
        id: "10",
        type: "cheatsheet",
        title: "Consistency Models",
        slug: "consistency-models",
        completed: false
      },
      {
        id: "11",
        type: "library",
        title: "CAP Theorem",
        slug: "cap-theorem",
        completed: false
      },
      {
        id: "12",
        type: "deep-dive",
        title: "Netflix Streaming",
        slug: "netflix-streaming",
        completed: false
      },
      {
        id: "13",
        type: "lab",
        title: "Message Queue",
        slug: "message-queue",
        completed: false
      },
      {
        id: "14",
        type: "scenario",
        title: "Eventual vs Strong Consistency",
        slug: "consistency-scenario",
        completed: false
      }
    ]
  }
];

export default function TracksPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTracks(tracksData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cheatsheet": return <BookOpen className="h-4 w-4" />;
      case "library": return <Brain className="h-4 w-4" />;
      case "deep-dive": return <Target className="h-4 w-4" />;
      case "quiz": return <CheckCircle className="h-4 w-4" />;
      case "lab": return <Code className="h-4 w-4" />;
      case "scenario": return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cheatsheet": return "text-green-600";
      case "library": return "text-purple-600";
      case "deep-dive": return "text-blue-600";
      case "quiz": return "text-orange-600";
      case "lab": return "text-red-600";
      case "scenario": return "text-indigo-600";
      default: return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading tracks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Learning Tracks
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Structured learning paths to master system design concepts step by step
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Cheatsheets</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>Library</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Deep Dives</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Scenarios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tracks.map((track) => (
                <Card key={track.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(track.difficulty)}>
                      {track.difficulty}
                    </Badge>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">{track.badge.icon}</div>
                      <div>
                        <CardTitle className="text-xl">{track.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4" />
                          <span>{track.duration}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {track.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Progress Section */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">
                          {track.completedItems}/{track.totalItems} completed
                        </span>
                      </div>
                      <Progress value={track.progressPercentage} className="h-2" />
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {track.progressPercentage}% complete
                      </div>
                    </div>

                    {/* Track Items Preview */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Track Contents</h4>
                      <div className="space-y-2">
                        {track.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-2 text-sm">
                            <div className={`flex-shrink-0 ${getTypeColor(item.type)}`}>
                              {getTypeIcon(item.type)}
                            </div>
                            <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {item.title}
                            </span>
                            {item.completed && (
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                        {track.items.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{track.items.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Button asChild className="w-full">
                        <Link href={`/tracks/${track.slug}`}>
                          View Track
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Choose a track that matches your current level and start building your system design expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/tracks/beginner">
                  Start with Foundations
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/learn">
                  Explore All Content
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
