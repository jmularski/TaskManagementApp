import { createStackNavigator } from 'react-navigation';

import ProjectsScreen from './Projects';
import OptionsScreen from './Options';

const MainNavigator = createStackNavigator(
  {
    Projects: ProjectsScreen,
    Options: OptionsScreen,
  },
);

export default MainNavigator;
