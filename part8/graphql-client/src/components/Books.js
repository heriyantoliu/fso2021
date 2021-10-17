import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('All');

  if (!props.show) {
    return null;
  }

  const books = [...result.data.allBooks];
  let allGenres = [];
  books.forEach((book) => {
    allGenres = allGenres.concat(book.genres);
  });

  const uniqueGenres = allGenres.filter((genre, index, self) => {
    return self.indexOf(genre) === index;
  });

  const filteredBooks =
    genre === 'All'
      ? books
      : books.filter((book) => book.genres.includes(genre));

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{genre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('All')}>all genres</button>
    </div>
  );
};

export default Books;
