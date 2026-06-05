import { useState, useEffect, useCallback, useRef } from 'react';
import { Trash2, Upload, Loader2, FolderPlus, Image } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { FormField } from '@/components/admin/FormField';
import { mediaService } from '@/services/mediaService';
import { toast } from '@/store/useToastStore';
import type { MediaFileResponse, AlbumResponse } from '@/types/api';

const GalleryManagePage = () => {
  const [files, setFiles] = useState<MediaFileResponse[]>([]);
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDesc, setAlbumDesc] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [filesData, albumsData] = await Promise.allSettled([
        mediaService.getFiles({ pageSize: 100 }),
        mediaService.getAlbums({ pageSize: 50 }),
      ]);
      if (filesData.status === 'fulfilled') setFiles(filesData.value.items || []);
      if (albumsData.status === 'fulfilled') setAlbums(albumsData.value.items || []);
    } catch { toast.error('Failed to load gallery'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;
    setIsUploading(true);
    try {
      if (selectedFiles.length === 1) {
        await mediaService.uploadFile(selectedFiles[0], selectedAlbum || undefined);
      } else {
        await mediaService.uploadMultiple(Array.from(selectedFiles), selectedAlbum || undefined);
      }
      toast.success(`${selectedFiles.length} file(s) uploaded`);
      await fetchData();
    } catch { toast.error('Upload failed'); }
    finally { setIsUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  const handleCreateAlbum = async () => {
    try {
      await mediaService.createAlbum({ title: albumTitle, description: albumDesc || undefined });
      toast.success('Album created');
      setIsAlbumOpen(false); setAlbumTitle(''); setAlbumDesc('');
      await fetchData();
    } catch { toast.error('Failed to create album'); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try { await mediaService.deleteFile(deleteItem.id); toast.success('File deleted'); setDeleteItem(null); await fetchData(); }
    catch { toast.error('Failed to delete file'); }
  };

  const columns = [
    { key: 'originalFileName', label: 'File Name', sortable: true, render: (item: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {item.fileType?.startsWith('image') ? (
          <img src={item.fileUrl} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image style={{ width: '16px', height: '16px', color: 'var(--text-tertiary)' }} /></div>
        )}
        <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.originalFileName}</span>
      </div>
    )},
    { key: 'fileType', label: 'Type', render: (item: any) => item.fileType || '—' },
    { key: 'fileSize', label: 'Size', render: (item: any) => `${(item.fileSize / 1024).toFixed(1)} KB` },
    { key: 'albumTitle', label: 'Album', render: (item: any) => item.albumTitle || '—' },
    { key: 'createdAt', label: 'Uploaded', sortable: true, render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
  ];

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>Gallery Management</h1>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{files.length} files · {albums.length} albums</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setIsAlbumOpen(true)} className="btn btn-outline btn-sm"><FolderPlus style={{ width: '16px', height: '16px' }} /> New Album</button>
          <label className="btn btn-primary btn-sm" style={{ cursor: isUploading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Upload style={{ width: '16px', height: '16px' }} /> {isUploading ? 'Uploading...' : 'Upload Files'}
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*" onChange={handleUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Album filter */}
      {albums.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button onClick={() => setSelectedAlbum('')} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-accent)', border: '1px solid var(--border-color)', background: !selectedAlbum ? 'var(--color-primary-500)' : 'transparent', color: !selectedAlbum ? 'white' : 'var(--text-secondary)', cursor: 'pointer' }}>All</button>
          {albums.map((a) => (
            <button key={a.id} onClick={() => setSelectedAlbum(a.id)} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-accent)', border: '1px solid var(--border-color)', background: selectedAlbum === a.id ? 'var(--color-primary-500)' : 'transparent', color: selectedAlbum === a.id ? 'white' : 'var(--text-secondary)', cursor: 'pointer' }}>{a.title}</button>
          ))}
        </div>
      )}

      <DataTable data={selectedAlbum ? files.filter(f => f.albumId === selectedAlbum) : files} columns={columns} searchPlaceholder="Search files..."
        actions={(item: any) => (
          <button onClick={(e) => { e.stopPropagation(); setDeleteItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="Delete"><Trash2 style={{ width: '14px', height: '14px' }} /></button>
        )}
      />

      <Modal isOpen={isAlbumOpen} onClose={() => setIsAlbumOpen(false)} title="Create Album" size="sm" footer={<><button className="btn btn-outline btn-sm" onClick={() => setIsAlbumOpen(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleCreateAlbum}>Create</button></>}>
        <FormField label="Album Title" value={albumTitle} onChange={setAlbumTitle} placeholder="Album name..." required />
        <FormField label="Description" type="textarea" value={albumDesc} onChange={setAlbumDesc} placeholder="Optional description..." />
      </Modal>

      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete File" size="sm" footer={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteItem(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: '13px' }} onClick={handleDelete}>Delete</button></>}>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>Delete <strong style={{ color: 'var(--text-heading)' }}>"{deleteItem?.originalFileName}"</strong>?</p>
      </Modal>
    </div>
  );
};

export default GalleryManagePage;
