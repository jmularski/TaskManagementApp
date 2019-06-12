import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export default class Entry extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View testID="WelcomeView">
        <View>
          <Button
            title="Sign in"
            onPress={() => navigation.navigate('Login')}
            testID="signInButton"
          />
          <Button
            title="Sign up"
            onPress={() => navigation.navigate('Register')}
            testID="signUpButton"
          />
        </View>
      </View>
    );
  }
}
