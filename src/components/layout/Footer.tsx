import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-200 dark:bg-dark-200 border-t border-light-300 dark:border-dark-300 transition-colors duration-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-heading font-bold text-dark-100 dark:text-light-100 mb-4">
              Chills Blogg
            </h3>
            <p className="text-dark-300 dark:text-light-300 mb-4">
              Where innovation meets information—delivering credible content with a sleek, futuristic design and seamless user experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-300 hover:text-primary-600 dark:text-light-300 dark:hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-600 dark:text-light-300 dark:hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-600 dark:text-light-300 dark:hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-600 dark:text-light-300 dark:hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-600 dark:text-light-300 dark:hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold text-dark-100 dark:text-light-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'Blog', 'Categories', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-dark-300 hover:text-primary-600 dark:text-light-300 dark:hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <h3 className="text-lg font-heading font-bold text-dark-100 dark:text-light-100 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {['Technology', 'Design', 'Development', 'Business', 'Lifestyle', 'Photography'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/categories/${item.toLowerCase()}`}
                    className="text-dark-300 hover:text-primary-600 dark:text-light-300 dark:hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-heading font-bold text-dark-100 dark:text-light-100 mb-4">
              Subscribe to Newsletter
            </h3>
            <p className="text-dark-300 dark:text-light-300 mb-4">
              Stay updated with our latest blogs and news
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="input"
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-light-300 dark:border-dark-300 text-center text-dark-300 dark:text-light-300">
          <p>© {new Date().getFullYear()} Chills Blogg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;