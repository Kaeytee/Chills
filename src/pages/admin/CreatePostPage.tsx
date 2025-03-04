import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostForm from '../../components/forms/PostForm';

const CreatePostPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/blog" className="flex items-center text-dark-400 hover:text-primary-600 dark:text-light-400 dark:hover:text-primary-400">
          <ArrowLeft size={18} className="mr-2" />
          Back to Blog
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-dark-100 dark:text-light-100">
          Create New Post
        </h1>
        <p className="mt-2 text-dark-400 dark:text-light-400">
          Share your thoughts, ideas, and insights with the community.
        </p>
      </div>
      
      <div className="card p-6">
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;