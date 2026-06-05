import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Calendar, BookOpen, Zap, ArrowRight, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/admin/StatCard';
import { dashboardService } from '@/services/dashboardService';
import { eventService } from '@/services/eventService';
import { useAuthStore } from '@/store/useAuthStore';
import type { DashboardSummary, EventListItem } from '@/types/api';

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState<DashboardSummary | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [dashData, eventsData] = await Promise.allSettled([
        dashboardService.getSummary(),
        eventService.getUpcoming(3),
      ]);
      if (dashData.status === 'fulfilled') setStats(dashData.value);
      if (eventsData.status === 'fulfilled') setUpcomingEvents(eventsData.value);
    } catch {
      // Fail silently — stats are non-critical
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const quickActions = [
    { label: 'Add Sermon', href: '/admin/sermons', icon: BookOpen, color: 'var(--color-primary-500)' },
    { label: 'Create Event', href: '/admin/events', icon: Calendar, color: '#22c55e' },
    { label: 'View Donations', href: '/admin/donations', icon: DollarSign, color: 'var(--color-gold-500)' },
    { label: 'Send Newsletter', href: '/admin/newsletter', icon: Zap, color: '#a855f7' },
  ];

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
          <Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)' }} />
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>
          Welcome back{user ? `, ${user.firstName}` : ''}. Here's what's happening at First Love Church.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Members" value={stats?.totalMembers?.toLocaleString() || '0'} trend={0} icon={<Users style={{ width: '20px', height: '20px' }} />} index={0} />
        <StatCard label="Total Donations" value={`₦${((stats?.totalDonations || 0) / 1000).toFixed(0)}K`} trend={0} icon={<DollarSign style={{ width: '20px', height: '20px' }} />} index={1} />
        <StatCard label="Active Events" value={stats?.upcomingEvents || 0} trend={0} icon={<Calendar style={{ width: '20px', height: '20px' }} />} index={2} />
        <StatCard label="Total Sermons" value={stats?.totalSermons || 0} trend={0} icon={<BookOpen style={{ width: '20px', height: '20px' }} />} index={3} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                    fontSize: '13px',
                    fontFamily: 'var(--font-accent)',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${action.color}15`, color: action.color }}>
                    <action.icon style={{ width: '16px', height: '16px' }} />
                  </div>
                  {action.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>
              Overview
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Blog Posts', value: stats?.totalBlogPosts || 0 },
                { label: 'Ministries', value: stats?.totalMinistries || 0 },
                { label: 'Prayer Requests', value: stats?.pendingPrayerRequests || 0, suffix: ' pending' },
                { label: 'Active Campaigns', value: stats?.activeCampaigns || 0 },
                { label: 'New Members This Month', value: stats?.newMembersThisMonth || 0 },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)' }}>
                    {item.value}{item.suffix || ''}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)' }}>
              Upcoming Events
            </h3>
            <Link to="/admin/events" style={{ fontSize: '12px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--color-primary-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight style={{ width: '12px', height: '12px' }} />
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p style={{ fontSize: '13px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)', textAlign: 'center', padding: '24px 0' }}>
              No upcoming events
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-accent)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      {new Date(event.startDate).getDate()}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '2px' }}>
                      {event.title}
                    </div>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)' }}>
                      {event.location || 'TBD'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
