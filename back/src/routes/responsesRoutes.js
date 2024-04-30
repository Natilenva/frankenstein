import express from 'express';
import voteResponseController from '../controllers/votes/voteResponseController.js';
import authUser from '../middlewares/auth.js';
import deleteResponseController from '../controllers/responses/deleteResponseController.js';

const router = express.Router();
router.post('/response/:response_id/votes', authUser,voteResponseController);
router.delete('/response/:response_id', authUser, deleteResponseController);

export default router;