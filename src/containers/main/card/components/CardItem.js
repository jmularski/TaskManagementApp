import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';

export default class CardItem extends React.Component {
  render() {
    return (
      <View style = {styles.cardRow} >
        <Image source = { require("../../../../../assets/img/card/card-front.png")} style = { styles.cardImage }/>
        <Text style = { styles.cardText }>{this.props.type} ●●●● {this.props.number} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    marginTop: '10%',
    paddingLeft: '10%'
  },
  cardImage: {
    width: 100,
    height: 70,
    borderRadius: 10
  },
  cardText: {
    fontSize: 18,
    marginTop: '6%',
    marginLeft: '10%',
    //fontFamily: 'lato-light'
  }
})