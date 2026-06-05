import type { BaseEntity } from './common';

export interface ChurchEvent extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  category: EventCategory;
  thumbnailUrl: string;
  galleryImages: string[];
  isFeatured: boolean;
  isUpcoming: boolean;
  registrationRequired: boolean;
  registrationUrl?: string;
  maxAttendees?: number;
  currentAttendees: number;
  organizer: string;
  contactEmail: string;
  tags: string[];
}

export type EventCategory =
  | 'worship'
  | 'conference'
  | 'youth'
  | 'outreach'
  | 'fellowship'
  | 'prayer'
  | 'special'
  | 'training';

export interface EventRegistration {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  specialRequirements?: string;
}
