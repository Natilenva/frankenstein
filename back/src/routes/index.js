import express from 'express';
//import responseRoutes from './responseRoutes.js';
import userRoutes from './usersRoutes.js';
import proyectRoutes from './projectRouter.js';

const router = express.Router();

router.use(userRoutes);
router.use(proyectRoutes);

//router.use(responseRoutes);
export default router;
