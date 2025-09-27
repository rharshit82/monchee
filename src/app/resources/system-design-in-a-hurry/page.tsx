import Link from 'next/link'

export default function SystemDesignInAHurryPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/resources" className="text-sky-400 hover:text-sky-300 mb-4 inline-block">
              ← Back to Resources
            </Link>
            <h1 className="text-5xl font-bold mb-6">System Design in a Hurry</h1>
            <p className="text-xl text-gray-300">
              Quick reference guide for last-minute interview prep with essential concepts and patterns.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2>Essential Concepts</h2>
            <ul>
              <li><strong>Scalability:</strong> Handle increasing load by adding resources</li>
              <li><strong>Reliability:</strong> System continues to work despite failures</li>
              <li><strong>Availability:</strong> System is operational when needed</li>
              <li><strong>Consistency:</strong> All nodes see the same data at the same time</li>
            </ul>

            <h2>Key Patterns</h2>
            <ul>
              <li><strong>Load Balancing:</strong> Distribute traffic across multiple servers</li>
              <li><strong>Caching:</strong> Store frequently accessed data in fast storage</li>
              <li><strong>Database Sharding:</strong> Split data across multiple databases</li>
              <li><strong>CDN:</strong> Distribute content globally for faster access</li>
            </ul>

            <h2>Interview Framework</h2>
            <ol>
              <li>Clarify requirements and scope</li>
              <li>Estimate capacity and constraints</li>
              <li>Design high-level architecture</li>
              <li>Identify bottlenecks and trade-offs</li>
              <li>Discuss scaling and improvements</li>
            </ol>

            <h2>Common Trade-offs</h2>
            <ul>
              <li><strong>Consistency vs. Availability:</strong> CAP theorem</li>
              <li><strong>Latency vs. Throughput:</strong> Optimize for your use case</li>
              <li><strong>Cost vs. Performance:</strong> Balance resources with requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
