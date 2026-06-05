import type { GalleryItem, DonationProject, Livestream, PrayerRequest, WeeklyActivity } from '../types/gallery';

export const mockGalleryItems: GalleryItem[] = [
  { id: '1', title: 'Sunday Worship Experience', description: 'A powerful Sunday service with the congregation in worship.', imageUrl: '/images/gallery/worship-1.jpg', category: 'worship', date: '2026-05-18', type: 'image', createdAt: '2026-05-18T00:00:00Z', updatedAt: '2026-05-18T00:00:00Z' },
  { id: '2', title: 'Choir Ministration', description: 'Our worship team leading the congregation in praise.', imageUrl: '/images/gallery/worship-2.jpg', category: 'worship', date: '2026-05-11', type: 'image', createdAt: '2026-05-11T00:00:00Z', updatedAt: '2026-05-11T00:00:00Z' },
  { id: '3', title: 'Annual Conference 2025', description: 'Highlights from our annual worship conference.', imageUrl: '/images/gallery/event-1.jpg', category: 'events', date: '2025-12-15', album: 'Annual Conference 2025', type: 'image', createdAt: '2025-12-15T00:00:00Z', updatedAt: '2025-12-15T00:00:00Z' },
  { id: '4', title: 'Easter Celebration', description: 'Joyful Easter morning celebration with the church family.', imageUrl: '/images/gallery/event-2.jpg', category: 'celebrations', date: '2026-04-05', album: 'Easter 2026', type: 'image', createdAt: '2026-04-05T00:00:00Z', updatedAt: '2026-04-05T00:00:00Z' },
  { id: '5', title: 'Community Outreach', description: 'Reaching out to the community with food and supplies.', imageUrl: '/images/gallery/outreach-1.jpg', category: 'outreach', date: '2026-03-20', type: 'image', createdAt: '2026-03-20T00:00:00Z', updatedAt: '2026-03-20T00:00:00Z' },
  { id: '6', title: 'Youth Camp 2025', description: 'Fun and fellowship at our annual youth camp.', imageUrl: '/images/gallery/youth-1.jpg', category: 'youth', date: '2025-08-10', album: 'Youth Camp 2025', type: 'image', createdAt: '2025-08-10T00:00:00Z', updatedAt: '2025-08-10T00:00:00Z' },
  { id: '7', title: 'Church Picnic', description: 'A beautiful day of fellowship and fun at the park.', imageUrl: '/images/gallery/community-1.jpg', category: 'community', date: '2026-02-14', type: 'image', createdAt: '2026-02-14T00:00:00Z', updatedAt: '2026-02-14T00:00:00Z' },
  { id: '8', title: 'Baptism Service', description: 'New believers taking the step of water baptism.', imageUrl: '/images/gallery/celebration-1.jpg', category: 'celebrations', date: '2026-01-28', type: 'image', createdAt: '2026-01-28T00:00:00Z', updatedAt: '2026-01-28T00:00:00Z' },
  { id: '9', title: 'Prayer Night', description: 'An evening of deep intercession and worship.', imageUrl: '/images/gallery/worship-3.jpg', category: 'worship', date: '2026-04-18', type: 'image', createdAt: '2026-04-18T00:00:00Z', updatedAt: '2026-04-18T00:00:00Z' },
  { id: '10', title: 'Children\'s Sunday School', description: 'Kids learning about Jesus in creative ways.', imageUrl: '/images/gallery/youth-2.jpg', category: 'youth', date: '2026-05-04', type: 'image', createdAt: '2026-05-04T00:00:00Z', updatedAt: '2026-05-04T00:00:00Z' },
  { id: '11', title: 'Hospital Visitation', description: 'Bringing hope and prayer to patients.', imageUrl: '/images/gallery/outreach-2.jpg', category: 'outreach', date: '2026-03-05', type: 'image', createdAt: '2026-03-05T00:00:00Z', updatedAt: '2026-03-05T00:00:00Z' },
  { id: '12', title: 'Worship Night Highlights', description: 'An anointed night of worship and encounter.', imageUrl: '/images/gallery/worship-4.jpg', category: 'worship', date: '2026-05-02', type: 'video', videoUrl: 'https://youtube.com/embed/dQw4w9WgXcQ', createdAt: '2026-05-02T00:00:00Z', updatedAt: '2026-05-02T00:00:00Z' },
];

