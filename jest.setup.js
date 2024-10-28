import 'react-native-gesture-handler/jestSetup';
import {jest} from '@jest/globals';

jest.mock('react-native-reanimated', () => {
  return require('react-native-reanimated/mock');
});
