import { motion } from 'framer-motion';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  light?: boolean;
}

export const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto' : ''}`} style={{ maxWidth: isCenter ? '640px' : undefined }}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-accent text-xs tracking-[0.2em] uppercase font-semibold mb-3"
          style={{ color: light ? 'var(--color-gold-300)' : 'var(--color-primary-400)' }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-heading font-bold leading-[1.15] mb-4"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: light ? 'white' : 'var(--text-heading)',
        }}
      >
        {title}
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={`h-[3px] rounded-full mb-5 ${isCenter ? 'mx-auto' : ''}`}
        style={{ background: `linear-gradient(90deg, var(--color-primary-500), var(--color-primary-300))` }}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base leading-relaxed"
          style={{
            color: light ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)',
            maxWidth: isCenter ? '540px' : undefined,
            margin: isCenter ? '0 auto' : undefined,
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
