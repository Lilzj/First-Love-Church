// =====================================================
// Backend-aligned API types
// These match the DTOs from the ASP.NET Core backend
// =====================================================

// --- Common ---

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: string;
  sortDescending?: boolean;
}

// --- Auth ---

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  gender?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  tokenExpiration: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  memberSince: string;
  isActive: boolean;
  bio?: string;
  roles: string[];
}

export interface AssignRoleRequest {
  userId: string;
  roleName: string;
}

// --- Sermons ---

export interface SermonResponse {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  date?: string;
  viewCount: number;
  likeCount: number;
  isFeatured: boolean;
  status: string;
  seriesName?: string;
  categoryName?: string;
  speakerName?: string;
  speakerImageUrl?: string;
  tags: string[];
  commentCount: number;
  seriesId?: string;
  categoryId?: string;
  speakerId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SermonListItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  date?: string;
  duration?: string;
  viewCount: number;
  likeCount: number;
  isFeatured: boolean;
  categoryName?: string;
  speakerName?: string;
  createdAt: string;
}

export interface CreateSermonRequest {
  title: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  date?: string;
  isFeatured?: boolean;
  seriesId?: string;
  categoryId?: string;
  speakerId?: string;
  tagIds?: string[];
}

export interface SermonCategoryResponse {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  sermonCount: number;
}

export interface SermonTagResponse {
  id: string;
  name: string;
  slug?: string;
}

export interface SermonSeriesResponse {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  sermonCount: number;
}

// --- Events ---

export interface EventResponse {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  address?: string;
  imageUrl?: string;
  status: string;
  eventType?: string;
  isVirtual: boolean;
  virtualLink?: string;
  maxAttendees?: number;
  registrationRequired: boolean;
  isFeatured: boolean;
  contactEmail?: string;
  organizerName?: string;
  registrationCount: number;
  attendanceCount: number;
  volunteerCount: number;
  createdAt: string;
}

export interface EventListItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  imageUrl?: string;
  status: string;
  isFeatured: boolean;
  registrationCount: number;
  createdAt: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  content?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  address?: string;
  imageUrl?: string;
  eventType?: string;
  isVirtual?: boolean;
  virtualLink?: string;
  maxAttendees?: number;
  registrationRequired?: boolean;
  isFeatured?: boolean;
  contactEmail?: string;
}

// --- Donations ---

export interface DonationResponse {
  id: string;
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  status: string;
  paymentMethod?: string;
  paymentReference?: string;
  transactionId?: string;
  notes?: string;
  isAnonymous: boolean;
  campaignTitle?: string;
  projectTitle?: string;
  paidAt?: string;
  createdAt: string;
}

export interface DonationSummary {
  totalDonations: number;
  totalDonorsCount: number;
  totalTransactions: number;
  thisMonthTotal: number;
  lastMonthTotal: number;
  growthPercentage: number;
}

export interface CampaignResponse {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  goalAmount: number;
  currentAmount: number;
  progressPercentage: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  donationCount: number;
  createdAt: string;
}

export interface CreateCampaignRequest {
  title: string;
  description?: string;
  goalAmount: number;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  goalAmount: number;
  currentAmount: number;
  progressPercentage: number;
  status: string;
  imageUrl?: string;
  donationCount: number;
  createdAt: string;
}

// --- Blog ---

export interface BlogPostResponse {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImageUrl?: string;
  status: string;
  publishedAt?: string;
  viewCount: number;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  authorName: string;
  authorImageUrl?: string;
  categoryName?: string;
  tags: string[];
  commentCount: number;
  createdAt: string;
}

export interface BlogPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImageUrl?: string;
  status: string;
  publishedAt?: string;
  viewCount: number;
  isFeatured: boolean;
  authorName: string;
  categoryName?: string;
  commentCount: number;
  createdAt: string;
}

export interface CreateBlogPostRequest {
  title: string;
  content?: string;
  excerpt?: string;
  featuredImageUrl?: string;
  status?: string;
  isFeatured?: boolean;
  categoryId?: string;
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogCategoryResponse {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  postCount: number;
}

// --- Media ---

export interface MediaFileResponse {
  id: string;
  fileName: string;
  originalFileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  mimeType?: string;
  description?: string;
  tags?: string;
  altText?: string;
  albumId?: string;
  albumTitle?: string;
  uploadedByName?: string;
  createdAt: string;
}

export interface MediaUploadResponse {
  id: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface AlbumResponse {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  slug?: string;
  eventId?: string;
  ministryId?: string;
  mediaCount: number;
  createdAt: string;
}

export interface CreateAlbumRequest {
  title: string;
  description?: string;
  coverImageUrl?: string;
  eventId?: string;
  ministryId?: string;
}

// --- Ministry ---

export interface MinistryResponse {
  id: string;
  name: string;
  description?: string;
  mission?: string;
  imageUrl?: string;
  isActive: boolean;
  meetingSchedule?: string;
  slug?: string;
  contactEmail?: string;
  leaderCount: number;
  memberCount: number;
  leaders: MinistryLeaderResponse[];
  createdAt: string;
}

export interface MinistryListItem {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  slug?: string;
  memberCount: number;
}

export interface CreateMinistryRequest {
  name: string;
  description?: string;
  mission?: string;
  imageUrl?: string;
  meetingSchedule?: string;
  contactEmail?: string;
}

export interface MinistryLeaderResponse {
  id: string;
  userId: string;
  userName: string;
  userImageUrl?: string;
  role?: string;
  startDate: string;
  isActive: boolean;
}

// --- LiveStream ---

export interface LiveStreamResponse {
  id: string;
  title: string;
  description?: string;
  streamUrl: string;
  platform?: string;
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  thumbnailUrl?: string;
  status: string;
  viewerCount: number;
  slug?: string;
  createdAt: string;
}

export interface CreateLiveStreamRequest {
  title: string;
  description?: string;
  streamUrl: string;
  platform?: string;
  scheduledAt?: string;
  thumbnailUrl?: string;
}

// --- Prayer Requests ---

export interface PrayerRequestResponse {
  id: string;
  title?: string;
  content: string;
  requestedBy?: string;
  isAnonymous: boolean;
  isPublic: boolean;
  status: string;
  prayerCount: number;
  adminNotes?: string;
  createdAt: string;
}

export interface CreatePrayerRequestData {
  title?: string;
  content: string;
  requestedBy?: string;
  isAnonymous?: boolean;
  isPublic?: boolean;
}

// --- Schedule ---

export interface WeeklyActivityResponse {
  id: string;
  title: string;
  description?: string;
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  location?: string;
  activityType: string;
  isRecurring: boolean;
  isActive: boolean;
  leaderName?: string;
  imageUrl?: string;
  sortOrder: number;
}

// --- Notifications ---

export interface NotificationResponse {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  imageUrl?: string;
  createdAt: string;
}

// --- Dashboard ---

export interface DashboardSummary {
  totalMembers: number;
  totalSermons: number;
  totalEvents: number;
  totalBlogPosts: number;
  totalMinistries: number;
  totalPrayerRequests: number;
  totalDonations: number;
  activeCampaigns: number;
  upcomingEvents: number;
  pendingPrayerRequests: number;
  newMembersThisMonth: number;
}
