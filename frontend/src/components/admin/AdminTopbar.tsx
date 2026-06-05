import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, ChevronRight, LogOut, Settings, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AdminTopbarProps {
  onMobileMenuToggle: () => void;
}

export const AdminTopbar = ({ onMobileMenuToggle }: AdminTopbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead, fetchNotifications } = useNotificationStore();

  useEffect(() => { fetchNotifications(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Build breadcrumbs
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathParts.map((part, i) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
    href: '/' + pathParts.slice(0, i + 1).join('/'),
    isLast: i === pathParts.length - 1,
  }));

  const getTimeAgo = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <header
      style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        gap: '16px',
      }}
    >
      {/* Left: Mobile toggle + Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Menu style={{ width: '18px', height: '18px' }} />
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: 'var(--font-accent)', overflow: 'hidden' }}>
          {breadcrumbs.map((bc) => (
            <span key={bc.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              {bc.isLast ? (
                <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>{bc.label}</span>
              ) : (
                <>
                  <Link to={bc.href} style={{ color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}>
                    {bc.label}
                  </Link>
                  <ChevronRight style={{ width: '12px', height: '12px', color: 'var(--text-tertiary)' }} />
                </>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: showNotifications ? 'var(--bg-tertiary)' : 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.15s ease',
            }}
          >
            <Bell style={{ width: '18px', height: '18px' }} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '360px',
                  maxHeight: '420px',
                  borderRadius: '14px',
                  background: 'var(--bg-card-solid)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 16px 48px -8px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                  zIndex: 50,
                }}
              >
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)' }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', color: 'var(--color-primary-400)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                  {notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        background: n.isRead ? 'transparent' : 'rgba(59, 130, 246, 0.03)',
                        transition: 'background 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: n.isRead ? 400 : 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '2px' }}>
                            {!n.isRead && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary-500)', display: 'inline-block', marginRight: '6px' }} />}
                            {n.title}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-accent)' }}>{n.message}</div>
                        </div>
                        <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-accent)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {getTimeAgo(n.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/admin/notifications"
                  onClick={() => setShowNotifications(false)}
                  style={{
                    display: 'block',
                    padding: '12px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontFamily: 'var(--font-accent)',
                    fontWeight: 600,
                    color: 'var(--color-primary-400)',
                    borderTop: '1px solid var(--border-color)',
                    textDecoration: 'none',
                  }}
                >
                  View All Notifications
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div ref={userRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 10px',
              borderRadius: '10px',
              background: showUserMenu ? 'var(--bg-tertiary)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
                color: 'white',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              {user?.firstName?.charAt(0) || 'A'}
            </div>
            <div className="hidden md:block" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>
                {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
              </div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
                {user?.roles?.[0] || 'Admin'}
              </div>
            </div>
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '200px',
                  borderRadius: '12px',
                  background: 'var(--bg-card-solid)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 16px 48px -8px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                  zIndex: 50,
                }}
              >
                <Link
                  to="/admin/settings"
                  onClick={() => setShowUserMenu(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', fontSize: '13px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'background 0.1s' }}
                >
                  <Settings style={{ width: '16px', height: '16px' }} /> Settings
                </Link>
                <Link
                  to="/"
                  onClick={() => setShowUserMenu(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', fontSize: '13px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)', textDecoration: 'none', borderTop: '1px solid var(--border-subtle)' }}
                >
                  <User style={{ width: '16px', height: '16px' }} /> View Site
                </Link>
                <button
                  onClick={() => { logout(); setShowUserMenu(false); navigate('/admin/login'); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', fontSize: '13px', fontFamily: 'var(--font-accent)', color: '#ef4444', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderTop: '1px solid var(--border-subtle)', cursor: 'pointer',
                  }}
                >
                  <LogOut style={{ width: '16px', height: '16px' }} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
