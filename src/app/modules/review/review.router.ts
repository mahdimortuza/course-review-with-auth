import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constants';
import { ReviewControllers } from './review.controller';
import { ReviewValidations } from './review.validation';
const router = express.Router();

router.post(
  '/reviews',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewControllers.createReview,
);
router.get('/reviews', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
