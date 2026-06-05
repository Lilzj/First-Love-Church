import api, { unwrap } from './api';
import type { PaginationParams, PagedResult, MediaFileResponse, MediaUploadResponse, AlbumResponse, CreateAlbumRequest } from '@/types/api';

export const mediaService = {
  async getFiles(params?: PaginationParams & { fileType?: string; albumId?: string }) {
    const res = await api.get('/media', { params });
    return unwrap<PagedResult<MediaFileResponse>>(res);
  },

  async uploadFile(file: File, albumId?: string, description?: string) {
    const formData = new FormData();
    formData.append('file', file);
    const params: Record<string, string> = {};
    if (albumId) params.albumId = albumId;
    if (description) params.description = description;
    const res = await api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params,
    });
    return unwrap<MediaUploadResponse>(res);
  },

  async uploadMultiple(files: File[], albumId?: string) {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    const res = await api.post('/media/upload-multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: albumId ? { albumId } : undefined,
    });
    return unwrap<MediaUploadResponse[]>(res);
  },

  async deleteFile(id: string) {
    await api.delete(`/media/${id}`);
  },

  // Albums
  async getAlbums(params?: PaginationParams) {
    const res = await api.get('/albums', { params });
    return unwrap<PagedResult<AlbumResponse>>(res);
  },

  async getAlbum(id: string) {
    const res = await api.get(`/albums/${id}`);
    return unwrap<AlbumResponse>(res);
  },

  async createAlbum(data: CreateAlbumRequest) {
    const res = await api.post('/albums', data);
    return unwrap<AlbumResponse>(res);
  },

  async updateAlbum(id: string, data: Partial<CreateAlbumRequest>) {
    const res = await api.put(`/albums/${id}`, data);
    return unwrap<AlbumResponse>(res);
  },

  async deleteAlbum(id: string) {
    await api.delete(`/albums/${id}`);
  },
};
