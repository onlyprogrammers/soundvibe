export interface Sound {
  id: string;
  name: string;
  category: string;
  duration: number; // in seconds
  downloads: number;
  likes: number;
  isNew: boolean;
  isTrending: boolean;
  description?: string;
}

export const allSounds: Sound[] = [
  // Trending Sounds
  {
    id: '1',
    name: 'Smooth Transition',
    category: 'Transitions',
    duration: 1.2,
    downloads: 15420,
    likes: 3200,
    isTrending: true,
    isNew: false,
    description: 'Clean, smooth whoosh transition effect perfect for video edits',
  },
  {
    id: '2',
    name: 'Comedy Fail',
    category: 'Comedy',
    duration: 1.5,
    downloads: 12840,
    likes: 2800,
    isTrending: true,
    isNew: false,
    description: 'Classic fail horn sound with comic timing',
  },
  {
    id: '3',
    name: 'Pop!',
    category: 'Effects',
    duration: 0.3,
    downloads: 11200,
    likes: 2400,
    isTrending: true,
    isNew: false,
    description: 'Sharp, satisfying pop sound effect',
  },
  {
    id: '4',
    name: 'Retro Beep',
    category: 'Sci-Fi',
    duration: 0.4,
    downloads: 10890,
    likes: 2100,
    isTrending: true,
    isNew: false,
    description: 'Futuristic retro beep sound',
  },

  // Most Downloaded
  {
    id: '5',
    name: 'Crash Cymbal',
    category: 'Music',
    duration: 1.8,
    downloads: 28500,
    likes: 5200,
    isTrending: false,
    isNew: false,
    description: 'Loud crash cymbal hit for emphasis',
  },
  {
    id: '6',
    name: 'Laugh Track',
    category: 'Comedy',
    duration: 2.1,
    downloads: 24300,
    likes: 4800,
    isTrending: false,
    isNew: false,
    description: 'Audience laughter sound effect',
  },
  {
    id: '7',
    name: 'Whoosh Left',
    category: 'Transitions',
    duration: 0.8,
    downloads: 22100,
    likes: 4100,
    isTrending: false,
    isNew: false,
    description: 'Flying transition from left to right',
  },
  {
    id: '8',
    name: 'Electronic Pulse',
    category: 'Sci-Fi',
    duration: 1.2,
    downloads: 19800,
    likes: 3700,
    isTrending: false,
    isNew: false,
    description: 'Modern electronic pulse sound',
  },

  // New Releases
  {
    id: '9',
    name: 'Sparkle Shine',
    category: 'Magic',
    duration: 0.7,
    downloads: 450,
    likes: 120,
    isTrending: false,
    isNew: true,
    description: 'Magical sparkle effect sound',
  },
  {
    id: '10',
    name: 'Bubble Pop',
    category: 'Effects',
    duration: 0.5,
    downloads: 380,
    likes: 95,
    isTrending: false,
    isNew: true,
    description: 'Playful bubble popping sound',
  },
  {
    id: '11',
    name: 'Thunder Strike',
    category: 'Nature',
    duration: 1.3,
    downloads: 520,
    likes: 140,
    isTrending: false,
    isNew: true,
    description: 'Realistic thunder and lightning strike',
  },
  {
    id: '12',
    name: 'Digital Error',
    category: 'Tech',
    duration: 0.6,
    downloads: 410,
    likes: 110,
    isTrending: false,
    isNew: true,
    description: 'Tech glitch error notification sound',
  },

  // Featured Collections
  {
    id: '13',
    name: 'Clap Burst',
    category: 'Percussion',
    duration: 0.4,
    downloads: 8900,
    likes: 1800,
    isTrending: false,
    isNew: false,
    description: 'Explosive clap burst effect',
  },
  {
    id: '14',
    name: 'Record Scratch',
    category: 'DJ',
    duration: 1.1,
    downloads: 7650,
    likes: 1600,
    isTrending: false,
    isNew: false,
    description: 'Classic vinyl record scratch',
  },
  {
    id: '15',
    name: 'Zoom In',
    category: 'Transitions',
    duration: 0.9,
    downloads: 9200,
    likes: 1900,
    isTrending: false,
    isNew: false,
    description: 'Fast zoom transition effect',
  },
  {
    id: '16',
    name: 'Swoosh Power',
    category: 'Transitions',
    duration: 1.0,
    downloads: 8500,
    likes: 1700,
    isTrending: false,
    isNew: false,
    description: 'Powerful swoosh transition',
  },
  {
    id: '17',
    name: 'Coin Drop',
    category: 'Game',
    duration: 0.8,
    downloads: 6800,
    likes: 1400,
    isTrending: false,
    isNew: false,
    description: 'Retro coin drop sound',
  },
  {
    id: '18',
    name: 'Notification Bell',
    category: 'UI',
    duration: 0.5,
    downloads: 7200,
    likes: 1500,
    isTrending: false,
    isNew: false,
    description: 'Pleasant notification bell sound',
  },
];

export const getTrendingSounds = () => allSounds.filter(s => s.isTrending).slice(0, 6);
export const getMostDownloadedSounds = () =>
  allSounds.sort((a, b) => b.downloads - a.downloads).slice(0, 6);
export const getNewReleases = () => allSounds.filter(s => s.isNew).slice(0, 6);
export const getFeaturedCollections = () =>
  allSounds.filter(s => !s.isTrending && !s.isNew).slice(0, 8);
export const getSoundById = (id: string) => allSounds.find(s => s.id === id);
export const searchSounds = (query: string) =>
  allSounds.filter(
    s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase()) ||
      s.description?.toLowerCase().includes(query.toLowerCase()),
  );
