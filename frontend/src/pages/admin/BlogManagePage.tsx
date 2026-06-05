import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Eye, Send, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { FormField } from '@/components/admin/FormField';
import { blogService } from '@/services/blogService';
import { toast } from '@/store/useToastStore';
import type { BlogPostListItem } from '@/types/api';

const BlogManagePage = () => {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formStatus, setFormStatus] = useState('Draft');

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await blogService.getPosts({ pageSize: 100 });
      setPosts(data.items || []);
    } catch { toast.error('Failed to load blog posts'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const resetForm = () => { setFormTitle(''); setFormExcerpt(''); setFormContent(''); setFormStatus('Draft'); };

  const openEdit = (item: any) => {
    setFormTitle(item.title || ''); setFormExcerpt(item.excerpt || '');
    setFormContent(item.content || ''); setFormStatus(item.status || 'Draft');
    setEditItem(item);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { title: formTitle, excerpt: formExcerpt || undefined, content: formContent || undefined, status: formStatus };
      if (editItem) { await blogService.update(editItem.id, payload); toast.success('Post updated'); setEditItem(null); }
      else { await blogService.create(payload); toast.success('Post created'); setIsAddOpen(false); }
      resetForm(); await fetchPosts();
    } catch (err: any) { toast.error('Failed to save', err.response?.data?.message); }
    finally { setIsSaving(false); }
  };

  const handlePublish = async (id: string) => {
    try { await blogService.publish(id); toast.success('Post published'); await fetchPosts(); }
    catch { toast.error('Failed to publish'); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try { await blogService.delete(deleteItem.id); toast.success('Post deleted'); setDeleteItem(null); await fetchPosts(); }
    catch { toast.error('Failed to delete post'); }
  };

  const columns = [
    { key: 'title', label: 'Title', sortable: true, render: (item: any) => <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.title}</span> },
    { key: 'authorName', label: 'Author', sortable: true },
    { key: 'createdAt', label: 'Date', sortable: true, render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
    { key: 'status', label: 'Status', render: (item: any) => {
      const color = item.status === 'Published' ? '#22c55e' : '#eab308';
      return <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: `${color}15`, color }}>{item.status || 'Draft'}</span>;
    }},
    { key: 'viewCount', label: 'Views', sortable: true },
  ];

  const formContent2 = (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
      <FormField label="Title" value={formTitle} onChange={setFormTitle} placeholder="Post title..." required />
      <FormField label="Status" type="select" value={formStatus} onChange={setFormStatus} options={[{ label: 'Draft', value: 'Draft' }, { label: 'Published', value: 'Published' }]} />
      <div style={{ gridColumn: '1 / -1' }}><FormField label="Excerpt" type="textarea" value={formExcerpt} onChange={setFormExcerpt} placeholder="Brief summary..." /></div>
      <div style={{ gridColumn: '1 / -1' }}><FormField label="Content" type="textarea" value={formContent} onChange={setFormContent} placeholder="Full article content..." /></div>
    </div>
  );

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Blog Management</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{posts.length} posts</p>
        </div>
        <button onClick={() => { resetForm(); setIsAddOpen(true); }} className="btn btn-primary btn-sm"><Plus style={{ width: '16px', height: '16px' }} /> New Post</button>
      </div>

      <DataTable data={posts} columns={columns} searchPlaceholder="Search posts..."
        actions={(item: any) => (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            {item.status === 'Draft' && (
              <button onClick={(e) => { e.stopPropagation(); handlePublish(item.id); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', cursor: 'pointer' }} title="Publish"><Send style={{ width: '14px', height: '14px' }} /></button>
            )}
            <button onClick={(e) => { e.stopPropagation(); setViewItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="View"><Eye style={{ width: '14px', height: '14px' }} /></button>
            <button onClick={(e) => { e.stopPropagation(); openEdit(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Edit"><Edit style={{ width: '14px', height: '14px' }} /></button>
            <button onClick={(e) => { e.stopPropagation(); setDeleteItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="Delete"><Trash2 style={{ width: '14px', height: '14px' }} /></button>
          </div>
        )}
      />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Blog Post" size="lg" footer={<><button className="btn btn-outline btn-sm" onClick={() => setIsAddOpen(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Post'}</button></>}>{formContent2}</Modal>
      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Blog Post" size="lg" footer={<><button className="btn btn-outline btn-sm" onClick={() => setEditItem(null)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Updating...' : 'Update Post'}</button></>}>{formContent2}</Modal>
      <Modal isOpen={!!viewItem} onClose={() => setViewItem(null)} title="Post Details" size="lg">
        {viewItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Title</label><p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '4px' }}>{viewItem.title}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Author</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.authorName}</p></div>
              <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Status</label><p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px' }}>{viewItem.status}</p></div>
            </div>
            <div><label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Excerpt</label><p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.6 }}>{viewItem.excerpt || 'No excerpt'}</p></div>
          </div>
        )}
      </Modal>
      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete Post" size="sm" footer={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteItem(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: '13px' }} onClick={handleDelete}>Delete</button></>}>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Are you sure you want to delete <strong style={{ color: 'var(--text-heading)' }}>"{deleteItem?.title}"</strong>?</p>
      </Modal>
    </div>
  );
};

export default BlogManagePage;
