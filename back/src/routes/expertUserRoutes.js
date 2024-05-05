import express from 'express';
import {
    validateExpertUser,
    rejectExpertUser,
    isValidateExpertUser,
} from '../controllers/users/expertUserController.js';

import authUser from '../middlewares/auth.js';

const router = express.Router();

// Validar un usuario experto
router.post('/validate', authUser, validateExpertUser);
router.get('/validate/:profileId/:companyId', authUser, isValidateExpertUser);

// Rechazar un usuario experto
router.post('/reject', authUser, rejectExpertUser);

export default router;
