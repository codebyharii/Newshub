import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RootState } from '../redux/rootReducer';
import { PostCard } from '../components/home/PostCard';
import { EmptyState } from '../components/common/EmptyState';
import { Colors, Typography, Spacing } from '../theme';

type BookmarksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: BookmarksScreenNavigationProp;
}

export const BookmarksScreen: React.FC<Props> = ({ navigation }) => {
  const bookmarks = useSelector((state: RootState) => state.bookmarks.items);

  const handlePostPress = useCallback((post: any) => {
    navigation.navigate('Detail', { post });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
        <Text style={styles.subTitle}>{bookmarks.length} posts</Text>
      </View>

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} onPress={handlePostPress} />}
        ListEmptyComponent={<EmptyState message="Nothing saved yet." />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: Spacing['4'],
    paddingBottom: Spacing['4'],
  },
  headerTitle: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.display,
    fontSize: Typography.fontSize['2xl'],
  },
  subTitle: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing['1'],
  },
  listContent: {
    paddingBottom: Spacing['10'],
  },
});
