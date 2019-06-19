import { invitationActions } from '../types';

const initialState = {
  invitations: [],
};

function invitationReducer(state = initialState, action) {
  switch (action.type) {
    case invitationActions.ADD_INVITE_SUCCESS:
      return {
        ...state,
        invitations: [...state.invitations, action.payload],
      };
    case invitationActions.GET_PROJECT_INVITES_SUCCESS:
      return {
        ...state,
        invitations: action.payload,
      };
    default:
      return state;
  }
}

export default invitationReducer;
