import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, TrendingUp, DollarSign, Gift, CheckCircle } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { CTASection } from '@/components/sections/CTASection';
import { mockProjects } from '@/data/gallery';

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const activeProjects = mockProjects.filter(p => p.isActive && !p.isCompleted);
  const completedProjects = mockProjects.filter(p => p.isCompleted);
  const displayedProjects = activeTab === 'active' ? activeProjects : completedProjects;

  const totalRaised = mockProjects.reduce((sum, p) => sum + p.raisedAmount, 0);

  const totalDonors = mockProjects.reduce((sum, p) => sum + p.donorCount, 0);

  return (
    <>
      <HeroSection
        badge="Give"
        subtitle="Sow into the Kingdom"
        title="Support Our Mission"
        description="Your generous giving helps us build God's Kingdom, serve our community, and transform lives. Every gift makes an eternal difference."
        primaryAction={{ label: 'Give Now', href: '#projects', icon: <Heart className="w-5 h-5" /> }}
      />

      {/* Giving Impact Stats */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="Our Impact" title="Together We Make a Difference" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: DollarSign, value: `$${(totalRaised / 1000).toFixed(0)}K`, label: 'Total Raised' },
              { icon: Users, value: totalDonors.toLocaleString(), label: 'Total Donors' },
              { icon: Target, value: mockProjects.length.toString(), label: 'Projects' },
            ].map(({ icon: Icon, value, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center card-glass p-6"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary mx-auto mb-3 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-heading text-3xl font-bold mb-1" style={{ color: 'var(--text-heading)' }}>{value}</p>
                <p className="text-xs font-accent" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="Ways to Give" title="How You Can Contribute" description="We offer multiple convenient ways for you to sow into the Kingdom." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: DollarSign, title: 'Online Giving', desc: 'Give securely online via bank transfer, mobile money, or credit card.' },
              { icon: Gift, title: 'In-Person', desc: 'Give during our Sunday services or drop off your donation at the church office.' },
              { icon: TrendingUp, title: 'Monthly Partnership', desc: 'Become a monthly partner and sustain ongoing ministry programs.' },
            ].map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card p-6 text-center group hover:shadow-[var(--shadow-glow)]"
              >
                <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                  <Icon className="w-7 h-7 text-[var(--color-primary-500)]" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>{title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container">
          <SectionHeading subtitle="Our Projects" title="Support a Cause" description="Choose a project close to your heart and make an impact." />

          {/* Tabs */}
          <div className="flex justify-center gap-1 mb-10">
            {(['active', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-full text-sm font-accent font-medium transition-all duration-300 capitalize"
                style={{
                  background: activeTab === tab ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                  color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                }}
              >
                {tab} Projects ({tab === 'active' ? activeProjects.length : completedProjects.length})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedProjects.map((project, index) => {
              const progress = Math.round((project.raisedAmount / project.goalAmount) * 100);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, #1e3a8a ${10 + index * 15}%, #3b82f6 100%)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-heading font-bold text-white/10">{project.category.charAt(0)}</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-accent font-semibold text-white uppercase"
                        style={{ background: project.isCompleted ? 'rgba(34,197,94,0.6)' : 'rgba(59,130,246,0.5)', backdropFilter: 'blur(8px)' }}>
                        {project.isCompleted ? '✓ Complete' : project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm mb-5 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-semibold" style={{ color: 'var(--color-primary-500)' }}>
                          ${project.raisedAmount.toLocaleString()} raised
                        </span>
                        <span style={{ color: 'var(--text-tertiary)' }}>
                          ${project.goalAmount.toLocaleString()} goal
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                          className="h-full rounded-full gradient-primary"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
                        <span>{progress}% funded</span>
                        <span>{project.donorCount} donors</span>
                      </div>
                    </div>

                    {!project.isCompleted && (
                      <button className="btn btn-primary w-full btn-sm">
                        <Heart className="w-4 h-4" /> Donate Now
                      </button>
                    )}

                    {project.isCompleted && (
                      <div className="flex items-center justify-center gap-2 py-2 text-sm font-medium" style={{ color: 'rgb(34,197,94)' }}>
                        <CheckCircle className="w-4 h-4" /> Goal Reached — Thank You!
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Every Gift Changes a Life"
        description="Your generosity fuels the mission of the Gospel. Partner with us today and be part of something eternal."
        primaryAction={{ label: 'Give Now', href: '/contact', icon: <Gift className="w-5 h-5" /> }}
        variant="gold"
      />
    </>
  );
};

export default ProjectsPage;
