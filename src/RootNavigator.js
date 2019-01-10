import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from './containers/Login';
import HomeScreen from './containers/HomeScreen';
import RegisterScreen from './containers/Register';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen
}, {
  defaultNavigationOptions: {
    header: null
  }
});

export default createAppContainer(AppNavigator);