import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, User, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { mockWeeklyActivities } from '@/data/gallery';

const dayColors: Record<string, string> = {
  Sunday: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
  Monday: 'linear-gradient(135deg, #065f46, #10b981)',
  Tuesday: 'linear-gradient(135deg, #7c2d12, #f59e0b)',
  Wednesday: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
  Thursday: 'linear-gradient(135deg, #1e3a5f, #0ea5e9)',
  Friday: 'linear-gradient(135deg, #831843, #ec4899)',
  Saturday: 'linear-gradient(135deg, #713f12, #d97706)',
};

const WeeklyActivitiesPage = () => {
  const [expandedDay, setExpandedDay] = useState<string>('Sunday');

  return (
    <>
      <HeroSection
        badge="Schedule"
        subtitle="Stay Connected"
        title="Weekly Activities"
        description="There's something happening every day at First Love Church. Find a service, group, or activity that fits your schedule."
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container max-w-4xl">
          <SectionHeading
            subtitle="Our Week"
            title="What's Happening"
            description="Click on any day to see all scheduled activities. We look forward to seeing you!"
          />

          <div className="space-y-4">
            {mockWeeklyActivities.map((daySchedule, dayIndex) => {
              const isExpanded = expandedDay === daySchedule.day;
              const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === daySchedule.day;

              return (
                <motion.div
                  key={daySchedule.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: dayIndex * 0.05 }}
                  className="card overflow-hidden"
                >
                  {/* Day Header */}
                  <button
                    onClick={() => setExpandedDay(isExpanded ? '' : daySchedule.day)}
                    className="w-full flex items-center justify-between p-5 transition-colors"
                    style={{ background: isExpanded ? 'var(--bg-card)' : 'transparent' }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0"
                        style={{ background: dayColors[daySchedule.day] }}
                      >
                        {daySchedule.day.slice(0, 3).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>
                            {daySchedule.day}
                          </h3>
                          {isToday && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-accent font-semibold"
                              style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-primary-500)' }}>
                              Today
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {daySchedule.activities.length} activit{daySchedule.activities.length === 1 ? 'y' : 'ies'}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 transition-transform duration-300"
                      style={{
                        color: 'var(--text-tertiary)',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  {/* Activities */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-3">
                          {daySchedule.activities.map((activity, actIndex) => (
                            <motion.div
                              key={activity.name}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: actIndex * 0.05 }}
                              className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-start gap-4"
                              style={{ background: 'var(--bg-secondary)' }}
                            >
                              {/* Time badge */}
                              <div className="flex-shrink-0 sm:w-36">
                                <div className="flex items-center gap-1.5 text-xs font-accent font-medium"
                                  style={{ color: 'var(--color-primary-500)' }}>
                                  <Clock className="w-3.5 h-3.5" />
                                  {activity.time}
                                </div>
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>
                                    {activity.name}
                                  </h4>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-accent flex-shrink-0"
                                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>
                                    {activity.category}
                                  </span>
                                </div>
                                <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>{activity.description}</p>
                                <div className="flex flex-wrap gap-3 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {activity.location}</span>
                                  {activity.leader && (
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {activity.leader}</span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Download Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="btn btn-outline">
              <CalendarIcon className="w-4 h-4" />
              Download Full Schedule
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WeeklyActivitiesPage;
