import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import { CHURCH_NAME, CHURCH_EMAIL, CHURCH_PHONE, CHURCH_ADDRESS, SOCIAL_LINKS } from '@/utils/constants';

const FacebookIcon = () => <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const InstagramIcon = () => <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const YoutubeIcon = () => <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const TwitterIcon = () => <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blog' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Contact', href: '/contact' },
];

const FOOTER_LINKS_2 = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Live Stream', href: '/live' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Give', href: '/give' },
  { label: 'Prayer Wall', href: '/prayer' },
];

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer style={{ background: 'var(--footer-bg)', color: 'var(--footer-text)' }}>
      {/* Top separator */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)' }} />

      <div className="site-container" style={{ paddingTop: 'clamp(3.5rem, 6vw, 5rem)', paddingBottom: 'clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Church Identity */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">✝</span>
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white">{CHURCH_NAME}</h3>
                <p className="text-[10px] font-accent tracking-[0.2em] uppercase" style={{ color: 'var(--color-primary-400)' }}>
                  Where Love Finds You
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs opacity-70">
              A place where you can encounter the living God, find genuine community,
              and discover your God-given purpose.
            </p>
            <div className="flex gap-2">
              {[
                { icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                { icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                { icon: YoutubeIcon, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
                { icon: TwitterIcon, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-250 hover:scale-105 text-white/60 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.05)' }}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent font-semibold text-white text-xs tracking-[0.15em] uppercase mb-5">
              Church
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm hover:text-white transition-colors inline-block opacity-70 hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-accent font-semibold text-white text-[11px] tracking-[0.15em] uppercase mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS_2.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-xs hover:text-white transition-colors inline-block opacity-70 hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-accent font-semibold text-white text-xs tracking-[0.15em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary-400)' }} />
                <span className="text-sm opacity-70">{CHURCH_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-primary-400)' }} />
                <a href={`tel:${CHURCH_PHONE}`} className="text-sm hover:text-white transition-colors opacity-70 hover:opacity-100">
                  {CHURCH_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-primary-400)' }} />
                <a href={`mailto:${CHURCH_EMAIL}`} className="text-sm hover:text-white transition-colors opacity-70 hover:opacity-100">
                  {CHURCH_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="site-container py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs opacity-40">
          © {currentYear} {CHURCH_NAME}. All rights reserved.
        </p>
        <div className="flex items-center gap-1.5 text-xs opacity-40">
          <span>Made with</span>
          <Heart className="w-2.5 h-2.5 text-red-400 fill-red-400" />
          <span>for the Kingdom</span>
        </div>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-5 right-5 w-9 h-9 rounded-xl text-white shadow-lg flex items-center justify-center z-40 hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
              boxShadow: '0 2px 12px rgba(59,130,246,0.4)',
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
