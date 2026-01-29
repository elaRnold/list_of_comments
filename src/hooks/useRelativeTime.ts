'use client';

import { useState, useEffect } from 'react';
import { formatRelativeTime } from '@/lib/utils/formatRelativeTime';

export function useRelativeTime(date: Date): string {
  const [relativeTime, setRelativeTime] = useState(() => formatRelativeTime(date));

  useEffect(() => {
    // Update immediately in case the initial render was on the server
    setRelativeTime(formatRelativeTime(date));

    // Update every minute for "just now" -> "1 minute ago" transitions
    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return relativeTime;
}
