import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateXpAward, checkAndAwardBadges } from "@/lib/gamification";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { type, ref, trackSlug, score, isKnown } = await req.json();

    if (!type || !ref || !trackSlug) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get user profile
    let userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
      include: { progress: true, badges: true },
    });

    if (!userProfile) {
      return new NextResponse("User profile not found", { status: 404 });
    }

    // Check if item is already completed
    const existingProgress = userProfile.progress.find(p => 
      p.type === type && p.ref === ref
    );

    if (existingProgress) {
      return NextResponse.json({ 
        message: "Item already completed",
        progress: existingProgress 
      });
    }

    // Award XP
    const xpAward = calculateXpAward(type as any);
    const newXp = userProfile.xp + xpAward;
    const newLevel = Math.floor(newXp / 100) + 1;

    // Update user profile
    userProfile = await prisma.userProfile.update({
      where: { id: userProfile.id },
      data: {
        xp: newXp,
        level: newLevel,
      },
      include: { progress: true, badges: true },
    });

    // Record progress
    const progress = await prisma.progress.create({
      data: {
        userId: userProfile.id,
        ref: ref,
        type: type,
        xp: xpAward,
        score: score,
        isKnown: isKnown,
      },
    });

    // Check for track completion badge
    const trackBadges = {
      "beginner": "Foundation Builder",
      "intermediate": "System Scaler", 
      "advanced": "Distributed Architect"
    };

    const trackBadgeName = trackBadges[trackSlug as keyof typeof trackBadges];
    if (trackBadgeName) {
      // Check if all track items are completed
      const trackItems = {
        "beginner": [
          { type: "cheatsheet", slug: "caching-patterns" },
          { type: "library", slug: "sharding" },
          { type: "deep-dive", slug: "instagram-feed" },
          { type: "quiz", slug: "basics-scaling-quiz" }
        ],
        "intermediate": [
          { type: "cheatsheet", slug: "database-tradeoffs" },
          { type: "library", slug: "message-queues" },
          { type: "deep-dive", slug: "uber-dispatch" },
          { type: "lab", slug: "rate-limiter" },
          { type: "scenario", slug: "sql-vs-nosql-scenario" }
        ],
        "advanced": [
          { type: "cheatsheet", slug: "consistency-models" },
          { type: "library", slug: "cap-theorem" },
          { type: "deep-dive", slug: "netflix-streaming" },
          { type: "lab", slug: "message-queue" },
          { type: "scenario", slug: "consistency-scenario" }
        ]
      };

      const items = trackItems[trackSlug as keyof typeof trackItems] || [];
      const allCompleted = items.every(item => {
        return userProfile.progress.some(p => 
          p.type === item.type && p.ref === item.slug
        );
      });

      if (allCompleted) {
        // Award track completion badge
        const existingBadge = userProfile.badges.find(b => b.name === trackBadgeName);
        if (!existingBadge) {
          await prisma.badge.create({
            data: {
              userId: userProfile.id,
              name: trackBadgeName,
              description: `Completed ${trackSlug} track`,
              icon: trackSlug === "beginner" ? "🏗️" : trackSlug === "intermediate" ? "📈" : "🏛️",
              category: "Track Completion",
              
            },
          });
        }
      }
    }

    // Check for other badges
    const newBadges = checkAndAwardBadges(userProfile);
    if (newBadges.length > 0) {
      await prisma.badge.createMany({
        data: newBadges.map(badge => ({
          userId: userProfile.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          category: badge.category,
          
        })),
        skipDuplicates: true,
      });
    }

    return NextResponse.json({ 
      message: "Item completed successfully",
      progress,
      xp: xpAward,
      newXp: newXp,
      newLevel: newLevel
    });
  } catch (error) {
    console.error("[TRACK_COMPLETE_ITEM_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
