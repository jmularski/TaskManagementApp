import { invitationActions } from '../types';

export const addInvite = payload => ({
  type: invitationActions.ADD_INVITE,
  payload,
});

export const addInviteSuccess = payload => ({
  type: invitationActions.ADD_INVITE_SUCCESS,
  payload,
});

export const addInviteFailure = () => ({
  type: invitationActions.ADD_INVITE_FAILURE,
});

export const getProjectInvites = () => ({
  type: invitationActions.GET_PROJECT_INVITES,
});

export const getUserInvites = () => ({
  type: invitationActions.GET_USER_INVITES,
});

export const acceptInvitation = payload => ({
  type: invitationActions.ACCEPT_INVITATION,
  payload,
});

export const rejectInvitation = payload => ({
  type: invitationActions.REJECT_INVITATION,
  payload,
});
