import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ME, ALL_BOOKS_BY_GENRE } from '../queries';

const Recommended = (props) => {
  const resultMe = useQuery(ME);
  const [books, setBooks] = useState(null);
  const [me, setMe] = useState(null);
  const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS_BY_GENRE);

  useEffect(() => {
    if (resultMe.data && resultMe.data.me) {
      setMe(resultMe.data.me);
      getBooks({
        variables: {
          genre: resultMe.data.me.favoriteGenre,
        },
      });
    }
  }, [resultMe, resultBooks, getBooks]);

  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks);
    }
  }, [resultBooks]);
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendation</h2>
      <div>
        books in your favorite genre <b>{me.favoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
