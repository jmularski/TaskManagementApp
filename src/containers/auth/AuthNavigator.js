import { createStackNavigator } from "react-navigation";

import LoginScreen from "src/containers/auth/Login";
import EntryScreen from "src/containers/auth/Entry";
import RegisterScreen from "src/containers/auth/Register";

const AuthNavigator = createStackNavigator(
  {
    Entry: EntryScreen,
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default AuthNavigator;
