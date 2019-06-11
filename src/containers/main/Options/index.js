import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Input, CheckBox, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getSelfInfo } from '../../../actions/userActions';
import LinearGradient from 'react-native-linear-gradient';

const _ = require('lodash');

class Options extends React.Component {

  constructor(props) {
    super(props);

    const { email, first_name, last_name, profile_img, settings } = this.props.user.userData;

    this.startObj = {
      email,
      full_name: first_name + " " + last_name,
      profile_img: profile_img !== null ? profile_img : 'https://via.placeholder.com/300',
      email_notifications_on_events: settings.email_notifications_on_events
    }

    this.state = this.startObj;
  }

  isChanged = () => {
    return _.isEqual(this.startObj, this.state);
  }

  componentDidMount() {
    this.props.getSelfInfo();
  }

  renderUpdateForm = () => {
    const { email, full_name, profile_img, email_notifications_on_events } = this.state;

    return (
      <View>
        <View style = {styles.topBar}>
          <Image  
            source = {{uri: profile_img}}
            style = {{width: 100, height: 100, borderRadius: 400, borderWidth: 1}}
          />
          <Input 
            value={full_name}
            onChangeText={fullNameText => this.setState({full_name: fullNameText})}
          />
        </View>
        <View style = {styles.rest}>
          <Input
            label="Email"
            value={email}
            onChangeText={emailText => this.setState({email: emailText})}
          />
          <CheckBox
            title='Do you want to receive notifications on email?'
            checked={email_notifications_on_events}
            onPress={() => this.setState({email_notifications_on_events: !this.state.email_notifications_on_events})}
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
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style = {styles.container}>   
        { this.props.user.isFetching ? 
          <ActivityIndicator size="large" color="#0000ff" /> :
          this.renderUpdateForm()
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getSelfInfo: () => dispatch(getSelfInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3%',
    shadowColor: "#000",
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
  }
});