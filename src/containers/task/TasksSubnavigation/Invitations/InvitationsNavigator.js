import { createMaterialTopTabNavigator } from "react-navigation";

import AddInviteScreen from "./AddInvite";
import GetMembersScreen from "./GetMembers";

const InvitationNavigator = createMaterialTopTabNavigator({
  AddInvite: AddInviteScreen,
  GetMembers: GetMembersScreen
});

export default InvitationNavigator;
