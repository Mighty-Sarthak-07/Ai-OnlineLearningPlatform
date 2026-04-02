'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

/**
 * Wrap the app (or workspace layout) with this to get global notifications.
 * Provides: { notifications, addNotification, markAllRead, clearAll, unreadCount }
 */
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ emoji, title, message, color = 'violet' }) => {
    setNotifications(prev => [
      {
        id: Date.now() + Math.random(),
        emoji,
        title,
        message,
        color,
        read: false,
        createdAt: new Date(),
      },
      ...prev,
    ].slice(0, 50)); // cap at 50
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllRead, markRead, clearAll, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used inside <NotificationProvider>');
  return ctx;
}
