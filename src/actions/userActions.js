import { userActions } from '../types';

export const getSelfInfo = () => ({
  type: userActions.GET_SELF_INFO
});

export const getSelfInfoSuccess = payload => ({
  type: userActions.GET_SELF_INFO_SUCCESS,
  payload
});

export const requestFailure = errorMsg => ({
  type: userActions.REQUEST_FAILURE,
  payload: errorMsg
});