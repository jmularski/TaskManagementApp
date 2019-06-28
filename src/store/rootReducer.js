import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import AppNavigator from "@root/RootNavigator";
import authReducer from "@store/Auth/authReducer";
import userReducer from "@store/User/userReducer";
import projectReducer from "@store/Project/projectReducer";
import taskReducer from "@store/Task/taskReducer";
import invitationReducer from "@store/Invitation/invitationReducer";

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  user: userReducer,
  projects: projectReducer,
  tasks: taskReducer,
  invitations: invitationReducer
});

export default rootReducer;
