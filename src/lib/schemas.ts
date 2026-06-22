import { z } from 'zod';

export const CreateNoteSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  body: z.string().min(10, 'Body must be at least 10 characters'),
  authorId: z.string().default('default-user'),
});

export const UpdateNoteSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    body: z.string().min(10, 'Body must be at least 10 characters').optional(),
  })
  .refine((data) => data.title !== undefined || data.body !== undefined, {
    message: 'At least one of title or body must be provided',
  });
