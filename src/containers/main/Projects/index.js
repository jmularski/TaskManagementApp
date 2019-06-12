import React from 'react';
import {
  FlatList, View, Text, StyleSheet,
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notif: [
        {
          id: '123',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          title: 'Notifka',
        },
      ],
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
          <Card
            title="Add new project"
            containerStyle={styles.roundCard}
            dividerStyle={{ display: 'none' }}
            titleStyle={{ justifyContent: 'center' }}
          />
        </View>
        <Text style={styles.subheaderText}>Notifications feed</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.notif}
          renderItem={this.renderItem}
        />
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
});
