import { authActions } from '../types';

const initialState = {
  userData: {
    id: '',
    cards: []
  }
};


function userReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          id: action.payload.id,
          cards: action.payload.cards
        }
      };
    default:
      return state;
  }
}

export default userReducer;