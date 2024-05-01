import express from 'express';

import authUser from '../middlewares/auth.js';
import newQuestionController from '../controllers/questions/newQuestionController.js';

import { questionSelectController } from '../controllers/questions/questionSelectController.js';
import questionController from '../controllers/questions/questionController.js';
import { questionTechSelectFilterController } from '../controllers/questions/questionTechSelectFilterController.js';
import { getRegisterQuestionsController } from '../controllers/questions/getRegisterQuestionsController.js';
const router = express.Router();

router.post('/newquestion', authUser, newQuestionController);

router.get('/question/:id', authUser, questionSelectController);
// filtro de búsqueda
router.get('/getQuestion/:id', questionController);

//* Endpoint listado tipologías de consultas
router.get('/technologies', questionTechSelectFilterController);
router.get('/register/:id/questions', getRegisterQuestionsController);
export default router;
