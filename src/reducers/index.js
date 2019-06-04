import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import authReducer from './authReducer';
import AppNavigator from '../RootNavigator';

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
});

export default rootReducer;
