import api, { unwrap } from './api';
import type {
  PaginationParams, PagedResult,
  DonationResponse, DonationSummary,
  CampaignResponse, CreateCampaignRequest,
  ProjectResponse,
} from '@/types/api';

export const donationService = {
  async getDonations(params?: PaginationParams) {
    const res = await api.get('/donations', { params });
    return unwrap<PagedResult<DonationResponse>>(res);
  },

  async getDonation(id: string) {
    const res = await api.get(`/donations/${id}`);
    return unwrap<DonationResponse>(res);
  },

  async getSummary() {
    const res = await api.get('/donations/summary');
    return unwrap<DonationSummary>(res);
  },

  async initializePayment(data: { amount: number; email: string; currency?: string; callbackUrl?: string; campaignId?: string; projectId?: string }) {
    const res = await api.post('/donations/initialize-payment', data);
    return unwrap<any>(res);
  },

  async verifyPayment(reference: string) {
    const res = await api.post('/donations/verify-payment', { reference });
    return unwrap<any>(res);
  },

  // Campaigns
  async getCampaigns(params?: PaginationParams) {
    const res = await api.get('/campaigns', { params });
    return unwrap<PagedResult<CampaignResponse>>(res);
  },

  async getCampaign(id: string) {
    const res = await api.get(`/campaigns/${id}`);
    return unwrap<CampaignResponse>(res);
  },

  async createCampaign(data: CreateCampaignRequest) {
    const res = await api.post('/campaigns', data);
    return unwrap<CampaignResponse>(res);
  },

  async updateCampaign(id: string, data: Partial<CreateCampaignRequest>) {
    const res = await api.put(`/campaigns/${id}`, data);
    return unwrap<CampaignResponse>(res);
  },

  async deleteCampaign(id: string) {
    await api.delete(`/campaigns/${id}`);
  },

  // Projects
  async getProjects(params?: PaginationParams) {
    const res = await api.get('/projects', { params });
    return unwrap<PagedResult<ProjectResponse>>(res);
  },

  async getProject(id: string) {
    const res = await api.get(`/projects/${id}`);
    return unwrap<ProjectResponse>(res);
  },

  async createProject(data: { title: string; description?: string; goalAmount?: number; imageUrl?: string }) {
    const res = await api.post('/projects', data);
    return unwrap<ProjectResponse>(res);
  },

  async updateProject(id: string, data: any) {
    const res = await api.put(`/projects/${id}`, data);
    return unwrap<ProjectResponse>(res);
  },

  async deleteProject(id: string) {
    await api.delete(`/projects/${id}`);
  },
};
