import express from 'express';
import { check } from 'express-validator';
import { 
  getPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost,
  likePost
} from '../controllers/postController.js';
import { addComment } from '../controllers/commentController.js';
import { protect, isAuthorOrAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:id', getPostById);

// Create a post
router.post(
  '/',
  protect,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('excerpt', 'Excerpt is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
  ],
  createPost
);

// Update a post
router.put('/:id', protect, isAuthorOrAdmin, updatePost);

// Delete a post
router.delete('/:id', protect, isAuthorOrAdmin, deletePost);

// Like a post
router.put('/:id/like', protect, likePost);

// Add comment to post
router.post(
  '/:id/comments',
  protect,
  [
    check('content', 'Comment content is required').not().isEmpty(),
  ],
  addComment
);

// Upload image
router.post('/upload', protect, upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

export default router;