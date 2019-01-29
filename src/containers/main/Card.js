import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CardItem from './components/CardItem';

export default class Card extends React.Component {

  state = {
    cards: [{
      type: 'Visa',
      number: '3467'
    }]
  }
  

  render() {
    return (
      <View style = { styles.mainContainer } >
        <View style = { styles.cardContainer} >
          <Text style={{color: '#232323', fontFamily: 'lato-light', fontSize: 25, alignSelf: 'center' }}>Cards</Text>
          
          <CardItem type = "Visa" number = "3467" />
        </View>

        <Button title = "+" buttonStyle = { styles.addCardButton }/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F3F4'
  },
  cardContainer: {
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'white',
    paddingBottom: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC1C6' 
  },
  addCardButton: {
    height: 40, 
    width: 40, 
    borderRadius: 20, 
    elevation: 3,
    position: 'absolute',
    right: '5%',
    bottom: -400,
  }
});