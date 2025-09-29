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
const labs = {
  "rate-limiter": {
    title: "Rate Limiter",
    description: "Implement a rate limiter that restricts the number of requests a user can make within a given time window.",
    problemStatement: "Design and implement a rate limiter that can handle 100 requests per minute per user in a distributed environment. The system should be scalable, fault-tolerant, and provide real-time rate limiting decisions.",
    background: "Rate limiting is crucial for protecting backend resources from abuse, ensuring fair usage among users, and maintaining system stability. Popular services like Twitter, Stripe, and GitHub use rate limiting to protect their APIs.",
    requirements: {
      functional: [
        "Allow 100 requests per minute per user (configurable)",
        "Block further requests after limit is reached",
        "Reset counter after time window expires",
        "Support multiple rate limiting strategies"
      ],
      nonFunctional: [
        "Must work in distributed environments (multiple servers)",
        "Handle high throughput (millions of requests per second)",
        "Low latency for rate limiting decisions (< 10ms)",
        "Fault-tolerant and highly available"
      ]
    },
    hints: [
      "Consider sliding window vs fixed window algorithms",
      "Use Redis for distributed state management",
      "Think about token bucket vs leaky bucket algorithms",
      "Consider using consistent hashing for load distribution"
    ],
    deliverables: [
      "Working implementation in your preferred language",
      "Unit tests covering edge cases",
      "Integration tests for distributed scenarios",
      "Performance benchmarks and load testing results",
      "Documentation explaining your design decisions"
    ],
    extensions: [
      "Add Redis for persistence across server restarts",
      "Implement different rate limiting strategies (sliding window, token bucket)",
      "Add monitoring and metrics for rate limiting decisions",
      "Support different rate limits for different user tiers",
      "Implement rate limiting for different API endpoints"
    ]
  },
  "url-shortener": {
    title: "URL Shortener",
    description: "Build a URL shortener service like bit.ly that can handle millions of URLs and redirects.",
    problemStatement: "Design a URL shortener service that can convert long URLs into short, shareable links and handle millions of redirects per day.",
    background: "URL shorteners are essential for social media, marketing campaigns, and analytics. They need to be fast, reliable, and scalable to handle massive traffic.",
    requirements: {
      functional: [
        "Convert long URLs to short URLs",
        "Redirect short URLs to original URLs",
        "Handle custom short URLs",
        "Track click analytics"
      ],
      nonFunctional: [
        "Handle millions of URLs and redirects",
        "Low latency for redirects (< 100ms)",
        "High availability (99.9% uptime)",
        "Scalable to handle traffic spikes"
      ]
    },
    hints: [
      "Use base62 encoding for short URLs",
      "Consider using a counter or hash-based approach",
      "Use a CDN for global redirect performance",
      "Think about database sharding for scale"
    ],
    deliverables: [
      "Working URL shortener service",
      "API for creating and managing short URLs",
      "Analytics dashboard for click tracking",
      "Load testing results and performance metrics"
    ],
    extensions: [
      "Add custom domain support",
      "Implement URL expiration and password protection",
      "Add bulk URL shortening capabilities",
      "Implement click analytics and reporting"
    ]
  }
};

export default function LabDetailPage({ params }: { params: { slug: string } }) {
  const [lab, setLab] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const { exportPdf, isGenerating } = usePdfExport({
    elementId: 'lab-report-content',
    filename: `${params.slug}-lab-report.pdf`,
  });

  const handleShare = () => {
    const url = window.location.href;
    const title = `I just completed the ${lab?.title} Lab on Monchee 🚀`;
    const summary = lab?.problemStatement || '';
    const source = 'Monchee.com';
    shareToLinkedIn(url, title, summary, source);
  };

  const handleComplete = async () => {
    // In a real app, this would call an API to mark the lab as completed
    setIsCompleted(true);
    // You could also call the lab completion API here
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const data = labs[params.slug as keyof typeof labs];
      if (data) {
        setLab(data);
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
          <div className="text-lg">Loading lab...</div>
        </div>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lab Not Found</h1>
          <p className="text-gray-600">The lab you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight gradient-text mb-4">
          {lab.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {lab.problemStatement}
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={exportPdf} disabled={isGenerating}>
            {isGenerating ? 'Generating PDF...' : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share to LinkedIn
          </Button>
        </div>
      </section>

      <Card className="mb-8" id="lab-report-content">
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Problem Statement */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="h-6 w-6 text-red-500" />
                Problem Statement
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {lab.problemStatement}
              </p>
            </div>

            {/* Background */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-500" />
                Background
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {lab.background}
              </p>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Requirements
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-3">Functional Requirements</h4>
                  <ul className="space-y-2">
                    {lab.requirements.functional.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-3">Non-Functional Requirements</h4>
                  <ul className="space-y-2">
                    {lab.requirements.nonFunctional.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Hints & Resources */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                Hints & Resources
              </h3>
              <ul className="space-y-2">
                {lab.hints.map((hint: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">💡</span>
                    <span className="text-gray-700">{hint}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Code className="h-6 w-6 text-purple-500" />
                Deliverables
              </h3>
              <ul className="space-y-2">
                {lab.deliverables.map((deliverable: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extensions */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Extensions (Stretch Goals)</h3>
              <ul className="space-y-2">
                {lab.extensions.map((extension: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">🚀</span>
                    <span className="text-gray-700">{extension}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagram */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Architecture Diagram</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mermaid">
                  {`graph TD
                    Client[Client Requests] --> API[API Gateway]
                    API --> RL[Rate Limiter Service]
                    RL --> Redis[(Redis Store)]
                    RL --> ALLOW[Allow/Block Response]`}
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
              Mark as Completed
            </>
          )}
        </Button>
      </div>

      {/* Notes Section */}
      <NotesSection 
        type="lab" 
        ref={params.slug} 
        title={lab.title}
      />

      {/* Discussions Section */}
      <DiscussionsSection 
        type="lab" 
        ref={params.slug} 
        title={lab.title}
      />
    </div>
  );
}
