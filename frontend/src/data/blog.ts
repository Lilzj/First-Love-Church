import type { BlogPost, BlogComment } from '../types/blog';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Ways to Strengthen Your Prayer Life Today',
    slug: '5-ways-to-strengthen-your-prayer-life',
    excerpt: 'Prayer is the lifeline of every believer. Discover practical, powerful ways to transform your prayer life and draw closer to God.',
    content: `
      <p>Prayer is not just a religious activity — it is the very breath of the Christian life. It's how we communicate with our Heavenly Father, pour out our hearts, and receive His direction for our lives.</p>
      
      <p>Yet, many believers struggle to maintain a consistent and vibrant prayer life. If you find yourself in this place, know that you are not alone, and God wants to help you grow in this area.</p>

      <h3>1. Set a Specific Time and Place</h3>
      <p>Jesus had a habit of withdrawing to lonely places to pray (Luke 5:16). Create a dedicated prayer space and time in your day. Consistency breeds depth.</p>

      <h3>2. Use Scripture as Your Foundation</h3>
      <p>Let the Word of God fuel your prayers. Praying Scripture back to God is one of the most powerful forms of prayer. It aligns your heart with His will and fills your mouth with His promises.</p>

      <h3>3. Keep a Prayer Journal</h3>
      <p>Writing down your prayers helps you stay focused and track God's faithfulness. Looking back at answered prayers will strengthen your faith for future requests.</p>

      <h3>4. Pray with Others</h3>
      <p>There's power in corporate prayer. Jesus said, "Where two or three gather in my name, there am I with them" (Matthew 18:20). Join a prayer group or find a prayer partner.</p>

      <h3>5. Worship Before You Pray</h3>
      <p>Worship opens the door to God's presence. Before you bring your requests, spend time praising and thanking God for who He is. This shifts your focus from your problems to His power.</p>

      <blockquote>"The prayer of a righteous person is powerful and effective." — James 5:16</blockquote>

      <p>Remember, prayer is not about perfection — it's about connection. God is more interested in your heart than your words. Start where you are, and watch Him transform your prayer life.</p>
    `,
    author: 'Apostle David Benson Gbogodor',
    authorImage: '/images/team/pastor.jpg',
    authorBio: 'Senior Pastor & Founder of First Love Church',
    date: '2026-05-20',
    category: 'prayer',
    tags: ['prayer', 'devotional', 'spiritual growth', 'discipline'],
    thumbnailUrl: '/images/blog/prayer.jpg',
    readTime: '5 min read',
    isFeatured: true,
    viewCount: 2340,
    commentCount: 18,
    createdAt: '2026-05-20T10:00:00Z',
    updatedAt: '2026-05-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Building a God-Centered Marriage',
    slug: 'building-god-centered-marriage',
    excerpt: 'A strong marriage begins with a strong foundation. Learn how to put God at the center of your relationship.',
    content: `<p>Marriage is a sacred covenant designed by God. When we place Him at the center, our relationships flourish in ways we never imagined possible.</p><h3>The Foundation</h3><p>Every lasting marriage is built on the rock of God's Word. When storms come — and they will — couples who are rooted in faith stand firm together.</p>`,
    author: 'Pastor Rebecca Gbogodor',
    authorImage: '/images/team/co-pastor.jpg',
    authorBio: 'Co-Pastor & Women\'s Ministry Director',
    date: '2026-05-15',
    category: 'family',
    tags: ['marriage', 'family', 'relationships', 'love'],
    thumbnailUrl: '/images/blog/marriage.jpg',
    readTime: '7 min read',
    isFeatured: false,
    viewCount: 1856,
    commentCount: 24,
    createdAt: '2026-05-15T10:00:00Z',
    updatedAt: '2026-05-15T10:00:00Z',
  },
  {
    id: '3',
    title: 'Walking in Faith During Uncertain Times',
    slug: 'walking-in-faith-uncertain-times',
    excerpt: 'When the world around us shakes, our faith in God remains our anchor. Here\'s how to stand firm.',
    content: `<p>Life is full of uncertainties, but our God is unchanging. In times of turmoil, our faith is not just tested — it is refined like gold in a furnace.</p>`,
    author: 'Apostle David Benson Gbogodor',
    authorImage: '/images/team/pastor.jpg',
    authorBio: 'Senior Pastor & Founder',
    date: '2026-05-10',
    category: 'faith',
    tags: ['faith', 'trust', 'perseverance', 'hope'],
    thumbnailUrl: '/images/blog/faith.jpg',
    readTime: '6 min read',
    isFeatured: true,
    viewCount: 3120,
    commentCount: 31,
    createdAt: '2026-05-10T10:00:00Z',
    updatedAt: '2026-05-10T10:00:00Z',
  },
  {
    id: '4',
    title: 'The Power of Daily Devotion',
    slug: 'power-of-daily-devotion',
    excerpt: 'Starting your day with God sets the tone for everything else. Discover the transformative power of daily devotionals.',
    content: `<p>A daily devotional time is one of the most important habits a believer can develop. It's in those quiet moments with God that we receive strength, wisdom, and direction for our day.</p>`,
    author: 'Minister Grace Okafor',
    authorImage: '/images/team/worship-director.jpg',
    authorBio: 'Director of Worship & Arts',
    date: '2026-05-05',
    category: 'devotional',
    tags: ['devotion', 'bible study', 'morning routine', 'discipline'],
    thumbnailUrl: '/images/blog/devotion.jpg',
    readTime: '4 min read',
    isFeatured: false,
    viewCount: 1543,
    commentCount: 12,
    createdAt: '2026-05-05T10:00:00Z',
    updatedAt: '2026-05-05T10:00:00Z',
  },
  {
    id: '5',
    title: 'Raising Children in the Fear of the Lord',
    slug: 'raising-children-in-faith',
    excerpt: 'Practical wisdom for Christian parents who want to raise godly children in an increasingly challenging world.',
    content: `<p>Proverbs 22:6 tells us, "Train up a child in the way he should go; even when he is old he will not depart from it." This is both a promise and a responsibility.</p>`,
    author: 'Pastor Rebecca Gbogodor',
    authorImage: '/images/team/co-pastor.jpg',
    authorBio: 'Co-Pastor',
    date: '2026-04-28',
    category: 'family',
    tags: ['parenting', 'children', 'family', 'discipline'],
    thumbnailUrl: '/images/blog/parenting.jpg',
    readTime: '8 min read',
    isFeatured: false,
    viewCount: 2100,
    commentCount: 19,
    createdAt: '2026-04-28T10:00:00Z',
    updatedAt: '2026-04-28T10:00:00Z',
  },
  {
    id: '6',
    title: 'Leading with Integrity: Lessons from the Bible',
    slug: 'leading-with-integrity',
    excerpt: 'Biblical leadership is rooted in character, not position. Explore timeless principles for godly leadership.',
    content: `<p>In a world that often measures leadership by power and influence, God measures it by character and faithfulness. The Bible is filled with examples of leaders who led with integrity — and those who didn't.</p>`,
    author: 'Elder John Mensah',
    authorImage: '/images/team/elder.jpg',
    authorBio: 'Elder & Men\'s Ministry Leader',
    date: '2026-04-20',
    category: 'leadership',
    tags: ['leadership', 'integrity', 'character', 'bible study'],
    thumbnailUrl: '/images/blog/leadership.jpg',
    readTime: '6 min read',
    isFeatured: false,
    viewCount: 987,
    commentCount: 8,
    createdAt: '2026-04-20T10:00:00Z',
    updatedAt: '2026-04-20T10:00:00Z',
  },
  {
    id: '7',
    title: 'From Darkness to Light: My Testimony',
    slug: 'from-darkness-to-light',
    excerpt: 'A powerful testimony of how God\'s grace rescued one man from addiction and gave him a brand new life.',
    content: `<p>My name is Emmanuel, and I want to tell you what God has done in my life. For 15 years, I was trapped in a cycle of addiction that destroyed everything I touched — my career, my family, my health. But God...</p>`,
    author: 'Brother Emmanuel Darko',
    authorImage: '/images/testimonials/person-2.jpg',
    authorBio: 'Youth Leader at First Love Church',
    date: '2026-04-12',
    category: 'testimony',
    tags: ['testimony', 'transformation', 'grace', 'hope'],
    thumbnailUrl: '/images/blog/testimony.jpg',
    readTime: '10 min read',
    isFeatured: false,
    viewCount: 4560,
    commentCount: 42,
    createdAt: '2026-04-12T10:00:00Z',
    updatedAt: '2026-04-12T10:00:00Z',
  },
  {
    id: '8',
    title: 'Understanding the Gift of Worship',
    slug: 'understanding-gift-of-worship',
    excerpt: 'Worship is more than singing — it\'s a lifestyle. Discover the depth and beauty of true worship.',
    content: `<p>When many people hear the word "worship," they immediately think of singing songs in church. While that is certainly a beautiful expression of worship, it's only one facet of a much larger diamond.</p>`,
    author: 'Minister Grace Okafor',
    authorImage: '/images/team/worship-director.jpg',
    authorBio: 'Director of Worship & Arts',
    date: '2026-04-05',
    category: 'christian-living',
    tags: ['worship', 'lifestyle', 'praise', 'encounter'],
    thumbnailUrl: '/images/blog/worship.jpg',
    readTime: '5 min read',
    isFeatured: false,
    viewCount: 1234,
    commentCount: 15,
    createdAt: '2026-04-05T10:00:00Z',
    updatedAt: '2026-04-05T10:00:00Z',
  },
];

export const mockBlogComments: BlogComment[] = [
  { id: '1', postId: '1', author: 'Sister Abigail', authorImage: '', content: 'This article blessed me so much! I\'ve been struggling with my prayer life and tip #3 about the prayer journal really resonated.', date: '2026-05-21', likes: 12 },
  { id: '2', postId: '1', author: 'Brother James', authorImage: '', content: 'Thank you, Pastor. Worship before prayer has transformed my mornings. God is faithful!', date: '2026-05-22', likes: 8 },
  { id: '3', postId: '1', author: 'Deaconess Esther', authorImage: '', content: 'I shared this with my women\'s group. We are all committing to strengthening our prayer lives this month!', date: '2026-05-23', likes: 15 },
];

export const blogCategories = [
  { value: 'all', label: 'All Articles' },
  { value: 'devotional', label: 'Devotional' },
  { value: 'faith', label: 'Faith' },
  { value: 'family', label: 'Family' },
  { value: 'prayer', label: 'Prayer' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'testimony', label: 'Testimony' },
  { value: 'christian-living', label: 'Christian Living' },
];
