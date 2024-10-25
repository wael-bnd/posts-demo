import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {EPublicScreen} from '../../enum';
import {LoginScreen} from '../../screens';

const Stack = createStackNavigator();
const PublicNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={EPublicScreen.LoginScreen}>
        <Stack.Screen
          name={EPublicScreen.LoginScreen}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PublicNavigation;
