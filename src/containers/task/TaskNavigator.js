import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import TasksScreen from './Tasks/SubTaskNavigator';
import OptionsScreen from './Options';

const TaskNavigator = createBottomTabNavigator({
  Tasks: TasksScreen,
  Options: OptionsScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Tasks') {
        iconName = 'tasks';
      } else if (routeName === 'Options') {
        iconName = 'cogs';
      }
      return <Icon name={iconName} type="font-awesome" size={30} color={focused ? '#53F539' : 'black'} />;
    },
    tabBarOptions: {
      showLabel: false,
    },
  }),
});

export default TaskNavigator;
