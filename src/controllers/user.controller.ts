import { NextFunction, Request, Response } from 'express';
import { getUser, getAllUser } from '../services/user.services';
import { User } from '../types/user.type';

const DEFAULT_PAGINATION_PAGE = 1;
const DEFAULT_PAGINATION_SIZE = 10;

// Method to handle user creation
// export const createdUserHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | undefined> => {
//   try {
//     const user: User = await createUser(req.body);
//     return res.status(201).send(user);
//   } catch (error) {
//     next(error);
//   }
// };

// Method to Handle user fetching
export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user: User | null = await getUser(req.params.id);

    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send();
  } catch (error) {
    next(error);
  }
};

// method to get all user
export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const page =
      (req.query.page && parseInt(req.query.page.toString())) ||
      DEFAULT_PAGINATION_PAGE;
    const size =
      (req.query.size && parseInt(req.query.size.toString())) ||
      DEFAULT_PAGINATION_SIZE;

    const users: Array<User> = await getAllUser({ page, size });
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
