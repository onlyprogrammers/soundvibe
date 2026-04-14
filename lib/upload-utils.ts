import JSZip from 'jszip';

export interface ExtractedSound {
  name: string;
  buffer: Buffer;
  mimeType: string;
}

export async function extractSoundsFromZip(zipBuffer: Buffer): Promise<ExtractedSound[]> {
  const zip = new JSZip();
  await zip.loadAsync(zipBuffer);

  const sounds: ExtractedSound[] = [];
  const supportedFormats = ['mp3', 'wav', 'ogg', 'm4a', 'flac'];

  for (const [filename, file] of Object.entries(zip.files)) {
    // Skip directories
    if (file.dir) continue;

    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext || !supportedFormats.includes(ext)) continue;

    try {
      const buffer = await file.async('arraybuffer');
      sounds.push({
        name: filename.replace(/\.[^/.]+$/, ''),
        buffer: Buffer.from(buffer),
        mimeType: getMimeType(ext),
      });
    } catch (error) {
      console.error(`Failed to extract ${filename}:`, error);
    }
  }

  return sounds;
}

function getMimeType(ext: string): string {
  const mimeTypes: { [key: string]: string } = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    flac: 'audio/flac',
  };
  return mimeTypes[ext] || 'audio/mpeg';
}

export function validateAudioFile(file: File): boolean {
  const supportedFormats = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/flac'];
  return supportedFormats.includes(file.type);
}
