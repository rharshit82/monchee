"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportCheatsheetPDF } from "@/lib/pdf-export";
import { shareToLinkedIn } from "@/lib/linkedin-share";
import { Share2 } from "lucide-react";
import mermaid from "mermaid";
import NotesSection from "@/components/notes-section";
import PDFExportButton from "@/components/pdf-export-button";

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
          "Enables better user experience with faster response times",
          "Reduces bandwidth usage and server load",
          "Provides resilience during database outages"
        ]
      },
      "cache-placement": {
        title: "Cache Placement Patterns",
        content: [
          "Client-Side Cache: Browser cache, mobile app cache for static assets",
          "CDN/Edge Cache: Cloudflare, Akamai for global content distribution",
          "Reverse Proxy Cache: Nginx, Varnish for dynamic content caching",
          "Application Cache: Redis, Memcached for application data",
          "Database Query Cache: Internal database caches for query results",
          "Distributed Cache: Hazelcast, Ignite for multi-node caching"
        ]
      },
      "invalidation": {
        title: "Cache Invalidation Strategies",
        content: [
          "Write-Through: Write to cache and database simultaneously",
          "Write-Behind: Write to cache first, then batch write to database",
          "Write-Around: Write directly to database, bypassing cache",
          "Cache-Aside: Application manages cache, lazy loading pattern",
          "TTL-based: Time-to-live expiration for automatic invalidation",
          "Event-driven: Invalidate based on database change events"
        ]
      },
      "pitfalls": {
        title: "Common Pitfalls",
        content: [
          "Cache Stampede: Multiple requests miss cache simultaneously",
          "Stale Data: Serving outdated information to users",
          "Memory Leaks: Not properly evicting old cache entries",
          "Inconsistent Invalidation: Partial cache invalidation failures",
          "Over-caching: Caching data that changes frequently",
          "Under-caching: Not caching data that would benefit from it"
        ]
      },
      "best-practices": {
        title: "Best Practices",
        content: [
          "Set appropriate TTL values based on data volatility",
          "Use cache warming to pre-populate frequently accessed data",
          "Implement circuit breakers for cache failures",
          "Monitor cache hit rates and adjust strategies accordingly",
          "Use consistent hashing for distributed cache sharding",
          "Implement graceful degradation when cache is unavailable"
        ]
      }
    }
  },
  "database-trade-offs": {
    title: "Database Trade-offs",
    description: "Key considerations when choosing database technologies.",
    sections: {
      "acid-vs-base": {
        title: "ACID vs BASE",
        content: [
          "ACID: Atomicity, Consistency, Isolation, Durability",
          "BASE: Basically Available, Soft state, Eventual consistency",
          "ACID: Strong consistency, complex transactions",
          "BASE: High availability, eventual consistency",
          "ACID: Traditional RDBMS (PostgreSQL, MySQL)",
          "BASE: NoSQL databases (MongoDB, Cassandra)"
        ]
      },
      "sql-vs-nosql": {
        title: "SQL vs NoSQL",
        content: [
          "SQL: Structured data, ACID compliance, complex queries",
          "NoSQL: Flexible schema, horizontal scaling, simple queries",
          "SQL: Better for complex relationships and transactions",
          "NoSQL: Better for high-volume, simple operations",
          "SQL: PostgreSQL, MySQL, SQL Server",
          "NoSQL: MongoDB, Cassandra, DynamoDB, Redis"
        ]
      },
      "consistency-models": {
        title: "Consistency Models",
        content: [
          "Strong Consistency: All nodes see updates immediately",
          "Eventual Consistency: System becomes consistent over time",
          "Weak Consistency: No guarantees about consistency timing",
          "Causal Consistency: Causally related operations are consistent",
          "Session Consistency: Consistency within a user session",
          "Monotonic Consistency: Reads never return older data"
        ]
      }
    }
  },
  "consistency-models": {
    title: "Consistency Models",
    description: "Understanding different consistency guarantees in distributed systems.",
    sections: {
      "strong-consistency": {
        title: "Strong Consistency",
        content: [
          "All nodes see the same data at the same time",
          "Immediate consistency across all replicas",
          "Higher latency due to synchronization requirements",
          "Examples: Financial systems, inventory management",
          "Trade-off: Highest consistency, lowest performance",
          "Suitable for systems where data accuracy is critical"
        ]
      },
      "eventual-consistency": {
        title: "Eventual Consistency",
        content: [
          "System will become consistent over time",
          "Temporary inconsistency is acceptable",
          "Better performance and availability",
          "Examples: DNS, social media feeds",
          "Trade-off: Good performance, eventual accuracy",
          "Suitable for systems where temporary inconsistency is acceptable"
        ]
      },
      "weak-consistency": {
        title: "Weak Consistency",
        content: [
          "No guarantees about when updates will be visible",
          "System may never become consistent",
          "Used when consistency is not critical",
          "Examples: Web caching, real-time systems",
          "Trade-off: Highest performance, lowest consistency",
          "Suitable for systems where performance is paramount"
        ]
      },
      "cap-theorem": {
        title: "CAP Theorem Trade-offs",
        content: [
          "Consistency: All nodes see the same data simultaneously",
          "Availability: System remains operational at all times",
          "Partition Tolerance: System continues despite network failures",
          "Can only guarantee 2 out of 3 properties",
          "CP Systems: Consistency + Partition Tolerance (e.g., MongoDB)",
          "AP Systems: Availability + Partition Tolerance (e.g., Cassandra)"
        ]
      }
    }
  }
};

