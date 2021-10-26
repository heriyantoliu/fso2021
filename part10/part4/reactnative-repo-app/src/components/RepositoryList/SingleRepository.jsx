import React from 'react';
import { Text, View, StyleSheet, Image, Button, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import theme from '../../../theme';
import ReviewItem from './ReviewItem';
import useRepository from '../../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
  },
  flexUpperSide: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  flexBottomSide: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexSubUpperSide: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  headerInfo: {
    padding: 5,

    flexShrink: 1,
  },
  fullName: {
    fontWeight: 'bold',
  },
  description: {
    color: theme.colors.textSecondary,
  },
  language: {
    backgroundColor: '#0275d8',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  flexStats: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  statsInfo: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statsLabel: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
  separator: {
    height: 10,
  },
});

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + value).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

const Singlerepositorysitory = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id,
    first: 4,
  });

  if (!repository) {
    return null;
  }

  const openGithub = (url) => {
    Linking.openURL(url);
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const onEndReached = () => {
    fetchMore();
  };

  const reviewsNode = repository.reviews.edges.map((edge) => edge.node);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.flexUpperSide}>
          <View style={styles.flexSubUpperSide}>
            <View>
              <Image
                style={styles.avatar}
                source={{ uri: repository.ownerAvatarUrl }}
              />
            </View>
            <View style={styles.headerInfo}>
              <Text testID="name" style={styles.fullName}>
                {repository.fullName}
              </Text>
              <Text testID="description" style={styles.description}>
                {repository.description}
              </Text>
              <Text testID="language" style={styles.language}>
                {repository.language}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.flexBottomSide}>
          <View style={styles.flexStats}>
            <Text testID="stargazersCount" style={styles.statsInfo}>
              {abbreviateNumber(repository.stargazersCount)}
            </Text>
            <Text style={styles.statsLabel}>Stars</Text>
          </View>

          <View style={styles.flexStats}>
            <Text testID="forksCount" style={styles.statsInfo}>
              {abbreviateNumber(repository.forksCount)}
            </Text>
            <Text style={styles.statsLabel}>Forks</Text>
          </View>

          <View style={styles.flexStats}>
            <Text testID="reviewCount" style={styles.statsInfo}>
              {abbreviateNumber(repository.reviewCount)}
            </Text>
            <Text style={styles.statsLabel}>Reviews</Text>
          </View>

          <View style={styles.flexStats}>
            <Text testID="ratingAverage" style={styles.statsInfo}>
              {abbreviateNumber(repository.ratingAverage)}
            </Text>
            <Text style={styles.statsLabel}>Ratings</Text>
          </View>
        </View>
        {id ? (
          <>
            <Button
              title="Open in Github"
              onPress={() => openGithub(repository.url)}
            />
          </>
        ) : null}
      </View>
      <FlatList
        data={reviewsNode}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={() => onEndReached()}
        onEndReachedThreshold={0.9}
      ></FlatList>
    </>
  );
};

export default Singlerepositorysitory;
