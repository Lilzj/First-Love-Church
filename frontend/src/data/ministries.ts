import type { Ministry } from '../types/ministry';

export const mockMinistries: Ministry[] = [
  {
    id: '1',
    name: 'Youth Ministry',
    slug: 'youth-ministry',
    description: 'Empowering the next generation to live boldly for Christ through fellowship, discipleship, and service.',
    fullDescription: `
      <p>Our Youth Ministry is a vibrant community of young people ages 13-25 who are passionate about growing in their faith and making an impact in their world.</p>
      <p>We believe that young people are not just the church of tomorrow — they are the church of today. Through dynamic worship experiences, relevant Bible teaching, small group discussions, and community service projects, we equip our youth to stand firm in their faith and be agents of change in their generation.</p>
      <h3>What We Offer</h3>
      <ul>
        <li>Weekly Friday night youth services</li>
        <li>Small group Bible studies</li>
        <li>Annual youth camps and retreats</li>
        <li>Community service projects</li>
        <li>Leadership development programs</li>
        <li>Sports and recreational activities</li>
      </ul>
    `,
    mission: 'To raise a generation of young people who know God, love God, and serve God with their whole hearts.',
    leader: 'Pastor Samuel Adeyemi',
    leaderImage: '/images/team/youth-leader.jpg',
    leaderTitle: 'Youth Pastor',
    thumbnailUrl: '/images/ministries/youth.jpg',
    coverImage: '/images/ministries/youth-cover.jpg',
    icon: 'Zap',
    meetingDay: 'Friday',
    meetingTime: '6:00 PM',
    location: 'Youth Center',
    galleryImages: ['/images/ministries/youth-1.jpg', '/images/ministries/youth-2.jpg'],
    activities: ['Bible Study', 'Worship Night', 'Sports', 'Community Service', 'Leadership Training'],
    memberCount: 150,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Worship Ministry',
    slug: 'worship-ministry',
    description: 'Leading the congregation into the presence of God through anointed music and worship.',
    fullDescription: `
      <p>The Worship Ministry is the heartbeat of our church. We are a team of dedicated musicians, singers, and sound engineers who are committed to creating an atmosphere where God's presence is tangible.</p>
      <p>We believe worship is more than music — it's a lifestyle. Our team serves with excellence, humility, and a deep love for God.</p>
    `,
    mission: 'To create an atmosphere of worship that ushers people into the presence of God and transforms lives.',
    leader: 'Minister Grace Okafor',
    leaderImage: '/images/team/worship-leader.jpg',
    leaderTitle: 'Worship Director',
    thumbnailUrl: '/images/ministries/worship.jpg',
    coverImage: '/images/ministries/worship-cover.jpg',
    icon: 'Music',
    meetingDay: 'Saturday',
    meetingTime: '4:00 PM',
    location: 'Main Auditorium',
    galleryImages: ['/images/ministries/worship-1.jpg'],
    activities: ['Choir Rehearsal', 'Band Practice', 'Worship Nights', 'Music Workshops'],
    memberCount: 65,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: "Men's Ministry",
    slug: 'mens-ministry',
    description: 'Building strong men of faith through brotherhood, accountability, and Biblical teaching.',
    fullDescription: `
      <p>Our Men's Ministry is a place where men can be real, grow in their faith, and become the leaders God has called them to be — in their families, workplaces, and communities.</p>
    `,
    mission: "To equip men to be godly leaders in their homes, churches, and communities.",
    leader: 'Elder John Mensah',
    leaderImage: '/images/team/men-leader.jpg',
    leaderTitle: 'Men\'s Ministry Leader',
    thumbnailUrl: '/images/ministries/men.jpg',
    coverImage: '/images/ministries/men-cover.jpg',
    icon: 'Shield',
    meetingDay: 'Saturday',
    meetingTime: '7:00 AM',
    location: 'Fellowship Hall',
    galleryImages: [],
    activities: ['Men\'s Breakfast', 'Bible Study', 'Mentorship', 'Sports Fellowship', 'Community Projects'],
    memberCount: 85,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: "Women's Ministry",
    slug: 'womens-ministry',
    description: 'Nurturing women in faith, purpose, and sisterhood through the Word of God.',
    fullDescription: `
      <p>Our Women's Ministry is a safe space for women to grow, heal, and flourish. We believe every woman has a unique God-given purpose, and we are committed to helping each woman discover and walk in hers.</p>
    `,
    mission: "To empower women to discover their identity in Christ and fulfill their God-given purpose.",
    leader: 'Deaconess Esther Gbogodor',
    leaderImage: '/images/team/women-leader.jpg',
    leaderTitle: 'Women\'s Ministry Leader',
    thumbnailUrl: '/images/ministries/women.jpg',
    coverImage: '/images/ministries/women-cover.jpg',
    icon: 'Heart',
    meetingDay: 'Wednesday',
    meetingTime: '10:00 AM',
    location: 'Grace Room',
    galleryImages: [],
    activities: ['Women\'s Bible Study', 'Prayer Circle', 'Retreats', 'Mentorship', 'Outreach'],
    memberCount: 120,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: "Children's Ministry",
    slug: 'childrens-ministry',
    description: 'Teaching children the Word of God through fun, creative, and age-appropriate experiences.',
    fullDescription: `
      <p>We believe children are never too young to encounter God. Our Children's Ministry provides a safe, fun, and engaging environment where children can learn about Jesus, develop friendships, and grow in their faith.</p>
    `,
    mission: 'To plant seeds of faith in children that will grow into a lifelong relationship with Jesus Christ.',
    leader: 'Sister Mary Tetteh',
    leaderImage: '/images/team/children-leader.jpg',
    leaderTitle: 'Children\'s Ministry Director',
    thumbnailUrl: '/images/ministries/children.jpg',
    coverImage: '/images/ministries/children-cover.jpg',
    icon: 'Star',
    meetingDay: 'Sunday',
    meetingTime: '9:00 AM',
    location: 'Children\'s Wing',
    galleryImages: [],
    activities: ['Sunday School', 'Kids Worship', 'Bible Crafts', 'Vacation Bible School', 'Children\'s Choir'],
    memberCount: 95,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Outreach Ministry',
    slug: 'outreach-ministry',
    description: 'Extending the love of Christ beyond our walls through community service and evangelism.',
    fullDescription: `
      <p>The Outreach Ministry is the hands and feet of First Love Church in the community. We are committed to meeting the physical and spiritual needs of people, demonstrating the love of Christ through practical acts of service.</p>
    `,
    mission: 'To demonstrate the love of Christ by serving the poor, the marginalized, and the unreached in our community and beyond.',
    leader: 'Deacon Peter Asante',
    leaderImage: '/images/team/outreach-leader.jpg',
    leaderTitle: 'Outreach Coordinator',
    thumbnailUrl: '/images/ministries/outreach.jpg',
    coverImage: '/images/ministries/outreach-cover.jpg',
    icon: 'Globe',
    meetingDay: 'Saturday',
    meetingTime: '9:00 AM',
    location: 'Various Locations',
    galleryImages: [],
    activities: ['Food Drives', 'Hospital Visits', 'Prison Ministry', 'Street Evangelism', 'Community Clean-up'],
    memberCount: 70,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];
