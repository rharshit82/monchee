import Link from 'next/link'

export default function SystemDesignFastTrackPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Link href="/resources" className="text-sky-400 hover:text-sky-300 mb-4 inline-block">
              ← Back to Resources
            </Link>
            <h1 className="text-5xl font-bold mb-6">
              System Design Fast Track 🚀
            </h1>
            <p className="text-xl text-gray-300">
              The fastest way to get interview-ready — concise, practical, and free.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-sky-400">Introduction</h2>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  This guide is your fast track to system design interview success. It won&apos;t make you a system design expert overnight, 
                  but it will give you the essential knowledge and framework to confidently tackle any system design question.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  <strong>What this guide is:</strong> A practical, interview-focused resource covering the core concepts, patterns, and 
                  frameworks you need to know. It&apos;s designed for engineers who want to quickly prepare for system design interviews.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  <strong>What this guide is not:</strong> A comprehensive textbook on distributed systems. For deep technical knowledge, 
                  you&apos;ll need additional study. This guide focuses on what matters most in interviews.
                </p>
              </div>
            </section>

            {/* Interview Framework */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-sky-400">Interview Framework (5 Steps)</h2>
              <p className="text-lg text-gray-300 mb-8">
                Follow this proven framework to structure your system design interview and demonstrate systematic thinking:
              </p>
              
              <div className="space-y-8">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-start">
                    <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-400">Clarify Requirements</h3>
                      <p className="text-gray-300 mb-3">
                        Ask clarifying questions to understand the problem scope, constraints, and assumptions. 
                        This shows you think systematically and don&apos;t jump to solutions.
                      </p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• What is the scale? (users, requests per second, data size)</li>
                        <li>• What are the main use cases and user flows?</li>
                        <li>• Are there any constraints or assumptions?</li>
                        <li>• What are the functional vs non-functional requirements?</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-start">
                    <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-400">Define APIs</h3>
                      <p className="text-gray-300 mb-3">
                        Design the key APIs that your system will expose. This helps clarify the interface between 
                        different components and shows you understand API design principles.
                      </p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Identify the main operations your system needs to support</li>
                        <li>• Define RESTful endpoints or RPC methods</li>
                        <li>• Consider request/response formats and error handling</li>
                        <li>• Think about authentication and authorization</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-start">
                    <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-400">Estimate Scale</h3>
                      <p className="text-gray-300 mb-3">
                        Perform back-of-the-envelope calculations to understand the scale of your system. 
                        This demonstrates your ability to think about real-world constraints.
                      </p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Calculate daily active users and peak QPS</li>
                        <li>• Estimate read/write ratio and data storage needs</li>
                        <li>• Consider bandwidth, memory, and CPU requirements</li>
                        <li>• Use orders of magnitude (10^3, 10^6, 10^9) for quick estimates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-start">
                    <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-400">Design Components</h3>
                      <p className="text-gray-300 mb-3">
                        Draw the high-level architecture and dive into the details of each component. 
                        Start simple, then add complexity as needed.
                      </p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Draw the main components (client, load balancer, servers, database)</li>
                        <li>• Show data flow and component interactions</li>
                        <li>• Discuss database design and data partitioning</li>
                        <li>• Address bottlenecks and single points of failure</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-start">
                    <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-400">Discuss Trade-offs</h3>
                      <p className="text-gray-300 mb-3">
                        Explain the trade-offs in your design decisions. This shows you understand the 
                        complexity of real-world systems and can make informed decisions.
                      </p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Consistency vs. Availability (CAP theorem)</li>
                        <li>• Performance vs. Cost considerations</li>
                        <li>• Latency vs. Throughput trade-offs</li>
                        <li>• Simplicity vs. Scalability decisions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Concepts */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-sky-400">Core Concepts</h2>
              <p className="text-lg text-gray-300 mb-8">
                Master these fundamental concepts that appear in almost every system design interview:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Caching</h3>
                  <p className="text-gray-300 mb-2">Store frequently accessed data in fast storage (Redis, Memcached) to reduce database load and improve response times.</p>
                  <p className="text-gray-300">Use cache-aside, write-through, or write-behind patterns depending on your consistency requirements.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Sharding</h3>
                  <p className="text-gray-300 mb-2">Split data across multiple databases based on a shard key to enable horizontal scaling.</p>
                  <p className="text-gray-300">Use consistent hashing to minimize data movement when adding or removing shards.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Replication</h3>
                  <p className="text-gray-300 mb-2">Create multiple copies of data for availability and read performance.</p>
                  <p className="text-gray-300">Master-slave for reads, master-master for writes. Consider consistency vs availability trade-offs.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Queues</h3>
                  <p className="text-gray-300 mb-2">Decouple services using asynchronous messaging (Kafka, RabbitMQ) to improve reliability.</p>
                  <p className="text-gray-300">Handle message ordering, delivery guarantees, and dead letter queues for error handling.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">CDNs</h3>
                  <p className="text-gray-300 mb-2">Distribute content globally using edge servers close to users to reduce latency.</p>
                  <p className="text-gray-300">Use for static content (images, videos, CSS, JS) and consider cache invalidation strategies.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">CAP Theorem</h3>
                  <p className="text-gray-300 mb-2">In distributed systems, you can only guarantee 2 of 3: Consistency, Availability, Partition tolerance.</p>
                  <p className="text-gray-300">Most systems choose AP (availability + partition tolerance) with eventual consistency.</p>
                </div>
              </div>
            </section>

            {/* Key Technologies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-sky-400">Key Technologies</h2>
              <p className="text-lg text-gray-300 mb-8">
                Understand when and why to use different technologies in your system design:
              </p>
              
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">SQL vs NoSQL</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-2">SQL (PostgreSQL, MySQL)</h4>
                      <p className="text-gray-300 text-sm mb-2">Use when you need:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• ACID transactions and strong consistency</li>
                        <li>• Complex queries and joins</li>
                        <li>• Structured data with relationships</li>
                        <li>• Vertical scaling is sufficient</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-2">NoSQL (MongoDB, Cassandra)</h4>
                      <p className="text-gray-300 text-sm mb-2">Use when you need:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Horizontal scaling and high availability</li>
                        <li>• Flexible schema and fast writes</li>
                        <li>• Eventual consistency is acceptable</li>
                        <li>• Simple key-value or document access</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Load Balancers</h3>
                  <p className="text-gray-300 mb-2">Distribute incoming requests across multiple servers to improve performance and reliability.</p>
                  <p className="text-gray-300">Use round-robin, least connections, or weighted algorithms. Consider health checks and failover mechanisms.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Message Queues</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-2">Kafka</h4>
                      <p className="text-sm text-gray-300">High-throughput streaming platform. Good for event sourcing and real-time analytics.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-2">RabbitMQ</h4>
                      <p className="text-sm text-gray-300">Message broker with routing capabilities. Good for complex routing and RPC patterns.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-2">Redis Pub/Sub</h4>
                      <p className="text-sm text-gray-300">Simple publish-subscribe messaging. Good for real-time notifications and chat systems.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Storage</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-2">File Storage</h4>
                      <p className="text-sm text-gray-300">Use S3, GCS for large files, images, videos. Consider CDN for global distribution.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-2">Search</h4>
                      <p className="text-sm text-gray-300">Use Elasticsearch for full-text search, filtering, and analytics. Consider indexing strategies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Patterns */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-sky-400">Common Patterns</h2>
              <p className="text-lg text-gray-300 mb-8">
                These patterns appear frequently in system design interviews and real-world systems:
              </p>
              
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-2 text-amber-400">Rate Limiting</h3>
                  <p className="text-gray-300">Control the number of requests per user/IP to prevent abuse. Use token bucket, sliding window, or fixed window algorithms. Implement at API gateway level.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-2 text-amber-400">Consistent Hashing</h3>
                  <p className="text-gray-300">Distribute data across nodes using a hash ring. Minimizes data movement when nodes are added/removed. Used in caching and database sharding.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-2 text-amber-400">Pub/Sub</h3>
                  <p className="text-gray-300">Decouple publishers from subscribers using message topics. Enables event-driven architecture and real-time updates. Multiple subscribers can process the same message.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-2 text-amber-400">Leader Election</h3>
                  <p className="text-gray-300">Select a single leader from multiple nodes to coordinate operations. Prevents split-brain scenarios. Use algorithms like Raft or Paxos. Implement health checks and failover.</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-2 text-amber-400">Idempotency</h3>
                  <p className="text-gray-300">Design operations to be idempotent (safe to retry). Use unique request IDs, idempotency keys, or idempotent operations. Critical for distributed systems and retry mechanisms.</p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-sky-400">Common Mistakes</h2>
              
              <div className="bg-slate-700 rounded-md p-6 border border-red-400/30">
                <h3 className="text-xl font-semibold mb-4 text-red-400">⚠️ Yellow Flags to Avoid</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Over-engineering:</strong> Don&apos;t add complexity until you need it. Start simple, then scale.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Ignoring bottlenecks:</strong> Always identify and address the weakest link in your system.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Single points of failure:</strong> Every component should have redundancy or failover mechanisms.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Not considering data consistency:</strong> Understand when you need strong vs eventual consistency.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Forgetting monitoring:</strong> You can&apos;t optimize what you can&apos;t measure. Include logging and metrics.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Not asking clarifying questions:</strong> Always understand requirements before jumping to solutions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span><strong>Ignoring security:</strong> Consider authentication, authorization, and data encryption from the start.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Tips for Delivery */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-sky-400">Tips for Delivery</h2>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 text-amber-400">�� Interview Success Tips</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span><strong>Talk while thinking:</strong> Verbalize your thought process. Interviewers want to see how you approach problems.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span><strong>Use numbers:</strong> Be specific with your estimates and calculations. Show your work.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span><strong>Draw clearly:</strong> Use boxes for components, cylinders for databases, clouds for external services.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span><strong>Don&apos;t panic about unknown tech:</strong> Focus on concepts and patterns. You can ask about specific technologies.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span><strong>Start simple:</strong> Begin with a basic design, then add complexity. Show your reasoning.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span><strong>Ask questions:</strong> Clarify requirements and constraints. Show you think systematically.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
              <h2 className="text-3xl font-bold mb-4 text-sky-400">Go Deeper with the Free Pack</h2>
              <p className="text-xl text-gray-300 mb-8">
                Download our 7-problem System Design Pack with detailed solutions, diagrams, and trade-offs.
              </p>
              <Link
                href="/free-pack"
                className="bg-sky-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-300 transition-colors hover:shadow-lg hover:shadow-sky-400/25 inline-block"
              >
                Download Free Pack
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
