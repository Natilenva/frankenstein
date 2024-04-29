import express from 'express';

import authUser from '../middlewares/auth.js';
import newQuestionController from '../controllers/questions/newQuestionController.js';
//import selectQuestionById from '../models/entries/selectQuestionById.js';
//import questionSelectController from '../controllers/questions/questionSelectController.js';
import { questionSelectController } from '../controllers/questions/questionSelectController.js';
import questionController from '../controllers/questions/questionController.js';
import { questionTechSelectFilterController } from '../controllers/questions/questionTechSelectFilterController.js';

const router = express.Router();

router.post('/newquestion', authUser, newQuestionController);

//router.get('/question/:id', authUser, selectQuestionById);
router.get('/question/:id', authUser, questionSelectController);

router.get('/getQuestion/:id', questionController);

//* Endpoint listado tipologías de consultas
router.get('/technologies', questionTechSelectFilterController);

export default router;
