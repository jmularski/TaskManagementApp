import { createStackNavigator } from "react-navigation";

import ProjectsScreen from "src/containers/main/Projects";
import OptionsScreen from "src/containers/main/Options";

const MainNavigator = createStackNavigator({
  Projects: ProjectsScreen,
  Options: OptionsScreen
});

export default MainNavigator;
