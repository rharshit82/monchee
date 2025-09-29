const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await prisma.badge.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.userProfile.deleteMany();

  console.log("�� Cleared existing data");

  // Create demo users
  const demoUsers = [
    {
      clerkId: "demo_rharshit82",
      username: "rharshit82",
      firstName: "Harshit",
      lastName: "Rai",
      email: "harshit@example.com",
      avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
      bio: "Full Stack Dev, loves system design and building scalable applications. Passionate about distributed systems and microservices architecture.",
      provider: "github",
      points: 1250,
    },
    {
      clerkId: "demo_alice",
      username: "alice",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      bio: "Backend engineer with 5+ years experience in distributed systems. Currently learning advanced system design patterns.",
      provider: "google",
      points: 980,
    },
    {
      clerkId: "demo_bob",
      username: "bob",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      bio: "Infrastructure engineer and DevOps enthusiast. Loves working with cloud platforms and containerization.",
      provider: "email",
      points: 750,
    },
    {
      clerkId: "demo_sarah",
      username: "sarah",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Senior Software Engineer at a tech startup. Focused on building high-performance systems and mentoring junior developers.",
      provider: "github",
      points: 1100,
    },
    {
      clerkId: "demo_mike",
      username: "mike",
      firstName: "Mike",
      lastName: "Chen",
      email: "mike.chen@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      bio: "Platform engineer with expertise in Kubernetes and service mesh. Always exploring new technologies.",
      provider: "google",
      points: 850,
    },
    {
      clerkId: "demo_emma",
      username: "emma",
      firstName: "Emma",
      lastName: "Davis",
      email: "emma.davis@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      bio: "Data engineer transitioning to system design. Passionate about building reliable and scalable data pipelines.",
      provider: "email",
      points: 650,
    }
  ];

  const createdUsers = await prisma.userProfile.createMany({
    data: demoUsers,
  });

  console.log(`👥 Created ${createdUsers.count} demo users`);

  // Get user IDs for progress and badges
  const users = await prisma.userProfile.findMany();
  const userMap = new Map(users.map((user: any) => [user.username, user.id]));

  // Create progress records
  const progressData = [
    // rharshit82's progress
    { userId: userMap.get("rharshit82"), type: "quiz", ref: "caching-basics", status: "completed", score: 95, points: 10 },
    { userId: userMap.get("rharshit82"), type: "quiz", ref: "sharding-basics", status: "completed", score: 88, points: 9 },
    { userId: userMap.get("rharshit82"), type: "lab", ref: "rate-limiter", status: "completed", points: 50 },
    { userId: userMap.get("rharshit82"), type: "lab", ref: "url-shortener", status: "completed", points: 45 },
    { userId: userMap.get("rharshit82"), type: "deep-dive", ref: "instagram-feed", status: "completed", points: 30 },
    { userId: userMap.get("rharshit82"), type: "deep-dive", ref: "uber-dispatch", status: "completed", points: 35 },
    { userId: userMap.get("rharshit82"), type: "cheatsheet", ref: "caching-patterns", status: "completed", points: 15 },
    { userId: userMap.get("rharshit82"), type: "library", ref: "sharding", status: "completed", points: 20 },
    { userId: userMap.get("rharshit82"), type: "library", ref: "message-queues", status: "completed", points: 18 },

    // alice's progress
    { userId: userMap.get("alice"), type: "quiz", ref: "sharding-basics", status: "completed", score: 92, points: 9 },
    { userId: userMap.get("alice"), type: "quiz", ref: "database-trade-offs", status: "completed", score: 85, points: 8 },
    { userId: userMap.get("alice"), type: "lab", ref: "rate-limiter", status: "completed", points: 50 },
    { userId: userMap.get("alice"), type: "deep-dive", ref: "netflix-streaming", status: "completed", points: 30 },
    { userId: userMap.get("alice"), type: "cheatsheet", ref: "database-trade-offs", status: "completed", points: 15 },
    { userId: userMap.get("alice"), type: "library", ref: "cap-theorem", status: "completed", points: 20 },

    // bob's progress
    { userId: userMap.get("bob"), type: "quiz", ref: "caching-basics", status: "completed", score: 78, points: 8 },
    { userId: userMap.get("bob"), type: "lab", ref: "message-queue", status: "completed", points: 45 },
    { userId: userMap.get("bob"), type: "deep-dive", ref: "instagram-feed", status: "completed", points: 30 },
    { userId: userMap.get("bob"), type: "cheatsheet", ref: "caching-patterns", status: "completed", points: 15 },

    // sarah's progress
    { userId: userMap.get("sarah"), type: "quiz", ref: "caching-basics", status: "completed", score: 100, points: 10 },
    { userId: userMap.get("sarah"), type: "quiz", ref: "sharding-basics", status: "completed", score: 96, points: 10 },
    { userId: userMap.get("sarah"), type: "lab", ref: "rate-limiter", status: "completed", points: 50 },
    { userId: userMap.get("sarah"), type: "lab", ref: "url-shortener", status: "completed", points: 45 },
    { userId: userMap.get("sarah"), type: "deep-dive", ref: "instagram-feed", status: "completed", points: 30 },
    { userId: userMap.get("sarah"), type: "deep-dive", ref: "uber-dispatch", status: "completed", points: 35 },
    { userId: userMap.get("sarah"), type: "cheatsheet", ref: "caching-patterns", status: "completed", points: 15 },
    { userId: userMap.get("sarah"), type: "library", ref: "sharding", status: "completed", points: 20 },

    // mike's progress
    { userId: userMap.get("mike"), type: "quiz", ref: "caching-basics", status: "completed", score: 89, points: 9 },
    { userId: userMap.get("mike"), type: "lab", ref: "rate-limiter", status: "completed", points: 50 },
    { userId: userMap.get("mike"), type: "deep-dive", ref: "netflix-streaming", status: "completed", points: 30 },
    { userId: userMap.get("mike"), type: "cheatsheet", ref: "database-trade-offs", status: "completed", points: 15 },
    { userId: userMap.get("mike"), type: "library", ref: "cap-theorem", status: "completed", points: 20 },

    // emma's progress
    { userId: userMap.get("emma"), type: "quiz", ref: "sharding-basics", status: "completed", score: 82, points: 8 },
    { userId: userMap.get("emma"), type: "lab", ref: "message-queue", status: "completed", points: 45 },
    { userId: userMap.get("emma"), type: "deep-dive", ref: "instagram-feed", status: "completed", points: 30 },
    { userId: userMap.get("emma"), type: "library", ref: "message-queues", status: "completed", points: 18 },
  ].filter(p => p.userId); // Filter out any undefined user IDs

  const createdProgress = await prisma.progress.createMany({
    data: progressData,
  });

  console.log(`📊 Created ${createdProgress.count} progress records`);

  // Create badges
  const badgeData = [
    // rharshit82's badges
    { userId: userMap.get("rharshit82"), name: "Welcome!", icon: "🎉", description: "Joined Monchee", category: "milestone" },
    { userId: userMap.get("rharshit82"), name: "Quiz Master", icon: "🧠", description: "Scored 90%+ on a quiz", category: "achievement" },
    { userId: userMap.get("rharshit82"), name: "Lab Explorer", icon: "🔬", description: "Completed a lab", category: "achievement" },
    { userId: userMap.get("rharshit82"), name: "Deep Thinker", icon: "🧠", description: "Completed a deep dive", category: "achievement" },
    { userId: userMap.get("rharshit82"), name: "Cache Master", icon: "🔥", description: "Expert in caching strategies", category: "special" },
    { userId: userMap.get("rharshit82"), name: "Dedicated Learner", icon: "📚", description: "Completed 10+ activities", category: "milestone" },

    // alice's badges
    { userId: userMap.get("alice"), name: "Welcome!", icon: "🎉", description: "Joined Monchee", category: "milestone" },
    { userId: userMap.get("alice"), name: "Quiz Master", icon: "🧠", description: "Scored 90%+ on a quiz", category: "achievement" },
    { userId: userMap.get("alice"), name: "Lab Explorer", icon: "🔬", description: "Completed a lab", category: "achievement" },
    { userId: userMap.get("alice"), name: "Sharding Pro", icon: "🗂️", description: "Expert in database sharding", category: "special" },
    { userId: userMap.get("alice"), name: "Deep Thinker", icon: "🧠", description: "Completed a deep dive", category: "achievement" },

    // bob's badges
    { userId: userMap.get("bob"), name: "Welcome!", icon: "🎉", description: "Joined Monchee", category: "milestone" },
    { userId: userMap.get("bob"), name: "Lab Explorer", icon: "🔬", description: "Completed a lab", category: "achievement" },
    { userId: userMap.get("bob"), name: "Deep Thinker", icon: "🧠", description: "Completed a deep dive", category: "achievement" },
    { userId: userMap.get("bob"), name: "Quick Learner", icon: "⚡", description: "Reviewed a cheatsheet", category: "achievement" },

    // sarah's badges
    { userId: userMap.get("sarah"), name: "Welcome!", icon: "��", description: "Joined Monchee", category: "milestone" },
    { userId: userMap.get("sarah"), name: "Perfect Score", icon: "🎯", description: "Scored 100% on a quiz", category: "achievement" },
    { userId: userMap.get("sarah"), name: "Quiz Master", icon: "🧠", description: "Scored 90%+ on a quiz", category: "achievement" },
    { userId: userMap.get("sarah"), name: "Lab Explorer", icon: "🔬", description: "Completed a lab", category: "achievement" },
    { userId: userMap.get("sarah"), name: "Deep Thinker", icon: "🧠", description: "Completed a deep dive", category: "achievement" },
    { userId: userMap.get("sarah"), name: "Dedicated Learner", icon: "📚", description: "Completed 10+ activities", category: "milestone" },
    { userId: userMap.get("sarah"), name: "System Design Enthusiast", icon: "🏗️", description: "Completed 50+ activities", category: "milestone" },

    // mike's badges
    { userId: userMap.get("mike"), name: "Welcome!", icon: "🎉", description: "Joined Monchee", category: "milestone" },
    { userId: userMap.get("mike"), name: "Quiz Master", icon: "🧠", description: "Scored 90%+ on a quiz", category: "achievement" },
    { userId: userMap.get("mike"), name: "Lab Explorer", icon: "🔬", description: "Completed a lab", category: "achievement" },
    { userId: userMap.get("mike"), name: "Deep Thinker", icon: "🧠", description: "Completed a deep dive", category: "achievement" },
    { userId: userMap.get("mike"), name: "Quick Learner", icon: "⚡", description: "Reviewed a cheatsheet", category: "achievement" },

    // emma's badges
    { userId: userMap.get("emma"), name: "Welcome!", icon: "🎉", description: "Joined Monchee", category: "milestone" },
    { userId: userMap.get("emma"), name: "Lab Explorer", icon: "🔬", description: "Completed a lab", category: "achievement" },
    { userId: userMap.get("emma"), name: "Deep Thinker", icon: "🧠", description: "Completed a deep dive", category: "achievement" },
    { userId: userMap.get("emma"), name: "Library Explorer", icon: "📖", description: "Explored the library", category: "achievement" },
  ].filter(b => b.userId); // Filter out any undefined user IDs

  const createdBadges = await prisma.badge.createMany({
    data: badgeData,
  });

  console.log(`🏆 Created ${createdBadges.count} badges`);

  // Update user points based on progress
  for (const user of users) {
    const userProgress = progressData.filter((p: any) => p.userId === user.id);
    const totalPoints = userProgress.reduce((sum: number, p: any) => sum + (p.points || 0), 0);
    
    await prisma.userProfile.update({
      where: { id: user.id },
      data: { points: totalPoints }
    });
  }

  console.log("💰 Updated user points based on progress");

  // Display summary
  const finalUsers = await prisma.userProfile.findMany({
    include: {
      _count: {
        select: {
          progress: true,
          badges: true
        }
      }
    },
    orderBy: { points: 'desc' }
  });

  console.log("\n📈 Seeding Summary:");
  console.log("==================");
  finalUsers.forEach((user: any, index: number) => {
    console.log(`${index + 1}. @${user.username} - ${user.points} points (${user._count.progress} activities, ${user._count.badges} badges)`);
  });

  console.log("\n✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
