import express from 'express';

import { registerNewUser } from '../controllers/users/registerNewUser.js';
import { loginUser } from '../controllers/users/loginUser.js';
import forgotPasswordController from '../controllers/users/forgotPasswordController.js';
import getResetPasswordController from '../controllers/users/getResetPasswordController.js';
import updatePasswordController from '../controllers/users/updatePasswordController.js';
import { profileInsertController } from '../controllers/profile/profileInsertController.js';
import authUser from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerNewUser);

router.post('/login', loginUser);

//!se creo una nueva ruta para el perfil
router.post('/myprofile', authUser, profileInsertController);

router.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password');
});
router.post('/forgot-password', forgotPasswordController);

router.get('/reset-password/:id/:token', getResetPasswordController);

router.post('/reset-password/:id/:token', updatePasswordController);

export default router;
