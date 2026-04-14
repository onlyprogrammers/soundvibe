'use client';

import { useEffect, useState } from 'react';
import { Music, Download, Heart, TrendingUp } from 'lucide-react';

interface StatsData {
  totalSounds: number;
  totalDownloads: number;
  totalLikes: number;
  trendingSounds: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<StatsData>({
    totalSounds: 0,
    totalDownloads: 0,
    totalLikes: 0,
    trendingSounds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      icon: Music,
      label: 'Total Sounds',
      value: stats.totalSounds,
      color: 'primary',
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: stats.totalDownloads,
      color: 'secondary',
    },
    {
      icon: Heart,
      label: 'Total Likes',
      value: stats.totalLikes,
      color: 'accent',
    },
    {
      icon: TrendingUp,
      label: 'Trending Sounds',
      value: stats.trendingSounds,
      color: 'primary',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                  <Icon className={`text-${stat.color}`} size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold">{isLoading ? '-' : stat.value.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
            <p className="font-medium text-sm">Manage Sounds</p>
            <p className="text-xs text-foreground/60 mt-1">Edit, delete, or update sounds</p>
          </button>
          <button className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
            <p className="font-medium text-sm">Manage Categories</p>
            <p className="text-xs text-foreground/60 mt-1">Add or update sound categories</p>
          </button>
        </div>
      </div>
    </div>
  );
}
