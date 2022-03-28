import { IUserDB } from '../models/user.model';
import { AuthUser, User } from '../types/user.type';

const transform = (user: IUserDB): User => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const transformAuthUser = (user: IUserDB, token: string): AuthUser => {
  return {
    id: user._id.toString(),
    token,
  };
};

export default transform;
