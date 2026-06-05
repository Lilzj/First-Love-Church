import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Eye, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { prayerService } from '@/services/prayerService';
import { toast } from '@/store/useToastStore';
import type { PrayerRequestResponse } from '@/types/api';

const PrayerManagePage = () => {
  const [requests, setRequests] = useState<PrayerRequestResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewItem, setViewItem] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try { const data = await prayerService.getAll({ pageSize: 100 }); setRequests(data.items || []); }
    catch { toast.error('Failed to load prayer requests'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleModerate = async (id: string, status: string) => {
    try { await prayerService.moderate(id, { status }); toast.success(`Prayer request ${status.toLowerCase()}`); await fetchData(); }
    catch { toast.error('Failed to moderate'); }
  };

  const columns = [
    { key: 'content', label: 'Request', render: (item: any) => <span style={{ maxWidth: '300px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{item.content}</span> },
    { key: 'requestedBy', label: 'From', render: (item: any) => item.isAnonymous ? 'Anonymous' : item.requestedBy || '—' },
    { key: 'prayerCount', label: 'Prayers', sortable: true },
    { key: 'status', label: 'Status', render: (item: any) => {
      const color = item.status === 'Approved' ? '#22c55e' : item.status === 'Rejected' ? '#ef4444' : '#eab308';
      return <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: `${color}15`, color }}>{item.status || 'Pending'}</span>;
    }},
    { key: 'createdAt', label: 'Date', sortable: true, render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
  ];

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Prayer Requests</h1>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{requests.length} requests · {requests.filter(r => r.status === 'Pending').length} pending</p>
      </div>

      <DataTable data={requests} columns={columns} searchPlaceholder="Search prayer requests..."
        actions={(item: any) => (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <button onClick={(e) => { e.stopPropagation(); setViewItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="View"><Eye style={{ width: '14px', height: '14px' }} /></button>
            {item.status === 'Pending' && <>
              <button onClick={(e) => { e.stopPropagation(); handleModerate(item.id, 'Approved'); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', cursor: 'pointer' }} title="Approve"><CheckCircle style={{ width: '14px', height: '14px' }} /></button>
              <button onClick={(e) => { e.stopPropagation(); handleModerate(item.id, 'Rejected'); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="Reject"><XCircle style={{ width: '14px', height: '14px' }} /></button>
            </>}
          </div>
        )}
      />

      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Prayer Request" size="md">
        {viewItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>From</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.isAnonymous ? 'Anonymous' : viewItem.requestedBy || '—'}</p></div>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Request</label><p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.7 }}>{viewItem.content}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Status</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.status}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Prayers</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.prayerCount}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Date</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{new Date(viewItem.createdAt).toLocaleDateString()}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PrayerManagePage;
