import express from 'express';

import authUser from '../middlewares/auth.js';
import insertResponseController2 from '../controllers/responses/insertResponseController2.js';


const router = express.Router();

//* Endpoint para crear una respuesta
router.post('/response/:questionID/:profileID', authUser,insertResponseController2);


export default router;
