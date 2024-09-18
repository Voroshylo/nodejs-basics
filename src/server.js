import express from 'express';
import mongoose from 'mongoose';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllStudents, getStudentsById } from './services/students.js';
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

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        message: 'Invalid student ID format',
      });
    }

    try {
      const student = await getStudentsById(studentId);
      if (!student) {
        return res.status(404).json({
          message: 'Student not found',
        });
      }

      res.status(200).json({
        data: student,
      });
    } catch (error) {
      next(error); // Передаємо помилку в обробник помилок
    }
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Не підтримується',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
