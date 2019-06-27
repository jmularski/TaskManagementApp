import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Input } from "react-native-elements";

export default function CustomInput(props) {
  const {
    placeholder,
    leftIcon,
    onChangeText,
    testID,
    secureTextEntry = false
  } = props;

  return (
    <Input
      placeholder={placeholder}
      placeholderTextColor="#4f4f4f"
      leftIcon={leftIcon}
      containerStyle={[styles.inputContainerStyle, styles.raised]}
      inputContainerStyle={{
        borderBottomColor: "rgba(255, 255, 255, 0)"
      }}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      testID={testID}
    />
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: "7%",
    borderRadius: 20,
    borderColor: "#fff"
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  }
});
