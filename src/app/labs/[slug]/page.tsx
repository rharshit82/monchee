"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, Clock, Users, CheckCircle, Lightbulb, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import mermaid from "mermaid";
import { exportLabPDF } from "@/lib/pdf-export";
import PDFExportButton from "@/components/pdf-export-button";

// Mock data - in a real app, this would come from an API
const labsData = {
  "rate-limiter": {
    title: "Rate Limiter",
    subtitle: "Build a distributed rate limiter for API protection",
    difficulty: "Intermediate",
    duration: "2-3 hours",
    concepts: ["Redis", "Distributed Systems", "API Design"],
    problemStatement: `You're tasked with building a rate limiter that can handle millions of requests per second across multiple servers. The rate limiter should prevent API abuse while ensuring legitimate users can access the service without interruption.

The challenge is to design a system that can:
- Track request counts per user/IP across multiple servers
- Enforce rate limits consistently without false positives
- Scale horizontally as traffic grows
- Handle edge cases like clock skew and network partitions`,

    requirements: {
      functional: [
        "Allow X requests per Y seconds per user/IP",
        "Support multiple rate limit policies (per user, per IP, per endpoint)",
        "Provide real-time rate limit status",
        "Support different time windows (sliding, fixed, rolling)",
        "Handle burst traffic gracefully"
      ],
      nonFunctional: [
        "Process 1M+ requests per second",
        "Sub-millisecond latency for rate limit checks",
        "99.9% availability",
        "Memory efficient (minimal storage per request)",
        "Consistent behavior across all servers"
      ]
    },

    hints: [
      "Consider using Redis for distributed state management",
      "Token bucket and sliding window are popular algorithms",
      "Think about how to handle clock synchronization",
      "Consider caching frequently accessed rate limit data",
      "Plan for graceful degradation when Redis is unavailable"
    ],

    extensions: [
      "Add support for different rate limit algorithms (leaky bucket, fixed window)",
      "Implement rate limit bypass for premium users",
      "Add real-time monitoring and alerting",
      "Support dynamic rate limit adjustment based on system load",
      "Implement rate limit sharing across multiple APIs"
    ],

    interviewRelevance: "This lab tests your understanding of distributed systems, caching strategies, and API design. It's commonly asked in system design interviews for backend and infrastructure roles.",

    architecture: `graph TD
    Client[Client] --> LB[Load Balancer]
    LB --> API1[API Server 1]
    LB --> API2[API Server 2]
    LB --> API3[API Server 3]
    
    API1 --> Redis[(Redis Cluster)]
    API2 --> Redis
    API3 --> Redis
    
    subgraph "Rate Limiting Logic"
        TB[Token Bucket]
        SW[Sliding Window]
        FW[Fixed Window]
    end
    
    API1 --> TB
    API2 --> SW
    API3 --> FW
    
    subgraph "Storage Layer"
        Redis
        Cache[Local Cache]
        DB[(Database)]
    end
    
    Redis --> Cache
    Redis --> DB
    
    style Redis fill:#e1f5fe
    style TB fill:#f3e5f5
    style SW fill:#e8f5e8
    style FW fill:#fff3e0`
  },
  "url-shortener": {
    title: "URL Shortener",
    subtitle: "Create a scalable service to shorten long URLs",
    difficulty: "Beginner",
    duration: "1-2 hours",
    concepts: ["Database Design", "Hash Functions", "Caching"],
    problemStatement: `Design and implement a URL shortener service like bit.ly or tinyurl.com. The service should be able to handle millions of URL shortening requests and redirects per day.

Key challenges include:
- Generating unique short codes efficiently
- Handling high read/write loads
- Ensuring fast redirect performance
- Managing storage efficiently
- Preventing abuse and spam`,

    requirements: {
      functional: [
        "Shorten long URLs to 6-8 character codes",
        "Redirect short URLs to original URLs",
        "Support custom short codes",
        "Track click analytics and timestamps",
        "Support URL expiration dates",
        "Prevent duplicate short codes"
      ],
      nonFunctional: [
        "Handle 100M+ URL shortening requests per day",
        "Sub-100ms response time for redirects",
        "99.9% availability",
        "Support 1B+ stored URLs",
        "Efficient storage and retrieval"
      ]
    },

    hints: [
      "Consider using base62 encoding for short codes",
      "Use a distributed ID generator for uniqueness",
      "Implement caching for frequently accessed URLs",
      "Think about database sharding strategies",
      "Consider using a CDN for global redirect performance"
    ],

    extensions: [
      "Add user authentication and custom domains",
      "Implement click analytics and reporting",
      "Add URL preview and safety checks",
      "Support bulk URL shortening",
      "Implement rate limiting and abuse prevention"
    ],

    interviewRelevance: "This lab covers fundamental concepts like hashing, database design, and caching. It's a common system design interview question for all levels.",

    architecture: `graph TD
    User[User] --> Web[Web App]
    Web --> API[URL Shortener API]
    API --> Cache[Redis Cache]
    API --> DB[(Database)]
    API --> Analytics[Analytics Service]
    
    User --> ShortURL[Short URL]
    ShortURL --> CDN[CDN]
    CDN --> Redirect[Redirect Service]
    Redirect --> Cache
    Redirect --> Analytics
    Redirect --> Original[Original URL]
    
    subgraph "URL Generation"
        ID[ID Generator]
        Encoder[Base62 Encoder]
        Validator[Code Validator]
    end
    
    API --> ID
    ID --> Encoder
    Encoder --> Validator
    
    style Cache fill:#e1f5fe
    style CDN fill:#f3e5f5
    style Analytics fill:#fff3e0`
  },
  "message-queue": {
    title: "Message Queue",
    subtitle: "Design and implement a reliable message queuing system",
    difficulty: "Advanced",
    duration: "4-6 hours",
    concepts: ["Distributed Systems", "Consensus", "Fault Tolerance"],
    problemStatement: `Build a distributed message queue system that can handle high-throughput message processing with strong durability and ordering guarantees.

The system must handle:
- High message throughput (1M+ messages/second)
- Message durability and persistence
- Ordering guarantees within partitions
- Fault tolerance and recovery
- Consumer group management
- Dead letter queue handling`,

    requirements: {
      functional: [
        "Produce messages to topics/queues",
        "Consume messages with different delivery guarantees",
        "Support message partitioning and ordering",
        "Handle consumer group coordination",
        "Implement message acknowledgment",
        "Support message replay and reprocessing"
      ],
      nonFunctional: [
        "Handle 1M+ messages per second",
        "Sub-10ms message latency",
        "99.99% message durability",
        "Support 10K+ concurrent consumers",
        "Fault tolerance across multiple nodes"
      ]
    },

    hints: [
      "Consider using a distributed log like Apache Kafka",
      "Think about partitioning strategies for ordering",
      "Implement leader election for fault tolerance",
      "Use write-ahead logs for durability",
      "Consider using consensus algorithms like Raft"
    ],

    extensions: [
      "Add support for message schemas and validation",
      "Implement message compression and batching",
      "Add monitoring and metrics collection",
      "Support message routing and filtering",
      "Implement dead letter queues"
    ],

    interviewRelevance: "This lab tests advanced distributed systems knowledge including consensus algorithms, fault tolerance, and message ordering. It's commonly asked in senior system design interviews.",

    architecture: `graph TD
    Producer[Message Producer] --> LB[Load Balancer]
    LB --> Broker[Message Broker]
    Broker --> Partition1[Partition 1]
    Broker --> Partition2[Partition 2]
    Broker --> Partition3[Partition 3]
    
    Partition1 --> Replica1[Replica 1]
    Partition1 --> Replica2[Replica 2]
    Partition1 --> Replica3[Replica 3]
    
    Consumer1[Consumer Group 1] --> Partition1
    Consumer2[Consumer Group 2] --> Partition2
    Consumer3[Consumer Group 3] --> Partition3
    
    Broker --> WAL[Write-Ahead Log]
    Broker --> Metadata[Metadata Store]
    
    subgraph "Message Processing"
        DLQ[Dead Letter Queue]
        Retry[Retry Logic]
        Ack[Acknowledgment]
    end
    
    Consumer1 --> DLQ
    Consumer2 --> Retry
    Consumer3 --> Ack
    
    style Broker fill:#e1f5fe
    style WAL fill:#f3e5f5
    style DLQ fill:#ffebee`
  }
};

