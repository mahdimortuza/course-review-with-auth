import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'User is created successfully!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  console.log('test', req.user);
  const result = await UserServices.getAllUsersFromDB();

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'Users are retrieved successfully!',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
};
