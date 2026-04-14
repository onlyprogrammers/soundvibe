'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { searchSounds, type Sound } from '@/lib/sounds-data';

const CATEGORIES = ['All', 'Funny', 'Transitions', 'Impact', 'Voice Effects', 'Ambient', 'Cinematic', 'Retro', 'Modern'];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState<Sound[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      let results = searchSounds(value);
      if (selectedCategory !== 'All') {
        results = results.filter(s => s.category === selectedCategory);
      }
      setResults(results);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (query.trim().length > 0) {
      let results = searchSounds(query);
      if (category !== 'All') {
        results = results.filter(s => s.category === category);
      }
      setResults(results);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search sounds..."
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full bg-card border border-border rounded-lg pl-10 pr-9 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.slice(0, 8).map(sound => (
            <Link
              key={sound.id}
              href={`/sound/${sound.id}`}
              onClick={() => handleClear()}
              className="flex items-center gap-3 px-3 py-2 hover:bg-background border-b border-border/50 last:border-0 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{sound.name}</p>
                <p className="text-xs text-muted-foreground">{sound.category}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{sound.duration}s</span>
            </Link>
          ))}
          {results.length > 8 && (
            <div className="px-3 py-2 text-xs text-muted-foreground text-center">
              +{results.length - 8} more results
            </div>
          )}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg p-4 shadow-lg z-50 text-center">
          <p className="text-sm text-muted-foreground">No sounds found</p>
        </div>
      )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-foreground hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
