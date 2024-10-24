import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {EPrivateScreen} from '../../enum';

const Stack = createStackNavigator();
const HomeScreen = () => <></>;
const PrivateNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={EPrivateScreen.HomeScreen}>
        <Stack.Screen name={EPrivateScreen.HomeScreen} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PrivateNavigation;
