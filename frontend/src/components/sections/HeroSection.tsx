import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

const HERO_IMAGES = [
  '/images/hero/worship.png',
  '/images/hero/preacher.png',
  '/images/hero/bible.png',
  '/images/hero/prayer.png',
  '/images/hero/community.png',
  '/images/hero/praise.png',
];

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  primaryAction?: { label: string; href: string; icon?: ReactNode };
  secondaryAction?: { label: string; href: string; icon?: ReactNode };
  overlay?: boolean;
  fullHeight?: boolean;
  children?: ReactNode;
  badge?: string;
  compact?: boolean;
}

export const HeroSection = ({
  title,
  subtitle,
  description,
  backgroundImage,
  primaryAction,
  secondaryAction,
  fullHeight = false,
  children,
  badge,
  compact = false,
}: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextImage, 6000);
    return () => clearInterval(timer);
  }, [nextImage]);

  return (
    <section
      className="relative overflow-hidden -mt-[64px]"
      style={{
        minHeight: fullHeight ? '100vh' : compact ? '50vh' : '65vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '64px',
      }}
    >
      {/* Background slideshow images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : `url(${HERO_IMAGES[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        {/* Dark gradient overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(2,6,23,0.88) 0%, rgba(10,22,40,0.82) 25%, rgba(15,36,71,0.78) 50%, rgba(10,22,40,0.82) 75%, rgba(2,6,23,0.92) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, var(--color-primary-400), transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, var(--color-gold-400), transparent 70%)' }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="site-container relative z-[3] py-16 md:py-24">
        <div className="max-w-3xl">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-accent font-semibold tracking-[0.12em] uppercase mb-6"
              style={{
                background: 'rgba(59, 130, 246, 0.12)',
                color: 'var(--color-primary-300)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-400)]" style={{ boxShadow: '0 0 6px var(--color-primary-400)' }} />
              {badge}
            </motion.div>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-accent text-sm md:text-base tracking-[0.15em] uppercase mb-4"
              style={{ color: 'var(--color-gold-400)' }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {description}
            </motion.p>
          )}

          {(primaryAction || secondaryAction) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              {primaryAction && (
                <Link to={primaryAction.href} className="btn btn-primary btn-lg">
                  {primaryAction.icon}
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link to={secondaryAction.href} className="btn btn-ghost btn-lg">
                  {secondaryAction.icon}
                  {secondaryAction.label}
                </Link>
              )}
            </motion.div>
          )}

          {children}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[3]"
        style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
      />
    </section>
  );
};
