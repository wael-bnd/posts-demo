import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import configureStore from 'redux-mock-store';
import PostDetailsScreen from './PostDetailsScreen';

const mockStore = configureStore([]);
const store = mockStore({});

const mockNavigation = {
  goBack: jest.fn(),
};

const mockRoute = {
  params: {
    post: {
      id: 1,
      title: 'Post Title',
      body: 'Post body text.',
    },
    user: {
      profileImage: 'https://example.com/profile.jpg',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      gender: 'Male',
      dob: '1990-01-01',
    },
  },
};

describe('PostDetailsScreen', () => {
  it('renders correctly', () => {
    const {getByText, getByRole} = render(
      <Provider store={store}>
        <NavigationContainer>
          <PostDetailsScreen route={mockRoute} navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Post Title')).toBeTruthy();
    expect(getByText('Post body text.')).toBeTruthy();
    expect(getByText('User Info')).toBeTruthy();
    expect(getByText('Full Name:')).toBeTruthy();
    expect(getByText('Email:')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    const {getByRole} = render(
      <Provider store={store}>
        <NavigationContainer>
          <PostDetailsScreen route={mockRoute} navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByRole('button'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
