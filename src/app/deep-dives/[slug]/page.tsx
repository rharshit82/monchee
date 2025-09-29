"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { shareToLinkedIn } from "@/lib/linkedin-share";
import { Download, Share2, CheckCircle, Clock, Target, Lightbulb, Code } from "lucide-react";
import mermaid from "mermaid";
import NotesSection from "@/components/notes-section";
import DiscussionsSection from "@/components/discussions-section";

// Mock data - in a real app, this would come from an API
const deepDives = {
  "instagram-feed": {
    title: "Instagram Feed",
    description: "Design a social media feed system that can handle millions of users and real-time updates.",
    problemStatement: "Design a social media feed system similar to Instagram that can handle millions of users, billions of posts, and provide real-time updates with low latency.",
    background: "Social media feeds are one of the most complex distributed systems. They need to handle massive scale, real-time updates, personalization, and provide a seamless user experience. Instagram alone has over 1 billion users and processes millions of posts daily.",
    challenges: [
      "Handle millions of concurrent users",
      "Process billions of posts and interactions",
      "Provide real-time updates and notifications",
      "Personalize content for each user",
      "Maintain low latency for feed generation",
      "Handle viral content and traffic spikes"
    ],
    architecture: {
      components: [
        "User Service: Manages user profiles and relationships",
        "Post Service: Handles post creation, storage, and retrieval",
        "Feed Service: Generates personalized feeds for users",
        "Notification Service: Sends real-time updates",
        "Media Service: Handles image/video uploads and processing",
        "Analytics Service: Tracks user behavior and engagement"
      ],
      dataFlow: [
        "User creates a post → Post Service",
        "Post Service stores post → Database",
        "Post Service triggers feed updates → Feed Service",
        "Feed Service updates follower feeds → Cache",
        "Users request feed → Feed Service returns cached data",
        "Real-time updates → WebSocket connections"
      ]
    },
    scalability: [
      "Horizontal scaling with microservices architecture",
      "Database sharding by user ID and post ID",
      "CDN for media content delivery",
      "Caching at multiple levels (Redis, CDN, Application)",
      "Message queues for asynchronous processing",
      "Load balancing across multiple regions"
    ],
    technologies: [
      "Backend: Node.js, Python, or Java microservices",
      "Database: PostgreSQL, MongoDB for different data types",
      "Cache: Redis for feed data and session storage",
      "Message Queue: Apache Kafka for event streaming",
      "CDN: CloudFlare or AWS CloudFront for media",
      "Real-time: WebSockets or Server-Sent Events"
    ]
  },
  "uber-dispatch": {
    title: "Uber Dispatch",
    description: "Design a ride-sharing dispatch system that matches drivers with riders efficiently.",
    problemStatement: "Design a ride-sharing dispatch system that can efficiently match drivers with riders in real-time, considering factors like location, driver availability, traffic conditions, and user preferences.",
    background: "Ride-sharing dispatch systems are complex real-time systems that need to handle millions of requests, optimize for multiple objectives, and provide a seamless experience for both drivers and riders.",
    challenges: [
      "Real-time matching of drivers and riders",
      "Optimizing for multiple factors (distance, time, cost)",
      "Handling dynamic pricing and surge pricing",
      "Managing driver availability and location updates",
      "Providing accurate ETAs and route optimization",
      "Scaling to handle peak demand periods"
    ],
    architecture: {
      components: [
        "Rider Service: Handles ride requests and user management",
        "Driver Service: Manages driver availability and location",
        "Matching Service: Core algorithm for driver-rider matching",
        "Pricing Service: Dynamic pricing and surge pricing logic",
        "Notification Service: Real-time updates to drivers and riders",
        "Analytics Service: Performance monitoring and optimization"
      ],
      dataFlow: [
        "Rider requests ride → Rider Service",
        "Rider Service finds nearby drivers → Driver Service",
        "Matching algorithm selects best driver → Matching Service",
        "Pricing calculated → Pricing Service",
        "Notifications sent → Notification Service",
        "Ride tracking and updates → Real-time updates"
      ]
    },
    scalability: [
      "Microservices architecture for independent scaling",
      "Geographic sharding for location-based data",
      "Real-time data processing with Apache Kafka",
      "Caching for frequently accessed data",
      "Load balancing across multiple regions",
      "Auto-scaling based on demand patterns"
    ],
    technologies: [
      "Backend: Go, Java, or Python microservices",
      "Database: PostgreSQL for transactional data, Redis for caching",
      "Message Queue: Apache Kafka for real-time events",
      "Matching Algorithm: Machine learning and optimization algorithms",
      "Maps API: Google Maps or Mapbox for routing",
      "Real-time: WebSockets for live updates"
    ]
  }
};

