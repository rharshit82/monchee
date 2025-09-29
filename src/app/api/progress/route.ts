import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { addProgress, addBadge } from '@/lib/user-sync';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, ref, status, score, points } = body;

    if (!type || !ref) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Add progress
    const progress = await addProgress(userId, type, ref, status, score, points);

    // Check for badge eligibility
    await checkAndAwardBadges(userId, type, ref, score);

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Error adding progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function checkAndAwardBadges(userId: string, type: string, ref: string, score?: number) {
  try {
    // Quiz completion badges
    if (type === 'quiz' && score !== undefined) {
      if (score === 100) {
        await addBadge(userId, 'Perfect Score', '��', 'Scored 100% on a quiz', 'achievement');
      }
      if (score >= 90) {
        await addBadge(userId, 'Quiz Master', '🧠', 'Scored 90%+ on a quiz', 'achievement');
      }
    }

    // Lab completion badges
    if (type === 'lab') {
      await addBadge(userId, 'Lab Explorer', '🔬', 'Completed a lab', 'achievement');
    }

    // Deep dive badges
    if (type === 'deep-dive') {
      await addBadge(userId, 'Deep Thinker', '🧠', 'Completed a deep dive', 'achievement');
    }

    // Milestone badges (these would need to check total counts)
    // For now, we'll add them based on individual activities
    if (type === 'cheatsheet') {
      await addBadge(userId, 'Quick Learner', '⚡', 'Reviewed a cheatsheet', 'achievement');
    }

    if (type === 'library') {
      await addBadge(userId, 'Knowledge Seeker', '📚', 'Explored the library', 'achievement');
    }
  } catch (error) {
    console.error('Error checking badges:', error);
  }
}
