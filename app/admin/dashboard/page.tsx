'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Upload, Music, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SoundUpload from '@/components/admin/sound-upload';
import AdminStats from '@/components/admin/admin-stats';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'upload'>('stats');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 mb-4">
            <Music className="text-primary" size={24} />
          </div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music size={18} className="text-white" />
            </div>
            <span className="font-bold text-sm hidden sm:block">SoundVibe Admin</span>
          </Link>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="gap-2 text-foreground/60 hover:text-foreground"
          >
            <LogOut size={18} />
            <span className="hidden sm:block">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 px-4 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'stats'
                ? 'text-primary border-primary'
                : 'text-foreground/60 border-transparent hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={16} />
              Dashboard
            </div>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-4 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'upload'
                ? 'text-primary border-primary'
                : 'text-foreground/60 border-transparent hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Upload size={16} />
              Upload Sounds
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'upload' && <SoundUpload />}
      </div>
    </div>
  );
}
