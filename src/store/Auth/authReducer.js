import { authActions } from "src/store/types";

const initialState = {
  token: ""
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        token: action.payload.token
      };
    default:
      return state;
  }
}

export default authReducer;

export const getToken = state => state.auth.token;
