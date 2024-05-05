import express from 'express';
import responsesRoutes from './responsesRoutes.js';
import userRoutes from './usersRoutes.js';
import projectRoutes from './projectRouter.js';
import questionRoutes from './questionRouter.js';
import companyRoutes from './companyRouter.js';
import skillRoutes from './skillRouter.js';
import eventRoutes from './eventsRouter.js';
const router = express.Router();

router.use(userRoutes);
router.use(projectRoutes);
router.use(eventRoutes);

//* Question Routes
router.use(questionRoutes);

//* Company Routes
router.use(companyRoutes);

//* Expert Skills Routes
router.use(skillRoutes);

//* Response Routes
router.use(responsesRoutes);

export default router;
