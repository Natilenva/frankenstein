import express from 'express';

import voteResponseController from '../controllers/votes/voteResponseController.js';
import authUser from '../middlewares/auth.js';
import deleteResponseController from '../controllers/responses/deleteResponseController.js';
import insertResponseController from '../controllers/responses/insertResponseController.js';
import selectAllResponsesOfQuestionIdController from '../controllers/responses/selectResponsesOfQuestionIdController.js';

const router = express.Router();

router.get('/responses/:question_id', selectAllResponsesOfQuestionIdController);
router.post('/responses/:response_id/votes', authUser, voteResponseController);
router.delete('/responses/:response_id', authUser, deleteResponseController);

//* Responder a una pregunta con Problema de seguridad
//router.post('/response/:questionID/:profileID',authUser,insertResponseController2);

//* Responder a una pregunta SIN Problema de seguridad 
router.post('/response/:questionID',authUser, insertResponseController);

export default router;
