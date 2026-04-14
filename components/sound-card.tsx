'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, Heart, Play } from 'lucide-react';
import type { Sound } from '@/lib/sounds-data';

interface SoundCardProps {
  sound: Sound;
  variant?: 'compact' | 'normal';
}

export default function SoundCard({ sound, variant = 'compact' }: SoundCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (variant === 'compact') {
    return (
      <Link href={`/sound/${sound.id}`}>
        <div className="flex-shrink-0 w-32 bg-gradient-to-br from-card to-background rounded-xl p-3 border border-border hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/30 hover:scale-105 duration-300">
          {/* Header with badge */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="flex-1">
              <h3 className="text-xs font-bold text-foreground line-clamp-2">{sound.name}</h3>
              <p className="text-xs text-muted-foreground">{sound.category}</p>
            </div>
            {sound.isTrending && (
              <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded whitespace-nowrap">
                Trending
              </span>
            )}
          </div>

          {/* Duration */}
          <div className="text-xs text-muted-foreground mb-2">{sound.duration}s</div>

          {/* Stats */}
          <div className="flex gap-2 mb-3 text-xs">
            <span className="text-muted-foreground">{formatNumber(sound.downloads)}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{formatNumber(sound.likes)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5">
            <button
              onClick={handlePlay}
              className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary rounded p-1.5 flex items-center justify-center transition-colors"
            >
              <Play size={12} fill="currentColor" />
            </button>
            <button
              onClick={handleLike}
              className={`flex-1 rounded p-1.5 flex items-center justify-center transition-colors ${
                isLiked
                  ? 'bg-accent/20 text-accent'
                  : 'bg-card border border-border hover:bg-card/80'
              }`}
            >
              <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button className="flex-1 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded p-1.5 flex items-center justify-center transition-colors">
              <Download size={12} />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // Normal variant (for detail page)
  return (
    <Link href={`/sound/${sound.id}`}>
      <div className="bg-card rounded-xl p-4 border border-border hover:border-primary transition-colors cursor-pointer">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground">{sound.name}</h3>
            <p className="text-xs text-muted-foreground">{sound.category}</p>
          </div>
          {sound.isTrending && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Trending</span>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{sound.description}</p>

        <div className="flex gap-3 mb-3 text-xs">
          <span className="text-muted-foreground">{sound.duration}s</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{formatNumber(sound.downloads)} downloads</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePlay}
            className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg py-2 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors"
          >
            <Play size={14} fill="currentColor" /> Play
          </button>
          <button
            onClick={handleLike}
            className={`flex-1 rounded-lg py-2 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors ${
              isLiked
                ? 'bg-accent/20 text-accent'
                : 'bg-card border border-border hover:bg-card/80'
            }`}
          >
            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} /> {formatNumber(sound.likes)}
          </button>
          <button className="flex-1 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg py-2 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors">
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </Link>
  );
}
