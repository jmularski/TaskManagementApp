import { put, call, takeEvery, all } from 'redux-saga/effects';

import AuthService from '../services/auth.service';
import { authActions } from '../types';
import {authSuccess, authFailure} from '../actions/authActions';
import Toast from '../utils/Toast';
function* signInUser({ payload }) {
  try {
    const response = yield call(AuthService.login, payload);
    if (response.status === 200) {
      yield put(authSuccess(response.data));
    } else {
      yield put(authFailure(response.status));
    }
  } catch(e) {
    yield put(authFailure(e));
  }
}

function* signUpUser({ payload }) {
  try {
    const response = yield call(AuthService.register, payload);
    if (response.status === 200) {
      yield put(authSuccess(response.data));
    } else {
      yield put(authFailure(response.status));
    }
  } catch(e) {
    yield put(authFailure(e));
  }
}

function* handleAuthSuccess({ payload }) {

};

function* handleAuthFailure({ payload }) {
  yield call(Toast, payload);
};

export default function* userSaga() {
  yield all([
    takeEvery(authActions.SIGN_IN, signInUser),
    takeEvery(authActions.SIGN_UP, signUpUser),
    takeEvery(authActions.AUTHENTICATION_SUCCESS, handleAuthSuccess),
    takeEvery(authActions.AUTHENTICATION_FAILURE, handleAuthFailure),
  ])
};