import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getSelfInfo } from '../../../actions/userActions';

class Options extends React.Component {

  componentDidMount() {
    this.props.getSelfInfo();
  }

  renderUpdateForm = () => {
    {/* 
      <View style = {styles.topBar}>

      </View> */}
  }

  render() {
    return (
      <View style = {styles.container}>   
        { this.props.user.isFetching ? 
          <ActivityIndicator size="large" color="#0000ff" /> :
          this.renderUpdateForm()
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getSelfInfo: () => dispatch(getSelfInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});