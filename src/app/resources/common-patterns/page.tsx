import Link from 'next/link'

export default function CommonPatternsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/resources" className="text-sky-400 hover:text-sky-300 mb-4 inline-block">
              ← Back to Resources
            </Link>
            <h1 className="text-5xl font-bold mb-6">Common Patterns</h1>
            <p className="text-xl text-gray-300">
              Learn the most important design patterns used in large-scale systems and when to apply them.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2>Load Balancing</h2>
            <p>Distribute incoming requests across multiple servers to improve performance and reliability.</p>
            <ul>
              <li><strong>Round Robin:</strong> Distribute requests evenly in rotation</li>
              <li><strong>Least Connections:</strong> Route to server with fewest active connections</li>
              <li><strong>Weighted:</strong> Assign different weights based on server capacity</li>
            </ul>

            <h2>Caching</h2>
            <p>Store frequently accessed data in fast storage to reduce latency and database load.</p>
            <ul>
              <li><strong>Cache-Aside:</strong> Application manages cache explicitly</li>
              <li><strong>Write-Through:</strong> Write to both cache and database</li>
              <li><strong>Write-Behind:</strong> Write to cache first, then database asynchronously</li>
            </ul>

            <h2>Database Sharding</h2>
            <p>Split data across multiple databases to improve performance and scalability.</p>
            <ul>
              <li><strong>Horizontal Sharding:</strong> Split by rows based on a shard key</li>
              <li><strong>Vertical Sharding:</strong> Split by columns/features</li>
              <li><strong>Directory-Based:</strong> Use a lookup service to find the right shard</li>
            </ul>

            <h2>Microservices</h2>
            <p>Break down applications into small, independent services that communicate over APIs.</p>
            <ul>
              <li><strong>Service Discovery:</strong> Find and communicate with other services</li>
              <li><strong>API Gateway:</strong> Single entry point for client requests</li>
              <li><strong>Circuit Breaker:</strong> Prevent cascading failures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
