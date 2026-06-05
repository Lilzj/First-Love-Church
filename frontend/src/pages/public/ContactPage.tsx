import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { CHURCH_EMAIL, CHURCH_PHONE, CHURCH_ADDRESS } from '@/utils/constants';
import { serviceTimes } from '@/data/team';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const prayerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  prayerRequest: z.string().min(10, 'Please describe your prayer request'),
  isAnonymous: z.boolean().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;
type PrayerForm = z.infer<typeof prayerSchema>;

const ContactPage = () => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  const contactForm = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });
  const prayerForm = useForm<PrayerForm>({ resolver: zodResolver(prayerSchema) });

  const onContactSubmit = (data: ContactForm) => {
    console.log('Contact:', data);
    setContactSubmitted(true);
    setTimeout(() => { setContactSubmitted(false); contactForm.reset(); }, 3000);
  };

  const onPrayerSubmit = (data: PrayerForm) => {
    console.log('Prayer:', data);
    setPrayerSubmitted(true);
    setTimeout(() => { setPrayerSubmitted(false); prayerForm.reset(); }, 3000);
  };

  const inputStyles = {
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  };

  return (
    <>
      <HeroSection
        badge="Contact Us"
        subtitle="We'd Love to Hear from You"
        title="Get in Touch"
        description="Whether you have a question, need prayer, or want to plan your first visit, we're here for you."
      />

      {/* Contact Section */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-2xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>Send Us a Message</h2>
              <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {contactSubmitted ? (
                <div className="card p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. We'll respond soon.</p>
                </div>
              ) : (
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Full Name</label>
                    <input {...contactForm.register('name')} placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      style={inputStyles} />
                    {contactForm.formState.errors.name && <p className="text-xs text-red-500 mt-1">{contactForm.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
                    <input {...contactForm.register('email')} type="email" placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      style={inputStyles} />
                    {contactForm.formState.errors.email && <p className="text-xs text-red-500 mt-1">{contactForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Subject</label>
                    <input {...contactForm.register('subject')} placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      style={inputStyles} />
                    {contactForm.formState.errors.subject && <p className="text-xs text-red-500 mt-1">{contactForm.formState.errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Message</label>
                    <textarea {...contactForm.register('message')} placeholder="Your message..." rows={5}
                      className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none"
                      style={inputStyles} />
                    {contactForm.formState.errors.message && <p className="text-xs text-red-500 mt-1">{contactForm.formState.errors.message.message}</p>}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {/* Map Placeholder */}
              <div className="aspect-video rounded-xl overflow-hidden mb-8 relative"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-sm opacity-60 font-accent">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: 'Address', value: CHURCH_ADDRESS },
                  { icon: Phone, label: 'Phone', value: CHURCH_PHONE },
                  { icon: Mail, label: 'Email', value: CHURCH_EMAIL },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="card p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                      <Icon className="w-5 h-5 text-[var(--color-primary-500)]" />
                    </div>
                    <div>
                      <p className="text-xs font-accent font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Times */}
              <div className="card p-6 mt-6">
                <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-heading)' }}>
                  <Clock className="w-5 h-5 text-[var(--color-primary-500)]" /> Service Times
                </h3>
                <div className="space-y-3">
                  {serviceTimes.map((st) => (
                    <div key={st.day}>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{st.day}</p>
                      {st.services.map((s) => (
                        <p key={s.name} className="text-xs ml-4" style={{ color: 'var(--text-tertiary)' }}>{s.name}: {s.time}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="site-container max-w-2xl">
          <SectionHeading
            subtitle="Prayer"
            title="Submit a Prayer Request"
            description="We believe in the power of prayer. Share your request and our prayer team will stand with you in faith."
          />

          {prayerSubmitted ? (
            <div className="card p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>Prayer Request Submitted</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Our prayer team will be praying for you. God is faithful!</p>
            </div>
          ) : (
            <form onSubmit={prayerForm.handleSubmit(onPrayerSubmit)} className="card p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Your Name</label>
                <input {...prayerForm.register('name')} placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  style={inputStyles} />
                {prayerForm.formState.errors.name && <p className="text-xs text-red-500 mt-1">{prayerForm.formState.errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
                <input {...prayerForm.register('email')} type="email" placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  style={inputStyles} />
                {prayerForm.formState.errors.email && <p className="text-xs text-red-500 mt-1">{prayerForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Prayer Request</label>
                <textarea {...prayerForm.register('prayerRequest')} placeholder="Share your prayer request..." rows={5}
                  className="w-full px-4 py-3 rounded-lg text-sm font-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none"
                  style={inputStyles} />
                {prayerForm.formState.errors.prayerRequest && <p className="text-xs text-red-500 mt-1">{prayerForm.formState.errors.prayerRequest.message}</p>}
              </div>
              <div className="flex items-center gap-2">
                <input {...prayerForm.register('isAnonymous')} type="checkbox" id="anonymous"
                  className="w-4 h-4 rounded accent-[var(--color-primary-500)]" />
                <label htmlFor="anonymous" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Submit anonymously</label>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                <MessageCircle className="w-4 h-4" /> Submit Prayer Request
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactPage;
