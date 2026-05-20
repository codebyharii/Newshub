import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Post } from '../../types/Post';
import { Colors, Typography, Spacing } from '../../theme';
import { Badge } from '../common/Badge';

interface PostCardProps {
  post: Post;
  onPress: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = React.memo(({ post, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => onPress(post)}
    >
      <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
      <View style={styles.divider} />
      <Text style={styles.body} numberOfLines={2}>{post.body.replace(/\n/g, ' ')}</Text>
      
      <View style={styles.footer}>
        <Badge label={`User ${post.userId}`} />
        <View style={styles.meta}>
          <Text style={styles.metaText}>♡ 128</Text>
          <Text style={styles.metaText}>💬 34</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgSurface,
    borderRadius: 16,
    marginBottom: Spacing['3'],
    padding: Spacing['4'],
    marginHorizontal: Spacing['4'],
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.displayMedium,
    fontSize: Typography.fontSize.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.secondary,
    opacity: 0.3,
    marginVertical: Spacing['3'],
  },
  body: {
    color: Colors.textLight,
    fontFamily: Typography.fontFamily.body,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing['3'],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    flexDirection: 'row',
    gap: Spacing['3'],
  },
  metaText: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
  },
});
