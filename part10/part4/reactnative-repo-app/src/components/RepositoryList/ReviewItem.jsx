import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  rating: {
    width: 40,
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 2,
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: theme.colors.textSecondary,
  },
});

//

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.rating}>
          <Text style={{ marginTop: 5, color: 'blue' }}>{review.rating}</Text>
        </View>
        <View style={{ marginLeft: 5, flexGrow: 1, flexShrink: 1 }}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
