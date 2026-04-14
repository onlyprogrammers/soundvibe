'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SoundCard from './sound-card';
import type { Sound } from '@/lib/sounds-data';

interface SoundSectionProps {
  id: string;
  title: string;
  sounds: Sound[];
}

export default function SoundSection({ id, title, sounds }: SoundSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximately 2 cards + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id={id} className="py-8 px-4 border-b border-border/50 bg-gradient-to-b from-background/50 to-background">
      {/* Section Title with decorative element */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{title}</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"></div>
        </div>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium px-3 py-1.5 hover:bg-primary/10 rounded-lg">
          View All
        </button>
      </div>

      {/* Scrollable Container */}
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {sounds.map(sound => (
            <SoundCard key={sound.id} sound={sound} variant="compact" />
          ))}
        </div>

        {/* Scroll Buttons - Mobile hidden, Desktop visible */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 text-primary opacity-0 group-hover:opacity-100 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 text-primary opacity-0 group-hover:opacity-100 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}
