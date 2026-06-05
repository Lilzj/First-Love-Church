import type {
  AdminUser,
  DashboardStats,
  DonationRecord,
  DonationProject,
  AdminNotification,
  AuditLog,
  NewsletterSubscriber,
  NewsletterEmail,
  LivestreamSchedule,
  MonthlyDonation,
} from '@/types/admin';

// ============================================================
// Dashboard
// ============================================================

export const dashboardStats: DashboardStats = {
  totalMembers: 1247,
  totalDonations: 284500,
  activeEvents: 8,
  totalSermons: 156,
  membersTrend: 12.4,
  donationsTrend: 8.7,
  eventsTrend: -2.1,
  sermonsTrend: 15.3,
};

export const monthlyDonations: MonthlyDonation[] = [
  { month: 'Jan', amount: 18200 },
  { month: 'Feb', amount: 22400 },
  { month: 'Mar', amount: 19800 },
  { month: 'Apr', amount: 28100 },
  { month: 'May', amount: 31500 },
  { month: 'Jun', amount: 26700 },
  { month: 'Jul', amount: 24300 },
  { month: 'Aug', amount: 29600 },
  { month: 'Sep', amount: 27800 },
  { month: 'Oct', amount: 33200 },
  { month: 'Nov', amount: 21900 },
  { month: 'Dec', amount: 38400 },
];

// ============================================================
// Admin Users
// ============================================================

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'u1',
    name: 'Apostle David Benson Gbogodor',
    email: 'pastor@firstlovechurch.org',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2026-05-25T08:30:00Z',
    joinedDate: '2020-01-15T00:00:00Z',
    phone: '+234 800 123 4567',
  },
  {
    id: 'u2',
    name: 'Sister Grace Okonkwo',
    email: 'grace@firstlovechurch.org',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-05-24T16:00:00Z',
    joinedDate: '2021-03-10T00:00:00Z',
    phone: '+234 801 234 5678',
  },
  {
    id: 'u3',
    name: 'Brother Emmanuel Asante',
    email: 'emmanuel@firstlovechurch.org',
    role: 'editor',
    status: 'active',
    lastLogin: '2026-05-23T11:20:00Z',
    joinedDate: '2022-06-20T00:00:00Z',
  },
  {
    id: 'u4',
    name: 'Deaconess Martha Adjei',
    email: 'martha@firstlovechurch.org',
    role: 'editor',
    status: 'active',
    lastLogin: '2026-05-22T09:15:00Z',
    joinedDate: '2021-09-05T00:00:00Z',
  },
  {
    id: 'u5',
    name: 'Brother Samuel Mensah',
    email: 'samuel@firstlovechurch.org',
    role: 'member',
    status: 'active',
    lastLogin: '2026-05-20T14:45:00Z',
    joinedDate: '2023-01-15T00:00:00Z',
  },
  {
    id: 'u6',
    name: 'Sister Abigail Boateng',
    email: 'abigail@firstlovechurch.org',
    role: 'member',
    status: 'inactive',
    lastLogin: '2026-03-10T08:00:00Z',
    joinedDate: '2022-11-20T00:00:00Z',
  },
  {
    id: 'u7',
    name: 'Elder Joshua Tetteh',
    email: 'joshua@firstlovechurch.org',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-05-25T07:00:00Z',
    joinedDate: '2020-05-01T00:00:00Z',
    phone: '+234 802 345 6789',
  },
  {
    id: 'u8',
    name: 'Sister Priscilla Owusu',
    email: 'priscilla@firstlovechurch.org',
    role: 'member',
    status: 'active',
    lastLogin: '2026-05-21T10:30:00Z',
    joinedDate: '2024-02-14T00:00:00Z',
  },
];

// ============================================================
// Donations
// ============================================================

