import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { FormField } from '@/components/admin/FormField';
import { eventService } from '@/services/eventService';
import { toast } from '@/store/useToastStore';
import type { EventListItem } from '@/types/api';

const EventsManagePage = () => {
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formType, setFormType] = useState('');
  const [formContactEmail, setFormContactEmail] = useState('');

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getEvents({ pageSize: 100 });
      setEvents(data.items || []);
    } catch {
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const resetForm = () => {
    setFormTitle(''); setFormDesc(''); setFormStartDate(''); setFormEndDate('');
    setFormLocation(''); setFormAddress(''); setFormType(''); setFormContactEmail('');
  };

  const openEdit = (item: any) => {
    setFormTitle(item.title || '');
    setFormDesc(item.description || '');
    setFormStartDate(item.startDate?.split('T')[0] || '');
    setFormEndDate(item.endDate?.split('T')[0] || '');
    setFormLocation(item.location || '');
    setFormAddress(item.address || '');
    setFormType(item.eventType || '');
    setFormContactEmail(item.contactEmail || '');
    setEditItem(item);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        title: formTitle,
        description: formDesc || undefined,
        startDate: formStartDate,
        endDate: formEndDate || undefined,
        location: formLocation || undefined,
        address: formAddress || undefined,
        eventType: formType || undefined,
        contactEmail: formContactEmail || undefined,
      };
      if (editItem) {
        await eventService.update(editItem.id, payload);
        toast.success('Event updated');
        setEditItem(null);
      } else {
        await eventService.create(payload);
        toast.success('Event created');
        setIsAddOpen(false);
      }
      resetForm();
      await fetchEvents();
    } catch (err: any) {
      toast.error('Failed to save', err.response?.data?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await eventService.delete(deleteItem.id);
      toast.success('Event deleted');
      setDeleteItem(null);
      await fetchEvents();
    } catch { toast.error('Failed to delete event'); }
  };

  const columns = [
    { key: 'title', label: 'Title', sortable: true, render: (item: any) => <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.title}</span> },
    { key: 'startDate', label: 'Date', sortable: true, render: (item: any) => new Date(item.startDate).toLocaleDateString() },
    { key: 'location', label: 'Location', render: (item: any) => item.location || '—' },
    { key: 'status', label: 'Status', render: (item: any) => {
      const color = item.status === 'Active' ? '#22c55e' : item.status === 'Cancelled' ? '#ef4444' : 'var(--text-tertiary)';
      return <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: `${color}15`, color }}>{item.status || 'Active'}</span>;
    }},
    { key: 'registrationCount', label: 'Registrations', sortable: true },
  ];

  const formContent = (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
      <FormField label="Title" value={formTitle} onChange={setFormTitle} placeholder="Event title..." required />
      <FormField label="Event Type" type="select" value={formType} onChange={setFormType} options={[
        { label: 'Worship', value: 'Worship' }, { label: 'Conference', value: 'Conference' }, { label: 'Youth', value: 'Youth' },
        { label: 'Outreach', value: 'Outreach' }, { label: 'Fellowship', value: 'Fellowship' }, { label: 'Prayer', value: 'Prayer' },
        { label: 'Special', value: 'Special' }, { label: 'Training', value: 'Training' },
      ]} />
      <FormField label="Start Date" type="date" value={formStartDate} onChange={setFormStartDate} required />
      <FormField label="End Date" type="date" value={formEndDate} onChange={setFormEndDate} />
      <FormField label="Location" value={formLocation} onChange={setFormLocation} placeholder="Church hall..." />
      <FormField label="Contact Email" type="email" value={formContactEmail} onChange={setFormContactEmail} placeholder="contact@..." />
      <div style={{ gridColumn: '1 / -1' }}><FormField label="Address" value={formAddress} onChange={setFormAddress} placeholder="Full address..." /></div>
      <div style={{ gridColumn: '1 / -1' }}><FormField label="Description" type="textarea" value={formDesc} onChange={setFormDesc} placeholder="Event details..." /></div>
    </div>
  );

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Event Management</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{events.length} events</p>
        </div>
        <button onClick={() => { resetForm(); setIsAddOpen(true); }} className="btn btn-primary btn-sm"><Plus style={{ width: '16px', height: '16px' }} /> Add Event</button>
      </div>

      <DataTable data={events} columns={columns} searchPlaceholder="Search events..."
        actions={(item: any) => (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <button onClick={(e) => { e.stopPropagation(); setViewItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="View"><Eye style={{ width: '14px', height: '14px' }} /></button>
            <button onClick={(e) => { e.stopPropagation(); openEdit(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Edit"><Edit style={{ width: '14px', height: '14px' }} /></button>
            <button onClick={(e) => { e.stopPropagation(); setDeleteItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="Delete"><Trash2 style={{ width: '14px', height: '14px' }} /></button>
          </div>
        )}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Event" size="lg" footer={<><button className="btn btn-outline btn-sm" onClick={() => setIsAddOpen(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Event'}</button></>}>{formContent}</Modal>
      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Event" size="lg" footer={<><button className="btn btn-outline btn-sm" onClick={() => setEditItem(null)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Updating...' : 'Update Event'}</button></>}>{formContent}</Modal>
      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Event Details" size="lg">
        {viewItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label><p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '4px' }}>{viewItem.title}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{new Date(viewItem.startDate).toLocaleDateString()}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.location || '—'}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.status || 'Active'}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Registrations</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.registrationCount || 0}</p></div>
            </div>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label><p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.6 }}>{viewItem.description || 'No description'}</p></div>
          </div>
        )}
      </Modal>
      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete Event" size="sm" footer={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteItem(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: '13px' }} onClick={handleDelete}>Delete</button></>}>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Are you sure you want to delete <strong style={{ color: 'var(--text-heading)' }}>"{deleteItem?.title}"</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default EventsManagePage;
