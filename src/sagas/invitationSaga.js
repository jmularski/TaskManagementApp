import { put, call, takeEvery, all, select } from "redux-saga/effects";
import InvitationService from "../services/invitation.service";
import { invitationActions } from "../types";
import {
  addInviteSuccess,
  addInviteFailure,
  getProjectInvitesSuccess,
  getProjectInvitesFailure,
  getUserInvitesSuccess,
  getUserInvitesFailure,
  respondInvitationSuccess,
  respondInvitationFailure,
  cancelInvitationFailure,
  cancelInvitationSuccess
} from "../actions/invitationActions";
import Toast from "../utils/Toast";
import { getToken } from "../reducers/authReducer";
import { getCurrentProject } from "../reducers/taskReducer";
import { addProjectSuccess } from "../actions/projectActions";

function* addInvite({ payload }) {
  try {
    const ids = payload.map(item => ({ id: item.id }));
    const token = yield select(getToken);
    const projectId = yield select(getCurrentProject);
    const response = yield call(
      InvitationService.addInvite,
      token,
      projectId,
      ids
    );

    //bad hack to avoid another api call
    const addedUserData = payload.map(item => ({ invited: item }));
    if (response.status === 200 || response.status === 201) {
      yield put(addInviteSuccess(addedUserData));
    } else {
      yield put(addInviteFailure());
    }
  } catch (e) {
    console.log(e);
    yield put(addInviteFailure());
  }
}

function* addInviteSuccessSaga() {
  yield call(Toast, "Sent invitations successfully!");
}

function* addInviteFailureSaga() {
  yield call(Toast, "Failed to send invitations!");
}

function* getProjectInvites() {
  try {
    const token = yield select(getToken);
    const projectId = yield select(getCurrentProject);
    const response = yield call(
      InvitationService.getProjectInvites,
      token,
      projectId
    );
    if (response.status === 200 || response.status === 201) {
      yield put(getProjectInvitesSuccess(response.data));
    } else {
      yield put(getProjectInvitesFailure());
    }
  } catch (e) {
    yield put(getProjectInvitesFailure());
  }
}

function* getProjectInviteFailureSaga() {
  yield call(Toast, "Failed to fetch project invitations!");
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
    yield put(getUserInvitesFailure());
  }
}

function* getUserInvitesFailureSaga() {
  yield call(Toast, "Failed to get user invites!");
}

function* respondInvitation({ payload }) {
  try {
    const token = yield select(getToken);
    const response = yield call(
      InvitationService.respondInvitation,
      token,
      payload.id,
      payload.response
    );
    if (response.status === 200 || response.status === 201) {
      yield put(respondInvitationSuccess(payload.id));
      if (payload.response) yield put(addProjectSuccess(response.data));
    } else {
      yield put(respondInvitationFailure());
    }
  } catch (e) {
    yield put(respondInvitationFailure());
  }
}

function* respondInvitationFailureSaga() {
  yield call(Toast, "Failed to respond to invitation!");
}

function* cancelInvitation({ payload }) {
  try {
    const token = yield select(getToken);
    const response = yield call(
      InvitationService.cancelInvitation,
      token,
      payload.id
    );
    if (response.status === 200 || response.status === 301) {
      yield put(cancelInvitationSuccess(payload));
    } else {
      yield put(cancelInvitationFailure());
    }
  } catch (e) {
    yield put(cancelInvitationFailure());
  }
}

function* cancelInvitationSuccessSaga() {
  yield call(Toast, "Canceling invitation successful!");
}

function* cancelInvitationFailureSaga() {
  yield call(Toast, "Canceling invitation failed!");
}

export default function* invitationSaga() {
  yield all([
    takeEvery(invitationActions.ADD_INVITE, addInvite),
    takeEvery(invitationActions.ADD_INVITE_SUCCESS, addInviteSuccessSaga),
    takeEvery(invitationActions.ADD_INVITE_FAILURE, addInviteFailureSaga),
    takeEvery(invitationActions.GET_PROJECT_INVITES, getProjectInvites),
    takeEvery(
      invitationActions.GET_PROJECT_INVITES_FAILURE,
      getProjectInviteFailureSaga
    ),
    takeEvery(invitationActions.GET_USER_INVITES, getUserInvites),
    takeEvery(
      invitationActions.GET_USER_INVITES_FAILURE,
      getUserInvitesFailureSaga
    ),
    takeEvery(invitationActions.RESPOND_INVITATION, respondInvitation),
    takeEvery(
      invitationActions.RESPOND_INVITATION_FAILURE,
      respondInvitationFailureSaga
    ),
    takeEvery(invitationActions.CANCEL_INVITATION, cancelInvitation),
    takeEvery(
      invitationActions.CANCEL_INVITATION_SUCCESS,
      cancelInvitationSuccessSaga
    ),
    takeEvery(
      invitationActions.CANCEL_INVITATION_FAILURE,
      cancelInvitationFailureSaga
    )
  ]);
}
