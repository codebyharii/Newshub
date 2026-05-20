import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/types';
import { DetailHeader } from '../components/detail/DetailHeader';
import { MetaRow } from '../components/detail/MetaRow';
import { Badge } from '../components/common/Badge';
import { RootState } from '../redux/rootReducer';
import { toggleBookmark } from '../redux/slices/bookmarksSlice';
import { Colors, Typography, Spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { post } = route.params;
  const dispatch = useDispatch();
  const bookmarkedItems = useSelector((state: RootState) => state.bookmarks.items);
  const isBookmarked = bookmarkedItems.some(item => item.id === post.id);

  // Mocking user for now since we don't fetch users actively in this example
  const mockUser = {
    id: post.userId,
    name: `Author ${post.userId}`,
    username: 'author',
    email: '',
    phone: '',
    website: '',
    company: { name: '', catchPhrase: '', bs: '' }
  };

  return (
    <View style={styles.container}>
      <DetailHeader
        onBack={() => navigation.goBack()}
        onBookmark={() => dispatch(toggleBookmark(post))}
        isBookmarked={isBookmarked}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroPlaceholder} />
        <View style={styles.content}>
          <View style={styles.badgeWrapper}>
            <Badge label="Tech" />
          </View>
          <Text style={styles.title}>{post.title}</Text>
          <MetaRow user={mockUser} />
          <View style={styles.divider} />
          
          <Text style={styles.bodyText}>
            {post.body.repeat(5)} {/* Repeating body to simulate long text */}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    paddingTop: 40,
  },
  scrollContent: {
    paddingBottom: Spacing['10'],
  },
  heroPlaceholder: {
    height: 200,
    backgroundColor: Colors.primary,
    // In reality this would be an Image with a LinearGradient overlay
  },
  content: {
    padding: Spacing['4'],
  },
  badgeWrapper: {
    marginBottom: Spacing['3'],
  },
  title: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.display,
    fontSize: Typography.fontSize.xl,
    lineHeight: 28,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.secondary,
    opacity: 0.3,
    marginBottom: Spacing['4'],
  },
  bodyText: {
    color: Colors.textLight,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.base,
    lineHeight: 24,
  },
});
