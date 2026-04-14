'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Music, TrendingUp, Download, Sparkles, Home } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '#trending', label: 'Trending', icon: TrendingUp },
    { href: '#downloaded', label: 'Most Downloaded', icon: Download },
    { href: '#new', label: 'New Releases', icon: Sparkles },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <nav
        className={`fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-card to-background border-r border-border/50 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SoundVibe</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-background rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col p-4 gap-2 pt-6">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-primary/10 text-foreground transition-all hover:translate-x-1 flex items-center gap-3 group"
              >
                <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 p-5 flex flex-col gap-3 bg-gradient-to-t from-background to-transparent">
          <Link href="/admin/login" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
            Admin Panel
          </Link>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>© 2024 SoundVibe</p>
            <p>Premium Sound Effects</p>
          </div>
        </div>
      </nav>
    </>
  );
}
