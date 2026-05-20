import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { setOnlineStatus } from '../redux/slices/uiSlice';

export const useNetworkStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setOnlineStatus(!!state.isConnected && !!state.isInternetReachable));
    });
    return () => unsubscribe();
  }, [dispatch]);
};
