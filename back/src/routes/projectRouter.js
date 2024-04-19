import express from 'express';
import { authUser } from '../../middlewares/auth.js';
import { newProjectController } from '../controllers/projects/newProjectController.js';

const projectRouter = express.Router();

// projectRouter.get('/', getAllprojects);
// projectRouter.get('/my', userAuth, getAllMyProjects);
// projectRouter.get('/:entryId', getOneProject);
projectRouter.post('/', authUser, newProjectController);
export { projectRouter };
