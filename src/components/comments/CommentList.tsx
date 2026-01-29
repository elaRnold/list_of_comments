import type { Comment } from '@/types/comment';
import { CommentItem } from './CommentItem';
import { EmptyState } from './EmptyState';
import styles from './CommentList.module.css';

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CommentList({ comments, isLoading, onRetry, onRemove }: CommentListProps) {
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
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onRetry={onRetry}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
