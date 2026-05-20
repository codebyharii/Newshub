import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface BookmarksState {
  items: Post[];
}

const initialState: BookmarksState = {
  items: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<Post>) => {
      const exists = state.items.findIndex(item => item.id === action.payload.id);
      if (exists >= 0) {
        state.items.splice(exists, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
