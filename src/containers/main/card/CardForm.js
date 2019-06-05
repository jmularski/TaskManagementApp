import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

class CardForm extends React.Component {
  render() {
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.bigText}>Add new card</Text>
        <View style={styles.form}>
          <Input
            placeholder="Name on card"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} />
          <Input
            placeholder="Card number"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} />
          <Input
            placeholder="Expiration eg. MM/YY"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} />
          <Input
            placeholder="CVV"
            placeholderTextColor="#4f4f4f" 
            containerStyle={styles.input} />
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
            }} />
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
  navigation: state.nav,
});

export default connect(
  mapStateToProps,
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
    textDecorationLine: 'underline',
  },
})