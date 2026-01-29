'use client';

import { useComments } from '@/hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import styles from './CommentsSection.module.css';

export function CommentsSection() {
  const {
    comments,
    formState,
    errors,
    addComment,
    retryComment,
    removeFailedComment,
    isLoading,
  } = useComments();

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
    </section>
  );
}
