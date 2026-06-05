import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Calendar, DollarSign, FileText,
  Image, Users, Heart, Bell, Mail, Radio, Settings, ChevronLeft,
  Church, X, Shield,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Sermons', href: '/admin/sermons', icon: BookOpen },
      { label: 'Events', href: '/admin/events', icon: Calendar },
      { label: 'Blog', href: '/admin/blog', icon: FileText },
      { label: 'Gallery', href: '/admin/gallery', icon: Image },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Ministries', href: '/admin/ministries', icon: Church },
      { label: 'Members', href: '/admin/users', icon: Users },
      { label: 'Prayer Requests', href: '/admin/prayer', icon: Heart },
      { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Donations', href: '/admin/donations', icon: DollarSign },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Livestream', href: '/admin/livestream', icon: Radio },
      { label: 'Notifications', href: '/admin/notifications', icon: Bell },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const AdminSidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: AdminSidebarProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const sidebarContent = (
    <div
      style={{
        width: isCollapsed ? '72px' : '260px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: isCollapsed ? '20px 16px' : '20px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-color)',
          minHeight: '72px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
            flexShrink: 0,
          }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>✝</span>
        </div>
        {!isCollapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>
              Admin Portal
            </div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-accent)', color: 'var(--color-primary-400)', whiteSpace: 'nowrap' }}>
              First Love Church
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} style={{ marginBottom: '16px' }}>
            {!isCollapsed && (
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-accent)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-tertiary)',
                  padding: '4px 12px',
                  marginBottom: '4px',
                }}
              >
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onMobileClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: isCollapsed ? '10px 0' : '10px 12px',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-accent)',
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--color-primary-400)' : 'var(--text-secondary)',
                    background: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                    marginBottom: '2px',
                    position: 'relative',
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                  {!isCollapsed && <span>{item.label}</span>}
                  {active && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '20px',
                        borderRadius: '0 4px 4px 0',
                        background: 'var(--color-primary-500)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle (desktop) */}
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={onToggle}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: isCollapsed ? 'rotate(180deg)' : 'none',
          }}
        >
          <ChevronLeft style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

      {/* Admin badge */}
      {!isCollapsed && (
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontFamily: 'var(--font-accent)',
            color: 'var(--text-tertiary)',
          }}
        >
          <Shield style={{ width: '14px', height: '14px', color: 'var(--color-primary-400)' }} />
          Admin Access
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block" style={{ flexShrink: 0 }}>
        {sidebarContent}
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 60,
              }}
              className="lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 70,
              }}
              className="lg:hidden"
            >
              <div style={{ position: 'relative' }}>
                {sidebarContent}
                <button
                  onClick={onMobileClose}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '-44px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-card-solid)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
