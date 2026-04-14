'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Heart, Download, Share2 } from 'lucide-react';
import { getSoundById, allSounds, type Sound } from '@/lib/sounds-data';
import SoundCard from '@/components/sound-card';

export default function SoundDetailPage({ params }: { params: { id: string } }) {
  const sound = getSoundById(params.id);
  const [isLiked, setIsLiked] = useState(false);

  if (!sound) {
    return (
      <main className="min-h-screen bg-background p-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">Sound Not Found</h1>
          <p className="text-muted-foreground">The sound you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  // Get related sounds (same category, excluding current sound)
  const relatedSounds = allSounds
    .filter(s => s.category === sound.category && s.id !== sound.id)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* Sound Detail */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Sound Info Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          {/* Header */}
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{sound.name}</h1>
              <p className="text-sm text-muted-foreground">{sound.category}</p>
            </div>
            {sound.isTrending && (
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full whitespace-nowrap">
                Trending
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6">{sound.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="text-lg font-bold text-foreground">{sound.duration}s</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Downloads</p>
              <p className="text-lg font-bold text-foreground">{(sound.downloads / 1000).toFixed(1)}k</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Likes</p>
              <p className="text-lg font-bold text-foreground">{(sound.likes / 1000).toFixed(1)}k</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button className="bg-primary/20 hover:bg-primary/30 text-primary rounded-lg py-3 flex items-center justify-center gap-2 transition-colors font-medium text-sm">
              <Play size={16} fill="currentColor" />
              <span className="hidden sm:inline">Play</span>
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`rounded-lg py-3 flex items-center justify-center gap-2 transition-colors font-medium text-sm ${
                isLiked
                  ? 'bg-accent/20 text-accent'
                  : 'bg-card border border-border hover:bg-card/80'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">Like</span>
            </button>
            <button className="bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg py-3 flex items-center justify-center gap-2 transition-colors font-medium text-sm">
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button className="bg-card border border-border hover:bg-card/80 rounded-lg py-3 flex items-center justify-center gap-2 transition-colors font-medium text-sm">
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Related Sounds */}
        {relatedSounds.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Similar Sounds in {sound.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedSounds.map(relatedSound => (
                <SoundCard key={relatedSound.id} sound={relatedSound} variant="normal" />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
