import { userActions } from "src/store/types";

export const getSelfInfo = () => ({
  type: userActions.GET_SELF_INFO
});

export const getSelfInfoSuccess = payload => ({
  type: userActions.GET_SELF_INFO_SUCCESS,
  payload
});

export const getUserInfo = payload => ({
  type: userActions.GET_USER_INFO,
  payload
});

export const getUserInfoSuccess = payload => ({
  type: userActions.GET_USER_INFO_SUCCESS,
  payload
});

export const updateUser = payload => ({
  type: userActions.UPDATE_USER,
  payload
});

export const updateUserSuccess = payload => ({
  type: userActions.UPDATE_USER_SUCCESS,
  payload
});

export const updateImage = payload => ({
  type: userActions.UPDATE_IMAGE,
  payload
});

export const updateImageSuccess = payload => ({
  type: userActions.UPDATE_IMAGE_SUCCESS,
  payload
});

export const requestFailure = errorMsg => ({
  type: userActions.REQUEST_FAILURE,
  payload: errorMsg
});
