import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, MessageSquare, Zap, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

const concepts = [
  {
    slug: "sharding",
    title: "Sharding",
    description: "Database partitioning technique that splits data into smaller, manageable pieces for horizontal scaling.",
    icon: Database,
    difficulty: "Intermediate",
    category: "Database"
  },
  {
    slug: "message-queues",
    title: "Message Queues",
    description: "Asynchronous communication pattern for decoupling services and handling high-volume data processing.",
    icon: MessageSquare,
    difficulty: "Beginner",
    category: "Communication"
  },
  {
    slug: "cap-theorem",
    title: "CAP Theorem",
    description: "Fundamental trade-off between Consistency, Availability, and Partition tolerance in distributed systems.",
    icon: Zap,
    difficulty: "Advanced",
    category: "Theory"
  }
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Knowledge Library
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Core infrastructure concepts explained simply.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <BookOpen className="h-4 w-4" />
              <span>3 core concepts available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {concepts.map((concept) => (
              <Card key={concept.slug} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <concept.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {concept.title}
                  </CardTitle>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {concept.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {concept.difficulty}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {concept.description}
                  </CardDescription>
                </CardContent>
                
                <CardFooter>
                  <Button asChild className="w-full group">
                    <Link href={`/library/${concept.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to contribute a concept?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Help expand our knowledge library by contributing explanations of core infrastructure concepts.
          </p>
          <Button size="lg" variant="outline">
            <BookOpen className="mr-2 h-5 w-5" />
            Submit Concept
          </Button>
        </div>
      </section>
    </div>
  );
}
