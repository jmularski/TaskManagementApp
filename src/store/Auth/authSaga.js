import { put, call, takeEvery, all } from "redux-saga/effects";
import AuthService from "src/services/auth.service";
import { authActions } from "src/store/types";
import { signIn, authSuccess, authFailure } from "src/store/Auth/authActions";
import Toast from "src/utils/Toast";
import { setToMainDrawer } from "src/store/actions/navActions";

function* signInUser({ payload }) {
  try {
    const response = yield call(AuthService.login, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(authSuccess({ token: response.data.token }));
    } else {
      yield put(authFailure(response.data));
    }
  } catch (e) {
    yield put(authFailure(Object.values(e.response.data)[0][0]));
  }
}

function* signUpUser({ payload }) {
  try {
    const response = yield call(AuthService.register, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(signIn(payload.email, payload.password));
    } else {
      yield put(authFailure(response.data));
    }
  } catch (e) {
    yield put(authFailure(Object.values(e.response.data)[0][0]));
  }
}

function* handleAuthSuccess() {
  yield put(setToMainDrawer());
}

function* handleAuthFailure({ payload }) {
  yield call(Toast, payload);
}

export default function* authSaga() {
  yield all([
    takeEvery(authActions.SIGN_IN, signInUser),
    takeEvery(authActions.SIGN_UP, signUpUser),
    takeEvery(authActions.AUTHENTICATION_SUCCESS, handleAuthSuccess),
    takeEvery(authActions.AUTHENTICATION_FAILURE, handleAuthFailure)
  ]);
}
