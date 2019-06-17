import React from 'react';
import {
  StyleSheet, Text, View, Image, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { signIn } from '../../actions/authActions';
import Button from '../../utils/Button';
import Toast from '../../utils/Toast';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
      passwordText: '',
    };

    this.schema = yup.object().shape({
      email: yup.string().required('You have to fill up all fields.').email('Your email was in wrong format.'),
      password: yup.string().required('You have to fill up all fields.').min(8, 'Password is too weak!'),
    });
  }

  checkInputCorrectness = async (emailText, passwordText) => {
    try {
      await this.schema.validate({ email: emailText, password: passwordText });
      return true;
    } catch (e) {
      Toast(e.message);
      return false;
    }
  };

  sendDataToServer = (emailText, passwordText) => {
    this.props.signIn(emailText, passwordText);
  };

  login = async () => {
    const { emailText, passwordText } = this.state;
    const isValid = await this.checkInputCorrectness(emailText, passwordText);
    if (isValid) this.sendDataToServer(emailText, passwordText);
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainContainer}>
          <Image
            source={require('../../../assets/img/login/calendar.png')}
            style={styles.image}
            testID="loginImage"
          />
          <Text
            testID="loginText"
            style={{
              color: '#232323',
              fontFamily: 'Lato-Light',
              fontSize: 40,
              paddingTop: '7%',
            }}
          >
            Welcome back
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
            testID="loginEmailInput"
          />

          <Input
            placeholder="Password"
            placeholderTextColor="#4f4f4f"
            leftIcon={<Icon name="lock" size={18} color="#4f4f4f" />}
            containerStyle={[styles.inputContainerStyle, styles.raised]}
            inputContainerStyle={{
              borderBottomColor: 'rgba(255, 255, 255, 0)',
            }}
            secureTextEntry
            onChangeText={passwordText => this.setState({ passwordText })}
            testID="loginPasswordInput"
          />

          <View style={{ marginTop: '7%' }}>
            <Button
              title="Login"
              onPress={() => this.login()}
              testID="loginButton"
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: '3%' }}>
            <SocialIcon
              button
              light
              type="facebook"
              style={[styles.socialIconStyle, { marginRight: 40 }]}
              testID="loginFacebookButton"
            />
            <SocialIcon
              button
              light
              type="google-plus-official"
              style={[styles.socialIconStyle, { marginRight: 40 }]}
              testID="loginGoogleButton"
            />
            <SocialIcon
              button
              light
              type="twitter"
              style={styles.socialIconStyle}
              testID="loginTwitterButton"
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
  image: {
    height: 170,
    resizeMode: 'contain',
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
