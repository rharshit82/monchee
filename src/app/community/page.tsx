import Link from 'next/link'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Community Coming Soon!</h1>
          <p className="text-xl text-gray-300 mb-12">
            Join our waitlist to be the first to know when we launch our community platform.
          </p>
          
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <div>
                <h3 className="font-semibold mb-2 text-sky-400">Discussion Forums</h3>
                <p className="text-gray-300 text-sm">Ask questions and share insights about system design concepts</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sky-400">Study Groups</h3>
                <p className="text-gray-300 text-sm">Join study groups for interview preparation and practice</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sky-400">Expert Sessions</h3>
                <p className="text-gray-300 text-sm">Live sessions with industry experts and FAANG engineers</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sky-400">Resource Sharing</h3>
                <p className="text-gray-300 text-sm">Share and discover additional learning resources</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Join the Waitlist</h3>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-sky-400"
                />
                <button className="bg-sky-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-sky-300 transition-colors">
                  Join Waitlist
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              We&apos;ll notify you as soon as the community platform is ready!
            </p>
          </div>
          
          <div className="mt-12">
            <Link
              href="/"
              className="text-sky-400 hover:text-sky-300 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
