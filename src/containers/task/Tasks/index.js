import React from 'react';
import {
  View, StyleSheet, Text, ActivityIndicator, FlatList,
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import Button from '../../../utils/Button';
import { addTask, getTask } from '../../../actions/taskActions';
import Toast from '../../../utils/Toast';

const mapStateToProps = state => ({
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  addTask: payload => dispatch(addTask(payload)),
  getTask: () => dispatch(getTask()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskText: '',
    };
  }

  componentDidMount() {
    this.props.getTask();
  }

  addTask = () => {
    const { taskText } = this.state;
    if(taskText !== ''){
      this.RBSheet.close();
      this.props.addTask({
        name: taskText,
        description: '',
      });
    } else {
      Toast('You need to fill all fields!')
    }
  };

  renderTask = ({ item }) => (
    <TaskItem
      text={item.name}
    />
  );

  render() {
    const { taskText } = this.state;
    const { tasks } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.span}>
          <Icon
            name="arrow-left"
            type="font-awesome"
            containerStyle={{ marginTop: '0.5%', marginLeft: '-1%' }}
          />
          <Text style={styles.headerText}>Tasks</Text>
        </View>
        {
          tasks.isFetching
            ? <ActivityIndicator size="large" color="#0000ff" />
            : (
              <FlatList
                keyExtractor={item => item.id.toString()}
                data={tasks.tasks}
                renderItem={this.renderTask}
                testID="tasksList"
              />
            )
        }
        <View style={styles.addButton}>
          <Button
            title="+"
            style={{ borderRadius: 100, width: 40, height: 40 }}
            onPress={() => {
              this.RBSheet.open();
            }}
            testID="addTaskButton"
          />
        </View>
        <RBSheet
          ref={ref => this.RBSheet = ref}
          height={50}
          testID="tasksBottomDrawer"
        >
          <View style={styles.span}>
            <Input
              placeholder="Insert task name"
              value={taskText}
              onChangeText={taskText => this.setState({ taskText })}
              testID="taskNameInput"
            />
            <Icon
              name="paper-plane"
              type="font-awesome"
              containerStyle={{ marginTop: '2%' }}
              onPress={() => this.addTask()}
              testID="sendTaskButton"
            />
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 10,
  },
  headerText: {
    fontFamily: 'Lato-Regular',
    color: 'black',
    fontSize: 26,
    marginLeft: '5%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 15,
  },
  span: {
    flexDirection: 'row',
  },
});
