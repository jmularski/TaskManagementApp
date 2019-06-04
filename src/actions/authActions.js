import { authActions } from '../types';

export const signIn = (email, password) => ({
  type: authActions.SIGN_IN,
  payload: { email, password },
});

export const signUp = (email, password) => ({
  type: authActions.SIGN_UP,
  payload: { email, password },
});

export const authSuccess = userData => ({
  type: authActions.AUTHENTICATION_SUCCESS,
  payload: userData,
});

export const authFailure = error => ({
  type: authActions.AUTHENTICATION_FAILURE,
  payload: error,
});
