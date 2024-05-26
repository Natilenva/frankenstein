import express from 'express';

import { searchBarController } from '../controllers/searchBar/searchBarController2.js';

const router= express.Router();

router.get('/search', searchBarController);

export default router;