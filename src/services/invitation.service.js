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
}

export default {
  addInvite,
};
