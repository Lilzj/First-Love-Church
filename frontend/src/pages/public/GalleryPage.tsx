import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ZoomIn } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { mockGalleryItems, galleryCategories } from '@/data/gallery';
import { formatShortDate } from '@/utils/formatDate';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<typeof mockGalleryItems[0] | null>(null);

  const filteredItems = useMemo(() => {
    return selectedCategory === 'all'
      ? mockGalleryItems
      : mockGalleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Generate random masonry heights for visual variety
  const heights = [280, 340, 240, 320, 260, 300, 220, 360, 280, 240, 320, 260];

  return (
    <>
      <HeroSection
        badge="Gallery"
        subtitle="Moments of Grace"
        title="See God at Work in Our Midst"
        description="Captured moments from our worship services, events, outreach programs, and community life."
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="px-5 py-2.5 rounded-full text-xs font-accent font-medium transition-all duration-300"
                style={{
                  background: selectedCategory === cat.value ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                  color: selectedCategory === cat.value ? 'white' : 'var(--text-secondary)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                  style={{ height: heights[index % heights.length] }}
                  onClick={() => setLightboxItem(item)}
                >
                  {/* Gradient background simulating images */}
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(${135 + index * 15}deg, #1e3a8a ${10 + index * 5}%, #3b82f6 ${50 + index * 3}%, #60a5fa ${90 + index * 2}%)`,
                    }}
                  />

                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-heading font-bold text-white/10">
                      {item.type === 'video' ? '▶' : '✝'}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                    <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full translate-y-2 group-hover:translate-y-0">
                      <p className="text-white text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-white/70 text-xs">{formatShortDate(item.date)} · {item.category}</p>
                    </div>

                    {/* Zoom / Play icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {item.type === 'video' ? (
                          <Play className="w-5 h-5 text-white fill-white" />
                        ) : (
                          <ZoomIn className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightboxItem(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxItem.type === 'video' && lightboxItem.videoUrl ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={lightboxItem.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lightboxItem.title}
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl overflow-hidden relative"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa)' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-heading font-bold text-white/10">✝</span>
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <h3 className="text-white font-heading text-xl font-semibold">{lightboxItem.title}</h3>
                <p className="text-white/60 text-sm mt-1">{lightboxItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
