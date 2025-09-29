import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const labs = [
  {
    slug: "rate-limiter",
    title: "Rate Limiter",
    description: "Implement a distributed rate limiter that restricts API requests per user within time windows.",
    image: "https://placehold.co/600x400",
    difficulty: "Intermediate",
    duration: "2-3 hours",
    concepts: ["Redis", "Distributed Systems", "API Design"]
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    description: "Build a scalable URL shortening service with analytics and custom domains.",
    image: "https://placehold.co/600x400",
    difficulty: "Beginner",
    duration: "3-4 hours",
    concepts: ["Database Design", "Caching", "Analytics"]
  },
  {
    slug: "message-queue",
    title: "Message Queue",
    description: "Design and implement a reliable message queuing system with persistence and ordering.",
    image: "https://placehold.co/600x400",
    difficulty: "Advanced",
    duration: "4-5 hours",
    concepts: ["Message Queues", "Persistence", "Ordering"]
  }
];

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Case Labs
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Hands-on engineering challenges to apply system design concepts.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Code className="h-4 w-4" />
              <span>3 hands-on labs available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Labs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labs.map((lab) => (
              <Card key={lab.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={lab.image}
                    alt={lab.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">
                      {lab.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                      {lab.duration}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                    {lab.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed mb-4">
                    {lab.description}
                  </CardDescription>
                  
                  {/* Concepts Tags */}
                  <div className="flex flex-wrap gap-1">
                    {lab.concepts.map((concept, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button asChild className="w-full group">
                    <Link href={`/labs/${lab.slug}`}>
                      <Code className="mr-2 h-4 w-4" />
                      Start Lab
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
            Ready to build something amazing?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Apply your system design knowledge through hands-on coding challenges and real-world projects.
          </p>
          <Button size="lg" variant="outline">
            <Code className="mr-2 h-5 w-5" />
            View All Labs
          </Button>
        </div>
      </section>
    </div>
  );
}
