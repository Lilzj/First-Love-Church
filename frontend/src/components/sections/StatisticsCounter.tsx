import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { Users, Calendar, Heart, Globe, Sparkles, Church } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  icon: string;
  suffix: string;
}

interface StatisticsCounterProps {
  stats: StatItem[];
}

const iconMap: Record<string, LucideIcon> = { Users, Calendar, Heart, Globe, Sparkles, Church };

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const { formattedCount, ref } = useCountUp({ end: stat.value, suffix: stat.suffix, duration: 2500 });
  const Icon = iconMap[stat.icon] || Heart;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="text-center group"
    >
      <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.08)' }}>
        <Icon className="w-7 h-7 text-[var(--color-primary-400)]" />
      </div>
      <div className="font-heading text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--text-heading)' }}>
        {formattedCount}
      </div>
      <p className="text-sm font-accent" style={{ color: 'var(--text-secondary)' }}>
        {stat.label}
      </p>
    </motion.div>
  );
};

export const StatisticsCounter = ({ stats }: StatisticsCounterProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
};
