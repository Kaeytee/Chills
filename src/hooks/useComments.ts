import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
  addReply,
  likeComment,
} from '../redux/slices/commentSlice';
import { showNotification } from '../redux/slices/uiSlice';

export const useComments = () => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);

  const getComments = async (postId: string) => {
    try {
      await dispatch(fetchComments(postId)).unwrap();
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const createComment = async (postId: string, content: string) => {
    try {
      await dispatch(addComment({ postId, content })).unwrap();
      dispatch(showNotification({ message: 'Comment added successfully', type: 'success' }));
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const editComment = async (commentId: string, content: string) => {
    try {
      await dispatch(updateComment({ commentId, content })).unwrap();
      dispatch(showNotification({ message: 'Comment updated successfully', type: 'success' }));
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const removeComment = async (commentId: string) => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();
      dispatch(showNotification({ message: 'Comment deleted successfully', type: 'success' }));
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const replyToComment = async (commentId: string, content: string) => {
    try {
      await dispatch(addReply({ commentId, content })).unwrap();
      dispatch(showNotification({ message: 'Reply added successfully', type: 'success' }));
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  const likeCommentById = async (commentId: string) => {
    try {
      await dispatch(likeComment(commentId)).unwrap();
      return true;
    } catch (error) {
      dispatch(showNotification({ message: error as string, type: 'error' }));
      return false;
    }
  };

  return {
    comments,
    loading,
    error,
    getComments,
    createComment,
    editComment,
    removeComment,
    replyToComment,
    likeCommentById,
  };
};