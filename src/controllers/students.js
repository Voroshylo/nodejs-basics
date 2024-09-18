import { getAllStudents, getStudentsById } from '../services/students.js';
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentsByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentsById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }
  // if (!student) {
  //   res.status(404).json({
  //     message: 'Student not found',
  //   });
  //   return;
  // }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}`,
    data: student,
  });
};
