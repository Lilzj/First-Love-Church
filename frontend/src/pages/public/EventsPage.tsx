import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { EventCard } from '@/components/cards/EventCard';
import { mockEvents, eventCategories } from '@/data/events';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesTab = activeTab === 'upcoming' ? event.isUpcoming : !event.isUpcoming;
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchQuery, selectedCategory, activeTab]);

  return (
    <>
      <HeroSection
        badge="Events"
        subtitle="Don't Miss Out"
        title="Experience Life-Changing Events"
        description="From powerful conferences to intimate prayer meetings, our events are designed to draw you closer to God and connect you with community."
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          {/* Tabs */}
          <div className="flex justify-center gap-1 mb-8">
            {(['upcoming', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-full text-sm font-accent font-medium transition-all duration-300 capitalize"
                style={{
                  background: activeTab === tab ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                  color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                }}
              >
                {tab} Events
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full text-sm font-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {eventCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="px-4 py-2 rounded-full text-xs font-accent font-medium transition-all duration-300"
                style={{
                  background: selectedCategory === cat.value ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                  color: selectedCategory === cat.value ? 'white' : 'var(--text-secondary)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
              <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>No events found</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EventsPage;
