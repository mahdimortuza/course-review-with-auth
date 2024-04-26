import z from 'zod';

const tagsValidationSchema = z.object({
  name: z.string({
    required_error: 'Tag names are required is required.',
  }),
  isDeleted: z.boolean().default(false).optional(),
});

const detailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string({
    required_error: 'Description is required.',
  }),
});

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required.',
    }),
    instructor: z.string({
      required_error: 'Instructor name is required',
    }),
    categoryId: z.string({
      required_error: 'Category is required',
    }),
    price: z.number({
      required_error: 'Price is required.',
    }),
    tags: z.array(tagsValidationSchema),
    startDate: z.string({
      required_error: 'Starting date is required.',
    }),
    endDate: z.string({
      required_error: 'Ending date is required.',
    }),
    language: z.string({
      required_error: 'Language is required.',
    }),
    provider: z.string({
      required_error: 'Provider name is required.',
    }),
    durationInWeeks: z.number().optional(),
    details: detailsValidationSchema,
  }),
});

// this portion si for updating data into the database by the client side
const updateTagsValidationSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateDetailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagsValidationSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    durationInWeeks: z.number().optional(),
    details: updateDetailsValidationSchema.optional(),
  }),
});
export const CourseValidations = {
  courseValidationSchema,
  updateCourseValidationSchema,
};
