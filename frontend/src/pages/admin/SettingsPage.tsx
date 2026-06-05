import { useState } from 'react';
import { Save, Globe, Palette, Share2, Search } from 'lucide-react';
import { FormField } from '@/components/admin/FormField';
import { CHURCH_NAME, CHURCH_EMAIL, CHURCH_PHONE, CHURCH_ADDRESS, SOCIAL_LINKS } from '@/utils/constants';
import { motion } from 'framer-motion';

const TABS = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'seo', label: 'SEO', icon: Search },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [churchName, setChurchName] = useState(CHURCH_NAME);
  const [email, setEmail] = useState(CHURCH_EMAIL);
  const [phone, setPhone] = useState(CHURCH_PHONE);
  const [address, setAddress] = useState(CHURCH_ADDRESS);
  const [facebook, setFacebook] = useState(SOCIAL_LINKS.facebook);
  const [instagram, setInstagram] = useState(SOCIAL_LINKS.instagram);
  const [youtube, setYoutube] = useState(SOCIAL_LINKS.youtube);
  const [twitter, setTwitter] = useState(SOCIAL_LINKS.twitter);
  const [seoTitle, setSeoTitle] = useState('First Love Church — Where Love Finds You');
  const [seoDesc, setSeoDesc] = useState('A vibrant, Spirit-filled community of believers passionate about worship, discipleship, and reaching the lost with the love of Christ.');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Settings</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>Configure your church website</p>
        </div>
        <button className="btn btn-primary btn-sm"><Save style={{ width: '16px', height: '16px' }} /> Save Changes</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '13px', fontFamily: 'var(--font-accent)', fontWeight: 500,
              color: activeTab === tab.id ? 'var(--color-primary-400)' : 'var(--text-secondary)',
              background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? 'var(--color-primary-500)' : 'transparent'}`,
              cursor: 'pointer', transition: 'all 0.15s', marginBottom: '-1px',
            }}
          >
            <tab.icon style={{ width: '16px', height: '16px' }} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', maxWidth: '640px' }}
      >
        {activeTab === 'general' && (
          <>
            <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>Church Profile</h3>
            <FormField label="Church Name" value={churchName} onChange={setChurchName} required />
            <FormField label="Email" type="email" value={email} onChange={setEmail} required />
            <FormField label="Phone" value={phone} onChange={setPhone} required />
            <FormField label="Address" type="textarea" value={address} onChange={setAddress} required />
            <FormField label="Tagline" value="Where Love Finds You" placeholder="Church tagline..." />
            <FormField label="Service Times" type="textarea" value="Sunday: 8:00 AM & 10:30 AM&#10;Wednesday: 6:00 PM&#10;Friday: 6:00 PM" placeholder="Service schedule..." />
          </>
        )}

        {activeTab === 'branding' && (
          <>
            <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>Branding</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Church Logo</label>
              <div style={{ width: '120px', height: '120px', borderRadius: '16px', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color: 'white', fontSize: '20px', fontWeight: 700 }}>✝</div>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-accent)', color: 'var(--text-tertiary)' }}>Upload Logo</span>
                </div>
              </div>
            </div>
            <FormField label="Primary Color" value="#3b82f6" placeholder="#3b82f6" />
            <FormField label="Theme" type="select" options={[{label:'Dark Mode',value:'dark'},{label:'Light Mode',value:'light'},{label:'System',value:'system'}]} />
          </>
        )}

        {activeTab === 'social' && (
          <>
            <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>Social Media Links</h3>
            <FormField label="Facebook" type="url" value={facebook} onChange={setFacebook} placeholder="https://facebook.com/..." />
            <FormField label="Instagram" type="url" value={instagram} onChange={setInstagram} placeholder="https://instagram.com/..." />
            <FormField label="YouTube" type="url" value={youtube} onChange={setYoutube} placeholder="https://youtube.com/..." />
            <FormField label="Twitter / X" type="url" value={twitter} onChange={setTwitter} placeholder="https://x.com/..." />
          </>
        )}

        {activeTab === 'seo' && (
          <>
            <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>SEO Settings</h3>
            <FormField label="Page Title" value={seoTitle} onChange={setSeoTitle} placeholder="Page title for search engines" />
            <FormField label="Meta Description" type="textarea" value={seoDesc} onChange={setSeoDesc} placeholder="Description for search engines (160 chars recommended)" />
            <FormField label="Keywords" placeholder="church, worship, community, faith, Lagos" />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SettingsPage;
