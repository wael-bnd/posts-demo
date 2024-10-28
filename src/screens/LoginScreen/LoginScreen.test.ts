import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginScreen from './LoginScreen';
import * as authService from '../../services/authService';
import {logUserAction, setAuthData, setUsername} from '../../redux/reducers';
import {IUser} from '../../types';

const mockStore = configureStore([thunk]);

describe('LoginScreen', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    jest.spyOn(authService, 'loginUser');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    expect(getByText('Login')).toBeTruthy();
  });

  it('shows error message when username is empty', async () => {
    const {getByLabelText, getByText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    fireEvent.changeText(getByLabelText('Username'), '');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Username is required')).toBeTruthy();
    });
  });

  it('shows error message when password is empty', async () => {
    const {getByLabelText, getByText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    fireEvent.changeText(getByLabelText('Username'), 'user123');
    fireEvent.changeText(getByLabelText('Password'), '');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('calls loginUser with correct parameters on valid login', async () => {
    authService.loginUser.mockResolvedValueOnce({
      success: true,
      authData: {
        id: '1',
        username: 'user123',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'male',
        image: 'url_to_image',
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      },
    });

    const {getByLabelText, getByText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    fireEvent.changeText(getByLabelText('Username'), 'user123');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledWith({
        username: 'user123',
        password: 'password123',
      });
      expect(store.getActions()).toContainEqual(logUserAction('login'));
      expect(store.getActions()).toContainEqual(
        setAuthData({
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
          user: {
            id: '1',
            username: 'user123',
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            image: 'url_to_image',
          } as IUser,
        }),
      );
      expect(store.getActions()).toContainEqual(setUsername('user123'));
    });
  });

  it('shows error message in snackbar on failed login', async () => {
    authService.loginUser.mockResolvedValueOnce({
      success: false,
      message: 'Invalid credentials',
    });

    const {getByLabelText, getByText, getByRole} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    fireEvent.changeText(getByLabelText('Username'), 'user123');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByRole('alert')).toHaveTextContent('Invalid credentials');
    });
  });

  it('toggles password visibility', () => {
    const {getByLabelText, getByRole} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const passwordInput = getByLabelText('Password');
    const toggleButton = getByRole('button', {name: /eye/i});

    expect(passwordInput.props.secureTextEntry).toBe(true);

    fireEvent.press(toggleButton);
    expect(passwordInput.props.secureTextEntry).toBe(false);

    fireEvent.press(toggleButton);
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});
