import Link from 'next/link'

export default function ResourcesPage() {
  const resources = [
    {
      title: "System Design in a Hurry",
      description: "Quick reference guide for last-minute interview prep with essential concepts and patterns.",
      slug: "system-design-in-a-hurry",
      category: "Quick Reference"
    },
    {
      title: "Core Concepts",
      description: "Master the fundamental concepts of system design including scalability, reliability, and consistency.",
      slug: "core-concepts",
      category: "Fundamentals"
    },
    {
      title: "Common Patterns",
      description: "Learn the most important design patterns used in large-scale systems and when to apply them.",
      slug: "common-patterns",
      category: "Patterns"
    },
    {
      title: "Interview Framework",
      description: "Step-by-step framework for approaching system design interviews with confidence.",
      slug: "interview-framework",
      category: "Interview Prep"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">System Design Resources</h1>
          <p className="text-xl text-gray-300 mb-12">
            Free guides to help you master system design concepts and ace your interviews.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource) => (
              <div key={resource.slug} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold">{resource.title}</h2>
                  <span className="bg-sky-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {resource.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{resource.description}</p>
                <Link
                  href={`/resources/${resource.slug}`}
                  className="text-sky-400 hover:text-sky-300 font-semibold"
                >
                  Read Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
