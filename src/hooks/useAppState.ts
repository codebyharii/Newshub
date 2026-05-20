import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAppState } from '../redux/slices/uiSlice';

export const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      dispatch(setAppState(next));
      if (appState.current === 'background' && next === 'active') {
        // We could dispatch a staleness check here based on posts.lastFetchedAt
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, [dispatch]);
};
