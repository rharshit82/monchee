import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const trackSlug = searchParams.get("trackSlug");

    if (!trackSlug) {
      return new NextResponse("Track slug is required", { status: 400 });
    }

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
      include: { progress: true },
    });

    if (!userProfile) {
      return new NextResponse("User profile not found", { status: 404 });
    }

    // Mock track data - in a real app, this would come from a database
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
    
    // Check which items are completed
    const completedItems = items.filter(item => {
      return userProfile.progress.some(progress => 
        progress.itemType === item.type && 
        progress.itemId === item.slug
      );
    });

    const progress = {
      totalItems: items.length,
      completedItems: completedItems.length,
      progressPercentage: items.length > 0 ? Math.round((completedItems.length / items.length) * 100) : 0,
      completedItemIds: completedItems.map(item => `${item.type}-${item.slug}`)
    };

    return NextResponse.json(progress);
  } catch (error) {
    console.error("[TRACK_PROGRESS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
