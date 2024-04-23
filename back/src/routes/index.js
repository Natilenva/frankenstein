import express from 'express';

import userRoutes from './usersRoutes.js';
import proyectRoutes from './projectRouter.js';
import responsesRoutes from './responsesRoutes.js';

const router = express.Router();

router.use(userRoutes);
router.use(proyectRoutes);
router.use(responsesRoutes);

export default router;
