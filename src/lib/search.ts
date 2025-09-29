import Fuse from 'fuse.js';
import { searchIndex, SearchItem } from './search-index';

// Configure Fuse.js for better search
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.3 },
    { name: 'keywords', weight: 0.2 }
  ],
  threshold: 0.3, // Lower threshold means more strict matching
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

const fuse = new Fuse(searchIndex, fuseOptions);

export interface SearchResult extends SearchItem {
  score?: number;
  matches?: Fuse.FuseResultMatch[];
}

// Enhanced search function with Fuse.js
export const searchItems = (query: string, limit: number = 10): SearchResult[] => {
  if (!query.trim()) return [];

  const results = fuse.search(query, { limit });
  
  return results.map(result => ({
    ...result.item,
    score: result.score,
    matches: result.matches
  }));
};

// Get search suggestions based on partial query
export const getSearchSuggestions = (query: string, limit: number = 5): string[] => {
  if (!query.trim()) return [];

  const results = searchItems(query, limit);
  return results.map(item => item.title);
};

// Get popular search terms
export const getPopularSearchTerms = (): string[] => {
  return [
    'caching',
    'rate limiter',
    'instagram',
    'netflix',
    'database',
    'beginner',
    'advanced',
    'message queue'
  ];
};

// Get recent searches (would be stored in localStorage in a real app)
export const getRecentSearches = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const recent = localStorage.getItem('monchee-recent-searches');
    return recent ? JSON.parse(recent) : [];
  } catch {
    return [];
  }
};

// Save search to recent searches
export const saveRecentSearch = (query: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const recent = getRecentSearches();
    const updated = [query, ...recent.filter(term => term !== query)].slice(0, 5);
    localStorage.setItem('monchee-recent-searches', JSON.stringify(updated));
  } catch {
    // Ignore localStorage errors
  }
};

// Clear recent searches
export const clearRecentSearches = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('monchee-recent-searches');
  } catch {
    // Ignore localStorage errors
  }
};
