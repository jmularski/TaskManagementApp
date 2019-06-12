import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainNavigator from './containers/main/MainNavigator';
import AuthNavigator from './containers/auth/AuthNavigator';

const AppNavigator = createStackNavigator(
  {
    Main: MainNavigator,
    Auth: AuthNavigator,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(AppNavigator);
