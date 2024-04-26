import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'Course is created successfully!',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    statusCode: 200,

    message: 'Courses are retrieved successfully!',
    data: result,
  });
});

const updateACourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const course = req.body;
  const result = await CourseServices.updateACourseIntoDB(courseId, course);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course is updated successfully!',
    data: result,
  });
});

// getting single course by id with review
// const getCourseWithReview = catchAsync(async (req, res) => {
//   const ccourseWithReview = req.params;
//   const result = await CourseServices.
// });

export const CourseControllers = {
  createCourse,
  getAllCourses,
  updateACourse,
  // getCourseWithReview,
};
