import { prisma } from './db';

export async function seedBadges() {
  const badges = [
    // Milestone badges
    { name: "Welcome!", icon: "🎉", description: "Joined Monchee", category: "milestone" },
    { name: "First Steps", icon: "👶", description: "Completed your first activity", category: "milestone" },
    { name: "Dedicated Learner", icon: "📚", description: "Completed 10 activities", category: "milestone" },
    { name: "Knowledge Seeker", icon: "🔍", description: "Completed 25 activities", category: "milestone" },
    { name: "System Design Enthusiast", icon: "🏗️", description: "Completed 50 activities", category: "milestone" },
    { name: "Expert Learner", icon: "🎓", description: "Completed 100 activities", category: "milestone" },
    
    // Achievement badges
    { name: "Quiz Master", icon: "🧠", description: "Scored 90%+ on a quiz", category: "achievement" },
    { name: "Perfect Score", icon: "🎯", description: "Scored 100% on a quiz", category: "achievement" },
    { name: "Lab Explorer", icon: "🔬", description: "Completed a lab", category: "achievement" },
    { name: "Deep Thinker", icon: "🧠", description: "Completed a deep dive", category: "achievement" },
    { name: "Quick Learner", icon: "⚡", description: "Reviewed a cheatsheet", category: "achievement" },
    { name: "Library Explorer", icon: "📖", description: "Explored the library", category: "achievement" },
    
    // Special badges
    { name: "Early Adopter", icon: "🚀", description: "Joined in the first month", category: "special" },
    { name: "Community Helper", icon: "🤝", description: "Helped other learners", category: "special" },
    { name: "Consistent Learner", icon: "📅", description: "Learned for 7 days straight", category: "special" },
    { name: "Weekend Warrior", icon: "⚔️", description: "Completed activities on weekends", category: "special" },
    { name: "Night Owl", icon: "🦉", description: "Learned after 10 PM", category: "special" },
    { name: "Early Bird", icon: "🐦", description: "Learned before 6 AM", category: "special" },
  ];

  console.log('Seeding badges...');
  
  for (const badge of badges) {
    try {
      await prisma.badge.upsert({
        where: {
          // This will create a unique constraint on name + category for system badges
          id: `system-${badge.name.toLowerCase().replace(/\s+/g, '-')}-${badge.category}`
        },
        update: badge,
        create: {
          id: `system-${badge.name.toLowerCase().replace(/\s+/g, '-')}-${badge.category}`,
          ...badge,
          userId: 'system' // System badges don't belong to specific users
        }
      });
    } catch (error) {
      console.error(`Error seeding badge ${badge.name}:`, error);
    }
  }
  
  console.log('Badge seeding completed!');
}

export async function checkAndAwardSystemBadges(userId: string) {
  const user = await prisma.userProfile.findUnique({
    where: { id: userId },
    include: {
      progress: {
        where: { status: 'completed' }
      },
      badges: true
    }
  });

  if (!user) return;

  const completedActivities = user.progress.length;
  const quizCount = user.progress.filter(p => p.type === 'quiz').length;
  const labCount = user.progress.filter(p => p.type === 'lab').length;
  const deepDiveCount = user.progress.filter(p => p.type === 'deep-dive').length;
  const cheatsheetCount = user.progress.filter(p => p.type === 'cheatsheet').length;
  const libraryCount = user.progress.filter(p => p.type === 'library').length;

  const badgesToAward = [];

  // Milestone badges
  if (completedActivities >= 1 && !user.badges.find(b => b.name === 'First Steps')) {
    badgesToAward.push({ name: 'First Steps', icon: '👶', description: 'Completed your first activity', category: 'milestone' });
  }
  if (completedActivities >= 10 && !user.badges.find(b => b.name === 'Dedicated Learner')) {
    badgesToAward.push({ name: 'Dedicated Learner', icon: '📚', description: 'Completed 10 activities', category: 'milestone' });
  }
  if (completedActivities >= 25 && !user.badges.find(b => b.name === 'Knowledge Seeker')) {
    badgesToAward.push({ name: 'Knowledge Seeker', icon: '🔍', description: 'Completed 25 activities', category: 'milestone' });
  }
  if (completedActivities >= 50 && !user.badges.find(b => b.name === 'System Design Enthusiast')) {
    badgesToAward.push({ name: 'System Design Enthusiast', icon: '🏗️', description: 'Completed 50 activities', category: 'milestone' });
  }
  if (completedActivities >= 100 && !user.badges.find(b => b.name === 'Expert Learner')) {
    badgesToAward.push({ name: 'Expert Learner', icon: '🎓', description: 'Completed 100 activities', category: 'milestone' });
  }

  // Activity-specific badges
  if (labCount >= 1 && !user.badges.find(b => b.name === 'Lab Explorer')) {
    badgesToAward.push({ name: 'Lab Explorer', icon: '🔬', description: 'Completed a lab', category: 'achievement' });
  }
  if (deepDiveCount >= 1 && !user.badges.find(b => b.name === 'Deep Thinker')) {
    badgesToAward.push({ name: 'Deep Thinker', icon: '🧠', description: 'Completed a deep dive', category: 'achievement' });
  }
  if (cheatsheetCount >= 1 && !user.badges.find(b => b.name === 'Quick Learner')) {
    badgesToAward.push({ name: 'Quick Learner', icon: '⚡', description: 'Reviewed a cheatsheet', category: 'achievement' });
  }
  if (libraryCount >= 1 && !user.badges.find(b => b.name === 'Library Explorer')) {
    badgesToAward.push({ name: 'Library Explorer', icon: '📖', description: 'Explored the library', category: 'achievement' });
  }

  // Award badges
  for (const badge of badgesToAward) {
    try {
      await prisma.badge.create({
        data: {
          userId: user.id,
          ...badge
        }
      });
      console.log(`Awarded badge "${badge.name}" to user ${user.username}`);
    } catch (error) {
      console.error(`Error awarding badge ${badge.name}:`, error);
    }
  }
}
