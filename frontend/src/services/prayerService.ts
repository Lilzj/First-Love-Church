import api, { unwrap } from './api';
import type { PaginationParams, PagedResult, PrayerRequestResponse } from '@/types/api';

export const prayerService = {
  async getAll(params?: PaginationParams & { status?: string }) {
    const res = await api.get('/prayer-requests', { params });
    return unwrap<PagedResult<PrayerRequestResponse>>(res);
  },

  async getPrayerWall(params?: PaginationParams) {
    const res = await api.get('/prayer-requests/prayer-wall', { params });
    return unwrap<PagedResult<PrayerRequestResponse>>(res);
  },

  async submit(data: { title?: string; content: string; requestedBy?: string; isAnonymous?: boolean; isPublic?: boolean }) {
    const res = await api.post('/prayer-requests', data);
    return unwrap<PrayerRequestResponse>(res);
  },

  async moderate(id: string, data: { status: string; adminNotes?: string }) {
    await api.put(`/prayer-requests/${id}/moderate`, data);
  },

  async pray(id: string) {
    await api.post(`/prayer-requests/${id}/pray`);
  },
};
