export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: 'cheatsheet' | 'deep-dive' | 'lab' | 'track' | 'user';
  slug: string;
  icon: string;
  keywords: string[];
}

// Static search index - in a real app, this would come from a database or search service
export const searchIndex: SearchItem[] = [
  // Cheatsheets
  {
    id: 'caching-patterns',
    title: 'Caching Patterns',
    description: 'Master different caching strategies and their trade-offs in distributed systems.',
    type: 'cheatsheet',
    slug: 'caching-patterns',
    icon: '📋',
    keywords: ['cache', 'caching', 'patterns', 'redis', 'memcached', 'performance', 'latency']
  },
  {
    id: 'database-trade-offs',
    title: 'Database Trade-offs',
    description: 'Understand the fundamental trade-offs between different database types and when to use each.',
    type: 'cheatsheet',
    slug: 'database-trade-offs',
    icon: '📋',
    keywords: ['database', 'sql', 'nosql', 'acid', 'base', 'trade-offs', 'consistency', 'availability']
  },

  // Deep Dives
  {
    id: 'instagram-feed',
    title: 'Instagram Feed',
    description: 'Design a social media feed system that can handle millions of users and real-time updates.',
    type: 'deep-dive',
    slug: 'instagram-feed',
    icon: '📸',
    keywords: ['instagram', 'feed', 'social', 'media', 'timeline', 'posts', 'real-time', 'scalability']
  },
  {
    id: 'uber-dispatch',
    title: 'Uber Dispatch',
    description: 'Design a ride-sharing dispatch system that matches drivers with riders efficiently.',
    type: 'deep-dive',
    slug: 'uber-dispatch',
    icon: '🚗',
    keywords: ['uber', 'dispatch', 'ride-sharing', 'matching', 'algorithm', 'location', 'drivers', 'riders']
  },
  {
    id: 'netflix-streaming',
    title: 'Netflix Streaming',
    description: 'Design a video streaming platform that can deliver content to millions of users globally.',
    type: 'deep-dive',
    slug: 'netflix-streaming',
    icon: '🎬',
    keywords: ['netflix', 'streaming', 'video', 'cdn', 'bandwidth', 'content', 'delivery', 'global']
  },

  // Labs
  {
    id: 'rate-limiter',
    title: 'Rate Limiter',
    description: 'Implement a rate limiter that restricts the number of requests a user can make within a given time window.',
    type: 'lab',
    slug: 'rate-limiter',
    icon: '🚦',
    keywords: ['rate', 'limiter', 'throttling', 'requests', 'api', 'security', 'distributed', 'redis']
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    description: 'Build a URL shortener service like bit.ly that can handle millions of URLs and redirects.',
    type: 'lab',
    slug: 'url-shortener',
    icon: '🔗',
    keywords: ['url', 'shortener', 'bitly', 'redirect', 'tinyurl', 'hash', 'base62', 'scalability']
  },
  {
    id: 'message-queue',
    title: 'Message Queue',
    description: 'Design and implement a distributed message queue system for reliable message delivery.',
    type: 'lab',
    slug: 'message-queue',
    icon: '📨',
    keywords: ['message', 'queue', 'kafka', 'rabbitmq', 'pub-sub', 'messaging', 'distributed', 'reliability']
  },

  // Tracks
  {
    id: 'beginner-track',
    title: 'Beginner Track',
    description: 'Master the fundamentals of system design, including caching, sharding, and basic distributed concepts.',
    type: 'track',
    slug: 'beginner-track',
    icon: '🎓',
    keywords: ['beginner', 'fundamentals', 'basics', 'caching', 'sharding', 'cap', 'theorem', 'learning', 'path']
  },
  {
    id: 'intermediate-track',
    title: 'Intermediate Track',
    description: 'Dive deeper into real-world system designs like Instagram Feed, Uber Dispatch, and implement a Rate Limiter.',
    type: 'track',
    slug: 'intermediate-track',
    icon: '⚡',
    keywords: ['intermediate', 'real-world', 'instagram', 'uber', 'rate', 'limiter', 'projects', 'hands-on']
  },
  {
    id: 'advanced-track',
    title: 'Advanced Track',
    description: 'Explore complex distributed systems, streaming architectures like Netflix, and advanced message queue patterns.',
    type: 'track',
    slug: 'advanced-track',
    icon: '🏗️',
    keywords: ['advanced', 'distributed', 'netflix', 'streaming', 'message', 'queue', 'complex', 'architecture']
  },

  // Users (example users)
  {
    id: 'rharshit82',
    title: 'rharshit82',
    description: 'Full Stack Developer passionate about system design',
    type: 'user',
    slug: 'rharshit82',
    icon: '👤',
    keywords: ['harshit', 'developer', 'fullstack', 'system', 'design', 'profile']
  },
  {
    id: 'alice',
    title: 'alice',
    description: 'Backend engineer specializing in distributed systems',
    type: 'user',
    slug: 'alice',
    icon: '👤',
    keywords: ['alice', 'backend', 'engineer', 'distributed', 'systems', 'profile']
  },
  {
    id: 'bob',
    title: 'bob',
    description: 'Infrastructure engineer with expertise in scalability',
    type: 'user',
    slug: 'bob',
    icon: '👤',
    keywords: ['bob', 'infrastructure', 'engineer', 'scalability', 'devops', 'profile']
  }
];

// Search function using Fuse.js for fuzzy search
export const searchItems = (query: string, limit: number = 10): SearchItem[] => {
  if (!query.trim()) return [];

  const lowercaseQuery = query.toLowerCase();
  
  return searchIndex
    .filter(item => {
      // Check title, description, and keywords
      const searchableText = [
        item.title,
        item.description || '',
        ...item.keywords
      ].join(' ').toLowerCase();
      
      return searchableText.includes(lowercaseQuery);
    })
    .slice(0, limit);
};

// Get items by type
export const getItemsByType = (type: SearchItem['type']): SearchItem[] => {
  return searchIndex.filter(item => item.type === type);
};

// Get popular/recent items (for empty state)
export const getPopularItems = (): SearchItem[] => {
  return searchIndex.slice(0, 6);
};
