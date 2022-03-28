import jwt from 'jsonwebtoken';
import {
  AuthenticationFailedException,
  UserExistExecption,
} from '../exceptions';
import UserModel, { IUserDB } from '../models/user.model';
import transform, { transformAuthUser } from '../transformers/user.trasnformer';
import { Pagination } from '../types/blog.type';
import {
  AuthUser,
  User,
  UserCreateInput,
  UserLoginInput,
} from '../types/user.type';

const ttl = process.env.JWT_TTL || 10000;
const jwetPrivateKey = process.env.JWT_PRIVATE_KEY || 'privateKey';

// Create a user in the database convert the result to the User type and send it back to the controller
export const createUser = async (userInput: UserCreateInput): Promise<User> => {
  const isUserExists = await UserModel.exists({
    email: userInput.email,
  });

  if (isUserExists) {
    throw new UserExistExecption(userInput.email);
  }
  const user: IUserDB = await UserModel.create(userInput);
  return transform(user);
};

// Fetch a user from database convert it to the User type and send it back to the controller
export const getUser = async (id: string): Promise<User | null> => {
  const user: IUserDB | null = await UserModel.findById(id);
  if (!user) {
    return null;
  }
  return transform(user);
};

// fetch all user
export const getAllUser = async (
  pagination: Pagination
): Promise<Array<User>> => {
  const users: Array<IUserDB> = await UserModel.find()
    .limit(pagination.size)
    .skip((pagination.page - 1) * pagination.size)
    .populate('');
  return users.map((blog) => transform(blog));
};

// check the user login
// if username and password match then return jwt token
export const login = async (loginInput: UserLoginInput): Promise<AuthUser> => {
  const { email, password } = loginInput;
  const user: IUserDB | null = await UserModel.findOne({ email });
  if (!user) {
    throw new AuthenticationFailedException(['Incorrect username or password']);
  }

  const isPasswordMatching = await user.comparePassword(password);
  if (!isPasswordMatching) {
    throw new AuthenticationFailedException(['Incorrect username or password']);
  }

  const token = jwt.sign({ id: user._id }, jwetPrivateKey, {
    expiresIn: ttl,
  });
  return transformAuthUser(user, token);
};

// check if user sign up
// if the user creation is successful then return a JWT token
export const signUp = async (
  signUpInput: UserCreateInput
): Promise<AuthUser> => {
  const isUserExists = await UserModel.exists({ email: signUpInput.email });
  if (isUserExists) {
    throw new UserExistExecption(signUpInput.email);
  }

  const user: IUserDB = await UserModel.create(signUpInput);
  const token = jwt.sign({ id: user._id }, jwetPrivateKey, {
    expiresIn: ttl,
  });
  return transformAuthUser(user, token);
};
