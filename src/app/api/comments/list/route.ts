import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const ref = searchParams.get('ref');

    if (!type || !ref) {
      return NextResponse.json({ 
        error: 'Missing required parameters: type, ref' 
      }, { status: 400 });
    }

    if (!['lab', 'deep-dive'].includes(type)) {
      return NextResponse.json({ 
        error: 'Invalid type. Must be lab or deep-dive' 
      }, { status: 400 });
    }

    // Fetch comments for the specific resource
    const comments = await prisma.comment.findMany({
      where: {
        type,
        ref
      },
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      comments
    });

  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
