import express from 'express';

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(express.json());
4;

app.get('/', (req, res, next) => {
  res.json({
    message: 'Hello m@loy',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Не підтримується',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'не існує',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Не існує такого контенту',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// http://localhost:3000
