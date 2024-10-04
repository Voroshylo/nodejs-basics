import { Router } from 'express';
import {
  getStudentsController,
  getStudentsByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middleware/isValidId.js';
// import { getAllStudents, getStudentsById } from '../services/students.js';
// import mongoose from 'mongoose';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentsByIdController),
);

router.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.put(
  '/students/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

router.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);

router.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

export default router;
// router.get('/students', async (req, res) => {
//   const students = await getAllStudents();
//   res.status(200).json({
//     data: students,
//   });
// });

// router.get('/students/:studentId', async (req, res, next) => {
//   const { studentId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(studentId)) {
//     return res.status(400).json({
//       message: 'Invalid student ID format',
//     });
//   }

//   try {
//     const student = await getStudentsById(studentId);
//     if (!student) {
//       return res.status(404).json({
//         message: 'Student not found',
//       });
//     }

//     res.status(200).json({
//       data: student,
//     });
//   } catch (error) {
//     next(error); // Передаємо помилку в обробник помилок
//   }
// });
