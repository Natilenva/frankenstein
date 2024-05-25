import express from 'express';

import authUser from '../middlewares/auth.js';
import newQuestionController from '../controllers/questions/newQuestionController.js';

import { questionSelectController } from '../controllers/questions/questionSelectController.js';
import questionController from '../controllers/questions/questionController.js';
import { questionTechSelectFilterController } from '../controllers/questions/questionTechSelectFilterController.js';
import { getRegisterQuestionsController } from '../controllers/questions/getRegisterQuestionsController.js';
import deleteQuestionsController from '../controllers/questions/deleteQuestionsController.js';
import { getAllQuestionsController } from '../controllers/questions/getAllQuestionsController.js';
import authUserOptionalController from '../middlewares/authUserOptionalController.js';
const router = express.Router();

router.get('/questions', authUserOptionalController, getAllQuestionsController);

router.post('/newquestion', authUser, newQuestionController);

router.get(
    '/question/:id',
    authUserOptionalController,
    questionSelectController
);
router.get('/questions/:id', getRegisterQuestionsController);
// filtro de búsqueda
router.get('/getQuestion/:id', questionController);

//* Endpoint listado tipologías de consultas
router.get('/technologies', questionTechSelectFilterController);
router.get('/register/:id/questions', getRegisterQuestionsController);

router.delete('/question/:question_id', authUser, deleteQuestionsController);
export default router;
