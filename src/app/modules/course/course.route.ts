import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constants';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/courses',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.courseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/courses', CourseControllers.getAllCourses);

router.put(
  '/courses/:courseId',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateACourse,
);

// getting course by id with review
// router.get('/courses/:courseId/reviews', CourseControllers.getCourseWithReview);

export const CourseRoutes = router;
