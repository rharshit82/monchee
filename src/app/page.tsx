import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, BookOpen, Code, Users, FileText, Target, MessageCircle, ExternalLink, Trophy, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Learn System Design by{" "}
              <span className="gradient-text">Doing</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up">
              Deep dives, real-world projects, cheatsheets, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/learn">
                <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/labs">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Deep Dives Preview */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Deep Dives</h2>
                <p className="text-lg text-gray-600">Comprehensive guides on system design concepts</p>
              </div>
              <Link href="/deep-dives">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Instagram Feed",
                  slug: "instagram-feed",
                  description: "Learn how to design a scalable photo sharing system with real-time updates and content delivery.",
                  difficulty: "Intermediate"
                },
                {
                  title: "Uber Dispatch",
                  slug: "uber-dispatch",
                  description: "Design a ride-sharing system that efficiently matches drivers with riders in real-time.",
                  difficulty: "Advanced"
                },
                {
                  title: "Netflix Streaming",
                  slug: "netflix-streaming",
                  description: "Build a video streaming platform with global content delivery and recommendation systems.",
                  difficulty: "Expert"
                }
              ].map((dive, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{dive.title}</CardTitle>
                    <CardDescription className="text-sm text-blue-600 font-medium">
                      {dive.difficulty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{dive.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/deep-dives/${dive.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Link href="/deep-dives">
                <Button variant="outline">
                  View All Deep Dives
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Case Labs Preview */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Case Labs</h2>
                <p className="text-lg text-gray-600">Hands-on projects to apply your knowledge</p>
              </div>
              <Link href="/labs">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Rate Limiter",
                  slug: "rate-limiter",
                  description: "Implement a distributed rate limiting system using Redis and sliding window algorithms.",
                  duration: "2-3 hours"
                },
                {
                  title: "URL Shortener",
                  slug: "url-shortener",
                  description: "Build a scalable URL shortening service with analytics and custom domains.",
                  duration: "3-4 hours"
                },
                {
                  title: "Message Queue",
                  slug: "message-queue",
                  description: "Design and implement a reliable message queuing system with persistence and ordering.",
                  duration: "4-5 hours"
                }
              ].map((lab, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{lab.title}</CardTitle>
                    <CardDescription className="text-sm text-green-600 font-medium">
                      {lab.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{lab.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/labs/${lab.slug}`}>
                      <Button size="sm" className="w-full">
                        Start Lab
                        <Code className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Link href="/labs">
                <Button variant="outline">
                  View All Case Labs
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Cheatsheets Preview */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Cheatsheets</h2>
                <p className="text-lg text-gray-600">Quick reference guides for interviews</p>
              </div>
              <Link href="/cheatsheets">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Caching Patterns",
                  slug: "caching-patterns",
                  description: "Essential caching strategies, eviction policies, and distributed caching patterns.",
                  topics: ["Cache-Aside", "Write-Through", "Write-Behind", "LRU/LFU"]
                },
                {
                  title: "Database Trade-offs",
                  slug: "database-tradeoffs",
                  description: "ACID vs BASE, CAP theorem, and choosing the right database for your use case.",
                  topics: ["ACID", "BASE", "CAP Theorem", "SQL vs NoSQL"]
                }
              ].map((sheet, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{sheet.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{sheet.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {sheet.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/cheatsheets/${sheet.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View
                        <FileText className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Link href="/cheatsheets">
                <Button variant="outline">
                  View All Cheatsheets
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Learners</h2>
              <p className="text-lg text-gray-600">See who's leading the system design journey</p>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { rank: 1, name: "Alex Chen", points: 2847, badge: "🥇" },
                      { rank: 2, name: "Sarah Johnson", points: 2634, badge: "🥈" },
                      { rank: 3, name: "Mike Rodriguez", points: 2456, badge: "🥉" }
                    ].map((learner) => (
                      <TableRow key={learner.rank}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{learner.badge}</span>
                            #{learner.rank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{learner.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {learner.points.toLocaleString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Link href="/community">
                  <Button variant="outline" className="w-full">
                    <Trophy className="mr-2 h-4 w-4" />
                    View Full Leaderboard
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to start your system design journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are mastering system design with our comprehensive learning platform.
          </p>
          <Link href="/learn">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-xl">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 sm:mb-0">
              © {currentYear} Monchee. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
