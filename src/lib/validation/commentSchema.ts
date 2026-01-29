import { z } from 'zod';

// Comment input validation schema
export const commentInputSchema = z.object({
  author: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre debe tener menos de 50 caracteres')
    .trim(),
  content: z
    .string()
    .min(1, 'El comentario es requerido')
    .min(3, 'El comentario debe tener al menos 3 caracteres')
    .max(1000, 'El comentario debe tener menos de 1000 caracteres')
    .trim(),
});

// Type inference from schema
export type CommentInputSchema = z.infer<typeof commentInputSchema>;

// Validation result type
export type ValidationResult =
  | { success: true; data: CommentInputSchema }
  | { success: false; errors: { field: string; message: string }[] };

// Validation function with formatted errors
export function validateCommentInput(input: unknown): ValidationResult {
  const result = commentInputSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map((issue) => ({
    field: issue.path[0] as string,
    message: issue.message,
  }));

  return { success: false, errors };
}
