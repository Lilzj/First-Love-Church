import type { BaseEntity } from './common';

export interface Sermon extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  content: string;
  preacher: string;
  preacherImage: string;
  date: string;
  duration: string;
  category: SermonCategory;
  tags: string[];
  thumbnailUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  scriptureReferences: ScriptureReference[];
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
}

export interface ScriptureReference {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  text: string;
}

export type SermonCategory =
  | 'faith'
  | 'love'
  | 'prayer'
  | 'worship'
  | 'family'
  | 'leadership'
  | 'healing'
  | 'prophecy'
  | 'salvation'
  | 'holy-spirit';
