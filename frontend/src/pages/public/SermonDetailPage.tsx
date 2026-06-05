import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Headphones, Calendar, Eye, Heart, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import { SermonCard } from '@/components/cards/SermonCard';
import { mockSermons } from '@/data/sermons';
import { formatDate } from '@/utils/formatDate';

const SermonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const sermon = mockSermons.find(s => s.id === id);

  if (!sermon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Sermon Not Found</h2>
          <Link to="/sermons" className="btn btn-primary">Back to Sermons</Link>
        </div>
      </div>
    );
  }

  const relatedSermons = mockSermons.filter(s => s.id !== sermon.id && s.category === sermon.category).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section
        className="relative pt-12 pb-16"
        style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #1e3a8a 50%, #0a0e1a 100%)' }}
      >
        <div className="site-container">
          {/* Back button */}
          <Link to="/sermons" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Sermons
          </Link>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-accent font-semibold tracking-wider uppercase text-white mb-4"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                {sermon.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {sermon.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/70"
            >
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                  {sermon.preacher.charAt(0)}
                </div>
                {sermon.preacher}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(sermon.date)}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{sermon.viewCount.toLocaleString()} views</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{sermon.likeCount.toLocaleString()}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              {sermon.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-video rounded-xl overflow-hidden mb-8 relative"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-10 h-10 text-white fill-white" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Audio Player */}
              {sermon.audioUrl && (
                <div className="card p-4 mb-8 flex items-center gap-4">
                  <button className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-5 h-5 text-white" />
                  </button>
                  <div className="flex-1">
                    <div className="h-2 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
                      <div className="h-2 rounded-full w-1/3 gradient-primary" />
                    </div>
                    <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      <span>15:23</span>
                      <span>{sermon.duration}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sermon Notes */}
              <div className="prose max-w-none">
                <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>
                  Sermon Notes
                </h2>
                <div
                  className="text-sm leading-relaxed space-y-4"
                  style={{ color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{ __html: sermon.content }}
                />
              </div>

              {/* Share */}
              <div className="mt-10 pt-6 flex items-center gap-3" style={{ borderTop: '1px solid var(--border-color)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Share:</span>
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
                  <Share2 className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Scripture References */}
              <div className="card p-6 mb-6">
                <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-heading)' }}>
                  <BookOpen className="w-5 h-5 text-[var(--color-primary-500)]" />
                  Scripture References
                </h3>
                <div className="space-y-3">
                  {sermon.scriptureReferences.map((ref, i) => (
                    <div key={i} className="scripture-block !p-4 !text-sm">
                      <p className="not-italic">{ref.text}</p>
                      <span className="scripture-reference !mt-2 !text-xs">
                        {ref.book} {ref.chapter}:{ref.verseStart}{ref.verseEnd ? `-${ref.verseEnd}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {sermon.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-accent"
                      style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Sermons */}
      {relatedSermons.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="site-container">
            <h2 className="font-heading text-2xl font-bold mb-8 text-center" style={{ color: 'var(--text-heading)' }}>
              Related Sermons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedSermons.map((s, i) => (
                <SermonCard key={s.id} sermon={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SermonDetailPage;
