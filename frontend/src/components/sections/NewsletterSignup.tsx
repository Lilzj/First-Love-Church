import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setEmail(''); }, 3000);
    }
  };

  return (
    <section className="relative overflow-hidden section-padding" style={{ background: 'var(--bg-secondary)' }}>
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)',
          backgroundSize: '30px 30px',
        }} />

      <div className="site-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-heading)' }}
          >
            Stay Connected
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-base mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Subscribe to our newsletter for weekly devotionals, event updates, and inspiring messages from our pastor.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-full text-sm font-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
              }}
            />
            <button type="submit" disabled={isSubmitted} className="btn btn-primary whitespace-nowrap">
              {isSubmitted ? <><CheckCircle className="w-4 h-4" /> Subscribed!</> : <><Send className="w-4 h-4" /> Subscribe</>}
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-xs mt-4"
            style={{ color: 'var(--text-tertiary)' }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
