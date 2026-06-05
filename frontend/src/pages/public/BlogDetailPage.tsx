import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, MessageCircle, ArrowLeft, Share2, Heart, Clock, ArrowRight } from 'lucide-react';
import { BlogCard } from '@/components/cards/BlogCard';
import { mockBlogPosts, mockBlogComments } from '@/data/blog';
import { formatDate, formatShortDate } from '@/utils/formatDate';

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Article Not Found</h2>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);
  const comments = mockBlogComments.filter(c => c.postId === post.id);

  return (
    <>
      {/* Header */}
      <section className="relative pt-12 pb-16" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #1e3a8a 50%, #0a0e1a 100%)' }}>
        <div className="site-container">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-accent font-semibold uppercase capitalize text-white"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                {post.category.replace('-', ' ')}
              </span>
              <span className="text-xs text-white/60 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</motion.h1>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
                {post.author}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.viewCount.toLocaleString()} views</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.commentCount} comments</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Article Content */}
              <div className="prose max-w-none mb-10">
                <div
                  className="text-sm leading-[1.9]"
                  style={{ color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-accent capitalize"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share & Like */}
              <div className="flex items-center gap-4 pb-8" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <button className="btn btn-sm" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  <Heart className="w-4 h-4" /> Like
                </button>
                <button className="btn btn-sm" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              {/* Comments */}
              <div className="mt-10">
                <h3 className="font-heading text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
                  Comments ({comments.length})
                </h3>

                <div className="space-y-6 mb-8">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>{comment.author}</span>
                          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{formatShortDate(comment.date)}</span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{comment.content}</p>
                        <button className="text-xs mt-2 flex items-center gap-1 font-accent text-[var(--color-primary-500)]">
                          <Heart className="w-3 h-3" /> {comment.likes}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <div className="card p-6">
                  <h4 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Leave a Comment</h4>
                  <textarea
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none mb-4"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                  />
                  <button className="btn btn-primary btn-sm">Post Comment</button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Author Card */}
              <div className="card p-6 text-center">
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-heading font-bold">
                  {post.author.charAt(0)}
                </div>
                <h3 className="font-heading font-semibold mb-1" style={{ color: 'var(--text-heading)' }}>{post.author}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--color-primary-500)' }}>{post.authorBio}</p>
                <Link to="/about" className="text-xs font-accent font-semibold text-[var(--color-primary-500)] flex items-center justify-center gap-1 hover:gap-2 transition-all">
                  View Profile <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Related */}
              {relatedPosts.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Related Articles</h3>
                  <div className="space-y-1">
                    {relatedPosts.map((p, i) => (
                      <BlogCard key={p.id} post={p} index={i} variant="compact" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
