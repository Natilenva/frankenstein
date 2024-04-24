import express from 'express';
import authUser from '../middlewares/auth.js';
import { profileInsertController } from '../controllers/profile/profileInsertController.js';

const router = express.Router();

//router.post('/myprofile', authUser, profileInsertController);
//comente la ruta anterior porque cree una nueva en userRoutes.js;
export default router;
