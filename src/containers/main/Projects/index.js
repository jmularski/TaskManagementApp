import React from 'react';
import {
  FlatList, View, Text, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import { Card, Icon, ListItem, Input } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../../utils/Button';

export default class Projects extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      leftAvatar={{ source: { uri: item.avatar } }}
    />
  )

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={[styles.span, styles.spaceBetween]}>
          <Text style={styles.headerText}>Projects</Text>
          <Icon
            name="cog"
            type="font-awesome"
            containerStyle={styles.iconStyle}
            onPress={() => this.props.navigation.navigate('Options')}
            testID="optionsButton"
          />
        </View>
        <View style={styles.span}>
          <TouchableWithoutFeedback onPress={() => this.RBSheet.open()}>
            <Card
              title="Add new project"
              containerStyle={styles.roundCard}
              dividerStyle={{ display: 'none' }}
              titleStyle={{ justifyContent: 'center' }}
            />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.subheaderText}>Notifications feed</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.notif}
          renderItem={this.renderItem}
        />
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
        >
          <View style = {{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.margin, {fontSize: 22}]}>Add new project</Text>
            <Input
              label="Project name"
              containerStyle = {styles.margin}
            />
            <Input
              label="Description"
              containerStyle = {styles.margin}
            />
            <Button
              title="Add new project"
            />
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: '5%',
  },
  span: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Lato-Light',
    fontSize: 30,
  },
  iconStyle: {
    marginTop: '1%',
  },
  roundCard: {
    borderRadius: 15,
    marginLeft: '-1%',
    height: '50%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
  },
  subheaderText: {
    fontFamily: 'Lato-Light',
    marginTop: '-15%',
    fontSize: 23,
  },
  buttonStyle: {
    borderRadius: 20,
    elevation: 3,
    width: 330,
    paddingTop: 3,
    paddingBottom: 3,
  },
  margin: {
    margin: 15
  }
});
