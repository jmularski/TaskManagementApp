import { projectActions } from '../types';

const initialState = {
  projects: [{
    id: 0,
    project_name: 'Add new project'
  }],
  isFetching: false,
}

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case projectActions.GET_PROJECTS:
      return {
        ...state,
        isFetching: true
      }
    case projectActions.ADD_PROJECT_SUCCESS:
      return {
        projects: [...state.projects, ...action.payload]
      };
    case projectActions.GET_PROJECTS_SUCCESS:
      return {
        projects: [...state.projects, ...action.payload],
        isFetching: false
      };
    default:
      return state;
  }
};

export default projectReducer;