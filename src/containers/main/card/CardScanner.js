import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

export default class ScannerScreen extends React.Component {

  async componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }

    try {
      const card = await CardIOModule.scanCard()
      console.log(card)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return null
  }

}