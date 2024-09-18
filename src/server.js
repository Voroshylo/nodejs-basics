import express from 'express';
// import mongoose from 'mongoose';
import pino from 'pino-http';
import cors from 'cors';
import studentsRouter from './routers/students.js';
import { env } from './utils/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
// import { getAllStudents, getStudentsById } from './services/students.js';
// dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello m@loy pleas enter /students in url',
    });
  });

  app.use(studentsRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Не знайдено',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
