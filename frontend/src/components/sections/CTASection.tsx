import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: { label: string; href: string; icon?: ReactNode };
  secondaryAction?: { label: string; href: string; icon?: ReactNode };
  variant?: 'primary' | 'gold' | 'spiritual';
}

export const CTASection = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'primary',
}: CTASectionProps) => {
  const gradients = {
    primary: 'linear-gradient(135deg, #0f2447, #1e3a8a 40%, #2563eb 100%)',
    gold: 'linear-gradient(135deg, #451a03, #78350f 40%, #92400e 100%)',
    spiritual: 'linear-gradient(135deg, #2e1065, #4c1d95 40%, #6d28d9 100%)',
  };

  return (
    <section className="relative overflow-hidden" style={{ background: gradients[variant] }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, white, transparent 70%)' }} />
      </div>

      <div className="site-container section-padding relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to={primaryAction.href}
              className="btn btn-lg"
              style={{
                background: 'white',
                color: '#1e3a8a',
                fontWeight: 700,
                boxShadow: '0 4px 20px rgba(255,255,255,0.2)',
              }}
            >
              {primaryAction.icon}
              {primaryAction.label}
            </Link>
            {secondaryAction && (
              <Link to={secondaryAction.href} className="btn btn-ghost btn-lg">
                {secondaryAction.icon}
                {secondaryAction.label}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
