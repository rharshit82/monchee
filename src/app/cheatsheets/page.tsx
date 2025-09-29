import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const cheatsheets = [
  {
    slug: "caching-patterns",
    title: "Caching Patterns",
    description: "Essential caching strategies, eviction policies, and distributed caching patterns for system design interviews and production systems.",
    image: "https://placehold.co/600x400",
    topics: ["Cache-Aside", "Write-Through", "Write-Behind", "CDN", "Redis"],
    difficulty: "Intermediate"
  },
  {
    slug: "database-trade-offs",
    title: "Database Trade-offs",
    description: "ACID vs BASE, CAP theorem, and choosing the right database for your use case. Quick reference for technical interviews.",
    image: "https://placehold.co/600x400",
    topics: ["ACID", "BASE", "CAP Theorem", "SQL vs NoSQL"],
    difficulty: "Beginner"
  }
];

export default function CheatsheetsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Cheatsheets
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Quick reference guides for common system design concepts.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>2 comprehensive guides available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cheatsheets Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cheatsheets.map((cheatsheet) => (
              <Card key={cheatsheet.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={cheatsheet.image}
                    alt={cheatsheet.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                      {cheatsheet.difficulty}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                    {cheatsheet.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed mb-4">
                    {cheatsheet.description}
                  </CardDescription>
                  
                  {/* Topics Tags */}
                  <div className="flex flex-wrap gap-1">
                    {cheatsheet.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button asChild className="w-full group">
                    <Link href={`/cheatsheets/${cheatsheet.slug}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Cheatsheet
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
            Need a specific cheatsheet?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Request a cheatsheet for any system design concept and we'll create it for the community.
          </p>
          <Button size="lg" variant="outline">
            <Download className="mr-2 h-5 w-5" />
            Request Cheatsheet
          </Button>
        </div>
      </section>
    </div>
  );
}
