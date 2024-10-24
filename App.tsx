import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import {persistor, store} from './src/redux/store/Store';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  StatusBar.setBarStyle('dark-content', true);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
          }}>
          <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </PersistGate>
    </Provider>
  );
};

export default App;
