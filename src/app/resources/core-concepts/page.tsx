import Link from 'next/link'

export default function CoreConceptsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/resources" className="text-sky-400 hover:text-sky-300 mb-4 inline-block">
              ← Back to Resources
            </Link>
            <h1 className="text-5xl font-bold mb-6">Core Concepts</h1>
            <p className="text-xl text-gray-300">
              Master the fundamental concepts of system design including scalability, reliability, and consistency.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2>Scalability</h2>
            <p>Scalability is the ability of a system to handle increased load by adding resources.</p>
            <ul>
              <li><strong>Vertical Scaling:</strong> Add more power to existing machines</li>
              <li><strong>Horizontal Scaling:</strong> Add more machines to the system</li>
              <li><strong>Load Balancing:</strong> Distribute traffic across multiple servers</li>
            </ul>

            <h2>Reliability</h2>
            <p>Reliability is the probability that a system will perform its intended function without failure.</p>
            <ul>
              <li><strong>Fault Tolerance:</strong> System continues to work despite component failures</li>
              <li><strong>Redundancy:</strong> Duplicate critical components</li>
              <li><strong>Monitoring:</strong> Detect and respond to failures quickly</li>
            </ul>

            <h2>Availability</h2>
            <p>Availability is the percentage of time a system is operational and accessible.</p>
            <ul>
              <li><strong>99.9% uptime:</strong> 8.76 hours of downtime per year</li>
              <li><strong>99.99% uptime:</strong> 52.56 minutes of downtime per year</li>
              <li><strong>Redundancy:</strong> Multiple data centers and failover mechanisms</li>
            </ul>

            <h2>Consistency</h2>
            <p>Consistency ensures all nodes in a distributed system see the same data at the same time.</p>
            <ul>
              <li><strong>Strong Consistency:</strong> All reads get the latest write</li>
              <li><strong>Eventual Consistency:</strong> System will become consistent over time</li>
              <li><strong>CAP Theorem:</strong> Can only guarantee 2 of 3: Consistency, Availability, Partition tolerance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
