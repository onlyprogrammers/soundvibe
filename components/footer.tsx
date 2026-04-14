'use client';

import Link from 'next/link';
import { Music, Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-background to-background/50 border-t border-border/50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Music size={18} className="text-white" />
              </div>
              <span className="font-bold text-sm">SoundVibe</span>
            </div>
            <p className="text-xs text-foreground/60">Premium sound effects for creators</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase text-foreground mb-3">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#trending" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  Trending Sounds
                </Link>
              </li>
              <li>
                <Link href="#downloaded" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  Most Downloaded
                </Link>
              </li>
              <li>
                <Link href="#new" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold uppercase text-foreground mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-foreground/60">
            © {new Date().getFullYear()} SoundVibe. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <Facebook size={16} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <Instagram size={16} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
