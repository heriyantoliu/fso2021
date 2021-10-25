import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import theme from '../../../theme';

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

  return (
    <View style={styles.container}>
      <View style={styles.flexUpperSide}>
        <View style={styles.flexSubUpperSide}>
          <View>
            <Image
              style={styles.avatar}
              source={{ uri: repo.ownerAvatarUrl }}
            />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.fullName}>{repo.fullName}</Text>
            <Text style={styles.description}>{repo.description}</Text>
            <Text style={styles.language}>{repo.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexBottomSide}>
        <View style={styles.flexStats}>
          <Text style={styles.statsInfo}>
            {abbreviateNumber(repo.stargazersCount)}
          </Text>
          <Text style={styles.statsLabel}>Stars</Text>
        </View>

        <View style={styles.flexStats}>
          <Text style={styles.statsInfo}>
            {abbreviateNumber(repo.forksCount)}
          </Text>
          <Text style={styles.statsLabel}>Forks</Text>
        </View>

        <View style={styles.flexStats}>
          <Text style={styles.statsInfo}>
            {abbreviateNumber(repo.reviewCount)}
          </Text>
          <Text style={styles.statsLabel}>Reviews</Text>
        </View>

        <View style={styles.flexStats}>
          <Text style={styles.statsInfo}>
            {abbreviateNumber(repo.ratingAverage)}
          </Text>
          <Text style={styles.statsLabel}>Ratings</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
