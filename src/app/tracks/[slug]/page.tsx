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
  ArrowLeft,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface TrackItem {
  id: string;
  type: "cheatsheet" | "library" | "deep-dive" | "quiz" | "lab" | "scenario";
  title: string;
  slug: string;
  description: string;
  completed: boolean;
  estimatedTime: string;
}

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
  items: TrackItem[];
}

// Mock data - in a real app, this would come from an API
const tracksData: Record<string, Track> = {
  "beginner": {
    id: "1",
    slug: "beginner",
    title: "System Design Foundations",
    description: "Master the fundamentals of system design with essential concepts, patterns, and best practices. This track covers the core building blocks you need to understand before diving into more complex distributed systems.",
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
        description: "Learn different caching strategies and their trade-offs in distributed systems",
        completed: true,
        estimatedTime: "15 min"
      },
      {
        id: "2",
        type: "library",
        title: "Sharding",
        slug: "sharding",
        description: "Understand horizontal partitioning strategies for databases",
        completed: true,
        estimatedTime: "20 min"
      },
      {
        id: "3",
        type: "deep-dive",
        title: "Instagram Feed",
        slug: "instagram-feed",
        description: "Deep dive into how Instagram's feed algorithm works and scales",
        completed: false,
        estimatedTime: "45 min"
      },
      {
        id: "4",
        type: "quiz",
        title: "Basics of Scaling",
        slug: "basics-scaling-quiz",
        description: "Test your understanding of fundamental scaling concepts",
        completed: false,
        estimatedTime: "10 min"
      }
    ]
  },
  "intermediate": {
    id: "2",
    slug: "intermediate",
    title: "Scaling Systems",
    description: "Learn how to design and scale distributed systems for high availability and performance. This track focuses on practical techniques for building systems that can handle millions of users.",
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
        description: "Key considerations when choosing database technologies",
        completed: true,
        estimatedTime: "15 min"
      },
      {
        id: "6",
        type: "library",
        title: "Message Queues",
        slug: "message-queues",
        description: "Asynchronous communication patterns and queuing systems",
        completed: false,
        estimatedTime: "25 min"
      },
      {
        id: "7",
        type: "deep-dive",
        title: "Uber Dispatch",
        slug: "uber-dispatch",
        description: "Real-time driver-rider matching system architecture",
        completed: false,
        estimatedTime: "50 min"
      },
      {
        id: "8",
        type: "lab",
        title: "Rate Limiter",
        slug: "rate-limiter",
        description: "Build a distributed rate limiter for API protection",
        completed: false,
        estimatedTime: "2-3 hours"
      },
      {
        id: "9",
        type: "scenario",
        title: "SQL vs NoSQL",
        slug: "sql-vs-nosql-scenario",
        description: "Choose the right database for different use cases",
        completed: false,
        estimatedTime: "20 min"
      }
    ]
  },
  "advanced": {
    id: "3",
    slug: "advanced",
    title: "Distributed Systems Mastery",
    description: "Advanced concepts in distributed systems, consensus algorithms, and fault tolerance. This track covers the most challenging aspects of building reliable distributed systems.",
    difficulty: "Advanced",
    duration: "4-6 weeks",
    totalItems: 5,
    completedItems: 0,
    progressPercentage: 0,
    badge: {
      name: "Distributed Architect",
      description: "Completed Distributed Systems Mastery track",
      icon: "🏛️"
    },
    items: [
      {
        id: "10",
        type: "cheatsheet",
        title: "Consistency Models",
        slug: "consistency-models",
        description: "Understanding different consistency guarantees in distributed systems",
        completed: false,
        estimatedTime: "20 min"
      },
      {
        id: "11",
        type: "library",
        title: "CAP Theorem",
        slug: "cap-theorem",
        description: "Consistency, Availability, and Partition tolerance trade-offs",
        completed: false,
        estimatedTime: "25 min"
      },
      {
        id: "12",
        type: "deep-dive",
        title: "Netflix Streaming",
        slug: "netflix-streaming",
        description: "Content delivery and adaptive streaming at scale",
        completed: false,
        estimatedTime: "60 min"
      },
      {
        id: "13",
        type: "lab",
        title: "Message Queue",
        slug: "message-queue",
        description: "Design and implement a reliable message queuing system",
        completed: false,
        estimatedTime: "4-6 hours"
      },
      {
        id: "14",
        type: "scenario",
        title: "Eventual vs Strong Consistency",
        slug: "consistency-scenario",
        description: "Make trade-off decisions for consistency requirements",
        completed: false,
        estimatedTime: "25 min"
      }
    ]
  }
};

