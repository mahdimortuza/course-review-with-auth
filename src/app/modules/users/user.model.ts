import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/appError';
import { TRole, TUser, UserModelForStatics } from './user.interface';

export const role: TRole[] = ['user', 'admin'];

const userSchema = new Schema<TUser, UserModelForStatics>(
  {
    username: {
      type: String,
      required: [true, 'User name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    passwordChangedAt: {
      type: Date,
    },

    role: {
      type: String,
      required: true,
      enum: role,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// check if the user exists
userSchema.pre('save', async function (next) {
  const isUserExists = await UserModel.findOne({
    username: this.username,
    email: this.email,
  });

  if (isUserExists) {
    throw new AppError(400, 'This user already exists.');
  }
  next();
});

userSchema.statics.isUserExistsByUserName = async function (username: string) {
  return await UserModel.findOne({ username }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, UserModelForStatics>('User', userSchema);
