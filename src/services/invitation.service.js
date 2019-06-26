import request from '../helpers/api-handler';

function addInvite(token, projectId, payload) {
  return request({
    url: `/projects/project/${projectId}/invite/`,
    method: 'POST',
    authHeader: token,
    data: {
      invitations_list: payload,
    },
  });
};

function getProjectInvites(token, projectId) {
  return request({
    url:`/projects/project/${projectId}/get_invitations/`,
    method: 'GET',
    authHeader: token,
  });
};

function getUserInvites(token) {
  return request({
    url: '/projects/invitations/',
    method: 'GET',
    authHeader: token,
  });
};

function respondInvitation(token, invitationId, response) {
  return request({
    url: `/projects/invitations/${invitationId}/${response ? 'accept' : 'reject'}/`,
    method: 'GET',
    authHeader: token,
  });
};

function cancelInvitation(token, invitationId) {
  return request({
    url: `/projects/invitations/${invitationId}/`,
    method: 'DELETE',
    authHeader: token,
  });
}

export default {
  addInvite,
  getProjectInvites,
  getUserInvites,
  respondInvitation,
  cancelInvitation,
};
