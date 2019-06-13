import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import authReducer from './authReducer';
import userReducer from './userReducer';
import AppNavigator from '../RootNavigator';
import projectReducer from './projectReducer';

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  user: userReducer,
  projects: projectReducer,
});

export default rootReducer;
