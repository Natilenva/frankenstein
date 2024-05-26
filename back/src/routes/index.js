import express from 'express';
import responsesRoutes from './responsesRoutes.js';
import userRoutes from './usersRoutes.js';
import projectRoutes from './projectRouter.js';
import questionRoutes from './questionRouter.js';
// import companyRoutes from './companyRouter.js';
import skillRoutes from './skillRouter.js';

import expertUserRoutes from './expertUserRoutes.js';
import expertRoutes from './expertRoutes.js';
// import profileRoutes from './profileRoutes.js';
// import userAdminRoutes from './userAdminRoutes.js';
//import { selectCompanyForProfile } from '../controllers/profile/profileController.js';
import authUser from '../middlewares/auth.js';
import eventRoutes from './eventsRouter.js';
import searchRoutes from './searchBarRoutes.js'

const router = express.Router();

router.use(userRoutes);
router.use(projectRoutes);
router.use(eventRoutes);
router.use(searchRoutes);
//* Question Routes
router.use(questionRoutes);

//* Company Routes
// router.use(companyRoutes);

//* Expert Skills Routes
router.use(skillRoutes);

//* Response Routes

router.use(responsesRoutes);

//Validar o rechazar expertos
router.use(expertUserRoutes);

// Endpoint para que el experto seleccione la empresa
// router.use(profileRoutes);

router.use(expertRoutes);

// router.use(userAdminRoutes);

export default router;
