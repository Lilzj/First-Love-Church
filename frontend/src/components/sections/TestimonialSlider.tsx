import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import type { Testimonial } from '@/types/team';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-20"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={testimonial.id}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="card p-6 md:p-8 h-full flex flex-col"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm" style={{ color: 'var(--color-gold-400)' }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <div className="relative mb-6 flex-1">
              <Quote className="w-8 h-8 mb-3 opacity-20 text-[var(--color-primary-400)]" />
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {testimonial.quote}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}
              >
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                  {testimonial.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
