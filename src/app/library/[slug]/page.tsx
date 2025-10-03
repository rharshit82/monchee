"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, User, ExternalLink, Database, MessageSquare, Zap, Loader, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import mermaid from "mermaid";

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
    publishedDate: "Dec 22, 2024",
    content: {
      definition: `Sharding is a method for distributing data across multiple machines (shards) to improve scalability and performance. Each shard holds a subset of the data, and together, all shards form the complete dataset.`,
      whyItMatters: `In system design, sharding is crucial for handling large datasets and high traffic loads that a single database server cannot manage. It enables horizontal scaling, distributing the load and storage requirements across many servers. In interviews, understanding sharding demonstrates knowledge of scalable database architectures.`,
      realWorldExamples: `
*   **MongoDB**: Supports sharding natively, allowing data to be distributed across a cluster of machines.
*   **Elasticsearch**: Uses sharding (called "indices" and "shards") to distribute and parallelize search operations.
*   **Large-scale web services**: Many large applications like social media platforms or e-commerce sites use sharding to manage user data or product catalogs.
`,
      diagram: `
graph TD
    Client --> LoadBalancer[Load Balancer]
    LoadBalancer --> Shard1[Shard 1 (Users A-M)]
    LoadBalancer --> Shard2[Shard 2 (Users N-Z)]
    Shard1 --> DB1[(Database 1)]
    Shard2 --> DB2[(Database 2)]
`,
      takeaway: `Sharding is a key technique for horizontal scaling of databases. It improves performance and availability but introduces complexity in data distribution, query routing, and rebalancing.`
    }
  },
  "message-queues": {
    title: "Message Queues",
    subtitle: "Asynchronous communication pattern for decoupling services",
    icon: MessageSquare,
    difficulty: "Beginner",
    category: "Communication",
    readTime: "10 min read",
    author: "System Design Team",
    publishedDate: "Dec 20, 2024",
    content: {
      definition: `A message queue is a form of asynchronous service-to-service communication used in serverless and microservices architectures. Messages are stored in a queue until they are processed and deleted. Each message is processed only once, by a single consumer.`,
      whyItMatters: `Message queues decouple services, allowing them to communicate without direct dependencies. This improves fault tolerance, scalability, and responsiveness. For interviews, it's essential to explain how message queues enable asynchronous processing and handle spikes in traffic.`,
      realWorldExamples: `
*   **Apache Kafka**: A distributed streaming platform used for building real-time data pipelines and streaming applications.
*   **RabbitMQ**: A popular open-source message broker that implements the Advanced Message Queuing Protocol (AMQP).
*   **Amazon SQS (Simple Queue Service)**: A fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.
`,
      diagram: `
graph TD
    Producer[Service A (Producer)] --> MQ[Message Queue]
    MQ --> Consumer1[Service B (Consumer)]
    MQ --> Consumer2[Service C (Consumer)]
`,
      takeaway: `Message queues are vital for building robust, scalable, and decoupled distributed systems. They handle asynchronous communication, buffer requests, and improve system resilience.`
    }
  },
  "cap-theorem": {
    title: "CAP Theorem",
    subtitle: "Consistency, Availability, and Partition tolerance trade-offs",
    icon: Zap,
    difficulty: "Advanced",
    category: "Theory",
    readTime: "15 min read",
    author: "System Design Team",
    publishedDate: "Dec 18, 2024",
    content: {
      definition: `The CAP theorem states that a distributed data store can only provide two of three guarantees: Consistency, Availability, and Partition tolerance. You must choose which one to sacrifice when a network partition occurs.`,
      whyItMatters: `CAP theorem is fundamental to designing distributed systems. It forces architects to make critical trade-offs based on application requirements. In interviews, discussing CAP theorem demonstrates a deep understanding of distributed system challenges.`,
      realWorldExamples: `
*   **CP Systems (Consistency & Partition Tolerance)**: Prioritize consistency, meaning data is always up-to-date across all nodes, even if it means some nodes become unavailable during a partition. Examples: Traditional RDBMS (when distributed), MongoDB (in certain configurations), Hbase.
*   **AP Systems (Availability & Partition Tolerance)**: Prioritize availability, meaning the system remains operational even during a partition, potentially serving stale data. Examples: Cassandra, DynamoDB, CouchDB.
`,
      diagram: `
graph TD
    subgraph CAP Theorem
        C[Consistency] --- A[Availability]
        A --- P[Partition Tolerance]
        P --- C
    end
    style C fill:#f9f,stroke:#333,stroke-width:2px
    style A fill:#bbf,stroke:#333,stroke-width:2px
    style P fill:#ccf,stroke:#333,stroke-width:2px
`,
      takeaway: `CAP theorem is a foundational concept for distributed systems. There's no "perfect" choice; the best approach depends on the specific needs of the application regarding data integrity versus continuous operation.`
    }
  },
  "load-balancing": {
    title: "Load Balancing",
    subtitle: "Distributing requests across multiple servers for better performance",
    icon: Loader,
    difficulty: "Beginner",
    category: "Infrastructure",
    readTime: "8 min read",
    author: "System Design Team",
    publishedDate: "Dec 15, 2024",
    content: {
      definition: `Load balancing is the process of distributing network traffic across multiple servers. This ensures no single server is overloaded, improving application responsiveness and availability.`,
      whyItMatters: `Load balancers are essential for scaling applications horizontally and ensuring high availability. They prevent single points of failure and optimize resource utilization. In interviews, explaining load balancing demonstrates an understanding of how to build resilient and performant systems.`,
      realWorldExamples: `
*   **DNS Load Balancing**: Distributes traffic by returning different IP addresses for a domain name.
*   **Hardware Load Balancers**: Dedicated physical devices (e.g., F5 BIG-IP).
*   **Software Load Balancers**: Nginx, HAProxy, or cloud-based solutions like AWS Elastic Load Balancing (ELB) or Google Cloud Load Balancing.
`,
      diagram: `
graph TD
    Client --> LoadBalancer[Load Balancer]
    LoadBalancer --> WebServer1[Web Server 1]
    LoadBalancer --> WebServer2[Web Server 2]
    LoadBalancer --> WebServer3[Web Server 3]
`,
      takeaway: `Load balancing is critical for distributing traffic, improving scalability, and ensuring high availability and fault tolerance in modern distributed systems.`
    }
  },
  "indexing": {
    title: "Database Indexing",
    subtitle: "Data structure optimization for faster database queries",
    icon: Search,
    difficulty: "Intermediate",
    category: "Database",
    readTime: "11 min read",
    author: "System Design Team",
    publishedDate: "Dec 12, 2024",
    content: {
      definition: `Database indexing is a data structuring technique used to quickly locate and access data in a database. Indexes are special lookup tables that the database search engine can use to speed up data retrieval.`,
      whyItMatters: `Indexing significantly improves the performance of read-heavy database operations by reducing the amount of data the database needs to scan. It's a crucial optimization technique in system design. In interviews, understanding indexing shows an appreciation for database internals and performance tuning.`,
      realWorldExamples: `
*   **B-Tree Indexes**: The most common type of index, used in relational databases like PostgreSQL, MySQL, and SQL Server.
*   **Hash Indexes**: Used for equality lookups, faster than B-trees for exact matches but not suitable for range queries.
*   **Full-Text Indexes**: Used for searching text within large text columns.
`,
      diagram: `
graph TD
    UserQuery[User Query] --> Database[Database]
    Database --> Index[Index (B-Tree)]
    Index --> DataPages[Data Pages]
    DataPages --> Result[Query Result]
`,
      takeaway: `Indexing is a powerful database optimization technique that speeds up data retrieval. While improving read performance, it adds overhead to write operations and consumes storage, requiring careful consideration.`
    }
  }
};

