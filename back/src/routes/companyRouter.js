import express from 'express';

import authUser from '../middlewares/auth.js';

import { companySelectController } from '../controllers/company/companySelectController.js';
import newCompanyController from '../controllers/company/newCompanyController.js';

const router = express.Router();

//* nuevo endpoint para: Endpoint listado empresas
router.post('/newcompany', authUser, newCompanyController);

//* Endpoint listado empresas
router.get('/companynames', authUser, companySelectController);


export default router;
