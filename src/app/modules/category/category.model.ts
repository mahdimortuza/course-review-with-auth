import { Schema, model } from 'mongoose';
import AppError from '../../errors/appError';
import { TCategoryName } from './category.interface';

const categorySchema = new Schema<TCategoryName>({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    unique: true,
  },
});

categorySchema.pre('save', async function (next) {
  const isCategoryExists = await CategoryModel.findOne({
    name: this.name,
  });
  if (isCategoryExists) {
    throw new AppError(404, 'This category already exits.');
  }
  next();
});

export const CategoryModel = model<TCategoryName>('category', categorySchema);
