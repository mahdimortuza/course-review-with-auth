import { Schema, model } from 'mongoose';
import AppError from '../../errors/appError';
import { TCourse, TDetails, TTags } from './course.interface';

const tagSchema = new Schema<TTags>({
  name: {
    type: String,
    required: [true, 'Tags are required.'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced'],
    },
    required: [true, 'Level is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    unique: true,
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required.'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Category id is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  tags: {
    type: [tagSchema],
    required: [true, 'Tags are required.'],
  },
  startDate: {
    type: String,
    required: [true, 'Start date is required.'],
  },
  endDate: {
    type: String,
    required: [true, 'End date is required.'],
  },
  language: {
    type: String,
    required: [true, 'Language is required.'],
  },
  provider: {
    type: String,
    required: [true, 'Provider name is required.'],
  },
  durationInWeeks: {
    type: Number,
    required: false,
  },
  details: {
    type: detailsSchema,
    required: [true, 'Detail is required.'],
  },
});

courseSchema.pre('save', async function (next) {
  const isCourseExists = await CourseModel.findOne({
    title: this.title,
  });
  if (isCourseExists) {
    throw new AppError(404, 'This course already exists.');
  }
  next();
});

courseSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isCourseExists = await CourseModel.findOne(query);
  if (!isCourseExists) {
    throw new AppError(404, 'This course dose not exist.');
  }
  next();
});

export const CourseModel = model<TCourse>('course', courseSchema);
