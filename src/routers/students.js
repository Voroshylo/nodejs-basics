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
import { authenticate } from '../middleware/authenticate.js';
import { checkRoles } from '../middleware/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentsByIdController),
);

router.post(
  '/students',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.put(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

router.delete(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);

router.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.use(authenticate);
router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));

export default router;
