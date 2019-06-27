import { createStackNavigator } from "react-navigation";

import TaskScreen from "src/containers/task/Tasks/Tasks";
import InvitationScreen from "src/containers/task/Invitations/InvitationsNavigator";

const SubTaskNavigator = createStackNavigator({
  Task: TaskScreen,
  Invitation: {
    screen: InvitationScreen,
    navigationOptions: {
      title: "Invitations"
    }
  }
});

export default SubTaskNavigator;
