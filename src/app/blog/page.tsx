import Link from 'next/link'

export default function BlogPage() {
  const posts = [
    {
      title: "System Design Interview Tips from FAANG Engineers",
      excerpt: "Learn the insider secrets from engineers who've successfully navigated system design interviews at top tech companies.",
      slug: "system-design-interview-tips",
      date: "2025-01-15",
      readTime: "5 min read"
    },
    {
      title: "Scaling WhatsApp: Lessons from 2 Billion Users",
      excerpt: "Deep dive into how WhatsApp handles billions of messages daily and the architectural decisions that made it possible.",
      slug: "scaling-whatsapp-lessons",
      date: "2025-01-10",
      readTime: "8 min read"
    },
    {
      title: "The CAP Theorem Explained with Real Examples",
      excerpt: "Understanding the fundamental trade-offs in distributed systems through practical examples from popular applications.",
      slug: "cap-theorem-explained",
      date: "2025-01-05",
      readTime: "6 min read"
    },
    {
      title: "Caching Strategies: When and How to Use Each Type",
      excerpt: "A comprehensive guide to different caching strategies and their trade-offs in large-scale systems.",
      slug: "caching-strategies-guide",
      date: "2025-01-01",
      readTime: "7 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">System Design Blog</h1>
          <p className="text-xl text-gray-300 mb-12">
            Insights, tips, and deep dives into system design concepts and real-world implementations.
          </p>
          
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold hover:text-sky-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
