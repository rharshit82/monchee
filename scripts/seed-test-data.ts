import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTestData() {
  try {
    console.log('Seeding test data...');

    // Create test users
    const users = await Promise.all([
      prisma.userProfile.upsert({
        where: { clerkId: 'user_test1' },
        update: {},
        create: {
          clerkId: 'user_test1',
          username: 'systemdesigner',
          displayName: 'Alex Chen',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          bio: 'Passionate about building scalable systems',
          xp: 1250,
          level: 5,
          streak: 7,
          points: 1250
        }
      }),
      prisma.userProfile.upsert({
        where: { clerkId: 'user_test2' },
        update: {},
        create: {
          clerkId: 'user_test2',
          username: 'scalearchitect',
          displayName: 'Sarah Kim',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          bio: 'Cloud architecture enthusiast',
          xp: 1180,
          level: 5,
          streak: 5,
          points: 1180
        }
      }),
      prisma.userProfile.upsert({
        where: { clerkId: 'user_test3' },
        update: {},
        create: {
          clerkId: 'user_test3',
          username: 'distributeddev',
          displayName: 'Mike Johnson',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          bio: 'Distributed systems expert',
          xp: 1050,
          level: 4,
          streak: 3,
          points: 1050
        }
      })
    ]);

    console.log(`Created ${users.length} test users`);

    // Create some progress records
    await Promise.all([
      prisma.progress.create({
        data: {
          userId: 'user_test1',
          type: 'deep-dive',
          ref: 'instagram-feed',
          status: 'completed',
          score: 95,
          points: 20,
          xp: 20
        }
      }),
      prisma.progress.create({
        data: {
          userId: 'user_test1',
          type: 'quiz',
          ref: 'caching-basics',
          status: 'completed',
          score: 90,
          points: 30,
          xp: 30
        }
      }),
      prisma.progress.create({
        data: {
          userId: 'user_test2',
          type: 'lab',
          ref: 'rate-limiter',
          status: 'completed',
          score: 85,
          points: 50,
          xp: 50
        }
      })
    ]);

    console.log('Created progress records');

    // Create some badges
    await Promise.all([
      prisma.badge.create({
        data: {
          userId: 'user_test1',
          name: 'Quiz Master',
          description: 'Completed 10 quizzes with 90%+ accuracy',
          icon: '🧠',
          category: 'Learning'
        }
      }),
      prisma.badge.create({
        data: {
          userId: 'user_test1',
          name: 'Lab Explorer',
          description: 'Completed 5 hands-on labs',
          icon: '🔬',
          category: 'Practical'
        }
      }),
      prisma.badge.create({
        data: {
          userId: 'user_test2',
          name: 'Streak Beast',
          description: 'Maintained a 7-day learning streak',
          icon: '🔥',
          category: 'Consistency'
        }
      })
    ]);

    console.log('Created badges');

    // Create some comments
    await Promise.all([
      prisma.comment.create({
        data: {
          userId: 'user_test1',
          type: 'deep-dive',
          ref: 'instagram-feed',
          content: 'Great explanation of the feed algorithm! The geospatial indexing approach is really clever.',
          likes: 12
        }
      }),
      prisma.comment.create({
        data: {
          userId: 'user_test2',
          type: 'lab',
          ref: 'rate-limiter',
          content: 'Just completed the Rate Limiter lab! The token bucket implementation was challenging but really helped me understand the concepts.',
          likes: 8
        }
      })
    ]);

    console.log('Created comments');

    console.log('✅ Test data seeded successfully!');

  } catch (error) {
    console.error('Error seeding test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestData();
