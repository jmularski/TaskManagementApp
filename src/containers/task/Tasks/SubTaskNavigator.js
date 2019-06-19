import { createStackNavigator } from 'react-navigation';

import TaskScreen from './Tasks';
import InvitationScreen from './Invitations';

const SubTaskNavigator = createStackNavigator(
  {
    TaskScreen,
    Invitation: InvitationScreen,
  },
);

export default SubTaskNavigator;
