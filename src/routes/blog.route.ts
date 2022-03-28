import { Router } from 'express';
import {
  createBlogHandler,
  getAllBlogsHandler,
  updateBlogHandler,
  deleteBlogHandler,
  getBlogHandler,
} from '../controllers/blog.controller';
import {
  createBlogSchema,
  getBlogSchema,
  updateBlogSchema,
  deleteBlogSchema,
} from '../schemas/blog.schema';
import { authenticate, authorize, validate } from '../middlewares';
import { ROLE } from '../constants/user-role';

const blogRouter = Router();

// route to crefte a blog
blogRouter.post(
  '/',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(createBlogSchema),
  createBlogHandler
);

// route to fetch a blog
blogRouter.get('/:id', authenticate, validate(getBlogSchema), getBlogHandler);

// route to update a blog
blogRouter.patch(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(updateBlogSchema),
  updateBlogHandler
);

// route to delete a blog
blogRouter.delete(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(deleteBlogSchema),
  deleteBlogHandler
);

// route to get all the blogs
blogRouter.get('/', authenticate, getAllBlogsHandler);

export default blogRouter;
