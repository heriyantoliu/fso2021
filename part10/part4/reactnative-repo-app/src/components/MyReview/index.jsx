import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../../graphql/queries';
import ReviewItem from '../RepositoryList/ReviewItem';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const MyReview = () => {
  const { data, loading, refetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return null;
  }

  const reviewsNode = data.authorizedUser.reviews.edges.map(
    (edge) => edge.node
  );

  return (
    <FlatList
      data={reviewsNode}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} showButton={true} refetch={refetch} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReview;
