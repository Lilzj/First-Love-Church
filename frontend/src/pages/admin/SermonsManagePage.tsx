import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { FormField } from '@/components/admin/FormField';
import { sermonService } from '@/services/sermonService';
import { toast } from '@/store/useToastStore';
import type { SermonListItem, SermonCategoryResponse } from '@/types/api';

const SermonsManagePage = () => {
  const [sermons, setSermons] = useState<SermonListItem[]>([]);
  const [categories, setCategories] = useState<SermonCategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formSpeaker, setFormSpeaker] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formVideo, setFormVideo] = useState('');
  const [formAudio, setFormAudio] = useState('');

  const fetchSermons = useCallback(async () => {
    setIsLoading(true);
    try {
      const [sermonsData, catsData] = await Promise.all([
        sermonService.getSermons({ pageSize: 100 }),
        sermonService.getCategories(),
      ]);
      setSermons(sermonsData.items || []);
      setCategories(catsData || []);
    } catch {
      toast.error('Failed to load sermons');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchSermons(); }, [fetchSermons]);

  const resetForm = () => {
    setFormTitle(''); setFormSpeaker(''); setFormDate(''); setFormCategory('');
    setFormDesc(''); setFormVideo(''); setFormAudio('');
  };

  const openEdit = async (item: any) => {
    setFormTitle(item.title || '');
    setFormSpeaker(item.speakerName || '');
    setFormDate(item.date?.split('T')[0] || '');
    setFormCategory(item.categoryId || '');
    setFormDesc(item.description || '');
    setFormVideo(item.videoUrl || '');
    setFormAudio(item.audioUrl || '');
    setEditItem(item);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        title: formTitle,
        description: formDesc,
        videoUrl: formVideo || undefined,
        audioUrl: formAudio || undefined,
        date: formDate || undefined,
        categoryId: formCategory || undefined,
      };

      if (editItem) {
        await sermonService.update(editItem.id, payload);
        toast.success('Sermon updated');
        setEditItem(null);
      } else {
        await sermonService.create(payload);
        toast.success('Sermon created');
        setIsAddOpen(false);
      }
      resetForm();
      await fetchSermons();
    } catch (err: any) {
      toast.error('Failed to save', err.response?.data?.message || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await sermonService.delete(deleteItem.id);
      toast.success('Sermon deleted');
      setDeleteItem(null);
      await fetchSermons();
    } catch {
      toast.error('Failed to delete sermon');
    }
  };

  const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }));

  const columns = [
    { key: 'title', label: 'Title', sortable: true, render: (item: any) => (
      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.title}</span>
    )},
    { key: 'speakerName', label: 'Speaker', sortable: true, render: (item: any) => item.speakerName || '—' },
    { key: 'date', label: 'Date', sortable: true, render: (item: any) => item.date ? new Date(item.date).toLocaleDateString() : '—' },
    { key: 'categoryName', label: 'Category', render: (item: any) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: 'rgba(59,130,246,0.1)', color: 'var(--color-primary-400)' }}>
        {item.categoryName || 'Uncategorized'}
      </span>
    )},
    { key: 'viewCount', label: 'Views', sortable: true },
  ];

  const formContent = (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
      <FormField label="Title" value={formTitle} onChange={setFormTitle} placeholder="Sermon title..." required />
      <FormField label="Speaker" value={formSpeaker} onChange={setFormSpeaker} placeholder="Speaker name..." />
      <FormField label="Date" type="date" value={formDate} onChange={setFormDate} />
      <FormField label="Category" type="select" value={formCategory} onChange={setFormCategory} options={categoryOptions} />
      <div style={{ gridColumn: '1 / -1' }}><FormField label="Description" type="textarea" value={formDesc} onChange={setFormDesc} placeholder="Sermon description..." /></div>
      <FormField label="Video URL" type="url" value={formVideo} onChange={setFormVideo} placeholder="https://youtube.com/..." />
      <FormField label="Audio URL" type="url" value={formAudio} onChange={setFormAudio} placeholder="https://..." />
    </div>
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Sermon Management</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{sermons.length} sermons</p>
        </div>
        <button onClick={() => { resetForm(); setIsAddOpen(true); }} className="btn btn-primary btn-sm">
          <Plus style={{ width: '16px', height: '16px' }} /> Add Sermon
        </button>
      </div>

      <DataTable
        data={sermons}
        columns={columns}
        searchPlaceholder="Search sermons..."
        actions={(item: any) => (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <button onClick={(e) => { e.stopPropagation(); setViewItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="View">
              <Eye style={{ width: '14px', height: '14px' }} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); openEdit(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Edit">
              <Edit style={{ width: '14px', height: '14px' }} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setDeleteItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="Delete">
              <Trash2 style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        )}
      />

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Sermon" size="lg"
        footer={<><button className="btn btn-outline btn-sm" onClick={() => setIsAddOpen(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Sermon'}</button></>}
      >{formContent}</Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Sermon" size="lg"
        footer={<><button className="btn btn-outline btn-sm" onClick={() => setEditItem(null)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Updating...' : 'Update Sermon'}</button></>}
      >{formContent}</Modal>

      {/* View Modal */}
      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Sermon Details" size="lg">
        {viewItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label><p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '4px' }}>{viewItem.title}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Speaker</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.speakerName || '—'}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.date ? new Date(viewItem.date).toLocaleDateString() : '—'}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.categoryName || '—'}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Views</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.viewCount || 0}</p></div>
            </div>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label><p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.6 }}>{viewItem.description || 'No description'}</p></div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete Sermon" size="sm"
        footer={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteItem(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: '13px' }} onClick={handleDelete}>Delete</button></>}
      >
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-heading)' }}>"{deleteItem?.title}"</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default SermonsManagePage;
