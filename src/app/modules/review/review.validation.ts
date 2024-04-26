import z from 'zod';
const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      required_error: 'Course credentials are required.',
    }),
    rating: z.number({
      required_error: 'Rating is required.',
    }),
    review: z.string({
      required_error: 'Review is required.',
    }),
  }),
});

export const ReviewValidations = {
  reviewValidationSchema,
};
