import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constants';
import { UserController } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/auth/register',
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser,
);

router.get('/auth/register', auth(USER_ROLE.admin), UserController.getAllUser);

export const UserRoute = router;
