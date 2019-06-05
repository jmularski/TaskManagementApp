import { all, spawn } from 'redux-saga/effects';

import authSaga from './authSaga';
import cardSaga from './cardSaga';

export default function* rootSaga() {
  yield all([
    spawn(authSaga),
    spawn(cardSaga),
  ]);
}
