import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import RootNavigator from './RootNavigator';

export const navMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav
);
const App = createReduxContainer(RootNavigator);


const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(App);