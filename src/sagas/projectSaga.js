import {
  put, call, takeEvery, all, select,
} from 'redux-saga/effects';

import {
  addProjectSuccess, addProjectFailure, getProjectsSuccess, getProjectsFailure,
} from '../actions/projectActions';
import { getToken } from '../reducers/authReducer';
import { projectActions } from '../types';
import ProjectService from '../services/project.service';
import Toast from '../utils/Toast';

function* addProject({ payload }) {
  try {
    payload.token = yield select(getToken);
    const response = yield call(ProjectService.addProject, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(addProjectSuccess(response.data));
    } else {
      yield put(addProjectFailure());
    }
  } catch (e) {
    yield put(addProjectFailure());
  }
}

function* addProjectSuccessSaga() {
  yield call(Toast, 'Added project successfully!');
}

function* addProjectFailureSaga() {
  yield call(Toast, 'Failed to add new project!');
}

function* getProjects() {
  try {
    const token = yield select(getToken);
    const response = yield call(ProjectService.getProject, token);
    if (response.status === 200 || response.status === 201) {
      yield put(getProjectsSuccess(response.data));
    } else {
      yield put(getProjectsFailure());
    }
  } catch (e) {
    yield put(getProjectsFailure());
  }
}

function* getProjectsFailureSaga() {
  yield call(Toast, 'Failed to fetch your projects!');
}

export default function* projectSaga() {
  yield all([
    takeEvery(projectActions.ADD_PROJECT, addProject),
    takeEvery(projectActions.ADD_PROJECT_SUCCESS, addProjectSuccessSaga),
    takeEvery(projectActions.ADD_PROJECT_FAILURE, addProjectFailureSaga),
    takeEvery(projectActions.GET_PROJECTS, getProjects),
    takeEvery(projectActions.GET_PROJECTS_FAILURE, getProjectsFailureSaga),
  ]);
}
