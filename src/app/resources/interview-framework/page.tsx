import Link from 'next/link'

export default function InterviewFrameworkPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/resources" className="text-sky-400 hover:text-sky-300 mb-4 inline-block">
              ← Back to Resources
            </Link>
            <h1 className="text-5xl font-bold mb-6">Interview Framework</h1>
            <p className="text-xl text-gray-300">
              Step-by-step framework for approaching system design interviews with confidence.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2>1. Clarify Requirements</h2>
            <p>Ask clarifying questions to understand the problem scope and constraints.</p>
            <ul>
              <li>What is the scale of the system?</li>
              <li>What are the main use cases?</li>
              <li>What are the performance requirements?</li>
              <li>Are there any constraints or assumptions?</li>
            </ul>

            <h2>2. Estimate Capacity</h2>
            <p>Calculate the scale and requirements of the system.</p>
            <ul>
              <li>Number of users (daily active users)</li>
              <li>Read/write ratio</li>
              <li>Data storage requirements</li>
              <li>Network bandwidth needs</li>
            </ul>

            <h2>3. High-Level Design</h2>
            <p>Draw a high-level architecture diagram showing major components.</p>
            <ul>
              <li>Client applications</li>
              <li>Load balancers</li>
              <li>Application servers</li>
              <li>Databases</li>
              <li>Caching layers</li>
            </ul>

            <h2>4. Detailed Design</h2>
            <p>Dive deeper into each component and their interactions.</p>
            <ul>
              <li>API design</li>
              <li>Database schema</li>
              <li>Data flow</li>
              <li>Error handling</li>
            </ul>

            <h2>5. Identify Bottlenecks</h2>
            <p>Discuss potential issues and how to address them.</p>
            <ul>
              <li>Single points of failure</li>
              <li>Performance bottlenecks</li>
              <li>Scalability limitations</li>
              <li>Security concerns</li>
            </ul>

            <h2>6. Scale the Design</h2>
            <p>Discuss how to scale the system for increased load.</p>
            <ul>
              <li>Horizontal scaling strategies</li>
              <li>Database sharding</li>
              <li>Caching strategies</li>
              <li>CDN implementation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
