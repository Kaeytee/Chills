import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validationResult } from 'express-validator';

// @desc    Get all comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  
  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const comments = await Comment.find({ post: postId })
    .populate('user', 'name username avatar')
    .populate('replies.user', 'name username avatar')
    .sort('-createdAt');
  
  res.json(comments);
});

// @desc    Add a comment
// @route   POST /api/posts/:postId/comments
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  
  const { postId } = req.params;
  const { content } = req.body;
  
  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const comment = new Comment({
    post: postId,
    user: req.user._id,
    content,
  });
  
  const savedComment = await comment.save();
  
  // Populate user data
  await savedComment.populate('user', 'name username avatar');
  
  res.status(201).json(savedComment);
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  
  const { id } = req.params;
  const { content } = req.body;
  
  const comment = await Comment.findById(id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  // Check if user is the comment author
  if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this comment');
  }
  
  comment.content = content;
  
  const updatedComment = await comment.save();
  
  // Populate user data
  await updatedComment.populate('user', 'name username avatar');
  
  res.json(updatedComment);
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const comment = await Comment.findById(id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  // Check if user is the comment author or admin
  if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this comment');
  }
  
  await comment.deleteOne();
  
  res.json({ message: 'Comment removed' });
});

// @desc    Add reply to a comment
// @route   POST /api/comments/:id/replies
// @access  Private
export const addReply = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  
  const { id } = req.params;
  const { content } = req.body;
  
  const comment = await Comment.findById(id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  const reply = {
    user: req.user._id,
    content,
    date: Date.now(),
  };
  
  comment.replies.push(reply);
  
  await comment.save();
  
  // Populate user data
  await comment.populate('replies.user', 'name username avatar');
  
  res.status(201).json(comment);
});

// @desc    Like a comment
// @route   PUT /api/comments/:id/like
// @access  Private
export const likeComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const comment = await Comment.findById(id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  // Increment likes
  comment.likes += 1;
  
  const updatedComment = await comment.save();
  
  res.json({ likes: updatedComment.likes });
});