import api, { unwrap } from './api';
import type { WeeklyActivityResponse } from '@/types/api';

export const scheduleService = {
  async getActivities() {
    const res = await api.get('/schedule');
    return unwrap<WeeklyActivityResponse[]>(res);
  },

  async getByDay(day: number) {
    const res = await api.get(`/schedule/by-day/${day}`);
    return unwrap<WeeklyActivityResponse[]>(res);
  },

  async create(data: {
    title: string; description?: string; dayOfWeek: number;
    startTime: string; endTime: string; location?: string;
    activityType?: string; isRecurring?: boolean; leaderName?: string; imageUrl?: string; sortOrder?: number;
  }) {
    const res = await api.post('/schedule', data);
    return unwrap<WeeklyActivityResponse>(res);
  },

  async update(id: string, data: any) {
    const res = await api.put(`/schedule/${id}`, data);
    return unwrap<WeeklyActivityResponse>(res);
  },

  async delete(id: string) {
    await api.delete(`/schedule/${id}`);
  },
};
