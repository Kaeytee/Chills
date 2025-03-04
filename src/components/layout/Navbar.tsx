import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, User, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { isAuthenticated, user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsProfileOpen(false);
    navigate('/auth/login');
  };

  const ProfileDropdown = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 top-12 w-48 bg-white dark:bg-dark-200 rounded-lg shadow-xl border border-gray-100 dark:border-dark-300"
    >
      <div className="p-2">
        <Link
          to="/profile"
          onClick={() => setIsProfileOpen(false)}
          className="flex items-center px-3 py-2 text-sm text-dark-300 dark:text-light-300 hover:bg-light-100 dark:hover:bg-dark-300 rounded-md transition-colors"
        >
          <Settings size={16} className="mr-2" />
          Update Profile
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-light-100 dark:hover:bg-dark-300 rounded-md transition-colors"
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </button>
      </div>
    </motion.div>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-light-100/90 dark:bg-dark-100/90 backdrop-blur-md shadow-md'
          : 'bg-light-100 dark:bg-dark-100'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and hamburger */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 rounded-md p-2 text-dark-300 hover:bg-light-200 dark:text-light-300 dark:hover:bg-dark-200 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Chills Blogg
              </span>
            </Link>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                { name: 'Categories', path: '/categories' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`relative font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                      location.pathname === item.path
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-dark-300 dark:text-light-300'
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-md p-2 text-dark-300 hover:bg-light-200 dark:text-light-300 dark:hover:bg-dark-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-dark-300 hover:bg-light-200 dark:text-light-300 dark:hover:bg-dark-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {!isAuthenticated ? (
              <Link
                to="/auth/login"
                className="hidden sm:flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
              >
                <User size={18} className="mr-2" />
                Sign In
              </Link>
            ) : (
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 rounded-md px-2 sm:px-3 py-2 hover:bg-light-200 dark:hover:bg-dark-300 transition-colors"
                >
                  <img 
                    src={user?.avatar || 'https://pbs.twimg.com/profile_images/1835759638433652736/fD3zE0qE_400x400.jpg'} 
                    alt="Profile" 
                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover border-2 border-primary-100 dark:border-dark-300"
                  />
                  <span className="hidden md:inline text-dark-300 dark:text-light-300 font-medium">
                    {user?.username}
                  </span>
                </button>
                
                {isProfileOpen && <ProfileDropdown />}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-x-0 top-16 bg-light-100 dark:bg-dark-200 p-4 shadow-lg"
        >
          <div className="container-custom">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, categories, tags..."
                className="input w-full pr-10"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 dark:text-light-300"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;