export const galleryCategories = [
  { value: 'all', label: 'All' },
  { value: 'worship', label: 'Worship' },
  { value: 'events', label: 'Events' },
  { value: 'community', label: 'Community' },
  { value: 'youth', label: 'Youth' },
  { value: 'outreach', label: 'Outreach' },
  { value: 'celebrations', label: 'Celebrations' },
];

export const mockProjects: DonationProject[] = [
  { id: '1', title: 'New Church Building Fund', slug: 'new-church-building', description: 'Help us build a new worship facility that can accommodate our growing congregation and serve the community for generations to come.', content: '<p>Our current auditorium can no longer hold the number of people God is bringing through our doors. We believe God is calling us to build a 3,000-seat facility with modern amenities.</p>', category: 'Building', thumbnailUrl: '/images/projects/building.jpg', goalAmount: 500000, raisedAmount: 287500, donorCount: 1245, deadline: '2027-12-31', isActive: true, isCompleted: false, updates: [{ date: '2026-05-01', title: 'Foundation Complete', description: 'The foundation has been laid and construction is progressing.' }], createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-05-01T00:00:00Z' },
  { id: '2', title: 'Community Food Bank', slug: 'community-food-bank', description: 'Providing nutritious meals to families in need across our community. Every donation helps feed a family for a week.', content: '<p>No one should go hungry. Our food bank serves over 200 families every month.</p>', category: 'Outreach', thumbnailUrl: '/images/projects/food-bank.jpg', goalAmount: 50000, raisedAmount: 38750, donorCount: 430, deadline: '2026-12-31', isActive: true, isCompleted: false, updates: [], createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-04-15T00:00:00Z' },
  { id: '3', title: 'Youth Scholarship Program', slug: 'youth-scholarship', description: 'Empowering the next generation through education. Sponsor a young person\'s education and change their future.', content: '<p>Education is a powerful tool for transformation. Our scholarship program helps deserving youth access quality education.</p>', category: 'Education', thumbnailUrl: '/images/projects/scholarship.jpg', goalAmount: 100000, raisedAmount: 67000, donorCount: 312, deadline: '2026-08-31', isActive: true, isCompleted: false, updates: [{ date: '2026-03-15', title: '20 Students Enrolled', description: 'Twenty deserving students have been enrolled this semester.' }], createdAt: '2025-09-01T00:00:00Z', updatedAt: '2026-03-15T00:00:00Z' },
  { id: '4', title: 'Musical Instruments Fund', slug: 'musical-instruments', description: 'Upgrading our worship team equipment to enhance our worship experience with quality instruments and sound.', content: '<p>Great worship deserves great instruments.</p>', category: 'Worship', thumbnailUrl: '/images/projects/instruments.jpg', goalAmount: 25000, raisedAmount: 25000, donorCount: 187, deadline: '2026-03-31', isActive: false, isCompleted: true, updates: [{ date: '2026-03-20', title: 'Goal Reached!', description: 'Thank you! All instruments have been purchased.' }], createdAt: '2025-10-01T00:00:00Z', updatedAt: '2026-03-20T00:00:00Z' },
  { id: '5', title: 'Church Van Ministry', slug: 'church-van', description: 'Purchasing a bus to transport members and support community outreach programs across the city.', content: '<p>A church van will enable us to reach more people and serve better.</p>', category: 'Transportation', thumbnailUrl: '/images/projects/van.jpg', goalAmount: 75000, raisedAmount: 42000, donorCount: 198, deadline: '2026-10-31', isActive: true, isCompleted: false, updates: [], createdAt: '2026-02-01T00:00:00Z', updatedAt: '2026-04-20T00:00:00Z' },
];

export const mockLivestreams: Livestream[] = [
  { id: '1', title: 'Sunday Worship Service (Live)', description: 'Join us live for our Sunday morning worship service.', date: '2026-05-25', time: '9:30 AM', platform: 'youtube', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnailUrl: '/images/livestream/sunday.jpg', isLive: true, isUpcoming: false, viewCount: 456, createdAt: '2026-05-25T00:00:00Z', updatedAt: '2026-05-25T00:00:00Z' },
  { id: '2', title: 'Wednesday Bible Study', description: 'Midweek Bible study with Apostle Gbogodor.', date: '2026-05-28', time: '6:00 PM', platform: 'youtube', embedUrl: '', thumbnailUrl: '/images/livestream/bible-study.jpg', isLive: false, isUpcoming: true, viewCount: 0, createdAt: '2026-05-20T00:00:00Z', updatedAt: '2026-05-20T00:00:00Z' },
  { id: '3', title: 'Friday Prayer & Worship Night', description: 'A powerful night of prayer and worship.', date: '2026-05-30', time: '6:00 PM', platform: 'facebook', embedUrl: '', thumbnailUrl: '/images/livestream/prayer-night.jpg', isLive: false, isUpcoming: true, viewCount: 0, createdAt: '2026-05-20T00:00:00Z', updatedAt: '2026-05-20T00:00:00Z' },
  { id: '4', title: 'Previous Sunday Service', description: 'Last week\'s Sunday morning worship service.', date: '2026-05-18', time: '9:30 AM', platform: 'youtube', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnailUrl: '/images/livestream/prev-1.jpg', isLive: false, isUpcoming: false, viewCount: 1234, createdAt: '2026-05-18T00:00:00Z', updatedAt: '2026-05-18T00:00:00Z' },
  { id: '5', title: 'Night of Worship — May 2026', description: 'Special worship night recording.', date: '2026-05-10', time: '7:00 PM', platform: 'youtube', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnailUrl: '/images/livestream/prev-2.jpg', isLive: false, isUpcoming: false, viewCount: 987, createdAt: '2026-05-10T00:00:00Z', updatedAt: '2026-05-10T00:00:00Z' },
];

export const mockPrayerRequests: PrayerRequest[] = [
  { id: '1', name: 'Sister Grace', request: 'Please pray for my mother who is undergoing surgery next week. We trust God for a successful operation and speedy recovery.', category: 'health', isAnonymous: false, prayerCount: 45, status: 'approved', date: '2026-05-23', createdAt: '2026-05-23T00:00:00Z', updatedAt: '2026-05-23T00:00:00Z' },
  { id: '2', name: 'Anonymous', request: 'I am struggling with my faith. Please pray for strength and renewed hope in my walk with God.', category: 'spiritual', isAnonymous: true, prayerCount: 67, status: 'approved', date: '2026-05-22', createdAt: '2026-05-22T00:00:00Z', updatedAt: '2026-05-22T00:00:00Z' },
  { id: '3', name: 'Brother Daniel', request: 'Praying for a breakthrough in my business. I have been trusting God for provision and new opportunities.', category: 'financial', isAnonymous: false, prayerCount: 32, status: 'approved', date: '2026-05-21', createdAt: '2026-05-21T00:00:00Z', updatedAt: '2026-05-21T00:00:00Z' },
  { id: '4', name: 'Mrs. Adjei', request: 'Please join me in prayer for my children\'s education and for God\'s guidance in their lives.', category: 'family', isAnonymous: false, prayerCount: 28, status: 'approved', date: '2026-05-20', createdAt: '2026-05-20T00:00:00Z', updatedAt: '2026-05-20T00:00:00Z' },
  { id: '5', name: 'Anonymous', request: 'Please pray for restoration in my marriage. We are going through a difficult season.', category: 'relationships', isAnonymous: true, prayerCount: 89, status: 'approved', date: '2026-05-19', createdAt: '2026-05-19T00:00:00Z', updatedAt: '2026-05-19T00:00:00Z' },
  { id: '6', name: 'Youth Leader Isaac', request: 'Praying for our upcoming youth camp. May God move powerfully and touch every young person who attends.', category: 'spiritual', isAnonymous: false, prayerCount: 54, status: 'approved', date: '2026-05-18', createdAt: '2026-05-18T00:00:00Z', updatedAt: '2026-05-18T00:00:00Z' },
  { id: '7', name: 'Sister Mary', request: 'Please pray for my upcoming job interview. I trust God for favor and open doors.', category: 'career', isAnonymous: false, prayerCount: 41, status: 'approved', date: '2026-05-17', createdAt: '2026-05-17T00:00:00Z', updatedAt: '2026-05-17T00:00:00Z' },
];

export const prayerCategories = [
  { value: 'all', label: 'All Requests' },
  { value: 'health', label: 'Health' },
  { value: 'family', label: 'Family' },
  { value: 'financial', label: 'Financial' },
  { value: 'spiritual', label: 'Spiritual' },
  { value: 'career', label: 'Career' },
  { value: 'relationships', label: 'Relationships' },
];

export const mockWeeklyActivities: WeeklyActivity[] = [
  { day: 'Sunday', activities: [
    { name: 'First Service', time: '7:00 AM - 9:00 AM', location: 'Main Auditorium', description: 'Our early morning worship service with praise, worship, and the Word.', leader: 'Apostle David Benson Gbogodor', category: 'Worship' },
    { name: 'Second Service', time: '9:30 AM - 12:00 PM', location: 'Main Auditorium', description: 'Our main Sunday worship service with full choir ministration.', leader: 'Apostle David Benson Gbogodor', category: 'Worship' },
    { name: "Children's Church", time: '9:30 AM - 12:00 PM', location: "Children's Wing", description: 'Fun, age-appropriate Bible lessons and activities for kids.', leader: 'Sister Mary Tetteh', category: 'Children' },
  ]},
  { day: 'Monday', activities: [
    { name: 'Church Office Hours', time: '9:00 AM - 5:00 PM', location: 'Church Office', description: 'The church office is open for inquiries, counseling, and administrative matters.', category: 'Administration' },
  ]},
  { day: 'Tuesday', activities: [
    { name: 'Home Cell Groups', time: '6:00 PM - 8:00 PM', location: 'Various Locations', description: 'Small group fellowship and Bible study in homes across the city.', category: 'Fellowship' },
    { name: 'Choir Rehearsal', time: '7:00 PM - 9:00 PM', location: 'Music Room', description: 'Preparation for Sunday worship ministration.', leader: 'Minister Grace Okafor', category: 'Worship' },
  ]},
  { day: 'Wednesday', activities: [
    { name: "Women's Prayer", time: '10:00 AM - 12:00 PM', location: 'Grace Room', description: 'A time of intercession and fellowship for the women of the church.', leader: 'Deaconess Esther Gbogodor', category: 'Prayer' },
    { name: 'Bible Study', time: '6:00 PM - 8:00 PM', location: 'Main Auditorium', description: 'In-depth study of the Scriptures with our Senior Pastor.', leader: 'Apostle David Benson Gbogodor', category: 'Study' },
  ]},
  { day: 'Thursday', activities: [
    { name: 'Counseling Sessions', time: 'By Appointment', location: 'Counseling Office', description: 'Confidential pastoral counseling for individuals and couples.', category: 'Counseling' },
    { name: 'Youth Band Practice', time: '5:00 PM - 7:00 PM', location: 'Youth Center', description: 'The youth worship band practicing for Friday service.', leader: 'Pastor Samuel Adeyemi', category: 'Youth' },
  ]},
  { day: 'Friday', activities: [
    { name: 'Prayer & Worship Night', time: '6:00 PM - 9:00 PM', location: 'Main Auditorium', description: 'A powerful evening of corporate prayer, worship, and the Word.', leader: 'Apostle David Benson Gbogodor', category: 'Prayer' },
    { name: 'Youth Service', time: '6:00 PM - 9:00 PM', location: 'Youth Center', description: 'Dynamic worship, relevant teaching, and fellowship for young people.', leader: 'Pastor Samuel Adeyemi', category: 'Youth' },
  ]},
  { day: 'Saturday', activities: [
    { name: "Men's Fellowship", time: '7:00 AM - 9:00 AM', location: 'Fellowship Hall', description: 'Brotherhood, accountability, and Bible study for men.', leader: 'Elder John Mensah', category: 'Fellowship' },
    { name: 'Community Outreach', time: '9:00 AM - 1:00 PM', location: 'Various Locations', description: 'Serving the community through evangelism, food drives, and acts of love.', leader: 'Deacon Peter Asante', category: 'Outreach' },
    { name: 'Worship Team Rehearsal', time: '4:00 PM - 6:00 PM', location: 'Main Auditorium', description: 'Full rehearsal for Sunday worship team.', leader: 'Minister Grace Okafor', category: 'Worship' },
  ]},
];
