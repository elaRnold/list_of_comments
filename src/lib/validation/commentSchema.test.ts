import { describe, it, expect } from 'vitest';
import { validateCommentInput, commentInputSchema } from './commentSchema';

describe('commentInputSchema', () => {
  describe('author field', () => {
    it('should reject empty author', () => {
      const result = validateCommentInput({ author: '', content: 'Valid content' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.some((e) => e.field === 'author')).toBe(true);
      }
    });

    it('should reject author with less than 2 characters', () => {
      const result = validateCommentInput({ author: 'A', content: 'Valid content' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0].message).toContain('2 caracteres');
      }
    });

    it('should reject author with more than 50 characters', () => {
      const result = validateCommentInput({
        author: 'A'.repeat(51),
        content: 'Valid content',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0].message).toContain('50 caracteres');
      }
    });

    it('should trim whitespace from author', () => {
      const result = validateCommentInput({
        author: '  John Doe  ',
        content: 'Valid content',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.author).toBe('John Doe');
      }
    });
  });

  describe('content field', () => {
    it('should reject empty content', () => {
      const result = validateCommentInput({ author: 'John', content: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.some((e) => e.field === 'content')).toBe(true);
      }
    });

    it('should reject content with less than 3 characters', () => {
      const result = validateCommentInput({ author: 'John', content: 'AB' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0].message).toContain('3 caracteres');
      }
    });

    it('should reject content with more than 1000 characters', () => {
      const result = validateCommentInput({
        author: 'John',
        content: 'A'.repeat(1001),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0].message).toContain('1000 caracteres');
      }
    });

    it('should trim whitespace from content', () => {
      const result = validateCommentInput({
        author: 'John',
        content: '  Hello world  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.content).toBe('Hello world');
      }
    });
  });

  describe('valid inputs', () => {
    it('should accept valid author and content', () => {
      const result = validateCommentInput({
        author: 'John Doe',
        content: 'This is a valid comment',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.author).toBe('John Doe');
        expect(result.data.content).toBe('This is a valid comment');
      }
    });

    it('should accept minimum valid lengths', () => {
      const result = validateCommentInput({
        author: 'Jo',
        content: 'Abc',
      });
      expect(result.success).toBe(true);
    });

    it('should accept maximum valid lengths', () => {
      const result = validateCommentInput({
        author: 'A'.repeat(50),
        content: 'A'.repeat(1000),
      });
      expect(result.success).toBe(true);
    });
  });

  describe('invalid input types', () => {
    it('should reject non-object input', () => {
      const result = validateCommentInput('invalid');
      expect(result.success).toBe(false);
    });

    it('should reject null input', () => {
      const result = validateCommentInput(null);
      expect(result.success).toBe(false);
    });

    it('should reject missing fields', () => {
      const result = validateCommentInput({});
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThanOrEqual(2);
      }
    });
  });
});
