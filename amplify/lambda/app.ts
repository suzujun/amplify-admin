import express from 'express';
import postsRouter from './routes/posts';
import commentsRouter from './routes/comments';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mock JSONPlaceholder API');
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Amplify + Express!' });
});

app.post('/echo', (req, res) => {
  res.json({
    message: "response from echo lambda",
    age: req.body.age,
    name: req.body.name,
  });
});

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

export default app;
