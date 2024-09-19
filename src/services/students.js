import { StudentsCollection } from '../db/models/student.js';

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentsById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);

  return student;
};
