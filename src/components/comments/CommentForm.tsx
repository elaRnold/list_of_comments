'use client';

import { useState, useEffect } from 'react';
import type { CommentInput, FormState, FormError } from '@/types/comment';
import styles from './CommentForm.module.css';

interface CommentFormProps {
  onSubmit: (input: CommentInput) => Promise<void>;
  formState: FormState;
  errors: FormError[];
}

export function CommentForm({ onSubmit, formState, errors }: CommentFormProps) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const isSubmitting = formState === 'submitting';

  const authorError = errors.find((e) => e.field === 'author')?.message;
  const contentError = errors.find((e) => e.field === 'content')?.message;
  const generalError = errors.find((e) => e.field === 'general')?.message;

  // Clear form only when submission is successful
  useEffect(() => {
    if (formState === 'success') {
      setAuthor('');
      setContent('');
    }
  }, [formState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ author, content });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Agregar comentario
      </h3>

      <div className={styles.fieldGroup}>
        <label htmlFor="author" className={styles.label}>
          Tu nombre
        </label>
        <input
          id="author"
          type="text"
          className={`${styles.input} ${authorError ? styles.inputError : ''}`}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ingresa tu nombre"
          maxLength={50}
          disabled={isSubmitting}
          aria-invalid={!!authorError}
          aria-describedby={authorError ? 'author-error' : undefined}
        />
        {authorError && (
          <p id="author-error" className={styles.errorText}>
            {authorError}
          </p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="content" className={styles.label}>
          Tu comentario
        </label>
        <textarea
          id="content"
          className={`${styles.textarea} ${contentError ? styles.inputError : ''}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comparte tus pensamientos sobre este módulo..."
          rows={4}
          maxLength={300}
          disabled={isSubmitting}
          aria-invalid={!!contentError}
          aria-describedby={contentError ? 'content-error' : undefined}
        />
        <span className={styles.charCounter}>{content.length}/300</span>
        {contentError && (
          <p id="content-error" className={styles.errorText}>
            {contentError}
          </p>
        )}
      </div>

      {generalError && (
        <div className={styles.generalError}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {generalError}
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner} />
              Publicando...
            </>
          ) : (
            'Publicar comentario'
          )}
        </button>
      </div>
    </form>
  );
}
