import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import AppNavigator from "src/RootNavigator";
import authReducer from "src/store/Auth/authReducer";
import userReducer from "src/store/User/userReducer";
import projectReducer from "src/store/Project/projectReducer";
import taskReducer from "src/store/Task/taskReducer";
import invitationReducer from "src/store/Invitation/invitationReducer";

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
