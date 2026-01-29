import type { CommentPersistence } from '@/types/comment';
import { SupabasePersistence, isSupabaseConfigured } from './supabase';
import { SessionStoragePersistence } from './sessionStorage';

// Factory function to get persistence implementation
export function createPersistence(): CommentPersistence {
  if (isSupabaseConfigured) {
    return new SupabasePersistence();
  }
  // Fallback to sessionStorage if Supabase is not configured
  return new SessionStoragePersistence();
}

export { isSupabaseConfigured };
export type { CommentPersistence };
