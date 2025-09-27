import Link from 'next/link'

export default function URLShortenerPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/questions" className="text-sky-400 hover:text-sky-300 mb-4 inline-block">
              ← Back to Questions
            </Link>
            <h1 className="text-5xl font-bold mb-6">URL Shortener</h1>
            <p className="text-xl text-gray-300">
              Design a URL shortener service like bit.ly that converts long URLs into short, shareable links.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2>Problem Statement</h2>
            <p>Design a URL shortener service that can handle millions of URL shortening requests per day and redirect users to the original URLs when they click on the short links.</p>

            <h2>Requirements</h2>
            <h3>Functional Requirements</h3>
            <ul>
              <li>Convert long URLs to short, unique identifiers</li>
              <li>Redirect short URLs to original URLs</li>
              <li>Allow custom short URLs (optional)</li>
              <li>Track click counts and basic usage statistics</li>
              <li>Support optional URL expiration dates</li>
            </ul>

            <h3>Non-Functional Requirements</h3>
            <ul>
              <li>99.9% uptime</li>
              <li>Redirect should happen in &lt; 100ms</li>
              <li>Handle 100M URLs and 1000 requests/second</li>
              <li>Never lose URL mappings</li>
              <li>Prevent abuse and malicious URLs</li>
            </ul>

            <h2>High-Level Design</h2>
            <p>The system uses a simple but scalable architecture. When a user wants to shorten a URL, the request goes through a load balancer to one of many application servers. The server generates a unique short code using base62 encoding and stores the mapping in a database. For redirection, the system looks up the original URL and returns a 302 redirect.</p>

            <h2>Detailed Design</h2>
            <ul>
              <li><strong>URL Generator:</strong> Uses base62 encoding (a-z, A-Z, 0-9) for 6-character codes</li>
              <li><strong>Database:</strong> Two tables - URL mappings and analytics</li>
              <li><strong>Caching:</strong> Redis for frequently accessed URLs</li>
              <li><strong>Load Balancer:</strong> Distributes traffic across application servers</li>
              <li><strong>Analytics:</strong> Separate service for tracking clicks</li>
            </ul>

            <h2>Trade-offs</h2>
            <ul>
              <li><strong>Database bottleneck:</strong> Use read replicas and caching</li>
              <li><strong>URL generation:</strong> Pre-generate codes vs. generate on-demand</li>
              <li><strong>Custom URLs:</strong> Additional validation and conflict resolution</li>
              <li><strong>Analytics:</strong> Real-time vs. batch processing</li>
            </ul>

            <h2>Diagram</h2>
            <div className="bg-slate-800 p-6 rounded-lg">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`graph TD
    A[User] --> B[Load Balancer]
    B --> C[App Servers]
    C --> D[URL Generator]
    C --> E[Redis Cache]
    C --> F[(Database)]
    F --> G[(Read Replicas)]
    E --> H[Frequently Accessed URLs]
    C --> I[Analytics Service]
    I --> J[(Analytics DB)]
    
    K[Short URL Click] --> B
    B --> C
    C --> E
    E --> L{URL in Cache?}
    L -->|Yes| M[Return Original URL]
    L -->|No| F
    F --> N[Store in Cache]
    N --> M
    M --> O[302 Redirect]`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
