import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HandHeart, Heart, CheckCircle, Send, Shield } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { mockPrayerRequests, prayerCategories } from '@/data/gallery';
import { formatShortDate } from '@/utils/formatDate';

const prayerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  category: z.string().min(1, 'Please select a category'),
  request: z.string().min(10, 'Prayer request must be at least 10 characters'),
  isAnonymous: z.boolean().optional(),
});

type PrayerFormData = z.infer<typeof prayerSchema>;

const categoryIcons: Record<string, string> = {
  health: '🏥',
  family: '👨‍👩‍👧‍👦',
  financial: '💰',
  spiritual: '✝',
  career: '💼',
  relationships: '❤️',
  other: '🙏',
};

const PrayerWallPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [prayedFor, setPrayedFor] = useState<Set<string>>(new Set());

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PrayerFormData>({
    resolver: zodResolver(prayerSchema),
  });

  const filteredRequests = useMemo(() => {
    return selectedCategory === 'all'
      ? mockPrayerRequests
      : mockPrayerRequests.filter(r => r.category === selectedCategory);
  }, [selectedCategory]);

  const onSubmit = (data: PrayerFormData) => {
    console.log('Prayer request:', data);
    setIsSubmitted(true);
    setTimeout(() => { setIsSubmitted(false); reset(); }, 4000);
  };

  const handlePray = (id: string) => {
    setPrayedFor(prev => new Set(prev).add(id));
  };

  const inputStyles = {
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  };

  return (
    <>
      <HeroSection
        badge="Prayer"
        subtitle="We Pray Together"
        title="Prayer Wall"
        description="Share your prayer request and let the church family stand in agreement with you. You are never alone — we believe in the power of corporate prayer."
        primaryAction={{ label: 'Submit a Request', href: '#submit', icon: <HandHeart className="w-5 h-5" /> }}
      />

      {/* Prayer Requests Wall */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="Stand in Agreement"
            title="Community Prayer Requests"
            description="Click 'I'm Praying' to let someone know you're standing with them in prayer."
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {prayerCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="px-4 py-2 rounded-full text-xs font-accent font-medium transition-all duration-300"
                style={{
                  background: selectedCategory === cat.value ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                  color: selectedCategory === cat.value ? 'white' : 'var(--text-secondary)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Prayer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request, index) => {
              const hasPrayed = prayedFor.has(request.id);
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ background: 'var(--bg-tertiary)' }}>
                        {categoryIcons[request.category] || '🙏'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                          {request.isAnonymous ? 'Anonymous' : request.name}
                        </p>
                        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                          {formatShortDate(request.date)}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-accent capitalize"
                      style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary-500)' }}>
                      {request.category}
                    </span>
                  </div>

                  {/* Request */}
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {request.request}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                      <HandHeart className="w-3.5 h-3.5" />
                      {request.prayerCount + (hasPrayed ? 1 : 0)} people praying
                    </span>
                    <button
                      onClick={() => handlePray(request.id)}
                      disabled={hasPrayed}
                      className="text-xs font-accent font-semibold flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: hasPrayed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(59, 130, 246, 0.1)',
                        color: hasPrayed ? 'rgb(34, 197, 94)' : 'var(--color-primary-500)',
                      }}
                    >
                      {hasPrayed ? (
                        <><CheckCircle className="w-3.5 h-3.5" /> Praying</>
                      ) : (
                        <><Heart className="w-3.5 h-3.5" /> I'm Praying</>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Submit Prayer Request */}
      <section id="submit" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container max-w-2xl">
          <SectionHeading
            subtitle="Share Your Heart"
            title="Submit a Prayer Request"
            description="Your request will be shared with our prayer community (or kept anonymous if you prefer). Our team and church family will be praying for you."
          />

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-10 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                Prayer Request Submitted
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Thank you for sharing your heart. Our prayer community will be praying for you. God is faithful!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Your Name</label>
                  <input {...register('name')} placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    style={inputStyles} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
                  <input {...register('email')} type="email" placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    style={inputStyles} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Category</label>
                <select {...register('category')}
                  className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  style={inputStyles}>
                  <option value="">Select a category</option>
                  {prayerCategories.filter(c => c.value !== 'all').map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Prayer Request</label>
                <textarea {...register('request')} placeholder="Share your prayer request..." rows={5}
                  className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none"
                  style={inputStyles} />
                {errors.request && <p className="text-xs text-red-500 mt-1">{errors.request.message}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input {...register('isAnonymous')} type="checkbox" id="anon"
                  className="w-4 h-4 rounded accent-[var(--color-primary-500)]" />
                <label htmlFor="anon" className="text-sm flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                  <Shield className="w-3.5 h-3.5" /> Submit anonymously
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <Send className="w-4 h-4" /> Submit Prayer Request
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default PrayerWallPage;