function getMermaidDiagram(slug: string): string {
  switch (slug) {
    case "caching-patterns":
      return `
graph TD
    User[Client] --> CDN[CDN/Edge Cache]
    CDN --> App[App Server]
    App --> Redis[Redis Cache]
    App --> DB[(Database)]
    
    subgraph "Cache Layers"
        CDN
        Redis
        DB
    end
    
    style CDN fill:#e3f2fd
    style Redis fill:#f1f8e9
    style DB fill:#fff3e0
      `;
    case "database-trade-offs":
      return `
graph TD
    subgraph "ACID Properties"
        A[Atomicity]
        C[Consistency]
        I[Isolation]
        D[Durability]
    end
    
    subgraph "BASE Properties"
        BA[Basically Available]
        S[Soft State]
        E[Eventual Consistency]
    end
    
    style A fill:#e3f2fd
    style BA fill:#f1f8e9
      `;
    case "consistency-models":
      return `
graph TD
    subgraph "Consistency Levels"
        SC[Strong Consistency]
        EC[Eventual Consistency]
        WC[Weak Consistency]
    end
    
    subgraph "CAP Theorem"
        C[Consistency]
        A[Availability]
        P[Partition Tolerance]
    end
    
    style SC fill:#ffebee
    style EC fill:#e8f5e8
    style WC fill:#fff3e0
      `;
    default:
      return "";
  }
}

export default function CheatsheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const [cheatsheet, setCheatsheet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleExportPDF = () => {
    if (!cheatsheet) return;
    
    const content = {
      whyItMatters: cheatsheet.sections["why-caching"]?.content.join(" ") || "Caching is crucial for system performance and scalability.",
      placementPatterns: cheatsheet.sections["cache-placement"]?.content || [],
      invalidationStrategies: cheatsheet.sections["invalidation"]?.content || [],
      pitfalls: cheatsheet.sections["pitfalls"]?.content || [],
      bestPractices: cheatsheet.sections["best-practices"]?.content || []
    };
    
    exportCheatsheetPDF({
      title: cheatsheet.title,
      description: cheatsheet.description,
      content,
      username: "user" // In a real app, get from auth
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    const title = `I just completed the ${cheatsheet?.title} Cheatsheet on Monchee 🚀`;
    const summary = cheatsheet?.description || '';
    const source = 'Monchee.com';
    shareToLinkedIn(url, title, summary, source);
  };

  useEffect(() => {
    const loadCheatsheet = async () => {
      const { slug } = await params;
      setLoading(true);
      // Simulate loading
      const timer = setTimeout(() => {
        const data = cheatsheets[slug as keyof typeof cheatsheets];
        if (data) {
          setCheatsheet(data);
          mermaid.initialize({ startOnLoad: true });
        }
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    };
    
    loadCheatsheet();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading cheatsheet...</div>
        </div>
      </div>
    );
  }

  if (!cheatsheet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Cheatsheet not found</div>
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {cheatsheet.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {cheatsheet.description}
                </p>
              </div>
              <div className="flex gap-2">
                <PDFExportButton onExport={handleExportPDF} />
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {Object.entries(cheatsheet.sections).map(([key, section]: [string, any]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Mermaid Diagram */}
            {getMermaidDiagram(cheatsheet.title.toLowerCase().replace(/\s+/g, '-')) && (
              <Card>
                <CardHeader>
                  <CardTitle>Visual Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mermaid">
                    {getMermaidDiagram(cheatsheet.title.toLowerCase().replace(/\s+/g, '-'))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes Section */}
            <NotesSection 
              type="cheatsheet" 
              title={cheatsheet.title}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
