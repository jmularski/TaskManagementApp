import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from "react-redux";

export default class Entry extends Component {

  render() {
    return (  
      <View testID="WelcomeView">
        <View>
          <Button 
            title = 'Sign in'  
            onPress = {() => this.props.navigation.navigate('Login')}
            testID = "signInButton"
          />
          <Button 
            title = 'Sign up'
            onPress = {() => this.props.navigation.navigate('Register')}
            testID = "signUpButton"
          />
        </View>
      </View>
    )
  }
}