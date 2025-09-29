# Database Seeding Guide for Monchee

This guide explains how to use the database seeding script to populate Monchee with demo users, progress, and badges for development and testing.

## 🌱 Seeding Overview

The seeding script creates a realistic development environment with:
- **6 demo users** with different skill levels and backgrounds
- **36 progress records** across various activity types
- **31 badges** representing different achievements
- **Realistic point distribution** based on completed activities

## 👥 Demo Users Created

### 1. @rharshit82 (Harshit Rai) - 232 points
- **Background**: Full Stack Dev, loves system design
- **Provider**: GitHub
- **Activities**: 9 completed (2 quizzes, 2 labs, 2 deep dives, 1 cheatsheet, 2 library)
- **Badges**: 6 badges including "Cache Master" and "Dedicated Learner"
- **Avatar**: Real GitHub avatar

### 2. @sarah (Sarah Wilson) - 215 points
- **Background**: Senior Software Engineer at tech startup
- **Provider**: GitHub
- **Activities**: 8 completed (2 quizzes, 2 labs, 2 deep dives, 1 cheatsheet, 1 library)
- **Badges**: 7 badges including "Perfect Score" and "System Design Enthusiast"
- **Special**: Achieved 100% on a quiz

### 3. @alice (Alice Johnson) - 132 points
- **Background**: Backend engineer with 5+ years experience
- **Provider**: Google
- **Activities**: 6 completed (2 quizzes, 1 lab, 1 deep dive, 1 cheatsheet, 1 library)
- **Badges**: 5 badges including "Sharding Pro"
- **Special**: Expert in database sharding

### 4. @mike (Mike Chen) - 124 points
- **Background**: Platform engineer with Kubernetes expertise
- **Provider**: Google
- **Activities**: 5 completed (1 quiz, 1 lab, 1 deep dive, 1 cheatsheet, 1 library)
- **Badges**: 5 badges including "Quick Learner"
- **Special**: Focused on platform technologies

### 5. @emma (Emma Davis) - 101 points
- **Background**: Data engineer transitioning to system design
- **Provider**: Email
- **Activities**: 4 completed (1 quiz, 1 lab, 1 deep dive, 1 library)
- **Badges**: 4 badges including "Library Explorer"
- **Special**: Data engineering background

### 6. @bob (Bob Smith) - 98 points
- **Background**: Infrastructure engineer and DevOps enthusiast
- **Provider**: Email
- **Activities**: 4 completed (1 quiz, 1 lab, 1 deep dive, 1 cheatsheet)
- **Badges**: 4 badges including "Quick Learner"
- **Special**: Infrastructure and DevOps focus

## 📊 Activity Types Seeded

### Quizzes
- **caching-basics**: Caching fundamentals
- **sharding-basics**: Database sharding concepts
- **database-trade-offs**: Database design decisions

### Labs
- **rate-limiter**: Rate limiting implementation
- **url-shortener**: URL shortening service
- **message-queue**: Message queue system

### Deep Dives
- **instagram-feed**: Instagram feed architecture
- **uber-dispatch**: Uber dispatch system
- **netflix-streaming**: Netflix streaming platform

### Cheatsheets
- **caching-patterns**: Caching strategies
- **database-trade-offs**: Database design patterns

### Library
- **sharding**: Database sharding concepts
- **message-queues**: Message queue patterns
- **cap-theorem**: CAP theorem fundamentals

## 🏆 Badge Categories

### Milestone Badges
- **Welcome!** 🎉 - Joined Monchee
- **Dedicated Learner** 📚 - Completed 10+ activities
- **System Design Enthusiast** 🏗️ - Completed 50+ activities

### Achievement Badges
- **Quiz Master** 🧠 - Scored 90%+ on a quiz
- **Perfect Score** 🎯 - Scored 100% on a quiz
- **Lab Explorer** 🔬 - Completed a lab
- **Deep Thinker** 🧠 - Completed a deep dive
- **Quick Learner** ⚡ - Reviewed a cheatsheet
- **Library Explorer** 📖 - Explored the library

### Special Badges
- **Cache Master** 🔥 - Expert in caching strategies
- **Sharding Pro** 🗂️ - Expert in database sharding

## 🚀 Usage

### Run Seeding
```bash
npx prisma db seed
```

### View Database
```bash
npm run db:studio
```

### Reset and Reseed
```bash
# Clear database
rm dev.db

# Push schema
npx prisma db push

# Reseed
npx prisma db seed
```

## 🔗 Testing URLs

After seeding, you can test these URLs:

### Profile Pages
- `/profile/rharshit82` - Top performer with GitHub avatar
- `/profile/sarah` - Perfect score achiever
- `/profile/alice` - Sharding expert
- `/profile/mike` - Platform engineer
- `/profile/emma` - Data engineer
- `/profile/bob` - Infrastructure engineer

### Community Page
- `/community` - Leaderboard with all seeded users

## 📈 Data Verification

The seeding script provides a summary showing:
- User rankings by points
- Activity counts per user
- Badge counts per user
- Total points distribution

Example output:
```
📈 Seeding Summary:
==================
1. @rharshit82 - 232 points (9 activities, 6 badges)
2. @sarah - 215 points (8 activities, 7 badges)
3. @alice - 132 points (6 activities, 5 badges)
4. @mike - 124 points (5 activities, 5 badges)
5. @emma - 101 points (4 activities, 4 badges)
6. @bob - 98 points (4 activities, 4 badges)
```

## 🛠️ Customization

### Adding New Users
Edit `prisma/seed.ts` and add to the `demoUsers` array:
```typescript
{
  clerkId: "demo_username",
  username: "username",
  firstName: "First",
  lastName: "Last",
  email: "email@example.com",
  avatarUrl: "https://example.com/avatar.jpg",
  bio: "User bio",
  provider: "github", // or "google" or "email"
  points: 0, // Will be calculated from progress
}
```

### Adding New Activities
Add to the `progressData` array:
```typescript
{ userId: userMap.get("username"), type: "quiz", ref: "quiz-slug", status: "completed", score: 95, points: 10 }
```

### Adding New Badges
Add to the `badgeData` array:
```typescript
{ userId: userMap.get("username"), name: "Badge Name", icon: "🏆", description: "Badge description", category: "achievement" }
```

## 🎯 Benefits

### Development
- **Realistic data** for testing UI components
- **Different user types** to test various scenarios
- **Complete progress tracking** to test all features
- **Badge system** to test achievement logic

### Demo
- **Professional appearance** with real avatars and data
- **Engaging leaderboard** with competitive rankings
- **Diverse user profiles** showing different learning paths
- **Rich activity history** demonstrating platform features

### Testing
- **Edge cases** with different point distributions
- **UI responsiveness** with various data sizes
- **Performance testing** with realistic data volumes
- **Feature validation** across different user types

The seeding system ensures Monchee always has compelling, realistic data for development, testing, and demonstrations! 🎉
