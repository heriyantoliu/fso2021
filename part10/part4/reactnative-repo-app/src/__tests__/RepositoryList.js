import React from 'react';
import { render } from '@testing-library/react-native';
import RepositoryListContainer from '../components/RepositoryList/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const names = getAllByTestId('name');
      expect(names[0]).toHaveTextContent('jaredpalmer/formik');
      expect(names[1]).toHaveTextContent('async-library/react-async');

      const description = getAllByTestId('description');
      expect(description[0]).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(description[1]).toHaveTextContent(
        'Flexible promise-based React data loader'
      );

      const languages = getAllByTestId('language');
      expect(languages[0]).toHaveTextContent('TypeScript');
      expect(languages[1]).toHaveTextContent('JavaScript');

      const stargazersCounts = getAllByTestId('stargazersCount');
      expect(stargazersCounts[0]).toHaveTextContent('22k');
      expect(stargazersCounts[1]).toHaveTextContent('1.8k');

      const forksCounts = getAllByTestId('forksCount');
      expect(forksCounts[0]).toHaveTextContent('1.6k');
      expect(forksCounts[1]).toHaveTextContent('69');

      const reviewCounts = getAllByTestId('reviewCount');
      expect(reviewCounts[0]).toHaveTextContent('3');
      expect(reviewCounts[1]).toHaveTextContent('3');

      const ratingAverages = getAllByTestId('ratingAverage');
      expect(ratingAverages[0]).toHaveTextContent('88');
      expect(ratingAverages[1]).toHaveTextContent('72');
    });
  });
});
