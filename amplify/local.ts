import app from './lambda/app';

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`🚀 Express app running on http://localhost:${PORT}`);
});
