import { createStackNavigator, createAppContainer } from "react-navigation";

import MainNavigator from "./containers/main/MainNavigator";
import AuthNavigator from "./containers/auth/AuthNavigator";
import TaskNavigator from "./containers/task/TaskNavigator";

const AppNavigator = createStackNavigator(
  {
    Auth: AuthNavigator,
    Main: MainNavigator,
    Task: TaskNavigator
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(AppNavigator);