export const mockDonations: DonationRecord[] = [
  { id: 'd1', donorName: 'Mr. Daniel Koffi', donorEmail: 'daniel@email.com', amount: 5000, currency: '₦', date: '2026-05-25T10:00:00Z', project: 'Building Fund', method: 'bank_transfer', status: 'completed' },
  { id: 'd2', donorName: 'Sister Mercy Agyemang', donorEmail: 'mercy@email.com', amount: 2500, currency: '₦', date: '2026-05-24T14:30:00Z', project: 'General Offering', method: 'card', status: 'completed' },
  { id: 'd3', donorName: 'Brother Isaac Bateng', donorEmail: 'isaac@email.com', amount: 10000, currency: '₦', date: '2026-05-23T09:00:00Z', project: 'Youth Camp Fund', method: 'mobile_money', status: 'completed' },
  { id: 'd4', donorName: 'Elder Joshua Tetteh', donorEmail: 'joshua@email.com', amount: 15000, currency: '₦', date: '2026-05-22T11:15:00Z', project: 'Building Fund', method: 'bank_transfer', status: 'completed' },
  { id: 'd5', donorName: 'Anonymous', donorEmail: '', amount: 3000, currency: '₦', date: '2026-05-21T16:00:00Z', project: 'Missions Fund', method: 'cash', status: 'completed' },
  { id: 'd6', donorName: 'Deaconess Martha Adjei', donorEmail: 'martha@email.com', amount: 7500, currency: '₦', date: '2026-05-20T08:45:00Z', project: 'Community Outreach', method: 'card', status: 'completed' },
  { id: 'd7', donorName: 'Mr. Patrick Acheampong', donorEmail: 'patrick@email.com', amount: 1000, currency: '₦', date: '2026-05-19T13:20:00Z', project: 'General Offering', method: 'mobile_money', status: 'pending' },
  { id: 'd8', donorName: 'Sister Grace Okonkwo', donorEmail: 'grace@email.com', amount: 20000, currency: '₦', date: '2026-05-18T10:00:00Z', project: 'Building Fund', method: 'bank_transfer', status: 'completed' },
  { id: 'd9', donorName: 'Brother Caleb Mensah', donorEmail: 'caleb@email.com', amount: 500, currency: '₦', date: '2026-05-17T15:30:00Z', project: 'Youth Camp Fund', method: 'card', status: 'failed' },
  { id: 'd10', donorName: 'Mrs. Esther Darko', donorEmail: 'esther@email.com', amount: 8000, currency: '₦', date: '2026-05-16T09:10:00Z', project: 'Missions Fund', method: 'bank_transfer', status: 'completed' },
];

export const mockDonationProjects: DonationProject[] = [
  { id: 'dp1', name: 'New Church Building', description: 'Building a new 2000-seat auditorium for worship services.', goal: 500000, raised: 347500, currency: '₦', status: 'active', startDate: '2025-01-01' },
  { id: 'dp2', name: 'Youth Camp 2026', description: 'Annual youth camp for discipleship and fellowship.', goal: 50000, raised: 32000, currency: '₦', status: 'active', startDate: '2026-03-01', endDate: '2026-07-15' },
  { id: 'dp3', name: 'Missions Outreach', description: 'Supporting missionaries across West Africa.', goal: 100000, raised: 78000, currency: '₦', status: 'active', startDate: '2025-06-01' },
  { id: 'dp4', name: 'Community Feeding Program', description: 'Monthly food distribution to underserved communities.', goal: 30000, raised: 30000, currency: '₦', status: 'completed', startDate: '2025-01-01', endDate: '2025-12-31' },
];

// ============================================================
// Notifications
// ============================================================

export const mockNotifications: AdminNotification[] = [
  { id: 'n1', type: 'new_donation', title: 'New Donation Received', message: 'Mr. Daniel Koffi donated ₦5,000 to Building Fund.', timestamp: '2026-05-25T10:00:00Z', isRead: false },
  { id: 'n2', type: 'event_registration', title: 'Event Registration', message: '15 new registrations for Annual Worship Conference.', timestamp: '2026-05-25T09:30:00Z', isRead: false },
  { id: 'n3', type: 'prayer_request', title: 'New Prayer Request', message: 'A new prayer request has been submitted.', timestamp: '2026-05-25T08:15:00Z', isRead: false },
  { id: 'n4', type: 'sermon_published', title: 'Sermon Published', message: '"The Power of First Love" has been published.', timestamp: '2026-05-24T16:00:00Z', isRead: true },
  { id: 'n5', type: 'new_member', title: 'New Member', message: 'Sister Abigail joined First Love Church.', timestamp: '2026-05-24T12:00:00Z', isRead: true },
  { id: 'n6', type: 'system', title: 'System Update', message: 'Website maintenance scheduled for Sunday 2 AM.', timestamp: '2026-05-23T18:00:00Z', isRead: true },
  { id: 'n7', type: 'new_donation', title: 'Large Donation', message: 'Elder Joshua donated ₦15,000 to Building Fund.', timestamp: '2026-05-22T11:15:00Z', isRead: true },
  { id: 'n8', type: 'prayer_request', title: 'Prayer Request Flagged', message: 'A prayer request has been flagged for review.', timestamp: '2026-05-21T09:00:00Z', isRead: true },
];

// ============================================================
// Activity Logs
// ============================================================

