import api, { unwrap } from './api';
import type { PaginationParams, PagedResult, BlogPostListItem, BlogPostResponse, CreateBlogPostRequest, BlogCategoryResponse } from '@/types/api';

export const blogService = {
  async getPosts(params?: PaginationParams & { categoryId?: string; status?: string }) {
    const res = await api.get('/blog', { params });
    return unwrap<PagedResult<BlogPostListItem>>(res);
  },

  async getPost(idOrSlug: string) {
    const res = await api.get(`/blog/${idOrSlug}`);
    return unwrap<BlogPostResponse>(res);
  },

  async getFeatured() {
    const res = await api.get('/blog/featured');
    return unwrap<BlogPostListItem[]>(res);
  },

  async getDrafts(params?: PaginationParams) {
    const res = await api.get('/blog/drafts', { params });
    return unwrap<PagedResult<BlogPostListItem>>(res);
  },

  async create(data: CreateBlogPostRequest) {
    const res = await api.post('/blog', data);
    return unwrap<BlogPostResponse>(res);
  },

  async update(id: string, data: Partial<CreateBlogPostRequest>) {
    const res = await api.put(`/blog/${id}`, data);
    return unwrap<BlogPostResponse>(res);
  },

  async publish(id: string) {
    await api.post(`/blog/${id}/publish`);
  },

  async delete(id: string) {
    await api.delete(`/blog/${id}`);
  },

  // Categories
  async getCategories() {
    const res = await api.get('/blog-categories');
    return unwrap<BlogCategoryResponse[]>(res);
  },

  async createCategory(data: { name: string; description?: string }) {
    const res = await api.post('/blog-categories', data);
    return unwrap<BlogCategoryResponse>(res);
  },

  async deleteCategory(id: string) {
    await api.delete(`/blog-categories/${id}`);
  },

  // Tags
  async getTags() {
    const res = await api.get('/blog-tags');
    return unwrap<any[]>(res);
  },

  async createTag(data: { name: string }) {
    const res = await api.post('/blog-tags', data);
    return unwrap<any>(res);
  },
};
