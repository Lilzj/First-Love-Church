import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SermonCard } from '@/components/cards/SermonCard';
import { mockSermons, sermonCategories } from '@/data/sermons';

const SermonsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSermons = useMemo(() => {
    return mockSermons.filter((sermon) => {
      const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || sermon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <HeroSection
        badge="Sermons"
        subtitle="The Word of God"
        title="Messages That Transform Lives"
        description="Explore our library of anointed sermons that will strengthen your faith and deepen your walk with God."
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search sermons by title, topic, or preacher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full text-sm font-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {sermonCategories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className="px-4 py-2 rounded-full text-xs font-accent font-medium transition-all duration-300"
                  style={{
                    background: selectedCategory === category.value
                      ? 'var(--color-primary-500)'
                      : 'var(--bg-tertiary)',
                    color: selectedCategory === category.value
                      ? 'white'
                      : 'var(--text-secondary)',
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {filteredSermons.length} sermon{filteredSermons.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Sermons Grid */}
          {filteredSermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSermons.map((sermon, index) => (
                <SermonCard key={sermon.id} sermon={sermon} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
              <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                No sermons found
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SermonsPage;
