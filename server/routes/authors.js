import express from 'express';
import { getAuthors, createAuthor } from '../controllers/authorController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAuthors).post(protect, admin, createAuthor);

export default router;