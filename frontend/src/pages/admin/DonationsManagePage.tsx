import { useState, useEffect, useCallback } from 'react';
import { Eye, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { StatCard } from '@/components/admin/StatCard';
import { donationService } from '@/services/donationService';
import { toast } from '@/store/useToastStore';
import type { DonationResponse, DonationSummary } from '@/types/api';
import { DollarSign, TrendingUp, Users, CreditCard } from 'lucide-react';

const DonationsManagePage = () => {
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [summary, setSummary] = useState<DonationSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewItem, setViewItem] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [donData, sumData] = await Promise.allSettled([
        donationService.getDonations({ pageSize: 100 }),
        donationService.getSummary(),
      ]);
      if (donData.status === 'fulfilled') setDonations(donData.value.items || []);
      if (sumData.status === 'fulfilled') setSummary(sumData.value);
    } catch { toast.error('Failed to load donations'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns = [
    { key: 'donorName', label: 'Donor', sortable: true, render: (item: any) => <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.isAnonymous ? 'Anonymous' : item.donorName || '—'}</span> },
    { key: 'amount', label: 'Amount', sortable: true, render: (item: any) => `₦${item.amount?.toLocaleString() || '0'}` },
    { key: 'createdAt', label: 'Date', sortable: true, render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
    { key: 'campaignTitle', label: 'Campaign', render: (item: any) => item.campaignTitle || item.projectTitle || 'General' },
    { key: 'status', label: 'Status', render: (item: any) => {
      const color = item.status === 'Completed' ? '#22c55e' : item.status === 'Failed' ? '#ef4444' : 'var(--color-gold-500)';
      return <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: `${color}15`, color }}>{item.status || 'Pending'}</span>;
    }},
  ];

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Donation Management</h1>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{donations.length} transactions</p>
      </div>

      {summary && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <StatCard label="Total Donations" value={`₦${(summary.totalDonations / 1000).toFixed(0)}K`} trend={summary.growthPercentage} icon={<DollarSign style={{ width: '20px', height: '20px' }} />} index={0} />
          <StatCard label="Total Donors" value={summary.totalDonorsCount} trend={0} icon={<Users style={{ width: '20px', height: '20px' }} />} index={1} />
          <StatCard label="This Month" value={`₦${(summary.thisMonthTotal / 1000).toFixed(0)}K`} trend={0} icon={<TrendingUp style={{ width: '20px', height: '20px' }} />} index={2} />
          <StatCard label="Transactions" value={summary.totalTransactions} trend={0} icon={<CreditCard style={{ width: '20px', height: '20px' }} />} index={3} />
        </div>
      )}

      <DataTable data={donations} columns={columns} searchPlaceholder="Search donations..."
        actions={(item: any) => (
          <button onClick={(e) => { e.stopPropagation(); setViewItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="View"><Eye style={{ width: '14px', height: '14px' }} /></button>
        )}
      />

      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Donation Details" size="lg">
        {viewItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Donor</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.isAnonymous ? 'Anonymous' : viewItem.donorName}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Amount</label><p style={{ fontSize: '18px', fontWeight: 700, color: '#22c55e', marginTop: '4px' }}>₦{viewItem.amount?.toLocaleString()}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Status</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.status}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Date</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{new Date(viewItem.createdAt).toLocaleString()}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Campaign/Project</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.campaignTitle || viewItem.projectTitle || 'General'}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Reference</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.paymentReference || '—'}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DonationsManagePage;
