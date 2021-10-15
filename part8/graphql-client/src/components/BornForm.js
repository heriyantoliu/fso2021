import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const BornForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState(0);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);

  const authors = result.data.allAuthors.map((a) => {
    return { value: a.name, label: a.name };
  });

  const submit = (event) => {
    event.preventDefault();

    updateAuthor({
      variables: {
        name: name.value,
        setBornTo: Number(born),
      },
    });

    setName('');
    setBorn(0);
  };

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        {/* <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <Select options={authors} onChange={setName} />
        <div>
          born{' '}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BornForm;
