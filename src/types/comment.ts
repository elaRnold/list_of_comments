// Status for tracking optimistic updates
export type CommentStatus = 'confirmed' | 'pending' | 'error';

// Core comment interface
export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  status: CommentStatus;
}

// Form input type (before ID/date assignment)
export interface CommentInput {
  author: string;
  content: string;
}

// Form submission states
export type FormState = 'idle' | 'submitting' | 'success' | 'error';

// Error type for form handling
export interface FormError {
  field: 'author' | 'content' | 'general';
  message: string;
}

// Persistence layer interface (abstraction for storage backends)
export interface CommentPersistence {
  getAll(): Promise<Comment[]>;
  add(comment: Comment): Promise<Comment>;
  remove(id: string): Promise<void>;
}

// Hook return types
export interface UseCommentsReturn {
  comments: Comment[];
  formState: FormState;
  errors: FormError[];
  addComment: (input: CommentInput) => Promise<void>;
  retryComment: (id: string) => Promise<void>;
  removeFailedComment: (id: string) => void;
  isLoading: boolean;
}
