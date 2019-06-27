import { all, spawn } from "redux-saga/effects";

import authSaga from "src/store/Auth/authSaga";
import userSaga from "src/store/User/userSaga";
import projectSaga from "src/store/Project/projectSaga";
import taskSaga from "src/store/Task/taskSaga";
import invitationSaga from "src/store/Invitation/invitationSaga";

export default function* rootSaga() {
  yield all([spawn(authSaga)]);
  yield all([spawn(userSaga)]);
  yield all([spawn(projectSaga)]);
  yield all([spawn(taskSaga)]);
  yield all([spawn(invitationSaga)]);
}
