import type { BaseEntity } from './common';

export interface Ministry extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  mission: string;
  leader: string;
  leaderImage: string;
  leaderTitle: string;
  thumbnailUrl: string;
  coverImage: string;
  icon: string;
  meetingDay: string;
  meetingTime: string;
  location: string;
  galleryImages: string[];
  activities: string[];
  memberCount: number;
  isActive: boolean;
}
