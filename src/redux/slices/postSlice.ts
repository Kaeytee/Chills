import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// Types
interface Author {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: Author;
  image?: string;
  category: string;
  tags: string[];
  likes: number;
  readTime: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface PostsState {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

interface PostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

interface PostResponse {
  post: Post;
  comments: any[];
}

interface PostData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string;
  image?: string;
  status?: 'draft' | 'published';
}

interface QueryParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  sort?: string;
}

// Initial state
const initialState: PostsState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  totalPosts: 0,
};

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params: QueryParams = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryString.append(key, value.toString());
        }
      });
      
      const { data } = await axios.get<PostsResponse>(`/api/posts?${queryString.toString()}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<PostResponse>(`/api/posts/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: PostData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user || {};
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.post<Post>('/api/posts', postData, config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }: { id: string; postData: PostData }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user || {};
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.put<Post>(`/api/posts/${id}`, postData, config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user || {};
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`/api/posts/${id}`, config);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user || {};
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.put(`/api/posts/${id}/like`, {}, config);
      return { id, likes: data.likes };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like post');
    }
  }
);

export const uploadImage = createAsyncThunk(
  'posts/uploadImage',
  async (formData: FormData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { token } = state.auth.user || {};
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.post('/api/posts/upload', formData, config);
      return data.imageUrl;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
    }
  }
);

// Slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPostError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.post = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsResponse>) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.totalPosts = action.payload.totalPosts;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Fetch Post By Id
    builder.addCase(fetchPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action: PayloadAction<PostResponse>) => {
      state.loading = false;
      state.post = action.payload.post;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Update Post
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.loading = false;
      state.post = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Delete Post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      if (state.post && state.post._id === action.payload) {
        state.post = null;
      }
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Like Post
    builder.addCase(likePost.fulfilled, (state, action) => {
      const { id, likes } = action.payload;
      if (state.post && state.post._id === id) {
        state.post.likes = likes;
      }
      state.posts = state.posts.map((post) =>
        post._id === id ? { ...post, likes } : post
      );
    });
  },
});

export const { clearPostError, clearCurrentPost } = postSlice.actions;

export default postSlice.reducer;