import React from 'react';
import {
  View, StyleSheet, ActivityIndicator, Image,
} from 'react-native';
import { Input, CheckBox, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { getSelfInfo, updateUser } from '../../../actions/userActions';
import Toast from '../../../utils/Toast';

const _ = require('lodash');

class Options extends React.Component {
  static navigationOptions = {
    title: "Options"
  }

  constructor(props) {
    super(props);

    const {
      email, first_name, last_name, profile_img, settings,
    } = this.props.user.userData;

    this.startObj = {
      email,
      full_name: `${first_name} ${last_name}`,
      profile_img: profile_img !== null ? profile_img : 'https://via.placeholder.com/300',
      email_notifications_on_events: settings.email_notifications_on_events,
    };

    this.state = this.startObj;
  }

  componentDidMount() {
    this.props.getSelfInfo();
  }

  isChanged = () => _.isEqual(this.startObj, this.state);

  deepComparison = () => {
    // derived from gist https://gist.github.com/Yimiprod/7ee176597fef230d1451

    function changes(object, base) {
      return _.transform(object, (result, value, key) => {
        if (!_.isEqual(value, base[key])) {
          result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
        }
      });
    }

    return changes(this.state, this.startObj);
  };

  checkInputCorrectness = (emailText, fullNameText) => {
    if (emailText === '' || fullNameText === '') return 'You have to fill up all fields.';
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(emailText).toLowerCase())) return 'Your email was in wrong format.';
    if (fullNameText.indexOf(' ') === -1) return 'Full name is in wrong format';
  };

  transform_full_name = (diff) => {
    const name_array = diff.full_name.split(' ');
    const { full_name, ...noFullName } = diff;

    return {
      ...noFullName,
      first_name: name_array[0],
      last_name: name_array[1],
    };
  };

  sendDataToServer = (diff) => {
    this.props.updateUser(diff);
  }

  updateProfile = () => {
    let diff = this.deepComparison();
    const errors = this.checkInputCorrectness(this.state.email, this.state.full_name);
    if (errors) Toast(errors);
    else {
      if (diff.full_name) diff = this.transform_full_name(diff);
      this.sendDataToServer(diff);
    }
  };

  renderUpdateForm = () => {
    const {
      email, full_name, profile_img, email_notifications_on_events,
    } = this.state;

    return (
      <View>
        <View style={styles.topBar}>
          <Image
            source={{ uri: profile_img }}
            style={{
              width: 100, height: 100, borderRadius: 400, borderWidth: 1, marginTop: '2%',
            }}
            testID="optionsImage"
          />
          <Input
            value={full_name}
            onChangeText={fullNameText => this.setState({ full_name: fullNameText })}
            testID="optionsNameInput"
          />
        </View>
        <View style={styles.rest}>
          <Input
            label="Email"
            value={email}
            onChangeText={emailText => this.setState({ email: emailText })}
            testID="optionsEmailInput"
          />
          <CheckBox
            title="Do you want to receive notifications on email?"
            checked={email_notifications_on_events}
            onPress={() => this.setState({ email_notifications_on_events: !this.state.email_notifications_on_events })}
            testID="optionsNotifCheckbox"
          />
          <Button
            title="Update profile"
            titleProps={{ fontFamily: 'Lato-Light' }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#53F539', '#33ED30'],
              start: { x: 0.5, y: 0.5 },
            }}
            buttonStyle={styles.buttonStyle}
            disabledStyle={styles.buttonStyle}
            disabled={this.isChanged()}
            onPress={() => this.updateProfile()}
            testID="optionsUpdateProfile"
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        { this.props.user.isFetching
          ? <ActivityIndicator size="large" color="#0000ff" />
          : this.renderUpdateForm()
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getSelfInfo: () => dispatch(getSelfInfo()),
  updateUser: data => dispatch(updateUser(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: '30%',
  },
  rest: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 20,
    elevation: 3,
    width: 330,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