interface LibraryPageProps {
  params: Promise<{ slug: string }>;
}

export default function LibraryPage({ params }: LibraryPageProps) {
  const [concept, setConcept] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConcept = async () => {
      setLoading(true);
      // Simulate API call or data fetching
      const timer = setTimeout(async () => {
        const { slug } = await params;
        const data = conceptsData[slug as keyof typeof conceptsData];
        if (data) {
          setConcept(data);
          // Initialize Mermaid for diagrams
          mermaid.initialize({ startOnLoad: true });
        } else {
          notFound();
        }
        setLoading(false);
      }, 500); // Simulate network delay

      return () => clearTimeout(timer);
    };
    
    loadConcept();
  }, [params]);

  useEffect(() => {
    if (concept && concept.content.diagram) {
      mermaid.contentLoaded(); // Re-render mermaid diagrams if content changes
    }
  }, [concept]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading concept...</div>
        </div>
      </div>
    );
  }

  if (!concept) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <concept.icon className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              {concept.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {concept.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> {concept.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {concept.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {concept.publishedDate}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">{concept.category}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{concept.difficulty}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-sm prose prose-blue max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Definition</h2>
            <p className="text-gray-700 mb-6">{concept.content.definition}</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why it Matters</h2>
            <p className="text-gray-700 mb-6">{concept.content.whyItMatters}</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Examples</h2>
            <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: concept.content.realWorldExamples }} />

            {concept.content.diagram && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Diagram</h2>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-auto">
                  <pre className="mermaid text-sm">
                    {concept.content.diagram}
                  </pre>
                </div>
              </>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Takeaway for Interviews</h2>
            <p className="text-gray-700 mb-6">{concept.content.takeaway}</p>

            <div className="mt-10 flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/library">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
                </Link>
              </Button>
              <Button>
                Take Quiz <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
