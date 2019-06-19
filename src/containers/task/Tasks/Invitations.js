import React from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import { Input, Icon, ListItem } from 'react-native-elements';
import Button from '../../../utils/Button';

export default class Invitations extends React.Component {
  static navigationOptions = {
    title: 'Invite somebody to your project',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President',
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman',
        },
      ],
      currentlyInvited: [],
    };
  }

  addToInvited = (name) => {
    if (this.state.currentlyInvited.includes(name)) {
      this.setState(state => ({
        currentlyInvited: state.currentlyInvited.filter(stateName => stateName !== name),
      }));
    } else this.setState(state => ({ currentlyInvited: [...state.currentlyInvited, name] }));
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{
        source: item.avatar_url && { uri: item.avatar_url },
        title: item.name,
      }}
      onPress={() => this.addToInvited(item.name)}
    />
  )


  render() {
    const { currentlyInvited, data } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.span}>
          <Input
            placeholder="Write person's name"
            placeholderTextColor="black"
            containerStyle={{
              backgroundColor: '#E8E8E8', borderRadius: 20, width: '85%', marginRight: '3%',
            }}
            inputContainerStyle={{
              borderBottomColor: 'rgba(255, 255, 255, 0)',
            }}
          />
          <Button
            title=""
            style={styles.findButtonStyle}
            icon={(
              <Icon
                name="search"
                type="font-awesome"
                color="white"
              />
)}
          />
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={this.renderItem}
        />
        {
            currentlyInvited.length != 0
              ? (
                <View style={[styles.span, styles.bottom]}>
                  <Text>
                    {`
                Currently invited ${currentlyInvited.length} ${currentlyInvited.length === 1 ? 'person' : 'people'}
                ${currentlyInvited.map(data => data)}
                `}
                  </Text>
                  <Button
                    title=""
                    icon={(
                      <Icon
                        name="user-plus"
                        type="font-awesome"
                        color="white"
                      />
)}
                    style={styles.addButtonStyle}
                  />
                </View>
              )
              : null
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  span: {
    flexDirection: 'row',
  },
  findButtonStyle: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '120%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#A7A7AA',
  },
  addButtonStyle: {
    borderRadius: 100,
    width: 50,
    height: 50,
    marginTop: '3%',
    marginLeft: '45%',
  },
});
