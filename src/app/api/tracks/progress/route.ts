import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Get all user progress
    const progress = await prisma.progress.findMany({
      where: { 
        userId: userProfile.id,
        status: 'completed'
      }
    });

    // Define track modules
    const trackModules = {
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

    // Calculate progress for each track
    const trackProgress: Record<string, number> = {};
    const completedTracks: string[] = [];

    for (const [trackId, modules] of Object.entries(trackModules)) {
      let completedModules = 0;
      
      for (const module of modules) {
        const moduleProgress = progress.find(p => 
          p.type === module.type && p.ref === module.id
        );
        
        if (moduleProgress) {
          completedModules++;
        }
      }
      
      const progressPercentage = Math.round((completedModules / modules.length) * 100);
      trackProgress[trackId] = progressPercentage;
      
      if (progressPercentage === 100) {
        completedTracks.push(trackId);
      }
    }

    return NextResponse.json({
      progress: trackProgress,
      completedTracks
    });

  } catch (error) {
    console.error('Error fetching track progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
