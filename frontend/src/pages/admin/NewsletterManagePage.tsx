import { useState } from 'react';
import { Send, Mail, Users } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { DataTable } from '@/components/admin/DataTable';
import { FormField } from '@/components/admin/FormField';
import { mockNewsletterSubscribers, mockNewsletterEmails } from '@/data/admin';
import { motion } from 'framer-motion';

const NewsletterManagePage = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const activeCount = mockNewsletterSubscribers.filter(s => s.status === 'active').length;

  const subscriberColumns = [
    { key: 'name', label: 'Name', sortable: true, render: (item: any) => <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.name || '—'}</span> },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'subscribedDate', label: 'Subscribed', sortable: true, render: (item: any) => new Date(item.subscribedDate).toLocaleDateString() },
    { key: 'status', label: 'Status', render: (item: any) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: item.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: item.status === 'active' ? '#22c55e' : '#ef4444' }}>{item.status}</span>
    )},
  ];

  const emailColumns = [
    { key: 'subject', label: 'Subject', sortable: true, render: (item: any) => <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.subject}</span> },
    { key: 'sentDate', label: 'Sent', sortable: true, render: (item: any) => item.sentDate ? new Date(item.sentDate).toLocaleDateString() : '—' },
    { key: 'recipientCount', label: 'Recipients', render: (item: any) => item.recipientCount || '—' },
    { key: 'openRate', label: 'Open Rate', render: (item: any) => item.openRate ? `${item.openRate}%` : '—' },
    { key: 'status', label: 'Status', render: (item: any) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: item.status === 'sent' ? 'rgba(34,197,94,0.1)' : 'rgba(251,191,36,0.1)', color: item.status === 'sent' ? '#22c55e' : '#fbbf24' }}>{item.status}</span>
    )},
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Newsletter Management</h1>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>Manage subscribers and send email campaigns</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Subscribers" value={mockNewsletterSubscribers.length} icon={<Users style={{ width: '20px', height: '20px' }} />} index={0} />
        <StatCard label="Active Subscribers" value={activeCount} trend={5.2} icon={<Mail style={{ width: '20px', height: '20px' }} />} index={1} />
        <StatCard label="Emails Sent" value={mockNewsletterEmails.filter(e => e.status === 'sent').length} icon={<Send style={{ width: '20px', height: '20px' }} />} index={2} />
      </div>

      {/* Compose Email */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>Compose Email</h3>
        <FormField label="Subject" value={subject} onChange={setSubject} placeholder="Email subject line..." required />
        <FormField label="Message Body" type="textarea" value={body} onChange={setBody} placeholder="Write your message..." required />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button className="btn btn-outline btn-sm">Save Draft</button>
          <button className="btn btn-primary btn-sm"><Send style={{ width: '14px', height: '14px' }} /> Send to {activeCount} subscribers</button>
        </div>
      </motion.div>

      {/* Send History */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>Send History</h3>
        <DataTable data={mockNewsletterEmails} columns={emailColumns} searchable={false} />
      </div>

      {/* Subscribers */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-accent)', color: 'var(--text-heading)', marginBottom: '16px' }}>Subscribers</h3>
        <DataTable data={mockNewsletterSubscribers} columns={subscriberColumns} searchPlaceholder="Search subscribers..." />
      </div>
    </div>
  );
};

export default NewsletterManagePage;
