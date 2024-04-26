import z from 'zod';
const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required',
    }),
  }),
});

export const CategoryValidations = {
  categoryValidationSchema,
};
