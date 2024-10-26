import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {EPrivateScreen} from '../../enum';
import {HomeScreen} from '../../screens';

const Stack = createStackNavigator();
const PrivateNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={EPrivateScreen.HomeScreen}>
        <Stack.Screen
          name={EPrivateScreen.HomeScreen}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PrivateNavigation;
