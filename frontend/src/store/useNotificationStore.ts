import { create } from 'zustand';
import { notificationService } from '@/services/notificationService';
import type { NotificationResponse } from '@/types/api';

interface NotificationState {
  notifications: NotificationResponse[];
  unreadCount: number;
  isLoaded: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: NotificationResponse) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoaded: false,

  fetchNotifications: async () => {
    if (get().isLoaded) return;
    try {
      const [notifs, count] = await Promise.allSettled([
        notificationService.getUnread(),
        notificationService.getUnreadCount(),
      ]);
      const items = notifs.status === 'fulfilled' ? notifs.value : [];
      const unread = count.status === 'fulfilled' ? count.value : items.length;
      set({ notifications: items, unreadCount: unread, isLoaded: true });
    } catch {
      set({ isLoaded: true });
    }
  },

  markAsRead: (id) => {
    notificationService.markRead(id).catch(() => {});
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return { notifications: updated, unreadCount: Math.max(0, state.unreadCount - 1) };
    });
  },

  markAllAsRead: () => {
    notificationService.markAllRead().catch(() => {});
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
}));
