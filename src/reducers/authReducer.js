import { authActions } from '../types';

const initialState = {
  userData: {
    name: '',
    token: '',
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          token: action.payload.token,
        },
      };
    default:
      return state;
  }
}

export default userReducer;
