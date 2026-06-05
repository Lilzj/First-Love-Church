import type { TeamMember, Testimonial } from '../types/team';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Apostle David Benson Gbogodor',
    role: 'Lead Pastor',
    title: 'Senior Pastor & Founder',
    bio: 'Apostle David Benson Gbogodor is the founder and senior pastor of First Love Church. With over 25 years of ministry experience, he carries a burning passion for souls, a deep love for the Word of God, and an unwavering commitment to raising leaders who will transform nations. His prophetic ministry has touched thousands of lives across Africa, Europe, and the Americas. Under his leadership, First Love Church has grown from a small prayer group to a thriving, multi-campus ministry impacting communities worldwide.',
    imageUrl: '/images/team/pastor.jpg',
    socialLinks: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
    order: 1,
    isLeadPastor: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Pastor Rebecca Gbogodor',
    role: 'Co-Pastor',
    title: 'Co-Pastor & Women\'s Ministry Director',
    bio: 'Pastor Rebecca serves alongside her husband with a heart for women\'s empowerment and family restoration. Her warm, compassionate leadership has been instrumental in building a loving church community.',
    imageUrl: '/images/team/co-pastor.jpg',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
    order: 2,
    isLeadPastor: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Pastor Samuel Adeyemi',
    role: 'Youth Pastor',
    title: 'Youth & Young Adults Pastor',
    bio: 'Pastor Samuel brings energy, creativity, and a deep love for young people. He is passionate about raising a generation that will stand firm in faith and lead with purpose.',
    imageUrl: '/images/team/youth-pastor.jpg',
    socialLinks: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    order: 3,
    isLeadPastor: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Minister Grace Okafor',
    role: 'Worship Director',
    title: 'Director of Worship & Arts',
    bio: 'Minister Grace is an anointed worship leader with a gift for creating atmospheres where God\'s presence is tangible. She has been leading worship for over 15 years.',
    imageUrl: '/images/team/worship-director.jpg',
    socialLinks: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
    order: 4,
    isLeadPastor: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Elder John Mensah',
    role: 'Church Elder',
    title: 'Elder & Men\'s Ministry Leader',
    bio: 'Elder John is a pillar of the church with decades of faithful service. He is dedicated to mentoring men and building strong families within the congregation.',
    imageUrl: '/images/team/elder.jpg',
    socialLinks: {
      facebook: 'https://facebook.com',
    },
    order: 5,
    isLeadPastor: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Deacon Peter Asante',
    role: 'Outreach Coordinator',
    title: 'Deacon & Outreach Ministry Leader',
    bio: 'Deacon Peter has a heart for the community. He leads our outreach efforts, organizing food drives, hospital visits, and evangelism programs that bring hope to those in need.',
    imageUrl: '/images/team/deacon.jpg',
    socialLinks: {
      facebook: 'https://facebook.com',
    },
    order: 6,
    isLeadPastor: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sister Abigail Owusu',
    role: 'Church Member',
    imageUrl: '/images/testimonials/person-1.jpg',
    quote: 'First Love Church changed my life. When I walked through those doors broken and hopeless, I found a family that loved me unconditionally. Through the teachings of Apostle Gbogodor, I discovered my purpose and identity in Christ. Today, I am a living testimony of God\'s grace.',
    rating: 5,
    date: '2026-03-15',
    isFeatured: true,
    createdAt: '2026-03-15T00:00:00Z',
    updatedAt: '2026-03-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Brother Emmanuel Darko',
    role: 'Youth Leader',
    imageUrl: '/images/testimonials/person-2.jpg',
    quote: 'I joined the youth ministry as a troubled teenager. The love and mentorship I received here transformed me. Now I lead a small group and help other young people find their way to Christ. This church doesn\'t just preach — it practices what it preaches.',
    rating: 5,
    date: '2026-02-20',
    isFeatured: true,
    createdAt: '2026-02-20T00:00:00Z',
    updatedAt: '2026-02-20T00:00:00Z',
  },
  {
    id: '3',
    name: 'Mrs. Florence Adjei',
    role: 'Women\'s Ministry Member',
    imageUrl: '/images/testimonials/person-3.jpg',
    quote: 'After my divorce, I thought my life was over. But the Women\'s Ministry surrounded me with prayer, love, and practical support. God restored my joy and gave me a new beginning. I am forever grateful for this church family.',
    rating: 5,
    date: '2026-01-10',
    isFeatured: true,
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'Mr. Daniel Koffi',
    role: 'Business Owner',
    imageUrl: '/images/testimonials/person-4.jpg',
    quote: 'The financial stewardship teachings at First Love Church gave me a biblical foundation for managing my business. God has blessed my work beyond what I could imagine. I believe in tithing and giving because I have seen the faithfulness of God in return.',
    rating: 5,
    date: '2025-12-05',
    isFeatured: false,
    createdAt: '2025-12-05T00:00:00Z',
    updatedAt: '2025-12-05T00:00:00Z',
  },
  {
    id: '5',
    name: 'Sister Mercy Agyemang',
    role: 'Worship Team Member',
    imageUrl: '/images/testimonials/person-5.jpg',
    quote: 'Joining the worship team at First Love Church was the best decision I ever made. Not only has my musical gift flourished, but my relationship with God has deepened in ways I never thought possible. This is truly a place of encounter.',
    rating: 5,
    date: '2025-11-18',
    isFeatured: false,
    createdAt: '2025-11-18T00:00:00Z',
    updatedAt: '2025-11-18T00:00:00Z',
  },
  {
    id: '6',
    name: 'Brother Isaac Boateng',
    role: 'New Convert',
    imageUrl: '/images/testimonials/person-6.jpg',
    quote: 'I was an atheist for 20 years. A friend invited me to a Sunday service, and something happened in my heart that day. The message of God\'s love broke through every wall I had built. I gave my life to Christ that day and I have never looked back.',
    rating: 5,
    date: '2026-04-02',
    isFeatured: true,
    createdAt: '2026-04-02T00:00:00Z',
    updatedAt: '2026-04-02T00:00:00Z',
  },
];

