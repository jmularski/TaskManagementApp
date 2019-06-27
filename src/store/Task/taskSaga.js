import { put, call, takeEvery, all, select } from "redux-saga/effects";
import TaskService from "src/services/task.service";
import { taskActions } from "src/store/types";
import {
  addTaskSuccess,
  addTaskFailure,
  getTaskSuccess,
  getTaskFailure
} from "src/store/Task/taskActions";
import { getToken } from "src/store/Auth/authReducer";
import { getCurrentProject } from "src/store/Task/taskReducer";
import Toast from "src/utils/Toast";

function* addTask({ payload }) {
  try {
    const token = yield select(getToken);
    const projectId = yield select(getCurrentProject);
    const response = yield call(TaskService.addTask, token, projectId, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(addTaskSuccess(response.data));
    } else {
      yield put(addTaskFailure());
    }
  } catch (e) {
    yield put(addTaskFailure());
  }
}

function* addTaskSuccessSaga({ payload }) {
  yield call(Toast, "Added task successfully!");
}

function* addTaskFailureSaga({ payload }) {
  yield call(Toast, "Failed to add tasks for this project");
}

function* getTasks() {
  try {
    const token = yield select(getToken);
    const projectId = yield select(getCurrentProject);
    const response = yield call(TaskService.getTasks, token, projectId);
    if (response.status === 200 || response.status === 201) {
      yield put(getTaskSuccess(response.data));
    } else {
      yield put(getTaskFailure());
    }
  } catch (e) {
    yield put(getTaskFailure());
  }
}

function* getTaskFailureSaga({ payload }) {
  yield call(Toast, "Failed to get tasks for this project!");
}

export default function* taskSaga() {
  yield all([
    takeEvery(taskActions.ADD_TASK, addTask),
    takeEvery(taskActions.ADD_TASK_SUCCESS, addTaskSuccessSaga),
    takeEvery(taskActions.ADD_TASK_FAILURE, addTaskFailureSaga),
    takeEvery(taskActions.GET_TASKS, getTasks),
    takeEvery(taskActions.GET_TASKS_FAILURE, getTaskFailureSaga)
  ]);
}
