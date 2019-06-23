import React from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import { Input, Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Button from '../../../../utils/Button';
import { getUserInfo } from '../../../../actions/userActions';
import { addInvite } from '../../../../actions/invitationActions';

const mapStateToProps = state => ({
  invitations: state.invitations,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: query => dispatch(getUserInfo(query)),
  addInvite: payload => dispatch(addInvite(payload)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AddInvite extends React.Component {
  static navigationOptions = {
    title: 'Add invite',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentlyInvited: [],
      findText: '',
    };
  }

  addToInvited = (id) => {
    this.setState(state => ({
      currentlyInvited: state.currentlyInvited.filter(stateId => stateId.id !== id),
    }));
    this.setState(state => ({ currentlyInvited: [...state.currentlyInvited, { id }] }));
  }

  renderItem = ({ item }) => {
    const profile_img = item.profile_img !== null ? item.profile_img : 'https://via.placeholder.com/300';
    return (
      <ListItem
        title={`${item.first_name} ${item.last_name}`}
        leftAvatar={{
          source: profile_img && { uri: profile_img },
          title: item.first_name,
        }}
        onPress={() => this.addToInvited(item.id)}
      />
    );
  }

  findUser = () => {
    const { findText } = this.state;
    this.props.getUserInfo(findText);
  };

  sendInvitations = () => {
    const { currentlyInvited } = this.state;
    this.props.addInvite(currentlyInvited);
  }

  render() {
    const { currentlyInvited } = this.state;
    const { user } = this.props;

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
            onChangeText={findText => this.setState({ findText })}
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
            onPress={() => this.findUser()}
          />
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={user.searchedUserData}
          renderItem={this.renderItem}
        />
        {
            currentlyInvited.length !== 0
              ? (
                <View style={[styles.span, styles.bottom]}>
                  <Text>
                    {`
                Currently invited ${currentlyInvited.length} ${currentlyInvited.length === 1 ? 'person' : 'people'}
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
                    onPress={() => this.sendInvitations()}
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
    backgroundColor: 'white',
  },
  addButtonStyle: {
    borderRadius: 100,
    width: 50,
    height: 50,
    marginTop: '1%',
    marginLeft: '45%',
  },
});
