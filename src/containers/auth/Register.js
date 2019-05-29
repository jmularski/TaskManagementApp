import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { signUp } from '../../actions/authActions';
import Toast from '../../utils/Toast';
import AuthService from '../../services/auth.service';
const zxcvbn = require('zxcvbn');

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      passwordText: '',
      repeatPasswordText: '',
      loading: false
    }
  };

  checkPasswordStrength = (passwordText) => {
    return zxcvbn(passwordText).score > 2; 
  }

  checkInputCorrectness = (emailText, passwordText, repeatPasswordText) => {
    if( passwordText != repeatPasswordText ) return 'Password and repeated password are not the same';
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(emailText).toLowerCase())) return 'You inserted wrong email';
    if(!this.checkPasswordStrength(passwordText)) return 'Password is too weak!';
  }

  register = () => {
    let {emailText, passwordText, repeatPasswordText} = this.state
    let errors = this.checkInputCorrectness(emailText, passwordText, repeatPasswordText);
    if (errors) Toast(errors);
    else this.sendDataToServer(emailText, passwordText);
  }

  sendDataToServer = (emailText, passwordText) => {
    this.props.signUp(emailText, passwordText);
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

            <Input
              placeholder={'Repeat password'}
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
            
              onChangeText = {(repeatPasswordText) => this.setState({repeatPasswordText})}
            />

            <View style={{marginTop: '7%'}}>
              <Button
                  loading = {this.state.loading}
                  title="Register"
                  titleProps={{fontFamily: 'lato-light'}}
                  ViewComponent={LinearGradient}
                  linearGradientProps={{
                    colors: ['#53F539', '#33ED30'],
                    start: {x: 0.5, y: 0.5},
                  }}
                  buttonStyle = {{
                    borderRadius: 20,
                    elevation: 3,
                    width: 330,
                    paddingTop: 3,
                    paddingBottom: 3,
                  }}
                  onPress = {() => this.register()}
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
          </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => dispatch(signUp(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAFA",
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center', 
    paddingTop: '15%',
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
