import express from 'express';
import voteResponseController from '../controllers/votes/voteResponseController.js';
import authUser from '../middlewares/auth.js';
import deleteResponseController from '../controllers/responses/deleteResponseController.js';
import insertResponseController2 from '../controllers/responses/insertResponseController2.js';
const router = express.Router();
router.post('/response/:response_id/votes', authUser, voteResponseController);
router.delete('/response/:response_id', authUser, deleteResponseController);
router.post(
    '/response/:questionID/:profileID',
    authUser,
    insertResponseController2
);
export default router;
