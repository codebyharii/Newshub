import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPosts, setQuery, setCategory } from '../redux/slices/postsSlice';
import { PostCard } from '../components/home/PostCard';
import { SearchBar } from '../components/home/SearchBar';
import { FilterChips } from '../components/home/FilterChips';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { LoadingFooter } from '../components/common/LoadingFooter';
import { StatusBar } from '../components/common/StatusBar';
import { useDebounce } from '../hooks/useDebounce';
import { useAppState } from '../hooks/useAppState';
import { Colors, Typography, Spacing } from '../theme';

const CATEGORIES = ['All', 'Tech', 'Science', 'Art'];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, hasMore, page, query, category, error } = useSelector((state: RootState) => state.posts);
  const { isOnline } = useSelector((state: RootState) => state.ui);
  
  useAppState(); // Tracks background/foreground status
  
  const [localQuery, setLocalQuery] = React.useState(query);
  const debouncedQuery = useDebounce(localQuery, 300);

  useEffect(() => {
    if (debouncedQuery !== query) {
      dispatch(setQuery(debouncedQuery));
    }
  }, [debouncedQuery, query, dispatch]);

  useEffect(() => {
    // Initial fetch or fetch on query/category change (when page is reset to 1)
    if (page === 1 && !loading) {
      dispatch(fetchPosts({ page: 1, query: debouncedQuery, category }));
    }
  }, [page, debouncedQuery, category, dispatch]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && isOnline) {
      dispatch(fetchPosts({ page, query, category }));
    }
  }, [loading, hasMore, isOnline, page, query, category, dispatch]);

  const handlePostPress = useCallback((post: any) => {
    navigation.navigate('Detail', { post });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NewsHub</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.icon}>🔔</Text>
          <Text style={styles.icon}>👤</Text>
        </View>
      </View>

      {!isOnline && <ErrorBanner error="No internet connection." />}
      {error && <ErrorBanner error={error} onRetry={() => dispatch(fetchPosts({ page, query, category }))} />}

      <SearchBar
        value={localQuery}
        onChangeText={setLocalQuery}
        onClear={() => setLocalQuery('')}
      />

      <FilterChips
        categories={CATEGORIES}
        activeCategory={category}
        onSelect={(cat) => dispatch(setCategory(cat))}
      />

      {loading && page === 1 ? (
        <View style={styles.listContainer}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <PostCard post={item} onPress={handlePostPress} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={!loading ? <EmptyState message="No posts found." /> : null}
          ListFooterComponent={<LoadingFooter isLoading={loading && page > 1} />}
          contentContainerStyle={styles.listContent}
          // Performance optimizations
          windowSize={5}
          maxToRenderPerBatch={8}
          initialNumToRender={10}
          getItemLayout={(data, index) => ({
            length: 140, // Estimated height of PostCard
            offset: 140 * index,
            index,
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    paddingTop: 40, // SafeArea replacement
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing['4'],
    paddingBottom: Spacing['4'],
  },
  headerTitle: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.display,
    fontSize: Typography.fontSize['2xl'],
  },
  headerIcons: {
    flexDirection: 'row',
    gap: Spacing['4'],
  },
  icon: {
    fontSize: 22,
    color: Colors.secondary,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing['10'],
  },
});
