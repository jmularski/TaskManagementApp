/* eslint camelcase: 0 */

import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Input, CheckBox } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import { isEqual, transform, isObject } from "lodash";
import * as yup from "yup";
import { getSelfInfo, updateUser, updateImage } from "@store/User/userActions";
import Button from "@utils/Button";
import Toast from "@utils/Toast";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getSelfInfo: () => dispatch(getSelfInfo()),
  updateUser: data => dispatch(updateUser(data)),
  updateImage: image => dispatch(updateImage({ image }))
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Options extends React.Component {
  static navigationOptions = {
    title: "Options"
  };

  constructor(props) {
    super(props);

    this.startObj = {};

    this.state = this.startObj;

    this.schema = yup.object().shape({
      email: yup
        .string()
        .required("You have to fill up all fields.")
        .email("Your email was in wrong format."),
      fullName: yup
        .string()
        .required("You have to fill up all fields.")
        .matches(/\s/, "Full name is in wrong format")
    });
  }

  componentDidMount() {
    this.props.getSelfInfo();
  }

  componentWillReceiveProps(props) {
    const {
      email,
      first_name,
      last_name,
      profile_img,
      settings
    } = props.user.userData;

    this.startObj = {
      email,
      full_name: `${first_name} ${last_name}`,
      profile_img:
        profile_img !== null ? profile_img : "https://via.placeholder.com/300",
      email_notifications_on_events: settings.email_notifications_on_events
    };

    this.state = this.startObj;
  }

  isChanged = () => isEqual(this.startObj, this.state);

  deepComparison = () => {
    // derived from gist https://gist.github.com/Yimiprod/7ee176597fef230d1451

    function changes(object, base) {
      return transform(object, (result, value, key) => {
        if (!isEqual(value, base[key])) {
          result[key] =
            isObject(value) && isObject(base[key])
              ? changes(value, base[key])
              : value;
        }
      });
    }

    return changes(this.state, this.startObj);
  };

  checkInputCorrectness = async (emailText, fullNameText) => {
    try {
      await this.schema.validate({ email: emailText, fullName: fullNameText });
      return true;
    } catch (e) {
      Toast(e.message);
      return false;
    }
  };

  transform_full_name = diff => {
    const name_array = diff.full_name.split(" ");
    const { full_name, ...noFullName } = diff;

    return {
      ...noFullName,
      first_name: name_array[0],
      last_name: name_array[1]
    };
  };

  sendDataToServer = diff => {
    this.props.updateUser(diff);
  };

  updateProfile = async () => {
    const { email, full_name } = this.state;

    let diff = this.deepComparison();
    const isValid = await this.checkInputCorrectness(email, full_name);
    if (isValid) {
      if (diff.full_name) diff = this.transform_full_name(diff);
      this.sendDataToServer(diff);
    }
  };

  updateImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300
    }).then(image => {
      this.props.updateImage(image);
    });
  };

  renderUpdateForm = () => {
    const {
      email,
      full_name,
      profile_img,
      email_notifications_on_events
    } = this.state;

    return (
      <View>
        <View style={styles.topBar}>
          <TouchableWithoutFeedback onPress={() => this.updateImage()}>
            <Image
              source={{ uri: profile_img }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 400,
                borderWidth: 1,
                marginTop: "2%"
              }}
              testID="optionsImage"
            />
          </TouchableWithoutFeedback>
          <Input
            value={full_name}
            onChangeText={fullNameText =>
              this.setState({ full_name: fullNameText })
            }
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
            onPress={() =>
              this.setState(prevState => ({
                email_notifications_on_events: !prevState.email_notifications_on_events
              }))
            }
            testID="optionsNotifCheckbox"
          />
          <Button
            title="Update profile"
            disabled={this.isChanged()}
            onPress={() => this.updateProfile()}
            testID="optionsUpdateProfile"
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.user.isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          this.renderUpdateForm()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    justifyContent: "center",
    alignItems: "center",
    margin: "3%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: "30%"
  },
  rest: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
