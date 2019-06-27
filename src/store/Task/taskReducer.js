import { taskActions } from "src/store/types";

const initialState = {
  isFetching: false,
  currentProjectId: 0,
  tasks: []
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case taskActions.ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case taskActions.GET_TASKS:
      return {
        ...state,
        isFetching: true
      };
    case taskActions.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        isFetching: false
      };
    case taskActions.GET_TASKS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case taskActions.SET_CURRENT_PROJECT:
      return {
        ...state,
        currentProjectId: action.payload
      };
    default:
      return state;
  }
}

export default taskReducer;

export const getCurrentProject = state => state.tasks.currentProjectId;
