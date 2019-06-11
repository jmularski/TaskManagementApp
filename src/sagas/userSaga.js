import {
  put, call, takeEvery, all, select,
} from 'redux-saga/effects';

import { getSelfInfoSuccess, requestFailure } from '../actions/userActions';
import { getToken } from '../reducers/authReducer';
import { userActions } from '../types';
import UserService from '../services/user.service';
import Toast from '../utils/Toast';

function* getSelfInfo() {
  try {
    const token = yield select(getToken);
    console.log(token);
    const response = yield call(UserService.getSelfData, token)
    if (response.status === 200 || response.status === 201) {
      console.log(response);
      yield put(getSelfInfoSuccess(response.data));
    } else {
      yield put(requestFailure(response.data));
    }
  } catch (e) {
    yield put(requestFailure(Object.values(e.response.data)[0]));
  }
}

function* requestFailureSaga({ payload }) {
  yield call(Toast, payload);
}

export default function* userSaga() {
  yield all([
    takeEvery(userActions.GET_SELF_INFO, getSelfInfo),
    takeEvery(userActions.REQUEST_FAILURE, requestFailureSaga),
  ])
}