import {
  put, call, takeEvery, all, select,
} from 'redux-saga/effects';

import { getSelfInfoSuccess, updateUserSuccess, requestFailure } from '../actions/userActions';
import { getToken } from '../reducers/authReducer';
import { userActions } from '../types';
import UserService from '../services/user.service';
import Toast from '../utils/Toast';

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

function* updateUserSuccessSaga({ payload }) {
  yield call(Toast, 'Successful update!');
}

function* requestFailureSaga({ payload }) {
  yield call(Toast, payload);
}

export default function* userSaga() {
  yield all([
    takeEvery(userActions.GET_SELF_INFO, getSelfInfo),
    takeEvery(userActions.UPDATE_USER, updateUser),
    takeEvery(userActions.UPDATE_USER_SUCCESS, updateUserSuccessSaga),
    takeEvery(userActions.REQUEST_FAILURE, requestFailureSaga),
  ]);
}
