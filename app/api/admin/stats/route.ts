import { connectDB } from '@/lib/db';
import { Sound } from '@/lib/models/Sound';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

function verifyToken(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return null;

    return jwt.verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key');
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const admin = verifyToken(req);
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch all sounds
    const sounds = await Sound.find({});

    // Calculate stats
    const totalSounds = sounds.length;
    const totalDownloads = sounds.reduce((acc, sound) => acc + sound.downloads, 0);
    const totalLikes = sounds.reduce((acc, sound) => acc + sound.likes, 0);
    const trendingSounds = sounds.filter(sound => sound.trending).length;

    return NextResponse.json({
      totalSounds,
      totalDownloads,
      totalLikes,
      trendingSounds,
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
