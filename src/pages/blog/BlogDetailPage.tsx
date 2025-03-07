import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Heart, Bookmark, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';
import { useComments } from '../../hooks/useComments';
import { useAuth } from '../../hooks/useAuth'; // Ensure this import is correct
import CommentForm from '../../components/forms/CommentForm';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { post, loading, error, getPostById, likePostById, removePost } = usePosts();
  const { comments, getComments } = useComments();
  const { user, isAuthenticated } = useAuth(); // This is where user is defined
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (slug) {
      getPostById(slug);
    }
  }, [slug, getPostById]);

  useEffect(() => {
    if (post) {
      getComments(post._id);
    }
  }, [post, getComments]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    
    if (post) {
      await likePostById(post._id);
      setIsLiked(true);
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = async () => {
    if (post) {
      const success = await removePost(post._id);
      if (success) {
        navigate('/blog');
      }
    }
  };

  // Safe author checks with optional chaining
  const isAuthor = user && post && user._id === post.author?._id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isAuthor || isAdmin;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold font-heading text-dark-100 dark:text-light-100 mb-4">
          Error Loading Post
        </h2>
        <p className="text-dark-300 dark:text-light-300 mb-6">{error}</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold font-heading text-dark-100 dark:text-light-100 mb-4">
          Post Not Found
        </h2>
        <p className="text-dark-300 dark:text-light-300 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center text-sm text-dark-400 dark:text-light-400">
        <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-primary-600 dark:hover:text-primary-400">Blog</Link>
        <span className="mx-2">/</span>
        <Link 
          to={`/categories/${post.category?.toLowerCase() || 'uncategorized'}`} 
          className="hover:text-primary-600 dark:hover:text-primary-400"
        >
          {post.category || 'Uncategorized'}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-dark-300 dark:text-light-300 truncate">{post.title}</span>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <Link
          to={`/categories/${post.category?.toLowerCase() || 'uncategorized'}`}
          className="inline-block mb-4 rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
        >
          {post.category || 'Uncategorized'}
        </Link>
        <h1 className="text-3xl font-bold font-heading sm:text-4xl md:text-5xl text-dark-100 dark:text-light-100 mb-6">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-dark-400 dark:text-light-400">
          <div className="flex items-center">
            <img
              src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Anonymous')}`}
              alt={post.author?.name || 'Post author'}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <Link 
                to={`/authors/${post.author?.username || 'anonymous'}`} 
                className="font-medium text-dark-100 dark:text-light-100 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {post.author?.name || 'Anonymous Author'}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{post.readTime || 'No read time'}</span>
          </div>
          
          {canEdit && (
            <div className="flex items-center ml-auto">
              <Link
                to={`/blog/edit/${post._id}`}
                className="flex items-center rounded-md p-2 text-dark-400 hover:bg-light-200 hover:text-primary-600 dark:text-light-400 dark:hover:bg-dark-200 dark:hover:text-primary-400 mr-2"
                title="Edit post"
              >
                <Edit size={18} />
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center rounded-md p-2 text-dark-400 hover:bg-light-200 hover:text-red-600 dark:text-light-400 dark:hover:bg-dark-200 dark:hover:text-red-400"
                title="Delete post"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8 overflow-hidden rounded-xl">
        <img
          src={post.image || '/default-post-image.jpg'}
          alt={post.title}
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-img:rounded-xl mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-lg font-bold font-heading text-dark-100 dark:text-light-100 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag?.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-full bg-light-200 px-3 py-1 text-sm text-dark-500 hover:bg-primary-100 hover:text-primary-700 dark:bg-dark-300 dark:text-light-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Author Bio */}
      <div className="mb-12 rounded-xl bg-light-200 p-6 dark:bg-dark-200">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <img
            src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Anonymous')}`}
            alt={post.author?.name || 'Post author'}
            className="h-20 w-20 rounded-full mb-4 sm:mb-0 sm:mr-6"
          />
          <div>
            <h3 className="text-xl font-bold font-heading text-dark-100 dark:text-light-100 mb-2">
              {post.author?.name || 'Anonymous Author'}
            </h3>
            <p className="text-dark-300 dark:text-light-300 mb-4">
              {post.author?.bio || `Author of articles about ${post.category || 'various topics'}.`}
            </p>
          </div>
        </div>
      </div>

      {/* Article Actions */}
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-y border-light-300 py-4 dark:border-dark-300">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 rounded-full px-4 py-2 ${
              isLiked ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
              : 'bg-light-200 text-dark-500 hover:bg-primary-100 hover:text-primary-700 dark:bg-dark-300 dark:text-light-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{isLiked ? (post.likes || 0) + 1 : post.likes || 0} likes</span>
          </button>
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-2 rounded-full px-4 py-2 ${
              isBookmarked ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
              : 'bg-light-200 text-dark-500 hover:bg-primary-100 hover:text-primary-700 dark:bg-dark-300 dark:text-light-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400'
            }`}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-heading text-dark-100 dark:text-light-100 mb-6">
          Comments ({comments.length})
        </h2>
        
        {isAuthenticated ? (
          <CommentForm postId={post._id} />
        ) : (
          <div className="mb-8 p-6 bg-light-200 dark:bg-dark-200 rounded-lg text-center">
            <p className="text-dark-300 dark:text-light-300 mb-4">
              Please sign in to leave a comment.
            </p>
            <Link to="/auth/login" className="btn btn-primary">Sign In</Link>
          </div>
        )}
        
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="rounded-xl bg-light-200 p-6 dark:bg-dark-200">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user?.name || 'Anonymous')}`}
                      alt={comment.user?.name || 'Comment author'}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-dark-100 dark:text-light-100">
                        {comment.user?.name || 'Anonymous'}
                      </h4>
                      <p className="text-sm text-dark-400 dark:text-light-400">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-dark-300 dark:text-light-300 mb-4">{comment.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-dark-300 dark:text-light-300">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Post Navigation */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/blog"
          className="group flex items-center rounded-lg border border-light-300 p-4 transition-colors hover:border-primary-600 dark:border-dark-300 dark:hover:border-primary-400"
        >
          <ChevronLeft size={20} className="mr-2 text-dark-400 group-hover:text-primary-600 dark:text-light-400 dark:group-hover:text-primary-400" />
          <div>
            <span className="block text-sm text-dark-400 dark:text-light-400">Back to</span>
            <span className="font-medium text-dark-100 group-hover:text-primary-600 dark:text-light-100 dark:group-hover:text-primary-400">
              All Articles
            </span>
          </div>
        </Link>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-100/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-light-100 p-6 dark:bg-dark-200 shadow-xl">
            <h3 className="mb-4 text-xl font-bold font-heading text-dark-100 dark:text-light-100">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-dark-300 dark:text-light-300">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;