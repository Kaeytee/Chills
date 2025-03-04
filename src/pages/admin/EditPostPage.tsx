import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostForm from '../../components/forms/PostForm';
import { usePosts } from '../../hooks/usePosts';

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, getPostById, loading, error } = usePosts();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id, getPostById]);

  useEffect(() => {
    if (post) {
      setInitialData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        image: post.image,
        status: post.status,
      });
    }
  }, [post]);

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
        <p className="text-dark-300 dark:text-light-300 mb-6">
          {error}
        </p>
        <button 
          onClick={() => navigate('/blog')}
          className="btn btn-primary"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  if (!post && !loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold font-heading text-dark-100 dark:text-light-100 mb-4">
          Post Not Found
        </h2>
        <p className="text-dark-300 dark:text-light-300 mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/blog" className="btn btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to={`/blog/${post?.slug}`} className="flex items-center text-dark-400 hover:text-primary-600 dark:text-light-400 dark:hover:text-primary-400">
          <ArrowLeft size={18} className="mr-2" />
          Back to Post
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-dark-100 dark:text-light-100">
          Edit Post
        </h1>
        <p className="mt-2 text-dark-400 dark:text-light-400">
          Update your post content, images, and settings.
        </p>
      </div>
      
      <div className="card p-6">
        {initialData && (
          <PostForm 
            initialData={initialData} 
            postId={id} 
            isEditing={true} 
          />
        )}
      </div>
    </div>
  );
};

export default EditPostPage;