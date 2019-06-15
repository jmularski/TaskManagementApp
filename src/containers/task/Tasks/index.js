import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import TaskItem from './TaskItem';
import Button from '../../../utils/Button';

export default class Tasks extends React.Component {
  render() {
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
        <View style={styles.addButton}>
          <Button
            title="+"
            style={{ borderRadius: 100, width: 40, height: 40 }}
            onPress={() => {
              this.RBSheet.open();
            }}
          />
        </View>
        <TaskItem text="Hello world" />
        <RBSheet
          ref={ref => this.RBSheet = ref}
          height={50}
          testID="tasksBottomDrawer"
        >
          <View style={styles.span}>
            <Input
              placeholder="Insert task name"
              ref={ref => this.taskInput = ref}
            />
            <Icon
              name="paper-plane"
              type="font-awesome"
              containerStyle={{ marginTop: '2%' }}
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
