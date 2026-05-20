import { NavigatorScreenParams } from '@react-navigation/native';
import { Post } from '../types/Post';

export type BottomTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Main: NavigatorScreenParams<BottomTabParamList>;
  Detail: { post: Post };
};
