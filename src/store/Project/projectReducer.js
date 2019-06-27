import { projectActions } from "src/store/types";

const initialState = {
  projects: [
    {
      id: 0,
      project_name: "Add new project"
    }
  ],
  isFetching: false
};

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case projectActions.GET_PROJECTS:
      return {
        ...state,
        isFetching: true
      };
    case projectActions.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case projectActions.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, ...action.payload],
        isFetching: false
      };
    case projectActions.GET_PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

export default projectReducer;
