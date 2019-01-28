import React from 'react';
import { View } from 'react-native';
import { Font } from 'expo';
import { Button } from 'react-native-elements';

export default class Entry extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'lato-light': require('../../../assets/fonts/Lato-Light.ttf'),
    });

    this.setState({fontLoaded: true})
  };

  render() {
    return (  
      <View class = 'container'>
        {
          this.state.fontLoaded ? (
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
        ) : null 
        }
      </View>
    )
  }
}