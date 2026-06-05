import type { Sermon } from '../types/sermon';

export const mockSermons: Sermon[] = [
  {
    id: '1',
    title: 'Walking in the Fullness of God\'s Love',
    slug: 'walking-in-fullness-of-gods-love',
    description: 'Discover how to experience and walk in the complete, unconditional love of God that transforms every area of your life.',
    content: `
      <p>Today, I want to talk about something that is at the very core of our faith — the love of God. Not just a surface-level understanding, but a deep, transformative experience of His love that changes everything about who we are and how we live.</p>
      
      <h3>The Foundation of Love</h3>
      <p>In 1 John 4:8, the Bible tells us that "God is love." This isn't just a characteristic of God — it's His very nature. When we understand this truth, it revolutionizes our relationship with Him and with others.</p>
      
      <p>Many of us have been walking through life with a limited understanding of God's love. We know He loves us intellectually, but we haven't allowed that love to penetrate the deepest parts of our hearts.</p>
      
      <h3>Three Dimensions of God's Love</h3>
      <p>The Apostle Paul prayed in Ephesians 3:17-19 that we would be able to comprehend the width, length, depth, and height of the love of Christ. Let's explore three key dimensions:</p>
      
      <ol>
        <li><strong>Unconditional Love</strong> — God's love is not based on our performance. It's not something we earn. It's a gift freely given.</li>
        <li><strong>Sacrificial Love</strong> — "Greater love has no one than this: to lay down one's life for one's friends." (John 15:13)</li>
        <li><strong>Transformative Love</strong> — When we truly encounter God's love, we are changed from the inside out.</li>
      </ol>
      
      <h3>Walking It Out</h3>
      <p>Walking in the fullness of God's love requires daily surrender. It means choosing love in every situation, even when it's difficult. It means extending grace to others just as God has extended grace to us.</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-05-18',
    duration: '45 min',
    category: 'love',
    tags: ['love', 'faith', 'transformation', 'grace'],
    thumbnailUrl: '/images/sermons/sermon-1.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioUrl: '/audio/sermon-1.mp3',
    scriptureReferences: [
      { book: '1 John', chapter: 4, verseStart: 8, text: 'Whoever does not love does not know God, because God is love.' },
      { book: 'Ephesians', chapter: 3, verseStart: 17, verseEnd: 19, text: 'And I pray that you, being rooted and established in love, may have power, together with all the Lord\'s holy people, to grasp how wide and long and high and deep is the love of Christ.' },
      { book: 'John', chapter: 15, verseStart: 13, text: 'Greater love has no one than this: to lay down one\'s life for one\'s friends.' },
    ],
    isFeatured: true,
    viewCount: 1234,
    likeCount: 342,
    createdAt: '2026-05-18T10:00:00Z',
    updatedAt: '2026-05-18T10:00:00Z',
  },
  {
    id: '2',
    title: 'The Power of Persistent Prayer',
    slug: 'power-of-persistent-prayer',
    description: 'Learn how persistent, faith-filled prayer moves mountains and unlocks the supernatural in your daily life.',
    content: `
      <p>Prayer is the lifeline of every believer. It's not just a religious ritual — it's a powerful, dynamic conversation with the Creator of the universe.</p>
      
      <h3>Why Persistence Matters</h3>
      <p>In Luke 18:1, Jesus told His disciples a parable to show them that they should always pray and not give up. The parable of the persistent widow teaches us a profound truth about the nature of prayer.</p>
      
      <p>God doesn't delay to frustrate us. He delays to develop us. Every moment of waiting is a moment of growth, of building faith muscles that we'll need for the next season of our lives.</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-05-11',
    duration: '52 min',
    category: 'prayer',
    tags: ['prayer', 'persistence', 'faith', 'breakthrough'],
    thumbnailUrl: '/images/sermons/sermon-2.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    scriptureReferences: [
      { book: 'Luke', chapter: 18, verseStart: 1, text: 'Then Jesus told his disciples a parable to show them that they should always pray and not give up.' },
      { book: 'James', chapter: 5, verseStart: 16, text: 'The prayer of a righteous person is powerful and effective.' },
    ],
    isFeatured: false,
    viewCount: 987,
    likeCount: 276,
    createdAt: '2026-05-11T10:00:00Z',
    updatedAt: '2026-05-11T10:00:00Z',
  },
  {
    id: '3',
    title: 'Foundations of Faith: Building on the Rock',
    slug: 'foundations-of-faith',
    description: 'Jesus taught us to build our lives on the solid rock of His Word. Discover how to establish unshakeable foundations.',
    content: `
      <p>In Matthew 7:24-27, Jesus gives us one of the most practical teachings in all of Scripture — the parable of the wise and foolish builders.</p>
      
      <h3>The Wise Builder</h3>
      <p>The wise man built his house on the rock. When the rains came down, the streams rose, and the winds blew and beat against that house, it did not fall because it had its foundation on the rock.</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-05-04',
    duration: '48 min',
    category: 'faith',
    tags: ['faith', 'foundation', 'word of God', 'strength'],
    thumbnailUrl: '/images/sermons/sermon-3.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    scriptureReferences: [
      { book: 'Matthew', chapter: 7, verseStart: 24, verseEnd: 27, text: 'Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock.' },
    ],
    isFeatured: false,
    viewCount: 856,
    likeCount: 201,
    createdAt: '2026-05-04T10:00:00Z',
    updatedAt: '2026-05-04T10:00:00Z',
  },
  {
    id: '4',
    title: 'Anointed for Purpose: Discovering Your Calling',
    slug: 'anointed-for-purpose',
    description: 'God has placed a unique calling on your life. Learn how to discover, develop, and deploy your God-given purpose.',
    content: `
      <p>Before you were formed in your mother's womb, God knew you. He set you apart and appointed you for a specific purpose. Your life is not an accident — it's a divine assignment.</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-04-27',
    duration: '55 min',
    category: 'leadership',
    tags: ['purpose', 'calling', 'anointing', 'destiny'],
    thumbnailUrl: '/images/sermons/sermon-4.jpg',
    audioUrl: '/audio/sermon-4.mp3',
    scriptureReferences: [
      { book: 'Jeremiah', chapter: 1, verseStart: 5, text: 'Before I formed you in the womb I knew you, before you were born I set you apart.' },
      { book: 'Ephesians', chapter: 2, verseStart: 10, text: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.' },
    ],
    isFeatured: false,
    viewCount: 1102,
    likeCount: 315,
    createdAt: '2026-04-27T10:00:00Z',
    updatedAt: '2026-04-27T10:00:00Z',
  },
  {
    id: '5',
    title: 'The Holy Spirit: Your Helper and Guide',
    slug: 'holy-spirit-helper-guide',
    description: 'Explore the person and work of the Holy Spirit and how to cultivate a deeper relationship with Him.',
    content: `
      <p>The Holy Spirit is not just a force or an influence — He is a Person. He is the Third Person of the Trinity, and He desires to have an intimate relationship with you.</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-04-20',
    duration: '50 min',
    category: 'holy-spirit',
    tags: ['holy spirit', 'guidance', 'power', 'intimacy'],
    thumbnailUrl: '/images/sermons/sermon-5.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioUrl: '/audio/sermon-5.mp3',
    scriptureReferences: [
      { book: 'John', chapter: 14, verseStart: 26, text: 'But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things.' },
      { book: 'Acts', chapter: 1, verseStart: 8, text: 'But you will receive power when the Holy Spirit comes on you.' },
    ],
    isFeatured: false,
    viewCount: 765,
    likeCount: 198,
    createdAt: '2026-04-20T10:00:00Z',
    updatedAt: '2026-04-20T10:00:00Z',
  },
  {
    id: '6',
    title: 'Breaking Every Chain: Freedom in Christ',
    slug: 'breaking-every-chain',
    description: 'Christ came to set the captives free. Learn how to break free from every chain that has been holding you back.',
    content: `
      <p>In Galatians 5:1, Paul declares, "It is for freedom that Christ has set us free." You were not created to live in bondage — you were created to live in freedom.</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-04-13',
    duration: '47 min',
    category: 'salvation',
    tags: ['freedom', 'deliverance', 'chains', 'breakthrough'],
    thumbnailUrl: '/images/sermons/sermon-6.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    scriptureReferences: [
      { book: 'Galatians', chapter: 5, verseStart: 1, text: 'It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.' },
      { book: 'John', chapter: 8, verseStart: 36, text: 'So if the Son sets you free, you will be free indeed.' },
    ],
    isFeatured: false,
    viewCount: 921,
    likeCount: 287,
    createdAt: '2026-04-13T10:00:00Z',
    updatedAt: '2026-04-13T10:00:00Z',
  },
  {
    id: '7',
    title: 'Divine Healing: God\'s Promise for Your Body',
    slug: 'divine-healing',
    description: 'By His stripes we are healed. Discover the biblical foundation for divine healing and how to receive it.',
    content: `
      <p>Healing is not just a doctrine — it's a promise. Isaiah 53:5 tells us, "By his wounds we are healed." God's will for your life includes wholeness in every area — spirit, soul, and body.</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-04-06',
    duration: '42 min',
    category: 'healing',
    tags: ['healing', 'faith', 'miracles', 'wholeness'],
    thumbnailUrl: '/images/sermons/sermon-7.jpg',
    audioUrl: '/audio/sermon-7.mp3',
    scriptureReferences: [
      { book: 'Isaiah', chapter: 53, verseStart: 5, text: 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.' },
      { book: '3 John', chapter: 1, verseStart: 2, text: 'Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.' },
    ],
    isFeatured: false,
    viewCount: 678,
    likeCount: 189,
    createdAt: '2026-04-06T10:00:00Z',
    updatedAt: '2026-04-06T10:00:00Z',
  },
  {
    id: '8',
    title: 'Worship: The Gateway to His Presence',
    slug: 'worship-gateway-presence',
    description: 'True worship opens the door to God\'s manifest presence. Learn how to become a true worshiper.',
    content: `
      <p>In John 4:23, Jesus said, "Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks."</p>
    `,
    preacher: 'Apostle David Benson Gbogodor',
    preacherImage: '/images/pastor.jpg',
    date: '2026-03-30',
    duration: '44 min',
    category: 'worship',
    tags: ['worship', 'presence', 'praise', 'encounter'],
    thumbnailUrl: '/images/sermons/sermon-8.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    scriptureReferences: [
      { book: 'John', chapter: 4, verseStart: 23, text: 'Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth.' },
      { book: 'Psalm', chapter: 100, verseStart: 4, text: 'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.' },
    ],
    isFeatured: false,
    viewCount: 845,
    likeCount: 234,
    createdAt: '2026-03-30T10:00:00Z',
    updatedAt: '2026-03-30T10:00:00Z',
  },
];

export const sermonCategories = [
  { value: 'all', label: 'All Sermons' },
  { value: 'faith', label: 'Faith' },
  { value: 'love', label: 'Love' },
  { value: 'prayer', label: 'Prayer' },
  { value: 'worship', label: 'Worship' },
  { value: 'family', label: 'Family' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'healing', label: 'Healing' },
  { value: 'prophecy', label: 'Prophecy' },
  { value: 'salvation', label: 'Salvation' },
  { value: 'holy-spirit', label: 'Holy Spirit' },
];
