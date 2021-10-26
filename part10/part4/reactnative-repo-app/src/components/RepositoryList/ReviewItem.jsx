import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { format } from 'date-fns';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/client';
import theme from '../../../theme';
import { DELETE_REVIEW } from '../../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
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
  flexBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

//

const ReviewItem = ({ review, showButton, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const onView = (id) => {
    history.push(`/repo/${id}`);
  };
  const onDelete = (id) => {
    const delReview = async () => {
      await deleteReview({
        variables: { id },
      });
      refetch();
    };

    Alert.alert(
      `Delete Review`,
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => delReview() },
      ]
    );
  };

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
      {showButton ? (
        <View style={styles.flexBottom}>
          <Button
            title="View Repository"
            color="#0366d6"
            onPress={() => onView(review.repositoryId)}
          />
          <Button
            title="Delete Review"
            color="#d73a4a"
            onPress={() => onDelete(review.id)}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ReviewItem;
