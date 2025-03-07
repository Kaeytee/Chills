import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, BookOpen, Tag, Users, MessageSquare, Bookmark, TrendingUp } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  userRole: 'admin' | 'user';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, userRole }) => {
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: 'auto' as const },
    closed: { opacity: 0, pointerEvents: 'none' as const },
  };

  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Blog', icon: <BookOpen size={20} />, path: '/blog' },
    { name: 'Categories', icon: <Tag size={20} />, path: '/categories' },
    ...(userRole === 'admin' ? [{ name: 'Authors', icon: <Users size={20} />, path: '/authors' }] : []),
    { name: 'Comments', icon: <MessageSquare size={20} />, path: '/comments' },
    { name: 'Bookmarks', icon: <Bookmark size={20} />, path: '/bookmarks' },
    { name: 'Trending', icon: <TrendingUp size={20} />, path: '/trending' },
  ];

  // Desktop sidebar (always visible on large screens)
  const DesktopSidebar = (
    <div className="hidden lg:block w-64 shrink-0 border-r border-light-300 dark:border-dark-300 bg-light-100 dark:bg-dark-100 h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4">
        <h2 className="text-lg font-heading font-bold text-dark-100 dark:text-light-100 mb-6">
          Navigation
        </h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-2 rounded-md text-dark-300 dark:text-light-300 hover:bg-light-200 dark:hover:bg-dark-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="rounded-lg bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-4">
          <h3 className="font-heading font-bold text-dark-100 dark:text-light-100 mb-2">
            Join Our Newsletter
          </h3>
          <p className="text-sm text-dark-300 dark:text-light-300 mb-3">
            Get the latest posts delivered right to your inbox
          </p>
          <input
            type="email"
            placeholder="Your email"
            className="input text-sm mb-2"
          />
          <button className="btn btn-primary w-full">Subscribe</button>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar (shown/hidden based on isOpen state)
  const MobileSidebar = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-dark-100/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
          
          {/* Sidebar */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 bottom-0 w-72 bg-light-100 dark:bg-dark-100 z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-light-300 dark:border-dark-300">
              <h2 className="text-xl font-heading font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Chills Blogg
              </h2>
              <button
                onClick={toggleSidebar}
                className="rounded-md p-2 text-dark-300 hover:bg-light-200 dark:text-light-300 dark:hover:bg-dark-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="flex items-center px-4 py-3 rounded-md text-dark-300 dark:text-light-300 hover:bg-light-200 dark:hover:bg-dark-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        onClick={toggleSidebar}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            <div className="p-4 mt-4">
              <div className="rounded-lg bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-4">
                <h3 className="font-heading font-bold text-dark-100 dark:text-light-100 mb-2">
                  Join Our Newsletter
                </h3>
                <p className="text-sm text-dark-300 dark:text-light-300 mb-3">
                  Get the latest posts delivered right to your inbox
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="input text-sm mb-2"
                />
                <button className="btn btn-primary w-full">Subscribe</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileSidebar}
    </>
  );
};

export default Sidebar;