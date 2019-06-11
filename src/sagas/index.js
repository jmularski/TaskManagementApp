import { all, spawn } from 'redux-saga/effects';

import authSaga from './authSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([spawn(authSaga)]);
  yield all([spawn(userSaga)]);
}