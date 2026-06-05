import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { CTASection } from '@/components/sections/CTASection';
import { MinistryCard } from '@/components/cards/MinistryCard';
import { mockMinistries } from '@/data/ministries';
import { Heart } from 'lucide-react';

const MinistriesPage = () => {
  return (
    <>
      <HeroSection
        badge="Ministries"
        subtitle="Serve with Purpose"
        title="Find Your Place in God's Kingdom"
        description="Every believer has a God-given gift. Our ministries provide opportunities for you to grow, serve, and make an impact in the body of Christ."
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="site-container">
          <SectionHeading
            subtitle="Get Involved"
            title="Our Ministries"
            description="Whether you're called to worship, youth, outreach, or any other area of service, there's a place for you here."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMinistries.map((ministry, index) => (
              <MinistryCard key={ministry.id} ministry={ministry} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Serve?"
        description="God has gifted you for a purpose. Connect with a ministry leader today and discover where you can serve."
        primaryAction={{ label: 'Contact Us', href: '/contact', icon: <Heart className="w-5 h-5" /> }}
        variant="spiritual"
      />
    </>
  );
};

export default MinistriesPage;
