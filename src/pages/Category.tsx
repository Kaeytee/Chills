import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, User, MessageSquare, Heart, Bookmark, ChevronRight } from 'lucide-react';
import useCategories from '../hooks/useCategories';

// Using the same mock data as the blog page
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  readTime: string;
  image: string;
  slug: string;
  likes: number;
  comments: number;
}

const blogPosts: BlogPost[] = [
  // ... (same blogPosts array as provided)
];

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Most Commented', value: 'comments' },
];

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

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

  const categoryPosts = blogPosts.filter(post => 
    post.category.toLowerCase() === categoryName?.toLowerCase()
  );

  const filteredPosts = categoryPosts.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest': return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest': return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popular': return b.likes - a.likes;
      case 'comments': return b.comments - a.comments;
      default: return 0;
    }
  });

  if (categoriesLoading) return <div className="text-center py-12">Loading...</div>;
  if (categoriesError) return <div className="text-center py-12">Error loading category</div>;
  
  const isValidCategory = categories.includes(categoryName || '');
  if (!isValidCategory) return <div className="text-center py-12">Category not found</div>;

  const categoryDescriptions: { [key: string]: string } = {
    Technology: 'Explore cutting-edge innovations and future technologies shaping our digital world.',
    Development: 'Deep dive into modern development practices and advanced programming techniques.',
    Design: 'Discover the latest trends and principles in digital design and user experience.'
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-heading sm:text-4xl md:text-5xl text-dark-100 dark:text-light-100">
          {categoryName}
        </h1>
        <p className="mt-4 text-dark-300 dark:text-light-300 max-w-2xl mx-auto">
          {categoryDescriptions[categoryName!] || 'Explore our curated collection of expert articles and insights.'}
        </p>
      </div>

      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={`Search ${categoryName} articles...`}
              className="input pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 dark:text-light-400" size={18} />
          </div>

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
              className="card group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-primary-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {post.category}
                </span>
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
                    <button className="rounded-full p-1.5 hover:bg-light-200 hover:text-primary-600 dark:hover:bg-dark-200 dark:hover:text-primary-400">
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
            No {categoryName} articles found
          </h3>
          <p className="text-dark-300 dark:text-light-300">
            Try adjusting your search terms to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;