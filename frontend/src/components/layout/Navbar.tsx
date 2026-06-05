import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher';
import { CHURCH_NAME } from '@/utils/constants';

const PRIMARY_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Blog', href: '/blog' },
];

const MORE_NAV = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Live Stream', href: '/live' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Give', href: '/give' },
  { label: 'Prayer Wall', href: '/prayer' },
  { label: 'Contact', href: '/contact' },
];

const ALL_NAV = [...PRIMARY_NAV, ...MORE_NAV];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setIsMoreOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const isMoreActive = MORE_NAV.some(item => isActive(item.href));

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: isScrolled ? 'var(--nav-bg-solid)' : 'var(--nav-bg)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: `1px solid ${isScrolled ? 'var(--border-color)' : 'transparent'}`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <nav
          className="site-container"
          style={{
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
              }}
            >
              <span style={{ color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px' }}>✝</span>
            </div>
            <div className="hidden sm:block">
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                {CHURCH_NAME}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-400)',
                  margin: 0,
                }}
              >
                Where Love Finds You
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex"
            style={{
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  position: 'relative',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-accent)',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  color: isActive(item.href) ? 'var(--color-primary-400)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) e.currentTarget.style.color = 'var(--text-heading)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      height: '2px',
                      width: '20px',
                      borderRadius: '9999px',
                      background: 'var(--color-primary-400)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* More Dropdown */}
            <div ref={moreRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                style={{
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-accent)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  color: isMoreActive ? 'var(--color-primary-400)' : 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                More
                <ChevronDown
                  style={{
                    width: '14px',
                    height: '14px',
                    transition: 'transform 0.2s ease',
                    transform: isMoreOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}
                />
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '8px',
                      width: '200px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: 'var(--bg-card-solid)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-xl)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div style={{ padding: '8px 0' }}>
                      {MORE_NAV.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          style={{
                            display: 'block',
                            padding: '10px 16px',
                            fontSize: '13px',
                            fontFamily: 'var(--font-accent)',
                            fontWeight: 500,
                            transition: 'all 0.15s ease',
                            color: isActive(item.href) ? 'var(--color-primary-400)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--bg-tertiary)';
                            if (!isActive(item.href)) e.currentTarget.style.color = 'var(--text-heading)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            if (!isActive(item.href)) e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexShrink: 0,
            }}
          >
            <ThemeSwitcher />
            <Link
              to="/give"
              className="hidden md:inline-flex btn btn-primary btn-sm"
            >
              <Heart style={{ width: '14px', height: '14px' }} /> Give
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
              style={{
                padding: '8px',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X style={{ width: '22px', height: '22px' }} /> : <Menu style={{ width: '22px', height: '22px' }} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 flex flex-col"
              style={{ background: 'var(--bg-primary)', borderLeft: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <span className="font-heading text-sm font-bold" style={{ color: 'var(--text-heading)' }}>Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg" style={{ color: 'var(--text-tertiary)' }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                {ALL_NAV.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.025, duration: 0.25 }}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-5 py-2.5 text-[14px] font-medium font-accent transition-colors"
                      style={{
                        color: isActive(item.href) ? 'var(--color-primary-400)' : 'var(--text-primary)',
                        background: isActive(item.href) ? 'rgba(59,130,246,0.06)' : 'transparent',
                      }}
                    >
                      {item.label}
                      {isActive(item.href) && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary-400)' }} />}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                <Link to="/give" className="btn btn-primary w-full btn-sm">
                  <Heart className="w-3.5 h-3.5" /> Give to the Church
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
