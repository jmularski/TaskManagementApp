import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Input, Icon } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from "react-redux";
import Button from "@utils/Button";
import { addTask, getTask } from "@store/Task/taskActions";
import Toast from "@utils/Toast";
import TaskItem from "./TaskItem";

const mapStateToProps = state => ({
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  addTask: payload => dispatch(addTask(payload)),
  getTask: () => dispatch(getTask())
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Tasks extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Tasks",
    headerLeft: (
      <Icon
        name="arrow-left"
        type="font-awesome"
        containerStyle={{ paddingLeft: 20 }}
        onPress={() => navigation.navigate("Main")}
      />
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      taskText: ""
    };
  }

  componentDidMount() {
    this.props.getTask();
  }

  addTask = () => {
    const { taskText } = this.state;
    if (taskText !== "") {
      this.RBSheet.close();
      this.props.addTask({
        name: taskText,
        description: ""
      });
    } else {
      Toast("You need to fill all fields!");
    }
  };

  renderTask = ({ item }) => <TaskItem text={item.name} />;

  render() {
    const { taskText } = this.state;
    const { tasks, navigation } = this.props;

    return (
      <View style={styles.container}>
        {tasks.isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={tasks.tasks}
            renderItem={this.renderTask}
            testID="tasksList"
          />
        )}
        <View style={styles.addButton}>
          <Button
            title=""
            style={styles.addButtonStyle}
            icon={<Icon name="user" type="font-awesome" color="white" />}
            onPress={() => navigation.navigate("Invitation")}
            testID="invitationButton"
          />
          <Button
            title=""
            icon={<Icon name="plus" type="font-awesome" color="white" />}
            style={styles.addButtonStyle}
            onPress={() => {
              this.RBSheet.open();
            }}
            testID="addTaskButton"
          />
        </View>
        <RBSheet
          ref={ref => (this.RBSheet = ref)}
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
              containerStyle={{ marginTop: "2%" }}
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
    paddingTop: 10
  },
  headerText: {
    fontFamily: "Lato-Regular",
    color: "black",
    fontSize: 26,
    marginLeft: "5%"
  },
  addButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20
  },
  addButtonStyle: {
    borderRadius: 100,
    width: 50,
    height: 50,
    marginLeft: "4%",
    marginRight: "49%"
  },
  span: {
    flexDirection: "row"
  }
});
