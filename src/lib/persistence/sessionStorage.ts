import type { Comment, CommentPersistence } from '@/types/comment';

const STORAGE_KEY = 'cronoss_comments';

export class SessionStoragePersistence implements CommentPersistence {
  async getAll(): Promise<Comment[]> {
    if (typeof window === 'undefined') return [];

    const data = sessionStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    try {
      const parsed = JSON.parse(data);
      // Convert date strings back to Date objects and set status
      return parsed.map((c: Comment & { createdAt: string }) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        status: 'confirmed' as const,
      }));
    } catch {
      return [];
    }
  }

  async add(comment: Comment): Promise<Comment> {
    const comments = await this.getAll();
    const newComment = { ...comment, status: 'confirmed' as const };
    comments.unshift(newComment); // Add at the beginning (newest first)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(comments));

    // Simulate network delay for realistic UX testing
    await new Promise((resolve) => setTimeout(resolve, 500));

    return newComment;
  }

  async remove(id: string): Promise<void> {
    const comments = await this.getAll();
    const filtered = comments.filter((c) => c.id !== id);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}
