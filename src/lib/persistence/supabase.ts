import { createClient } from '@supabase/supabase-js';
import type { Comment, CommentPersistence } from '@/types/comment';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create Supabase client only if configured
const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Database row type
interface CommentRow {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

// Map from database row to Comment
function mapFromDb(row: CommentRow): Comment {
  return {
    id: row.id,
    author: row.author,
    content: row.content,
    createdAt: new Date(row.created_at),
    status: 'confirmed',
  };
}

// Map from Comment to database row
function mapToDb(comment: Comment): Omit<CommentRow, 'created_at'> & { created_at?: string } {
  return {
    id: comment.id,
    author: comment.author,
    content: comment.content,
    created_at: comment.createdAt.toISOString(),
  };
}

export class SupabasePersistence implements CommentPersistence {
  async getAll(): Promise<Comment[]> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch comments: ${error.message}`);
    }

    return (data || []).map(mapFromDb);
  }

  async add(comment: Comment): Promise<Comment> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { data, error } = await supabase
      .from('comments')
      .insert(mapToDb(comment))
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to add comment: ${error.message}`);
    }

    return mapFromDb(data);
  }

  async remove(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to remove comment: ${error.message}`);
    }
  }
}
