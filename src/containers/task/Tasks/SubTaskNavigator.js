import { createStackNavigator } from 'react-navigation';

import TaskScreen from './Tasks';
import InvitationScreen from './Invitations/InvitationsNavigator';

const SubTaskNavigator = createStackNavigator(
  {
    Task: TaskScreen,
    Invitation: {
      screen : InvitationScreen,
      navigationOptions: {
        title: 'Invitations',
      },
    },
  },
);

export default SubTaskNavigator;
