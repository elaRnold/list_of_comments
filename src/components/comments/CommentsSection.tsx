'use client';

import { useState, useEffect, useCallback } from 'react';
import { useComments } from '@/hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { Toast } from '../ui/Toast';
import styles from './CommentsSection.module.css';

export function CommentsSection() {
  const [showToast, setShowToast] = useState(false);

  const {
    comments,
    formState,
    errors,
    addComment,
    retryComment,
    removeFailedComment,
    isLoading,
  } = useComments();

  // Show toast when comment is successfully submitted
  useEffect(() => {
    if (formState === 'success') {
      setShowToast(true);
    }
  }, [formState]);

  const handleCloseToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Discusión del módulo</h2>
        <p className={styles.subtitle}>Dominio de Next.js</p>
      </header>

      <CommentForm
        onSubmit={addComment}
        formState={formState}
        errors={errors}
      />

      <CommentList
        comments={comments}
        isLoading={isLoading}
        onRetry={retryComment}
        onRemove={removeFailedComment}
      />

      <Toast
        message="Comentario publicado correctamente"
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </section>
  );
}
