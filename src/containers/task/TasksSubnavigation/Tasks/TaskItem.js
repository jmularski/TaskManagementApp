import React from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animated: new Animated.Value(1),
      checked: false
    };
  }

  fadeOut = () => {
    this.setState({ checked: true });

    const { animated } = this.state;

    Animated.timing(animated, {
      toValue: 0,
      duration: 2000
    }).start();
  };

  render() {
    const { checked, animated } = this.state;
    const { text } = this.props;
    return (
      <Animated.View
        style={[styles.span, { marginTop: "2%", opacity: animated }]}
      >
        <CheckBox
          checked={checked}
          containerStyle={styles.checkboxStyle}
          onPress={() => this.fadeOut()}
        />
        <Text style={styles.checkboxText}>{text}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "Lato-Regular",
    fontSize: 18,
    color: "black",
    marginTop: "4%"
  },
  checkboxStyle: {
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  span: {
    flexDirection: "row"
  }
});
