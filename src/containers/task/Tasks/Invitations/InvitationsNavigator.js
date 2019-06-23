import { createMaterialTopTabNavigator } from 'react-navigation';

import AddInviteScreen from './AddInvite';
import GetInvitesScreen from './GetInvites';

const InvitationNavigator = createMaterialTopTabNavigator(
  {
    AddInvite: AddInviteScreen,
    GetInvites: GetInvitesScreen,
  }
)

export default InvitationNavigator