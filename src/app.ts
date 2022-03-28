import * as dotenv from 'dotenv';
import express from 'express';
// import Logger from './utils/logger';
import loggerMiddleware from './middlewares/logger.middleware';
import connect from './db/connect';
import routes from './routes';
import { errorHandlerMiddleware } from './middlewares';
import { authStrategy } from './middlewares/auth.middleware';
import passport from 'passport';

const app = express();
dotenv.config();

app.use(loggerMiddleware);

if (!process.env.PORT) {
  process.exit(0);
}

authStrategy(passport);

app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`server started running on port ${process.env.PORT}`);
  connect();
});
