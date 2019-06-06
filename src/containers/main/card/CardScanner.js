import React from 'react';
import {
  Platform,
} from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

export default class ScannerScreen extends React.Component {
  async componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }

    try {
      const card = await CardIOModule.scanCard();
    } catch (err) {
    }
  }

  render() {
    return null;
  }
}
