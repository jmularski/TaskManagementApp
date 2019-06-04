import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import CardScreen from './card/CardNavigator';
import StatisticsScreen from './Statistics';
import OptionsScreen from './Options';

const MainNavigator = createBottomTabNavigator({
  Card: CardScreen,
  Statistics: StatisticsScreen,
  Options: OptionsScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;

      switch (routeName) {
        case 'Card':
          iconName = 'md-card';
          break;
        case 'Statistics':
          iconName = 'md-analytics';
          break;
        case 'Options':
          iconName = 'md-settings';
          break;
      }

      return <Icon name={iconName} size={25} color={tintColor} />;
    },
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
    },
  }),
});

const mapStateToProps = state => ({
  user: state.user,
  nav: state.nav,
});

export default connect(
  mapStateToProps,
)(MainNavigator);
