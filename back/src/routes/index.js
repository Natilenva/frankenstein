import express from 'express';
//import responseRoutes from './responseRoutes.js';
import userRoutes from './usersRoutes.js';
import proyectRoutes from './projectRouter.js';
import questionRoutes from './questionRouter.js';
import companyRoutes from './companyRouter.js';


const router = express.Router();

router.use(userRoutes);
router.use(proyectRoutes);

//* Question Routes 
router.use(questionRoutes);

//* Company Routes
router.use(companyRoutes);


export default router;
