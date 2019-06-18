import { all, spawn } from 'redux-saga/effects';

import authSaga from './authSaga';
import userSaga from './userSaga';
import projectSaga from './projectSaga';
import taskSaga from './taskSaga';

export default function* rootSaga() {
  yield all([spawn(authSaga)]);
  yield all([spawn(userSaga)]);
  yield all([spawn(projectSaga)]);
  yield all([spawn(taskSaga)]);
}
