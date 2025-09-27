import Image from 'next/image'
import Link from 'next/link'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Page Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            System Design Packs
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Learn system design through practical, interview-ready case studies and diagrams.
          </p>
        </div>
      </section>

      {/* Featured Pack - Available Now */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Available Now</h2>
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block bg-sky-400 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Available Now
                  </div>
                  <h3 className="text-3xl font-bold mb-4">System Design Interview Pack v1</h3>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    10 FAANG-style problems solved with diagrams and trade-offs. Master the most asked system design questions with detailed solutions, architecture diagrams, and interview-ready explanations.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <span className="text-sky-400 mr-3 text-xl">✓</span>
                      <span>WhatsApp, Uber, Twitter, YouTube designs</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sky-400 mr-3 text-xl">✓</span>
                      <span>Professional Mermaid diagrams</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sky-400 mr-3 text-xl">✓</span>
                      <span>Trade-offs and bottleneck analysis</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sky-400 mr-3 text-xl">✓</span>
                      <span>Lifetime access with updates</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="text-4xl font-bold text-amber-400">₹999</div>
                    <a
                      href="https://gumroad.com/l/monchee-pack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-sky-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-300 transition-colors hover:shadow-lg hover:shadow-sky-400/25"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/pack-v1.png"
                    alt="System Design Interview Pack v1"
                    width={400}
                    height={500}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Packs */}
      <section className="bg-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Coming Soon</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Database Design Pack */}
              <div className="bg-slate-700 rounded-xl p-6 border border-slate-600 relative">
                <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </div>
                <div className="w-full h-48 bg-slate-600 rounded-lg mb-6 flex items-center justify-center">
                  <Image
                    src="/images/coming-soon.png"
                    alt="Database Design Pack"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Database Design Pack</h3>
                <p className="text-gray-300 mb-4">
                  Dive deep into SQL/NoSQL design patterns, indexing strategies, and optimization techniques for large-scale applications.
                </p>
                <div className="text-sm text-gray-400">
                  Expected: Q2 2025
                </div>
              </div>

              {/* Distributed Systems Pack */}
              <div className="bg-slate-700 rounded-xl p-6 border border-slate-600 relative">
                <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </div>
                <div className="w-full h-48 bg-slate-600 rounded-lg mb-6 flex items-center justify-center">
                  <Image
                    src="/images/coming-soon.png"
                    alt="Distributed Systems Pack"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Distributed Systems Pack</h3>
                <p className="text-gray-300 mb-4">
                  Sharding, caching, messaging at scale. Learn microservices, event-driven architecture, and distributed system patterns.
                </p>
                <div className="text-sm text-gray-400">
                  Expected: Q3 2025
                </div>
              </div>

              {/* Payment Systems Deep Dive */}
              <div className="bg-slate-700 rounded-xl p-6 border border-slate-600 relative">
                <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </div>
                <div className="w-full h-48 bg-slate-600 rounded-lg mb-6 flex items-center justify-center">
                  <Image
                    src="/images/coming-soon.png"
                    alt="Payment Systems Deep Dive"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Payment Systems Deep Dive</h3>
                <p className="text-gray-300 mb-4">
                  Stripe, Razorpay, UPI-level architectures. Deep dive into payment processing, fraud detection, and financial systems.
                </p>
                <div className="text-sm text-gray-400">
                  Expected: Q4 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
              <h2 className="text-3xl font-bold mb-4">Want early access to new packs?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Be the first to know when new packs are released. Get exclusive early access and special pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-sky-400"
                />
                <button className="bg-sky-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-sky-300 transition-colors hover:shadow-lg hover:shadow-sky-400/25">
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Monchee.com · Built with ❤️ for engineers and startups
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link>
              <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
              <Link href="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
