/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constants';

export type TRole = 'user' | 'admin';

export interface TUser {
  username: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: TRole;
}

export interface UserModelForStatics extends Model<TUser> {
  isUserExistsByUserName(username: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
