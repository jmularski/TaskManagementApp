import { createStackNavigator, createAppContainer } from "react-navigation";

import MainNavigator from "src/containers/main/MainNavigator";
import AuthNavigator from "src/containers/auth/AuthNavigator";
import TaskNavigator from "src/containers/task/TaskNavigator";

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
