import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { addCard } from '../../../actions/cardActions';
import Toast from '../../../utils/Toast';

class CardForm extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      nameText: '',
      numberText: '',
      expirationText: '',
      cvcText: '',
    };
  };

  checkInputCorrectness = (payload) => {
    const { number, expiration, cvc } = payload; 
    const expirationDate = new Date().setFullYear(expiration.year, expiration.month, 1);
    if (number === '' || expiration.month === '' || expiration.year === '' || cvc === '') return 'You have to fill out all fields';
    if (expirationDate < new Date()) return 'Your card has expired!';
  }

  sendDataToServer = (payload) => {
    this.props.addCard(payload);
  };

  structurisePayload = () => {
    expiration = this.state.expirationText.split('/');
    return {
      token: this.props.auth.userData.token,
      number: this.state.numberText,
      expiration: {
        month: expiration[0],
        year: expiration[1]
      },
      cvc: this.state.cvcText,
    };
  };

  addCard = () => {
    payload = this.structurisePayload();
    const errors = this.checkInputCorrectness(payload);
    if (errors) Toast(errors);
    this.sendDataToServer(payload);
  };

  handleExpiration = (expirationText) => {
    if (expirationText.length == 2) this.setState({ expirationText: expirationText + "/"});
    else this.setState({ expirationText });
  };

  render() {
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.bigText}>Add new card</Text>
        <View style={styles.form}>
          <Input
            placeholder="Name on card"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} 
            onChangeText={nameText => this.setState({ nameText })} />
          <Input
            placeholder="Card number"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} 
            maxLength={16}
            keyboardType='numeric'
            onChangeText={numberText => this.setState({ numberText })} />
          <Input
            placeholder="Expiration eg. MM/YY"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} 
            value={this.state.expirationText}
            maxLength={5}
            keyboardType='numeric'
            onChangeText={expirationText => this.handleExpiration( expirationText )} />
          <Input
            placeholder="CVC"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} 
            maxLength={3}
            keyboardType='numeric'
            onChangeText={cvcText => this.setState({ cvcText })} />
          <Button
            title="Add a new card"
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#53F539', '#33ED30'],
              start: { x: 0.5, y: 0.5 },
            }}
            buttonStyle={{
              borderRadius: 20,
              elevation: 3,
              width: 330,
              paddingTop: 3,
              paddingBottom: 3,
            }} 
            onPress={() => this.addCard()}/>
          <Text
            style={styles.scannerText}
            onPress={() => {this.props.navigation.navigate("Scanner")}}>
            Or use a card scanner instead
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  addCard: (cardData) => dispatch(addCard(cardData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardForm);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F3F4',
    paddingTop: '5%',
  },
  bigText: {
    fontFamily: 'Lato-Light',
    fontSize: 30,
    color: 'black',
    marginLeft: '5%',
    marginBottom: '2%',
  },
  input: {
    marginTop: '2%',
    marginBottom: '2%',
  },
  spannedInput: {
    width: '40%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  form: {
    alignItems: 'center',
  },
  span: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: '2%',
  },
  scannerText: {
    margin: '2%',
    color: 'blue',
  },
})