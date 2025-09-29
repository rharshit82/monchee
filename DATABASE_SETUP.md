# Database Setup Guide for Monchee

This guide explains how to set up and use the Prisma + SQLite database integration in Monchee.

## 🗄️ Database Schema

The application uses the following models:

### UserProfile
- **id**: Unique identifier (CUID)
- **clerkId**: Clerk user ID (unique)
- **username**: Display username (unique)
- **avatarUrl**: Profile picture URL
- **bio**: User biography
- **firstName/lastName**: User's name
- **email**: User's email address
- **provider**: Authentication provider (github/google/email)
- **points**: Total points earned
- **createdAt/updatedAt**: Timestamps

### Progress
- **id**: Unique identifier (CUID)
- **userId**: Foreign key to UserProfile
- **type**: Activity type (quiz/lab/deep-dive/cheatsheet/library)
- **ref**: Reference to specific item (slug or ID)
- **status**: Completion status (completed/in-progress/started)
- **score**: Quiz score (0-100)
- **points**: Points earned for this activity
- **createdAt/updatedAt**: Timestamps

### Badge
- **id**: Unique identifier (CUID)
- **userId**: Foreign key to UserProfile
- **name**: Badge name
- **icon**: Emoji or icon
- **description**: Badge description
- **category**: Badge category (achievement/milestone/special)
- **createdAt**: Award date

## 🚀 Getting Started

### 1. Database Setup
The database is already configured with SQLite. The schema is defined in `prisma/schema.prisma`.

### 2. Environment Variables
Make sure your `.env.local` includes:
```env
DATABASE_URL="file:./dev.db"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Push Schema to Database
```bash
npx prisma db push
```

### 5. Seed Sample Data
```bash
npm run db:seed
```

### 6. View Database (Optional)
```bash
npm run db:studio
```

## 📊 Features Implemented

### ✅ User Management
- **Automatic user sync** from Clerk on first login
- **Social account integration** (Google, GitHub, Email)
- **Profile creation** with social data extraction
- **Username generation** from social accounts

### ✅ Progress Tracking
- **Quiz completion** with scoring
- **Lab completion** tracking
- **Deep dive** progress
- **Cheatsheet** and **library** exploration
- **Points system** with automatic calculation
- **API endpoints** for progress updates

### ✅ Badge System
- **Automatic badge awarding** based on activities
- **Milestone badges** for completion counts
- **Achievement badges** for specific accomplishments
- **Special badges** for unique behaviors
- **Badge categories** for organization

### ✅ Community Features
- **Dynamic leaderboard** with real database data
- **User profiles** with progress visualization
- **Activity tracking** and recent history
- **Points-based ranking** system

## 🔧 API Endpoints

### Progress Tracking
- **POST** `/api/progress`
  - Body: `{ type, ref, status, score?, points? }`
  - Tracks user progress and awards badges

### User Sync
- **Automatic** on protected route access
- Syncs Clerk user data to database
- Creates user profile on first login

## 📈 Usage Examples

### Track Quiz Completion
```javascript
await fetch('/api/progress', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'quiz',
    ref: 'caching-basics',
    status: 'completed',
    score: 95,
    points: 10
  })
});
```

### Track Lab Completion
```javascript
await fetch('/api/progress', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'lab',
    ref: 'rate-limiter',
    status: 'completed',
    points: 50
  })
});
```

## 🎯 Badge System

### Milestone Badges
- **Welcome!** - Joined Monchee
- **First Steps** - Completed first activity
- **Dedicated Learner** - 10 activities
- **Knowledge Seeker** - 25 activities
- **System Design Enthusiast** - 50 activities
- **Expert Learner** - 100 activities

### Achievement Badges
- **Quiz Master** - 90%+ quiz score
- **Perfect Score** - 100% quiz score
- **Lab Explorer** - Completed a lab
- **Deep Thinker** - Completed deep dive
- **Quick Learner** - Reviewed cheatsheet
- **Library Explorer** - Explored library

### Special Badges
- **Early Adopter** - Joined in first month
- **Community Helper** - Helped other learners
- **Consistent Learner** - 7 days straight
- **Weekend Warrior** - Weekend activities
- **Night Owl** - Late night learning
- **Early Bird** - Early morning learning

## 🔄 Database Operations

### User Sync
Users are automatically synced from Clerk when they:
1. Access protected routes
2. Complete activities
3. View their profile

### Progress Tracking
Progress is tracked when users:
1. Complete quizzes
2. Finish labs
3. Read deep dives
4. Review cheatsheets
5. Explore library concepts

### Badge Awarding
Badges are automatically awarded based on:
1. Activity completion counts
2. Quiz scores
3. Specific accomplishments
4. Time-based behaviors

## 🛠️ Development

### Adding New Activity Types
1. Update the `type` field in Progress model
2. Add tracking in the relevant component
3. Update badge logic if needed

### Adding New Badges
1. Add badge definition to `src/lib/seed-badges.ts`
2. Update badge checking logic
3. Run seed script to add to database

### Database Migrations
```bash
# Make schema changes
npx prisma db push

# Generate new client
npx prisma generate
```

## 🚨 Troubleshooting

### Common Issues

1. **Database not found**
   - Run `npx prisma db push`
   - Check DATABASE_URL in .env.local

2. **User sync fails**
   - Check Clerk configuration
   - Verify environment variables
   - Check middleware logs

3. **Progress not tracking**
   - Verify API endpoint is working
   - Check user authentication
   - Review browser console for errors

4. **Badges not awarding**
   - Check badge logic in progress API
   - Verify user exists in database
   - Review badge criteria

### Debug Commands
```bash
# View database
npm run db:studio

# Reset database
rm dev.db && npx prisma db push

# Reseed data
npm run db:seed

# Check TypeScript
npx tsc --noEmit
```

## 📝 Next Steps

1. **Production Database**: Migrate to PostgreSQL/Supabase
2. **Advanced Analytics**: Add learning analytics
3. **Social Features**: Add user interactions
4. **Content Management**: Admin panel for content
5. **Performance**: Add caching and optimization

The database integration is now fully functional and ready for production use!
