import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import ProjectsScreen from './Projects';
import OptionsScreen from './Options';

const MainNavigator = createStackNavigator(
  {
    Projects: ProjectsScreen,
    Options: OptionsScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const mapStateToProps = state => ({
  user: state.user,
  nav: state.nav,
});

export default connect(mapStateToProps)(MainNavigator);
