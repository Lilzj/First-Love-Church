import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { formatShortDate } from '@/utils/formatDate';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export const BlogCard = ({ post, index = 0, variant = 'default' }: BlogCardProps) => {
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/blog/${post.slug}`} className="card group block overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative h-60 md:h-full min-h-[280px] overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #7c3aed 100%)' }}
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-accent font-semibold uppercase text-white tracking-wider"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                  Featured
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-heading font-bold text-white/10">✝</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-accent font-semibold capitalize"
                  style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary-500)' }}>
                  {post.category.replace('-', ' ')}
                </span>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 group-hover:text-[var(--color-primary-500)] transition-colors"
                style={{ color: 'var(--text-heading)' }}>
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{post.author}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{formatShortDate(post.date)}</p>
                  </div>
                </div>
                <span className="text-xs font-accent font-semibold text-[var(--color-primary-500)] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link to={`/blog/${post.slug}`} className="flex items-start gap-4 group p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors">
          <div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden"
            style={{ background: `linear-gradient(135deg, #1e3a8a ${30 + index * 15}%, #3b82f6 100%)` }}>
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-lg font-heading font-bold text-white/20">✝</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-[var(--color-primary-500)] transition-colors"
              style={{ color: 'var(--text-heading)' }}>
              {post.title}
            </h4>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-tertiary)' }}>
              {formatShortDate(post.date)} · {post.readTime}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="card group block h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, #1e3a8a ${index * 10}%, #3b82f6 50%, #60a5fa 100%)` }}
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-accent font-semibold capitalize text-white"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
              {post.category.replace('-', ' ')}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-accent text-white"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formatShortDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {post.viewCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> {post.commentCount}
            </span>
          </div>

          <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[var(--color-primary-500)] transition-colors"
            style={{ color: 'var(--text-heading)' }}>
            {post.title}
          </h3>

          <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {post.author.charAt(0)}
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {post.author}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
