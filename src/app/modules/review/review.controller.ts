import catchAsync from '../../utils/catchAsync';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  res.status(200).json({
    result: true,
    statusCode: 201,
    message: 'Review is created successfully.',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  res.status(200).json({
    success: true,
    message: 'Reviews are retrieved successfully!',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
};
