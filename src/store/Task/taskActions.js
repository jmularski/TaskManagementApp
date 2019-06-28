import { taskActions } from "@store/types";

export const addTask = payload => ({
  type: taskActions.ADD_TASK,
  payload
});

export const addTaskSuccess = payload => ({
  type: taskActions.ADD_TASK_SUCCESS,
  payload
});

export const addTaskFailure = payload => ({
  type: taskActions.ADD_TASK_FAILURE,
  payload
});

export const getTask = () => ({
  type: taskActions.GET_TASKS
});

export const getTaskSuccess = payload => ({
  type: taskActions.GET_TASKS_SUCCESS,
  payload
});

export const getTaskFailure = payload => ({
  type: taskActions.GET_TASKS_FAILURE,
  payload
});

export const setCurrentProject = projectId => ({
  type: taskActions.SET_CURRENT_PROJECT,
  payload: projectId
});
