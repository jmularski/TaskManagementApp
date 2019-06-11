import React from 'react';
import {
  StyleSheet, Text, View, Image, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { signUp } from '../../actions/authActions';
import Toast from '../../utils/Toast';

const zxcvbn = require('zxcvbn');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      passwordText: '',
      repeatPasswordText: '',
      loading: false,
    };
  }

  checkPasswordStrength = passwordText => zxcvbn(passwordText).score > 2;

  checkInputCorrectness = (emailText, fullNameText, passwordText, repeatPasswordText) => {
    if (emailText === '' || fullNameText === '' || passwordText === '' || repeatPasswordText === '') return 'You have to fill up all fields.';
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(emailText).toLowerCase())) return 'Your email was in wrong format.';
    if (fullNameText.indexOf(' ') === 0) return 'Full name is in wrong format';
    if (passwordText != repeatPasswordText) return 'Password and repeated password are not the same';
    if (!this.checkPasswordStrength(passwordText)) return 'Password is too weak!';
  };

  register = () => {
    const { emailText, fullNameText, passwordText, repeatPasswordText } = this.state;
    const errors = this.checkInputCorrectness(
      emailText,
      fullNameText,
      passwordText,
      repeatPasswordText,
    );
    if (errors) Toast(errors);
    else this.sendDataToServer(emailText, fullNameText, passwordText);
  };

  sendDataToServer = (emailText, fullNameText, passwordText) => {
    this.props.signUp(emailText, fullNameText, passwordText);
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainContainer}>
          <Text
            testID="registerText"
            style={{
              color: '#232323',
              fontFamily: 'Lato-Light',
              fontSize: 40,
              paddingTop: '7%',
            }}
          >
            Create new account
          </Text>
          <Input
            placeholder="Email"
            placeholderTextColor="#4f4f4f"
            leftIcon={<Icon name="envelope" size={18} color="#4f4f4f" />}
            containerStyle={[styles.inputContainerStyle, styles.raised]}
            inputContainerStyle={{
              borderBottomColor: 'rgba(255, 255, 255, 0)',
            }}
            onChangeText={emailText => this.setState({ emailText })}
            testID="registerEmailInput"
          />
          <Input
            placeholder="Full name"
            placeholderTextColor="#4f4f4f"
            leftIcon={<Icon name="user" size={18} color="#4f4f4f" />}
            containerStyle={[styles.inputContainerStyle, styles.raised]}
            inputContainerStyle={{
              borderBottomColor: 'rgba(255, 255, 255, 0)',
            }}
            onChangeText={fullNameText => this.setState({ fullNameText })}
            testID="registerFullNameInput"
          />
          <Input
            placeholder="Password"
            placeholderTextColor="#4f4f4f"
            leftIcon={<Icon name="lock" size={18} color="#4f4f4f" />}
            containerStyle={[styles.inputContainerStyle, styles.raised]}
            inputContainerStyle={{
              borderBottomColor: 'rgba(255, 255, 255, 0)',
            }}
            onChangeText={passwordText => this.setState({ passwordText })}
            testID="registerPasswordInput"
          />

          <Input
            placeholder="Repeat password"
            placeholderTextColor="#4f4f4f"
            leftIcon={<Icon name="lock" size={18} color="#4f4f4f" />}
            containerStyle={[styles.inputContainerStyle, styles.raised]}
            inputContainerStyle={{
              borderBottomColor: 'rgba(255, 255, 255, 0)',
            }}
            onChangeText={repeatPasswordText => this.setState({ repeatPasswordText })
            }
            testID="registerRepeatPasswordInput"
          />

          <View style={{ marginTop: '7%' }}>
            <Button
              loading={this.state.loading}
              title="Register"
              titleProps={{ fontFamily: 'lato-light' }}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#53F539', '#33ED30'],
                start: { x: 0.5, y: 0.5 },
              }}
              buttonStyle={{
                borderRadius: 20,
                elevation: 3,
                width: 330,
                paddingTop: 3,
                paddingBottom: 3,
              }}
              onPress={() => this.register()}
              testID="registerButton"
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: '3%' }}>
            <SocialIcon
              button
              light
              type="facebook"
              style={[styles.socialIconStyle, { marginRight: 40 }]}
              testID="registerFacebookButton"
            />
            <SocialIcon
              button
              light
              type="google-plus-official"
              style={[styles.socialIconStyle, { marginRight: 40 }]}
              testID="registerGoogleButton"
            />
            <SocialIcon
              button
              light
              type="twitter"
              style={styles.socialIconStyle}
              testID="registerTwitterButton"
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, fullName, password) => dispatch(signUp(email, fullName, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFA',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '15%',
    paddingLeft: '5%',
    paddingRight: '5%',
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
    borderRadius: 50,
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
  },
});
