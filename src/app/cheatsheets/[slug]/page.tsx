"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { shareToLinkedIn } from "@/lib/linkedin-share";
import { Download, Share2 } from "lucide-react";
import mermaid from "mermaid";
import NotesSection from "@/components/notes-section";

// Mock data - in a real app, this would come from an API
const cheatsheets = {
  "caching-patterns": {
    title: "Caching Patterns",
    description: "Master different caching strategies and their trade-offs in distributed systems.",
    sections: {
      "why-caching": {
        title: "Why Caching Matters",
        content: [
          "Reduces latency by serving data from memory instead of disk",
          "Offloads database load, allowing it to handle more concurrent users",
          "Improves throughput and reduces infrastructure costs",
          "Enables better user experience with faster response times"
        ]
      },
      "cache-placement": {
        title: "Cache Placement Patterns",
        content: [
          "Client-Side Cache: Browser cache, mobile app cache",
          "CDN/Edge Cache: Cloudflare, Akamai for static content",
          "Reverse Proxy Cache: Nginx, Varnish for dynamic content",
          "Application Cache: Redis, Memcached for application data",
          "Database Query Cache: Internal database caches"
        ]
      },
      "invalidation": {
        title: "Cache Invalidation Strategies",
        content: [
          "Write-through: Write to cache and database simultaneously",
          "Write-behind: Write to cache first, then batch write to database",
          "Cache-aside: Application manages cache, loads on miss",
          "TTL-based: Time-to-live expiration for automatic invalidation"
        ]
      },
      "pitfalls": {
        title: "Common Pitfalls",
        content: [
          "Stale data: Serving outdated information to users",
          "Cache stampede: Multiple requests for same missing key",
          "Thundering herd: All requests hit database when cache expires",
          "Memory leaks: Not properly evicting old cache entries"
        ]
      },
      "best-practices": {
        title: "Best Practices",
        content: [
          "Set appropriate TTLs based on data freshness requirements",
          "Use cache warming for popular keys during low traffic",
          "Monitor hit/miss ratios to optimize cache effectiveness",
          "Implement circuit breakers for cache failures",
          "Use consistent hashing for distributed caches"
        ]
      }
    }
  },
  "database-trade-offs": {
    title: "Database Trade-offs",
    description: "Understand the fundamental trade-offs between different database types and when to use each.",
    sections: {
      "acid-vs-base": {
        title: "ACID vs BASE",
        content: [
          "ACID: Atomicity, Consistency, Isolation, Durability",
          "BASE: Basically Available, Soft state, Eventual consistency",
          "SQL databases prioritize ACID properties",
          "NoSQL databases often follow BASE principles"
        ]
      },
      "consistency-models": {
        title: "Consistency Models",
        content: [
          "Strong consistency: All reads get latest write",
          "Eventual consistency: System becomes consistent over time",
          "Weak consistency: No guarantee of consistency",
          "Choose based on application requirements"
        ]
      }
    }
  }
};

export default function CheatsheetPage({ params }: { params: { slug: string } }) {
  const [cheatsheet, setCheatsheet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { exportPdf, isGenerating } = usePdfExport({
    elementId: 'cheatsheet-content',
    filename: `${params.slug}-cheatsheet.pdf`,
  });

  const handleShare = () => {
    const url = window.location.href;
    const title = `I just completed the ${cheatsheet?.title} Cheatsheet on Monchee 🚀`;
    const summary = cheatsheet?.description || '';
    const source = 'Monchee.com';
    shareToLinkedIn(url, title, summary, source);
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const data = cheatsheets[params.slug as keyof typeof cheatsheets];
      if (data) {
        setCheatsheet(data);
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
          <div className="text-lg">Loading cheatsheet...</div>
        </div>
      </div>
    );
  }

  if (!cheatsheet) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cheatsheet Not Found</h1>
          <p className="text-gray-600">The cheatsheet you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight gradient-text mb-4">
          {cheatsheet.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {cheatsheet.description}
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

      <Card className="mb-8" id="cheatsheet-content">
        <CardContent className="p-6">
          <div className="space-y-8">
            {Object.entries(cheatsheet.sections).map(([key, section]: [string, any]) => (
              <div key={key} className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.content.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Mini Diagram</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mermaid">
                  {`graph TD
                    User[Client] --> CDN[CDN/Edge Cache]
                    CDN --> App[Application Server]
                    App --> Redis[Redis Cache]
                    App --> DB[(Database)]
                    Redis --> DB`}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <NotesSection 
        type="cheatsheet" 
        ref={params.slug} 
        title={cheatsheet.title}
      />
    </div>
  );
}