export const churchStats = [
  { label: 'Church Members', value: 3500, icon: 'Users', suffix: '+' },
  { label: 'Years of Ministry', value: 25, icon: 'Calendar', suffix: '+' },
  { label: 'Weekly Services', value: 12, icon: 'Church', suffix: '' },
  { label: 'Active Ministries', value: 15, icon: 'Heart', suffix: '+' },
  { label: 'Nations Reached', value: 8, icon: 'Globe', suffix: '' },
  { label: 'Lives Transformed', value: 10000, icon: 'Sparkles', suffix: '+' },
];

export const serviceTimes = [
  {
    day: 'Sunday',
    services: [
      { name: 'First Service', time: '7:00 AM - 9:00 AM' },
      { name: 'Second Service', time: '9:30 AM - 12:00 PM' },
    ],
  },
  {
    day: 'Wednesday',
    services: [
      { name: 'Bible Study', time: '6:00 PM - 8:00 PM' },
    ],
  },
  {
    day: 'Friday',
    services: [
      { name: 'Prayer & Worship Night', time: '6:00 PM - 9:00 PM' },
    ],
  },
];

export const coreValues = [
  { title: 'Love', description: 'We are committed to loving God and loving people unconditionally, just as Christ loved us.', icon: 'Heart' },
  { title: 'Faith', description: 'We stand firm in faith, believing God for the impossible and trusting His Word in every season.', icon: 'Shield' },
  { title: 'Excellence', description: 'We pursue excellence in all that we do, honoring God with our best in worship, service, and ministry.', icon: 'Award' },
  { title: 'Community', description: 'We believe in the power of authentic community — doing life together and bearing one another\'s burdens.', icon: 'Users' },
  { title: 'Service', description: 'We are called to serve, not to be served. We extend the hands of Jesus to our community and beyond.', icon: 'HandHeart' },
  { title: 'Discipleship', description: 'We are committed to making disciples who make disciples, equipping believers to fulfill their God-given purpose.', icon: 'BookOpen' },
];

export const dailyScripture = {
  verse: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
  reference: 'John 3:16',
  version: 'NIV',
};

export const weeklySchedule = [
  { day: 'Sunday', activities: ['First Service (7:00 AM)', 'Second Service (9:30 AM)', 'Children\'s Church (9:30 AM)'] },
  { day: 'Monday', activities: ['Church Office Hours (9:00 AM - 5:00 PM)'] },
  { day: 'Tuesday', activities: ['Home Cell Groups (6:00 PM)', 'Choir Rehearsal (7:00 PM)'] },
  { day: 'Wednesday', activities: ['Bible Study (6:00 PM)', 'Women\'s Prayer (10:00 AM)'] },
  { day: 'Thursday', activities: ['Counseling Sessions (By Appointment)', 'Youth Band Practice (5:00 PM)'] },
  { day: 'Friday', activities: ['Prayer & Worship Night (6:00 PM)', 'Youth Service (6:00 PM)'] },
  { day: 'Saturday', activities: ['Men\'s Fellowship (7:00 AM)', 'Worship Team Rehearsal (4:00 PM)', 'Outreach (9:00 AM)'] },
];
