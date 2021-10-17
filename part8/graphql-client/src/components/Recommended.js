import React from 'react';
import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';

const Recommended = (props) => {
  const resultMe = useQuery(ME);
  const resultAllBooks = useQuery(ALL_BOOKS);
  console.log(props.show);
  if (!props.show) {
    return null;
  }

  console.log('RECOMMENDED');

  const me = resultMe.data.me;
  console.log(me);
  const books = resultAllBooks.data.allBooks.filter((book) =>
    book.genres.includes(me.favoriteGenre)
  );

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
