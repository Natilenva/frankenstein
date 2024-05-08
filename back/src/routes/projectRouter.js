import express from 'express';

import authUser from '../middlewares/auth.js';

import newProjectController from '../controllers/projects/newProjectController.js';
import { getProjectController } from '../controllers/projects/getProjectController.js';
import { updateProjectController } from '../controllers/projects/updateProjectController.js';
import { deleteProjectController } from '../controllers/projects/deleteProjectController.js';
import { getRegisterProjectsController } from '../controllers/projects/getRegisterProjectsController.js';
import { getAllProjectsController } from '../controllers/projects/getAllProjectsController.js';
const router = express.Router();

router.get('/', getAllProjectsController); //(all projects en Home)
//router.get('/projects', getAllProjectsController);

// router.get('/my', userAuth, getAllMyProjects);
router.get('/project/:id', getProjectController);
router.post('/', authUser, newProjectController);// HomePage
router.put('/projectupdate/:project_id', authUser, updateProjectController);
router.delete('/project/:id', authUser, deleteProjectController);
router.get('/register/:id/projects', getRegisterProjectsController);
export default router;
