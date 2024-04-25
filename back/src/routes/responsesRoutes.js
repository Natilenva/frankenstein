import express from 'express';
import voteResponseController from '../controllers/votes/voteResponseController.js';
import authUser from '../middlewares/auth.js';

const router = express.Router();
router.post('/response/:response_id/votes', authUser,voteResponseController);

export default router;