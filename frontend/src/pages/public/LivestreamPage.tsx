import { motion } from 'framer-motion';
import { Radio, Calendar, Clock, Eye, Play, Wifi, WifiOff } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { mockLivestreams } from '@/data/gallery';
import { formatDate } from '@/utils/formatDate';

const LivestreamPage = () => {
  const liveNow = mockLivestreams.find(s => s.isLive);
  const upcoming = mockLivestreams.filter(s => s.isUpcoming);
  const past = mockLivestreams.filter(s => !s.isLive && !s.isUpcoming);

  return (
    <>
      <HeroSection
        badge="Live"
        subtitle="Watch from Anywhere"
        title="Join Us Live Online"
        description="Can't make it in person? Join our live services and experience powerful worship and the Word of God from wherever you are."
        primaryAction={liveNow ? { label: 'Watch Now', href: '#live-player', icon: <Radio className="w-5 h-5" /> } : undefined}
      />

      {/* Live Now */}
      {liveNow && (
        <section id="live-player" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="site-container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-accent font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    LIVE NOW
                  </span>
                  <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                    <Eye className="w-3 h-3" /> {liveNow.viewCount} watching
                  </span>
                </div>

                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
                  {liveNow.title}
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{liveNow.description}</p>
              </motion.div>

              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative"
                style={{ background: 'linear-gradient(135deg, #0a0e1a, #1e3a8a)' }}
              >
                {liveNow.embedUrl ? (
                  <iframe
                    src={liveNow.embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={liveNow.title}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                      <Play className="w-10 h-10 text-white fill-white" />
                    </div>
                    <p className="text-white/60 font-accent text-sm">Live stream starting soon...</p>
                  </div>
                )}
              </motion.div>

              {/* Live Chat Placeholder */}
              <div className="card p-5 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wifi className="w-4 h-4 text-[var(--color-primary-500)]" />
                  <h3 className="font-heading font-semibold" style={{ color: 'var(--text-heading)' }}>Live Chat</h3>
                </div>
                <div className="h-48 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Live chat feature coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Live Stream */}
      {!liveNow && (
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="site-container">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-glass p-12"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                  <WifiOff className="w-10 h-10 text-[var(--color-primary-500)]" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--text-heading)' }}>
                  No Live Stream Right Now
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  We're not currently streaming, but check out our upcoming services below or watch a previous recording.
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Sunday: 9:30 AM</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Wednesday: 6:00 PM</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Friday: 6:00 PM</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Streams */}
      {upcoming.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="site-container">
            <SectionHeading subtitle="Coming Up" title="Upcoming Live Streams" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {upcoming.map((stream, index) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                    <Radio className="w-7 h-7 text-[var(--color-primary-500)]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                    {stream.title}
                  </h3>
                  <div className="space-y-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <p className="flex items-center justify-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(stream.date)}</p>
                    <p className="flex items-center justify-center gap-1"><Clock className="w-3 h-3" /> {stream.time}</p>
                  </div>
                  <p className="text-xs mt-3 px-2 py-0.5 rounded-full inline-block capitalize"
                    style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary-500)' }}>
                    {stream.platform}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Streams */}
      {past.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="site-container">
            <SectionHeading subtitle="Watch Again" title="Previous Recordings" description="Missed a service? Watch the recording below." />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((stream, index) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card group overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, #0a0e1a ${index * 10}%, #1e3a8a 100%)` }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <Play className="w-7 h-7 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="px-2 py-0.5 rounded text-[10px] text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <Eye className="w-3 h-3 inline mr-1" />{stream.viewCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-sm mb-1 group-hover:text-[var(--color-primary-500)] transition-colors"
                      style={{ color: 'var(--text-heading)' }}>{stream.title}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{formatDate(stream.date)} · {stream.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LivestreamPage;
