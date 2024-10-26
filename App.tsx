import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {KeyboardAvoidingView, SafeAreaView} from 'react-native';

import {persistor, store} from './src/redux/store/Store';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}>
          <SafeAreaView style={{flex: 1}}>
            <AppNavigation />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </PersistGate>
    </Provider>
  );
};

export default App;
