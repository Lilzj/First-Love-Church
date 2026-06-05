import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { getMonthDay, getDaysUntil } from '@/utils/formatDate';
import type { ChurchEvent } from '@/types/event';

interface EventCardProps {
  event: ChurchEvent;
  index?: number;
}

export const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const { month, day } = getMonthDay(event.date);
  const daysUntil = getDaysUntil(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/events/${event.id}`} className="card group flex flex-col sm:flex-row h-full overflow-hidden">
        {/* Date Badge */}
        <div
          className="sm:w-28 flex-shrink-0 flex items-center justify-center p-4 sm:p-0"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))' }}
        >
          <div className="text-center text-white">
            <span className="block text-xs font-accent font-semibold uppercase tracking-wider opacity-80">
              {month}
            </span>
            <span className="block text-3xl font-heading font-bold leading-none">{day}</span>
            {event.isUpcoming && daysUntil > 0 && (
              <span className="block text-[10px] font-accent mt-1 opacity-70">
                {daysUntil} days left
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className="font-heading text-lg font-semibold line-clamp-2 group-hover:text-[var(--color-primary-400)] transition-colors"
              style={{ color: 'var(--text-heading)' }}
            >
              {event.title}
            </h3>
            {event.isFeatured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-accent font-semibold flex-shrink-0"
                style={{ background: 'rgba(201, 168, 76, 0.12)', color: 'var(--color-gold-400)' }}>
                Featured
              </span>
            )}
          </div>

          <p className="text-sm line-clamp-2 mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{event.time}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
            {event.registrationRequired && event.maxAttendees && (
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{event.currentAttendees}/{event.maxAttendees}</span>
            )}
          </div>

          <div className="mt-4 pt-3 flex items-center gap-1 text-xs font-accent font-semibold text-[var(--color-primary-400)] group-hover:gap-2 transition-all"
            style={{ borderTop: '1px solid var(--border-color)' }}>
            Learn More <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
