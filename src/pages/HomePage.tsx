import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, MessageSquare, Heart, Bookmark, ChevronRight, TrendingUp, Zap, Star } from 'lucide-react';

// Mock data for featured posts
const featuredPosts = [
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
  },
];

// Mock data for recent posts
const recentPosts = [
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
  },
];

// Mock data for trending categories
const trendingCategories = [
  { name: 'Technology', count: 42, icon: <Zap size={18} /> },
  { name: 'Development', count: 38, icon: <TrendingUp size={18} /> },
  { name: 'Design', count: 27, icon: <Star size={18} /> },
  { name: 'Business', count: 24, icon: <TrendingUp size={18} /> },
  { name: 'Lifestyle', count: 19, icon: <Star size={18} /> },
];

// Mock data for newsletter subscribers
const subscriberCount = '10,000+';

const HomePage: React.FC = () => {
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

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 px-6 py-16 sm:px-12 md:py-24 lg:flex lg:items-center lg:gap-x-10">
          <div className="lg:w-1/2">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold font-heading sm:text-5xl md:text-6xl"
            >
              Discover Insights for the Digital Age
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-white/90"
            >
              Explore the latest trends, tutorials, and insights in technology, design, and development. Join our community of forward-thinking professionals.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/blog" className="btn bg-white text-primary-600 hover:bg-white/90">
                Explore Articles
              </Link>
              <Link to="/auth/signup" className="btn btn-outline border-white text-white hover:bg-white/10">
                Join Community
              </Link>
            </motion.div>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-secondary-600/20"></div>
                <div className="p-6">
                  <div className="h-4 w-24 rounded-full bg-white/30 mb-4"></div>
                  <div className="h-8 w-3/4 rounded-lg bg-white/40 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded-full bg-white/30"></div>
                    <div className="h-4 w-5/6 rounded-full bg-white/30"></div>
                    <div className="h-4 w-4/6 rounded-full bg-white/30"></div>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <div className="h-10 w-24 rounded-lg bg-white/40"></div>
                    <div className="h-10 w-10 rounded-full bg-white/40"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-secondary-500/80 backdrop-blur-sm"></div>
              <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-primary-500/80 backdrop-blur-sm"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading sm:text-3xl text-dark-100 dark:text-light-100">
            Featured Posts
          </h2>
          <Link
            to="/blog"
            className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredPosts.map((post) => (
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
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="rounded-2xl bg-gradient-to-r from-primary-600/10 to-secondary-600/10 p-8 dark:from-primary-600/20 dark:to-secondary-600/20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold font-heading sm:text-3xl text-dark-100 dark:text-light-100">
            Join {subscriberCount} readers getting updates
          </h2>
          <p className="mt-4 text-dark-300 dark:text-light-300">
            Stay up-to-date with the latest insights, tutorials, and trends. No spam, unsubscribe anytime.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-4">
            <input
              type="email"
              placeholder="Your email address"
              className="input mb-4 sm:mb-0 sm:w-72"
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Recent Posts & Sidebar */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Recent Posts */}
        <div className="lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold font-heading sm:text-3xl text-dark-100 dark:text-light-100">
              Recent Articles
            </h2>
            <Link
              to="/blog"
              className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {recentPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="card group flex flex-col md:flex-row overflow-hidden"
              >
                <div className="relative h-48 w-full md:h-auto md:w-1/3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/60 to-transparent md:bg-gradient-to-l"></div>
                  <Link
                    to={`/categories/${post.category.toLowerCase()}`}
                    className="absolute left-4 top-4 rounded-full bg-primary-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {post.category}
                  </Link>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="mb-3 text-xl font-bold font-heading text-dark-100 dark:text-light-100 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mb-4 text-dark-300 dark:text-light-300">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="mb-2 flex items-center text-sm text-dark-400 dark:text-light-400 md:mb-0">
                      <User size={14} className="mr-1" />
                      <span className="mr-4">{post.author}</span>
                      <Clock size={14} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-sm text-dark-400 dark:text-light-400">
                        <MessageSquare size={14} className="mr-1" />
                        {post.comments}
                      </span>
                      <span className="flex items-center text-sm text-dark-400 dark:text-light-400">
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

          <div className="mt-8 text-center">
            <Link to="/blog" className="btn btn-outline">
              Load More Articles
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Trending Categories */}
          <div className="card p-6">
            <h3 className="mb-4 text-xl font-bold font-heading text-dark-100 dark:text-light-100">
              Trending Categories
            </h3>
            <ul className="space-y-3">
              {trendingCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={`/categories/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-light-200 dark:hover:bg-dark-300"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                        {category.icon}
                      </span>
                      <span className="font-medium text-dark-100 dark:text-light-100">
                        {category.name}
                      </span>
                    </div>
                    <span className="rounded-full bg-light-300 px-2 py-1 text-xs font-medium text-dark-500 dark:bg-dark-300 dark:text-light-400">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Link
                to="/categories"
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                View All Categories
              </Link>
            </div>
          </div>

          {/* Featured Authors */}
          <div className="card p-6">
            <h3 className="mb-4 text-xl font-bold font-heading text-dark-100 dark:text-light-100">
              Featured Authors
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Alex', 'Sarah', 'Michael', 'Emily', 'David'].map((name, index) => (
                <Link
                  key={name}
                  to={`/authors/${name.toLowerCase()}`}
                  className="flex flex-col items-center"
                >
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 p-0.5">
                    <div className="h-full w-full rounded-full bg-light-100 dark:bg-dark-200">
                      <img
                        src={`https://i.pravatar.cc/100?img=${index + 10}`}
                        alt={name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="mt-2 text-sm font-medium text-dark-100 dark:text-light-100">
                    {name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/authors"
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                View All Authors
              </Link>
            </div>
          </div>

          {/* Tags Cloud */}
          <div className="card p-6">
            <h3 className="mb-4 text-xl font-bold font-heading text-dark-100 dark:text-light-100">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript', 'TypeScript', 'Web Design', 'UI/UX', 'Node.js', 'CSS', 'API', 'Frontend', 'Backend', 'Mobile', 'Performance'].map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="rounded-full bg-light-200 px-3 py-1 text-sm text-dark-500 hover:bg-primary-100 hover:text-primary-700 dark:bg-dark-300 dark:text-light-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold font-heading sm:text-3xl">
            Ready to start your blogging journey?
          </h2>
          <p className="mt-4 text-white/90">
            Create an account today and join our community of writers and readers.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-4">
            <Link to="/auth/signup" className="btn bg-white text-primary-600 hover:bg-white/90 mb-4 sm:mb-0">
              Get Started
            </Link>
            <Link to="/blog" className="btn btn-outline border-white text-white hover:bg-white/10">
              Explore Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;