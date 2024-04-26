import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constants';
import { CategoryControllers } from './category.controller';
import { CategoryValidations } from './category.validation';
const route = express.Router();

route.post(
  '/categories',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidations.categoryValidationSchema),
  CategoryControllers.createCategory,
);
route.get('/categories', CategoryControllers.getAllCategory);

export const CategoryRoutes = route;
