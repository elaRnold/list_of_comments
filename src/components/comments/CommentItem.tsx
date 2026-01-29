'use client';

import type { Comment } from '@/types/comment';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import styles from './CommentItem.module.css';

interface CommentItemProps {
  comment: Comment;
  onRetry?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function CommentItem({ comment, onRetry, onRemove }: CommentItemProps) {
  const relativeTime = useRelativeTime(comment.createdAt);
  const formattedDate = comment.createdAt.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const isPending = comment.status === 'pending';
  const isError = comment.status === 'error';

  return (
    <article
      className={`${styles.comment} ${isPending ? styles.pending : ''} ${isError ? styles.error : ''}`}
    >
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <span className={styles.author}>{comment.author}</span>
          {isPending && (
            <span className={`${styles.statusBadge} ${styles.pendingBadge}`}>
              <span className={styles.spinner} />
              Guardando...
            </span>
          )}
          {isError && (
            <span className={`${styles.statusBadge} ${styles.errorBadge}`}>
              Error
            </span>
          )}
        </div>
        <span className={styles.timestamp}>{formattedDate} · {relativeTime}</span>
      </div>

      <p className={styles.content}>{comment.content}</p>

      <span className={styles.timestampMobile}>{formattedDate} · {relativeTime}</span>

      {isError && (
        <div className={styles.errorActions}>
          <button
            type="button"
            className={styles.retryButton}
            onClick={() => onRetry?.(comment.id)}
          >
            Reintentar
          </button>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => onRemove?.(comment.id)}
          >
            Descartar
          </button>
        </div>
      )}
    </article>
  );
}
