import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getGamificationStats } from '@/lib/gamification';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getGamificationStats(userId);

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error fetching gamification stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
