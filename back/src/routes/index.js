import express from 'express';

import userRoutes from './usersRoutes.js';
import proyectRoutes from './projectRouter.js';
import responseRoutes from './responseRoutes.js';

const router = express.Router();

router.use(userRoutes);
router.use(proyectRoutes);
router.use(responseRoutes);

export default router;
