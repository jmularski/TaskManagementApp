import { signIn, signUp, authSuccess, authFailure } from '../../../src/actions/authActions';
import { authActions } from '../../../src/types';

const email = "hello@world.pl";
const password = "1234";
const userData = { name: 'test', token: 'abcd' };
const error = "Error when logging user in!";
describe('Auth actions', () => {
  it('should create an signIn action', () => {
    const expectedAction = {
      type: authActions.SIGN_IN,
      payload: { email, password },
    };
    expect(signIn(email, password)).toEqual(expectedAction);
  });
  it('should create an signUp action', () => {
    const expectedAction = {
      type: authActions.SIGN_UP,
      payload: { email, password },
    };
    expect(signUp(email, password)).toEqual(expectedAction);
  });
  it('should create an authSuccess action', () => {
    const expectedAction = {
      type: authActions.AUTHENTICATION_SUCCESS,
      payload: userData
    };
    expect(authSuccess(userData)).toEqual(expectedAction);
  });
  it('should create an authFailure action', () => {
    const expectedAction = {
      type: authActions.AUTHENTICATION_FAILURE,
      payload: error
    };
    expect(authFailure(error)).toEqual(expectedAction);
  });
});