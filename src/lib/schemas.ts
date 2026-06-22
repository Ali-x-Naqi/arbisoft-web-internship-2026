import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

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
