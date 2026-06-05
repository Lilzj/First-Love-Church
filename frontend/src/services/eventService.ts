import api, { unwrap } from './api';
import type { PaginationParams, PagedResult, EventListItem, EventResponse, CreateEventRequest } from '@/types/api';

export const eventService = {
  async getEvents(params?: PaginationParams & { status?: string }) {
    const res = await api.get('/events', { params });
    return unwrap<PagedResult<EventListItem>>(res);
  },

  async getEvent(id: string) {
    const res = await api.get(`/events/${id}`);
    return unwrap<EventResponse>(res);
  },

  async getUpcoming(count = 10) {
    const res = await api.get('/events/upcoming', { params: { count } });
    return unwrap<EventListItem[]>(res);
  },

  async create(data: CreateEventRequest) {
    const res = await api.post('/events', data);
    return unwrap<EventResponse>(res);
  },

  async update(id: string, data: Partial<CreateEventRequest>) {
    const res = await api.put(`/events/${id}`, data);
    return unwrap<EventResponse>(res);
  },

  async delete(id: string) {
    await api.delete(`/events/${id}`);
  },

  async getRegistrations(id: string) {
    const res = await api.get(`/events/${id}/registrations`);
    return unwrap<any[]>(res);
  },
};
