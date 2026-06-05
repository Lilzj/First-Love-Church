import api, { unwrap } from './api';
import type { PaginationParams, PagedResult, LiveStreamResponse, CreateLiveStreamRequest } from '@/types/api';

export const livestreamService = {
  async getStreams(params?: PaginationParams) {
    const res = await api.get('/livestreams', { params });
    return unwrap<PagedResult<LiveStreamResponse>>(res);
  },

  async getStream(id: string) {
    const res = await api.get(`/livestreams/${id}`);
    return unwrap<LiveStreamResponse>(res);
  },

  async getLive() {
    const res = await api.get('/livestreams/live');
    return unwrap<LiveStreamResponse[]>(res);
  },

  async getUpcoming() {
    const res = await api.get('/livestreams/upcoming');
    return unwrap<LiveStreamResponse[]>(res);
  },

  async create(data: CreateLiveStreamRequest) {
    const res = await api.post('/livestreams', data);
    return unwrap<LiveStreamResponse>(res);
  },

  async startStream(id: string) {
    await api.post(`/livestreams/${id}/start`);
  },

  async endStream(id: string) {
    await api.post(`/livestreams/${id}/end`);
  },

  async delete(id: string) {
    await api.delete(`/livestreams/${id}`);
  },
};
