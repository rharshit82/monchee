import { PrismaClient } from '@prisma/client';
import { seedBadges } from '../src/lib/seed-badges';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Seed badges
  await seedBadges();

  // Create some sample users for testing
  const sampleUsers = [
    {
      clerkId: 'user_sample_1',
      username: 'alex-chen',
      firstName: 'Alex',
      lastName: 'Chen',
      email: 'alex.chen@example.com',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      bio: 'Senior Software Engineer passionate about system design and distributed systems.',
      provider: 'github',
      points: 2847
    },
    {
      clerkId: 'user_sample_2',
      username: 'sarah-johnson',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Full-stack developer learning system design concepts.',
      provider: 'google',
      points: 2634
    },
    {
      clerkId: 'user_sample_3',
      username: 'mike-rodriguez',
      firstName: 'Mike',
      lastName: 'Rodriguez',
      email: 'mike.rodriguez@example.com',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      bio: 'Backend engineer focused on scalable architectures.',
      provider: 'email',
      points: 2456
    }
  ];

  for (const userData of sampleUsers) {
    try {
      const user = await prisma.userProfile.upsert({
        where: { clerkId: userData.clerkId },
        update: userData,
        create: userData
      });

      // Add some sample progress
      const progressData = [
        { type: 'quiz', ref: 'caching-basics', status: 'completed', score: 95, points: 10 },
        { type: 'lab', ref: 'rate-limiter', status: 'completed', points: 50 },
        { type: 'deep-dive', ref: 'instagram-feed', status: 'completed', points: 30 },
        { type: 'cheatsheet', ref: 'caching-patterns', status: 'completed', points: 15 },
        { type: 'library', ref: 'sharding', status: 'completed', points: 20 }
      ];

      for (const progress of progressData) {
        await prisma.progress.upsert({
          where: {
            id: `${user.id}-${progress.type}-${progress.ref}`
          },
          update: progress,
          create: {
            id: `${user.id}-${progress.type}-${progress.ref}`,
            userId: user.id,
            ...progress
          }
        });
      }

      // Add some sample badges
      const badgeData = [
        { name: 'Welcome!', icon: '🎉', description: 'Joined Monchee', category: 'milestone' },
        { name: 'Quiz Master', icon: '🧠', description: 'Scored 90%+ on a quiz', category: 'achievement' },
        { name: 'Lab Explorer', icon: '🔬', description: 'Completed a lab', category: 'achievement' },
        { name: 'Deep Thinker', icon: '🧠', description: 'Completed a deep dive', category: 'achievement' }
      ];

      for (const badge of badgeData) {
        await prisma.badge.upsert({
          where: {
            id: `${user.id}-${badge.name.toLowerCase().replace(/\s+/g, '-')}`
          },
          update: badge,
          create: {
            id: `${user.id}-${badge.name.toLowerCase().replace(/\s+/g, '-')}`,
            userId: user.id,
            ...badge
          }
        });
      }

      console.log(`Created sample user: ${userData.username}`);
    } catch (error) {
      console.error(`Error creating user ${userData.username}:`, error);
    }
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
