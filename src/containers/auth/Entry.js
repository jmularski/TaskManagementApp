import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from "react-redux";

export default class Entry extends Component {

  render() {
    return (  
      <View class = 'container'>
        <View class = 'btn-container'>
          <Button 
            title = 'Sign in'  
            onPress = {() => this.props.navigation.navigate('Login')}
          />
          <Button 
            title = 'Sign up'
            onPress = {() => this.props.navigation.navigate('Register')}
          />
        </View>
      </View>
    )
  }
}