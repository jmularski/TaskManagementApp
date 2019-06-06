import userReducer from '../../../src/reducers/authReducer';
import { authActions } from '../../../src/types';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual({
      userData: {
        name: '',
        token: '',
      },
    });
  });
  it('should handle AUTHENTICATION_SUCCESS', () => {
    expect(
      userReducer([], {
        type: authActions.AUTHENTICATION_SUCCESS,
        payload: { name: 'Test', token: 'tokenTest' }
      })
    ).toEqual({
      userData: {
        name: 'Test',
        token: 'tokenTest',
      },
    });
  });
});