import { Router } from 'express';
import userRouter from './user.route';
import blogRouter from './blog.route';
import authRouter from './auth.route';

const router = Router();

// Endpoint co check server status
router.get('/health-check', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.send(healthCheck);
  } catch (e) {
    // healthCheck.message = e;
    res.status(503).send();
  }
});

// import all user routes
router.use('/users', userRouter);

// import all blog routes
router.use('/blogs', blogRouter);

//Import all auth routes
router.use('/auth', authRouter);

export default router;
