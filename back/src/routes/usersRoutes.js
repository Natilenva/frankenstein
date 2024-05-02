import express from 'express';
import { registerNewUserController } from '../controllers/users/registerNewUserController.js';
import { loginUser } from '../controllers/users/loginUser.js';
import forgotPasswordController from '../controllers/users/forgotPasswordController.js';
import getResetPasswordController from '../controllers/users/getResetPasswordController.js';
import updatePasswordController from '../controllers/users/updatePasswordController.js';
import { profileInsertController } from '../controllers/profile/profileInsertController.js';
import authUser from '../middlewares/auth.js';
import { profileGetController } from '../controllers/profile/profileGetController.js';
import { updateProfileController } from '../controllers/profile/profileUpdateController.js';
const router = express.Router();

router.post('/register', registerNewUserController);

router.post('/login', loginUser);

router.post('/myprofile', authUser, profileInsertController);

router.get('/profile/:id', profileGetController);
router.put('/profileupdate', authUser, updateProfileController);

router.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password');
});
router.post('/forgot-password', forgotPasswordController);

router.get('/reset-password/:id/:token', getResetPasswordController);

router.post('/reset-password/:id/:token', updatePasswordController);

export default router;
