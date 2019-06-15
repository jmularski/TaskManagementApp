import React from 'react';
import {
  StyleSheet, Text, View, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { signUp } from '../../actions/authActions';
import Button from '../../utils/Button';
import Toast from '../../utils/Toast';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, fullName, password) => dispatch(signUp(email, fullName, password)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      fullNameText: '',
      passwordText: '',
      repeatPasswordText: '',
    };

    this.schema = yup.object().shape({
      email: yup.string().required('You have to fill up all fields.').email('Your email was in wrong format.'),
      fullName: yup.string().required('You have to fill up all fields.').matches(/\s/, 'Full name is in wrong format'),
      password: yup.string().required('You have to fill up all fields.').min(8, 'Password is too weak!'),
      repeatPassword: yup.string().required('You have to fill up all fields.').oneOf([yup.ref('password')], 'Password and repeated password are not the same'),
    });
  }

  checkInputCorrectness = async (emailText, fullNameText, passwordText, repeatPasswordText) => {
    try {
      await this.schema.validate({
        email: emailText,
        fullName: fullNameText,
        password: passwordText,
        repeatPassword: repeatPasswordText,
      });
      return true;
    } catch (e) {
      Toast(e.message);
      return false;
    }
  };

  register = async () => {
    const {
      emailText, fullNameText, passwordText, repeatPasswordText,
    } = this.state;
    const isValid = await this.checkInputCorrectness(
      emailText,
      fullNameText,
      passwordText,
      repeatPasswordText,
    );
    if (isValid) this.sendDataToServer(emailText, fullNameText, passwordText);
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
              title="Register"
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
