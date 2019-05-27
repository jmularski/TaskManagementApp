import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import MainNavigator from "./containers/main/MainNavigator";
import AuthNavigator from "./containers/auth/AuthNavigator";

const AppNavigator = createStackNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator,
}, {
  defaultNavigationOptions: {
    header: null
  }
});

export default createAppContainer(AppNavigator);  