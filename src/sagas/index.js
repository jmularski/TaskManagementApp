import { all, spawn } from 'redux-saga/effects';

import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([spawn(authSaga)]);
}