export const mockAuditLogs: AuditLog[] = [
  { id: 'a1', action: 'Published sermon', user: 'Apostle David Benson', timestamp: '2026-05-25T09:00:00Z', details: '"The Power of First Love"', type: 'publish' },
  { id: 'a2', action: 'Created event', user: 'Sister Grace Okonkwo', timestamp: '2026-05-25T08:30:00Z', details: '"Annual Worship Conference 2026"', type: 'create' },
  { id: 'a3', action: 'Updated ministry info', user: 'Brother Emmanuel Asante', timestamp: '2026-05-24T15:00:00Z', details: 'Youth Ministry description updated', type: 'update' },
  { id: 'a4', action: 'New blog post', user: 'Deaconess Martha Adjei', timestamp: '2026-05-24T12:00:00Z', details: '"5 Ways to Strengthen Your Prayer Life"', type: 'create' },
  { id: 'a5', action: 'Deleted event', user: 'Sister Grace Okonkwo', timestamp: '2026-05-23T16:00:00Z', details: 'Removed cancelled fellowship dinner', type: 'delete' },
  { id: 'a6', action: 'User login', user: 'Elder Joshua Tetteh', timestamp: '2026-05-23T08:00:00Z', details: 'Logged in from Lagos, Nigeria', type: 'login' },
  { id: 'a7', action: 'Updated settings', user: 'Apostle David Benson', timestamp: '2026-05-22T14:00:00Z', details: 'Changed church phone number', type: 'update' },
  { id: 'a8', action: 'Published blog', user: 'Deaconess Martha Adjei', timestamp: '2026-05-22T10:00:00Z', details: '"The Heart of Worship"', type: 'publish' },
];

// ============================================================
// Newsletter
// ============================================================

export const mockNewsletterSubscribers: NewsletterSubscriber[] = [
  { id: 'ns1', email: 'daniel.koffi@email.com', name: 'Daniel Koffi', subscribedDate: '2026-01-15', status: 'active' },
  { id: 'ns2', email: 'mercy.agyemang@email.com', name: 'Mercy Agyemang', subscribedDate: '2026-02-20', status: 'active' },
  { id: 'ns3', email: 'isaac.bateng@email.com', name: 'Isaac Bateng', subscribedDate: '2025-11-10', status: 'active' },
  { id: 'ns4', email: 'grace.okonkwo@email.com', name: 'Grace Okonkwo', subscribedDate: '2025-09-05', status: 'active' },
  { id: 'ns5', email: 'samuel.mensah@email.com', name: 'Samuel Mensah', subscribedDate: '2026-03-12', status: 'active' },
  { id: 'ns6', email: 'priscilla.owusu@email.com', name: 'Priscilla Owusu', subscribedDate: '2026-04-01', status: 'unsubscribed' },
  { id: 'ns7', email: 'joshua.tetteh@email.com', name: 'Joshua Tetteh', subscribedDate: '2025-07-20', status: 'active' },
  { id: 'ns8', email: 'martha.adjei@email.com', name: 'Martha Adjei', subscribedDate: '2025-08-15', status: 'active' },
];

export const mockNewsletterEmails: NewsletterEmail[] = [
  { id: 'ne1', subject: 'Weekly Devotional — Walking in Love', sentDate: '2026-05-25', recipientCount: 342, openRate: 67.3, status: 'sent' },
  { id: 'ne2', subject: 'Annual Conference Registration Open!', sentDate: '2026-05-18', recipientCount: 342, openRate: 82.1, status: 'sent' },
  { id: 'ne3', subject: 'Youth Camp 2026 — Sign Up Today', sentDate: '2026-05-11', recipientCount: 335, openRate: 71.5, status: 'sent' },
  { id: 'ne4', subject: 'Sunday Service Recap & Sermon Notes', sentDate: '2026-05-04', recipientCount: 328, openRate: 58.9, status: 'sent' },
  { id: 'ne5', subject: 'June Events Preview', sentDate: '', recipientCount: 0, openRate: 0, status: 'draft' },
];

// ============================================================
// Livestream
// ============================================================

export const mockLivestreamSchedules: LivestreamSchedule[] = [
  { id: 'ls1', title: 'Sunday Worship Service', date: '2026-06-01', time: '09:00 AM', platform: 'youtube', streamUrl: 'https://youtube.com/live/example', status: 'upcoming' },
  { id: 'ls2', title: 'Wednesday Bible Study', date: '2026-05-28', time: '06:00 PM', platform: 'facebook', streamUrl: 'https://facebook.com/live/example', status: 'upcoming' },
  { id: 'ls3', title: 'Sunday Worship Service', date: '2026-05-25', time: '09:00 AM', platform: 'youtube', streamUrl: 'https://youtube.com/live/past1', status: 'completed' },
  { id: 'ls4', title: 'Friday Prayer & Worship', date: '2026-05-23', time: '06:00 PM', platform: 'website', status: 'completed' },
  { id: 'ls5', title: 'Sunday Worship Service', date: '2026-05-18', time: '09:00 AM', platform: 'youtube', streamUrl: 'https://youtube.com/live/past2', status: 'completed' },
];

// ============================================================
// Current admin user (logged in)
// ============================================================

export const currentAdminUser: AdminUser = mockAdminUsers[0];
