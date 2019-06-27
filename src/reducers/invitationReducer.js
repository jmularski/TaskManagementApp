import { invitationActions } from "../types";

const initialState = {
  user: {
    isFetching: false,
    invitations: []
  },
  project: {
    isFetching: false,
    invitations: []
  }
};

function invitationReducer(state = initialState, action) {
  switch (action.type) {
    case invitationActions.ADD_INVITE_SUCCESS:
      return {
        ...state,
        project: {
          ...state.project,
          invitations: [...state.project.invitations, ...action.payload]
        }
      };
    case invitationActions.GET_PROJECT_INVITES:
      return {
        ...state,
        project: {
          ...state.project,
          isFetching: true
        }
      };
    case invitationActions.GET_PROJECT_INVITES_SUCCESS:
      return {
        ...state,
        project: {
          ...state.project,
          isFetching: false,
          invitations: action.payload
        }
      };
    case invitationActions.GET_PROJECT_INVITES_FAILURE:
      return {
        ...state,
        project: {
          ...state.project,
          isFetching: false
        }
      };
    case invitationActions.GET_USER_INVITES:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: true
        }
      };
    case invitationActions.GET_USER_INVITES_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false,
          invitations: action.payload
        }
      };
    case invitationActions.GET_PROJECT_INVITES_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false
        }
      };
    case invitationActions.RESPOND_INVITATION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          invitations: [
            ...state.user.invitations.filter(item => item.id !== action.payload)
          ]
        }
      };
    case invitationActions.CANCEL_INVITATION_SUCCESS:
      return {
        ...state,
        project: {
          ...state.project,
          invitations: [
            ...state.project.invitations.filter(item => item !== action.payload)
          ]
        }
      };
    default:
      return state;
  }
}

export default invitationReducer;
