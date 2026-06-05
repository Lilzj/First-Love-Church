import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Calendar, ArrowRight, Clock, MapPin } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { CTASection } from '@/components/sections/CTASection';
import { StatisticsCounter } from '@/components/sections/StatisticsCounter';
import { ScriptureBlock } from '@/components/sections/ScriptureBlock';
import { NewsletterSignup } from '@/components/sections/NewsletterSignup';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { SermonCard } from '@/components/cards/SermonCard';
import { EventCard } from '@/components/cards/EventCard';
import { MinistryCard } from '@/components/cards/MinistryCard';
import { mockSermons } from '@/data/sermons';
import { mockEvents } from '@/data/events';
import { mockMinistries } from '@/data/ministries';
import { mockTestimonials, churchStats, serviceTimes, dailyScripture } from '@/data/team';
import { PASTOR_NAME } from '@/utils/constants';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomePage = () => {
  const upcomingEvents = mockEvents.filter(e => e.isUpcoming).slice(0, 3);
  const latestSermons = mockSermons.slice(0, 3);
  const featuredMinistries = mockMinistries.slice(0, 6);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <HeroSection
        badge="Welcome to First Love Church"
        subtitle="Experience the Love of God"
        title="Where Every Heart Finds Home"
        description="Join a community of believers passionate about worship, the Word of God, and transforming lives through the power of His love. You belong here."
        primaryAction={{ label: 'Join Us This Sunday', href: '/contact', icon: <Calendar className="w-5 h-5" /> }}
        secondaryAction={{ label: 'Watch Sermons', href: '/sermons', icon: <Play className="w-5 h-5" /> }}
        fullHeight
      />

      {/* ==================== SERVICE TIMES ==================== */}
      <section className="section-padding section-glow" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="Join Us"
            title="Service Times"
            description="We gather together to worship, learn, and grow in faith. Everyone is welcome."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {serviceTimes.map((item) => (
              <motion.div
                key={item.day}
                variants={fadeUp}
                className="card-glass p-8 text-center group"
              >
                <div
                  className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}
                >
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
                  {item.day}
                </h3>
                <div className="space-y-2">
                  {item.services.map((service) => (
                    <div key={service.name}>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{service.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{service.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== PASTOR'S WELCOME ==================== */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="aspect-[4/5] rounded-2xl overflow-hidden relative"
                style={{ background: 'linear-gradient(160deg, #0f2447 0%, #1e3a8a 40%, #3b82f6 100%)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-heading font-bold text-white/[0.06]">✝</span>
                </div>
                {/* Subtle grid texture */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
              </div>
              {/* Gold accent corner */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10 opacity-80"
                style={{ background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600))' }} />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-accent text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: 'var(--color-primary-400)' }}>
                Welcome Message
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
                A Word from Our Pastor
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                "It gives me great joy to welcome you to First Love Church. This is more than a church — it is a family,
                a community of believers who are committed to loving God, loving people, and making a difference in the world."
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                "Whether you are seeking God for the first time, returning to faith, or looking for a church home,
                know that you are welcome here. We believe that God has a wonderful plan for your life, and we are here
                to walk with you on that journey."
              </p>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                  DG
                </div>
                <div>
                  <p className="font-heading font-semibold" style={{ color: 'var(--text-heading)' }}>{PASTOR_NAME}</p>
                  <p className="text-xs font-accent" style={{ color: 'var(--color-primary-400)' }}>Senior Pastor & Founder</p>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SCRIPTURE ==================== */}
      <ScriptureBlock
        verse={dailyScripture.verse}
        reference={dailyScripture.reference}
        version={dailyScripture.version}
      />

      {/* ==================== EVENTS ==================== */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="Upcoming Events"
            title="Join Us at Our Next Event"
            description="From conferences to community outreach, there's always something happening at First Love Church."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/events" className="btn btn-outline">
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== SERMONS ==================== */}
      <section className="section-padding section-glow section-grid-bg" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="Latest Sermons"
            title="Feed Your Spirit"
            description="Powerful messages that will strengthen your faith, inspire your soul, and transform your life."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {latestSermons.map((sermon, index) => (
              <SermonCard key={sermon.id} sermon={sermon} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/sermons" className="btn btn-outline">
              View All Sermons <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== MINISTRIES ==================== */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="Our Ministries"
            title="Find Your Place to Serve"
            description="God has gifted you uniquely. Discover where you can use your gifts and talents to serve His Kingdom."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredMinistries.map((ministry, index) => (
              <MinistryCard key={ministry.id} ministry={ministry} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/ministries" className="btn btn-outline">
              Explore All Ministries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== STATISTICS ==================== */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="By the Numbers"
            title="God's Faithfulness in Action"
          />
          <StatisticsCounter stats={churchStats} />
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section-padding section-glow" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="Testimonials"
            title="Stories of Transformation"
            description="Hear from real people whose lives have been changed by the power of God through First Love Church."
          />
          <TestimonialSlider testimonials={mockTestimonials} />
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <CTASection
        title="Join Us This Sunday"
        description="Experience a community where faith comes alive. Whether you're exploring faith or deepening your walk with God, you're welcome here."
        primaryAction={{ label: 'Plan Your Visit', href: '/contact', icon: <MapPin className="w-5 h-5" /> }}
        secondaryAction={{ label: 'Watch Online', href: '/sermons', icon: <Play className="w-5 h-5" /> }}
      />

      {/* ==================== NEWSLETTER ==================== */}
      <NewsletterSignup />
    </>
  );
};

export default HomePage;
