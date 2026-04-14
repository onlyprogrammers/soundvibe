'use client';

import { Music, Zap } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative w-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 px-4 py-6 sm:py-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-5 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-5 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music size={24} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Premium Sound Effects for Creators
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl">
            Discover thousands of trending and high-quality sound effects perfect for your video edits, podcasts, and creative projects
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-2">
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold text-primary">2K+</span>
              <span className="text-xs sm:text-sm text-foreground/60">Sounds</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold text-secondary">100K+</span>
              <span className="text-xs sm:text-sm text-foreground/60">Downloads</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold text-accent">24/7</span>
              <span className="text-xs sm:text-sm text-foreground/60">Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
