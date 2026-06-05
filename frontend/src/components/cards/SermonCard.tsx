import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Calendar, Eye, Clock } from 'lucide-react';
import type { Sermon } from '@/types/sermon';
import { formatShortDate } from '@/utils/formatDate';

interface SermonCardProps {
  sermon: Sermon;
  index?: number;
}

export const SermonCard = ({ sermon, index = 0 }: SermonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/sermons/${sermon.id}`} className="card group block h-full">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(${135 + index * 20}deg, #0f2447 0%, #1e3a8a ${40 + index * 5}%, #2563eb 100%)`,
            }}
          />

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="px-2.5 py-1 rounded-md text-[10px] font-accent font-semibold uppercase tracking-wider text-white"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              {sermon.category}
            </span>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2.5 py-1 rounded-md text-xs font-accent text-white/80 flex items-center gap-1"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
              <Clock className="w-3 h-3" /> {sermon.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatShortDate(sermon.date)}</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {sermon.viewCount.toLocaleString()}</span>
          </div>

          <h3
            className="font-heading text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[var(--color-primary-400)] transition-colors"
            style={{ color: 'var(--text-heading)' }}
          >
            {sermon.title}
          </h3>

          <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
            {sermon.description}
          </p>

          <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              {sermon.preacher.charAt(0)}
            </div>
            <span className="text-xs font-accent" style={{ color: 'var(--text-tertiary)' }}>
              {sermon.preacher}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
