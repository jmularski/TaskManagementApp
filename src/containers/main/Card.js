import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import CardItem from './components/CardItem';

export default class Card extends React.Component {

  state = {
    cards: [{
      type: 'Visa',
      number: '3467'
    }],
    buttonClicked: false
  }
  
  
  render() {
    return (
      <View style = { styles.mainContainer } >
        <View style = { styles.cardContainer} >
          {/*<Text style={{color: '#232323', fontFamily: 'lato-light', fontSize: 25, alignSelf: 'center' }}>Cards</Text>*/}
          
          <CardItem type = "Visa" number = "3467" />
        </View>

        { this.state.buttonClicked ?
          <View style = {styles.hiddenButtons}>
            <View style = {styles.span}>
              <Text style = {styles.hiddenButtonCaption}>Enter card details</Text>
              <Button 
                buttonStyle = {styles.roundedButton} 
                icon = {
                  <Icon
                    name='pencil'
                    type='evilicon'
                    color='white' />
                }
                title='' />
            </View>
            <View style = {styles.span}>
              <Text style = {styles.hiddenButtonCaption}>Scan card</Text>
              <Button 
                buttonStyle = {styles.roundedButton} 
                icon = {
                  <Icon 
                    name='scanner'
                    type='material'
                    color='white' />
                }
                title='' />
            </View> 
          </View>
        : null }
        <View style = { styles.addCardButton}>
          <Button 
            title = { this.state.buttonClicked ? "x" : "+" } 
            onPress = {() => this.setState(prevState => ({ buttonClicked: !prevState.buttonClicked}))} 
            buttonStyle = { styles.roundedButton } />
        </View>
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
  hiddenButtons: {
    position: 'absolute',
    right: '5%',
    bottom: '12%'
  },
  span: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '5%'
  },
  hiddenButtonCaption: {
    alignSelf: 'center',
    marginRight: '4%'
  },
  addCardButton: {
    position: 'absolute',
    right: '5%',
    bottom: '3%',
  },
  roundedButton: {
    height: 40, 
    width: 40, 
    borderRadius: 20, 
    elevation: 3,
  },

});