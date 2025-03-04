import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import AdminRoute from './components/AdminRoute';

// Store
import { store } from './redux/store';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import BlogListPage from './pages/blog/BlogListPage';
import BlogDetailPage from './pages/blog/BlogDetailPage';
import CreatePostPage from './pages/admin/CreatePostPage';
import EditPostPage from './pages/admin/EditPostPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import Authors from './pages/Authors';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';

// Components
import Notification from './components/common/Notification';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// Set base URL for API requests
axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-light-100 dark:bg-dark-100">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          <h2 className="mt-4 text-xl font-heading font-bold text-primary-600 dark:text-primary-400">
            Chills Blogg
          </h2>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Notification />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />

                {/* Blog Routes */}
                <Route path="blog">
                  <Route
                    index
                    element={
                      <ErrorBoundary>
                        <BlogListPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path=":slug"
                    element={
                      <ErrorBoundary>
                        <BlogDetailPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <ProtectedRoute>
                        <ErrorBoundary>
                          <CreatePostPage />
                        </ErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                  {/* Added Edit Post Route */}
                  <Route
                    path="edit/:slug"
                    element={
                      <ProtectedRoute>
                        <ErrorBoundary>
                          <EditPostPage />
                        </ErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Auth Routes */}
                <Route path="auth">
                  <Route
                    path="login"
                    element={
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      <PublicRoute>
                        <RegisterPage />
                      </PublicRoute>
                    }
                  />
                </Route>

                {/* Profile Route */}
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                {/* Authors Route */}
                // App.tsx (relevant section)
                <Route
                  path="authors"
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <AdminRoute>
                          <Authors />
                        </AdminRoute>
                      </ErrorBoundary>
                    </ProtectedRoute>
                  }
                />

                {/* About Route */}
                <Route path="about" element={<AboutPage />} />
                
                {/* Contact Route */}
                <Route path="contact" element={<ContactPage />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;