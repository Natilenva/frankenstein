import express from 'express';

import  authUser  from '../middlewares/auth.js';

import newProjectController from '../controllers/projects/newProjectController.js';
import newQuestionController from '../controllers/questions/newQuestionController.js';

const router = express.Router();

// projectRouter.get('/', getAllprojects);
// projectRouter.get('/my', userAuth, getAllMyProjects);
// projectRouter.get('/:entryId', getOneProject);
router.post('/newproyect', authUser, newProjectController);

export default router;
