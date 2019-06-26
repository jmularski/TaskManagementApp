import React from 'react';
import { View, ActivityIndicator, SectionList, StyleSheet, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getProjectInvites, cancelInvitation } from '../../../actions/invitationActions';
import Button from '../../../utils/Button';

const mapStateToProps = state => ({
  invitations: state.invitations,
});

const mapDispatchToProps = dispatch => ({
  getProjectInvites: () => dispatch(getProjectInvites()),
  cancelInvitation: payload => dispatch(cancelInvitation(payload)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class GetMembers extends React.Component {
  static navigationOptions = {
    title: 'Get members',
  };

  componentDidMount() {
    this.props.getProjectInvites();
  }

  cancelInvitation(data) {
    this.props.cancelInvitation(data);
  }

  renderListItem = (item) => {
    const profile_img = item.invited.profile_img !== null ? item.invited.profile_img : 'https://via.placeholder.com/300';
    return (
      <ListItem
        title={`${item.invited.first_name} ${item.invited.last_name}`}
        leftAvatar={{
          source: profile_img && { uri: profile_img },
          title: item.invited.first_name,
        }}
      />
    )
  };

  renderWaitingItem = (item) => {
    const profile_img = item.invited.profile_img !== null ? item.invited.profile_img : 'https://via.placeholder.com/300';
    return (
      <ListItem
        title={`${item.invited.first_name} ${item.invited.last_name}`}
        leftAvatar={{
          source: profile_img && { uri: profile_img },
          title: item.invited.first_name,
        }}        
        rightElement={(
          <Button
            title=""
            style={styles.roundButton}
            icon={(
                <Icon
                  name="undo"
                  type="font-awesome"
                  color="white"
                />
              )}
            onPress={() => this.cancelInvitation(item)}
          />
        )}
      />
    )
    
  }

  render() {
    const { invitations, isFetching } = this.props.invitations.project;

    const acceptedInvitation = invitations.filter(item => item.is_accepted);
    const rejectedInvitation = invitations.filter(item => item.is_rejected);
    const waitingInvitation = invitations.filter(item => !(item.is_accepted || item.is_rejected));

    return (
      <View>
        {
          isFetching
            ? <ActivityIndicator size="large" color="#0000ff" />
            : (
              <SectionList
                renderSectionHeader = {({section: {title}}) => <Text style={styles.dividerText}>{title}</Text> }
                renderItem = {({item}) => this.renderListItem(item)}
                sections={[
                  {title: 'Accepted', data: acceptedInvitation},
                  {title: 'Rejected', data: rejectedInvitation},
                  {title: 'Waiting', data: waitingInvitation, renderItem: ({item}) => this.renderWaitingItem(item)},
                ]}
                keyExtractor ={(item, index) => index.toString()}
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
  dividerText: {
    fontFamily: 'Lato-Light',
    fontSize: 20,
    padding: 15,
  },
});