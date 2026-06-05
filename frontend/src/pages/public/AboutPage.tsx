import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Target, BookOpen, Users, Shield, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { CTASection } from '@/components/sections/CTASection';
import { TeamMemberCard } from '@/components/cards/TeamMemberCard';
import { mockTeamMembers, coreValues } from '@/data/team';
import { PASTOR_NAME, CHURCH_NAME } from '@/utils/constants';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { Heart, Shield, Award, Users, BookOpen, Target };

const timelineEvents = [
  { year: '2001', title: 'A Seed is Planted', description: 'Apostle David Benson Gbogodor starts a small prayer group with 7 members in a living room.' },
  { year: '2004', title: 'First Official Service', description: 'First Love Church holds its first official Sunday service with 50 members.' },
  { year: '2008', title: 'Building Dedication', description: 'The church dedicates its first permanent worship facility, a 500-seat auditorium.' },
  { year: '2012', title: 'Media Ministry Launch', description: 'Launch of online ministry, reaching thousands through sermons and teachings.' },
  { year: '2016', title: 'Community Impact', description: 'First Love Church establishes community outreach programs serving over 2,000 families.' },
  { year: '2020', title: 'Digital Expansion', description: 'Full digital services launched during global challenges, reaching believers across nations.' },
  { year: '2024', title: 'New Horizons', description: 'Church expands with new campuses and a vision to reach 10,000 people globally.' },
];

const beliefs = [
  'We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit.',
  'We believe in the deity, virgin birth, sinless life, atoning death, bodily resurrection, and ascension of the Lord Jesus Christ.',
  'We believe the Bible is the inspired, infallible, and authoritative Word of God.',
  'We believe in salvation by grace through faith in Jesus Christ alone.',
  'We believe in the present ministry of the Holy Spirit, by whom Christians are empowered to live a godly life.',
  'We believe in the spiritual unity of all believers in the Lord Jesus Christ.',
  'We believe in the personal return of Jesus Christ and the resurrection of both the saved and the lost.',
  'We believe in water baptism by immersion and the Lord\'s Supper as ordinances of the church.',
];

const AboutPage = () => {
  const leadPastor = mockTeamMembers.find(m => m.isLeadPastor);

  return (
    <>
      {/* Hero */}
      <HeroSection
        badge="About Us"
        subtitle="Our Story"
        title={`Welcome to ${CHURCH_NAME}`}
        description="For over two decades, we have been a beacon of hope, a house of worship, and a family of faith. Discover our story, our mission, and the hearts behind this ministry."
        primaryAction={{ label: 'Meet Our Pastor', href: '#pastor' }}
      />

      {/* Mission & Vision */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="Our Purpose" title="Mission & Vision" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-glass p-8 text-center"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-5">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
                Our Mission
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                To lead people into a life-changing relationship with Jesus Christ through worship, discipleship, 
                fellowship, and service — transforming families, communities, and nations for the glory of God.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-glass p-8 text-center"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-700))' }}
              >
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
                Our Vision
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                To be a global ministry that raises disciples who love God passionately, serve selflessly, 
                and shine as lights in their world — building a church that impacts every sphere of society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="What We Stand For" title="Our Core Values" description="These values are the foundation of everything we do at First Love Church." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const Icon = iconMap[value.icon] || Heart;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(59, 130, 246, 0.1)' }}
                  >
                    <Icon className="w-6 h-6 text-[var(--color-primary-500)]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Church History Timeline */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="Our Journey" title="Church History" description="From humble beginnings to a thriving ministry, God has been faithful every step of the way." />

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5" style={{ background: 'var(--border-color)' }} />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 mb-10 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''} pl-14 md:pl-0`}>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-accent font-bold mb-2"
                    style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary-500)' }}>
                    {event.year}
                  </span>
                  <h4 className="font-heading text-lg font-semibold mb-1" style={{ color: 'var(--text-heading)' }}>
                    {event.title}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 z-10"
                  style={{ borderColor: 'var(--color-primary-500)', background: 'var(--bg-primary)' }}
                />

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Pastor */}
      <section id="pastor" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-heading font-bold text-white/10">DG</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-accent text-xs tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: 'var(--color-gold-500)' }}>
                Senior Pastor & Founder
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
                {PASTOR_NAME}
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {leadPastor?.bio}
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                His vision is to raise a generation of believers who walk in the fullness of God's love and power, 
                impacting every sphere of society with the Gospel of Jesus Christ.
              </p>
              <Link to="/sermons" className="btn btn-primary">
                Listen to His Sermons <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="Leadership" title="Meet Our Team" description="Dedicated men and women who serve with love, integrity, and excellence." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTeamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="Our Doctrine" title="What We Believe" description="We hold to the foundational truths of the Christian faith as revealed in the Holy Scriptures." />

          <div className="max-w-3xl mx-auto space-y-4">
            {beliefs.map((belief, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-xl transition-colors duration-200"
                style={{ background: 'var(--bg-card)' }}
              >
                <CheckCircle className="w-5 h-5 text-[var(--color-primary-500)] flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {belief}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Come Worship With Us"
        description="We would love to meet you and welcome you into our church family. Your first visit will be an experience you'll never forget."
        primaryAction={{ label: 'Plan Your Visit', href: '/contact' }}
        secondaryAction={{ label: 'Watch Online', href: '/sermons' }}
        variant="spiritual"
      />
    </>
  );
};

export default AboutPage;
