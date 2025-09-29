import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const deepDives = [
  {
    slug: "instagram-feed",
    title: "Instagram Feed",
    description: "Learn how to design a scalable photo sharing system with real-time updates, content delivery networks, and efficient data storage strategies for millions of users.",
    image: "https://placehold.co/600x400",
    difficulty: "Intermediate",
    readTime: "15 min read"
  },
  {
    slug: "uber-dispatch",
    title: "Uber Dispatch",
    description: "Design a ride-sharing system that efficiently matches drivers with riders in real-time, handling geolocation data, surge pricing, and optimal route calculations.",
    image: "https://placehold.co/600x400",
    difficulty: "Advanced",
    readTime: "20 min read"
  },
  {
    slug: "netflix-streaming",
    title: "Netflix Streaming",
    description: "Build a video streaming platform with global content delivery, recommendation systems, adaptive bitrate streaming, and massive scale infrastructure.",
    image: "https://placehold.co/600x400",
    difficulty: "Expert",
    readTime: "25 min read"
  }
];

export default function DeepDivesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Deep Dives
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Detailed breakdowns of real-world systems with diagrams, trade-offs, and interview takeaways.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <BookOpen className="h-4 w-4" />
              <span>3 comprehensive guides available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dives Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deepDives.map((dive) => (
              <Card key={dive.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dive.image}
                    alt={dive.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {dive.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                      {dive.readTime}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {dive.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {dive.description}
                  </CardDescription>
                </CardContent>
                
                <CardFooter>
                  <Button asChild className="w-full group">
                    <Link href={`/deep-dives/${dive.slug}`}>
                      Read More
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
            Want to contribute a deep dive?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your system design expertise with the community and help others learn from real-world experiences.
          </p>
          <Button size="lg" variant="outline">
            Submit Your Deep Dive
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
