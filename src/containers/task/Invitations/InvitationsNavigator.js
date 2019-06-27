import { createMaterialTopTabNavigator } from "react-navigation";

import AddInviteScreen from "src/containers/task/Invitations/AddInvite";
import GetMembersScreen from "src/containers/task/Invitations/GetMembers";

const InvitationNavigator = createMaterialTopTabNavigator({
  AddInvite: AddInviteScreen,
  GetMembers: GetMembersScreen
});

export default InvitationNavigator;
