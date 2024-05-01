import express from 'express';
import { selectCompanyForProfile } from '../controllers/profileController.js';
import authUser from '../middlewares/auth.js';

const router = express.Router();

// Endpoint para que el experto seleccione la empresa
router.post('/select-company', authUser, selectCompanyForProfile);

export default router;
