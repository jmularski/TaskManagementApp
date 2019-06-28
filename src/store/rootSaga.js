import { all, spawn } from "redux-saga/effects";

import authSaga from "@store/Auth/authSaga";
import userSaga from "@store/User/userSaga";
import projectSaga from "@store/Project/projectSaga";
import taskSaga from "@store/Task/taskSaga";
import invitationSaga from "@store/Invitation/invitationSaga";

export default function* rootSaga() {
  yield all([spawn(authSaga)]);
  yield all([spawn(userSaga)]);
  yield all([spawn(projectSaga)]);
  yield all([spawn(taskSaga)]);
  yield all([spawn(invitationSaga)]);
}
