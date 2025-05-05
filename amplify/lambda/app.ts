import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import postsRouter from './routes/posts';
import commentsRouter from './routes/comments';
import usersRouter from './routes/users';
const app = express();
app.use(express.json());

app.use(morgan('dev'));
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range,X-Total-Count');
    next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Mock JSONPlaceholder API');
});

app.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Amplify + Express!' });
});

app.post('/echo', (req: Request, res: Response) => {
  res.json({
    message: "response from echo lambda",
    age: req.body.age,
    name: req.body.name,
  });
});

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

export default app;
