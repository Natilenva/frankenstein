import express from 'express';
import insertResponseController from "../controllers/responses/insertResponseController.js";
import authUser from "../middlewares/auth.js";

const router=express.Router();
router.post('/questions/:question_id/responses',authUser, insertResponseController);

export default router;