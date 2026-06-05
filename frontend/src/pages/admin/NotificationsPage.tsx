import { useState, useEffect, useCallback } from 'react';
import { Check, CheckCheck, Bell, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { notificationService } from '@/services/notificationService';
import { toast } from '@/store/useToastStore';
import type { NotificationResponse } from '@/types/api';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try { const data = await notificationService.getNotifications({ pageSize: 100 }); setNotifications(data.items || []); }
    catch { toast.error('Failed to load notifications'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleMarkRead = async (id: string) => {
    try { await notificationService.markRead(id); setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n)); }
    catch { toast.error('Failed to mark as read'); }
  };

  const handleMarkAllRead = async () => {
    try { await notificationService.markAllRead(); setNotifications(prev => prev.map(n => ({ ...n, isRead: true }))); toast.success('All marked as read'); }
    catch { toast.error('Failed to mark all as read'); }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Notifications</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="btn btn-outline btn-sm"><CheckCheck style={{ width: '16px', height: '16px' }} /> Mark All Read</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '60px 0' }}>
          <Bell style={{ width: '48px', height: '48px', color: 'var(--text-tertiary)', margin: '0 auto 16px', opacity: 0.4 }} />
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)' }}>No notifications yet</p>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px 18px',
                borderRadius: '14px',
                background: n.isRead ? 'var(--bg-card)' : 'rgba(59,130,246,0.04)',
                border: `1px solid ${n.isRead ? 'var(--border-color)' : 'rgba(59,130,246,0.15)'}`,
                transition: 'background 0.15s',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.isRead ? 'var(--border-color)' : 'var(--color-primary-500)', marginTop: '6px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '2px' }}>{n.title}</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{n.message}</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)', marginTop: '6px' }}>{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              {!n.isRead && (
                <button onClick={() => handleMarkRead(n.id)} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer', flexShrink: 0 }} title="Mark as Read"><Check style={{ width: '14px', height: '14px' }} /></button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
