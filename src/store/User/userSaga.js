import { put, call, takeEvery, all, select } from "redux-saga/effects";

import { getToken } from "@store/Auth/authReducer";
import { userActions } from "@store/types";
import UserService from "@services/user.service";
import Toast from "@utils/Toast";
import {
  getSelfInfoSuccess,
  updateUserSuccess,
  requestFailure,
  getUserInfoSuccess
} from "./userActions";

function* getSelfInfo() {
  try {
    const token = yield select(getToken);
    const response = yield call(UserService.getSelfData, token);
    if (response.status === 200 || response.status === 201) {
      yield put(getSelfInfoSuccess(response.data));
    } else {
      yield put(requestFailure(response.data));
    }
  } catch (e) {
    yield put(requestFailure(Object.values(e.response.data)[0]));
  }
}

function* getUserInfo({ payload }) {
  try {
    const token = yield select(getToken);
    const response = yield call(UserService.getUserData, token, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(getUserInfoSuccess(response.data));
    } else {
      yield put(requestFailure(response.data));
    }
  } catch (e) {
    yield put(requestFailure("Failed to fetch users!"));
  }
}

function* updateUser({ payload }) {
  try {
    const token = yield select(getToken);
    const response = yield call(UserService.updateUser, payload, token);
    if (response.status === 200 || response.status === 201) {
      yield put(updateUserSuccess(response.data));
    } else {
      yield put(requestFailure(response.data));
    }
  } catch (e) {
    yield put(requestFailure(Object.values(e.response.data)[0]));
  }
}

function* updateUserSuccessSaga() {
  yield call(Toast, "Successful update!");
}

function* updateImage({ payload }) {
  try {
    const token = yield select(getToken);
    const response = yield call(UserService.updateImage, payload.image, token);
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data));
    } else {
      yield put(requestFailure(response.data));
    }
  } catch (e) {
    yield put(requestFailure(Object.values(e.response.data)[0]));
  }
}

function* updateImageSuccessSaga() {
  yield call(Toast, "Successfully updated image!");
}

function* requestFailureSaga({ payload }) {
  yield call(Toast, payload);
}

export default function* userSaga() {
  yield all([
    takeEvery(userActions.GET_SELF_INFO, getSelfInfo),
    takeEvery(userActions.GET_USER_INFO, getUserInfo),
    takeEvery(userActions.UPDATE_USER, updateUser),
    takeEvery(userActions.UPDATE_USER_SUCCESS, updateUserSuccessSaga),
    takeEvery(userActions.UPDATE_IMAGE, updateImage),
    takeEvery(userActions.UPDATE_IMAGE_SUCCESS, updateImageSuccessSaga),
    takeEvery(userActions.REQUEST_FAILURE, requestFailureSaga)
  ]);
}
