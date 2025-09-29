import { NextRequest, NextResponse } from 'next/server';
import { getAllUserProfiles } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const users = await getAllUserProfiles();
    
    // Sort by points descending
    const sortedUsers = users.sort((a, b) => b.points - a.points);
    
    return NextResponse.json(sortedUsers);

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
