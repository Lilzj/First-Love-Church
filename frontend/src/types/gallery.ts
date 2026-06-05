import type { BaseEntity } from './common';

export interface GalleryItem extends BaseEntity {
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  date: string;
  album?: string;
  type: 'image' | 'video';
  videoUrl?: string;
}

export type GalleryCategory =
  | 'worship'
  | 'events'
  | 'community'
  | 'youth'
  | 'outreach'
  | 'celebrations';

export interface DonationProject extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  thumbnailUrl: string;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  deadline: string;
  isActive: boolean;
  isCompleted: boolean;
  updates: ProjectUpdate[];
}

export interface ProjectUpdate {
  date: string;
  title: string;
  description: string;
}

export interface Livestream extends BaseEntity {
  title: string;
  description: string;
  date: string;
  time: string;
  platform: 'youtube' | 'facebook';
  embedUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
  isUpcoming: boolean;
  viewCount: number;
}

export interface PrayerRequest extends BaseEntity {
  name: string;
  request: string;
  category: PrayerCategory;
  isAnonymous: boolean;
  prayerCount: number;
  status: 'pending' | 'approved' | 'answered';
  date: string;
}

export type PrayerCategory =
  | 'health'
  | 'family'
  | 'financial'
  | 'spiritual'
  | 'career'
  | 'relationships'
  | 'other';

export interface WeeklyActivity {
  day: string;
  activities: ActivityItem[];
}

export interface ActivityItem {
  name: string;
  time: string;
  location: string;
  description: string;
  leader?: string;
  category: string;
}
