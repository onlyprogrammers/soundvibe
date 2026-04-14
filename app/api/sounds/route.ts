import { connectDB } from '@/lib/db';
import { Sound } from '@/lib/models/Sound';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const trending = searchParams.get('trending');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (trending === 'true') {
      query.trending = true;
    }

    const sounds = await Sound.find(query).limit(limit).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      sounds,
      count: sounds.length,
    });
  } catch (error: any) {
    console.error('Sounds API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch sounds' },
      { status: 500 }
    );
  }
}
