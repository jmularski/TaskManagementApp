import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import authReducer from './authReducer';
import AppNavigator from '../RootNavigator';
import cardReducer from './cardReducer';

const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  card: cardReducer,
});

export default rootReducer;
