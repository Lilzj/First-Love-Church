import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface ScriptureBlockProps {
  verse: string;
  reference: string;
  version?: string;
}

export const ScriptureBlock = ({ verse, reference, version = 'NIV' }: ScriptureBlockProps) => {
  return (
    <section className="relative overflow-hidden section-padding">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-primary) 0.5px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

      <div className="site-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-12 h-12 rounded-xl mx-auto mb-8 flex items-center justify-center"
            style={{ background: 'rgba(201, 168, 76, 0.12)', border: '1px solid rgba(201, 168, 76, 0.12)' }}
          >
            <BookOpen className="w-6 h-6" style={{ color: 'var(--color-gold-400)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-xl sm:text-2xl md:text-3xl italic leading-relaxed mb-6"
            style={{ color: 'var(--text-heading)' }}
          >
            "{verse}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-8" style={{ background: 'var(--color-gold-400)', opacity: 0.5 }} />
            <span className="font-accent text-sm font-semibold tracking-wider uppercase"
              style={{ color: 'var(--color-gold-400)' }}>
              {reference} ({version})
            </span>
            <div className="h-px w-8" style={{ background: 'var(--color-gold-400)', opacity: 0.5 }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
