import { StudentsCollection } from '../db/models/student.js';
import { calculatePaginationData } from '../utils/parsePaginationParams.js';

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const getAllStudents = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const studentsQuery = StudentsCollection.find();
  const studentsCount = await StudentsCollection.find()
    .merge(studentsQuery)
    .countDocuments();

  const students = await studentsQuery.skip(skip).limit(limit).exec();
  const paginationData = calculatePaginationData(studentsCount, perPage, page);
  return {
    data: students,
    ...paginationData,
  };
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

export const deleteStudentById = async (studentId) => {
  const student = await StudentsCollection.findByIdAndDelete(studentId);
  return student;
};
