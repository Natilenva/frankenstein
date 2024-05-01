import express from 'express';
import {
    validateExpertUser,
    rejectExpertUser,
} from '../controllers/users/expertUserController.js';
import authUser from '../middlewares/auth.js';

const router = express.Router();

// Validar un usuario experto
router.post('/validate', authUser, validateExpertUser);

// Rechazar un usuario experto
router.post('/reject', authUser, rejectExpertUser);

export default router;
