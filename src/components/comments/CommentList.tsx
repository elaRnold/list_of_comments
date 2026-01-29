'use client';

import { useState } from 'react';
import type { Comment } from '@/types/comment';
import { CommentItem } from './CommentItem';
import { EmptyState } from './EmptyState';
import styles from './CommentList.module.css';

const COMMENTS_PER_PAGE = 5;

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CommentList({ comments, isLoading, onRetry, onRemove }: CommentListProps) {
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);

  const visibleComments = comments.slice(0, visibleCount);
  const hasMoreComments = comments.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + COMMENTS_PER_PAGE);
  };
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Comentarios</h3>
        <span className={styles.count}>{comments.length} comentario{comments.length !== 1 ? 's' : ''}</span>
      </div>
      <div className={styles.list}>
        {visibleComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onRetry={onRetry}
            onRemove={onRemove}
          />
        ))}
      </div>

      {hasMoreComments && (
        <div className={styles.footer}>
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Cargar más comentarios
          </button>
        </div>
      )}
    </div>
  );
}
