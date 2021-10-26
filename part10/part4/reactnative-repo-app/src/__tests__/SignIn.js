import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../components/SignIn/SignInForm';

describe('signin', () => {
  it('form submitted', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<SignInForm onSubmit={onSubmit} />);

    fireEvent.changeText(getByTestId('username'), 'kalle');
    fireEvent.changeText(getByTestId('password'), 'password');
    fireEvent.press(getByTestId('submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});
