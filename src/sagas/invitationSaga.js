import {
  put, call, takeEvery, all, select,
} from 'redux-saga/effects';
import InvitationService from '../services/invitation.service';
import { invitationActions } from '../types';
import { addInviteSuccess, addInviteFailure, getProjectInvitesSuccess, getProjectInvitesFailure, getUserInvitesSuccess, getUserInvitesFailure, respondInvitationSuccess, respondInvitationFailure } from '../actions/invitationActions';
import { addProjectSuccess } from '../actions/projectActions';
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
  };
};

function* addInviteSuccessSaga() {
  yield call(Toast, 'Sent invitations successfully!');
};

function* addInviteFailureSaga() {
  yield call(Toast, 'Failed to send invitations!');
};

function* getProjectInvites() {
  try {
    const token = yield select(getToken);
    const projectId = yield select(getCurrentProject);
    const response = yield call(InvitationService.getProjectInvites, token, projectId);
    if (response.status === 200 || response.status === 201) {
      yield put(getProjectInvitesSuccess(response.data));
    } else {
      yield put(getProjectInvitesFailure());
    }
  } catch (e) {
    yield put(getProjectInvitesFailure());
  };
};

function* getProjectInviteFailureSaga() {
  yield call(Toast, 'Failed to fetch project invitations!');
}

function* getUserInvites() {
  try {
    const token = yield select(getToken);
    const response = yield call(InvitationService.getUserInvites, token);
    if (response.status === 200 || response.status === 201) {
      yield put(getUserInvitesSuccess(response.data));
    } else {
      yield put(getUserInvitesFailure());
    }
  } catch (e) {
    yield put(getUserInvitesFailure())
  }
}

function* getUserInvitesFailureSaga() {
  yield call(Toast, 'Failed to get user invites!');
}

function* respondInvitation({ payload }) {
  try {
    const token = yield select(getToken);
    const response = yield call(InvitationService.respondInvitation, token, payload.id, payload.response);
    if (response.status === 200 || response.status === 201) {
      yield put(respondInvitationSuccess(response.data));
      if(payload.response) yield put(addInviteSuccess(response.data));
    } else {
      yield put(respondInvitationFailure());
    }
  } catch (e) {
    console.log(e);
    yield put(respondInvitationFailure());
  }
};

function* respondInvitationFailureSaga() {
  yield call(Toast, 'Failed to respond to invitation!');
}

export default function* invitationSaga() {
  yield all([
    takeEvery(invitationActions.ADD_INVITE, addInvite),
    takeEvery(invitationActions.ADD_INVITE_SUCCESS, addInviteSuccessSaga),
    takeEvery(invitationActions.ADD_INVITE_FAILURE, addInviteFailureSaga),
    takeEvery(invitationActions.GET_PROJECT_INVITES, getProjectInvites),
    takeEvery(invitationActions.GET_PROJECT_INVITES_SUCCESS, getProjectInviteFailureSaga),
    takeEvery(invitationActions.GET_USER_INVITES, getUserInvites),
    takeEvery(invitationActions.GET_USER_INVITES_FAILURE, getUserInvitesFailureSaga),
    takeEvery(invitationActions.RESPOND_INVITATION, respondInvitation),
    takeEvery(invitationActions.RESPOND_INVITATION_FAILURE, respondInvitationFailureSaga),
  ]);
}
