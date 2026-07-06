import express from 'express';
import { usersRouter } from './routes/user-route';
import { authenticate } from './middlewares/authenticate';

const app = express();

app.use(express.json());
app.use(authenticate);

// routes
app.use('/api/users', usersRouter);

app.get('/', (_, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.listen(3000, () => {
  console.log('The server has started!');
});
