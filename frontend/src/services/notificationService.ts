import api, { unwrap } from './api';
import type { NotificationResponse, PaginationParams, PagedResult } from '@/types/api';

export const notificationService = {
  async getNotifications(params?: PaginationParams) {
    const res = await api.get('/notifications', { params });
    return unwrap<PagedResult<NotificationResponse>>(res);
  },

  async getUnread() {
    const res = await api.get('/notifications/unread');
    return unwrap<NotificationResponse[]>(res);
  },

  async getUnreadCount() {
    const res = await api.get('/notifications/unread-count');
    return unwrap<number>(res);
  },

  async markRead(id: string) {
    await api.put(`/notifications/${id}/read`);
  },

  async markAllRead() {
    await api.put('/notifications/read-all');
  },
};
