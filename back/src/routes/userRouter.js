import express from 'express';
import { registerNewUser } from '../controllers/users/registerNewUser.js';
import { loginUser } from '../controllers/users/loginUser.js';
const userRouter = express.Router();

userRouter.post('/register', registerNewUser);
userRouter.post('/login', loginUser);

export { userRouter };
