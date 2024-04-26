import { z } from 'zod';
import { role } from './user.model';

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Usr name is required.',
    }),
    email: z.string({
      required_error: 'User email is required.',
    }),
    password: z.string({
      required_error: 'Password is required.',
    }),
    role: z.enum(['admin', 'user']).optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