export default function TrackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrack = async () => {
      const { slug } = await params;
      setLoading(true);
      
      const timer = setTimeout(() => {
        const data = tracksData[slug];
        if (data) {
          setTrack(data);
        }
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    };
    
    loadTrack();
  }, [params]);

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
      case "cheatsheet": return <BookOpen className="h-5 w-5" />;
      case "library": return <Brain className="h-5 w-5" />;
      case "deep-dive": return <Target className="h-5 w-5" />;
      case "quiz": return <CheckCircle className="h-5 w-5" />;
      case "lab": return <Code className="h-5 w-5" />;
      case "scenario": return <Award className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cheatsheet": return "text-green-600 bg-green-50";
      case "library": return "text-purple-600 bg-purple-50";
      case "deep-dive": return "text-blue-600 bg-blue-50";
      case "quiz": return "text-orange-600 bg-orange-50";
      case "lab": return "text-red-600 bg-red-50";
      case "scenario": return "text-indigo-600 bg-indigo-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getItemUrl = (item: TrackItem) => {
    switch (item.type) {
      case "cheatsheet": return `/cheatsheets/${item.slug}`;
      case "library": return `/library/${item.slug}`;
      case "deep-dive": return `/deep-dives/${item.slug}`;
      case "quiz": return `/learn/quizzes`;
      case "lab": return `/labs/${item.slug}`;
      case "scenario": return `/learn/tradeoffs`;
      default: return "#";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading track...</div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Track not found</div>
        </div>
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
              <Button variant="outline" asChild>
                <Link href="/tracks">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tracks
                </Link>
              </Button>
              <Badge className={getDifficultyColor(track.difficulty)}>
                {track.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{track.duration}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">{track.badge.icon}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {track.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {track.description}
                </p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Track Progress</h3>
                <span className="text-sm text-gray-500">
                  {track.completedItems} of {track.totalItems} completed
                </span>
              </div>
              <Progress value={track.progressPercentage} className="h-3 mb-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{track.progressPercentage}% complete</span>
                <span>Earn the {track.badge.name} badge when complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Items */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Learning Path</h2>
            
            <div className="space-y-4">
              {track.items.map((item, index) => (
                <Card key={item.id} className={`relative ${item.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'} transition-all`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Step Number */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        item.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {item.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <h3 className={`text-lg font-semibold ${
                                item.completed ? 'text-green-800 line-through' : 'text-gray-900'
                              }`}>
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{item.estimatedTime}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4">
                          <Button 
                            asChild 
                            variant={item.completed ? "outline" : "default"}
                            className={item.completed ? "text-green-700 border-green-300" : ""}
                          >
                            <Link href={getItemUrl(item)}>
                              {item.completed ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Completed - Review
                                </>
                              ) : (
                                <>
                                  Start {item.type === 'quiz' ? 'Quiz' : item.type === 'scenario' ? 'Scenario' : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Completion Badge */}
      {track.progressPercentage === 100 && (
        <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-4">{track.badge.icon}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Congratulations! You've earned the {track.badge.name} badge!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {track.badge.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/profile">
                    View Your Badges
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/tracks">
                    Explore More Tracks
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
