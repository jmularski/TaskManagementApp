import { createStackNavigator, createAppContainer } from "react-navigation";

import AuthNavigator from './containers/auth/AuthNavigator';
import MainNavigator from "./containers/main/MainNavigator";

const AppNavigator = createStackNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator
}, {
  defaultNavigationOptions: {
    header: null
  }
});

export default createAppContainer(AppNavigator);