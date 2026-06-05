// Admin portal types

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'member';
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  joinedDate: string;
  phone?: string;
}

export interface DashboardStats {
  totalMembers: number;
  totalDonations: number;
  activeEvents: number;
  totalSermons: number;
  membersTrend: number;       // percentage change
  donationsTrend: number;
  eventsTrend: number;
  sermonsTrend: number;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  date: string;
  project: string;
  method: 'card' | 'bank_transfer' | 'cash' | 'mobile_money';
  status: 'completed' | 'pending' | 'failed';
}

export interface DonationProject {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  currency: string;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
}

export interface AdminNotification {
  id: string;
  type: 'sermon_published' | 'new_donation' | 'event_registration' | 'prayer_request' | 'new_member' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'create' | 'update' | 'delete' | 'publish' | 'login';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedDate: string;
  status: 'active' | 'unsubscribed';
}

export interface NewsletterEmail {
  id: string;
  subject: string;
  sentDate: string;
  recipientCount: number;
  openRate: number;
  status: 'sent' | 'draft' | 'scheduled';
}

export interface LivestreamSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  platform: 'youtube' | 'facebook' | 'website';
  streamUrl?: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface MonthlyDonation {
  month: string;
  amount: number;
}
