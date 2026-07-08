import dotenv from 'dotenv';
import express from 'express';
import { usersRouter } from './routes/user-route';
import { authenticate } from './middlewares/authenticate';
import { userModel } from './models/users-model';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  authenticate({
    secret_key: process.env.SECRET_KEY!,
  }),
);

// routes
app.use('/api/users', usersRouter);

app.get('/', (_, res) => {
  res.json({
    message: 'Hello World',
  });
});

async function init(): Promise<void> {
  await userModel.load();

  app.listen(3000, () => {
    console.log('The server has started!');
  });
}

init().catch((err) => console.log(err));
