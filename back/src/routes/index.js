import express from 'express';

import userRoutes from './usersRoutes.js';
import proyectRoutes from './projectRouter.js';

const router = express.Router();

router.use(userRoutes);
router.use(proyectRoutes);

export default router;
