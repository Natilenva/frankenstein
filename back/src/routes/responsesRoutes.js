import express from 'express';

import voteResponseController from '../controllers/votes/voteResponseController.js';
import authUser from '../middlewares/auth.js';
import deleteResponseController from '../controllers/responses/deleteResponseController.js';
import insertResponseController from '../controllers/responses/insertResponseController.js';

const router = express.Router();

router.post('/response/:response_id/votes', authUser, voteResponseController);
router.delete('/response/:response_id', authUser, deleteResponseController);

//* Responder a una pregunta con Problema de seguridad
//router.post('/response/:questionID/:profileID',authUser,insertResponseController2);

//* Responder a una pregunta SIN Problema de seguridad 
router.post('/response/:questionID',authUser, insertResponseController);

export default router;
