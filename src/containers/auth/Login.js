import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, SocialIcon } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import AuthService from '../../services/auth.service';
const zxcvbn = require('zxcvbn');

export default class Login extends React.Component {
  
  state = {
    emailText: '',
    passwordText: '',
    loading: false
  }

  checkInputCorrectness = (emailText, passwordText) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(emailText).toLowerCase())) return 'You inserted wrong email';
  }

  sendDataToServer = (emailText, passwordText) => {
    this.setState({loading: true});
    AuthService.login({emailText, passwordText})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if(error.status == 404 || error.status > 500) this.refs.toast.show("Our server failed to process your request!");
      })
      .finally(() => {
        this.setState({loading: false});
        this.props.navigation.navigate('Main');
      });
  }

  login = () => {
    let {emailText, passwordText} = this.state
    let errors = this.checkInputCorrectness(emailText, passwordText);
    if (errors) this.refs.toast.show(errors);
    else this.sendDataToServer(emailText, passwordText)
  }

  render() {
    return (  
      <View style={styles.main}>
          <View style={styles.mainContainer}>
            <Image
            source={require('../../../assets/img/login/piggy-bank.png')}
            />
            <Text style={{color: '#232323', fontFamily: 'lato-light', fontSize: 40, paddingTop: '7%'}}>Welcome back</Text>
            <Input
              placeholder='Email'
              placeholderTextColor = {'#4f4f4f'}
              leftIcon = {
                <Icon
                  name='user'
                  size={18}
                  color='#4f4f4f'
                />
              }
              containerStyle = {[styles.inputContainerStyle, styles.raised]}
              inputContainerStyle = {{borderBottomColor: 'rgba(255, 255, 255, 0)'}}
            
              onChangeText = {(emailText) => this.setState({emailText})}
            />

            <Input
              placeholder={'Password'}
              placeholderTextColor = {'#4f4f4f'}
              leftIcon = {
                <Icon
                  name='lock'
                  size={18}
                  color='#4f4f4f'
                />
              }
              containerStyle = {[styles.inputContainerStyle, styles.raised]}
              inputContainerStyle = {{borderBottomColor: 'rgba(255, 255, 255, 0)'}}
            
              onChangeText = {(passwordText) => this.setState({passwordText})}
            />

            <View style={{marginTop: '7%'}}>
              <Button
                  loading = {this.state.loading}
                  title="Login"
                  titleProps={{fontFamily: 'lato-light'}}
                  ViewComponent={require('expo').LinearGradient}
                  linearGradientProps={{
                    colors: ['#53F539', '#33ED30'],
                    start: [0.5, 0.5],
                  }}
                  buttonStyle = {{
                    borderRadius: 20,
                    elevation: 3,
                    width: 330,
                    paddingTop: 3,
                    paddingBottom: 3,
                  }}
                  onPress = {() => this.login()}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop: '3%'}}>
                <SocialIcon
                  button
                  light
                  type="facebook"
                  style = {[styles.socialIconStyle, { marginRight: 40}]}
                />
                <SocialIcon
                  button
                  light
                  type="google-plus-official"
                  style = {[styles.socialIconStyle, { marginRight: 40}]}
                />
                <SocialIcon
                  button
                  light
                  type="twitter"
                  style = {styles.socialIconStyle}
                />
            </View>
            <Toast 
              ref="toast"
              style={{backgroundColor:'red', bottom: -100, borderRadius: 70}}
              position='bottom'
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle = {{fontSize: 20, color: 'white'}}
            />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAFA",
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center', 
    paddingTop: '25%',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  inputContainerStyle: {
    paddingTop: 3, 
    paddingBottom: 3, 
    marginTop: '7%',
    borderRadius: 20, 
    borderColor: '#fff', 
  },
  socialIconStyle: {
    width: 60,
    height: 60, 
    borderRadius: 50
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  }
});