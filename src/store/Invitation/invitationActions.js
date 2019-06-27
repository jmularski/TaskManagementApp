import { invitationActions } from "src/store/types";

export const addInvite = payload => ({
  type: invitationActions.ADD_INVITE,
  payload
});

export const addInviteSuccess = payload => ({
  type: invitationActions.ADD_INVITE_SUCCESS,
  payload
});

export const addInviteFailure = () => ({
  type: invitationActions.ADD_INVITE_FAILURE
});

export const getProjectInvites = () => ({
  type: invitationActions.GET_PROJECT_INVITES
});

export const getProjectInvitesSuccess = payload => ({
  type: invitationActions.GET_PROJECT_INVITES_SUCCESS,
  payload
});

export const getProjectInvitesFailure = () => ({
  type: invitationActions.GET_PROJECT_INVITES_FAILURE
});

export const getUserInvites = () => ({
  type: invitationActions.GET_USER_INVITES
});

export const getUserInvitesSuccess = payload => ({
  type: invitationActions.GET_USER_INVITES_SUCCESS,
  payload
});

export const getUserInvitesFailure = () => ({
  type: invitationActions.GET_USER_INVITES_FAILURE
});

export const respondInvitation = payload => ({
  type: invitationActions.RESPOND_INVITATION,
  payload
});

export const respondInvitationSuccess = payload => ({
  type: invitationActions.RESPOND_INVITATION_SUCCESS,
  payload
});

export const respondInvitationFailure = () => ({
  type: invitationActions.RESPOND_INVITATION_FAILURE
});

export const cancelInvitation = payload => ({
  type: invitationActions.CANCEL_INVITATION,
  payload
});

export const cancelInvitationSuccess = payload => ({
  type: invitationActions.CANCEL_INVITATION_SUCCESS,
  payload
});

export const cancelInvitationFailure = payload => ({
  type: invitationActions.CANCEL_INVITATION_FAILURE,
  payload
});
