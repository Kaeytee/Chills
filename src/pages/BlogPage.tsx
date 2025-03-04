import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, User, MessageSquare, Heart, Bookmark, ChevronRight, ChevronDown } from 'lucide-react';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development in 2025',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    category: 'Technology',
    author: 'Alex Johnson',
    date: 'May 15, 2025',
    readTime: '5 min read',
    comments: 24,
    likes: 156,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    slug: 'the-future-of-web-development-2025',
    tags: ['Web Development', 'Trends', 'Technology'],
  },
  {
    id: 2,
    title: 'Mastering React Hooks: Advanced Patterns',
    excerpt: 'Learn advanced patterns and techniques for using React Hooks effectively in your projects.',
    category: 'Development',
    author: 'Sarah Chen',
    date: 'May 10, 2025',
    readTime: '8 min read',
    comments: 42,
    likes: 213,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    slug: 'mastering-react-hooks-advanced-patterns',
    tags: ['React', 'JavaScript', 'Web Development'],
  },
  {
    id: 3,
    title: 'UI/UX Design Trends That Will Dominate 2025',
    excerpt: 'Discover the design trends that are shaping the digital landscape in 2025.',
    category: 'Design',
    author: 'Michael Torres',
    date: 'May 5, 2025',
    readTime: '6 min read',
    comments: 18,
    likes: 97,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    slug: 'ui-ux-design-trends-2025',
    tags: ['UI/UX', 'Design', 'Trends'],
  },
  {
    id: 4,
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'Learn how to build robust and scalable APIs using Node.js and Express.',
    category: 'Development',
    author: 'David Kim',
    date: 'May 3, 2025',
    readTime: '7 min read',
    comments: 12,
    likes: 78,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    slug: 'building-scalable-apis-nodejs-express',
    tags: ['Node.js', 'API', 'Backend'],
  },
  {
    id: 5,
    title: 'The Psychology of Color in Web Design',
    excerpt: 'Understanding how colors affect user behavior and emotions in web design.',
    category: 'Design',
    author: 'Emily Rodriguez',
    date: 'May 1, 2025',
    readTime: '6 min read',
    comments: 9,
    likes: 65,
    image: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80',
    slug: 'psychology-color-web-design',
    tags: ['Design', 'Psychology', 'Web Design'],
  },
  {
    id: 6,
    title: 'Getting Started with TypeScript in 2025',
    excerpt: 'A comprehensive guide to TypeScript for JavaScript developers.',
    category: 'Development',
    author: 'James Wilson',
    date: 'April 28, 2025',
    readTime: '10 min read',
    comments: 15,
    likes: 92,
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    slug: 'getting-started-typescript-2025',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
  },
  {
    id: 7,
    title: 'The Rise of AI in Content Creation',
    excerpt: 'How artificial intelligence is transforming the way we create and consume content.',
    category: 'Technology',
    author: 'Sophia Lee',
    date: 'April 25, 2025',
    readTime: '8 min read',
    comments: 21,
    likes: 134,
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80',
    slug: 'rise-ai-content-creation',
    tags: ['AI', 'Content', 'Technology'],
  },
  {
    id: 8,
    title: 'Optimizing Web Performance in 2025',
    excerpt: 'Best practices for optimizing web performance and improving user experience.',
    category: 'Development',
    author: 'Ryan Martinez',
    date: 'April 22, 2025',
    readTime: '9 min read',
    comments: 14,
    likes: 87,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    slug: 'optimizing-web-performance-2025',
    tags: ['Performance', 'Web Development', 'Optimization'],
  },
];

// Available categories for filtering
const categories = ['All', 'Technology', 'Development', 'Design', 'Business', 'Lifestyle'];

// Available sort options
const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Most Commented', value: 'comments' },
];

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

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

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort posts based on selected sort option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'comments':
        return b.comments - a.comments;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold font-heading sm:text-4xl md:text-5xl text-dark-100 dark:text-light-100">
          Blog Articles
        </h1>
        <p className="mt-4 text-dark-300 dark:text-light-300 max-w-2xl mx-auto">
          Explore our collection of articles on technology, design, development, and more. Stay updated with the latest trends and insights.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles, tags..."
              className="input pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 dark:text-light-400" size={18} />
          </div>

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
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                onChange={(e) => setSortBy(e.target.value)}
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
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                onChange={(e) => setSortBy(e.target.value)}
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

      {/* Blog Posts */}
      {sortedPosts.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {sortedPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="card group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
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
                  <span className="mr-4">{post.author}</span>
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
                      <MessageSquare size={14} className="mr-1" />
                      {post.comments}
                    </span>
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
    </div>
  );
};

export default BlogPage;