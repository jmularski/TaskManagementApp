import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import MainNavigator from "./containers/main/MainNavigator";
import AuthNavigator from "./containers/auth/AuthNavigator";

const AppNavigator = createStackNavigator({
  Auth: {
    screen: ({ navigation, screenProps }) => <AuthNavigator screenProps={{ parentNavigation: navigation, ...screenProps }} />  
  },
  Main: {
    screen: ({ navigation, screenProps }) => <MainNavigator screenProps={{ parentNavigation: navigation, ...screenProps }} />  
  }, 
}, {
  defaultNavigationOptions: {
    header: null
  }
});

export default createAppContainer(AppNavigator);  