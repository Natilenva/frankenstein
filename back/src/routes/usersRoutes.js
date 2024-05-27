import express from 'express';
import { registerNewUserController } from '../controllers/users/registerNewUserController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import forgotPasswordController from '../controllers/users/forgotPasswordController.js';
import getResetPasswordController from '../controllers/users/getResetPasswordController.js';
import updatePasswordController from '../controllers/users/updatePasswordController.js';
import { profileInsertController } from '../controllers/profile/profileInsertController.js';
import authUser from '../middlewares/auth.js';
import { profileGetController } from '../controllers/profile/profileGetController.js';
import { updateProfileController } from '../controllers/profile/profileUpdateController.js';
import { validateUserController } from '../controllers/users/validateUserController.js';
import { updateValidateCompanyController } from '../controllers/profile/updateValidateCompanyController.js';
//* get info user for React Context:
import { getMeController } from '../controllers/users/getMeController.js';
import { deleteRejectProfileCompanyController } from '../controllers/profile/deleteRejectProfileCompanyController.js';

const router = express.Router();

router.post('/register', registerNewUserController);

router.post('/login', loginUserController);

//* get info user for React Context:
router.get('/user', authUser, getMeController);

router.post('/myprofile', authUser, profileInsertController);

router.get('/profile/:id', profileGetController);
router.put('/profileupdate', authUser, updateProfileController);

router.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password');
});
router.post('/forgot-password', forgotPasswordController);

router.get('/reset-password/:id/:token', getResetPasswordController);

router.post('/reset-password/:id/:token', updatePasswordController);
router.get('/validate/:registrationCode', validateUserController);
router.get('/admin/validate/:id', updateValidateCompanyController);
router.delete('/admin/reject/:id', deleteRejectProfileCompanyController);

export default router;
