import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { client } from '../../api/client';
import { Endpoints } from '../../api/endpoints';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page, query, category }: { page: number; query: string; category: string }, { rejectWithValue }) => {
    try {
      // JSONPlaceholder doesn't have true category filtering, we simulate it via userId (e.g. 1, 2, 3)
      // or we just fetch and let the app handle it. For now we use standard pagination.
      const params: any = { _page: page, _limit: 15 };
      if (query) {
        params.q = query;
      }
      
      const response = await client.get<Post[]>(Endpoints.POSTS, { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

interface PostsState {
  items: Post[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  query: string;
  category: string;
  lastFetchedAt: number;
}

const initialState: PostsState = {
  items: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
  query: '',
  category: 'All',
  lastFetchedAt: 0,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    resetPosts: (state) => {
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length < 15) {
          state.hasMore = false;
        }
        
        if (state.page === 1) {
          state.items = action.payload;
        } else {
          // Filter duplicates just in case
          const newItems = action.payload.filter(
            newPost => !state.items.some(existing => existing.id === newPost.id)
          );
          state.items = [...state.items, ...newItems];
        }
        
        state.page += 1;
        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, setCategory, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
