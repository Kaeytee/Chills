import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import asyncHandler from '../utils/asyncHandler.js';
import slugify from '../utils/slugify.js';
import { validationResult } from 'express-validator';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, tag, search, sort = '-createdAt' } = req.query;
  
  // Build query
  const query = {};
  
  // Filter by category
  if (category) {
    query.category = category;
  }
  
  // Filter by tag
  if (tag) {
    query.tags = tag;
  }
  
  // Search functionality
  if (search) {
    query.$text = { $search: search };
  }
  
  // Only show published posts for non-admin users
  if (!req.user || req.user.role !== 'admin') {
    query.status = 'published';
  }
  
  // Count total documents
  const total = await Post.countDocuments(query);
  
  // Execute query with pagination
  const posts = await Post.find(query)
    .populate('author', 'name username avatar')
    .sort(sort)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));
  
  res.json({
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    totalPosts: total,
  });
});

// @desc    Get single post by ID or slug
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Check if id is a valid ObjectId or a slug
  const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  
  let post;
  if (isObjectId) {
    post = await Post.findById(id).populate('author', 'name username avatar bio');
  } else {
    post = await Post.findOne({ slug: id }).populate('author', 'name username avatar bio');
  }
  
  if (post) {
    // Get comments for the post
    const comments = await Comment.find({ post: post._id })
      .populate('user', 'name username avatar')
      .populate('replies.user', 'name username avatar')
      .sort('-createdAt');
    
    res.json({ post, comments });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  
  const { title, content, excerpt, category, tags, image, status } = req.body;
  
  // Generate slug from title
  let slug = slugify(title);
  
  // Check if slug already exists
  const slugExists = await Post.findOne({ slug });
  if (slugExists) {
    // Append a random string to make slug unique
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }
  
  const post = new Post({
    title,
    slug,
    content,
    excerpt,
    author: req.user._id,
    category,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    image,
    status: status || 'published',
  });
  
  const createdPost = await post.save();
  
  res.status(201).json(createdPost);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, category, tags, image, status } = req.body;
  
  const post = await Post.findById(id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Check if user is author or admin
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this post');
  }
  
  // Update slug if title changes
  let slug = post.slug;
  if (title && title !== post.title) {
    slug = slugify(title);
    
    // Check if new slug already exists
    const slugExists = await Post.findOne({ slug, _id: { $ne: id } });
    if (slugExists) {
      // Append a random string to make slug unique
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }
  }
  
  post.title = title || post.title;
  post.slug = slug;
  post.content = content || post.content;
  post.excerpt = excerpt || post.excerpt;
  post.category = category || post.category;
  post.image = image || post.image;
  post.status = status || post.status;
  
  if (tags) {
    post.tags = tags.split(',').map(tag => tag.trim());
  }
  
  const updatedPost = await post.save();
  
  res.json(updatedPost);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const post = await Post.findById(id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Check if user is author or admin
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this post');
  }
  
  // Delete all comments associated with the post
  await Comment.deleteMany({ post: id });
  
  // Delete the post
  await post.deleteOne();
  
  res.json({ message: 'Post removed' });
});

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const post = await Post.findById(id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Increment likes
  post.likes += 1;
  
  const updatedPost = await post.save();
  
  res.json({ likes: updatedPost.likes });
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  
  const { id } = req.params;
  const { content } = req.body;
  
  const post = await Post.findById(id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const comment = new Comment({
    post: id,
    user: req.user._id,
    content,
  });
  
  const savedComment = await comment.save();
  
  // Populate user data
  await savedComment.populate('user', 'name username avatar');
  
  res.status(201).json(savedComment);
});