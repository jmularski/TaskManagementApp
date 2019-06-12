import { projectActions } from '../types';

const initialState = {
  projects: []
}

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case projectActions.ADD_PROJECT_SUCCESS:
      return {
        projects: [...state.projects, action.payload]
      };
    case projectActions.GET_PROJECTS_SUCCESS:
      return {
        projects: [...state.projects, action.payload]
      };
    default:
      return state;
  }
};

export default projectReducer;