import { createStackNavigator } from "react-navigation";

import EntryScreen from "./Entry";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";

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
