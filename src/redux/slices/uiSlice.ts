import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStateStatus } from 'react-native';

interface UiState {
  appState: AppStateStatus;
  isOnline: boolean;
  hydratedAt: number | null;
}

const initialState: UiState = {
  appState: 'active',
  isOnline: true,
  hydratedAt: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<AppStateStatus>) => {
      state.appState = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setHydrated: (state) => {
      state.hydratedAt = Date.now();
    },
  },
});

export const { setAppState, setOnlineStatus, setHydrated } = uiSlice.actions;
export default uiSlice.reducer;
