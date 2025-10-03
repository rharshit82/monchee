import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { checkForNewBadges } from '@/lib/gamification';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userProgress, activities } = body;

    if (!userProgress || !activities) {
      return NextResponse.json({ error: 'User progress and activities are required' }, { status: 400 });
    }

    // Check for new badges
    const newBadges = await checkForNewBadges(userId);

    // In a real app, this would:
    // 1. Check which badges the user already has
    // 2. Award only new badges
    // 3. Store new badges in database
    // 4. Send notification to user

    console.log(`User ${userId} earned ${newBadges.length} new badges:`, newBadges.map(b => b.name));

    return NextResponse.json({ 
      success: true, 
      newBadges,
      message: `Earned ${newBadges.length} new badge${newBadges.length !== 1 ? 's' : ''}!`
    });

  } catch (error) {
    console.error('Error checking badges:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
