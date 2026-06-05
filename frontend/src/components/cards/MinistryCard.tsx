import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Zap, Music, Shield, Heart, Star, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Ministry } from '@/types/ministry';

interface MinistryCardProps {
  ministry: Ministry;
  index?: number;
}

const iconMap: Record<string, LucideIcon> = { Zap, Music, Shield, Heart, Star, Globe };

export const MinistryCard = ({ ministry, index = 0 }: MinistryCardProps) => {
  const Icon = iconMap[ministry.icon] || Heart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/ministries/${ministry.slug}`} className="card group block h-full p-6 md:p-8">
        <div className="flex flex-col h-full">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          <h3
            className="font-heading text-xl font-semibold mb-3 group-hover:text-[var(--color-primary-400)] transition-colors"
            style={{ color: 'var(--text-heading)' }}
          >
            {ministry.name}
          </h3>

          <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-secondary)' }}>
            {ministry.description}
          </p>

          <div className="flex items-center justify-between text-xs pt-4" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {ministry.memberCount} members</span>
            <span className="flex items-center gap-1 font-accent font-semibold text-[var(--color-primary-400)] group-hover:gap-2 transition-all">
              Explore <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
