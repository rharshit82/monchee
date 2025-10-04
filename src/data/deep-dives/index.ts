import { instagramFeedDeepDive } from './instagram-feed';
import { uberDispatchDeepDive } from './uber-dispatch';
import { netflixStreamingDeepDive } from './netflix-streaming';

// Export all deep dives in a clean, organized way
export const deepDivesData = {
  'instagram-feed': instagramFeedDeepDive,
  'uber-dispatch': uberDispatchDeepDive,
  'netflix-streaming': netflixStreamingDeepDive,
  // Add more deep dives here as they are created
};

// Export individual deep dives for direct imports if needed
export { instagramFeedDeepDive, uberDispatchDeepDive, netflixStreamingDeepDive };

// Export types for better TypeScript support
export type DeepDive = typeof instagramFeedDeepDive;
export type DeepDiveSlug = keyof typeof deepDivesData;
