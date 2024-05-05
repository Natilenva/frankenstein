import express from 'express';
import { listExpertsBySkills } from '../controllers/users/expertController.js';

const router = express.Router();

// Endpoint para listar expertos según habilidades/tecnologías
router.get('/experts-by-skills', listExpertsBySkills);

export default router;
