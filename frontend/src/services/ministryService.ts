import api, { unwrap } from './api';
import type { PaginationParams, PagedResult, MinistryListItem, MinistryResponse, CreateMinistryRequest } from '@/types/api';

export const ministryService = {
  async getMinistries(params?: PaginationParams) {
    const res = await api.get('/ministries', { params });
    return unwrap<PagedResult<MinistryListItem>>(res);
  },

  async getMinistry(id: string) {
    const res = await api.get(`/ministries/${id}`);
    return unwrap<MinistryResponse>(res);
  },

  async create(data: CreateMinistryRequest) {
    const res = await api.post('/ministries', data);
    return unwrap<MinistryResponse>(res);
  },

  async update(id: string, data: Partial<CreateMinistryRequest & { isActive?: boolean }>) {
    const res = await api.put(`/ministries/${id}`, data);
    return unwrap<MinistryResponse>(res);
  },

  async delete(id: string) {
    await api.delete(`/ministries/${id}`);
  },

  async addLeader(ministryId: string, data: { userId: string; role?: string }) {
    await api.post(`/ministries/${ministryId}/leaders`, data);
  },

  async addMember(ministryId: string, data: { userId: string }) {
    await api.post(`/ministries/${ministryId}/members`, data);
  },

  async getMembers(ministryId: string) {
    const res = await api.get(`/ministries/${ministryId}/members`);
    return unwrap<any[]>(res);
  },
};
