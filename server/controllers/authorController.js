import Author from '../models/Author.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
export const getAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

// @desc    Create a new author
// @route   POST /api/authors
// @access  Private/Admin
export const createAuthor = asyncHandler(async (req, res) => {
  const { name, bio, avatar } = req.body;

  const author = new Author({
    name,
    bio,
    avatar,
  });

  const createdAuthor = await author.save();
  res.status(201).json(createdAuthor);
});