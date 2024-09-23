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
// import { getAllStudents, getStudentsById } from '../services/students.js';
// import mongoose from 'mongoose';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:studentId', ctrlWrapper(getStudentsByIdController));

router.post('/students', ctrlWrapper(createStudentController));

router.put('/students/:studentId', ctrlWrapper(upsertStudentController));

router.patch('/students/:studentId', ctrlWrapper(patchStudentController));

router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

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