export default function DeepDivePage({ params }: { params: { slug: string } }) {
  const [deepDive, setDeepDive] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const { exportPdf, isGenerating } = usePdfExport({
    elementId: 'deep-dive-content',
    filename: `${params.slug}-deep-dive.pdf`,
  });

  const handleShare = () => {
    const url = window.location.href;
    const title = `I just completed the ${deepDive?.title} Deep Dive on Monchee 🚀`;
    const summary = deepDive?.problemStatement || '';
    const source = 'Monchee.com';
    shareToLinkedIn(url, title, summary, source);
  };

  const handleComplete = async () => {
    // In a real app, this would call an API to mark the deep dive as completed
    setIsCompleted(true);
    // You could also call the deep dive completion API here
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const data = deepDives[params.slug as keyof typeof deepDives];
      if (data) {
        setDeepDive(data);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params.slug]);

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="text-lg">Loading deep dive...</div>
        </div>
      </div>
    );
  }

  if (!deepDive) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Deep Dive Not Found</h1>
          <p className="text-gray-600">The deep dive you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight gradient-text mb-4">
          {deepDive.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {deepDive.problemStatement}
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={exportPdf} disabled={isGenerating}>
            {isGenerating ? 'Generating PDF...' : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share to LinkedIn
          </Button>
        </div>
      </section>

      <Card className="mb-8" id="deep-dive-content">
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Problem Statement */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="h-6 w-6 text-red-500" />
                Problem Statement
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {deepDive.problemStatement}
              </p>
            </div>

            {/* Background */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-500" />
                Background
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {deepDive.background}
              </p>
            </div>

            {/* Challenges */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                Key Challenges
              </h3>
              <ul className="space-y-2">
                {deepDive.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Code className="h-6 w-6 text-purple-500" />
                System Architecture
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-3">Components</h4>
                  <ul className="space-y-2">
                    {deepDive.architecture.components.map((component: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className="text-gray-700">{component}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-3">Data Flow</h4>
                  <ul className="space-y-2">
                    {deepDive.architecture.dataFlow.map((flow: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">→</span>
                        <span className="text-gray-700">{flow}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Scalability */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Scalability Considerations</h3>
              <ul className="space-y-2">
                {deepDive.scalability.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Technology Stack</h3>
              <ul className="space-y-2">
                {deepDive.technologies.map((tech: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagram */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">System Architecture Diagram</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mermaid">
                  {`graph TD
                    User[User] --> App[Mobile App]
                    App --> API[API Gateway]
                    API --> Auth[Auth Service]
                    API --> Feed[Feed Service]
                    Feed --> Cache[(Redis Cache)]
                    Feed --> DB[(Database)]
                    Feed --> Queue[Message Queue]
                    Queue --> Notif[Notification Service]`}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <Button 
          onClick={handleComplete}
          disabled={isCompleted}
          className={isCompleted ? "bg-green-600" : ""}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Read
            </>
          )}
        </Button>
      </div>

      {/* Notes Section */}
      <NotesSection 
        type="deep-dive" 
        ref={params.slug} 
        title={deepDive.title}
      />

      {/* Discussions Section */}
      <DiscussionsSection 
        type="deep-dive" 
        ref={params.slug} 
        title={deepDive.title}
      />
    </div>
  );
}
