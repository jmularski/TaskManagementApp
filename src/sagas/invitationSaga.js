import {
  put, call, takeEvery, all, select,
} from 'redux-saga/effects';
import InvitationService from '../services/invitation.service';
import { invitationActions } from '../types';
import { addInviteSuccess, addInviteFailure } from '../actions/invitationActions';
import Toast from '../utils/Toast';
import { getToken } from '../reducers/authReducer';
import { getCurrentProject } from '../reducers/taskReducer';

function* addInvite({ payload }) {
  try {
    const token = yield select(getToken);
    const projectId = yield select(getCurrentProject);
    const response = yield call(InvitationService.addInvite, token, projectId, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(addInviteSuccess(response.data));
    } else {
      yield put(addInviteFailure());
    }
  } catch (e) {
    yield put(addInviteFailure());
  }
}

function* addInviteSuccessSaga() {
  yield call(Toast, 'Sent invitations successfully!');
}

function* addInviteFailureSaga() {
  yield call(Toast, 'Failed to send invitations!');
}

export default function* invitationSaga() {
  yield all([
    takeEvery(invitationActions.ADD_INVITE, addInvite),
    takeEvery(invitationActions.ADD_INVITE_SUCCESS, addInviteSuccessSaga),
    takeEvery(invitationActions.ADD_INVITE_FAILURE, addInviteFailureSaga),
  ]);
}
