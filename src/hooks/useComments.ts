'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Comment, CommentInput, FormState, FormError, UseCommentsReturn } from '@/types/comment';
import { createPersistence } from '@/lib/persistence';
import { validateCommentInput } from '@/lib/validation/commentSchema';

export function useComments(): UseCommentsReturn {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FormError[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load comments on mount
  useEffect(() => {
    const loadComments = async () => {
      try {
        const persistence = createPersistence();
        const loadedComments = await persistence.getAll();
        setComments(loadedComments);
      } catch (error) {
        console.error('Failed to load comments:', error);
        setErrors([{ field: 'general', message: 'Error al cargar comentarios' }]);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, []);

  // Add comment with optimistic UI
  const addComment = useCallback(async (input: CommentInput) => {
    // Clear previous errors
    setErrors([]);

    // Validate input with Zod
    const validation = validateCommentInput(input);
    if (!validation.success) {
      setErrors(
        validation.errors.map((e) => ({
          field: e.field as 'author' | 'content' | 'general',
          message: e.message,
        }))
      );
      return;
    }

    setFormState('submitting');

    // Create optimistic comment
    const optimisticComment: Comment = {
      id: crypto.randomUUID(),
      author: validation.data.author,
      content: validation.data.content,
      createdAt: new Date(),
      status: 'pending',
    };

    // Add to state immediately (optimistic)
    setComments((prev) => [optimisticComment, ...prev]);

    try {
      const persistence = createPersistence();
      await persistence.add(optimisticComment);

      // Update status to confirmed
      setComments((prev) =>
        prev.map((c) =>
          c.id === optimisticComment.id ? { ...c, status: 'confirmed' as const } : c
        )
      );

      setFormState('success');

      // Reset to idle after a short delay
      setTimeout(() => setFormState('idle'), 100);
    } catch (error) {
      console.error('Failed to save comment:', error);

      // Update status to error
      setComments((prev) =>
        prev.map((c) =>
          c.id === optimisticComment.id ? { ...c, status: 'error' as const } : c
        )
      );

      setFormState('error');
      setErrors([{ field: 'general', message: 'Error al guardar el comentario. Intenta de nuevo.' }]);
    }
  }, []);

  // Retry failed comment
  const retryComment = useCallback(async (id: string) => {
    const comment = comments.find((c) => c.id === id && c.status === 'error');
    if (!comment) return;

    // Update status to pending
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'pending' as const } : c))
    );

    try {
      const persistence = createPersistence();
      await persistence.add({ ...comment, status: 'confirmed' });

      // Update status to confirmed
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: 'confirmed' as const } : c))
      );

      setErrors([]);
    } catch (error) {
      console.error('Retry failed:', error);

      // Revert to error status
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: 'error' as const } : c))
      );

      setErrors([{ field: 'general', message: 'Error al guardar el comentario. Intenta de nuevo.' }]);
    }
  }, [comments]);

  // Remove failed comment
  const removeFailedComment = useCallback((id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    comments,
    formState,
    errors,
    addComment,
    retryComment,
    removeFailedComment,
    isLoading,
  };
}
