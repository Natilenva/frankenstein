import express from 'express';
//import responseRoutes from './responseRoutes.js';
import userRoutes from './usersRoutes.js';
import proyectRoutes from './projectRouter.js';
import questionRoutes from './questionRouter.js';
import companyRoutes from './companyRouter.js';
import skillRoutes from './skillRouter.js';
import responseRoutes3 from './responsesRouter3.js';
import expertUserRoutes from './expertUserRoutes.js';
import expertRoutes from './expertRoutes.js';

import { selectCompanyForProfile } from '../controllers/profile/profileController.js';

const router = express.Router();

router.use(userRoutes);
router.use(proyectRoutes);

//* Question Routes
router.use(questionRoutes);

//* Company Routes
router.use(companyRoutes);

//* Expert Skills Routes
router.use(skillRoutes);

//* Response Routes
router.use(responseRoutes3);

//Validar o rechazar expertos
router.use(expertUserRoutes);

// Endpoint para que el experto seleccione la empresa
router.post('/select-company', authUser, selectCompanyForProfile);

router.use(expertRoutes);

export default router;
