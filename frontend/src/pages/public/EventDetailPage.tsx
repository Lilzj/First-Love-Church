import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { mockEvents } from '@/data/events';
import { formatDate, getDaysUntil } from '@/utils/formatDate';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Phone number is required'),
  numberOfGuests: z.number().min(1).max(10),
  specialRequirements: z.string().optional(),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find(e => e.id === id);
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { numberOfGuests: 1 },
  });

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Event Not Found</h2>
          <Link to="/events" className="btn btn-primary">Back to Events</Link>
        </div>
      </div>
    );
  }

  const daysUntil = getDaysUntil(event.date);
  const onSubmit = (data: RegistrationForm) => {
    console.log('Registration:', data);
    alert('Registration submitted successfully!');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-12 pb-16" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #1e3a8a 50%, #0a0e1a 100%)' }}>
        <div className="site-container">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Events
          </Link>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-accent font-semibold uppercase text-white"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>{event.category}</span>
                {event.isUpcoming && daysUntil > 0 && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-accent font-semibold uppercase"
                    style={{ background: 'rgba(59, 130, 246, 0.3)', color: 'var(--color-primary-300)' }}>
                    {daysUntil} days away
                  </span>
                )}
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
              {event.title}
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-6 text-sm text-white/80">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(event.date)}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{event.time} - {event.endTime}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{event.location}</span>
              {event.maxAttendees && (
                <span className="flex items-center gap-2"><Users className="w-4 h-4" />{event.currentAttendees}/{event.maxAttendees} registered</span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="text-sm leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: event.content }} />

              {/* Countdown */}
              {event.isUpcoming && daysUntil > 0 && (
                <div className="card p-6 mb-8">
                  <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Event Countdown</h3>
                  <div className="grid grid-cols-4 gap-3 max-w-md">
                    {[
                      { value: daysUntil, label: 'Days' },
                      { value: Math.floor(Math.random() * 24), label: 'Hours' },
                      { value: Math.floor(Math.random() * 60), label: 'Minutes' },
                      { value: Math.floor(Math.random() * 60), label: 'Seconds' },
                    ].map((item) => (
                      <div key={item.label} className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                        <span className="block text-2xl font-heading font-bold" style={{ color: 'var(--color-primary-500)' }}>{item.value}</span>
                        <span className="text-[10px] font-accent uppercase" style={{ color: 'var(--text-tertiary)' }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-3 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Share this event:</span>
                <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
                  <Share2 className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Registration Form */}
              {event.registrationRequired && (
                <div className="card p-6">
                  <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Register Now</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <input {...register('fullName')} placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <input {...register('email')} type="email" placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <input {...register('phone')} placeholder="Phone"
                        className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <input {...register('numberOfGuests', { valueAsNumber: true })} type="number" min="1" max="10" placeholder="Number of Guests"
                        className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                    </div>
                    <div>
                      <textarea {...register('specialRequirements')} placeholder="Special Requirements (optional)" rows={3}
                        className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Register</button>
                  </form>
                </div>
              )}

              {/* Contact */}
              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>Contact</h3>
                <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <p className="flex items-center gap-2"><Users className="w-4 h-4 text-[var(--color-primary-500)]" />{event.organizer}</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[var(--color-primary-500)]" />{event.contactEmail}</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--color-primary-500)]" />{event.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetailPage;
