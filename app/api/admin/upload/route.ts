import { connectDB } from '@/lib/db';
import { Sound } from '@/lib/models/Sound';
import { extractSoundsFromZip } from '@/lib/upload-utils';
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

export async function POST(req: NextRequest) {
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

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const mode = formData.get('mode') as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadedSounds = [];

    // Handle single/multiple file upload
    if (mode === 'single' || mode === 'multiple') {
      for (const file of files) {
        const buffer = await file.arrayBuffer();
        const fileName = file.name.replace(/\.[^/.]+$/, '');

        // Create sound document
        const sound = new Sound({
          name: fileName,
          category: 'Modern',
          description: `Uploaded: ${new Date().toLocaleDateString()}`,
          duration: 0,
          fileUrl: `/uploads/${file.name}`,
          featured: false,
          trending: false,
          isNew: true,
        });

        await sound.save();
        uploadedSounds.push(sound);
      }
    }

    // Handle ZIP file upload
    if (mode === 'zip' && files.length > 0) {
      const zipFile = files[0];
      const buffer = await zipFile.arrayBuffer();

      const extractedSounds = await extractSoundsFromZip(Buffer.from(buffer));

      for (const sound of extractedSounds) {
        const newSound = new Sound({
          name: sound.name,
          category: 'Modern',
          description: `Bulk uploaded from ZIP: ${new Date().toLocaleDateString()}`,
          duration: 0,
          fileUrl: `/uploads/${sound.name}.mp3`,
          featured: false,
          trending: false,
          isNew: true,
        });

        await newSound.save();
        uploadedSounds.push(newSound);
      }
    }

    return NextResponse.json({
      message: `Successfully uploaded ${uploadedSounds.length} sound(s)`,
      count: uploadedSounds.length,
      sounds: uploadedSounds,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
