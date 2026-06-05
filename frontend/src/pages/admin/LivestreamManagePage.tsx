import { useState, useEffect, useCallback } from 'react';
import { Plus, Play, Square, Trash2, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { FormField } from '@/components/admin/FormField';
import { livestreamService } from '@/services/livestreamService';
import { toast } from '@/store/useToastStore';
import type { LiveStreamResponse } from '@/types/api';

const LivestreamManagePage = () => {
  const [streams, setStreams] = useState<LiveStreamResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formPlatform, setFormPlatform] = useState('YouTube');
  const [formScheduled, setFormScheduled] = useState('');

  const fetchStreams = useCallback(async () => {
    setIsLoading(true);
    try { const data = await livestreamService.getStreams({ pageSize: 100 }); setStreams(data.items || []); }
    catch { toast.error('Failed to load streams'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchStreams(); }, [fetchStreams]);

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      await livestreamService.create({ title: formTitle, description: formDesc || undefined, streamUrl: formUrl, platform: formPlatform, scheduledAt: formScheduled || undefined });
      toast.success('Stream scheduled');
      setIsAddOpen(false); setFormTitle(''); setFormDesc(''); setFormUrl(''); setFormScheduled('');
      await fetchStreams();
    } catch (err: any) { toast.error('Failed to create', err.response?.data?.message); }
    finally { setIsSaving(false); }
  };

  const handleStart = async (id: string) => {
    try { await livestreamService.startStream(id); toast.success('Stream started'); await fetchStreams(); }
    catch { toast.error('Failed to start stream'); }
  };

  const handleEnd = async (id: string) => {
    try { await livestreamService.endStream(id); toast.success('Stream ended'); await fetchStreams(); }
    catch { toast.error('Failed to end stream'); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try { await livestreamService.delete(deleteItem.id); toast.success('Stream deleted'); setDeleteItem(null); await fetchStreams(); }
    catch { toast.error('Failed to delete'); }
  };

  const columns = [
    { key: 'title', label: 'Title', sortable: true, render: (item: any) => <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.title}</span> },
    { key: 'platform', label: 'Platform', render: (item: any) => item.platform || 'YouTube' },
    { key: 'scheduledAt', label: 'Scheduled', sortable: true, render: (item: any) => item.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : '—' },
    { key: 'status', label: 'Status', render: (item: any) => {
      const color = item.status === 'Live' ? '#ef4444' : item.status === 'Completed' ? 'var(--text-tertiary)' : '#22c55e';
      return <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: `${color}15`, color }}>{item.status === 'Live' ? '🔴 Live' : item.status || 'Scheduled'}</span>;
    }},
    { key: 'viewerCount', label: 'Viewers', sortable: true },
  ];

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Livestream Management</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{streams.length} streams</p>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="btn btn-primary btn-sm"><Plus style={{ width: '16px', height: '16px' }} /> Schedule Stream</button>
      </div>

      <DataTable data={streams} columns={columns} searchPlaceholder="Search streams..."
        actions={(item: any) => (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            {item.status !== 'Live' && item.status !== 'Completed' && (
              <button onClick={(e) => { e.stopPropagation(); handleStart(item.id); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', cursor: 'pointer' }} title="Go Live"><Play style={{ width: '14px', height: '14px' }} /></button>
            )}
            {item.status === 'Live' && (
              <button onClick={(e) => { e.stopPropagation(); handleEnd(item.id); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="End Stream"><Square style={{ width: '14px', height: '14px' }} /></button>
            )}
            <button onClick={(e) => { e.stopPropagation(); setDeleteItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="Delete"><Trash2 style={{ width: '14px', height: '14px' }} /></button>
          </div>
        )}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Schedule Livestream" size="lg" footer={<><button className="btn btn-outline btn-sm" onClick={() => setIsAddOpen(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleCreate} disabled={isSaving}>{isSaving ? 'Saving...' : 'Schedule'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Title" value={formTitle} onChange={setFormTitle} placeholder="Stream title..." required />
          <FormField label="Platform" type="select" value={formPlatform} onChange={setFormPlatform} options={[{ label: 'YouTube', value: 'YouTube' }, { label: 'Facebook', value: 'Facebook' }, { label: 'Website', value: 'Website' }]} />
          <FormField label="Stream URL" type="url" value={formUrl} onChange={setFormUrl} placeholder="https://..." required />
          <FormField label="Scheduled Date" type="datetime-local" value={formScheduled} onChange={setFormScheduled} />
          <div style={{ gridColumn: '1 / -1' }}><FormField label="Description" type="textarea" value={formDesc} onChange={setFormDesc} placeholder="Stream description..." /></div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete Stream" size="sm" footer={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteItem(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: '13px' }} onClick={handleDelete}>Delete</button></>}>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>Delete <strong style={{ color: 'var(--text-heading)' }}>"{deleteItem?.title}"</strong>?</p>
      </Modal>
    </div>
  );
};

export default LivestreamManagePage;
