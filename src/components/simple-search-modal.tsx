"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { 
  Search, 
  BookOpen, 
  Code, 
  Brain, 
  Target, 
  Users,
  FileText,
  X
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'deep-dive' | 'cheatsheet' | 'library' | 'lab' | 'user';
  slug: string;
  category?: string;
}

// Mock search data
const searchData: SearchResult[] = [
  // Deep Dives
  {
    id: "1",
    title: "Instagram Feed",
    description: "How Instagram's feed algorithm works and scales to millions of users",
    type: "deep-dive",
    slug: "instagram-feed",
    category: "Social Media"
  },
  {
    id: "2",
    title: "Uber Dispatch",
    description: "Real-time driver-rider matching system architecture",
    type: "deep-dive",
    slug: "uber-dispatch",
    category: "Transportation"
  },
  {
    id: "3",
    title: "Netflix Streaming",
    description: "Content delivery and adaptive streaming at scale",
    type: "deep-dive",
    slug: "netflix-streaming",
    category: "Media"
  },
  
  // Cheatsheets
  {
    id: "4",
    title: "Caching Patterns",
    description: "Write-through, write-behind, and cache-aside patterns",
    type: "cheatsheet",
    slug: "caching-patterns",
    category: "Performance"
  },
  {
    id: "5",
    title: "Database Trade-offs",
    description: "SQL vs NoSQL, ACID vs BASE, consistency models",
    type: "cheatsheet",
    slug: "database-tradeoffs",
    category: "Data"
  },
  {
    id: "6",
    title: "Consistency Models",
    description: "Strong, eventual, and causal consistency explained",
    type: "cheatsheet",
    slug: "consistency-models",
    category: "Distributed Systems"
  },
  
  // Library Concepts
  {
    id: "7",
    title: "Sharding",
    description: "Horizontal partitioning strategies for databases",
    type: "library",
    slug: "sharding",
    category: "Scalability"
  },
  {
    id: "8",
    title: "Message Queues",
    description: "Asynchronous communication patterns and queuing systems",
    type: "library",
    slug: "message-queues",
    category: "Messaging"
  },
  {
    id: "9",
    title: "CAP Theorem",
    description: "Consistency, Availability, and Partition tolerance trade-offs",
    type: "library",
    slug: "cap-theorem",
    category: "Distributed Systems"
  },
  {
    id: "10",
    title: "Load Balancing",
    description: "Traffic distribution strategies and algorithms",
    type: "library",
    slug: "load-balancing",
    category: "Infrastructure"
  },
  {
    id: "11",
    title: "Indexing",
    description: "Database indexing strategies and optimization",
    type: "library",
    slug: "indexing",
    category: "Performance"
  },
  
  // Labs
  {
    id: "12",
    title: "Build a Rate Limiter",
    description: "Implement a distributed rate limiter for API protection",
    type: "lab",
    slug: "rate-limiter",
    category: "Intermediate"
  },
  {
    id: "13",
    title: "Build a URL Shortener",
    description: "Create a scalable service to shorten long URLs",
    type: "lab",
    slug: "url-shortener",
    category: "Beginner"
  },
  {
    id: "14",
    title: "Build a Message Queue",
    description: "Design and implement a reliable message queuing system",
    type: "lab",
    slug: "message-queue",
    category: "Advanced"
  },
  
  // Users
  {
    id: "15",
    title: "Alex Chen",
    description: "System Design Expert • Level 5 • 7 day streak",
    type: "user",
    slug: "systemdesigner",
    category: "Community"
  },
  {
    id: "16",
    title: "Sarah Kim",
    description: "Scalability Architect • Level 5 • 5 day streak",
    type: "user",
    slug: "scalearchitect",
    category: "Community"
  },
  {
    id: "17",
    title: "Mike Johnson",
    description: "Distributed Systems Developer • Level 4 • 3 day streak",
    type: "user",
    slug: "distributeddev",
    category: "Community"
  }
];

interface SimpleSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SimpleSearchModal({ open, onOpenChange }: SimpleSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category?.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deep-dive": return <BookOpen className="h-4 w-4" />;
      case "cheatsheet": return <FileText className="h-4 w-4" />;
      case "library": return <Brain className="h-4 w-4" />;
      case "lab": return <Code className="h-4 w-4" />;
      case "user": return <Users className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deep-dive": return "bg-blue-100 text-blue-800";
      case "cheatsheet": return "bg-green-100 text-green-800";
      case "library": return "bg-purple-100 text-purple-800";
      case "lab": return "bg-orange-100 text-orange-800";
      case "user": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deep-dive": return "Deep Dive";
      case "cheatsheet": return "Cheatsheet";
      case "library": return "Library";
      case "lab": return "Lab";
      case "user": return "User";
      default: return "Unknown";
    }
  };

  const handleSelect = (result: SearchResult) => {
    let path = "";
    
    switch (result.type) {
      case "deep-dive":
        path = `/deep-dives/${result.slug}`;
        break;
      case "cheatsheet":
        path = `/cheatsheets/${result.slug}`;
        break;
      case "library":
        path = `/library/${result.slug}`;
        break;
      case "lab":
        path = `/labs/${result.slug}`;
        break;
      case "user":
        path = `/profile/${result.slug}`;
        break;
    }
    
    router.push(path);
    onOpenChange(false);
    setQuery("");
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-16">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Monchee
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Input
            ref={inputRef}
            placeholder="Search deep dives, cheatsheets, labs, users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12"
          />
          
          <div className="max-h-96 overflow-y-auto">
            {query && results.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No results found for "{query}"
              </div>
            )}
            
            {Object.entries(groupedResults).map(([type, items]) => (
              <div key={type} className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {getTypeLabel(type)}
                </h3>
                <div className="space-y-1">
                  {items.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium truncate">{result.title}</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getTypeColor(result.type)}`}
                          >
                            {result.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {!query && (
              <div className="p-6 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium mb-2">Search Monchee</p>
                <p className="text-sm">
                  Find deep dives, cheatsheets, labs, and connect with other learners
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Deep Dives
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    Cheatsheets
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Brain className="h-3 w-3 mr-1" />
                    Library
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Code className="h-3 w-3 mr-1" />
                    Labs
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    Users
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
