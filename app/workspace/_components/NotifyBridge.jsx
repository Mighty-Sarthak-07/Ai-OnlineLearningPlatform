'use client';

import { useEffect } from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { setNotifyDispatcher } from '@/lib/notify';

/**
 * Invisible bridge: registers the NotificationContext's addNotification
 * function into the module-level notify.jsx dispatcher so that
 * notify.chapterDone() etc. can push to the nav panel from anywhere.
 */
export default function NotifyBridge() {
  const { addNotification } = useNotifications();

  useEffect(() => {
    setNotifyDispatcher(addNotification);
    return () => setNotifyDispatcher(null);
  }, [addNotification]);

  return null;
}
