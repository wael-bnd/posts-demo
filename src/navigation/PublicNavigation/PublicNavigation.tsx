import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {EPublicScreen} from '../../enum';

const Stack = createStackNavigator();
const LoginScreen = () => <></>;
const PublicNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={EPublicScreen.LoginScreen}>
        <Stack.Screen
          name={EPublicScreen.LoginScreen}
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PublicNavigation;
