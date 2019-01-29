import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';

import CardScreen from './card/CardNavigator';
import StatisticsScreen from './Statistics';
import OptionsScreen from './Options';

const MainNavigator = createBottomTabNavigator({
  Card: CardScreen,
  Statistics: StatisticsScreen,
  Options: OptionsScreen
}, {
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      
      switch(routeName){
        case 'Card':
          iconName = 'md-card';
          break;
        case 'Statistics': 
          iconName = 'md-analytics';
          break;
        case 'Options':
          iconName = 'md-settings'
          break;
      }
      
      return <Ionicons name={iconName} size = {25} color = {tintColor} />
    },
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey'
    }
  })
});

export default MainNavigator;