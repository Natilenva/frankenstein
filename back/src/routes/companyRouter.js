// import express from 'express';
// import authUser from '../middlewares/auth.js';
// import { companySelectController } from '../controllers/company/companySelectController.js';
// import newCompanyController from '../controllers/company/newCompanyController.js';
// import { isUserCompany } from '../middlewares/isUserCompany.js';

// const router = express.Router();

// /* los endpoints de companyRouter solo pueden ejecutarlos usuarios de tipo company.
// Implementar un middleware de ruta que no deje llegar al controlador si el usuario no tiene rol company.*/

// //* endpoint POST crear nueva empresa
// //router.post('/newcompany', authUser, newCompanyController);
// router.post('/newcompany', authUser, isUserCompany , newCompanyController);

// //* endpoint GET listado empresas
// router.get('/companynames', authUser, isUserCompany, companySelectController);

// export default router;
