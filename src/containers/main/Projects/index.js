import React from 'react';
import {
  FlatList, View, Text, StyleSheet, TouchableWithoutFeedback, ActivityIndicator,
} from 'react-native';
import {
  Card, Icon, ListItem, Input,
} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import * as yup from 'yup';
import Button from '../../../utils/Button';
import { addProject, getProjects } from '../../../actions/projectActions';

class Projects extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      notif: [],
      projectName: '',
      projectDesc: '',
    };
  }

  componentDidMount() {
    this.props.getProjects();
  }

  componentWillUnmount() {
    this.RBSheet.close();
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      leftAvatar={{ source: { uri: item.avatar } }}
    />
  )

  renderCard = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => this.handleCardClick(item.id)}
      testID={`card${item.id}`}
    >
      <Card
        title={item.project_name}
        containerStyle={styles.roundCardList}
        dividerStyle={{ display: 'none' }}
        titleStyle={{ justifyContent: 'center' }}
      />
    </TouchableWithoutFeedback>
  );

  handleCardClick = (key) => {
    if (key === 0) {
      this.RBSheet.open();
    }
  }

  addProject = () => {
    const { projectName, projectDesc } = this.state;

    if (projectName === '' || projectDesc === '') { Toast('You need to fill all fields'); } else {
      this.RBSheet.close();
      this.props.addProject(projectName, projectDesc);
    }
  }


  render() {
    const { navigation, projects } = this.props;

    return (
      <View style={styles.containerStyle}>
        <View style={[styles.span, styles.spaceBetween]}>
          <Text style={styles.headerText}>Projects</Text>
          <Icon
            name="cog"
            type="font-awesome"
            containerStyle={styles.iconStyle}
            onPress={() => navigation.navigate('Options')}
            testID="optionsButton"
          />
        </View>
        {
          projects.isFetching
            ? <ActivityIndicator size="large" color="#0000ff" />
            : (
              <View style={{ height: '15%' }}>
                <FlatList
                  horizontal
                  keyExtractor={item => item.id.toString()}
                  data={projects.projects}
                  renderItem={this.renderCard}
                  testID="projectList"
                />
              </View>
            )
        }
        <Text style={styles.subheaderText}>Notifications feed</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.notif}
          renderItem={this.renderItem}
          testID="notificationsList"
        />
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={300}
          testID="projectBottomDrawer"
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.margin, { fontSize: 22 }]}>Add new project</Text>
            <Input
              label="Project name"
              containerStyle={styles.margin}
              onChangeText={projectName => this.setState({ projectName })}
              testID="projectNameInput"
            />
            <Input
              label="Description"
              containerStyle={styles.margin}
              onChangeText={projectDesc => this.setState({ projectDesc })}
              testID="projectDescInput"
            />
            <Button
              title="Add new project"
              onPress={() => this.addProject()}
              testID="addNewProjectButton"
            />
          </View>
        </RBSheet>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  addProject: (title, description) => dispatch(addProject({ title, description })),
  getProjects: () => dispatch(getProjects()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);


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
  roundCardList: {
    borderRadius: 15,
    justifyContent: 'center',
    width: 150,
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
  },
  subheaderText: {
    fontFamily: 'Lato-Light',
    marginTop: '5%',
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
    margin: 15,
  },
});
