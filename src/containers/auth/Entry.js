import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import Button from "@utils/Button";

export default class Entry extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View testID="WelcomeView" style={styles.container}>
        <Image
          source={require("../../../assets/img/login/calendar.png")}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Sign in"
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
            testID="signInButton"
          />
          <Button
            title="Sign up"
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
            testID="signUpButton"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10%",
    alignItems: "center"
  },
  image: {
    marginTop: "20%",
    height: 200,
    resizeMode: "contain"
  },
  buttonContainer: {
    marginTop: "40%"
  },
  button: {
    margin: 10
  }
});
