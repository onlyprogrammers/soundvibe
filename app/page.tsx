'use client';

import { getTrendingSounds, getMostDownloadedSounds, getNewReleases, getFeaturedCollections } from '@/lib/sounds-data';
import SoundSection from '@/components/sound-section';
import HeroBanner from '@/components/hero-banner';
import Footer from '@/components/footer';
import SongMenu from '@/components/songmenu';

export default function Home() {
  const trendingSounds = getTrendingSounds();
  const mostDownloaded = getMostDownloadedSounds();
  const newReleases = getNewReleases();
  const featuredCollections = getFeaturedCollections();

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Trending Sounds */}
        <SoundSection id="trending" title="Trending Now" sounds={trendingSounds} />

        {/* {sound menu} */}
        <div className="group relative">
          <SongMenu />
        </div>

        {/* Most Downloaded */}
        <SoundSection id="downloaded" title="Most Downloaded" sounds={mostDownloaded} />

        {/* New Releases */}
        <SoundSection id="new" title="New Releases" sounds={newReleases} />

        {/* Featured Collections */}
        <SoundSection id="explore" title="Featured Collections" sounds={featuredCollections} />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
