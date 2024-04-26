import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/appError';
import { UserModel } from '../users/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exists
  const user = await UserModel.isUserExistsByUserName(payload?.username);
  if (!user) {
    throw new AppError(404, 'This user is not found');
  }
  //   checking if the password is correct
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
    // letting the user login using access token and refresh token.
    throw new AppError(404, 'Password did not matched.');

  // create token and send to the client
  const jwtPayload = {
    userName: user.username,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '20d',
  });

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // checking if the user exists
  const user = await UserModel.isUserExistsByUserName(userData.userName);
  if (!user) {
    throw new AppError(404, 'This user is not found');
  }
  //   checking if the password is correct
  if (
    !(await UserModel.isPasswordMatched(
      payload.currentPassword,
      user?.password,
    ))
  )
    // letting the user login using access token and refresh token.
    throw new AppError(404, 'Password did not matched.');

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await UserModel.findOneAndUpdate(
    {
      userName: userData.username,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
