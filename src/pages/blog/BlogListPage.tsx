import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, User, MessageSquare, Heart, Bookmark, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';

const BlogListPage: React.FC = () => {
  const { posts, totalPages, currentPage, totalPosts, loading, getPosts } = usePosts();
  const { isAuthenticated } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // Available categories for filtering
  const categories = ['All', 'Technology', 'Development', 'Design', 'Business', 'Lifestyle'];

  // Available sort options
  const sortOptions = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Most Popular', value: 'popular' },
    { label: 'Most Commented', value: 'comments' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const params: { page: number; category?: string; search?: string; sort?: string } = { page };
      
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      
      if (searchQuery) {
        params.search = searchQuery;
      }
      
      // Map frontend sort values to backend sort parameters
      switch (sortBy) {
        case 'latest':
          params.sort = '-createdAt';
          break;
        case 'oldest':
          params.sort = 'createdAt';
          break;
        case 'popular':
          params.sort = '-likes';
          break;
        case 'comments':
          // This would require backend support for sorting by comment count
          params.sort = '-comments';
          break;
        default:
          params.sort = '-createdAt';
      }
      
      await getPosts(params);
    };
    
    fetchPosts();
  }, [getPosts, page, selectedCategory, sortBy, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading sm:text-4xl text-dark-100 dark:text-light-100">
            Blog Articles
          </h1>
          <p className="mt-2 text-dark-300 dark:text-light-300">
            Explore our collection of articles on technology, design, development, and more.
          </p>
        </div>
        
        {isAuthenticated && (
          <Link
            to="/blog/create"
            className="mt-4 md:mt-0 btn btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Create Post
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles, tags..."
              className="input pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 dark:text-light-400" size={18} />
            <button type="submit" className="sr-only">Search</button>
          </form>

          {/* Filters Toggle (Mobile) */}
          <button
            className="btn btn-outline md:hidden w-full flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            Filters
            <ChevronDown size={18} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Desktop Filters */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-dark-400 dark:text-light-400">Category:</span>
              <select
                className="input py-1.5"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1); // Reset to first page when changing category
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-dark-400 dark:text-light-400">Sort by:</span>
              <select
                className="input py-1.5"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1); // Reset to first page when changing sort
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filters (Collapsible) */}
        {showFilters && (
          <div className="mt-4 space-y-4 md:hidden">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-400 dark:text-light-400">
                Category:
              </label>
              <select
                className="input w-full"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1); // Reset to first page when changing category
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-400 dark:text-light-400">
                Sort by:
              </label>
              <select
                className="input w-full"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1); // Reset to first page when changing sort
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-sm text-dark-400 dark:text-light-400">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <p>Showing {posts.length} of {totalPosts} posts</p>
        )}
      </div>

      {/* Blog Posts */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      ) : posts.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              variants={itemVariants}
              className="card group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 to-transparent"></div>
                <Link
                  to={`/categories/${post.category.toLowerCase()}`}
                  className="absolute left-4 top-4 rounded-full bg-primary-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {post.category}
                </Link>
              </div>
              <div className="p-6">
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="mb-3 text-xl font-bold font-heading text-dark-100 dark:text-light-100 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {post.title}
                  </h3>
                </Link>
                <p className="mb-4 text-dark-300 dark:text-light-300">
                  {post.excerpt}
                </p>
                <div className="mb-4 flex items-center text-sm text-dark-400 dark:text-light-400">
                  <User size={14} className="mr-1" />
                  <span className="mr-4">{post.author.name ||'Anonymous'}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="rounded-full bg-light-200 px-2 py-0.5 text-xs text-dark-500 hover:bg-primary-100 hover:text-primary-700 dark:bg-dark-300 dark:text-light-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Read More <ChevronRight size={16} className="ml-1" />
                  </Link>
                  <div className="flex items-center space-x-3 text-dark-400 dark:text-light-400">
                    <span className="flex items-center text-sm">
                      <Heart size={14} className="mr-1" />
                      {post.likes}
                    </span>
                    <button className="rounded-full p-1.5 text-dark-400 hover:bg-light-200 hover:text-primary-600 dark:text-light-400 dark:hover:bg-dark-200 dark:hover:text-primary-400">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-light-200 dark:bg-dark-200 flex items-center justify-center mb-4">
            <Search size={32} className="text-dark-300 dark:text-light-300" />
          </div>
          <h3 className="text-xl font-bold font-heading text-dark-100 dark:text-light-100 mb-2">
            No results found
          </h3>
          <p className="text-dark-300 dark:text-light-300">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn btn-outline px-3 py-2 disabled:opacity-50"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`btn ${
                  pageNum === currentPage
                    ? 'btn-primary'
                    : 'btn-outline'
                } px-4 py-2`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-outline px-3 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogListPage;