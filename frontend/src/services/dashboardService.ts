import api, { unwrap } from './api';
import type { DashboardSummary } from '@/types/api';

export const dashboardService = {
  async getSummary() {
    const res = await api.get('/dashboard/summary');
    return unwrap<DashboardSummary>(res);
  },
};
