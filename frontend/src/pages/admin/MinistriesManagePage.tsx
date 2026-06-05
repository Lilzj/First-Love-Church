import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { FormField } from '@/components/admin/FormField';
import { ministryService } from '@/services/ministryService';
import { toast } from '@/store/useToastStore';
import type { MinistryListItem } from '@/types/api';

const MinistriesManagePage = () => {
  const [ministries, setMinistries] = useState<MinistryListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formMission, setFormMission] = useState('');
  const [formSchedule, setFormSchedule] = useState('');
  const [formEmail, setFormEmail] = useState('');

  const fetchMinistries = useCallback(async () => {
    setIsLoading(true);
    try { const data = await ministryService.getMinistries({ pageSize: 100 }); setMinistries(data.items || []); }
    catch { toast.error('Failed to load ministries'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchMinistries(); }, [fetchMinistries]);

  const resetForm = () => { setFormName(''); setFormDesc(''); setFormMission(''); setFormSchedule(''); setFormEmail(''); };

  const openEdit = (item: any) => { setFormName(item.name || ''); setFormDesc(item.description || ''); setFormMission(item.mission || ''); setFormSchedule(item.meetingSchedule || ''); setFormEmail(item.contactEmail || ''); setEditItem(item); };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { name: formName, description: formDesc || undefined, mission: formMission || undefined, meetingSchedule: formSchedule || undefined, contactEmail: formEmail || undefined };
      if (editItem) { await ministryService.update(editItem.id, payload); toast.success('Ministry updated'); setEditItem(null); }
      else { await ministryService.create(payload); toast.success('Ministry created'); setIsAddOpen(false); }
      resetForm(); await fetchMinistries();
    } catch (err: any) { toast.error('Failed to save', err.response?.data?.message); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try { await ministryService.delete(deleteItem.id); toast.success('Ministry deleted'); setDeleteItem(null); await fetchMinistries(); }
    catch { toast.error('Failed to delete'); }
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true, render: (item: any) => <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.name}</span> },
    { key: 'memberCount', label: 'Members', sortable: true },
    { key: 'isActive', label: 'Status', render: (item: any) => <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: item.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: item.isActive ? '#22c55e' : '#ef4444' }}>{item.isActive ? 'Active' : 'Inactive'}</span> },
  ];

  const formContent = (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
      <FormField label="Name" value={formName} onChange={setFormName} placeholder="Ministry name..." required />
      <FormField label="Contact Email" type="email" value={formEmail} onChange={setFormEmail} placeholder="contact@..." />
      <FormField label="Meeting Schedule" value={formSchedule} onChange={setFormSchedule} placeholder="e.g. Every Sunday 4pm" />
      <div style={{ gridColumn: '1 / -1' }}><FormField label="Description" type="textarea" value={formDesc} onChange={setFormDesc} placeholder="About this ministry..." /></div>
      <div style={{ gridColumn: '1 / -1' }}><FormField label="Mission" type="textarea" value={formMission} onChange={setFormMission} placeholder="Ministry mission statement..." /></div>
    </div>
  );

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Ministry Management</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{ministries.length} ministries</p>
        </div>
        <button onClick={() => { resetForm(); setIsAddOpen(true); }} className="btn btn-primary btn-sm"><Plus style={{ width: '16px', height: '16px' }} /> Add Ministry</button>
      </div>

      <DataTable data={ministries} columns={columns} searchPlaceholder="Search ministries..."
        actions={(item: any) => (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <button onClick={(e) => { e.stopPropagation(); setViewItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }}><Eye style={{ width: '14px', height: '14px' }} /></button>
            <button onClick={(e) => { e.stopPropagation(); openEdit(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }}><Edit style={{ width: '14px', height: '14px' }} /></button>
            <button onClick={(e) => { e.stopPropagation(); setDeleteItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }}><Trash2 style={{ width: '14px', height: '14px' }} /></button>
          </div>
        )}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Ministry" size="lg" footer={<><button className="btn btn-outline btn-sm" onClick={() => setIsAddOpen(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button></>}>{formContent}</Modal>
      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Ministry" size="lg" footer={<><button className="btn btn-outline btn-sm" onClick={() => setEditItem(null)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Updating...' : 'Update'}</button></>}>{formContent}</Modal>
      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Ministry Details" size="lg">
        {viewItem && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Name</label><p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '4px' }}>{viewItem.name}</p></div>
          <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Description</label><p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>{viewItem.description || '—'}</p></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Members</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.memberCount}</p></div>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Status</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.isActive ? 'Active' : 'Inactive'}</p></div>
          </div>
        </div>}
      </Modal>
      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete Ministry" size="sm" footer={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteItem(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: '13px' }} onClick={handleDelete}>Delete</button></>}>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>Delete <strong style={{ color: 'var(--text-heading)' }}>"{deleteItem?.name}"</strong>?</p>
      </Modal>
    </div>
  );
};

export default MinistriesManagePage;
