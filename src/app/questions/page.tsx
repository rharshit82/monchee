import Link from 'next/link'

export default function QuestionsPage() {
  const problems = [
    {
      title: "URL Shortener",
      description: "Design a URL shortener service like bit.ly that converts long URLs into short, shareable links.",
      slug: "url-shortener",
      difficulty: "Easy"
    },
    {
      title: "WhatsApp",
      description: "Design a real-time messaging system that can handle billions of messages per day.",
      slug: "whatsapp",
      difficulty: "Medium"
    },
    {
      title: "Uber",
      description: "Design a ride-sharing platform that connects riders with drivers in real-time.",
      slug: "uber",
      difficulty: "Medium"
    },
    {
      title: "Twitter Feed",
      description: "Design a social media feed system that displays personalized timelines.",
      slug: "twitter-feed",
      difficulty: "Hard"
    },
    {
      title: "YouTube",
      description: "Design a video streaming platform that handles upload, processing, and streaming.",
      slug: "youtube",
      difficulty: "Hard"
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-400 text-slate-900'
      case 'Medium': return 'bg-amber-400 text-slate-900'
      case 'Hard': return 'bg-red-400 text-slate-900'
      default: return 'bg-gray-400 text-slate-900'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Practice Problems</h1>
          <p className="text-xl text-gray-300 mb-12">
            Solve real-world system design problems with detailed solutions and diagrams.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem) => (
              <div key={problem.slug} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{problem.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{problem.description}</p>
                <Link
                  href={`/questions/${problem.slug}`}
                  className="text-sky-400 hover:text-sky-300 font-semibold"
                >
                  Solve Problem →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
