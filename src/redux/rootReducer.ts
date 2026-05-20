import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import uiReducer from './slices/uiSlice';

export const rootReducer = combineReducers({
  posts: postsReducer,
  bookmarks: bookmarksReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
