import { put, call, takeEvery, all } from 'redux-saga/effects';

import AuthService from '../services/auth.service';
import { authActions } from '../types';
import {authSuccess, authFailure} from '../actions/authActions';
import Toast from '../utils/Toast';
import { setToMainDrawer } from '../actions/navActions';
function* signInUser({ payload }) {
  console.log(payload);
  try {
    const response = yield call(AuthService.login, payload);
    console.log(response);
    if (response.status === 200) {
      yield put(authSuccess({name: 'Placeholder', token: response.data.token}));
    } else {
      yield put(authFailure(response.data));
    }
  } catch(e) {
    yield put(authFailure(e.response.data.non_field_errors[0]));
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
    yield put(authFailure(e.message));
  }
}

function* handleAuthSuccess({ payload }) {
  yield put(setToMainDrawer())
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