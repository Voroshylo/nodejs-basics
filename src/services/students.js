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

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteStudentById = async (req, res) => {
  const { studentId } = req.params;
  const student = await deleteStudentById(studentId);
  res.status(200).json({
    message: 'Student deleted',
    student,
  });
};
