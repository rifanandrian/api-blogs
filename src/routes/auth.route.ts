import { Router } from 'express';
import { loginHandler, signUpHandler } from '../controllers/auth.controller';
import { validate } from '../middlewares';
import { loginUserSchema, signUpUserSchema } from '../schemas/user.schema';

const authRouter = Router();

// Route to login user
authRouter.post('/login', validate(loginUserSchema), loginHandler);

// Route to crete user
authRouter.post('/signup', validate(signUpUserSchema), signUpHandler);

export default authRouter;
