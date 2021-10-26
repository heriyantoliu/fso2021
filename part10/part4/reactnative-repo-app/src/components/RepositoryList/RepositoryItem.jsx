import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Button,
  FlatList,
} from 'react-native';
import { useHistory, useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

import theme from '../../../theme';
import { GET_REPOSITORY } from '../../graphql/queries';
import ReviewItem from './ReviewItem';

const RepositoryItem = ({ repo }) => {
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

  const history = useHistory();
  const { id } = useParams();

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
        var dotLessShortValue = (shortValue + '').replace(
          /[^a-zA-Z 0-9]+/g,
          ''
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }

  if (id) {
    const { data, loading } = useQuery(GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: { id },
    });

    repo = loading ? undefined : data.repository;
  }

  if (!repo) {
    return null;
  }

  const onPressRepo = (id) => {
    history.push(`/repo/${id}`);
  };

  const openGithub = (url) => {
    Linking.openURL(url);
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const RepoReview = (reviews) => {
    const reviewsNode = reviews.edges.map((edge) => edge.node);
    return (
      <FlatList
        data={reviewsNode}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPressRepo(repo.id)}>
        <View style={styles.flexUpperSide}>
          <View style={styles.flexSubUpperSide}>
            <View>
              <Image
                style={styles.avatar}
                source={{ uri: repo.ownerAvatarUrl }}
              />
            </View>
            <View style={styles.headerInfo}>
              <Text testID="name" style={styles.fullName}>
                {repo.fullName}
              </Text>
              <Text testID="description" style={styles.description}>
                {repo.description}
              </Text>
              <Text testID="language" style={styles.language}>
                {repo.language}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.flexBottomSide}>
          <View style={styles.flexStats}>
            <Text testID="stargazersCount" style={styles.statsInfo}>
              {abbreviateNumber(repo.stargazersCount)}
            </Text>
            <Text style={styles.statsLabel}>Stars</Text>
          </View>

          <View style={styles.flexStats}>
            <Text testID="forksCount" style={styles.statsInfo}>
              {abbreviateNumber(repo.forksCount)}
            </Text>
            <Text style={styles.statsLabel}>Forks</Text>
          </View>

          <View style={styles.flexStats}>
            <Text testID="reviewCount" style={styles.statsInfo}>
              {abbreviateNumber(repo.reviewCount)}
            </Text>
            <Text style={styles.statsLabel}>Reviews</Text>
          </View>

          <View style={styles.flexStats}>
            <Text testID="ratingAverage" style={styles.statsInfo}>
              {abbreviateNumber(repo.ratingAverage)}
            </Text>
            <Text style={styles.statsLabel}>Ratings</Text>
          </View>
        </View>
        {id ? (
          <>
            <Button
              title="Open in Github"
              onPress={() => openGithub(repo.url)}
            />
            {RepoReview(repo.reviews)}
          </>
        ) : null}
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
