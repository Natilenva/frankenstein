import express from 'express';
import authUser from '../middlewares/auth.js';

import {
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
} from '../controllers/admin/adminController.js';

const router = express.Router();

//* Endpoint para gestion del administrador del aplicativo

//Creación de administrador
router.post('/admin', authUser, createAdmin);

router.get('/admin', authUser, getAdmin);

router.put('/admin', authUser, updateAdmin);

router.delete('/admin', authUser, deleteAdmin);

export default router;
