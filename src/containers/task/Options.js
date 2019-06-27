import React from "react";
import { View } from "react-native";

export default class Options extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Tasks",
    headerLeft: (
      <Icon
        name="arrow-left"
        type="font-awesome"
        containerStyle={{ paddingLeft: 20 }}
        onPress={() => navigation.navigate("Main")}
      />
    )
  });

  render() {
    return <View />;
  }
}
