import { connectDB } from '@/lib/db';
import { Sound } from '@/lib/models/Sound';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate MongoDB ID
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid sound ID' },
        { status: 400 }
      );
    }

    const sound = await Sound.findById(id);

    if (!sound) {
      return NextResponse.json(
        { success: false, message: 'Sound not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      sound,
    });
  } catch (error: any) {
    console.error('Sound detail API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch sound' },
      { status: 500 }
    );
  }
}
