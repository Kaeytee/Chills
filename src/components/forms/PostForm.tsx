import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, X, Upload } from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';

interface PostFormProps {
  initialData?: {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    image?: string;
    status?: 'draft' | 'published';
  };
  postId?: string;
  isEditing?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, postId, isEditing = false }) => {
  const navigate = useNavigate();
  const { addPost, editPost, uploadPostImage, loading } = usePosts();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    image: '',
    status: 'published',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        excerpt: initialData.excerpt || '',
        category: initialData.category || '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
        image: initialData.image || '',
        status: initialData.status || 'published',
      });

      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      
      // Clear error when user selects an image
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: '' }));
      }
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length > 200) {
      newErrors.excerpt = 'Excerpt cannot be more than 200 characters';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    let imageUrl = formData.image;
    
    // Upload image if a new one is selected
    if (imageFile) {
      const uploadedImageUrl = await uploadPostImage(imageFile);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }
    
    const postData = {
      ...formData,
      image: imageUrl,
    };
    
    let success;
    
    if (isEditing && postId) {
      success = await editPost(postId, postData);
    } else {
      success = await addPost(postData);
    }
    
    if (success) {
      navigate('/blog');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-dark-100 dark:text-light-100">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`input w-full ${errors.title ? 'border-red-500' : ''}`}
          placeholder="Enter post title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>
      
      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="mb-1 block text-sm font-medium text-dark-100 dark:text-light-100">
          Excerpt <span className="text-red-500">*</span>
          <span className="ml-1 text-xs text-dark-400 dark:text-light-400">
            (Max 200 characters)
          </span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className={`input w-full h-20 resize-none ${errors.excerpt ? 'border-red-500' : ''}`}
          placeholder="Enter a brief summary of your post"
        />
        <div className="mt-1 flex justify-between">
          {errors.excerpt ? (
            <p className="text-sm text-red-500">{errors.excerpt}</p>
          ) : (
            <span className="text-xs text-dark-400 dark:text-light-400">
              {formData.excerpt.length}/200 characters
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium text-dark-100 dark:text-light-100">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={`input w-full h-64 resize-none ${errors.content ? 'border-red-500' : ''}`}
          placeholder="Write your post content here"
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
      </div>
      
      {/* Category */}
      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-dark-100 dark:text-light-100">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`input w-full ${errors.category ? 'border-red-500' : ''}`}
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
      </div>
      
      {/* Tags */}
      <div>
        <label htmlFor="tags" className="mb-1 block text-sm font-medium text-dark-100 dark:text-light-100">
          Tags <span className="text-xs text-dark-400 dark:text-light-400">(Comma separated)</span>
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="input w-full"
          placeholder="e.g. React, JavaScript, Web Development"
        />
      </div>
      
      {/* Image Upload */}
      <div>
        <label className="mb-1 block text-sm font-medium text-dark-100 dark:text-light-100">
          Featured Image
        </label>
        <div className="mt-2 flex items-center justify-center">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 rounded-full bg-dark-100/70 p-1 text-white hover:bg-dark-100"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-light-400 bg-light-200 hover:bg-light-300 dark:border-dark-300 dark:bg-dark-200 dark:hover:bg-dark-300">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="mb-3 h-10 w-10 text-dark-400 dark:text-light-400" />
                <p className="mb-2 text-sm text-dark-400 dark:text-light-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-dark-400 dark:text-light-400">
                  PNG, JPG or GIF (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>
      
      {/* Status */}
      <div>
        <label className="mb-1 block text-sm font-medium text-dark-100 dark:text-light-100">
          Status
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="published"
              checked={formData.status === 'published'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-dark-100 dark:text-light-100">Published</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-dark-100 dark:text-light-100">Draft</span>
          </label>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/blog')}
          className="btn btn-outline"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;