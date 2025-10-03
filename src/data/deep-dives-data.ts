export const deepDivesData = {
  'instagram-feed': {
    title: 'Design Instagram Feed',
    difficulty: 'Hard',
    duration: '45-60 min',
    description: 'Design a real-time photo and video sharing platform with personalized feed algorithm',
    interviewTake: {
      overview: 'Instagram Feed is one of the most complex system design problems, involving real-time data processing, machine learning algorithms, and massive scale.',
      requirements: {
        functional: [
          'Users can upload photos/videos with captions and hashtags',
          'Users can follow other users and see their content in feed',
          'Feed should be personalized based on user behavior and preferences',
          'Users can like, comment, and share posts',
          'Real-time notifications for interactions',
          'Search functionality for users, hashtags, and locations'
        ],
        nonFunctional: [
          'Handle 1B+ daily active users',
          'Process 100M+ photos/videos daily',
          'Feed generation latency < 200ms',
          '99.9% availability',
          'Support global content distribution',
          'Handle viral content spikes (10x normal traffic)'
        ]
      },
      architecture: {
        highLevel: 'The system consists of multiple microservices: User Service, Media Service, Feed Service, Notification Service, and Search Service.',
        components: [
          {
            name: 'API Gateway',
            description: 'Single entry point handling authentication, rate limiting, and request routing',
            technologies: ['AWS API Gateway', 'Kong', 'Envoy Proxy']
          },
          {
            name: 'User Service',
            description: 'Manages user profiles, authentication, and social graph (followers/following)',
            technologies: ['PostgreSQL', 'Redis', 'JWT']
          },
          {
            name: 'Media Service',
            description: 'Handles photo/video upload, processing, and storage with CDN distribution',
            technologies: ['AWS S3', 'CloudFront', 'FFmpeg', 'ImageMagick']
          },
          {
            name: 'Feed Service',
            description: 'Core service generating personalized feeds using ML algorithms and caching',
            technologies: ['Redis', 'Cassandra', 'Apache Spark', 'TensorFlow']
          },
          {
            name: 'Notification Service',
            description: 'Real-time push notifications and in-app notifications',
            technologies: ['WebSocket', 'Firebase', 'Apache Kafka']
          },
          {
            name: 'Search Service',
            description: 'Full-text search across users, posts, and hashtags',
            technologies: ['Elasticsearch', 'Apache Lucene']
          }
        ]
      },
      dataModels: {
        user: {
          fields: ['id', 'username', 'email', 'profile_pic', 'bio', 'followers_count', 'following_count', 'created_at'],
          relationships: 'One-to-many with posts, many-to-many with other users (follows)'
        },
        post: {
          fields: ['id', 'user_id', 'media_urls', 'caption', 'hashtags', 'location', 'likes_count', 'comments_count', 'created_at'],
          relationships: 'Belongs to user, has many likes and comments'
        },
        feed: {
          fields: ['user_id', 'post_id', 'score', 'created_at'],
          relationships: 'Pre-computed feed entries for fast retrieval'
        }
      },
      algorithms: {
        feedRanking: {
          name: 'Personalized Feed Algorithm',
          description: 'Multi-factor ranking algorithm considering recency, engagement, relationship strength, and content type',
          factors: [
            'Recency: Newer posts get higher scores',
            'Engagement: Posts with more likes/comments rank higher',
            'Relationship: Posts from close friends/family rank higher',
            'Content Type: Videos and carousels get slight boost',
            'User Behavior: Based on past interaction patterns'
          ],
          implementation: 'Uses machine learning models trained on user interaction data, updated in real-time'
        }
      },
      scaling: {
        challenges: [
          'Feed generation for 1B+ users with personalized content',
          'Real-time processing of 100M+ daily uploads',
          'Handling viral content with 10x traffic spikes',
          'Global content distribution with low latency',
          'Machine learning model serving at scale'
        ],
        solutions: [
          'Pre-computed feeds with incremental updates',
          'Geographic sharding for user data',
          'CDN for global media distribution',
          'Event-driven architecture with Kafka',
          'Microservices with auto-scaling',
          'Caching at multiple levels (Redis, CDN)'
        ]
      },
      tradeoffs: [
        {
          decision: 'Pre-computed vs Real-time Feed Generation',
          pros: ['Fast response time', 'Reduced server load', 'Better user experience'],
          cons: ['Storage overhead', 'Complexity in updates', 'Potential staleness']
        },
        {
          decision: 'SQL vs NoSQL for User Data',
          pros: ['ACID compliance', 'Complex queries', 'Mature ecosystem'],
          cons: ['Scaling challenges', 'Schema rigidity', 'Higher cost']
        }
      ]
    },
    realWorldTake: {
      currentState: 'Instagram handles over 1 billion monthly active users with 100+ million photos uploaded daily.',
      technicalChallenges: [
        'Feed Algorithm Evolution: Instagram has changed its algorithm multiple times',
        'Scale Challenges: Handling viral content that can generate 10x normal traffic',
        'Real-time Processing: Processing millions of interactions in real-time',
        'Content Moderation: Automated detection of inappropriate content at scale',
        'Global Distribution: Ensuring fast content delivery worldwide'
      ],
      lessonsLearned: [
        'Start Simple: Instagram began with a simple chronological feed',
        'Data-Driven Decisions: All algorithm changes are A/B tested extensively',
        'User Experience First: Technical decisions prioritize user engagement',
        'Incremental Rollout: Major changes are rolled out gradually',
        'Monitoring Everything: Comprehensive metrics and alerting for all components'
      ],
      futureConsiderations: [
        'AI/ML Integration: More sophisticated recommendation algorithms',
        'Video Content: Optimizing for increasing video content consumption',
        'Shopping Integration: E-commerce features requiring new data models',
        'Creator Economy: Tools and monetization for content creators',
        'Privacy Regulations: Compliance with evolving data protection laws'
      ]
    }
  },
  'uber-dispatch': {
    title: 'Design Uber Dispatch System',
    difficulty: 'Hard',
    duration: '50-65 min',
    description: 'Design a real-time ride-matching and dispatch system handling millions of concurrent requests',
    interviewTake: {
      overview: 'Uber Dispatch is one of the most complex real-time systems, involving geospatial data processing, real-time matching algorithms, and massive scale.',
      requirements: {
        functional: [
          'Riders can request rides with pickup and destination locations',
          'System matches riders with nearby available drivers',
          'Real-time tracking of driver and ride status',
          'Dynamic pricing based on demand and supply',
          'Multiple ride types (UberX, UberXL, UberBlack)',
          'Driver can accept/decline ride requests',
          'Fare calculation and payment processing',
          'Rating system for both riders and drivers'
        ],
        nonFunctional: [
          'Handle 15M+ daily rides globally',
          'Match riders with drivers in < 10 seconds',
          '99.99% availability during peak hours',
          'Support 100K+ concurrent active rides',
          'Real-time location updates every 3-5 seconds',
          'Global deployment across multiple regions'
        ]
      },
      architecture: {
        highLevel: 'The system consists of multiple microservices: Ride Service, Driver Service, Matching Service, Pricing Service, and Payment Service.',
        components: [
          {
            name: 'API Gateway',
            description: 'Handles authentication, rate limiting, and request routing to appropriate services',
            technologies: ['AWS API Gateway', 'Kong', 'Envoy Proxy']
          },
          {
            name: 'Ride Service',
            description: 'Manages ride lifecycle from request to completion',
            technologies: ['PostgreSQL', 'Redis', 'WebSocket']
          },
          {
            name: 'Driver Service',
            description: 'Manages driver profiles, availability, and real-time location tracking',
            technologies: ['PostgreSQL', 'Redis', 'MongoDB']
          },
          {
            name: 'Matching Service',
            description: 'Core service for matching riders with drivers using geospatial algorithms',
            technologies: ['Redis', 'PostGIS', 'Apache Kafka', 'Elasticsearch']
          },
          {
            name: 'Pricing Service',
            description: 'Dynamic pricing based on demand, supply, and market conditions',
            technologies: ['Redis', 'Apache Spark', 'Machine Learning Models']
          },
          {
            name: 'Payment Service',
            description: 'Handles fare calculation, payment processing, and financial transactions',
            technologies: ['PostgreSQL', 'Stripe API', 'PayPal API']
          }
        ]
      },
      dataModels: {
        ride: {
          fields: ['id', 'rider_id', 'driver_id', 'pickup_lat', 'pickup_lng', 'dropoff_lat', 'dropoff_lng', 'status', 'fare', 'created_at', 'updated_at'],
          relationships: 'Belongs to rider and driver, has many location updates'
        },
        driver: {
          fields: ['id', 'name', 'phone', 'vehicle_id', 'current_lat', 'current_lng', 'status', 'rating', 'total_rides'],
          relationships: 'Has one vehicle, has many rides'
        },
        location: {
          fields: ['id', 'driver_id', 'lat', 'lng', 'timestamp', 'accuracy'],
          relationships: 'Belongs to driver, used for real-time tracking'
        }
      },
      algorithms: {
        matching: {
          name: 'Geospatial Matching Algorithm',
          description: 'Efficiently matches riders with nearby available drivers using spatial indexing',
          approach: [
            'Spatial Indexing: Use R-tree or Geohash for efficient proximity searches',
            'Driver Filtering: Filter by availability, ride type compatibility, and distance',
            'Scoring: Rank drivers by distance, rating, and other factors',
            'Assignment: Assign best available driver to rider'
          ],
          complexity: 'O(log n) for spatial queries, O(k) for driver ranking where k is number of nearby drivers'
        },
        pricing: {
          name: 'Dynamic Pricing Algorithm',
          description: 'Calculates surge pricing based on real-time demand and supply',
          factors: [
            'Demand: Number of ride requests in area',
            'Supply: Number of available drivers in area',
            'Time of day: Peak hours have higher base rates',
            'Weather: Inclement weather increases demand',
            'Events: Special events create demand spikes'
          ],
          implementation: 'Machine learning models trained on historical data, updated in real-time'
        }
      },
      scaling: {
        challenges: [
          'Real-time location tracking for millions of drivers',
          'Geospatial queries at massive scale',
          'Handling peak demand (10x normal traffic)',
          'Global deployment with low latency',
          'Ensuring driver-rider matching fairness'
        ],
        solutions: [
          'Geographic sharding for location data',
          'Spatial indexing with Redis and PostGIS',
          'Event-driven architecture with Kafka',
          'Microservices with auto-scaling',
          'CDN for static content and maps',
          'Circuit breakers for external services'
        ]
      },
      tradeoffs: [
        {
          decision: 'Real-time vs Batch Processing for Matching',
          pros: ['Immediate response', 'Better user experience', 'Real-time updates'],
          cons: ['Higher complexity', 'More resource intensive', 'Harder to optimize']
        },
        {
          decision: 'SQL vs NoSQL for Location Data',
          pros: ['ACID compliance', 'Complex queries', 'Mature ecosystem'],
          cons: ['Scaling challenges', 'Schema rigidity', 'Higher cost']
        }
      ]
    },
    realWorldTake: {
      currentState: 'Uber handles over 15 million daily rides globally with 3+ million active drivers.',
      technicalChallenges: [
        'Scale Evolution: From thousands to millions of daily rides required complete system redesign',
        'Real-time Processing: Processing location updates from millions of drivers every few seconds',
        'Geographic Complexity: Different regulations and requirements across global markets',
        'Dynamic Pricing: Balancing supply and demand while maintaining driver and rider satisfaction',
        'Safety and Compliance: Implementing safety features and regulatory compliance'
      ],
      lessonsLearned: [
        'Start Simple: Uber began with basic matching and added complexity over time',
        'Data is Everything: Location data quality directly impacts matching accuracy',
        'User Experience: Technical decisions must prioritize both rider and driver experience',
        'Regulatory Compliance: Different markets require different technical approaches',
        'Continuous Optimization: Matching algorithms are constantly being improved'
      ],
      futureConsiderations: [
        'Autonomous Vehicles: Preparing for driverless car integration',
        'Multi-modal Transportation: Integrating with public transit and other services',
        'Sustainability: Electric vehicles and carbon footprint optimization',
        'AI/ML Integration: More sophisticated matching and pricing algorithms',
        'Global Expansion: Entering new markets with different requirements'
      ]
    }
  },
  'netflix-streaming': {
    title: 'Design Netflix Streaming Platform',
    difficulty: 'Hard',
    duration: '55-70 min',
    description: 'Design a global video streaming platform with content delivery, recommendation engine, and massive scale',
    interviewTake: {
      overview: 'Netflix Streaming is one of the most complex content delivery systems, involving global CDN, recommendation algorithms, and massive scale.',
      requirements: {
        functional: [
          'Users can browse and search for movies and TV shows',
          'Personalized recommendations based on viewing history',
          'Video streaming with adaptive bitrate',
          'Multiple device support (mobile, tablet, TV, desktop)',
          'User profiles and watchlists',
          'Content rating and reviews',
          'Offline download capability',
          'Parental controls and content filtering'
        ],
        nonFunctional: [
          'Handle 200M+ subscribers globally',
          'Stream 1B+ hours of content daily',
          'Video streaming latency < 2 seconds',
          '99.99% availability',
          'Support 4K and HDR content',
          'Global content delivery with < 100ms latency'
        ]
      },
      architecture: {
        highLevel: 'The system consists of multiple microservices: User Service, Content Service, Recommendation Service, Streaming Service, and CDN.',
        components: [
          {
            name: 'API Gateway',
            description: 'Single entry point handling authentication, rate limiting, and request routing',
            technologies: ['AWS API Gateway', 'Kong', 'Envoy Proxy']
          },
          {
            name: 'User Service',
            description: 'Manages user profiles, authentication, and viewing history',
            technologies: ['PostgreSQL', 'Redis', 'JWT']
          },
          {
            name: 'Content Service',
            description: 'Manages metadata for movies, TV shows, and other content',
            technologies: ['PostgreSQL', 'Elasticsearch', 'Redis']
          },
          {
            name: 'Recommendation Service',
            description: 'ML-powered recommendation engine for personalized content',
            technologies: ['Apache Spark', 'TensorFlow', 'Redis', 'Apache Kafka']
          },
          {
            name: 'Streaming Service',
            description: 'Handles video streaming requests and adaptive bitrate selection',
            technologies: ['Node.js', 'FFmpeg', 'HLS', 'DASH']
          },
          {
            name: 'CDN',
            description: 'Global content delivery network for video streaming',
            technologies: ['AWS CloudFront', 'CloudFlare', 'Akamai']
          }
        ]
      },
      dataModels: {
        user: {
          fields: ['id', 'email', 'password_hash', 'subscription_plan', 'created_at', 'last_login'],
          relationships: 'Has many profiles, has many viewing_history entries'
        },
        profile: {
          fields: ['id', 'user_id', 'name', 'avatar', 'maturity_rating', 'is_kids_profile'],
          relationships: 'Belongs to user, has many viewing_history entries'
        },
        content: {
          fields: ['id', 'title', 'description', 'release_date', 'duration', 'rating', 'genres', 'content_type'],
          relationships: 'Has many episodes (for TV shows), has many viewing_history entries'
        },
        viewing_history: {
          fields: ['id', 'profile_id', 'content_id', 'watch_time', 'completed', 'timestamp'],
          relationships: 'Belongs to profile and content'
        }
      },
      algorithms: {
        recommendation: {
          name: 'Collaborative Filtering + Content-Based Filtering',
          description: 'Hybrid recommendation system combining user behavior and content features',
          approach: [
            'Collaborative Filtering: Find users with similar viewing patterns',
            'Content-Based Filtering: Recommend similar content based on features',
            'Matrix Factorization: Decompose user-item interaction matrix',
            'Deep Learning: Use neural networks for complex pattern recognition'
          ],
          implementation: 'Apache Spark for batch processing, TensorFlow for real-time inference'
        },
        adaptiveBitrate: {
          name: 'Adaptive Bitrate Streaming',
          description: 'Dynamically adjusts video quality based on network conditions',
          factors: [
            'Network Bandwidth: Available bandwidth for video streaming',
            'Device Capabilities: Screen resolution and processing power',
            'User Preferences: Quality vs data usage preferences',
            'Content Complexity: Action scenes require higher bitrates'
          ],
          implementation: 'HLS or DASH protocols with multiple quality levels'
        }
      },
      scaling: {
        challenges: [
          'Global content delivery with low latency',
          'Handling peak viewing hours (8-11 PM)',
          'Content storage and distribution',
          'Real-time recommendation serving',
          'Multi-device synchronization'
        ],
        solutions: [
          'Global CDN with edge caching',
          'Geographic distribution of content',
          'Predictive content pre-positioning',
          'Microservices with auto-scaling',
          'Event-driven architecture with Kafka',
          'Caching at multiple levels'
        ]
      },
      tradeoffs: [
        {
          decision: 'Centralized vs Distributed Content Storage',
          pros: ['Easier management', 'Consistent updates', 'Lower complexity'],
          cons: ['Higher latency', 'Single point of failure', 'Bandwidth costs']
        },
        {
          decision: 'Real-time vs Batch Recommendation Updates',
          pros: ['Fresh recommendations', 'Better user experience', 'Real-time personalization'],
          cons: ['Higher complexity', 'More resource intensive', 'Harder to optimize']
        }
      ]
    },
    realWorldTake: {
      currentState: 'Netflix has over 200 million subscribers globally and streams over 1 billion hours of content daily.',
      technicalChallenges: [
        'Scale Evolution: From thousands to millions of concurrent streams',
        'Content Delivery: Ensuring smooth streaming across diverse network conditions',
        'Recommendation Accuracy: Improving recommendation relevance and diversity',
        'Global Expansion: Adapting to different markets and regulations',
        'Content Production: Managing original content production and distribution'
      ],
      lessonsLearned: [
        'Content is King: Technical decisions must prioritize content quality and availability',
        'User Experience: Smooth streaming is more important than perfect recommendations',
        'Data-Driven Decisions: A/B testing drives all major changes',
        'Global Thinking: Technical architecture must work across all markets',
        'Continuous Innovation: Constantly improving algorithms and infrastructure'
      ],
      futureConsiderations: [
        'Interactive Content: Supporting interactive movies and shows',
        'Virtual Reality: VR content streaming and delivery',
        'Live Content: Real-time streaming for live events',
        'AI/ML Integration: More sophisticated recommendation algorithms',
        'Sustainability: Reducing carbon footprint of content delivery'
      ]
    }
  },
  'whatsapp-messaging': {
    title: 'Design WhatsApp Messaging',
    difficulty: 'Hard',
    duration: '50-65 min',
    description: 'Design a real-time messaging platform with end-to-end encryption and global scale',
    interviewTake: {
      overview: 'WhatsApp is one of the most complex messaging systems, involving real-time communication, end-to-end encryption, and massive global scale.',
      requirements: {
        functional: [
          'Users can send text, media, and voice messages',
          'Real-time message delivery and read receipts',
          'Group messaging with up to 256 participants',
          'End-to-end encryption for all messages',
          'Message status indicators (sent, delivered, read)',
          'Media sharing (photos, videos, documents)',
          'Voice and video calling capabilities',
          'Message search and history'
        ],
        nonFunctional: [
          'Handle 2B+ monthly active users',
          'Process 100B+ messages daily',
          'Message delivery latency < 1 second',
          '99.99% availability',
          'Support global deployment',
          'End-to-end encryption without compromising performance'
        ]
      },
      architecture: {
        highLevel: 'The system consists of multiple microservices: Message Service, User Service, Media Service, Encryption Service, and WebSocket Service.',
        components: [
          {
            name: 'API Gateway',
            description: 'Handles authentication, rate limiting, and request routing',
            technologies: ['AWS API Gateway', 'Kong', 'Envoy Proxy']
          },
          {
            name: 'Message Service',
            description: 'Core service managing message lifecycle and delivery',
            technologies: ['Node.js', 'Redis', 'Apache Kafka', 'PostgreSQL']
          },
          {
            name: 'User Service',
            description: 'Manages user profiles, contacts, and authentication',
            technologies: ['PostgreSQL', 'Redis', 'JWT']
          },
          {
            name: 'Media Service',
            description: 'Handles media upload, processing, and storage',
            technologies: ['AWS S3', 'CloudFront', 'FFmpeg', 'ImageMagick']
          },
          {
            name: 'Encryption Service',
            description: 'Manages end-to-end encryption keys and protocols',
            technologies: ['Signal Protocol', 'libsodium', 'RSA', 'AES-256']
          },
          {
            name: 'WebSocket Service',
            description: 'Real-time message delivery and presence',
            technologies: ['WebSocket', 'Socket.io', 'Redis Pub/Sub']
          },
          {
            name: 'Notification Service',
            description: 'Push notifications for offline users',
            technologies: ['Firebase', 'APNs', 'FCM']
          }
        ]
      },
      dataModels: {
        user: {
          fields: ['id', 'phone_number', 'name', 'profile_pic', 'status', 'last_seen', 'created_at'],
          relationships: 'Has many messages, has many contacts'
        },
        message: {
          fields: ['id', 'sender_id', 'receiver_id', 'group_id', 'content', 'message_type', 'encrypted_content', 'status', 'created_at'],
          relationships: 'Belongs to sender and receiver, belongs to group'
        },
        group: {
          fields: ['id', 'name', 'description', 'admin_id', 'participants', 'created_at'],
          relationships: 'Has many messages, has many participants'
        }
      },
      algorithms: {
        encryption: {
          name: 'End-to-End Encryption Protocol',
          description: 'Signal Protocol implementation for secure message transmission',
          approach: [
            'Key Exchange: Generate unique key pairs for each conversation',
            'Message Encryption: Encrypt each message with unique keys',
            'Perfect Forward Secrecy: Keys are deleted after use',
            'Authentication: Verify message integrity and sender identity'
          ],
          implementation: 'Signal Protocol with libsodium for cryptographic operations'
        },
        delivery: {
          name: 'Message Delivery Algorithm',
          description: 'Ensures reliable message delivery with retry mechanisms',
          approach: [
            'Immediate Delivery: Try to deliver to online users',
            'Queue for Offline: Store messages for offline users',
            'Retry Logic: Exponential backoff for failed deliveries',
            'Dead Letter Queue: Handle permanently failed messages'
          ],
          implementation: 'Redis queues with Apache Kafka for message persistence'
        }
      },
      scaling: {
        challenges: [
          'Real-time message delivery to 2B+ users',
          'End-to-end encryption at massive scale',
          'Media storage and distribution globally',
          'Handling peak message volumes',
          'Cross-platform synchronization'
        ],
        solutions: [
          'Geographic sharding for user data',
          'WebSocket clustering with Redis',
          'CDN for global media distribution',
          'Microservices with auto-scaling',
          'Event-driven architecture with Kafka',
          'Edge computing for reduced latency'
        ]
      },
      tradeoffs: [
        {
          decision: 'End-to-End Encryption vs Performance',
          pros: ['Maximum security', 'User privacy', 'Regulatory compliance'],
          cons: ['Higher complexity', 'Performance overhead', 'Key management complexity']
        },
        {
          decision: 'Real-time vs Reliable Delivery',
          pros: ['Immediate feedback', 'Better user experience', 'Real-time presence'],
          cons: ['Higher complexity', 'More resource intensive', 'Network dependency']
        }
      ]
    },
    realWorldTake: {
      currentState: 'WhatsApp handles over 2 billion monthly active users with 100+ billion messages sent daily.',
      technicalChallenges: [
        'Scale Evolution: From thousands to billions of users required complete system redesign',
        'Encryption at Scale: Implementing end-to-end encryption without compromising performance',
        'Global Distribution: Ensuring fast message delivery worldwide',
        'Media Handling: Processing and storing massive amounts of media content',
        'Cross-Platform Sync: Maintaining consistency across different devices and platforms'
      ],
      lessonsLearned: [
        'Security First: End-to-end encryption was implemented from the beginning',
        'User Experience: Simple interface hides complex technical implementation',
        'Global Thinking: Architecture designed for worldwide deployment',
        'Performance Matters: Encryption cannot compromise user experience',
        'Continuous Innovation: Constantly improving security and features'
      ],
      futureConsiderations: [
        'Quantum Computing: Preparing for post-quantum cryptography',
        'AI Integration: Smart features and automated responses',
        'Business Features: WhatsApp Business and payment integration',
        'Cross-Platform: Desktop and web applications',
        'Privacy Regulations: Compliance with evolving data protection laws'
      ]
    }
  },
  'youtube-video-streaming': {
    title: 'Design YouTube Video Streaming',
    difficulty: 'Hard',
    duration: '55-70 min',
    description: 'Design a global video streaming platform with content delivery, recommendation engine, and massive scale',
    interviewTake: {
      overview: 'YouTube is one of the most complex video streaming systems, involving global CDN, recommendation algorithms, and massive scale.',
      requirements: {
        functional: [
          'Users can upload videos with metadata and thumbnails',
          'Video streaming with adaptive bitrate',
          'Personalized recommendations based on viewing history',
          'Search functionality for videos, channels, and playlists',
          'User channels with subscription system',
          'Comments, likes, and sharing features',
          'Live streaming capabilities',
          'Monetization through ads and memberships'
        ],
        nonFunctional: [
          'Handle 2B+ monthly active users',
          'Stream 1B+ hours of content daily',
          'Video streaming latency < 2 seconds',
          '99.99% availability',
          'Support 4K and 8K content',
          'Global content delivery with < 100ms latency'
        ]
      },
      architecture: {
        highLevel: 'The system consists of multiple microservices: Video Service, User Service, Recommendation Service, Search Service, and CDN.',
        components: [
          {
            name: 'API Gateway',
            description: 'Single entry point handling authentication, rate limiting, and request routing',
            technologies: ['Google Cloud Load Balancer', 'Envoy Proxy']
          },
          {
            name: 'Video Service',
            description: 'Manages video upload, processing, and metadata',
            technologies: ['Google Cloud Storage', 'FFmpeg', 'TensorFlow', 'PostgreSQL']
          },
          {
            name: 'User Service',
            description: 'Manages user profiles, channels, and subscriptions',
            technologies: ['PostgreSQL', 'Redis', 'JWT']
          },
          {
            name: 'Recommendation Service',
            description: 'ML-powered recommendation engine for personalized content',
            technologies: ['TensorFlow', 'Apache Spark', 'Redis', 'Apache Kafka']
          },
          {
            name: 'Search Service',
            description: 'Full-text search across videos, channels, and playlists',
            technologies: ['Elasticsearch', 'Apache Lucene', 'Google Cloud Search']
          },
          {
            name: 'CDN',
            description: 'Global content delivery network for video streaming',
            technologies: ['Google Cloud CDN', 'CloudFlare', 'Akamai']
          },
          {
            name: 'Analytics Service',
            description: 'Tracks user behavior and content performance metrics',
            technologies: ['Apache Kafka', 'Apache Spark', 'BigQuery']
          }
        ]
      },
      dataModels: {
        user: {
          fields: ['id', 'email', 'username', 'channel_name', 'subscriber_count', 'created_at'],
          relationships: 'Has many videos, has many subscriptions'
        },
        video: {
          fields: ['id', 'user_id', 'title', 'description', 'video_url', 'thumbnail_url', 'duration', 'views', 'likes', 'created_at'],
          relationships: 'Belongs to user, has many comments and likes'
        },
        subscription: {
          fields: ['id', 'user_id', 'channel_id', 'created_at'],
          relationships: 'Belongs to user and channel'
        }
      },
      algorithms: {
        recommendation: {
          name: 'Deep Learning Recommendation System',
          description: 'Neural network-based recommendation system using user behavior and content features',
          approach: [
            'Collaborative Filtering: Find users with similar viewing patterns',
            'Content-Based Filtering: Recommend similar videos based on features',
            'Deep Learning: Use neural networks for complex pattern recognition',
            'Real-time Updates: Continuously update recommendations based on new data'
          ],
          implementation: 'TensorFlow for model training, TensorFlow Serving for real-time inference'
        },
        adaptiveBitrate: {
          name: 'Adaptive Bitrate Streaming',
          description: 'Dynamically adjusts video quality based on network conditions and device capabilities',
          factors: [
            'Network Bandwidth: Available bandwidth for video streaming',
            'Device Capabilities: Screen resolution and processing power',
            'User Preferences: Quality vs data usage preferences',
            'Content Complexity: Action scenes require higher bitrates'
          ],
          implementation: 'DASH and HLS protocols with multiple quality levels'
        }
      },
      scaling: {
        challenges: [
          'Global video delivery with low latency',
          'Handling peak viewing hours',
          'Video storage and processing at scale',
          'Real-time recommendation serving',
          'Search across massive video library'
        ],
        solutions: [
          'Global CDN with edge caching',
          'Geographic distribution of content',
          'Predictive content pre-positioning',
          'Microservices with auto-scaling',
          'Event-driven architecture with Kafka',
          'Machine learning model serving at scale'
        ]
      },
      tradeoffs: [
        {
          decision: 'Centralized vs Distributed Video Storage',
          pros: ['Easier management', 'Consistent updates', 'Lower complexity'],
          cons: ['Higher latency', 'Single point of failure', 'Bandwidth costs']
        },
        {
          decision: 'Real-time vs Batch Recommendation Updates',
          pros: ['Fresh recommendations', 'Better user experience', 'Real-time personalization'],
          cons: ['Higher complexity', 'More resource intensive', 'Harder to optimize']
        }
      ]
    },
    realWorldTake: {
      currentState: 'YouTube has over 2 billion monthly active users and streams over 1 billion hours of content daily.',
      technicalChallenges: [
        'Scale Evolution: From thousands to billions of concurrent streams',
        'Content Delivery: Ensuring smooth streaming across diverse network conditions',
        'Recommendation Accuracy: Improving recommendation relevance and diversity',
        'Global Expansion: Adapting to different markets and regulations',
        'Content Moderation: Automated detection of inappropriate content at scale'
      ],
      lessonsLearned: [
        'Content is King: Technical decisions must prioritize content quality and availability',
        'User Experience: Smooth streaming is more important than perfect recommendations',
        'Data-Driven Decisions: A/B testing drives all major changes',
        'Global Thinking: Technical architecture must work across all markets',
        'Continuous Innovation: Constantly improving algorithms and infrastructure'
      ],
      futureConsiderations: [
        'Live Streaming: Real-time streaming for live events and gaming',
        'Virtual Reality: VR content streaming and delivery',
        'AI Integration: More sophisticated recommendation and content analysis algorithms',
        'Creator Economy: Tools and monetization for content creators',
        'Sustainability: Reducing carbon footprint of content delivery'
      ]
    }
  },
  'twitter-social-feed': {
    title: 'Design Twitter Social Feed',
    difficulty: 'Hard',
    duration: '45-60 min',
    description: 'Design a real-time social media platform with timeline generation and global scale',
    interviewTake: {
      overview: 'Twitter is one of the most complex social media systems, involving real-time timeline generation, content moderation, and massive scale.',
      requirements: {
        functional: [
          'Users can post tweets with text, images, and videos',
          'Real-time timeline generation and updates',
          'Follow/unfollow system for user connections',
          'Tweet interactions (like, retweet, reply)',
          'Hashtag and mention functionality',
          'Search across tweets and users',
          'Trending topics and hashtags',
          'Content moderation and reporting'
        ],
        nonFunctional: [
          'Handle 400M+ monthly active users',
          'Process 500M+ tweets daily',
          'Timeline generation latency < 200ms',
          '99.9% availability',
          'Support global content distribution',
          'Handle viral content spikes (10x normal traffic)'
        ]
      },
      architecture: {
        highLevel: 'The system consists of multiple microservices: Tweet Service, User Service, Timeline Service, Search Service, and Moderation Service.',
        components: [
          {
            name: 'API Gateway',
            description: 'Single entry point handling authentication, rate limiting, and request routing',
            technologies: ['AWS API Gateway', 'Kong', 'Envoy Proxy']
          },
          {
            name: 'Tweet Service',
            description: 'Manages tweet creation, storage, and retrieval',
            technologies: ['PostgreSQL', 'Redis', 'Apache Kafka']
          },
          {
            name: 'User Service',
            description: 'Manages user profiles, authentication, and social graph',
            technologies: ['PostgreSQL', 'Redis', 'JWT']
          },
          {
            name: 'Timeline Service',
            description: 'Core service generating personalized timelines',
            technologies: ['Redis', 'Cassandra', 'Apache Spark']
          },
          {
            name: 'Search Service',
            description: 'Full-text search across tweets and users',
            technologies: ['Elasticsearch', 'Apache Lucene']
          },
          {
            name: 'Moderation Service',
            description: 'Content moderation and spam detection',
            technologies: ['Machine Learning Models', 'Apache Kafka', 'Redis']
          },
          {
            name: 'Notification Service',
            description: 'Real-time push notifications for interactions',
            technologies: ['WebSocket', 'Firebase', 'Apache Kafka']
          }
        ]
      },
      dataModels: {
        user: {
          fields: ['id', 'username', 'display_name', 'bio', 'followers_count', 'following_count', 'created_at'],
          relationships: 'Has many tweets, many-to-many with other users (follows)'
        },
        tweet: {
          fields: ['id', 'user_id', 'content', 'media_urls', 'hashtags', 'mentions', 'likes_count', 'retweets_count', 'created_at'],
          relationships: 'Belongs to user, has many likes and retweets'
        },
        timeline: {
          fields: ['user_id', 'tweet_id', 'score', 'created_at'],
          relationships: 'Pre-computed timeline entries for fast retrieval'
        }
      },
      algorithms: {
        timelineGeneration: {
          name: 'Personalized Timeline Algorithm',
          description: 'Multi-factor ranking algorithm for timeline generation',
          factors: [
            'Recency: Newer tweets get higher scores',
            'Engagement: Tweets with more interactions rank higher',
            'Relationship: Tweets from followed users rank higher',
            'Content Quality: High-quality content gets boost',
            'User Behavior: Based on past interaction patterns'
          ],
          implementation: 'Machine learning models trained on user interaction data'
        },
        trending: {
          name: 'Trending Topics Algorithm',
          description: 'Identifies trending topics and hashtags in real-time',
          approach: [
            'Volume Tracking: Monitor tweet volume for topics',
            'Velocity Analysis: Track rate of increase in mentions',
            'Geographic Filtering: Consider location-based trends',
            'Temporal Analysis: Account for time-based patterns'
          ],
          implementation: 'Apache Spark for real-time stream processing'
        }
      },
      scaling: {
        challenges: [
          'Timeline generation for 400M+ users',
          'Real-time processing of 500M+ daily tweets',
          'Handling viral content with 10x traffic spikes',
          'Global content distribution with low latency',
          'Content moderation at scale'
        ],
        solutions: [
          'Pre-computed timelines with incremental updates',
          'Geographic sharding for user data',
          'CDN for global content distribution',
          'Event-driven architecture with Kafka',
          'Microservices with auto-scaling',
          'Machine learning for automated moderation'
        ]
      },
      tradeoffs: [
        {
          decision: 'Pre-computed vs Real-time Timeline Generation',
          pros: ['Fast response time', 'Reduced server load', 'Better user experience'],
          cons: ['Storage overhead', 'Complexity in updates', 'Potential staleness']
        },
        {
          decision: 'Centralized vs Distributed Content Moderation',
          pros: ['Consistent policies', 'Easier management', 'Lower complexity'],
          cons: ['Higher latency', 'Single point of failure', 'Scalability challenges']
        }
      ]
    },
    realWorldTake: {
      currentState: 'Twitter handles over 400 million monthly active users with 500+ million tweets sent daily.',
      technicalChallenges: [
        'Timeline Algorithm Evolution: Twitter has changed its algorithm multiple times, moving from chronological to engagement-based',
        'Scale Challenges: Handling viral content that can generate 10x normal traffic in minutes',
        'Real-time Processing: Processing millions of interactions (likes, retweets) in real-time',
        'Content Moderation: Automated detection of inappropriate content at scale',
        'Global Distribution: Ensuring fast content delivery worldwide'
      ],
      lessonsLearned: [
        'Start Simple: Twitter began with a simple chronological timeline and evolved complexity over time',
        'Data-Driven Decisions: All algorithm changes are A/B tested extensively before rollout',
        'User Experience First: Technical decisions always prioritize user engagement and satisfaction',
        'Incremental Rollout: Major changes are rolled out gradually to minimize risk',
        'Monitoring Everything: Comprehensive metrics and alerting for all system components'
      ],
      futureConsiderations: [
        'AI/ML Integration: More sophisticated recommendation and moderation algorithms',
        'Video Content: Optimizing for increasing video content consumption',
        'Creator Economy: Tools and monetization for content creators',
        'Privacy Regulations: Compliance with evolving data protection laws',
        'Real-time Features: Enhanced real-time capabilities and live streaming'
      ]
    }
  }
};
