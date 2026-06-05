export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: Address;
  socialLinks: SocialLinks;
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
