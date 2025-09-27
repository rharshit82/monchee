import Link from 'next/link'

export default function FreePackPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Download the Free System Design Pack</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              3 problems (URL Shortener, WhatsApp, Uber) with requirements, trade-offs, and diagrams. Instant PDF download.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">What&apos;s Included</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sky-400 mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">URL Shortener Design</h3>
                    <p className="text-gray-300 text-sm">Complete system design with base62 encoding and caching strategies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-sky-400 mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">WhatsApp Architecture</h3>
                    <p className="text-gray-300 text-sm">Real-time messaging system with WebSocket connections and message queues</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-sky-400 mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Uber Ride-Sharing</h3>
                    <p className="text-gray-300 text-sm">Complex matching system with geospatial algorithms and real-time tracking</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-sky-400 mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Professional Diagrams</h3>
                    <p className="text-gray-300 text-sm">Mermaid-based architecture diagrams for each solution</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-sky-400 mr-3 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Interview-Ready</h3>
                    <p className="text-gray-300 text-sm">Structured explanations perfect for interview preparation</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/monchee-free-pack.pdf"
                  download
                  className="bg-sky-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-300 transition-colors hover:shadow-lg hover:shadow-sky-400/25 text-center"
                >
                  Download Now (PDF)
                </a>
                <Link
                  href="/questions"
                  className="bg-amber-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-300 transition-colors hover:shadow-lg hover:shadow-amber-400/25 text-center"
                >
                  View Online
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-96 bg-slate-800 rounded-lg flex items-center justify-center border-2 border-slate-700">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-400">PDF Preview</p>
                  <p className="text-sm text-gray-500 mt-2">Free System Design Pack</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Capture Section */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Want More System Design Content?</h3>
              <p className="text-gray-300 mb-6">
                Get notified when we release new guides, problems, and resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-sky-400"
                />
                <button className="bg-sky-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-sky-300 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
