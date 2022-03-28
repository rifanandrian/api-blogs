import { Router } from 'express';
import {
  getAllUsersHandler,
  getUserHandler,
} from '../controllers/user.controller';
import { authenticate, validate } from '../middlewares';
import { getUserSchema } from '../schemas/user.schema';

const userRouter = Router();

// Route to create a user
// userRouter.post('/', validate(createUserSchema), createdUserHandler);

// Route to fetch a user
userRouter.get('/:id', validate(getUserSchema), getUserHandler);

// route to get all the users
userRouter.get('/', authenticate, getAllUsersHandler);

export default userRouter;
