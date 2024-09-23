import {
  getAllStudents,
  getStudentsById,
  createStudent,
  deleteStudentById,
  updateStudent,
} from '../services/students.js';
import createHttpError from 'http-errors';

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);
  res.status(201).json({
    status: 201,
    message: `Successfully create a student!`,
    data: student,
  });
};

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
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}`,
    data: student,
  });
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);

  if (!result) {
    next(createHttpError(404, 'student not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully patched a student!',
    data: result.student,
  });
};

export const deleteStudentController = async (req, res) => {
  const { studentId } = req.params;
  const student = await deleteStudentById(studentId);

  if (!student) {
    throw createHttpError(404, 'student not found');
  }
  res.sendStatus(204);
};
