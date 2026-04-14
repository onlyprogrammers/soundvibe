'use client'

import Link from 'next/link'
import MobileNav from './mobile-nav'
import SearchBar from './search-bar'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-background via-background to-background border-b border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="px-4 h-14 flex items-center justify-between gap-3 border-b border-border/30">
        {/* Mobile Menu */}
        <MobileNav />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
            <span className="text-white font-bold text-lg">♫</span>
          </div>
          <span className="font-bold text-base hidden sm:block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SoundVibe</span>
        </Link>

        {/* Admin Link */}
        <Link href="/admin/login" className="hidden sm:block text-xs font-medium text-foreground/60 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10">
          Admin
        </Link>
      </div>

      {/* Search Bar Section */}
      <div className="px-4 py-3 border-b border-border/30 bg-background/50">
        <SearchBar />
      </div>
    </header>
  )
}
