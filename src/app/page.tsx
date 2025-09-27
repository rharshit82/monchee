import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Learn System Design.<br />
              <span className="text-sky-400">Free, Practical, Interview-Ready.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Monchee is your free hub for system design interview prep — concise guides, real-world patterns, and practice problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/free-pack"
                className="bg-sky-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-300 transition-colors hover:shadow-lg hover:shadow-sky-400/25 text-center"
              >
                Download Free Pack
              </Link>
              <Link
                href="/resources"
                className="bg-amber-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-300 transition-colors hover:shadow-lg hover:shadow-amber-400/25 text-center"
              >
                Explore Guides
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/hero.png"
              alt="System Design Architecture"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* What You'll Find Section */}
      <section className="bg-slate-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What You&apos;ll Find</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Guides</h3>
              <p className="text-gray-300 mb-4">
                Concise guides covering system design fundamentals, patterns, and best practices.
              </p>
              <Link
                href="/resources"
                className="text-sky-400 hover:text-sky-300 font-semibold"
              >
                Read Guides →
              </Link>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Practice Problems</h3>
              <p className="text-gray-300 mb-4">
                Real-world system design problems with detailed solutions and diagrams.
              </p>
              <Link
                href="/questions"
                className="text-sky-400 hover:text-sky-300 font-semibold"
              >
                Solve Problems →
              </Link>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Free Pack</h3>
              <p className="text-gray-300 mb-4">
                Download our free PDF pack with 3 complete system design problems.
              </p>
              <Link
                href="/free-pack"
                className="text-sky-400 hover:text-sky-300 font-semibold"
              >
                Get Free Pack →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Free Pack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Free System Design Pack</h2>
                  <p className="text-xl text-gray-300 mb-6">
                    3 interview-ready problems with diagrams, downloadable as PDF.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <span className="text-sky-400 mr-3 text-xl">✓</span>
                      <span>URL Shortener, WhatsApp, Uber designs</span>
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
                      <span>Interview-ready explanations</span>
                    </div>
                  </div>
                  <Link
                    href="/free-pack"
                    className="inline-block bg-sky-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-300 transition-colors hover:shadow-lg hover:shadow-sky-400/25"
                  >
                    Get the Free Pack
                  </Link>
                </div>
                <div className="flex justify-center">
                  <div className="w-80 h-96 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-slate-600">
                    <span className="text-gray-400">Free Pack Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Preview Section */}
      <section className="bg-slate-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Resources</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">System Design in a Hurry</h3>
              <p className="text-gray-300 mb-4">
                Quick reference guide for last-minute interview prep with essential concepts and patterns.
              </p>
              <Link
                href="/resources/system-design-in-a-hurry"
                className="text-sky-400 hover:text-sky-300 font-semibold"
              >
                Read Guide →
              </Link>
            </div>
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Core Concepts</h3>
              <p className="text-gray-300 mb-4">
                Master the fundamental concepts of system design including scalability, reliability, and consistency.
              </p>
              <Link
                href="/resources/core-concepts"
                className="text-sky-400 hover:text-sky-300 font-semibold"
              >
                Read Guide →
              </Link>
            </div>
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Common Patterns</h3>
              <p className="text-gray-300 mb-4">
                Learn the most important design patterns used in large-scale systems and when to apply them.
              </p>
              <Link
                href="/resources/common-patterns"
                className="text-sky-400 hover:text-sky-300 font-semibold"
              >
                Read Guide →
              </Link>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/resources"
              className="bg-sky-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-300 transition-colors hover:shadow-lg hover:shadow-sky-400/25"
            >
              See All Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Monchee.com · Free forever
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
              <Link href="/questions" className="text-gray-400 hover:text-white transition-colors">Questions</Link>
              <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link>
              <Link href="/free-pack" className="text-gray-400 hover:text-white transition-colors">Free Pack</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
