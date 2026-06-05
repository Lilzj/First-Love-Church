import api, { unwrap } from './api';
import type { PaginationParams, PagedResult, UserProfile, AssignRoleRequest } from '@/types/api';

export const userService = {
  async getUsers(params?: PaginationParams) {
    const res = await api.get('/users', { params });
    return unwrap<PagedResult<UserProfile>>(res);
  },

  async getUser(id: string) {
    const res = await api.get(`/users/${id}`);
    return unwrap<UserProfile>(res);
  },

  async updateProfile(data: {
    firstName?: string; lastName?: string; phoneNumber?: string;
    address?: string; dateOfBirth?: string; gender?: string; bio?: string;
  }) {
    const res = await api.put('/users/profile', data);
    return unwrap<UserProfile>(res);
  },

  async assignRole(data: AssignRoleRequest) {
    await api.post('/users/assign-role', data);
  },

  async removeRole(data: AssignRoleRequest) {
    await api.post('/users/remove-role', data);
  },

  async deactivateUser(id: string) {
    await api.delete(`/users/${id}`);
  },
};