export default function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const [lab, setLab] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  const handleExportPDF = () => {
    if (!lab) return;
    
    exportLabPDF({
      title: lab.title,
      subtitle: lab.subtitle,
      difficulty: lab.difficulty,
      duration: lab.duration,
      problemStatement: lab.problemStatement,
      requirements: lab.requirements,
      hints: lab.hints,
      extensions: lab.extensions || [],
      interviewRelevance: lab.interviewRelevance || "This lab tests your understanding of distributed systems concepts and practical implementation skills.",
      username: "user" // In a real app, get from auth
    });
  };

  useEffect(() => {
    const loadLab = async () => {
      const { slug } = await params;
      setLoading(true);
      
      const timer = setTimeout(() => {
        const data = labsData[slug as keyof typeof labsData];
        if (data) {
          setLab(data);
          mermaid.initialize({ startOnLoad: true });
        }
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    };
    
    loadLab();
  }, [params]);

  const handleComplete = async () => {
    try {
      const response = await fetch('/api/lab/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          labId: lab.title,
          completedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Error completing lab:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading lab...</div>
        </div>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Lab not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/labs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Labs
                  </Link>
                </Button>
                <Badge className={getDifficultyColor(lab.difficulty)}>
                  {lab.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {lab.duration}
                </div>
              </div>
              <PDFExportButton onExport={handleExportPDF} />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              {lab.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {lab.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {lab.concepts.map((concept: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8">
            {/* Problem Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Problem Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {lab.problemStatement}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-green-700">Functional Requirements</h4>
                    <ul className="space-y-2">
                      {lab.requirements.functional.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-blue-700">Non-Functional Requirements</h4>
                    <ul className="space-y-2">
                      {lab.requirements.nonFunctional.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Hints & Guidance
                </CardTitle>
                <CardDescription>
                  Small nudges to help you get started, not full solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lab.hints.map((hint: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Architecture Sketch */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Architecture Sketch
                </CardTitle>
                <CardDescription>
                  High-level system design diagram
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mermaid">
                  {lab.architecture}
                </div>
              </CardContent>
            </Card>

            {/* Extensions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Extensions
                </CardTitle>
                <CardDescription>
                  How to go beyond the basics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lab.extensions.map((ext: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{ext}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Interview Relevance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Interview Relevance
                </CardTitle>
                <CardDescription>
                  What signals this tests in a system design interview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {lab.interviewRelevance}
                </p>
              </CardContent>
            </Card>

            {/* Complete Button */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  {completed ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Lab Completed!</span>
                    </div>
                  ) : (
                    <Button onClick={handleComplete} size="lg" className="px-8">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
