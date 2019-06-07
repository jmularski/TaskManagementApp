import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import CardItem from './components/CardItem';

class Card extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.span}>
            <Text style={styles.textStyle}>Cards</Text>
            <Icon
              name="plus"
              type="font-awesome"
              containerStyle={styles.iconStyle}
              onPress={() => { this.props.navigation.navigate('Form'); }}
            />
          </View>

          <CardItem type="Visa" number="3467" />
        </View>
        <Button
          title="Create payment request"
          containerStyle={styles.paymentButton}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.card,
});

export default connect(
  mapStateToProps,
)(Card);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F3F4',
  },
  cardContainer: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'white',
    paddingBottom: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC1C6',
  },
  span: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
  },
  iconStyle: {
    position: 'absolute',
    right: 0,
    marginTop: '2%',
  },
  textStyle: {
    fontFamily: 'Lato-Light',
    fontSize: 30,
    color: 'black',
  },
  paymentButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
