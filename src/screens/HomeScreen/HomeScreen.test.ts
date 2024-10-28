import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import configureStore from 'redux-mock-store';
import HomeScreen from './HomeScreen';
import {fetchPosts} from '../../services/postsService';

jest.mock('../../services/postsService');

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
    },
  },
});

const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and displays user greeting', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Welcome John Doe')).toBeTruthy();
  });

  it('loads posts and displays them', async () => {
    (fetchPosts as jest.Mock).mockResolvedValue([
      {id: 1, title: 'Post Title', body: 'Post body text.', userId: 1},
    ]);

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => expect(getByText('Post Title')).toBeTruthy());
  });

  it('handles search functionality', async () => {
    (fetchPosts as jest.Mock).mockResolvedValue([
      {id: 1, title: 'Post Title', body: 'Post body text.', userId: 1},
    ]);

    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => expect(getByText('Post Title')).toBeTruthy());

    fireEvent.changeText(getByPlaceholderText('Search Posts'), 'Post Title');

    await waitFor(() => expect(getByText('Post Title')).toBeTruthy());
  });

  it('shows a loading indicator while fetching posts', async () => {
    (fetchPosts as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByTestId('loader')).toBeTruthy();
  });

  it('displays an error message when loading fails', async () => {
    (fetchPosts as jest.Mock).mockRejectedValue(new Error('Failed to load'));

    const {getByText, findByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => expect(findByText('Failed to load')).toBeTruthy());
  });

  it('navigates to post details on button press', async () => {
    (fetchPosts as jest.Mock).mockResolvedValue([
      {id: 1, title: 'Post Title', body: 'Post body text.', userId: 1},
    ]);

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => expect(getByText('Post Title')).toBeTruthy());

    fireEvent.press(getByText('View Details'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        post: expect.any(Object),
        user: expect.any(Object),
      }),
    );
  });
});
