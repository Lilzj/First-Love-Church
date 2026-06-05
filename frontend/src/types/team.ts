import type { BaseEntity, SocialLinks } from './common';

export interface TeamMember extends BaseEntity {
  name: string;
  role: string;
  title: string;
  bio: string;
  imageUrl: string;
  socialLinks: SocialLinks;
  order: number;
  isLeadPastor: boolean;
}

export interface Testimonial extends BaseEntity {
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
  rating: number;
  date: string;
  isFeatured: boolean;
}
