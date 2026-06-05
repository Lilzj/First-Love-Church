import api, { unwrap } from './api';
import type {
  PaginationParams, PagedResult,
  SermonListItem, SermonResponse, CreateSermonRequest,
  SermonCategoryResponse, SermonTagResponse, SermonSeriesResponse,
} from '@/types/api';

export const sermonService = {
  async getSermons(params?: PaginationParams & { categoryId?: string; featured?: boolean }) {
    const res = await api.get('/sermons', { params });
    return unwrap<PagedResult<SermonListItem>>(res);
  },

  async getSermon(id: string) {
    const res = await api.get(`/sermons/${id}`);
    return unwrap<SermonResponse>(res);
  },

  async getFeatured() {
    const res = await api.get('/sermons/featured');
    return unwrap<SermonListItem[]>(res);
  },

  async search(q: string, params?: PaginationParams) {
    const res = await api.get('/sermons/search', { params: { q, ...params } });
    return unwrap<PagedResult<SermonListItem>>(res);
  },

  async create(data: CreateSermonRequest) {
    const res = await api.post('/sermons', data);
    return unwrap<SermonResponse>(res);
  },

  async update(id: string, data: Partial<CreateSermonRequest>) {
    const res = await api.put(`/sermons/${id}`, data);
    return unwrap<SermonResponse>(res);
  },

  async delete(id: string) {
    await api.delete(`/sermons/${id}`);
  },

  async like(id: string) {
    await api.post(`/sermons/${id}/like`);
  },

  // Categories
  async getCategories() {
    const res = await api.get('/sermon-categories');
    return unwrap<SermonCategoryResponse[]>(res);
  },

  async createCategory(data: { name: string; description?: string }) {
    const res = await api.post('/sermon-categories', data);
    return unwrap<SermonCategoryResponse>(res);
  },

  async deleteCategory(id: string) {
    await api.delete(`/sermon-categories/${id}`);
  },

  // Tags
  async getTags() {
    const res = await api.get('/sermon-tags');
    return unwrap<SermonTagResponse[]>(res);
  },

  async createTag(data: { name: string }) {
    const res = await api.post('/sermon-tags', data);
    return unwrap<SermonTagResponse>(res);
  },

  // Series
  async getSeries() {
    const res = await api.get('/sermon-series');
    return unwrap<SermonSeriesResponse[]>(res);
  },

  async createSeries(data: { title: string; description?: string; imageUrl?: string }) {
    const res = await api.post('/sermon-series', data);
    return unwrap<SermonSeriesResponse>(res);
  },
};
