import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId } = body;

    if (!moduleId) {
      return NextResponse.json({ error: 'Missing required field: moduleId' }, { status: 400 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Define track modules
    const trackModules: Record<string, Array<{ id: string; type: string }>> = {
      'beginner': [
        { id: 'caching-patterns', type: 'cheatsheet' },
        { id: 'sharding', type: 'library' },
        { id: 'cap-theorem', type: 'library' },
        { id: 'caching-basics', type: 'quiz' }
      ],
      'intermediate': [
        { id: 'instagram-feed', type: 'deep-dive' },
        { id: 'uber-dispatch', type: 'deep-dive' },
        { id: 'rate-limiter', type: 'lab' },
        { id: 'sharding-basics', type: 'quiz' }
      ],
      'advanced': [
        { id: 'netflix-streaming', type: 'deep-dive' },
        { id: 'message-queue', type: 'lab' },
        { id: 'url-shortener', type: 'lab' },
        { id: 'database-trade-offs', type: 'quiz' }
      ]
    };

    const modules = trackModules[resolvedParams.slug];
    if (!modules) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 });
    }

    // Find the module
    const module = modules.find(m => m.id === moduleId);
    if (!module) {
      return NextResponse.json({ error: 'Module not found in track' }, { status: 404 });
    }

    // Check if module is already completed
    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId: userProfile.id,
        type: module.type,
        ref: module.id
      }
    });

    if (existingProgress) {
      return NextResponse.json({ 
        success: true, 
        message: 'Module already completed',
        alreadyCompleted: true
      });
    }

    // Create progress record for the module
    await prisma.progress.create({
      data: {
        userId: userProfile.id,
        type: module.type,
        ref: module.id,
        status: 'completed',
        points: 5 // Track modules give 5 points each
      }
    });

    // Update user points
    await prisma.userProfile.update({
      where: { id: userProfile.id },
      data: {
        points: {
          increment: 5
        }
      }
    });

    // Check if track is now complete
    const allProgress = await prisma.progress.findMany({
      where: { 
        userId: userProfile.id,
        status: 'completed'
      }
    });

    const completedModules = modules.filter(m => 
      allProgress.some(p => p.type === m.type && p.ref === m.id)
    ).length;

    const trackCompleted = completedModules === modules.length;

    // Award track completion badge if track is complete
    if (trackCompleted) {
      const trackBadges = {
        'beginner': {
          name: 'Beginner Architect',
          icon: '🏆',
          description: 'Completed the beginner system design track'
        },
        'intermediate': {
          name: 'System Designer',
          icon: '🏗️',
          description: 'Completed the intermediate system design track'
        },
        'advanced': {
          name: 'Distributed Pro',
          icon: '⚡',
          description: 'Completed the advanced distributed systems track'
        }
      };

      const trackBadge = trackBadges[resolvedParams.slug as keyof typeof trackBadges];
      
      if (trackBadge) {
        const existingBadge = await prisma.badge.findFirst({
          where: {
            userId: userProfile.id,
            name: trackBadge.name
          }
        });

        if (!existingBadge) {
          await prisma.badge.create({
            data: {
              userId: userProfile.id,
              name: trackBadge.name,
              icon: trackBadge.icon,
              description: trackBadge.description,
              category: 'track'
            }
          });
        }
      }
    }

    const trackBadges = {
      "beginner": "Foundation Builder",
      "intermediate": "System Scaler",
      "advanced": "Distributed Architect"
    };
    
    const progressPercentage = Math.round((completedModules / modules.length) * 100);

    return NextResponse.json({
      success: true,
      progress: progressPercentage,
      trackCompleted,
      message: trackCompleted 
        ? `Track completed! You earned the ${trackBadges[resolvedParams.slug as keyof typeof trackBadges]?.name} badge!`
        : `Module completed! Progress: ${progressPercentage}%`
    });

  } catch (error) {
    console.error('Error completing module:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
