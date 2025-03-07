import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public


//Here is where i will state al the categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = ['Technology', 'Development', 'Design', 'Business', 'Lifestyle', 'Entertainment', 'Finance'];
  res.json(categories);
});