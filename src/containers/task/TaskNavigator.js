import createBottomTabNavigator from 'react-navigation';

import TasksScreen from './Tasks';
import OptionsScreen from './Options';

const TaskNavigator = createBottomTabNavigator({
  Tasks: TasksScreen,
  Options: OptionsScreen
});

export default TaskNavigator;