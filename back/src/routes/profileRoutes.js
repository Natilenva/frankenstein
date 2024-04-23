import express from 'express';
import authUser from '../middlewares/auth.js';
import {profileInsertController } from '../controllers/profile/profileInsertController.js';

const router = express.Router();

router.post('/myprofile', authUser, profileInsertController);

export default router;