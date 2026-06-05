import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { mockMinistries } from '@/data/ministries';

const MinistryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const ministry = mockMinistries.find(m => m.slug === slug);

  if (!ministry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Ministry Not Found</h2>
          <Link to="/ministries" className="btn btn-primary">Back to Ministries</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        badge={ministry.name}
        subtitle="Ministry"
        title={ministry.name}
        description={ministry.description}
        primaryAction={{ label: 'Join This Ministry', href: '/contact' }}
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <Link to="/ministries" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[var(--color-primary-500)]"
            style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft className="w-4 h-4" />Back to Ministries
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>About This Ministry</h2>
                <div className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{ __html: ministry.fullDescription }} />

                <h3 className="font-heading text-xl font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Our Mission</h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>{ministry.mission}</p>

                <h3 className="font-heading text-xl font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Activities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {ministry.activities.map((activity) => (
                    <div key={activity} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                      <CheckCircle className="w-4 h-4 text-[var(--color-primary-500)] flex-shrink-0" />
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{activity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Ministry Info</h3>
                <div className="space-y-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[var(--color-primary-500)]" />
                    <span>{ministry.meetingDay}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[var(--color-primary-500)]" />
                    <span>{ministry.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[var(--color-primary-500)]" />
                    <span>{ministry.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[var(--color-primary-500)]" />
                    <span>{ministry.memberCount} members</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Ministry Leader</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {ministry.leader.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>{ministry.leader}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{ministry.leaderTitle}</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary w-full">
                Join This Ministry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Make a Difference?"
        description="Join our ministry team and use your gifts to serve God and bless others."
        primaryAction={{ label: 'Get Connected', href: '/contact' }}
        variant="primary"
      />
    </>
  );
};

export default MinistryDetailPage;
