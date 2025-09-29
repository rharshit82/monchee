import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, User, ExternalLink, Database, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app, this would come from a CMS or database
const conceptsData = {
  "sharding": {
    title: "Sharding",
    subtitle: "Database partitioning technique for horizontal scaling",
    icon: Database,
    difficulty: "Intermediate",
    category: "Database",
    readTime: "12 min read",
    author: "System Design Team",
    publishedDate: "Dec 22, 2024"
  },
  "message-queues": {
    title: "Message Queues",
    subtitle: "Asynchronous communication pattern for decoupling services",
    icon: MessageSquare,
    difficulty: "Beginner",
    category: "Communication",
    readTime: "10 min read",
    author: "System Design Team",
    publishedDate: "Dec 20, 2024"
  },
  "cap-theorem": {
    title: "CAP Theorem",
    subtitle: "Consistency, Availability, and Partition tolerance trade-offs",
    icon: Zap,
    difficulty: "Advanced",
    category: "Theory",
    readTime: "15 min read",
    author: "System Design Team",
    publishedDate: "Dec 18, 2024"
  }
};

interface LibraryPageProps {
  params: {
    slug: string;
  };
}

export default function LibraryPage({ params }: LibraryPageProps) {
  const concept = conceptsData[params.slug as keyof typeof conceptsData];
  
  if (!concept) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/library" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <concept.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {concept.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {concept.subtitle}
                </p>
              </div>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                  {concept.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                  {concept.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{concept.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {concept.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{concept.publishedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {params.slug === "sharding" ? (
              <ShardingContent />
            ) : (
              <PlaceholderContent title={concept.title} />
            )}

            {/* Related Concepts */}
            <RelatedConcepts currentSlug={params.slug} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ShardingContent() {
  return (
    <div className="space-y-8">
      {/* Definition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Definition</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Sharding</strong> is a database partitioning technique that splits data into smaller, 
            more manageable pieces called shards. Each shard contains a subset of the data and can be 
            stored on different servers, enabling horizontal scaling of database systems.
          </p>
        </CardContent>
      </Card>

      {/* Why It's Used */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Why It's Used</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Scale Horizontally</h3>
              <p className="text-green-800 text-sm">Add more servers instead of upgrading single machine</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Avoid Bottlenecks</h3>
              <p className="text-blue-800 text-sm">Distribute load across multiple database instances</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Improve Performance</h3>
              <p className="text-purple-800 text-sm">Smaller datasets mean faster queries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Common Strategies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="font-semibold text-blue-900 mb-2">Range-Based Sharding</h3>
              <p className="text-blue-800 text-sm mb-2">Partition data based on value ranges (e.g., user ID ranges)</p>
              <p className="text-blue-700 text-xs">Example: Users 1-1000 in Shard 1, 1001-2000 in Shard 2</p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h3 className="font-semibold text-green-900 mb-2">Hash-Based Sharding</h3>
              <p className="text-green-800 text-sm mb-2">Use hash function to determine shard (modulus of key)</p>
              <p className="text-green-700 text-xs">Example: hash(user_id) % 3 determines which shard</p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <h3 className="font-semibold text-purple-900 mb-2">Geo-Based Sharding</h3>
              <p className="text-purple-800 text-sm mb-2">Partition by geographic location for data locality</p>
              <p className="text-purple-700 text-xs">Example: US users in US shard, EU users in EU shard</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Challenges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Rebalancing Shards</h3>
                <p className="text-gray-600 text-sm">Data grows unevenly, requiring redistribution of data across shards</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Cross-Shard Queries</h3>
                <p className="text-gray-600 text-sm">Joins across multiple shards are complex and slow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Hotspot Shards</h3>
                <p className="text-gray-600 text-sm">Uneven distribution can create overloaded shards</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Architecture Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sharding Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-center text-gray-600 mb-4">
              <p className="text-sm italic">Typical sharding setup with shard router</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-center font-medium">Application</div>
              </div>
              <div className="text-gray-400">↓</div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-center font-medium">Shard Router</div>
                <div className="text-xs text-gray-500">(Determines which shard)</div>
              </div>
              <div className="text-gray-400">↓</div>
              <div className="flex space-x-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-center font-medium">DB Shard 1</div>
                  <div className="text-xs text-gray-500">(Users 1-1000)</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-center font-medium">DB Shard 2</div>
                  <div className="text-xs text-gray-500">(Users 1001-2000)</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-center font-medium">DB Shard 3</div>
                  <div className="text-xs text-gray-500">(Users 2001-3000)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-World Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Real-World Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">MongoDB Auto-Sharding</h3>
              <p className="text-blue-800 text-sm">Automatically distributes data across multiple shards based on shard key</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Twitter's Snowflake ID</h3>
              <p className="text-green-800 text-sm">Uses timestamp-based IDs to distribute writes across time-based shards</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Instagram's User Sharding</h3>
              <p className="text-purple-800 text-sm">Shards user data by user ID ranges for horizontal scaling</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          This concept is currently under development. Check back soon for comprehensive content!
        </p>
      </CardContent>
    </Card>
  );
}

function RelatedConcepts({ currentSlug }: { currentSlug: string }) {
  const relatedConcepts = [
    {
      slug: "message-queues",
      title: "Message Queues",
      description: "Learn about asynchronous communication patterns",
      icon: MessageSquare
    },
    {
      slug: "cap-theorem",
      title: "CAP Theorem",
      description: "Understand consistency vs availability trade-offs",
      icon: Zap
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Related Concepts</CardTitle>
        <CardDescription>
          Explore other core infrastructure concepts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedConcepts.map((concept) => (
            <Link
              key={concept.slug}
              href={`/library/${concept.slug}`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <concept.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {concept.title}
                  </h3>
                  <p className="text-sm text-gray-600">{concept.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
