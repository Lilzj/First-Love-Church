import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { BlogCard } from '@/components/cards/BlogCard';
import { mockBlogPosts, blogCategories } from '@/data/blog';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPosts = mockBlogPosts.filter(p => p.isFeatured);
  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const recentPosts = mockBlogPosts.slice(0, 5);

  return (
    <>
      <HeroSection
        badge="Blog"
        subtitle="Devotionals & Articles"
        title="Words of Faith & Inspiration"
        description="Spiritual nourishment, practical wisdom, and powerful testimonies to encourage your walk with God."
      />

      {/* Featured Posts */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <div className="space-y-6 mb-16">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="featured" />
            ))}
          </div>

          {/* Search & Filter */}
          <div className="mb-10">
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {blogCategories.map((cat) => (
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
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
                  <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>No articles found</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filter.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recent Posts */}
              <div className="card p-5">
                <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
                  Recent Articles
                </h3>
                <div className="space-y-1">
                  {recentPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} variant="compact" />
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="card p-5">
                <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
                  Categories
                </h3>
                <div className="space-y-2">
                  {blogCategories.filter(c => c.value !== 'all').map((cat) => {
                    const count = mockBlogPosts.filter(p => p.category === cat.value).length;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--bg-tertiary)]"
                        style={{ color: selectedCategory === cat.value ? 'var(--color-primary-500)' : 'var(--text-secondary)' }}
                      >
                        <span>{cat.label}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="card p-5">
                <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['faith', 'prayer', 'worship', 'family', 'hope', 'testimony', 'grace', 'love', 'bible study', 'leadership'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-accent capitalize"
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
    </>
  );
};

export default BlogPage;
