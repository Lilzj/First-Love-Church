import type { BaseEntity } from './common';

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  authorBio: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  thumbnailUrl: string;
  readTime: string;
  isFeatured: boolean;
  viewCount: number;
  commentCount: number;
}

export type BlogCategory =
  | 'devotional'
  | 'faith'
  | 'family'
  | 'prayer'
  | 'leadership'
  | 'testimony'
  | 'christian-living';

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  authorImage: string;
  content: string;
  date: string;
  likes: number;
}
