import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getProjectInvites } from '../../../../actions/invitationActions';
import Button from '../../../../utils/Button';

const mapStateToProps = state => ({
  invitations: state.invitations,
});

const mapDispatchToProps = dispatch => ({
  getProjectInvites: () => dispatch(getProjectInvites()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class GetInvites extends React.Component {
  static navigationOptions = {
    title: 'Current invites',
  };

  componentDidMount() {
    this.props.getProjectInvites();
  }

  renderItem = ({ item }) => {
    const profile_img = item.owner.profile_img !== null ? item.owner.profile_img : 'https://via.placeholder.com/300';
    return (
      <ListItem
        title={`${item.owner.first_name} ${item.owner.last_name}`}
        leftAvatar={{
          source: profile_img && { uri: profile_img },
          title: item.owner.first_name,
        }}        
        rightElement={(
          <Button
            title=""
            style={styles.roundButton}
            icon={(
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="white"
                />
              )}
          />
        )}
      />
    )
    
  }

  render() {
    const { invitations } = this.props;

    return (
      <View>
        {
          invitations.project.isFetching
            ? <ActivityIndicator size="large" color="#0000ff" />
            : (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={invitations.project.invitations}
                renderItem={this.renderItem}
                testID="projectInvitationList"
              />
            )
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  roundButton: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});