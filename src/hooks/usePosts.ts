import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  uploadImage,
} from '../redux/slices/postSlice';
import { showNotification } from '../redux/slices/uiSlice';

export const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, post, loading, error, totalPages, currentPage, totalPosts } = useSelector(
    (state: RootState) => state.posts
  );

  const getPosts = async (params = {}) => {
    try {
      await dispatch(fetchPosts(params)).unwrap();
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const getPostById = async (id: string) => {
    try {
      await dispatch(fetchPostById(id)).unwrap();
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const addPost = async (postData: any) => {
    try {
      await dispatch(createPost(postData)).unwrap();
      dispatch(showNotification({ message: 'Post created successfully', type: 'success' }));
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const editPost = async (id: string, postData: any) => {
    try {
      await dispatch(updatePost({ id, postData })).unwrap();
      dispatch(showNotification({ message: 'Post updated successfully', type: 'success' }));
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const removePost = async (id: string) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      dispatch(showNotification({ message: 'Post deleted successfully', type: 'success' }));
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const likePostById = async (id: string) => {
    try {
      await dispatch(likePost(id)).unwrap();
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const uploadPostImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const imageUrl = await dispatch(uploadImage(formData)).unwrap();
      return imageUrl;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return null;
    }
  };

  return {
    posts,
    post,
    loading,
    error,
    totalPages,
    currentPage,
    totalPosts,
    getPosts,
    getPostById,
    addPost,
    editPost,
    removePost,
    likePostById,
    uploadPostImage,
  };
};