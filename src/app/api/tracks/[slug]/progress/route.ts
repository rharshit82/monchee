import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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

    const modules = trackModules[params.slug];
    if (!modules) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 });
    }

    // Get user progress for this track
    const progress = await prisma.progress.findMany({
      where: { 
        userId: userProfile.id,
        status: 'completed'
      }
    });

    // Calculate module statuses
    const moduleStatuses = modules.map(module => {
      const moduleProgress = progress.find(p => 
        p.type === module.type && p.ref === module.id
      );
      
      return {
        id: module.id,
        status: moduleProgress ? 'completed' : 'locked'
      };
    });

    // Calculate overall progress
    const completedModules = moduleStatuses.filter(m => m.status === 'completed').length;
    const progressPercentage = Math.round((completedModules / modules.length) * 100);
    const isCompleted = progressPercentage === 100;

    return NextResponse.json({
      progress: progressPercentage,
      completed: isCompleted,
      modules: moduleStatuses
    });

  } catch (error) {
    console.error('Error fetching track progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
